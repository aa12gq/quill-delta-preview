# Quill Delta Preview

一个用于在 VSCode 中预览 Quill Delta JSON 格式文件的扩展。让你能够直观地查看富文本内容，无需手动解析 JSON 数据。

## 功能特性

- 📄 一键预览 Quill Delta JSON 文件
- 🎨 完整支持 Quill 的所有格式（粗体、斜体、颜色、列表、代码块等）
- 🔄 实时更新预览内容（编辑文件时自动刷新）
- 🌓 自动适配 VSCode 主题（亮色/暗色）
- ⚡ 快速加载，性能优化
- 📱 响应式设计，适配不同屏幕尺寸

## 安装

在 VSCode 扩展市场搜索 "Quill Delta Preview" 并安装。

或者从 [VSCode Marketplace](https://marketplace.visualstudio.com/) 下载安装。

## 使用方法

### 方法一：通过命令面板

1. 打开一个 Quill Delta JSON 文件
2. 按 `Ctrl+Shift+P` (Mac: `Cmd+Shift+P`) 打开命令面板
3. 输入 "Open Quill Delta Preview"
4. 预览窗口将在右侧打开

### 方法二：通过快捷键

1. 打开一个 JSON 文件
2. 按 `Ctrl+Shift+Q` (Mac: `Cmd+Shift+Q`)
3. 如果文件是有效的 Quill Delta 格式，预览窗口将自动打开

### 方法三：通过右键菜单

1. 在编辑器中右键点击 JSON 文件
2. 选择 "Open Quill Delta Preview"

或者：

1. 在文件资源管理器中右键点击 JSON 文件
2. 选择 "Open Quill Delta Preview"

## Quill Delta 格式

支持两种 Delta 格式：

### 格式一：数组格式

```json
[
  { "insert": "Hello " },
  { "insert": "World", "attributes": { "bold": true } },
  { "insert": "\n" }
]
```

### 格式二：对象格式

```json
{
  "ops": [
    { "insert": "Hello " },
    { "insert": "World", "attributes": { "bold": true } },
    { "insert": "\n" }
  ]
}
```

## 支持的格式

- **文本样式**: 粗体、斜体、下划线、删除线
- **字体**: 字体大小、字体颜色、背景色
- **标题**: H1 - H6
- **列表**: 有序列表、无序列表
- **引用**: 引用块
- **代码**: 行内代码、代码块
- **链接**: 超链接
- **图片**: 图片嵌入
- **对齐**: 左对齐、居中、右对齐

## 常见问题

### Q: 为什么预览窗口显示"这不是一个有效的 Quill Delta JSON 文件"？

A: 请确保你的 JSON 文件符合 Quill Delta 格式规范。每个操作必须包含 `insert`、`retain` 或 `delete` 属性。

### Q: 预览内容不更新怎么办？

A: 预览会在你保存文件后自动更新。如果仍然不更新，可以尝试关闭预览窗口后重新打开。

### Q: 支持编辑功能吗？

A: 当前版本仅支持预览功能，不支持编辑。如需编辑，请直接修改 JSON 文件。

## 反馈与支持

如果遇到问题或有功能建议，欢迎提交 issue。

## 许可证

MIT License

## 更新日志

### 1.0.0

- 首次发布
- 支持 Quill Delta JSON 预览
- 实时更新预览
- 自动适配 VSCode 主题
