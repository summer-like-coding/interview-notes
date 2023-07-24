---
title: ACM模式-Javascript
date: 2023-7-24
author: summer
tag:
  - ACM模式
category:
  - 笔试
---

和普通力扣的区别：

- 力扣都会直接将参数传入函数中，而 ACM 模式则是通过输入输出的方式来获取参数和返回结果
- 力扣的函数都是必须要`return`的，而 ACM 模式则是直接输出结果`print`或者`console.log()`即可

## ACM 模式获取输入

### 单行输入

> 输入只有一行，包含两个整数 n 和 m，用空格隔开。
> n m  
> 现在我需要获取 n 和 m 的值

::: code-tabs
@tab javscript Node

```javascript
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let n, m;
rl.on("line", (line) => {
  [n, m] = line.split(" ").map((item) => parseInt(item));
  console.log(n, m);
});
```

@tab javascript V8

```javascript
while ((line = readline())) {
  [n, m] = line.split(" ").map((item) => parseInt(item));
  console.log(n, m);
}
```

:::

### 多行输入

> 输入有 m+1 行，第一行包含一个整数 n，表示接下来有 m 行，每行有一个整数。
> m  
> n1  
> n2  
> ...  
> nm  
> 现在我需要获取所有的输入

::: code-tabs
@tab javascript Node

```javascript
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let n;
let arr = [];
rl.on("line", (line) => {
  if (!n) {
    n = parseInt(line);
  } else {
    arr.push(parseInt(line));
    if (arr.length === n) {
      console.log(arr);
    }
  }
});
```

@tab javascript V8

```javascript
let n = parseInt(readline());
let arr = [];
while ((line = readline())) {
  arr.push(parseInt(line));
  if (arr.length === n) {
    console.log(arr);
  }
}
```

:::

由上面两个例子,我们可以总结出来：

- 每次想要获取一行输入的时候，都需要使用 `readline()` 方法,这个方法会返回一个**字符串**，如果没有输入，那么返回的是`null`
- 获取多行输入的时候，都是使用`while(line = readline())`循环，每次循环都会获取一行输入，直到获取到所有的输入

### 输入多组数据

> 输入 k+1 行数据，第一行包含一个整数 n，表示接下来有 m 行，每行有两个整数。
> k+1
> n m
> n1 m1
> n2 m2
> ...
> nk mk
> 现在我想要获取所有的输入，每一行用一个数组表示
