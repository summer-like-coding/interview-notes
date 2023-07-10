---
title: null和undefined的区别
author: summer
date: 2023-07-10
tag:
  - JavaScript
  - 数据结构

category:
  - JavaScript
---

## undefined

在`javascript`中，`undefined`是一个全局变量，它的值是`undefined`，当一个变量声明了但是没有赋值时，它的值就是`undefined`，或者当一个对象没有赋值的属性时，它的值也是`undefined`。

```js
// 没有赋值的变量，默认为undefined
let a;
console.log(a); // undefined

// 没有赋值的对象属性，默认为undefined
let obj = {};
console.log(obj.a); // undefined
```

## null

`null`表示当前这个值，已经赋值为`null`了，它是一个空对象指针，表示一个空对象，所以`typeof null`的值是`object`。

```js
// 赋值为null
let a = null;
console.log(a); // null

// 赋值为null的对象，typeof的值是object
let obj = {
  a: null,
};
console.log(obj.a); // null
console.log(typeof obj.a); // object
```

## null 和 undefined 的相同点

- 条件判断的时候，`undefined`和`null`都会转换为`false`。

```javascript
if (!undefined) {
  console.log("undefined is false");
}
// undefined is false

if (!null) {
  console.log("null is false");
}
// null is false
```
- 使用`==`进行比较的时候，`null`和`undefined`是相等的。

这是因为`==`他会进行类型转换，`null`和`undefined`都会转换为`false`，所以他们是相等的。

```javascript
console.log(null == undefined); // true
```

## null 和 undefined 的不同点

- `Number()`转化为数字的时候，`undefined`转化为`NaN`，`null`转化为`0`。

这是因为`null`是一个空对象，转化为数字的时候，就是`0`，而`undefined`是一个未定义的值，转化为数字的时候，就是`NaN`。

```javascript

console.log(Number(undefined)); // NaN

console.log(Number(null)); // 0
```