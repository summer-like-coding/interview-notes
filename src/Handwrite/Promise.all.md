---
title: Promise.all手写实现
date: 2023-07-19
author: summer
order: 1
category:
  - Handwrite
tag:
  - Promise
---

## 功能

- 接收一个`Promise`实例的数组或具有`Iterator`接口的对象
- 它会将多个`Promise`实例包装成一个新的`Promise`实例
- `Promise.all()`的状态由`Promise`实例决定
  - 只有所有的`Promise`实例状态都变成`fulfilled`，`Promise.all()`的状态才会变成`fulfilled`
  - 只要有一个`Promise`实例状态变成`rejected`，`Promise.all()`的状态就会变成`rejected`

## 例子

::: code-tabs#example
@tab fulfilled

```js
// 新建三个Promise实例
const promise1 = new Promise((resolve, reject) => {
  resolve("promise1");
});
const promise2 = new Promise((resolve, reject) => {
  resolve("promise2");
});
const promise3 = new Promise((resolve, reject) => {
  resolve("promise3");
});
// Promise.all接收一个Promise实例的数组
// Promise {<fulfilled>: Array(3)}
const pAll = Promise.all([promise1, promise2, promise3]);
```

@tab rejected

```js
// 新建三个Promise实例
const promise1 = new Promise((resolve, reject) => {
  resolve("promise1");
});
const promise2 = new Promise((resolve, reject) => {
  reject("promise2");
});
const promise3 = new Promise((resolve, reject) => {
  reject("promise3");
});
// Promise.all接收一个Promise实例的数组
// Promise {<rejected>: "promise2"}
const pAll = Promise.all([promise1, promise2, promise3]);
```

@tab catch

```js
// 新建三个Promise实例
const promise1 = new Promise((resolve, reject) => {
  resolve("promise1");
});
const promise2 = new Promise((resolve, reject) => {
  reject("promise2");
}).catch((err) => {
  console.log(err);
});
const promise3 = new Promise((resolve, reject) => {
  resolve("promise3");
});
// Promise.all接收一个Promise实例的数组
// Promise {<fulfilled>: Array(3)}
const pAll = Promise.all([promise1, promise2, promise3]);
```

:::

从上面的这些例子我们可以得出：

- 只有当所有的`Promise`实例状态都变成`fulfilled`，`Promise.all()`的状态才会变成`fulfilled`，**这边变为`fullfilled`有两种情况**：

  - 传入的`Promise`中都是`resolve`的实例
  - 传入的`Promise`中有`reject`的实例，但是已经被捕获了

- 只要有一个`reject`(**没有被捕获**)，那么`Promise.all()`就会变成`rejected`，那么会在第一处遇到的`reject`的地方抛出错误

## 代码实现

```js
/**
 * @description Promise.all手写实现
 * @param {Array} promises Promise实例数组
 * @returns {Promise} 返回一个Promise实例
 */

function promiseAll(promises) {
    // 设置返回结果里面的数组
    let result = []
    // 返回一个Promise实例
    return new Promise((resolve,reject)=>{
        // promise是一个有Iterator接口的对象，可以使用for...of遍历
        for [key,promise] of promises {
            // 判断当前遍历的promise是否是Promise实例，还是一个普通的值
            if(promise instanceof Promise){
                // 那么就需要等待这个Promise实例的状态变更，然后再将结果放在result里面
                promise.then(res=>{
                    // 如果走的是成功的回调，那么就将结果放在result里面
                    result[key] = res
                    // 判断是否是最后一个Promise实例
                    if(result.length === promises.length){
                        // 是最后一个Promise实例，那么就将result作为参数传入resolve
                        resolve(result)
                    }
                },err=>{
                    // 如果有一个Promise实例的状态变成了rejected，那么就直接将这个错误抛出
                    reject(err)
                })
            }else{
                // 不是Promise对象
                // 那么直接存储数据
                result[key] = promise
            }
        }
    })
}
```

## 总结

- `Promise.all()`接收一个具有`iterator`接口的对象，所以可以使用`forEach()`进行遍历
- **需要对传入的参数进行判断，判断它到底是不是 Promise 实例**
  - 如果是 Promise 实例，那么就需要等待这个 Promise 实例的状态变更(`.then()`调用)，然后再将结果放在 result 里面
  - 如果不是，那么直接放在 result 里面
- 记录一个`count`，用来记录`Promise`实例的数量，当`count`等于`promises`的长度时，说明所有的`Promise`实例都已经执行完毕，那么就可以调用`resolve`了

## 参考
- [字节飞书面试——请实现promise.all](https://juejin.cn/post/7069805387490263047)  
- [09-手写Promise-Promise.all方法的实现](https://www.bilibili.com/video/BV1FZ4y1r7Tv/?share_source=copy_web&vd_source=dbd5755e577bdae4bc901ba06be7c505)