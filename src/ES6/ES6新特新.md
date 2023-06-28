---
title: ES6新特新
# 设置作者
author: Summer
# 设置写作时间
date: 2023-06-27
category:
  - ES6篇
tag:
  - ES6
  - 新特性
---

### let 和 const 和 var

#### 产生时间

`var`是 ES5 的产物，`let`和`const`是 ES6 的产物。

#### 作用域

##### 作用域补充

1. 什么是作用域？

   作用域就是变量和函数的可访问范围，也就是说在什么范围内可以访问到变量和函数。

2. 作用域分类

   全局作用域：在代码的任何地方都可以访问到的变量和函数(**只要不在函数内部或者在大括号内的都是全局作用域**)。

   块级作用域：在大括号内可以访问到的变量和函数。

   函数作用域：在函数内部可以访问到的变量和函数。

```typescript
// 全局作用域
var a = 1;
let b = 2;
const c = 3;
// 块级作用域
{
  var a = 4;
  let b = 5;
  const c = 6;
  console.log(a); // 4
  console.log(b); // 5
  console.log(c); // 6
}
console.log(a); // 4
console.log(b); // 2
console.log(c); // 3
// 函数作用域

function fn() {
  var a = 7;
  let b = 8;
  const c = 9;
  console.log(a); // 7
  console.log(b); // 8
  console.log(c); // 9
}
fn();
console.log(a); // 4
console.log(b); // 2
console.log(c); // 3
```

上述代码表明：

- `var`声明的变量在全局作用域和块级作用域中都可以访问到，并且是可以被改变的，但是在函数作用域中不能访问到。
- `let`和`const`声明的变量在全局作用域中可以访问到，但是在块级作用域和函数作用域中都不能访问到。(**仅在当前这个作用域生效，可被改变**)

#### 变量提升(临时死亡区)

什么是变量提升？

变量提升就是在代码执行之前，会把**变量的声明**提升到代码的最前面，**但是，赋值还是在后面**。

什么是临时死亡区？

临时死亡区就是代码块的起始位置到变量声明的位置，这段区域内不能访问到变量。**如果访问，那么会报错(ReferenceError)**

```typescript
console.log(a); // undefined
var a = 1;
console.log(a); // 1
```

上面这段代码表明，`var`声明的变量会被提升到代码的最前面，但是变量的赋值不会被提升。

```typescript
console.log(b); // 报错
let b = 2;
console.log(b); // 2
```

上面这段代码表明，`let`声明的变量不会被提升到代码的最前面，所以在声明之前访问变量会报错。

```typescript
console.log(c); // 报错
const c = 3;
console.log(c); // 3
```

上面这段代码表明，`const`声明的变量不会被提升到代码的最前面，所以在声明之前访问变量会报错。

#### 重复声明

`var`声明的变量可以被重复声明，而`let`和`const`声明的变量不能被重复声明。

```typescript
var a = 1;
var a = 2;
console.log(a); // 2
```

上面这段代码表明，`var`声明的变量可以被重复声明，而且后面的声明会覆盖前面的声明。

```typescript
let b = 1;
let b = 2;
console.log(b); // 报错

const c = 1;
const c = 2;
console.log(c); // 报错
```

上面这段代码表明，`let`和`const`声明的变量不能被重复声明。

#### 可变性

`var`和`let`声明的变量是可变的，而`const`声明的变量是不可变的。

```typescript
var a = 1;
a = 2;
console.log(a); // 2

let b = 1;
b = 2;
console.log(b); // 2
```

上面的代码表明，`var`和`let`声明的变量是可变的。

```typescript
const c = 1;
c = 2;
console.log(c); // 报错
```

### 箭头函数

形式：`() => {}`

特点：

1. 箭头函数没有`this`，`this`指向的是**函数定义时所在的对象**，而不是使用时所在的对象；但是普通函数有`this`,指向的是**函数使用时所在的对象**。

```typescript
const obj = {
  name: "Summer",
  fn: function () {
    console.log(this); // obj
    setTimeout(function () {
      console.log(this); // window，setTimeout是window的方法
    }, 1000);
  },
  fn2: function () {
    console.log(this); // obj
    setTimeout(() => {
      console.log(this); // obj，因为箭头函数没有this，所以this指向的是函数定义时所在的对象
    }, 1000);
  },
};
obj.fn(); // obj，window
obj.fn2(); // obj，obj
```

