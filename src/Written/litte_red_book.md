---
title: 8.6小红书笔试
date: 2023-08-07
tag:
  - 笔试
  - 小红书
category:
  - 笔试
---

- [ ] KMP 算法代码实现
- [ ] 算法第三题
- [ ] 小根堆，大根堆
- [ ] TCP握手图解
- [ ] 报文
- [ ] 快速响应的调度算法

## 笔试概述

小红书的题型是选择题+算法题，选择题有 20 道，算法题有 3 道，时间是 120 分钟。

- 选择题的题型有单选题、多选题，涉及的范围都是计算机基础知识，包括操作系统、计算机网络、数据结构、算法、数据库、前端基础。（鄙人的基础，一塌糊涂，哭死）
- 算法题还可以不算很难，但是时间有点紧，一道题的时间是 30 分钟左右，所以要快速的写出来，不然时间不够。
  - 第一题打卡题，很简单。
  - 第二题递归即可，但是数据量很大，所以需要`long`类型，`JavaScript`可能需要设置`BigInt`。我没想到，后来看牛客上的佬说的。
  - 第三题，时间来不及了，其实也没啥思路。

总的来说，其实不是很难，但是我不会。

## 选择题

#### `symbol`类型的特点

1. `symbol`类型不可以和其他类型进行计算

```js
// 创建symbol
let s1 = Symbol("s1");
console.log(s1); // Symbol(s1)
console.log(s1 + 1); // symbol类型不能和其他类型进行运算，会报错
```

2. 将`symbol`转为`string`类型

```js
// 创建symbol
let s1 = Symbol("s1");
console.log(s1); // Symbol(s1)
console.log(String(s1)); // "Symbol(s1)"
```

3. `symbol`转为`boolean`类型

```js
// 创建symbol
let s1 = Symbol("s1");
console.log(s1); // Symbol(s1)
console.log(Boolean(s1)); // true
```

4. `symbol`类型和其他类型进行比较运算

```js
// 创建symbol
let s1 = Symbol("s1");
console.log(s1); // Symbol(s1)
console.log(s1 == 1); // false
```

总的来说，其实`symbol`类型，他就是一个独一无二的值，所以你不可以将他和其他类型进行运算，但是可以将他转为其他类型。并且`symbol`是一个类型，他不可以用`new`来创建，只能用`Symbol()`来创建。

#### 文本溢出

文本溢出主要是需要三个属性来实现，分别是`overflow`、`text-overflow`、`white-space`。

- `overflow`：设置文本溢出时的处理方式，有`visible`、`hidden`、`scroll`、`auto`。
- `text-overflow`：设置文本溢出时的显示方式，有`clip`、`ellipsis`(省略号)。
- `white-space`：处理元素中的空白，有`normal`、`nowrap`(单行)、`pre`、`pre-wrap`、`pre-line`。

##### 实现单行文本溢出

```css
/* 单行文本溢出 */
.single-line {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
```

##### 实现多行文本溢出(基于行数截断)

```css
/* 多行文本溢出 */
.multi-line {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3; /* 行数 */
  -webkit-box-orient: vertical;
}
```

但是这个是 CSS3 的属性，所以兼容性不是很好。

#### 子元素 margin 问题

- 子元素设置的`margin`会影响父元素的位置。
- 子元素设置的`padding`不会影响父元素的位置。

```html
<style>
  .parent {
    width: 200px;
    height: 200px;
    background-color: red;
  }
  .child {
    width: 100px;
    height: 100px;
    background-color: blue;
    margin-top: 50px;
  }
</style>
<div class="parent">
  <div class="child"></div>
</div>
```

上面这段代码，当子元素设置了`margin-top`的时候，子元素向下移动`50px`，并且父元素也向下移动了`50px`

**特别注意**：假如`margin`/`padding`的设置的值是`50%`(无论是上下还是左右),那么它都是是相对于父元素的宽度来计算的，而不是高度。这个是根据，**writing-mode**来决定的(默认属性：`horizontal-tb`，水平方向从左到右，垂直方向从上到下)。

