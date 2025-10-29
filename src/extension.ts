import * as vscode from "vscode";
import { PreviewProvider } from "./previewProvider";

export function activate(context: vscode.ExtensionContext) {
  console.log("Quill Delta Preview extension is now active!");

  // 注册预览提供者
  const previewProvider = new PreviewProvider(context.extensionUri);

  // 存储活动的预览面板
  const activePanels = new Map<string, vscode.WebviewPanel>();

  // 注册命令 - 打开右侧预览
  const openPreviewCommand = vscode.commands.registerCommand(
    "quillDeltaPreview.openPreview",
    async () => {
      const activeEditor = vscode.window.activeTextEditor;
      if (!activeEditor) {
        vscode.window.showWarningMessage("请先打开一个JSON文件");
        return;
      }

      const document = activeEditor.document;
      if (document.languageId !== "json") {
        vscode.window.showWarningMessage("请打开一个JSON文件");
        return;
      }

      try {
        // 解析JSON内容
        const rawContent = JSON.parse(document.getText());

        // 标准化Delta格式
        const jsonContent = normalizeDeltaFormat(rawContent);

        // 验证是否为有效的Quill Delta格式
        if (!isValidQuillDelta(jsonContent)) {
          vscode.window.showWarningMessage(
            "这不是一个有效的Quill Delta JSON文件"
          );
          return;
        }

        const documentUri = document.uri.toString();

        // 如果已经有预览面板,则显示它
        if (activePanels.has(documentUri)) {
          const existingPanel = activePanels.get(documentUri);
          if (existingPanel) {
            existingPanel.reveal(vscode.ViewColumn.Two);
            // 更新内容
            existingPanel.webview.postMessage({
              type: "updateDelta",
              delta: jsonContent,
            });
            return;
          }
        }

        // 创建新的预览面板
        const panel = vscode.window.createWebviewPanel(
          "quillDeltaPreview",
          `Preview: ${document.fileName.split("/").pop()}`,
          vscode.ViewColumn.Two,
          {
            enableScripts: true,
            retainContextWhenHidden: true,
            localResourceRoots: [
              vscode.Uri.joinPath(context.extensionUri, "out", "webview"),
            ],
          }
        );

        // 保存面板引用
        activePanels.set(documentUri, panel);

        // 设置WebView内容
        panel.webview.html = previewProvider.getWebviewContent(
          jsonContent,
          panel.webview
        );

        // 监听文件变化 - 使用防抖避免频繁更新
        let updateTimeout: NodeJS.Timeout | undefined;
        const changeListener = vscode.workspace.onDidChangeTextDocument(
          (event) => {
            if (event.document.uri.toString() === documentUri) {
              if (updateTimeout) {
                clearTimeout(updateTimeout);
              }
              updateTimeout = setTimeout(() => {
                try {
                  const rawContent = JSON.parse(event.document.getText());
                  const normalizedContent = normalizeDeltaFormat(rawContent);
                  if (isValidQuillDelta(normalizedContent)) {
                    panel.webview.postMessage({
                      type: "updateDelta",
                      delta: normalizedContent,
                    });
                  }
                } catch (error) {
                  console.error("解析JSON失败:", error);
                  panel.webview.postMessage({
                    type: "error",
                    message: "JSON格式错误",
                  });
                }
              }, 300); // 300ms 防抖
            }
          }
        );

        // 监听文档关闭事件
        const closeListener = vscode.workspace.onDidCloseTextDocument(
          (closedDoc) => {
            if (closedDoc.uri.toString() === documentUri) {
              panel.dispose();
            }
          }
        );

        // 清理资源
        panel.onDidDispose(() => {
          activePanels.delete(documentUri);
          changeListener.dispose();
          closeListener.dispose();
          if (updateTimeout) {
            clearTimeout(updateTimeout);
          }
        });
      } catch (error) {
        vscode.window.showErrorMessage(`解析JSON文件失败: ${error}`);
      }
    }
  );

  // 注册右键菜单命令
  const openPreviewFromExplorerCommand = vscode.commands.registerCommand(
    "quillDeltaPreview.openPreviewFromExplorer",
    async (uri: vscode.Uri) => {
      try {
        const document = await vscode.workspace.openTextDocument(uri);
        await vscode.window.showTextDocument(document, vscode.ViewColumn.One);
        // 延迟执行预览命令,确保文档已打开
        setTimeout(() => {
          vscode.commands.executeCommand("quillDeltaPreview.openPreview");
        }, 100);
      } catch (error) {
        vscode.window.showErrorMessage(`打开文件失败: ${error}`);
      }
    }
  );

  context.subscriptions.push(
    openPreviewCommand,
    openPreviewFromExplorerCommand
  );
}

export function deactivate() {
  console.log("Quill Delta Preview extension is now deactivated");
}

/**
 * 标准化Delta格式，支持两种格式：
 * 1. 数组格式：[...]
 * 2. 对象格式：{ "ops": [...] }
 */
function normalizeDeltaFormat(rawContent: any): any {
  if (Array.isArray(rawContent)) {
    // 数组格式，直接返回
    return rawContent;
  } else if (
    rawContent &&
    typeof rawContent === "object" &&
    Array.isArray(rawContent.ops)
  ) {
    // 对象格式，提取ops数组
    return rawContent.ops;
  } else {
    // 其他格式，返回原内容让验证函数处理
    return rawContent;
  }
}

/**
 * 验证是否为有效的Quill Delta格式
 */
function isValidQuillDelta(json: any): boolean {
  if (!Array.isArray(json)) {
    return false;
  }

  return json.every((item) => {
    if (typeof item !== "object" || item === null) {
      return false;
    }

    // 检查是否有insert、retain或delete属性
    const hasValidOperation =
      "insert" in item || "retain" in item || "delete" in item;

    if (!hasValidOperation) {
      return false;
    }

    // 检查insert操作
    if ("insert" in item) {
      return (
        typeof item.insert === "string" ||
        typeof item.insert === "number" ||
        (typeof item.insert === "object" && item.insert !== null)
      );
    }

    // 检查retain操作
    if ("retain" in item) {
      return typeof item.retain === "number" && item.retain > 0;
    }

    // 检查delete操作
    if ("delete" in item) {
      return typeof item.delete === "number" && item.delete > 0;
    }

    return true;
  });
}
