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

// test
const data:TreeToList[] = [
    {
        id: '1',
        text: '父节点1',
        parentId: '0',
        children: [
            {
                id: '1-1',
                text: '子节点1-1',
                parentId: '1',
                children: [
                    {
                        id: '1-1-1',
                        parentId: '1-1',
                        text: '子节点1-1-1'
                    },
                    {
                        id: '1-1-2',
                        parentId: '1-1',
                        text: '子节点1-1-2'
                    }
                ]
            }
        ]
    },
    {
        id: '2',
        text: '父节点2',
        parentId: '0',
        children: [
            {
                id: '2-1',
                parentId: '2',
                text: '子节点2-1'
            }
        ]
    }
]

console.log(treeToList(data));