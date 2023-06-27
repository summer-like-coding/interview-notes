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

