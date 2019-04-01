# Youyu FE

## **[更新日志 ChangeLog.md](./ChangeLog.md)**

以后系统更新日志写在此处，较新的更新写在前面

## 开发环境搭建

安装`Node.js`、`yarn`、`vscode`、`vue-devtool`。

`Node.js`：https://nodejs.org/en/ 安装`LTS`版本即可。

`yarn`：安装地址：https://yarnpkg.com/zh-Hans/docs/install#windows-stable 如何使用：https://yarnpkg.com/zh-Hans/docs/usage

`vscode`：https://code.visualstudio.com/ 请注意安装相关`Vetur`、`TSLint`、`TSLint Vue`、`EditorConfig for VS Code`四个插件

`vue-devtool`：https://github.com/vuejs/vue-devtools `Chrome`插件，用于`Vuex`数据流可视化开发

## 脚手架配置

脚手架使用指南：https://cli.vuejs.org/guide/

部署：https://cli.vuejs.org/guide/deployment.html#platform-guides

代理：https://cli.vuejs.org/config/#devserver-proxy

## 项目命令

```bash
yarn install # 安装依赖
yarn run serve # 启用开发环境
yarn start # 启用开发环境
yarn run build # 构建项目
yarn run lint # 代码风格检查
yarn run test:unit # 单元测试
```
强烈推荐使用`vue-cli UI`构建。首先安装`vue-cli`，运行命令`yarn global add @vue/cli`，然后再当前项目目录下运行`vue ui`。

在UI界面中构建，可以可视化依赖相关情况。[预览界面](./docs/images/build.jpg)

## 知识点

- `Vue`组件类式写法：https://github.com/vuejs/vue-class-component 了解对象式写法到类式写法的转换，计算属性，方法，生命周期的转换。[官方文档的解释](https://cn.vuejs.org/v2/guide/typescript.html#Class-%E9%A3%8E%E6%A0%BC%E7%9A%84-Vue-%E7%BB%84%E4%BB%B6)
- `Vue`属性装饰器：https://github.com/kaorun343/vue-property-decorator 了解`@Prop(...)`，知道写法即可。有余力可以了解什么是类型反射（type reflect）？
    该库的`@Prop(...)`原理为[此行](https://github.com/kaorun343/vue-property-decorator/blob/19136ea9dcdf31e2d8fa93a0997bb6b1869bf8d8/src/vue-property-decorator.ts#L77)获取到了`Typescript`的标注类型
- `Vuex`的组件类式写法：https://github.com/ktsn/vuex-class 语法糖
- `Typescript`文档：https://www.tslang.cn/docs/handbook/modules.html 了解什么是接口（interface），如何导入模块，如何标注一个函数的类型？接口写法通常在其他静态语言中以字母`I`开头，此命名方式不同人各有所爱。特别地，在本项目中，模块名中的`@/`是路径语法糖，表示`src/`。
- `Sass`语法：https://www.sass.hk/docs/ 了解嵌套规则、父选择器`&`、变量`$`
- `Less`语法和`Sass`语法大同小异，注意变量通常以`@`
- 发起请求通常是在`Vuex Action`中，请求到的数据通过`commit mutation`，将数据和状态（state）“融合”，反应到当前视图（view）中
- 本项目中一个写`Vuex`模块的例子todo：[example.ts](./src/stores/example.ts)

## 开发风格

### 路由风格

写路由时，一定要在全局路由下给你的页面一个路由名字 `name` 字段。

所有命令式路由跳转统一风格 `this.$router.push({ name: 'your-route-name' })`。而不要使用 `path` 进行跳转，这样耦合度会降低。

### 分支命名风格

命名遵循最小化描述原则，若新增一个组件A，则分支命名通常为`feature/component/A`。

新增特性前缀用`feature/`，`bug`修复前缀用`hotfix/`。

### 样式写法原则

能用`class`选择器不用`id`选择器。

只有设计稿特定的像素值外，其他一律使用`rem`作为基本单位。`1rem = 14px`。

比如留一个小小的间隙：`margin-bottom: 1rem;`。

嵌套写法好过不嵌套写法，因为嵌套写法特定级别更高，样式规则越优先。

关于样式和`element-ui`样式，只有`scoped`有作用于的样式不起作用的时候，才使用没有作用域的样式。

而且在没有作用域的样式下，**一定要嵌套写法**以最小化样式冲突。

### 组件原则

写一个组件就是写一个类，类的响应式数据（原对象中的`data`）应该越少越好，其他数据从原有的响应式数据通过计算属性衍生出来。

一个组件只做一件事情，比如登录表单组件，应该只包含表单，而不应该包含对话框。

尽量使用命令式语法。使用 `dataSource` + 模板语法增强模式。而不要在模版里生编码。见 `TopNav.vue` 和 `LeftSider.vue` 的 `menu` 属性。

### 其他

确保`Vetur`安装之后，在`vscode`中使用快捷键`shift + alt + F`即可快速代码整洁化，通常只会整洁`ts`和`less`。`html`模板部分需要按`ctrl + 逗号`打开用户设置，在用户设置中设置`"vetur.format.defaultFormatter.html": "js-beautify-html"`即可。
