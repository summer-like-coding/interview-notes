---
title: JSON2DOM = react的render函数
author: summer
date: 2023-07-19
order: 2
category:
  - Handwrite
tag:
  - react
  - render
  - dom
  - json
---

## 题目要求

```json
{
  "tag": "DIV",
  "attrs": {
    "id": "app"
  },
  "children": [
    {
      "tag": "SPAN",
      "children": [{ "tag": "A", "children": [] }]
    },
    {
      "tag": "SPAN",
      "children": [
        { "tag": "A", "children": [] },
        { "tag": "A", "children": [] }
      ]
    }
  ]
}
```

把上面的 json 转换成下面的 dom 结构

```html
<div id="app">
  <span>
    <a></a>
  </span>
  <span>
    <a></a>
    <a></a>
  </span>
</div>
```

## 思路

**像这种层层嵌套的，一般都是使用递归来做**

- 每层解构出来的对象都是一个 `dom` 节点
- `tag`: 节点的标签名
- `attrs`: 节点的属性
- `children`: 节点的子节点
  - 类型为数组，说明有多个子节点，数组里面又是一个个对象
  - 类型为对象，说明只有一个子节点

## 实现

```js
function json2html(json) {
  // 首先解构出json中的tag和attrs和children,可能attrs和children没有
  const { tag, attrs, children } = json;
  // 创建DOM节点
  const element = document.createElement(tag);
  // 设置属性
  if (attrs) {
    for (let key in attrs) {
      element.setAttribute(key, attrs[key]);
    }
  }
  //   设置子节点
  if (children) {
    // 如果有一个子节点，那么children就是一个对象，如果有多个子节点，那么children就是一个数组
    if (children instanceof Array) {
      if (children.length !== 0) {
        children.forEach((value) => {
          element.appendChild(json2html(value));
        });
      }
    } else if (children instanceof Object) {
      // 说明只有一个子节点
      element.appendChild(json2html(children));
    }
  }
  return element;
}
```
