# Quill Delta Preview

<div align="center">

[![Version](https://img.shields.io/visual-studio-marketplace/v/aa12gq.quill-delta-preview?color=blue&label=Version)](https://marketplace.visualstudio.com/items?itemName=aa12gq.quill-delta-preview)
[![Installs](https://img.shields.io/visual-studio-marketplace/i/aa12gq.quill-delta-preview?color=success&label=Installs)](https://marketplace.visualstudio.com/items?itemName=aa12gq.quill-delta-preview)
[![Rating](https://img.shields.io/visual-studio-marketplace/r/aa12gq.quill-delta-preview?color=orange&label=Rating)](https://marketplace.visualstudio.com/items?itemName=aa12gq.quill-delta-preview)
[![License](https://img.shields.io/github/license/aa12gq/quill-delta-preview?label=License)](https://github.com/aa12gq/quill-delta-preview/blob/main/LICENSE)

一个用于在 VSCode 中预览 Quill Delta JSON 格式文件的扩展。让你能够直观地查看富文本内容，无需手动解析 JSON 数据。

[English](./README_EN.md) | 简体中文

</div>

---

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

## 🗺️ 开发路线图

查看我们的 [ROADMAP](./ROADMAP.md) 了解未来的功能计划：

- ✨ 自定义主题设置
- 📤 导出为 HTML/Markdown/PDF
- 🔍 内容搜索和过滤
- ✏️ 双向编辑模式
- 🌍 国际化支持
- 以及更多...

## 🤝 贡献

我们欢迎任何形式的贡献！请查看 [贡献指南](./CONTRIBUTING.md) 了解如何参与：

- 💻 提交代码
- 📝 改进文档
- 🐛 报告问题
- 💡 提出建议

### 贡献者

感谢所有贡献者的努力！

<a href="https://github.com/aa12gq/quill-delta-preview/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=aa12gq/quill-delta-preview" />
</a>

## 📊 项目统计

![Alt](https://repobeats.axiom.co/api/embed/yourid.svg "Repobeats analytics image")

## 🔗 相关链接

- [VSCode Marketplace](https://marketplace.visualstudio.com/items?itemName=aa12gq.quill-delta-preview)
- [GitHub Repository](https://github.com/aa12gq/quill-delta-preview)
- [Issue Tracker](https://github.com/aa12gq/quill-delta-preview/issues)
- [Changelog](https://github.com/aa12gq/quill-delta-preview/releases)
- [Quill.js 官网](https://quilljs.com/)
- [Quill Delta 格式文档](https://quilljs.com/docs/delta/)

## 反馈与支持

如果遇到问题或有功能建议，欢迎：

- 📬 [提交 Issue](https://github.com/aa12gq/quill-delta-preview/issues/new/choose)
- 💬 [参与讨论](https://github.com/aa12gq/quill-delta-preview/discussions)
- ⭐ [给项目点星](https://github.com/aa12gq/quill-delta-preview)

## 许可证

[MIT License](./LICENSE) © 2024 [aa12gq](https://github.com/aa12gq)

## 更新日志

### 1.0.2

- 更新扩展图标为专属 Quill Delta 主题图标
- 优化视觉识别度

### 1.0.1

- 性能优化：扩展大小减少 97%（667KB → 19KB）
- 文件数量优化：从 525 个文件减少到 10 个
- 添加 MIT LICENSE
- 使用 esbuild 进行打包优化
- 改进 .vscodeignore 配置

### 1.0.0

- 首次发布
- 支持 Quill Delta JSON 预览
- 实时更新预览
- 自动适配 VSCode 主题
