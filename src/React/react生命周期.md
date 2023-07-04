---
title: React生命周期
author: Summer
date: 2023-07-03
category:
  - React

tag:
  - 生命周期
---

## 什么是生命周期

生命周期是组件**从实例化到销毁**的过程，也就是组件**从生成到消亡**的过程，这个过程中会伴随着一些事件，这些事件就是生命周期函数。

生命周期分为三个状态：挂载(`Mounting`)、更新(`Updating`)、卸载(`Unmounting`)。

组件的生命周期分为三个阶段：

- `render`阶段：从组件实例化到组件渲染完成的过程,用于计算当前的状态/更新信息，会根据产生的任务的优先级来决定是否执行，安排任务的调度
- `pre-commit`阶段：从组件开始渲染到组件渲染完成的过程
- `commit`阶段：从组件渲染完成到组件卸载的过程

但是在`React17`之后，`render`阶段和`pre-commit`阶段合并为一个阶段，也就是说`React17`之后只有两个阶段：`render`阶段和`commit`阶段。

因为`react`在 16.3 版本之后，推出了`Fiber`架构，`Fiber`架构的目的是为了解决`react`在渲染过程中，如果渲染任务过多，会造成页面卡顿，用户体验不好的问题，所以`Fiber`架构的目的就是为了解决这个问题，`Fiber`架构的核心就是`render`阶段和`commit`阶段的分离，`render`阶段负责计算任务，`commit`阶段负责执行任务，这样就可以根据任务的优先级来安排任务的调度，从而解决了`react`在渲染过程中，导致页面卡顿的问题。这就带来了一些生命周期钩子被废弃。

## 生命周期的分类

### 16.3 版本之前的生命周期

#### 挂载阶段

- `constructor`：构造函数，最先被执行，我们通常在构造函数里初始化组件的状态对象(`this.state`)或者给自定义方法绑定`this`。
- `componentWillMount`：组件即将被挂载到页面上之前执行，也就是在组件即将被渲染到页面之前执行，此时可以修改组件的状态对象(`this.state`)，这个方法在服务端渲染中也会被调用。
- `render`: 渲染函数，它是一个纯函数，只负责**渲染组件**。它具有以下特性：
  - 不能修改组件的状态对象(`this.state`)，可能会导致组件一直被重新渲染。
  - 不能和浏览器进行交互，不能获取 DOM 元素。
  - 只能通过`this.props`和`this.state`来获取数据。
  - 只能返回一个顶级元素，不能返回多个顶级元素。
- `componentDidMount(preProps,preState)`：组件已经被挂载到页面上之后执行，也就是在组件已经被渲染到页面之后执行，此时可以获取到真实的 DOM 元素。它具有以下特性：
  - 最早可以获取到真实 DOM 元素的钩子。

#### 更新阶段

- `componentWillReceiveProps(nextProps)`：组件即将接收到新的`props`之前执行，也就是说，当一个组件从父组件接收到新的`props`之前执行，此时可以根据新的`props`来修改组件的状态对象(`this.state`)。
  特性：

  - 在组件初始化渲染的时候不会执行，父组件被重新渲染(`state`发生变化)，这个方法也会被执行，即使父组件传递给子组件的`props`没有发生改变，这个方法也会被执行。
  - 在这个钩子里面可以最早拿到新的`props`(父组件传递给子组件)，但是不能获取到组件之前的`props`。

- `shouldComponentUpdate(nextProps,nextState)`：组件是否要被更新，也就是说，当一个组件接收到新的`props`或者`state`之后，`shouldComponentUpdate`会在组件重新渲染之前执行，此时我们可以根据新的`props`或者`state`来判断组件是否需要重新渲染，**默认返回`true`**，如果返回`false`，那么这个组件就不会被重新渲染，这个生命周期函数主要用于**性能优化**。

  - 我们可以使用`Json.stringify()`来比较两个对象(`this.state`和`nextState`)是否相等，如果两个对象相等，那么就返回`false`，如果两个对象不相等，那么就返回`true`。

- `componentWillUpdate(nextProps,nextState)`：组件即将被更新之前执行，也就是说，当一个组件要被重新渲染之前执行，此时可以根据新的`props`或者`state`来修改组件的状态对象(`this.state`)。