再举一个例子

```typescript
function Timer() {
  console.log(this); // window, Timer是window的方法，是window调用的
  this.name = "Summer";
  setTimeout(function () {
    console.log(this.name); // undefined，因为普通函数有this，所以this指向的是使用时所在的对象，而使用时是window调用的，所以this指向的是window
  }, 1000);
  setTimeout(() => {
    console.log(this.name); // Summer，因为箭头函数没有this，所以this指向的是函数定义时所在的对象
  }, 1000);
}
let timer = new Timer();
```

引申：`this`的指向问题

具体参考，[this 指向问题](./this%E6%8C%87%E5%90%91%E9%97%AE%E9%A2%98.md)

2. 箭头函数没有`arguments`

`arguments`是一个类数组对象，包含了函数的所有参数。**简单理解为参数列表**

```typescript
function fn() {
  console.log(arguments);
}
fn(1, 2, 3); // [1, 2, 3]
```

```typescript
const fn = () => {
  console.log(arguments);
};
fn(1, 2, 3); // 报错
```

### 模板字符串

模板字符串是增强版的字符串，用反引号(`)标识，它可以当作普通字符串使用，也可以用来定义多行字符串，或者在字符串中嵌入变量。

```typescript
const name = "Summer";
const age = 18;
const str = `My name is ${name}, I'm ${age} years old.`;
console.log(str); // My name is Summer, I'm 18 years old.
```

### 解构赋值

解构赋值是对赋值运算符的扩展，它是一种针对数组或者对象进行模式匹配，然后对其中的变量进行赋值。

#### 数组的解构赋值

类型：

- 一一对应
- 可以跳过某些元素
- 使用省略号（剩余运算符），**返回的是一个数组**
- 设置默认值
- 解构不成功，变量的值就等于 undefined

```typescript
const arr = [1, 2, 3];
const [a, b, c] = arr;
console.log(a, b, c); // 1, 2, 3

const [, , e] = arr; // 可以跳过某些元素
console.log(e); // 3

const [f, ...g] = arr; // 可以使用剩余运算符，但是需要注意的是，剩余运算符只能放在最后一位
console.log(f, g); // 1, [2, 3]

const [h, i, j, k] = arr; // 如果解构不成功，变量的值就等于undefined

const [l, m, n, o = 4] = arr; // 可以给变量设置默认值
```

#### 对象的解构赋值

类型：

- 一一对应
- 设置别名
- 设置默认值
- 使用省略号（剩余运算符），**返回的是一个对象**

```typescript
const obj = {
  name: "Summer",
  age: 18,
};
const { name, age } = obj;
console.log(name, age); // Summer, 18

const { name: myName, age: myAge } = obj; // 可以给变量设置别名
console.log(myName, myAge); // Summer, 18

const { name, age = 10 } = obj; // 可以给变量设置默认值

const { name, ...rest } = obj; // 可以使用剩余运算符，但是需要注意的是，剩余运算符只能放在最后一位
console.log(name, rest); // Summer, {age: 18}
```

#### 函数的解构赋值

**函数的解构赋值其实是针对于函数的参数而言的**

```typescript
function fn([a, b, c]) {
  console.log(a, b, c);
}
fn([1, 2, 3]); // 1, 2, 3

function fn2({ name, age }) {
  console.log(name, age);
}
fn2({ name: "Summer", age: 18 }); // Summer, 18

function fn3({ name, age = 18 }) {
  // 设置默认值
  console.log(name, age);
}
fn3({ name: "Summer" }); // Summer, 18

function fn4({ name, ...rest }) {
  // 使用剩余运算符
  console.log(name, rest);
}

fn4({ name: "Summer", age: 18 }); // Summer, {age: 18}
```

### 扩展运算符

扩展运算符是三个点（`...`），它好比是 rest 参数的逆运算，将一个数组转为用逗号分隔的参数序列。

```typescript
console.log(...[1, 2, 3]); // 1, 2, 3
```

应用场景：

1. 数组合并

```typescript
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const arr3 = [...arr1, ...arr2];
console.log(arr3); // [1, 2, 3, 4, 5, 6]
```

2. 与解构赋值结合，获取数组的部分元素

```typescript
const arr = [1, 2, 3, 4, 5];
const [a, ...b] = arr;
console.log(a, b); // 1, [2, 3, 4, 5]
```

3. 字符串转数组

```typescript
const str = "Summer";
const arr = [...str];
console.log(arr); // ["S", "u", "m", "m", "e", "r"]
```

4. 将伪数组转为真正的数组

```typescript
const divs = document.querySelectorAll("div");
const arr = [...divs];
```

5. 进行深拷贝

```typescript
const obj = { name: "Summer", age: 18 };
const obj2 = { ...obj };
```

6. 在 react 中，可以使用扩展运算符来传递 props

```typescript
const obj = { name: "Summer", age: 18 };
const App = () => {
  return <Child {...obj} />;
};
```

**关于扩展运算符和解构赋值，都需要对象具有可迭代性（iterable）**

引申：在 JS 中哪些数据结构具有可迭代性？

1. 数组
2. 字符串
3. Map(ES6 新增)
4. Set(ES6 新增)
5. arguments（参数列表）

具有可迭代性的对象，可以使用解构赋值，扩展运算符以及`for...of`循环

### 类

#### 定义类

##### ES5 的类

`javascript`中没有类的概念，它是基于**原型**的继承，但是我们可以使用**构造函数**来模拟类的概念

```javascript
// 定义构造函数
function Person(name, age) {
  this.name = name;
  this.age = age;
}
// 定义方法
Person.prototype.say = function () {
  console.log(`My name is ${this.name}, I'm ${this.age} years old.`);
};
// 实例化
const p1 = new Person("Summer", 18);
p1.say(); // My name is Summer, I'm 18 years old.
```

##### ES6 的类

```typescript
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  say() {
    console.log(`My name is ${this.name}, I'm ${this.age} years old.`);
  }
}
// 实例化
const p1 = new Person("Summer", 18);
p1.say(); // My name is Summer, I'm 18 years old.
```

结合上面两个代码，我们可以看出:

- `ES6` 的类，本质上还是 ES5 的构造函数,可以认为，**`class`就是构造函数的语法糖**
- `constructor` 方法，就是构造函数,用来接收参数。如果不写，默认会有一个空的`constructor`方法
- `ES6`中定义的方法，是类的方法，不要加上关键词`function`

#### 对类添加方法

- 在原型链上添加方法

```typescript
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  say() {
    console.log(`My name is ${this.name}, I'm ${this.age} years old.`);
  }
}
// 添加方法
Person.prototype.eat = function () {
  console.log("I'm eating.");
};
// 实例化
const p1 = new Person("Summer", 18);
p1.say(); // My name is Summer, I'm 18 years old.
p1.eat(); // I'm eating.
```

- 使用 Object.assign()方法

```typescript
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  say() {
    console.log(`My name is ${this.name}, I'm ${this.age} years old.`);
  }
}
// 添加方法
Object.assign(Person.prototype, {
  eat() {
    console.log("I'm eating.");
  },
});
// 实例化
const p1 = new Person("Summer", 18);
p1.say(); // My name is Summer, I'm 18 years old.
p1.eat(); // I'm eating.
```

#### 类的继承

具体参考：[继承](../JavaScript/继承.md)

### module 模块化

主要就是`export`和`import`两个关键字

### Promise

#### Promise 的基本使用

```typescript
// 定义一个 Promise 对象
const p1 = new Promise((resolve, reject) => {
  // resolve 成功的回调函数
  // reject 失败的回调函数
  // 异步操作
  setTimeout(() => {
    const num = Math.random();
    if (num > 0.5) {
      resolve(num);
    } else {
      reject(num);
    }
  }, 1000);
});
// 调用 Promise 对象的 then 方法
p1.then(
  (data) => {
    console.log("成功", data);
  },
  (err) => {
    console.log("失败", err);
  }
);
```

从上面的代码可以看出：

- `Promise`对象是一个构造函数，通过`new`关键字创建一个`Promise`对象
- 在还未执行到`resolve`或`reject`时，`Promise`对象的状态为`pending`，执行到`resolve`时，状态变为`resolved`，执行到`reject`时，状态变为`rejected`
- 然后就会去调用`then`方法，`then`方法接收两个参数，第一个参数是`resolve`的回调函数，第二个参数是`reject`的回调函数

#### Promise 的三种状态

- `pending`：等待状态，既不是成功也不是失败
- `resolved`：成功状态
- `rejected`: 失败状态

#### 实例方法

- `then()`：接收两个参数，第一个参数是`resolve`的回调函数，第二个参数是`reject`的回调函数
- `catch()`：接收一个参数，是`reject`的回调函数,兜底的作用
- `finally()`：接收一个参数，是`resolve`或`reject`的回调函数，不管`Promise`对象的状态是`resolved`还是`rejected`，都会执行

#### 构造函数方法

- `all()`: 接收一个数组，数组中的每一项都是一个`Promise`对象，当数组中的每一个`Promise`对象都变为`resolved`状态时，`all()`方法返回的`Promise`对象才会变为`resolved`状态，如果数组中的某一个`Promise`对象变为`rejected`状态，`all()`方法返回的`Promise`对象就会变为`rejected`状态

```typescript
// 定义一个 Promise 对象
const p1 = new Promise((resolve, reject) => {
  // resolve 成功的回调函数
  // reject 失败的回调函数
  // 异步操作
  setTimeout(() => {
    const num = Math.random();
    if (num > 0.3) {
      resolve(num);
    } else {
      reject(num);
    }
  }, 1000);
});

