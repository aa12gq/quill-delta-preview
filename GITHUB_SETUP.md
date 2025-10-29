# GitHub 项目设置指南

本文档将指导你完成 GitHub Discussions 和 GitHub Projects 的设置。

## ✅ 已完成

- [x] **GitHub Discussions 已启用**
  - 访问：https://github.com/aa12gq/quill-delta-preview/discussions
  - 现在用户可以在 Discussions 中提问、讨论功能想法、分享使用经验

## 🚀 待完成：创建 GitHub Project

由于 GitHub Projects 的创建需要额外的权限，建议通过网页界面手动创建。以下是详细步骤：

---

## 创建 GitHub Project 的步骤

### 第一步：进入 Projects 页面

1. 访问你的仓库：https://github.com/aa12gq/quill-delta-preview
2. 点击顶部导航栏的 **"Projects"** 标签
3. 点击绿色按钮 **"New project"**

### 第二步：选择项目模板

选择 **"Board"** 模板（看板视图），然后点击 **"Create"**

### 第三步：配置项目基本信息

- **项目名称**：`Quill Delta Preview Roadmap`
- **描述**：`Tracking the development roadmap and feature implementation progress`
- **可见性**：Public（公开）

### 第四步：配置看板列（Columns）

创建以下几列来追踪不同阶段：

1. **📋 Backlog**（待办）
   - 描述：计划中但尚未开始的功能

2. **🎯 Planned**（已规划）
   - 描述：下一个版本要实现的功能

3. **🚧 In Progress**（进行中）
   - 描述：正在开发的功能

4. **👀 Review**（审查中）
   - 描述：开发完成，等待代码审查

5. **✅ Done**（已完成）
   - 描述：已完成并发布的功能

### 第五步：添加自定义字段

点击右上角的 **"..."** → **"Settings"** → **"Custom fields"**，添加以下字段：

1. **Priority（优先级）**
   - 类型：Single select
   - 选项：
     - 🔴 High（高）
     - 🟡 Medium（中）
     - 🟢 Low（低）

2. **Difficulty（难度）**
   - 类型：Single select
   - 选项：
     - ⭐ Easy
     - ⭐⭐ Medium
     - ⭐⭐⭐ Hard
     - ⭐⭐⭐⭐ Very Hard
     - ⭐⭐⭐⭐⭐ Expert

3. **Version（目标版本）**
   - 类型：Single select
   - 选项：
     - v1.1.0
     - v1.2.0
     - v1.3.0
     - v1.4.0
     - v1.5.0
     - v2.0.0

4. **Type（类型）**
   - 类型：Single select
   - 选项：
     - ✨ Feature（新功能）
     - 🐛 Bug Fix（Bug修复）
     - 📝 Documentation（文档）
     - ⚡ Performance（性能优化）
     - ♻️ Refactor（重构）

5. **Estimate（预估时间）**
   - 类型：Number
   - 描述：预估开发时间（小时）

---

## 创建初始 Issues

基于 ROADMAP.md，创建一些初始的 Issues：

### 短期计划 (v1.1.0) Issues

```bash
# 通过命令行创建（可选）
gh issue create --title "自定义主题设置" \
  --body "允许用户自定义编辑器字体大小、字体族和主题

参考 ROADMAP.md 中的描述。

- [ ] 添加设置面板
- [ ] 实现字体大小配置
- [ ] 实现字体族配置
- [ ] 添加预设主题
" \
  --label "enhancement,v1.1.0" \
  --assignee aa12gq

gh issue create --title "Delta 格式验证" \
  --body "在打开文件时验证 Delta 格式

- [ ] 实现验证逻辑
- [ ] 显示验证结果
- [ ] 提供修复建议
" \
  --label "enhancement,v1.1.0"

gh issue create --title "错误提示优化" \
  --body "更友好的 JSON 解析错误提示

- [ ] 显示具体错误位置
- [ ] 显示错误原因
- [ ] 提供修复建议
" \
  --label "enhancement,v1.1.0"

gh issue create --title "预览窗口工具栏" \
  --body "添加预览窗口工具栏

- [ ] 添加刷新按钮
- [ ] 添加复制内容按钮
- [ ] 显示统计信息（字符数、操作数）
" \
  --label "enhancement,v1.1.0"
```

