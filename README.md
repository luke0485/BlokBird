<div align="center">
  <img src="logo.svg" width="86" alt="BlokBird 彩虹像素鸟图标">
  <h1>BlokBird</h1>
  <p><strong>把界面变成代码，把代码变成理解。</strong></p>
  <p>面向前端初学者的交互式 UI 科教工具：在手机画布中自由创作，并从每一次修改中学习 HTML、CSS 与 JavaScript。</p>
  <p><a href="https://luke0485.github.io/BlokBird/"><strong>在线体验</strong></a> · <a href="https://github.com/luke0485/BlokBird">查看源码</a> · <a href="LICENSE">MIT License</a></p>
</div>

![BlokBird 默认三栏学习界面](docs/blokbird-overview.svg)

## 为什么是 BlokBird

BlokBird 将**组件素材、手机画布、代码理解与属性设置**放在同一个工作区。学习者不用先背语法：放入按钮、改变颜色、调整尺寸或添加动画，旁边的代码会同步变化；点击代码行，还能看到当前数值为什么这样写、它如何影响眼前的界面。

## 可以做什么

- 使用按钮、标题、文本、卡片、图片、表单、布局和完整应用流程自由创作
- 在真实比例的手机画布中拖动组件四角，调整宽度和高度
- 自定义底部导航栏颜色、形状、高度、图标和选中状态
- 设置页面跳转、提示、弹窗、链接、输入校验和动画效果
- 点击 HTML、CSS、JavaScript 代码行，阅读结合当前界面的中文解释
- 导入图片并在浏览器本地识别纯色背景
- 保存可继续编辑的项目文件，或导出可独立运行的交互网页

## 开始使用

直接打开 [在线版本](https://luke0485.github.io/BlokBird/)，从左侧选择组件并放入手机画布。选中元素后，在右侧修改内容、尺寸、颜色、动画与交互；代码理解区会同步展示对应实现。

本地运行无需构建：克隆仓库后直接打开 `index.html`。运行测试需要 Node.js 20 或更高版本：

```bash
npm test
```

## 技术与开源

项目使用原生 HTML、CSS 和 JavaScript，可部署到任意静态网站服务。项目数据保存在浏览器 `localStorage` 中。

**作者：luke0485、GPT 5.6sol**
本项目使用 [MIT License](LICENSE) 开源。
