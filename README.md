# Youyu-fe
## 开发环境搭建
安装`Node.js`、`yarn`、`vscode`、`vue-devtool`。

`Node.js`：https://nodejs.org/en/ 安装LTS版本即可。

`yarn`：安装地址：https://yarnpkg.com/zh-Hans/docs/install#windows-stable 如何使用：https://yarnpkg.com/zh-Hans/docs/usage

`vscode`：https://code.visualstudio.com/ 请注意安装相关Vetur、TSLint、TSLint Vue、EditorConfig for VS Code四个插件

`vue-devtool`：https://github.com/vuejs/vue-devtools Chrome插件，用于Vuex数据流可视化开发

## 脚手架配置
脚手架使用指南：https://cli.vuejs.org/guide/

部署：https://cli.vuejs.org/guide/deployment.html#platform-guides

代理：https://cli.vuejs.org/config/#devserver-proxy

## 项目命令
```
yarn install # 安装依赖
yarn start # 启用开发环境 
yarn run build # 构建项目
## yarn run lint # 代码风格检查
## yarn run test:unit # 单元测试
```
强烈推荐使用`vue-cli` UI构建。首先安装`vue-cli`，运行命令`yarn global add @vue/cli`，然后再当前项目目录下运行`vue ui`。

在UI界面中构建，可以可视化依赖相关情况。预览界面

## 开发风格

### 路由风格
写路由时，一定要在全局路由下给你的页面一个路由名字 name 字段。

所有命令式路由跳转统一风格 `this.$router.push({ name: 'your-route-name' })`。而不要使用 `path` 进行跳转，这样耦合度会降低。

### 分支命名风格
命名遵循最小化描述原则，若新增一个组件A，则分支命名通常为`feature/component/A`。

新增特性前缀用`feature/`，`bug`修复前缀用`hotfix`

### 样式写法原则
能用`class`选择器不用`id`选择器。

只有设计稿特定的像素值外，其他一律使用rem作为基本单位。`1rem = 14px`。

比如留一个小小的间隙：`margin-bottom: 1rem;`。

嵌套写法好过不嵌套写法，因为嵌套写法特定级别更高，样式规则越优先。

关于样式和`element-ui`样式，只有`scoped`有作用于的样式不起作用的时候，才使用没有作用域的样式。

而且在没有作用域的样式下，一定要嵌套写法以最小化样式冲突。

### 组件原则
写一个组件就是写一个类，类的响应式数据（原对象中的data）应该越少越好，其他数据从原有的响应式数据通过计算属性衍生出来。

一个组件只做一件事情，比如登录表单组件，应该只包含表单，而不应该包含对话框。

尽量使用命令式语法。使用 `dataSource` + 模板语法增强模式。而不要在模版里生编码。
