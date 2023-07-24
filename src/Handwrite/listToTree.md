---
title: listToTree 将列表转换为树形结构
date: 2023-07-20
author: summer
order: 4
category: 
  - handwrite
tag: 
  - 树形结构
---

## 题目要求

```javascript
let arr = [
  { id: 1, name: "部门1", pid: 0 },
  { id: 2, name: "部门2", pid: 1 },
  { id: 3, name: "部门3", pid: 1 },
  { id: 4, name: "部门4", pid: 3 },
  { id: 5, name: "部门5", pid: 4 },
  { id: 6, name: "部门6", pid: 0 },
];
```

将上述数组转换成下面的树形结构

```javascript
let result = [
  {
    id: 1,
    name: "部门1",
    pid: 0,
    children: [
      {
        id: 2,
        name: "部门2",
        pid: 1,
        children: [],
      },
      {
        id: 3,
        name: "部门3",
        pid: 1,
        children: [
          {
            id: 4,
            name: "部门4",
            pid: 3,
            children: [
              {
                id: 5,
                name: "部门5",
                pid: 4,
                children: [],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 6,
    name: "部门6",
    pid: 0,
    children: [],
  },
];
```

## 思路

**这道题目其实就是和上面一题类似，就是将他反过来**

- **注意 pid 是用来表示父亲节点的**
- 其实我们我们可以利用**深拷贝**这一个特质，将他们的引用关系给打破，然后再去组装他们的关系

## 代码实现

```javascript
function listToTree(list) {
  // 结果res
  let res = [];
  // 使用一个队列来记录待处理的数据
  let queue = [];
  // 首先将list的所有节点入队
  queue.push(...list);
  // 然后依次处理队列中的数据
  while (queue.length) {
    // 设置当前处理节点
    // let curr = constructorListToTree(queue.shift());
    let curr = queue.shift();
    // 如果当前节点id === 子节点的parentId，则将子节点入队
    let children = list.filter((item) => item.parentId === curr.id);
    if (children.length) {
      curr.children = children;
    }
    // 将curr放入res中
    // 只有当curr的parentId为0时，才将curr放入res中
    if (curr.parentId === 0) {
      res.push(curr);
    }
  }
  return res;
}
```
