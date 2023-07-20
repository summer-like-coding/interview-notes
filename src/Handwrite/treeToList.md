---
title: treeToList将树转换为列表
date: 2023-07-20
order: 3
author: summer
tag:
  - 树
category:
  - handwrite
---

## 题目要求

```javascript
const data = [
  {
    id: 1,
    text: "节点1",
    parentId: 0,
    children: [
      {
        id: 2,
        text: "节点1_1",
        parentId: 1,
      },
    ],
  },
];
```

将上面这个树结构的数据转换成下面这种列表结构

```javascript
const list = [
  {
    id: 1,
    text: "节点1",
    parentId: 0,
  },
  {
    id: 2,
    text: "节点1_1",
    parentId: 1,
  },
];
```

## 思路

**类似的像这种层层嵌套的，一般都是使用递归来做**

- 首先我们需要一个函数，这个函数接收一个参数，这个参数就是我们的树结构数据
- 其次我们需要对`children`，也就是子节点进行遍历，遍历的同时，我们需要把每个子节点的`children`也进行遍历，这样就可以把所有的节点都遍历到了
- **我们维护一个队列，将需要访问的节点放在队列里面**


## 代码实现

```typescript
/**
 * @description 将树型结构转换为列表
 * @param {Object} object 树型结构
 * @returns {Array} 列表
 */

interface TreeToList {
    id: string;
    text: string;
    parentId: string;
    children?: TreeToList[];
}

interface TreeToListResult {
    id: string;
    text: string;
    parentId: string;
}

function treeToList(object: TreeToList[]): TreeToListResult[] {
    // 返回结果
    let result: TreeToListResult[] = [];
    // 设置一个队列，用于存放待处理的数据
    let queue: TreeToList[] = [];
    // 首先让树型结构入队
    queue.push(...object);
    // 然后依次处理队列中的数据
    while (queue.length) {
        // 取出队列中的第一个数据
        let curr = queue.shift()!;
        // 将当前数据放入返回结果中
        result.push(constructorTreeToList(curr));
        // 如果当前数据有子节点，则将子节点入队
        if (curr.children) {
            queue.push(...curr.children);
        }
    }

    return result;
}

function constructorTreeToList(node: TreeToList): TreeToListResult {
    return {
        id: node.id,
        text: node.text,
        parentId: node.parentId
    };
}
```