- `componentDidUpdate(preProps,preState)`：组件已经被更新之后执行，也就是说，当一个组件被重新渲染之后执行，此时可以获取到真实的 DOM 元素，比如：获取到**真实的 DOM**元素之后，可以使用第三方库来操作这个 DOM 元素。

#### 卸载阶段

- `componentWillUnmount`：组件即将被卸载之前执行，也就是说，当一个组件从页面上被移除之前执行，此时可以做一些清理工作，比如：清除定时器、取消网络请求、清除组件中的缓存等。

但是上面的生命周期都是在`react16.3`之前的生命周期，`react16.3`之后的生命周期有所改变，`react16.3`之后的生命周期有以下几个：

### 16.3 版本之后的生命周期

#### 挂载阶段

- `constructor`：构造函数，最先被执行，我们通常在构造函数里初始化组件的状态对象(`this.state`)或者给自定义方法绑定`this`。
- `static getDerivedStateFromProps(props, state)`：这是一个静态方法，也就是说，这个方法不能访问到组件实例(`this`)，这个方法在组件实例化之后和接收到新的`props`之后执行，这个方法的返回值会被添加到组件的状态对象(`this.state`)中,用于**性能优化**。

  - 简单来说，这个方法的作用就是根据新的`props`来更新组件的状态对象(`this.state`)，这个方法的返回值会被添加到组件的状态对象(`this.state`)中，如果返回`null`，则不会更新组件的状态对象(`this.state`)，**就是将`return`到的对象替换当前的`state`**。
  - 他在第一次渲染的时候被调用，以后每次接收到新的`props`之后都会被调用。

- `render`: 渲染函数，它是一个纯函数，只负责**渲染组件**。他和`react16.3`之前的`render`函数没有什么区别。

#### 更新阶段

- `getSnapshotBeforeUpdate(preProps,preState)`:这个方法在组件更新之前执行，此时可以获取到最新的 DOM 数据，在这个方法中返回的任何值都会作为参数传递给`componentDidUpdate`的第三个参数。

  - 简单来说，这个方法的作用就是在组件更新之前获取到最新的 DOM 数据，然后在`componentDidUpdate`中获取到这个方法的返回值。
  - 这个方法的返回值会作为参数传递给`componentDidUpdate`的第三个参数。
  - 这个方法在组件初始化渲染的时候不会被调用，只有在组件更新的时候才会被调用。

- `shouldComponentUpdate(nextProps,nextState)`：组件是否要被更新,用于**性能优化**。和`react16.3`之前的`shouldComponentUpdate`没有什么区别。

- `componentDidUpdate(preProps,preState,snapshot)`：组件已经被更新之后执行，也就是说，当一个组件被重新渲染之后执行，此时可以获取到真实的 DOM 元素。也可以在这个钩子里面根据`preProps`和`preState`来做一些**性能优化**。但是如果你要在这个钩子里面使用`this.setState`来修改状态的话，必须要有一个**条件限制**（判断 props），否则会导致组件陷入死循环。

#### 卸载阶段

- `componentWillUnmount`：组件即将被卸载之前执行，也就是说，当一个组件从页面上被移除之前执行，此时可以做一些清理工作，比如：清除定时器、取消网络请求、清除组件中的缓存等。

上述介绍的所有生命周期钩子，都是借助`React`的`class`组件来实现的，但是在`React16.8`之后，新增了一个`hook`函数，可以让我们在不使用`class`组件的情况下使用生命周期钩子。

### `hook`函数

`hook`函数是`React16.8`之后新增的一个函数，可以让我们在不使用`class`组件的情况下使用生命周期钩子。

其实严格来说，`hook`函数并不是生命周期钩子，它只是模拟了生命周期钩子的功能，因为，**生命周期函数都是`react.component`的方法，函数组件并没有继承，所以也不会拥有**

- `useEffect`: 这个函数的作用就相当于`componentDidMount`、`componentDidUpdate`和`componentWillUnmount`这三个生命周期函数的集合。

```js
import React, { useState, useEffect } from "react";

function App() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    console.log("组件挂载完成");
    return () => {
      console.log("组件即将被卸载");
    };
  }, []);
  return (
    <div>
      <p>你点击了{count}次</p>
      <button onClick={() => setCount(count + 1)}>点击</button>
    </div>
  );
}
```

