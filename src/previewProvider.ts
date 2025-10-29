import * as vscode from "vscode";
import * as path from "path";

export class PreviewProvider {
  constructor(private readonly extensionUri: vscode.Uri) {}

  /**
   * 生成WebView内容
   */
  public getWebviewContent(delta: any, webview: vscode.Webview): string {
    return this.generatePreviewHtml(delta, webview);
  }

  /**
   * 生成预览HTML
   */
  public generatePreviewHtml(delta: any, webview: vscode.Webview): string {
    const webviewUri = (path: string) => {
      return webview
        .asWebviewUri(
          vscode.Uri.joinPath(this.extensionUri, "out", "webview", path)
        )
        .toString();
    };

    return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Quill Delta Preview</title>
    
    <!-- Quill.js CDN -->
    <link href="https://cdn.quilljs.com/1.3.7/quill.snow.css" rel="stylesheet">
    <script src="https://cdn.quilljs.com/1.3.7/quill.min.js"></script>
    
    <!-- 自定义样式 -->
    <link href="${webviewUri("preview.css")}" rel="stylesheet">
</head>
<body>
    <div class="preview-container">
        <div class="preview-content">
            <div id="quill-container"></div>
        </div>
    </div>

    <script>
        // 全局变量存储Delta数据
        window.deltaData = ${JSON.stringify(delta)};
    </script>
    <script src="${webviewUri("preview.js")}"></script>
</body>
</html>`;
  }

  /**
   * 生成纯HTML内容（用于导出）
   */
  public generateHTMLContent(delta: any): string {
    return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Quill Delta Export</title>
    <link href="https://cdn.quilljs.com/1.3.7/quill.snow.css" rel="stylesheet">
    <script src="https://cdn.quilljs.com/1.3.7/quill.min.js"></script>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            line-height: 1.6;
        }
        .quill-container {
            border: 1px solid #ccc;
            border-radius: 8px;
            min-height: 200px;
        }
        .export-info {
            margin-top: 20px;
            padding: 10px;
            background: #f5f5f5;
            border-radius: 4px;
            font-size: 14px;
            color: #666;
        }
    </style>
</head>
<body>
    <h1>Quill Delta 内容预览</h1>
    <div id="quill-container" class="quill-container"></div>
    <div class="export-info">
        <p>导出时间: ${new Date().toLocaleString("zh-CN")}</p>
        <p>操作数: ${Array.isArray(delta) ? delta.length : 0}</p>
    </div>
    
    <script>
        const quill = new Quill('#quill-container', {
            readOnly: true,
            theme: 'snow'
        });
        
        try {
            quill.setContents(${JSON.stringify(delta)});
        } catch (error) {
            document.getElementById('quill-container').innerHTML = 
                '<div style="padding: 20px; color: #e74c3c;">解析Delta数据失败: ' + error.message + '</div>';
        }
    </script>
</body>
</html>`;
  }
}
