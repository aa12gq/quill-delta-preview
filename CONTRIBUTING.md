# Contributing to Quill Delta Preview

感谢你对 Quill Delta Preview 的关注！我们欢迎任何形式的贡献。

## 📋 目录

- [行为准则](#行为准则)
- [如何贡献](#如何贡献)
- [开发环境设置](#开发环境设置)
- [开发流程](#开发流程)
- [代码规范](#代码规范)
- [提交指南](#提交指南)
- [Pull Request 流程](#pull-request-流程)

---

## 行为准则

参与本项目即表示你同意遵守我们的行为准则：

- 尊重所有贡献者
- 使用友好和包容的语言
- 接受建设性的批评
- 关注对社区最有利的事情

---

## 如何贡献

你可以通过以下方式贡献：

### 💻 代码贡献

1. **修复 Bug**
   - 查看 [Issues](https://github.com/aa12gq/quill-delta-preview/issues) 中标记为 `bug` 的问题
   - 复现问题并提供修复

2. **实现新功能**
   - 查看 [ROADMAP.md](./ROADMAP.md) 了解计划的功能
   - 在开始开发前，先创建一个 Issue 讨论实现方案

3. **性能优化**
   - 识别性能瓶颈
   - 提供优化方案和基准测试

### 📝 文档贡献

- 改进 README 文档
- 添加代码注释
- 翻译文档
- 编写使用教程和示例

### 🐛 报告 Bug

- 使用 [Bug Report 模板](.github/ISSUE_TEMPLATE/bug_report.md)
- 提供详细的复现步骤
- 包含截图或视频（如果适用）

### 💡 功能建议

- 使用 [Feature Request 模板](.github/ISSUE_TEMPLATE/feature_request.md)
- 详细描述功能需求和使用场景
- 说明为什么这个功能有价值

---

## 开发环境设置

### 前置要求

- **Node.js**: >= 16.x
- **npm**: >= 8.x
- **VSCode**: >= 1.74.0
- **Git**: 最新版本

### 克隆仓库

```bash
# 克隆仓库
git clone https://github.com/aa12gq/quill-delta-preview.git
cd quill-delta-preview

# 安装依赖
npm install
```

### 项目结构

```
quill-delta-preview/
├── src/                    # 源代码目录
│   ├── extension.ts        # 扩展主入口
│   ├── previewProvider.ts  # 预览提供者
│   └── webview/            # WebView 相关文件
│       ├── preview.js      # WebView JavaScript
│       └── preview.css     # WebView 样式
├── out/                    # 编译输出目录
├── build.js                # esbuild 构建脚本
├── package.json            # 项目配置
├── tsconfig.json           # TypeScript 配置
├── README.md               # 项目说明
├── ROADMAP.md              # 开发路线图
└── CONTRIBUTING.md         # 贡献指南（本文件）
```

### 开发命令

```bash
# 开发模式（监听文件变化）
npm run watch

# 编译项目
npm run compile

# 生产构建
npm run package

# 代码检查
npm run lint

# 运行测试（如果有）
npm test

# 打包扩展
vsce package
```

### 调试扩展

1. 在 VSCode 中打开项目
2. 按 `F5` 启动调试
3. 在新打开的 VSCode 窗口中测试扩展功能
4. 修改代码后，按 `Ctrl+R` (Mac: `Cmd+R`) 重新加载扩展

---

## 开发流程

### 1. Fork 仓库

点击 GitHub 页面右上角的 "Fork" 按钮

### 2. 创建分支

```bash
# 从 main 分支创建新分支
git checkout -b feature/your-feature-name

# 或修复 bug
git checkout -b fix/bug-description
```

分支命名规范：
- `feature/xxx` - 新功能
- `fix/xxx` - Bug 修复
- `docs/xxx` - 文档更新
- `perf/xxx` - 性能优化
- `refactor/xxx` - 重构
- `test/xxx` - 测试相关

### 3. 开发

- 遵循代码规范
- 编写清晰的代码注释
- 保持提交的原子性（一个提交只做一件事）

### 4. 测试

- 手动测试你的修改
- 确保没有破坏现有功能
- 添加单元测试（如果适用）

### 5. 提交代码

```bash
git add .
git commit -m "feat: add custom theme settings"
```

### 6. 推送到 Fork

```bash
git push origin feature/your-feature-name
```

### 7. 创建 Pull Request

- 在 GitHub 上创建 Pull Request
- 填写 PR 模板
- 等待代码审查

---

## 代码规范

### TypeScript 规范

```typescript
// ✅ 好的示例
export function validateDelta(delta: any[]): boolean {
  if (!Array.isArray(delta)) {
    return false;
  }

  return delta.every((op) => {
    return 'insert' in op || 'retain' in op || 'delete' in op;
  });
}

// ❌ 不好的示例
export function validateDelta(delta) {
  if (!Array.isArray(delta)) return false;
  return delta.every((op) => 'insert' in op || 'retain' in op || 'delete' in op);
}
```

### 代码风格

- 使用 **2 空格**缩进
- 使用 **单引号**表示字符串
- 函数和变量使用 **驼峰命名法**
- 类名使用 **帕斯卡命名法**
- 常量使用 **大写下划线**命名
- 每行代码不超过 100 个字符

### 注释规范

```typescript
/**
 * 验证 Quill Delta 格式是否有效
 *
 * @param delta - Delta 操作数组
 * @returns 如果格式有效返回 true，否则返回 false
 *
 * @example
 * ```typescript
 * const delta = [{ insert: 'Hello' }, { insert: '\n' }];
 * const isValid = validateDelta(delta); // true
 * ```
 */
export function validateDelta(delta: any[]): boolean {
  // 实现代码...
}
```

### ESLint

项目使用 ESLint 进行代码检查：

```bash
# 检查代码
npm run lint

# 自动修复
npm run lint -- --fix
```

---

## 提交指南

### Commit Message 格式

我们使用 [Conventional Commits](https://www.conventionalcommits.org/) 规范：

```
<type>(<scope>): <subject>

<body>

<footer>
```

#### Type 类型

- `feat`: 新功能
- `fix`: Bug 修复
- `docs`: 文档更新
- `style`: 代码格式（不影响代码运行）
- `refactor`: 重构
- `perf`: 性能优化
- `test`: 测试相关
- `chore`: 构建过程或辅助工具的变动

#### 示例

```bash
# 简单的提交
git commit -m "feat: add export to HTML functionality"

# 带 scope 的提交
git commit -m "fix(preview): resolve theme switching issue"

# 带 body 的提交
git commit -m "feat: add Delta validation

- Add validateDelta function
- Add error messages for invalid format
- Update UI to show validation errors"

# Breaking change
git commit -m "feat!: change Delta format to v2

BREAKING CHANGE: Delta format has been updated to v2.
Old format is no longer supported."
```

---

## Pull Request 流程

### PR 标题格式

与 commit message 格式相同：

```
feat: add custom theme settings
fix: resolve preview not updating issue
docs: update contributing guidelines
```

### PR 描述模板

```markdown
## 描述
简要描述这个 PR 做了什么。

## 相关 Issue
Closes #123

## 变更类型
- [ ] Bug 修复
- [ ] 新功能
- [ ] 文档更新
- [ ] 性能优化
- [ ] 代码重构
- [ ] 其他（请说明）

## 测试
描述你如何测试这些变更。

## 截图（如果适用）
添加截图来说明你的变更。

## 检查清单
- [ ] 代码遵循项目的代码规范
- [ ] 代码已经过自我审查
- [ ] 代码有适当的注释
- [ ] 文档已更新（如果需要）
- [ ] 没有产生新的警告
- [ ] 已添加测试（如果适用）
- [ ] 所有测试通过
```

### Code Review

- 所有 PR 需要至少一次代码审查
- 审查者会提供反馈和建议
- 根据反馈修改代码
- 审查通过后会被合并

### 合并要求

- ✅ 所有 CI 检查通过
- ✅ 代码审查通过
- ✅ 没有合并冲突
- ✅ 遵循代码规范

---

## 🎯 寻找适合的 Issue

如果你是第一次贡献，推荐从这些标签开始：

- [`good first issue`](https://github.com/aa12gq/quill-delta-preview/labels/good%20first%20issue) - 适合新手
- [`help wanted`](https://github.com/aa12gq/quill-delta-preview/labels/help%20wanted) - 需要帮助
- [`documentation`](https://github.com/aa12gq/quill-delta-preview/labels/documentation) - 文档相关

---

## 📞 联系方式

有问题？可以通过以下方式联系：

- 创建 [GitHub Issue](https://github.com/aa12gq/quill-delta-preview/issues)
- 在 [GitHub Discussions](https://github.com/aa12gq/quill-delta-preview/discussions) 中讨论

---

## 🙏 致谢

感谢所有为这个项目做出贡献的开发者！

你的贡献将会列在 [Contributors](https://github.com/aa12gq/quill-delta-preview/graphs/contributors) 页面。

---

**Happy Coding!** 🎉
