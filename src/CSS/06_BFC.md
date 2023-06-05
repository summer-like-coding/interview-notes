---
title: BFC布局
author: Summer
order: 6
date: 2023-06-06
category:
  - CSS篇

tag:
    - 基础概念
    - BFC

---

## 什么是BFC

BFC（Block Formatting Context）即块级格式化上下文，是一个**独立**的渲染区域，让处于 BFC 内部的元素与外部的元素相互隔离，使内外元素的定位不会相互影响。

## 如何创建BFC

- 根元素或包含根元素的元素`<html>`
- 浮动元素
- `position`: `absolute`或`fixed`
- `display`:不为`none`
- `overflow`:不为`visible`

## BFC的特性
1. 不会存在外边距合并(`margin`塌陷问题)
2. `float`,浮动元素会参与高度计算
   
## 应用场景

+ 防止`margin`塌陷
+ 清除浮动
+ 自适应两栏布局