# Quill Delta Preview VSCode 插件开发文档

## 项目概述

这个 VSCode 插件用于预览 Quill Delta JSON 格式的文件，让开发者能够直观地看到富文本内容，而不需要手动解析 JSON 数据。

## 功能特性

- 📄 预览 Quill Delta JSON 文件
- 🎨 支持 Quill 的所有格式（粗体、斜体、颜色、列表等）
- 🔄 实时更新预览内容
- 📱 响应式设计，适配不同屏幕尺寸
- ⚡ 快速加载，性能优化

## 技术栈

- **VSCode Extension API**: 插件核心功能
- **TypeScript**: 类型安全的开发语言
- **Quill.js**: 富文本编辑器库，用于渲染 Delta 内容
- **WebView API**: VSCode 的 WebView 功能，用于显示预览界面

## 项目结构

```
quill-delta-preview-extension/
├── package.json              # 插件配置和依赖
├── tsconfig.json            # TypeScript 配置
├── src/
│   ├── extension.ts         # 插件主入口文件
│   ├── previewProvider.ts   # 预览提供者
│   └── webview/
│       ├── preview.html     # 预览页面 HTML
│       ├── preview.js       # 预览页面 JavaScript
│       └── preview.css      # 预览页面样式
├── out/                     # 编译输出目录
└── README.md               # 项目文档
```

## 开发步骤

### 1. 环境准备

```bash
# 安装 Node.js 和 npm
# 安装 VSCode
# 安装 VSCode Extension 开发工具
npm install -g @vscode/vsce
```

### 2. 项目初始化

```bash
# 创建项目目录
mkdir quill-delta-preview-extension
cd quill-delta-preview-extension

# 初始化 npm 项目
npm init -y

# 安装依赖
npm install --save-dev @types/vscode @types/node typescript
npm install --save quill
```

### 3. 配置文件

#### package.json 配置

```json
{
  "name": "quill-delta-preview",
  "displayName": "Quill Delta Preview",
  "description": "Preview Quill Delta JSON files in VSCode",
  "version": "1.0.0",
  "publisher": "your-publisher",
  "engines": {
    "vscode": "^1.74.0"
  },
  "categories": ["Other"],
  "activationEvents": ["onCommand:quillDeltaPreview.openPreview"],
  "main": "./out/extension.js",
  "contributes": {
    "commands": [
      {
        "command": "quillDeltaPreview.openPreview",
        "title": "Open Quill Delta Preview",
        "category": "Quill Delta"
      }
    ],
    "menus": {
      "explorer/context": [
        {
          "when": "resourceExtname == .json",
          "command": "quillDeltaPreview.openPreview",
          "group": "navigation"
        }
      ],
      "editor/context": [
        {
          "when": "resourceExtname == .json",
          "command": "quillDeltaPreview.openPreview",
          "group": "navigation"
        }
      ]
    }
  },
  "scripts": {
    "vscode:prepublish": "npm run compile",
    "compile": "tsc -p ./",
    "watch": "tsc -watch -p ./"
  }
}
```

#### tsconfig.json 配置

```json
{
  "compilerOptions": {
    "module": "commonjs",
    "target": "ES2020",
    "outDir": "out",
    "lib": ["ES2020"],
    "sourceMap": true,
    "rootDir": "src",
    "strict": true
  },
  "exclude": ["node_modules", ".vscode-test"]
}
```

### 4. 核心功能实现

#### 4.1 插件入口 (src/extension.ts)

- 注册命令
- 处理文件选择
- 创建 WebView 面板

#### 4.2 预览提供者 (src/previewProvider.ts)

- 解析 JSON 文件
- 验证 Quill Delta 格式
- 生成预览 HTML

#### 4.3 WebView 界面 (src/webview/)

- 集成 Quill.js
- 渲染 Delta 内容
- 处理样式和交互

### 5. 开发流程

```bash
# 1. 编译 TypeScript
npm run compile

# 2. 在 VSCode 中按 F5 启动调试
# 3. 在新窗口中测试插件功能
# 4. 修改代码后重新编译
npm run watch
```

### 6. 测试和调试

#### 测试步骤

1. 准备一个 Quill Delta JSON 文件
2. 右键点击文件，选择 "Open Quill Delta Preview"
3. 验证预览内容是否正确显示
4. 测试不同的 Delta 格式

#### 调试技巧

- 使用 VSCode 的调试控制台查看日志
- 在 WebView 中使用浏览器开发者工具
- 检查 VSCode 开发者工具中的错误信息

### 7. 打包和发布

```bash
# 安装 vsce 工具
npm install -g @vscode/vsce

# 打包插件
vsce package

# 发布到 VSCode Marketplace
vsce publish
```

## 技术实现细节

### Quill Delta 格式识别

```typescript
function isValidQuillDelta(json: any): boolean {
  return (
    Array.isArray(json) &&
    json.every(
      (item) =>
        typeof item === "object" && (item.insert || item.retain || item.delete)
    )
  );
}
```

### WebView 内容生成

```typescript
function generatePreviewHTML(delta: any): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <link href="https://cdn.quilljs.com/1.3.7/quill.snow.css" rel="stylesheet">
      <script src="https://cdn.quilljs.com/1.3.7/quill.min.js"></script>
    </head>
    <body>
      <div id="quill-container"></div>
      <script>
        const quill = new Quill('#quill-container', {
          readOnly: true,
          theme: 'snow'
        });
        quill.setContents(${JSON.stringify(delta)});
      </script>
    </body>
    </html>
  `;
}
```

## 扩展功能

### 未来可能的增强功能

- 🔍 搜索和过滤功能
- 📊 导出为 HTML/PDF
- 🎨 自定义主题
- 📝 编辑模式（双向同步）
- 🔗 支持更多 Delta 格式

## 常见问题

### Q: 如何处理大型 Delta 文件？

A: 实现虚拟滚动和分页加载，避免一次性渲染大量内容。

### Q: 如何支持自定义样式？

A: 允许用户配置 CSS 变量和主题文件。

### Q: 如何处理无效的 Delta 格式？

A: 提供友好的错误提示和格式验证建议。

## 贡献指南

1. Fork 项目
2. 创建功能分支
3. 提交更改
4. 创建 Pull Request

## 许可证

MIT License

---

这个插件将大大提升开发者在处理 Quill Delta 文件时的效率，让富文本内容的预览变得简单直观。
