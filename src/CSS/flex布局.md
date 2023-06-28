---
title: flex布局
author: Summer
date: 2023-06-28
category:
  - CSS
tag:
  - flex
  - 布局
  - 基础概念
---

### 基础概念

flex 布局是一种一维布局模型，可以实现更加灵活的布局方式，flex 布局的主要思想是让容器有能力让其子元素改变自身的宽度、高度、顺序，以及对齐方式等，以最适合当前的显示环境。

### 属性

#### 容器属性

就是对于父元素的属性

- `flex-direction`：决定主轴的方向
- `flex-wrap`: 决定元素是否换行
- `align-items`: 在副轴上如何对齐
- `justify-content`: 在主轴上如何对齐
- `align-content`: 多根轴线的对齐方式
- `flex-flow`: `flex-direction`和`flex-wrap`的简写,默认值为`row nowrap`

#### 项目属性

- `order`: 定义项目的排列顺序，数值越小，排列越靠前，默认为 0
- `align-self`: 允许单个项目有与其他项目不一样的对齐方式，可覆盖`align-items`属性
- `flex-grow`: 定义项目的放大比例，默认为 0，即如果存在剩余空间，也不放大
- `flex-shrink`: 定义项目的缩小比例，默认为 1，即如果空间不足，该项目将缩小
- `flex-basis`: 定义在分配多余空间之前，项目占据的主轴空间（main size）
- `flex`: `flex-grow`、`flex-shrink`和`flex-basis`的简写，默认值为`0 1 auto`，后两个属性可选

这边`flex`比较复杂，且很重要，所以单独拿出来说一下

`flex`,一般会简写：

- `flex: 1`：相当于`flex: 1 1 0`,表明，在空间不足的情况下，不缩小，在空间有剩余的情况下，放大
- `flex: auto`：相当于`flex: 1 1 auto`,表明，在空间不足的情况下，缩小，在空间有剩余的情况下，放大
- `flex:none`: 相当于`flex: 0 0 auto`,表明，不放大，不缩小
- `flex: 2 1 100px`: 表明，放大比例为 2，缩小比例为 1，基准值为 100px

场景：

1. 如果希望弹性项目可以占据多余空间，且会根据剩余空间的大小进行放大，可以使用`flex: 1`
2. 如果希望弹箱项目会根据位置和大小进行缩小，可以使用`flex: auto`

### 常见布局

#### 三栏布局

三栏布局：左右两边固定宽度，中间自适应

```css
.content {
  display: flex;
  width: 400px;
  height: 600px;
  background-color: aquamarine;
}
.medium {
  flex: 1;
  background-color: yellow;
}
.left {
  width: 200px;
  height: 100%;
  background-color: blue;
}
.right {
  width: 200px;
  height: 100%;
  background-color: red;
}
```