const p2 = new Promise((resolve, reject) => {
  // resolve 成功的回调函数
  // reject 失败的回调函数
  // 异步操作
  setTimeout(() => {
    const num = Math.random();
    if (num > 0.5) {
      resolve(num);
    } else {
      reject(num);
    }
  }, 1000);
});

const p3 = new Promise((resolve, reject) => {
  // resolve 成功的回调函数
  // reject 失败的回调函数
  // 异步操作
  setTimeout(() => {
    const num = Math.random();
    if (num > 0.7) {
      resolve(num);
    } else {
      reject(num);
    }
  }, 1000);
});

// 调用 Promise 对象的 all 方法
Promise.all([p1, p2, p3]).then(
  (data) => {
    console.log("成功", data);
  },
  (err) => {
    console.log("失败", err);
  }
);
```

- `race()`: 接收一个数组，数组中的每一项都是一个`Promise`对象，只要数组的某一个`Promise`对象变为`resolved`状态，`race()`方法返回的`Promise`对象就会变为`resolved`状态，如果数组中的某一个`Promise`对象变为`rejected`状态，`race()`方法返回的`Promise`对象就会变为`rejected`状态

**简单来说，就是，谁先来的就跟着谁变化**

```typescript
// 定义一个 Promise 对象
const p1 = new Promise((resolve, reject) => {
  // resolve 成功的回调函数
  // reject 失败的回调函数
  // 异步操作
  setTimeout(() => {
    const num = Math.random();
    if (num > 0.3) {
      resolve(num);
    } else {
      reject(num);
    }
  }, 1000);
});

