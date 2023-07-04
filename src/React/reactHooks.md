---
title: React Hooks
author: Summer
date: 2023-07-04
category:
  - React

tag:
  - React
  - Hooks
---

## React Hooks

### 类组件和函数组件

#### 类组件

类组件使用`class`,类组件时继承`React.Component`。
类组件具有自己的状态(`state`),可以在`constructor`中初始化`state`,直接使用`this.state`来进行修改状态。

```javascript
import React from "react";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }
  render() {
    return (
      <div>
        <h1>{this.state.count}</h1>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          +1
        </button>
      </div>
    );
  }
}
```

#### 函数组件

函数组件是一个函数，函数组件没有自己的状态(`state`)，函数组件只能接收`props`，不能修改`props`。

```javascript
import React from "react";
function App(props) {
  return (
    <div>
      <h1>{props.count}</h1>
      <button onClick={() => props.setCount(props.count + 1)}>+1</button>
    </div>
  );
}
```

#### 类组件和函数组件的区别

1. 类组件有自己的状态(`state`)，函数组件没有自己的状态(`state`)。

但是函数组件可以通过`useState`来使用状态(`state`)。

2. 类组件有生命周期钩子，函数组件没有生命周期钩子。

但是函数组件可以通过`useEffect`来模拟生命周期钩子。`useEffect`其实就可以用来模拟`componentDidMount`、`componentDidUpdate`和`componentWillUnmount`这三个生命周期钩子。

3. 类组件可以使用`this`关键字，函数组件不能使用`this`关键字。

### Hooks 种类

#### `useState`函数

`useState`函数可以让我们在函数组件中使用状态对象(`this.state`)，`useState`函数接收一个参数，这个参数就是状态对象(`this.state`)的初始值，`useState`函数返回一个数组，这个数组的第一个元素就是状态对象(`this.state`)，第二个元素是一个函数，这个函数可以用来修改状态对象(`this.state`)。

```js
import React, { useState } from "react";

export default function App() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <h1>{count}</h1>
      <button onClick={() => setCount(count + 1)}>+1</button>
    </div>
  );
}
```

#### `useEffect`函数

`useEffect`函数可以让我们在函数组件中使用生命周期钩子，`useEffect`函数接收一个函数作为参数，这个函数就相当于`componentDidMount`、`componentDidUpdate`和`componentWillUnmount`这三个生命周期钩子的集合体，这个函数会在**组件初始化渲染之后执行，也会在组件更新之后执行，也会在组件卸载之前执行**。

```js
import React, { useState, useEffect } from "react";

export default function App() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    console.log("组件初始化渲染之后执行");
    return () => {
      console.log("组件即将被卸载之前执行");
    };
  }, [count]); // 数组中传入的值，只有在这些值发生改变的时候，才会执行useEffect函数中的函数
  return (
    <div>
      <h1>{count}</h1>
      <button onClick={() => setCount(count + 1)}>+1</button>
    </div>
  );
}
```

`react18`以后，`useEffect`会被执行两次，这是为了模拟立即卸载组件和重新挂载组件的情况。

#### `useContext`函数

`useContext`函数可以让我们在函数组件中使用`React`的上下文对象。

场景：
有一个父组件，父组件中有一个状态对象(`this.state`)，父组件中有一个子组件，子组件中需要使用到父组件中的状态对象(`this.state`)，这个时候就可以使用`React`的上下文对象来实现。

```js
import React, { useState, useContext } from "react";
// 创建一个上下文对象
const MyContext = React.createContext();

export default function App() {
  const [count, setCount] = useState(0);
  return (
    <MyContext.Provider value={{ count, setCount }}>
      <Child />
    </MyContext.Provider>
  );
}

function Child() {
  const { count, setCount } = useContext(MyContext);
  return (
    <div>
      <h1>{count}</h1>
      <button onClick={() => setCount(count + 1)}>+1</button>
    </div>
  );
}
```

**需要特别注意，常见的上下文，如果不在一个文件里面，那么就需要将这个上下文暴露出去，并且在子组件里面应用，并且访问**

`useContext`进行传递参数和`Props`父子传参的区别：`useContext`可以跨越多层组件传递参数，而`Props`只能在父子组件之间传递参数。

引申：React 之间组件通信的方式有哪些？

参考链接：[组件通信方式](./react%E7%BB%84%E4%BB%B6%E9%80%9A%E4%BF%A1%E6%96%B9%E5%BC%8F.md)

#### `useReducer`函数

`useReducer`函数可以让我们在函数组件中使用`Redux`的`reducer`函数。

```js
import React, { useReducer } from "react";

export default function App() {
  const [count, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "add":
        return state + 1;
      case "sub":
        return state - 1;
      default:
        return state;
    }
  }, 0);
  return (
    <div>
      <h1>{count}</h1>
      <button onClick={() => dispatch({ type: "add" })}>+1</button>
      <button onClick={() => dispatch({ type: "sub" })}>-1</button>
    </div>
  );
}
```

