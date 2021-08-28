# 一、对React的理解
    1. 是什么？一直话直达本质
    2. 能干什么？用途和应用场景
    3. 如何干的？核心的工作原理
    4. 干的如何？优缺点
## 1.React是什么？
React 是用 JavaScript 构建快速响应的大型 Web 应用程序的首选方式

## 2.React能干什么？
可以通过组件化的方式构建快速响应的大型Web应用程序

## 3.React如何干的？
1. 声明式：使用声明式编写界面代码，方便调试
    声明式渲染：只需要告诉程序我们想要什么效果，其余的交给程序来做。
    命令式：命令我们的程序去做什么，程序就会跟着你的命令去一步一步执行。
2. 组件化：把页面拆分为一个个组件，方便视图的拆分和复用，还可以做到高内聚低耦合

3. 一次学习，随处编写
    可以使用React开发Web、Android、IOS、VR和命令行程序。
    ReactNative使用React来开发Android和IOS.
    React 360是一个创建3D和VR用户交互的框架。
## 4. React优缺点
1. 优点：
* （1）开发团队和社区强大
* （2）一次学习，多处编写
* （3）API简洁
2. 缺点：
*（1）没有官方系统解决方案，技术选型成本高，如状态管理，需借助Redux或者Mobx；
*（2）过于灵活，不容易写出高质量的应用。
## 5. 其它扩展
1. JSX实现声明式原理
2. 虚拟DOM实现跨平台
3. React使用的设计模式
4. 自己React大型架构经验


### 二、为什么引入JSX
    1. 解释概念
    2. 想实现什么目的？
    3. 有哪些可选方案？为什么这个方案最好
    4. JSX的工作原理
## 1. JSX是什么？
* JSX是JavaScript语法的扩展，JSX可以很好的描述UI应该呈现出它应有交互的本质形式。
* JSX其实是React.createElement的语法糖。

## 2. React想实现什么目的
1. 需要实现声明式
2. 代码结构需要非常清晰和简洁，可读性强
3. 结构、样式和事件需要实现高内聚低耦合，方便复用和组合
4. 不想引入新的概念和语法，只写JavaScript

## 3. 为什么JSX最好，有哪些方案
1. 模板
    (1) Vue.js使用了基于HTML的模板语法，允许开发者声明式地将DOM绑定至底层Vue实例的数据
    (2) 引入太多概念，比如Angular引入了控制器、作用域、服务等概念。
    ```html
    <button v-on:click="couter+=1"></button>
    ```

## 4. JSX工作原理
* [babeljs](https://www.babeljs.cn/)
* [astplorer](https://astexplorer.net/)
4.1 AST抽象语法树
AST(Abstract-Syntax-Tree)抽象语法树，是源代码语法结构的一种抽象表示，它以树状的形式表示编程语言的语法结构，树上的每个节点都表示源代码中的一种结构。
4.2 Babel定义
Babel是一个工具链，主要用于将采用ES5+语法编写的代码转为向后兼容的js语法，以便能够在当前版本和旧版本浏览器或其他环境中运行
4.3 babel工作流
* 语法转换
* 通过polyfill方式在目标环境中添加新的特性
* 源码转换
[babel文档](https://www.babeljs.cn/docs/)

## 安装
使用npm 安装
```
npm install @babel/core @babel/plugin-syntax-jsx @babel/plugin-transform-react-jsx @babel/types --save
```
使用yarn安装
```
yarn add @babel/core @babel/plugin-syntax-jsx @babel/plugin-transform-react-jsx @babel-types
```

```javascript
var babel = require('@babel/core');
const sourceCode = '<h1 id="title">hello<span>world</span></h1>';

const result = babel.transform(sourceCode, {
    // plugins: [['@babel/plugin-transform-react-jsx', {runtime: 'classic'}]],
    plugins: [['@babel/plugin-transform-react-jsx', {runtime: 'automatic'}]],
})
console.log(result.code)
```

classic运行结果：
```javascript
/*#__PURE__*/
React.createElement("h1", {
  id: "title"
}, "hello", /*#__PURE__*/React.createElement("span", null, "world"));
```
用到了React.createElement，所以旧的转换需要import React from 'react'是这个原因。

而新版的转换，把createElement放到了jsx-runtime当中去实现，就不需要引入React变量。
```javascript
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

/*#__PURE__*/
_jsxs("h1", {
  id: "title",
  children: ["hello", /*#__PURE__*/_jsx("span", {
    children: "world"
  })]
});

```
### 三、VirtualDOM
1. VirtualDOM是什么？
* React.createElement方法返回一个普通的JS对象，它就是所谓的VirtualDOM
* 虚拟DOM是跨平台的，跟平台无关
2. 优缺点
* 优点
    * 处理了浏览器兼容问题，避免用户操作真实DOM；
    （比如阻止冒泡事件、默认事件，在各浏览器会有一些差异性）
    * 内容经过了XSS攻击，可以防范XSS攻击；
    * 容易实现跨平台开发Android, IOS, VR应用；
    * 更新的时候可以实现差异化更新，减少更新DOM的操作。
* 缺点
    * 虚拟DOM需要消耗额外的内存；
    * 首次渲染时，并不快；
    （在更新时，更新内容比较少，可以实现精准的定量更新，不需要把所有的DOM元素重新删除添加）

### React.createElement实现
```javascript
const RESERVED_PROPS = {
    key: true,
    ref: true,
    __self: true,
    __source: true,
};
  /**
   * 
   * @param {*} type 元素类型eg: div
   * @param {*} config {id: , className: ,key: }
   * @param {*} children 可能是一个元素、字符串、数字、null或者数组
   * props.children = null|number|string|element | [null|number|string|element]
   * @returns element
   * React.createElement方法返回一个普通的JS对象，它就是所谓的VirtualDOM
   */
export function createElement(type, config, children) {
    let props = {};
    let key = null;
    if(config) {
        key = config.key;
    }
    for(let propName in config) {
        if (Object.hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
            props[propName] = config[propName];
        }
    }
    let childrenLength = children.length - 2;
    if (childrenLength === 1) {
        props.children = children;
    } else if (childrenLength >= 2) {
        let childArray = [];
        for (let i = 0; i < childrenLength; i ++) {
            childArray.push(children[i]);
        }
        props.children = childArray;
    }
    let element = {
        $$typeof: REACT_ELEMENT_TYPE,
        type,
        key,
        props,
    }

    return element;
}

```

Symbol.for(key)返回由给定的key找到的symbol，否则就是创建新的Symbol
```javascript
const symbolFor = Symbol.for;
export const REACT_ELEMENT_TYPE = symbolFor('react.element');
```



