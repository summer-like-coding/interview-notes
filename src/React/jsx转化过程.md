---
title: jsx转化过程
date: 2023-07-09
author: Summer
category:
  - React
tag:
  - React
  - jsx
---

## 什么是 jsx？

`jsx` `jsx` 可以生成 `React` 元素，它是 `React` 的一种语法糖。

## jsx 转化过程

### 1. 转化为 React 元素

首先`jsx`会被`babel`转化成`React.createElement`的形式(`React16`),在`React17`以后,`JSX`不会将`JSX`转化为`React.createElement`的形式,而是直接从`React`的包中引入`JSX`的运行时,这样就不需要引入`React`了,这样就减少了打包的体积。

举一个例子：

```jsx
<div id="app" className="app">
  <span>hello</span>
  <Hello>hello</Hello>
</div>
```

#### 在 React16 中，会被转化成：

```js
/*#__PURE__*/ React.createElement(
  "div",
  {
    id: "app",
    className: "app",
  },
  /*#__PURE__*/ React.createElement("span", null, "hello"),
  /*#__PURE__*/ React.createElement(Hello, null, "hello")
);
```

`createElement(type, [props], [...children])`

接受三个参数：

- `type`：表示元素的类型，可以是原生的 DOM 元素，也可以是自定义的组件。
- `props`：表示元素的属性，比如 `id`、`className`、`style` 等。
- `children`：表示当前元素的子元素。

返回类型：`ReactElement`

`ReactElement`

`ReactElement` 是 `React` 元素的类型，它是一个对象，它的结构如下：

```ts
const ReactElement = function (type, key, ref, self, source, owner, props) {
  const element = {
    // 用于标识这是一个 React 元素
    $$typeof: REACT_ELEMENT_TYPE,
    // 用于标识这个元素的类型
    type: type,
    key: key,
    ref: ref,
    props: props,
    // 记录创建这个元素的组件
    _owner: owner,
  };

  return element;
};
```

- `$$typeof`：用于标识这是一个 `React` 元素。他是一个 `Symbol` 类型的值，值为 `Symbol.for('react.element')`。
- `type`: 用于标识这个元素的类型，可以是原生的 DOM 元素，也可以是自定义的组件。
- `ref`: 用于标识这个元素的 `ref` 属性。
- `props`: 用于标识这个元素的属性(`class`等)。
- `key`: 用于标识这个元素或者组件的 `key` 属性。

#### 在 React17 中，会被转化成：

```js
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
/*#__PURE__*/ _jsxs("div", {
  id: "app",
  className: "app",
  children: [
    /*#__PURE__*/ _jsx("span", {
      children: "hello",
    }),
    /*#__PURE__*/ _jsx(Hello, {
      children: "hello",
    }),
  ],
});
```

`jsx(type, props, children)`

接受三个参数：

- `type`：表示元素的类型，可以是原生的 DOM 元素，也可以是自定义的组件。
- `props`：表示元素的属性，比如 `id`、`className`、`style` 等。
- `children`：表示当前元素的子元素。

返回类型：`ReactElement`

引申：为什么在 React 老版本中，使用 `jsx` 语法时，需要引入 `React`，而在 React17 中，不需要引入 `React`？

因为在 React16 中，`jsx` 会被转化成 `React.createElement` 的形式，而 `React.createElement` 是一个函数，所以在使用 `jsx` 语法时，需要引入 `React`。但是在 React17 中，`jsx` 会被转化成 `React.js` 中的 `jsx` 函数，而 `jsx` 函数是一个 `import` 导入的函数，所以不需要引入 `React`。

### 2. React 元素转化为 Fiber

在`ReactElement`被创建完以后，它就会被调度器`Scheduler`接管，`Scheduler`会将这个`ReactElement`放到`Fiber`中。

`Filber`对应的是`React`中的`Fiber`，`Fiber`是`React`中的一个核心算法，它是一个链表结构，它的结构如下：

```ts
type Fiber = {
  // 用于标识这个 Fiber 对应的组件
  type: any;
  // 用于标识这个 Fiber 对应的 DOM 元素
  key: null | string;
  // 用于标识这个 Fiber 对应的 DOM 元素
  elementType: any;
  // 用于标识这个 Fiber 对应的 DOM 元素
  ref: null | (((handle: any) => void) & { _stringRef: ?string }) | RefObject;
  // 用于标识这个 Fiber 对应的 DOM 元素
  source: null | Source;
  // 用于标识这个 Fiber 对应的 DOM 元素
  return: Fiber | null;
  // 用于标识这个 Fiber 的子 Fiber
  child: Fiber | null;
  // 用于标识这个 Fiber 的兄弟 Fiber
  sibling: Fiber | null;
  // 用于标识这个 Fiber 对应的组件的状态
  stateNode: any;
  // 任务优先级
  memoizedState: any;
  // 任务阶段
  memoizedProps: any;
};
```

它对应三种关系：

- `return`：用于标识这个 Fiber 的父 Fiber。
- `child`：用于标识这个 Fiber 的子 Fiber。
- `siblings`：用于标识这个 Fiber 的兄弟 Fiber。

并且`Filber`中还存在任务优先级属性，用于标识这个任务的优先级，优先级越高，越先执行。

### 3. Fiber 转化为 DOM

在`Fiber`被创建完以后，它就会被`Renderer`接管，`Renderer`会将这个`Fiber`转化成`DOM`。
