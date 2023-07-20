/**
 * @description 将列表转换为树形结构
 * @param {Array} list
 * @return {Array}
 */

// AC
function listToTreeAC(list) {
  // 结果res
  let res: any = [];
  // 使用一个队列来记录待处理的数据
  let queue: any = [];
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

// 定义类型
interface ListToTree {
  id: number;
  name: string;
  parentId: number;
  children?: ListToTree[];
}

interface ListToTreeResult {
  id: number;
  name: string;
  parentId: number;
  children: ListToTreeResult[] | [];
}

// 定义函数
function listToTree(list: ListToTree[]): ListToTreeResult[] {
  // 结果res
  let res: ListToTreeResult[] = [];
  // 使用一个队列来记录待处理的数据
  let queue: ListToTree[] = [];
  // 首先将list的所有节点入队
  queue.push(...list);
  // 然后依次处理队列中的数据
  while (queue.length) {
    // 设置当前处理节点
    let curr = constructorListToTree(queue.shift()!);
    // 如果当前节点id === 子节点的parentId，则将子节点入队
    let children = list.filter((item) => item.parentId === curr.id);
    console.log(children);
    if (children.length) {
      // 将children转换为树形结构
      // 为curr添加children属性
      curr.children = children.map((item) => constructorListToTree(item));
    }
    // 只有当curr的parentId为0时，才将curr放入res中
    if (curr.parentId === 0) {
      res.push(curr);
    }
  }
  return res;
}

// WA,只能处理一层children情况，多层children情况不行，就复制不上去了
function constructorListToTree(node: ListToTree): ListToTreeResult {
  return {
    id: node.id,
    name: node.name,
    parentId: node.parentId,
    children: []
  };
}

// test
let arr: ListToTree[] = [
  { id: 1, name: "部门1", parentId: 0 },
  { id: 2, name: "部门2", parentId: 1 },
  { id: 3, name: "部门3", parentId: 1 },
  { id: 4, name: "部门4", parentId: 3 },
  { id: 5, name: "部门5", parentId: 4 },
  { id: 6, name: "部门6", parentId: 0 }
];

console.log(listToTree(arr));

