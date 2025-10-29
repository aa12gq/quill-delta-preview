import * as vscode from "vscode";
import { PreviewProvider } from "./previewProvider";

export class QuillDeltaCustomEditorProvider
  implements vscode.CustomTextEditorProvider
{
  private previewProvider: PreviewProvider;

  constructor(previewProvider: PreviewProvider) {
    this.previewProvider = previewProvider;
  }

  public async resolveCustomTextEditor(
    document: vscode.TextDocument,
    webviewPanel: vscode.WebviewPanel,
    token: vscode.CancellationToken
  ): Promise<void> {
    // 设置 webview 选项
    webviewPanel.webview.options = {
      enableScripts: true,
      localResourceRoots: [
        vscode.Uri.joinPath(vscode.Uri.file(__dirname), "..", "webview"),
      ],
    };

    // 检查文档是否为有效的 Delta JSON
    if (!this.isValidDeltaDocument(document)) {
      webviewPanel.webview.html = this.getErrorHtml(
        "这不是一个有效的 Quill Delta JSON 文件"
      );
      return;
    }

    try {
      // 解析 Delta 数据
      const delta = JSON.parse(document.getText());

      // 生成预览 HTML
      const html = this.previewProvider.generatePreviewHtml(
        delta,
        webviewPanel.webview
      );
      webviewPanel.webview.html = html;

      // 监听文档变化
      const changeDocumentSubscription =
        vscode.workspace.onDidChangeTextDocument((e) => {
          if (e.document.uri.toString() === document.uri.toString()) {
            try {
              const newDelta = JSON.parse(e.document.getText());
              const newHtml = this.previewProvider.generatePreviewHtml(
                newDelta,
                webviewPanel.webview
              );
              webviewPanel.webview.html = newHtml;
            } catch (error) {
              webviewPanel.webview.html = this.getErrorHtml(
                "JSON 格式错误: " + (error as Error).message
              );
            }
          }
        });

      // 清理资源
      webviewPanel.onDidDispose(() => {
        changeDocumentSubscription.dispose();
      });
    } catch (error) {
      webviewPanel.webview.html = this.getErrorHtml(
        "解析 Delta 数据失败: " + (error as Error).message
      );
    }
  }

  private isValidDeltaDocument(document: vscode.TextDocument): boolean {
    try {
      const content = document.getText();
      if (!content.trim()) {
        return false;
      }

      const parsed = JSON.parse(content);

      // 检查是否为数组格式的 Delta
      if (Array.isArray(parsed)) {
        return true;
      }

      // 检查是否为包含 ops 属性的 Delta 对象
      if (parsed && typeof parsed === "object" && Array.isArray(parsed.ops)) {
        return true;
      }

      return false;
    } catch {
      return false;
    }
  }

  private getErrorHtml(message: string): string {
    return `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Quill Delta Preview - 错误</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            margin: 0;
            padding: 20px;
            background-color: #f5f5f5;
            color: #333;
        }
        .error-container {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            border-radius: 8px;
            padding: 30px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            text-align: center;
        }
        .error-icon {
            font-size: 48px;
            color: #e74c3c;
            margin-bottom: 20px;
        }
        .error-title {
            font-size: 24px;
            font-weight: 600;
            color: #e74c3c;
            margin-bottom: 15px;
        }
        .error-message {
            font-size: 16px;
            color: #666;
            line-height: 1.5;
        }
    </style>
</head>
<body>
    <div class="error-container">
        <div class="error-icon">⚠️</div>
        <div class="error-title">预览错误</div>
        <div class="error-message">${message}</div>
    </div>
</body>
</html>`;
  }
}
