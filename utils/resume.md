# React Material Blog Server

##### **完全原创、独立完成**的[个人站点](https://www.youknowznm.com/)的后端。前端代码在[这里](https://github.com/youknowznm/react-material-blog)。

### 特点：

  - Material Design 风格，自适应于不同设备的浏览器
  - 可编辑和展示文章标题、摘要、Markdown 内容、标签和创建日期
  - 可在编辑器内实时预览 Markdown 内容
  - 支持图片的上传和托管
  - 管理员可创建或编辑文章，并管理访客在文章下的评论
  - 访客无需注册即可对文章进行点赞、评论
  - 根据浏览器指纹控制访客在一定时间内的评论数
  - 支持按指定的标签类别展示文章，阅读时展示文章的索引
  - 根据配置展示 GitHub 作品、社交资料和个人简历

### 技术栈：

前端：

  - 使用 [react-redux](https://github.com/reactjs/react-redux) 处理数据的渲染和单向流动
  - 使用 [redux-thunk](https://github.com/troch/react-thunk) 和 [redux-action-tools](https://github.com/kpaxqin/redux-action-tools) 处理异步 action
  - 使用 [material-ui](https://github.com/mui-org/material-ui) 组件库和 [material-ui-icons](https://github.com/MODX-Club/material-ui-icons) 图标库实现全站的 Material Design 风格
  - 使用 [fingerprint.js](https://github.com/Valve/fingerprintjs2) 作为客户端的访客身份标识
  - 使用 [react-syntax-highlighter](https://github.com/conorhastings/react-syntax-highlighter) 实现展示文章时的代码高亮
  - 使用 [marked](https://github.com/markedjs/marked) 渲染文章的 Markdown 内容为 HTML
  - 使用 [axios](https://github.com/axios/axios) 处理客户端 HTTP 请求
  - 使用 [node-sass-chokidar](https://github.com/michaelwayman/node-sass-chokidar) 转译 SCSS 为 CSS

后端：

  - 使用 [mini-express](https://github.com/youknowznm/mini-express)（我的另一个项目）作为简易的服务器框架
  - 使用 [mongodb](https://www.mongodb.com/) 存取数据
  - 使用 [mongoose](http://mongoosejs.com/) 简化对 MongoDB 的操作
  - 使用 [shortid](https://github.com/dylang/shortid) 生成文档的 _id


### 调试：

  1. 克隆 [react-material-blog](https://github.com/youknowznm/react-material-blog) 和 [react-material-blog-server](https://github.com/youknowznm/react-material-blog-server)

  2. 安装 mongodb

  3. 进入 react-material-blog 项目

  ```bash
  npm i
  npm run scss
  npm run dev
  ```

  4. 进入 react-material-blog-server 项目

  ```bash
  npm i
  npm run dev
  ```

  5. 在 `localhost:3000` 查看。