具体可以参考这篇文章：[为什么 margin-top 设置百分比基于父元素的宽度计算的？](https://segmentfault.com/a/1190000022267335)

那么如何解决这个问题呢？主要其实有两种方法：

- 构建 BFC：这个很好理解，因为 BFC 是独立的区域，两个元素就不会相互影响了。
- 添加`border`或者`padding`：这个记住就行了吧！

#### flex 布局

- flex 默认是 **横向排列(row)** 的，如果想要纵向排列，可以设置`flex-direction: column`。
- `justify-content`：主轴对齐方式
  - `flex-start`：左对齐
  - `flex-end`：右对齐
  - `center`：居中对齐
  - `space-between`：**两端贴着边框**，项目之间的间隔都相等。
  - `space-around`：每个项目两侧的间隔相等。所以，**项目之间的间隔是项目与边框的间隔的两倍**。
  - `space-evenly`：间隔相等，**项目之间的间隔和项目与边框的间隔都相等**。

#### 对象的扩展运算符

```js
// 设置一个对象
let obj = {
  name: "summer",
  length: 2,
};
let arr = [...obj]; //报错，因为对象不是可迭代对象
```

**对象没法用扩展运算符**，因为对象不是可迭代对象，但是可以通过`Object.keys()`来获取对象的所有属性，然后再通过`map`来遍历，这样就可以实现对象的扩展运算符了。

#### TCP 三次握手，四次挥手图解

#### KMP 字符串匹配算法

首先先不谈算法怎么写，我们先来看看这个算法的思想，这样才能更好的理解这个算法。

一般我们在匹配字符串的时候，都是从头开始匹配，如果匹配不成功，就会回溯到上一个位置，然后再从头开始匹配，这样的话，就会导致很多重复的匹配，所以 KMP 算法就是为了解决这个问题而生的。

KMP 算法的思想就是

- 当匹配失败的时候，我们不会回溯到上一个位置，而是根据已经匹配的字符串，来确定下一次匹配的位置，这样就可以避免很多重复的匹配了。(**也就是那个遍历的指针，只能向前走，不可以回退回去**)

- 他会有一个数组(`next`)，当我们发现，匹配失败的时候，我们就会根据这个数组的匹配的最后一个字符的值，来确定下一次匹配的位置(**也就是，可以跳过多少个字符**)。

所以其实最主要的就是这个数组(`next`)的值怎么求？

我们先来捋一下计算这个`next`数组的思路：(假如我现在有一个字符串`abababca`)

- 对于第一个字符`a`来说，它的`next`值一定是`0`，因为它前面没有字符了。
- 对于第二个字符`b`来说，它的`next`值一定是`0`，因为它前面只有一个字符`a`，所以它的`next`值一定是`0`。
- 对于第三个字符`a`来说，它的`next`值一定是`1`，因为它前面有两个字符`ab`，所以它的`next`值一定是`1`(匹配`a`)。
- 对于第四个字符`b`来说，它的`next`值一定是`2`，因为它前面有三个字符`aba`，所以它的`next`值一定是`2`(匹配`ab`)。
- 对于第五个字符`a`来说，它的`next`值一定是`3`，因为它前面有四个字符`abab`，所以它的`next`值一定是`3`(匹配`aba`)。
- 对于第六个字符`b`来说，它的`next`值一定是`4`，因为它前面有五个字符`ababa`，所以它的`next`值一定是`4`(匹配`abab`)。
- 对于第七个字符`c`来说，它的`next`值一定是`0`，因为它前面有六个字符`ababab`，所以它的`next`值一定是`0`。
- 对于第八个字符`a`来说，它的`next`值一定是`1`，因为它前面有七个字符`abababc`，所以它的`next`值一定是`1`(匹配`a`)。

`next`数组的本质，就是寻找 **当前字串中相同前后缀的最大长度**，但是不能是字符串本身。

参考链接：[最浅显易懂的 KMP 算法讲解](https://www.bilibili.com/video/BV1AY4y157yL/?share_source=copy_web&vd_source=dbd5755e577bdae4bc901ba06be7c505)

#### 小根堆和大根堆

#### 请求报文和响应报文

#### 快速响应的调度算法

## 算法题

#### 计算小红每天刷小红书的时间

题目描述：小红在下午 5 点之后才会开始刷小红书，且一定会在凌晨 3 点前睡觉，计算小红每天刷小红书的时间。
输入描述：每两行，表示小红开始刷小红书的时间和结束刷小红书的时间，时间格式为：`hh:mm`，如`17:00`，`03:00`

题目思路：
总体只需要考虑两种情况：

- 开始时间和结束时间都在同一天：那么直接计算时间差就可以了
- 开始时间和结束时间不在同一天: 那么需要加上 24 小时，然后再计算时间差

题目代码：

```js
let arr = [];
while ((line = read_line() != "")) {
  // 读取一行数据
  arr.push(line);
}

// 总共时间
let time = 0;

class Time {
  getTimeDiff(arr) {
    for (let i = 0; i < arr.length; i += 2) {
      // 获取开始时间和结束时间
      let start = arr[i];
      let end = arr[i + 1];
      // 计算时间差
      let diff = this.getDiff(start, end);
      // 累加时间差
      time += diff;
    }
    // 输出结果
    console.log(time);
  }
  getDiff(start, end) {
    // 首先将两个字符串，按照:分割成数组
    let startArr = start.split(":").map((item) => parseInt(item));
    let endArr = end.split(":").map((item) => parseInt(item));
    // 计算时间差
    // 如果endArr[0] < startArr[0]，说明跨天了，需要加上24小时
    if (endArr[0] < startArr[0]) {
      return (endArr[0] + 24 - startArr[0]) * 60 + endArr[1] - startArr[1];
    } else {
      return (endArr[0] - startArr[0]) * 60 + endArr[1] - startArr[1];
    }
  }
}

let t = new Time();
t.getTimeDiff(arr);
```

#### 计算小红的最大快乐值

题目描述：已知她生活中有 n 个事件，分享第 i 个事件需要她花费 ti 的时间和 hi 的精力来编辑文章，并能获得 ai 的快乐值。在总花费时间不超过 T 且总花费精力不超过 H 的前提下，小红最多可以获得多少快乐值。

输入描述：第一行输入一个整数 n，表示事件的个数。接下来一行输出两个整数，表示总花费时间 T 和总花费精力 H。接下来 n 行，每行输入三个整数，表示事件的时间 ti，精力 hi 和快乐值 ai。

解题思路：

- 首先，我们需要将所有的事件按照快乐值进行排序，这样可以保证我们在选择事件的时候，优先选择快乐值最大的事件。（贪心）
- 终止条件：当所有事件都比较完之后就终止条件
- 每次比较完一个(无论这个事件是否符合条件)，都需要将这个事件从数组中删除，这样可以保证下一次比较的时候，不会重复比较。
- 对于无法满足条件的事件，将快乐值置为 0 即可。

题目代码：

```js
// 先获取输入，获取总事件数目
let n = parseInt(read_line());
// 获取T和H
let [T, H] = read_line()
  .split(" ")
  .map((item) => parseInt(item));

// 获取每个事件的信息
let arr = [];
while ((line = read_line())) {
  arr.push(line.split(" ").map((item) => parseInt(item)));
}
// 设置快乐时间
// 因为数据很大，所以，需要使用BigInt
let funTime = 0n;
// 声明一个类
class Fun {
  // 排序arr，将arr按照快乐值从大到小排序[t,h,a]
  sortArr(arr) {
    arr.sort((a, b) => b[2] - a[2]);
  }
  // 获取快乐时间
  getFunTime(arr) {
    // 递归出口
    if (arr.length === 0) {
      return;
    }
    // 特殊情况，就是T和H都不够分配的情况
    if (T < arr[0][0] || H < arr[0][1]) {
      funTime += 0;
    } else if (T >= arr[0][0] && H >= arr[0][1]) {
      funTime += arr[0][2];
      T -= arr[0][0];
      H -= arr[0][1];
    }
    // 并将当前这个item删除
    arr.shift();
    // 递归调用
    this.getFunTime(arr);
  }
}

// test
// let n = 2;
// let T = 2;
// let H = 2;
// let arr = [
//   [1, 3, 3],
//   [3, 1, 4],
// ];

let fun = new Fun();
fun.sortArr(arr);
fun.getFunTime(arr);

console.log(funTime);
```

**注意**,上面的代码只有`36%`的通过率，网上说，maybe 是因为数据量太大，他们使用`long`通过了，所以我这边改为了`bigInt`，因为没法测试了，所以，这个代码的正确性，我也不知道。

#### 计算小红最多可以染红多少个结点

题目描述：小红有一颗树，每个结点有一个权值，初始时每个节点都是白色。小红每次操作可以选择两个相邻的结点，如果它们都是**白色且权值的和是质数**，小红就可以选择其中一个节点染红，求出小红最多可以染红多少个结点。
输入描述：第一行输入一个整数 n，表示树的结点个数。接下来一行输出 n 个整数，表示每个结点的权值。接下来的 n 行，每行输入两个整数 u 和 v，表示 u 和 v 之间有一条边。

**这道题，我目前没有思路，后续在写**