const p2 = new Promise((resolve, reject) => {
  // resolve 成功的回调函数
  // reject 失败的回调函数
  // 异步操作
  setTimeout(() => {
    const num = Math.random();
    if (num > 0.5) {
      resolve(num);
    } else {
      reject(num);
    }
  }, 1000);
});

const p3 = new Promise((resolve, reject) => {
  // resolve 成功的回调函数
  // reject 失败的回调函数
  // 异步操作
  setTimeout(() => {
    const num = Math.random();
    if (num > 0.7) {
      resolve(num);
    } else {
      reject(num);
    }
  }, 1000);
});

// 调用race
Promise.race([p1, p2, p3]).then(
  (data) => {
    console.log("成功", data);
  },
  (err) => {
    console.log("失败", err);
  }
);
```

- `resolve()`: 接收一个参数，可以是一个值，也可以是一个`Promise`对象，如果是一个值，返回的`Promise`对象就会变为`resolved`状态，如果是一个`Promise`对象，返回的`Promise`对象的状态就会跟随参数的`Promise`对象的状态

```typescript
// 定义一个 Promise 对象
const p1 = new Promise((resolve, reject) => {
  // resolve 成功的回调函数
  // reject 失败的回调函数
  // 异步操作
  setTimeout(() => {
    const num = Math.random();
    if (num > 0.3) {
      resolve(num);
    } else {
      reject(num);
    }
  }, 1000);
});

// 调用 Promise 对象的 resolve 方法
Promise.resolve(p1).then(
  (data) => {
    console.log("成功", data);
  },
  (err) => {
    console.log("失败", err);
  }
);
```

- `reject()`: 接收一个参数，返回的`Promise`对象就会变为`rejected`状态

