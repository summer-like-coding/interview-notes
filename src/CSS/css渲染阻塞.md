---
title: css渲染阻塞
author: Summer
date: 2023-07-02
category:
  - CSS

tag:
  - CSS
  - 渲染
---

## 什么是 css 渲染阻塞

`css`渲染阻塞是指浏览器在解析`html`时，如果遇到了`css`，会暂停`html`的解析，等`css`加载完毕后，再继续解析`html`。所以说，css 渲染阻塞会阻塞`DOM`树的构建。

## 为什么会有 css 渲染阻塞

当浏览器开始解析`HTML`文件时，就会生成`DOM`树，但是在生成`DOM`树的时候，如果遇到了`css`，就会停止`DOM`树的生成，等`css`加载完毕后，再继续生成`DOM`树。

这样是为了确保`css`能够正确的渲染`DOM`树，因为`css`可以修改`DOM`树的样式，`css`**下载，解析完毕**后，再去渲染`DOM`树，就可以确保`css`能够正确的渲染`DOM`树。

## 如何避免 css 渲染阻塞

### 1. 将 css 放在`head`标签中

将`css`放在`head`标签中，可以确保`css`在`DOM`树生成之前就加载完毕，这样就不会阻塞`DOM`树的生成。

### 2. 使用媒体查询

我们可以使用媒体查询来指定`css`的**加载时机**，这样就可以避免`css`阻塞`DOM`树的生成。

```html
<!-- 网页首次加载时，只在打印内容时适用 -->
<link rel="stylesheet" href="style.css" media="print" />
<!-- 当符合某种条件的时候才会阻塞渲染 -->
<!-- 宽度至少是40em -->
<link rel="stylesheet" href="style.css" media="(min-width: 40em)" />

<!-- 一直会阻塞渲染 -->
<link rel="stylesheet" href="style.css" />
```

引申：[媒体查询](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Media_Queries/Using_media_queries)

#### 媒体查询

简单来说，媒体查询就是一种检测浏览器或设备特性的方法，可以根据**不同的特性**来加载不同的`css`

媒体查询的语法如下：

```css
@media not|only mediatype and (expressions) {
  CSS-Code;
}
```

- `not`：表示不匹配媒体类型的情况
- `only`：表示只匹配媒体类型的情况
- `meidatype`：指定媒体类型，如`screen`、`print`等
- `expressions`：媒体查询表达式，用来检测媒体类型的特性，如`width`、`height`等
  - `max-width`：最大宽度(至多多少)
  - `min-width`：最小宽度(至少多少)

语法改进：

```css
@media (min-width: 40em) {
  /* 宽度至少是40em */
}

/* 现在可以改写成 */
@media (width >= 40em) {
  /* 宽度至少是40em */
}
```

```css
@media (min-width: 40em) and (max-width: 60em) {
  /* 宽度至少是40em，至多是60em */
}

/* 现在可以改写成 */

@media (width >= 40em) and (width <= 60em) {
  /* 宽度至少是40em，至多是60em */
}
```

#### 媒体查询的使用场景

- 响应式布局
- 设置打印样式(`@media print { ... }`)
- 动态样式(根据不同的设备特性，加载不同的样式)
- 图片优化(根据不同的设备，不同分辨率，加载不同的图片)

### 3. 使用内联样式

### 4. 使用`preload`和`prefetch`

`preload`和`prefetch`是`html5`中的新特性，可以用来指定资源的加载时机。

`preload`用来指定**当前页面必须要用到的资源**，而`prefetch`用来指定**当前页面可能会用到的资源**。

```html
<!-- preload -->
<link rel="preload" href="style.css" as="style" />
<!-- prefetch -->
<link rel="prefetch" href="style.css" as="style" />
```

作用就是：**预加载，提前加载，提前缓存，一般都是将他直接缓存在浏览器的缓存目录下。**
