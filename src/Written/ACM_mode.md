---
title: ACM模式-Javascript
date: 2023-7-24
author: summer
order: 1
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

输入示例

```bash
3 4
```

现在我需要获取这两个整数，用两个变量表示

::: code-tabs
@tab javscript Node

```javascript
// 引入readline模块
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let n, m;
// 监听输入事件
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

输入示例

```bash
3
1
2
3
```

现在我需要获取所有的输入，用一个数组表示
::: code-tabs
@tab javascript Node

```javascript
// 引入readline模块
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
// 设置总行数
let n;
// 结果数组
let arr = [];
// 监听输入事件
rl.on("line", (line) => {
  // 如果没有设置总行数，那么就设置总行数
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
for (let i = 0; i < n; i++) {
  // 获取一行输入
  let line = readline();
  arr.push(parseInt(line));
}
```

:::

由上面两个例子,我们可以总结出来：

- 每次想要获取一行输入的时候，都需要使用 `readline()` 方法,这个方法会返回一个**字符串**，如果没有输入，那么返回的是`null`
- 获取多行输入的时候，都是使用`while(line = readline())`循环，每次循环都会获取一行输入，直到获取到所有的输入

### 输入多组数据

> 输入 k+1 行数据，第一行包含一个整数 n，表示接下来有 m 行，每行有两个整数。

输入示例

```bash
4
1 2
3 4
5 6
7 8
```

现在我需要获取所有的输入，每一行用一个数组表示，所有的行用一个数组表示

::: code-tabs

@tab javascript Node

```javascript
// 引入readline模块
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
// 设置一个变量，用来记录总行数
let n;
// 结果数组
let arr = [];
rl.on("line", (line) => {
  // 如果没有设置总行数，那么就设置总行数
  if (!n) {
    n = parseInt(line);
  } else {
    // 将一行输入转换成数组
    let lineArr = line.split(" ").map((item) => parseInt(item));
    // 将每一行的数组放入结果数组中
    arr.push(lineArr);
    // 如果结果数组的长度等于总行数，那么就输出结果
    if (arr.length === n) {
      console.log(arr);
    }
  }
});
```

@tab javascript V8

```javascript
// 获取总行数
let n = parseInt(readline());
// 结果数组
let arr = [];
// 循环获取每一行的输入
for (let i = 0; i < n; i++) {
  // 获取一行输入
  let line = readline();
  // 将一行输入转换成数组
  let lineArr = line.split(" ").map((item) => parseInt(item));
  // 将每一行的数组放入结果数组中
  arr.push(lineArr);
}
console.log(arr);
```

:::

**意外发现**：  
我在牛客 ACM 模式下进行测试的时候，如果使用`Javascript V8`，打印一个数组(`[[1,2],[3,4]]`)的时候，打印出来的是`1,2,3,4`，而不是`[[1,2],[3,4]]`，但是在`Javascript Node`下打印的是`[[1,2],[3,4]]`。很奇怪，但是如果你是要`arr.length`的时候，他出来的长度是正确的。