或者通过 **GitHub 网页界面**创建：

1. 访问：https://github.com/aa12gq/quill-delta-preview/issues/new
2. 填写标题和描述
3. 添加标签（labels）
4. 点击 "Submit new issue"

---

## 推荐的标签（Labels）

建议创建以下标签来组织 Issues：

### 类型标签
- `bug` - Bug 报告
- `enhancement` - 新功能
- `documentation` - 文档相关
- `performance` - 性能优化
- `refactor` - 代码重构

### 优先级标签
- `priority: high` - 高优先级
- `priority: medium` - 中优先级
- `priority: low` - 低优先级

### 难度标签
- `difficulty: easy` - 简单（⭐）
- `difficulty: medium` - 中等（⭐⭐）
- `difficulty: hard` - 困难（⭐⭐⭐）

### 版本标签
- `v1.1.0` - 版本 1.1.0
- `v1.2.0` - 版本 1.2.0
- `v2.0.0` - 版本 2.0.0

### 特殊标签
- `good first issue` - 适合新手
- `help wanted` - 需要帮助
- `wontfix` - 不会修复
- `duplicate` - 重复问题

---

## 配置 Discussions 分类

访问：https://github.com/aa12gq/quill-delta-preview/discussions

建议创建以下分类：

1. **💡 Ideas**（想法）
   - 讨论新功能和改进建议

2. **🙏 Q&A**（问答）
   - 用户提问和技术支持

3. **📣 Announcements**（公告）
   - 项目更新、新版本发布

4. **🎉 Show and tell**（展示）
   - 用户分享使用案例和经验

5. **🐛 Bug Reports**（Bug报告）
   - 在转为正式 Issue 前的 Bug 讨论

---

## 将 Project 链接到仓库

1. 在 Project 页面，点击右上角的 **"..."**
2. 选择 **"Settings"**
3. 在 **"Manage access"** 中，确保仓库有访问权限
4. 在 README.md 中添加 Project 链接

更新 README.md：

```markdown
## 📊 项目进度

查看 [GitHub Project](https://github.com/users/aa12gq/projects/X) 追踪功能开发进度。
```

---

## 自动化工作流（可选）

### 使用 GitHub Actions 自动化

创建 `.github/workflows/project-automation.yml`：

```yaml
name: Project Automation

on:
  issues:
    types: [opened, labeled]
  pull_request:
    types: [opened, labeled]

jobs:
  add_to_project:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/add-to-project@v0.5.0
        with:
          project-url: https://github.com/users/aa12gq/projects/X
          github-token: ${{ secrets.ADD_TO_PROJECT_PAT }}
```

这样新的 Issue 和 PR 会自动添加到 Project 中。

---

## 完成清单

完成以下步骤后，你的项目将拥有完整的项目管理系统：

- [x] 启用 GitHub Discussions
- [ ] 创建 GitHub Project
- [ ] 配置 Project 看板和字段
- [ ] 创建初始 Issues（v1.1.0）
- [ ] 配置标签（Labels）
- [ ] 配置 Discussions 分类
- [ ] 更新 README 添加 Project 链接
- [ ] （可选）设置 GitHub Actions 自动化

---

## 参考资源

- [GitHub Projects 文档](https://docs.github.com/en/issues/planning-and-tracking-with-projects)
- [GitHub Discussions 文档](https://docs.github.com/en/discussions)
- [GitHub Issues 文档](https://docs.github.com/en/issues)
- [GitHub Actions 文档](https://docs.github.com/en/actions)

---

**需要帮助？** 如果在设置过程中遇到问题，可以：
- 查看 GitHub 官方文档
- 在 Discussions 中提问
- 或者联系我
