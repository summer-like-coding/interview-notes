---
title: this指向问题
# 设置作者
author: Summer
# 设置写作时间
date: 2023-06-27
category:
  - ES6篇
  - this

tag:
  - ES6
  - this
---

总的来说，`this`会指向调用它的对象，但是有一些特殊情况(`call`,`bind`)。

#### `this`的指向类型

1. 默认绑定

   ```typescript
   function fn() {
     console.log(this); // window
   }
   fn(); // 这个其实就是相当于window.fn()
   ```

   上面的代码表明，`this`指向的是 window。

2. 隐式绑定

   ```typescript
   const obj = {
     name: "Summer",
     fn: function () {
       console.log(this); // obj
     },
   };
   obj.fn(); //
   ```

   上面的代码表明，`this`指向的是 obj。

3. 显示绑定

   **采用一些方法，来直接改变 this 的指向**

   ```typescript
   const obj = {
     name: "Summer",
   };
   function fn() {
     console.log(this); // obj
   }
   fn(); // window
   fn.call(obj); // obj
   ```

   我们也可以看一个稍微复杂一点的例子

   ```typescript
   function sayName() {
     console.log(this.name);
   }
   const obj1 = {
     name: "Summer",
   };
   const obj2 = {
     name: "Winter",
   };
   sayName.call(obj1); // Summer
   sayName.call(obj2); // Winter
   sayName.bind(obj1)(); // Summer
   sayName.bind(obj2)(); // Winter
   sayName.bind(obj1).call(obj2); // Summer, bind改变了this的指向，所以this指向的是obj1，而call又改变了this的指向，所以this指向的是obj2
   sayName.apply(obj1); // Summer
   ```

这边我们引申出一个问题，`call`和`apply`和`bind`的区别?

#### `call`和`apply`和`bind`的区别

1. `call`和`apply`都是改变`this`的指向，而`bind`是返回一个新的函数，新的函数的`this`指向的是`bind`的第一个参数，而且`bind`的第一个参数是不能被改变的。

   ```typescript
   function sayName() {
     console.log(this.name);
   }
   const obj1 = {
     name: "Summer",
   };
   const obj2 = {
     name: "Winter",
   };
   const fn1 = sayName.bind(obj1);
   const fn2 = sayName.bind(obj2);
   fn1(); // Summer
   fn2(); // Winter
   fn1.call(obj2); // Summer
   fn2.call(obj1); // Winter
   ```

2. `call`和`apply`的区别在于，`call`的参数是一个一个传递的，而`apply`的参数是一个数组。

   ```typescript
   function sayName() {
     console.log(this.name);
   }
   const obj1 = {
     name: "Summer",
   };
   const obj2 = {
     name: "Winter",
   };
   sayName.call(obj1); // Summer
   sayName.apply(obj2); // Winter
   sayName.call(obj1, 1, 2, 3); // Summer
   sayName.apply(obj2, [1, 2, 3]); // Winter
   ```

`apply`的使用场景

1. 求数组的最大值和最小值

```typescript
// 不使用apply时，我们会使用遍历或者sort方法
const arr = [1, 2, 3, 4, 5];
console.log(arr.sort((a, b) => b - a)); // 5
```

但是这种方法并不是很便捷，所以会使用`Math.max()`和`Math.min()`方法。
但是`Math.max()和Math.min()`方法，他们的参数，是一个一个的传递的。

```typescript
console.log(Math.max(1, 2, 3, 4, 5)); // 5
console.log(Math.min(1, 2, 3, 4, 5)); // 1
```

所以我们就需要使用`apply`方法。

```typescript
const arr = [1, 2, 3, 4, 5];
console.log(Math.max.apply(null, arr)); // 5
console.log(Math.min.apply(null, arr)); // 1
```

2. 实现数组的拼接

这个不使用`apply`其实也可以做到，可以使用`...`运算符。

```typescript
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
console.log([...arr1, ...arr2]); // [1, 2, 3, 4, 5, 6]
```

但是使用`apply`,不需要额外的变量，也不需要额外的运算符。

```typescript
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
console.log(arr1.push.apply(arr1, arr2)); // [1, 2, 3, 4, 5, 6]
```

我的理解是，虽然`apply`接受的参数是一个数组，但是它会把数组中的每一个元素，都当做一个参数，传递出去。

4. `new`绑定
   **当使用`new`操作符构造函数时，this 的值会绑定到新创建的对象上**

   ```typescript
   function Person(name) {
     this.name = name;
   }
   const person = new Person("Summer");
   console.log(person.name); // Summer
   ```