#### `useMemo`函数

`useMemo`函数可以让我们在函数组件中**缓存一些数据**，这些数据只有**在依赖的值发生改变**的时候，他才会重新计算。

```js
import React, { useState, useMemo } from "react";

export default function App() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("张三");
  const double = useMemo(() => {
    console.log("计算double");
    return count * 2;
  }, [count]);
  return (
    <div>
      <h1>{count}</h1>
      <h1>{name}</h1>
      <h1>{double}</h1>
      <button onClick={() => setCount(count + 1)}>+1</button>
      <button onClick={() => setName("李四")}>改名</button>
    </div>
  );
}
```

我们可以这么理解`useMemo`和`useState`的关系：

- 我们可以将`useState`设置出来的状态理解为自变量，只要自变量改变(`state`)，那么视图就会发生变化。
- 同样的，`useMemo`用来缓存**因变量**，只要因变量改变(`count`)，那么因变量就会重新计算(`double`)，而`double`的重新计算，会导致视图的重新渲染。

其实可以将`useMemo`理解为`Vue`中的计算属性。

#### `useCallback`函数

`useCallback`函数可以让我们在函数组件中**缓存一些函数**，这些函数只有**在依赖的值发生改变**的时候，他才会重新创建。

```js
import React, { useState, useCallback } from "react";

export default function App() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("张三");
  const handleClick = useCallback(() => {
    console.log("handleClick");
  }, [count]);
  return (
    <div>
      <h1>{count}</h1>
      <h1>{name}</h1>
      <button onClick={() => setCount(count + 1)}>+1</button>
      <button onClick={() => setName("李四")}>改名</button>
      <button onClick={handleClick}>点击</button>
    </div>
  );
}
```

我们可以这么理解`useCallback`和`useState`的关系：

- 我们可以将`useState`设置出来的状态理解为自变量，只要自变量改变(`state`)，那么视图就会发生变化。
- 同样的，`useCallback`用来缓存**因变量函数**，只要因变量改变(`count`)，那么因变量就会重新创建(`handleClick`)，而`handleClick`的重新创建，会导致视图的重新渲染。

其实`useCallback`函数和`useMemo`函数的实现原理是一样的，只不过`useCallback`函数返回的是一个函数，而`useMemo`函数返回的是一个值。

#### `useRef`函数

`useRef`函数可以让我们在函数组件**创建引用对象**，这些数据不会导致视图的重新渲染。

`useRef`函数它会返回一个`refObj`对象，这个对象有一个`current`属性，这个属性可以用来存储数据。
特点：**更新 ref 数据，不会导致视图重新渲染**

一般我们会将`useRef`和`ref`结合使用，来获取`DOM`元素。

```js
import React, { useState, useRef } from "react";

export default function App() {
  // 创建ref对象
  const inputRef = useRef();
  // 获取input输入内容
  const changeData = () => {
    console.log(inputRef.current.value);
  };
  return (
    <div>
      <input type="text" ref={inputRef} @change="changeData"/>
    </div>
  );
}
```

`useRef` 可以用来引用任何类型的对象，`React ref` 只是一个用于引用 `DOM` 元素的 `DOM` 属性

```js
import { useState, useRef } from "react";

export default function Stopwatch() {
  const [startTime, setStartTime] = useState(null);
  const [now, setNow] = useState(null);
  //   let timmer = null
  const timmer = useRef(null);
  function handleStart() {
    // 开始计时。
    setStartTime(Date.now());
    setNow(Date.now());

    timmer.current = setInterval(() => {
      // 每 10ms 更新一次当前时间。
      setNow(Date.now());
    }, 10);
  }

  function handleStop() {
    clearInterval(timmer.current); // 这时候timmer是undefined，获取不到的，所以需要在外面定义
    // timmer在外边定义，确实可以获取到，但是无法清除，因为timmer是一个局部变量，每次执行handleStart的时候，都会重新定义一个timmer，所以无法清除
    // 这时候就只能用useRef了
  }

  let secondsPassed = 0;
  if (startTime != null && now != null) {
    secondsPassed = (now - startTime) / 1000;
  }

  return (
    <>
      <h1>时间过去了： {secondsPassed.toFixed(3)}</h1>
      <button onClick={handleStart}>开始</button>
      <button onClick={handleStop}>停止</button>
    </>
  );
}
```

`react`官网也表达，当你的组件需要保存一些不需要导致视图更新的数据时，可以使用`useRef`。比如上面的例子，我们需要保存一个定时器，这个定时器不需要导致视图的更新，所以我们可以使用`useRef`。
