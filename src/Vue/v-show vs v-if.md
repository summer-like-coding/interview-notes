---
title: v-show vs v-if
date: 2023-07-16
author: summer
tag:
  - v-show
  - v-if
category:
  - Vue
---

## 相同点

都能够达到控制元素显示隐藏的效果

```vue
<template>
  <div>
    <div v-show="isShow">v-show</div>
    <div v-if="isShow">v-if</div>
  </div>
</template>
```

## 不同点

但是他们达到效果的方式不同

### 方式

- `v-show` 是通过控制元素的 `display` 属性来实现的

  - 假如 `isShow` 为 `false`，那么 `v-show` 会将元素的 `display` 属性设置为 `none`
  - 假如`isShow` 为 `true`，那么 `v-show` 会将元素的 `display` 属性设置为 `block`

- `v-if` 是通过控制元素的 `DOM` 结构来实现的
  - 假如 `isShow` 为 `false`，那么 `v-if` 会将元素从 `DOM` 结构中移除
  - 假如 `isShow` 为 `true`，那么 `v-if` 会将元素添加到 `DOM` 结构中
  - 同样的当`DOM`结构中的元素被移除后，那么该元素的事件监听器也会被移除

### 编译过程

- `v-show`: 在编译过程中，会在元素上添加一个 `style` 属性，用来控制元素的 `display` 属性,只涉及`CSS`的变化，不会涉及到`DOM`结构的变化
- `v-if`：在编译过程中，会在元素上添加一个 `ifConditions` 属性，用来控制元素的 `DOM` 结构，涉及到`DOM`结构的变化

### 触发生命周期

- `v-show`: 不会触发任何生命周期，因为只涉及到`CSS`的变化，不会涉及到`DOM`结构的变化
- `v-if`: 会触发元素的生命周期，因为涉及到`DOM`结构的变化
  - 当`isShow`从`false`变为`true`时，会触发元素的`beforeCreate`、`created`、`beforeMount`、`mounted`生命周期
  - 当`isShow`从`true`变为`false`时，会触发元素的`beforeUnmount`、`unmounted`生命周期

### 性能

- `v-show`: 由于只涉及到`CSS`的变化，所以性能比较好
- `v-if`: 由于涉及到`DOM`结构的变化，所以性能比较差
