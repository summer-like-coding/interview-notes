/**
 * @description Promise.all手写实现
 * @param {Array} promises Promise实例数组
 * @returns {Promise} 返回一个Promise实例
 */

function promiseAll(promises) {
  // 设置返回结果里面的数组
  let result = [];
  //   记录当前成功的Promise实例的数量
  let count = 0;
  // 返回一个Promise实例
  return new Promise((resolve, reject) => {
    // promise是一个有Iterator接口的对象，可以使用for...of遍历
    // for (let [key, onePromise] of promises) {
    promises.forEach((onePromise, key) => {
      // 判断当前遍历的promise是否是Promise实例，还是一个普通的值
      if (onePromise instanceof Promise) {
        // 那么就需要等待这个Promise实例的状态变更，然后再将结果放在result里面
        onePromise.then(
          (res) => {
            // 如果走的是成功的回调，那么就将结果放在result里面
            result[key] = res;
            // 记录当前成功的Promise实例的数量
            count++;
            // 判断是否是最后一个Promise实例
            if (count === promises.length) {
              // 是最后一个Promise实例，那么就将result作为参数传入resolve
              resolve(result);
            }
          },
          (err) => {
            // 如果有一个Promise实例的状态变成了rejected，那么就直接将这个错误抛出
            reject(err);
          }
        );
      } else {
        // 不是Promise对象
        // 那么直接存储数据
        result[key] = onePromise;
      }
    });
  });
}

// 测试
const p1 = Promise.resolve("p1");
const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("p2 延时一秒");
  }, 1000);
});
const p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("p3 延时两秒");
  }, 2000);
});

const p4 = Promise.reject("p4 rejected");

const p5 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject("p5 rejected 延时1.5秒");
  }, 1500);
});

// 所有 Promsie 都成功
promiseAll([p1, p2, p3])
  .then((res) => console.log(res))
  .catch((err) => console.log(err)); // 2秒后打印 [ 'p1', 'p2 延时一秒', 'p3 延时两秒' ]

// 一个 Promise 失败
promiseAll([p1, p2, p4])
  .then((res) => console.log(res))
  .catch((err) => console.log(err)); // p4 rejected

// 一个延时失败的 Promise
promiseAll([p1, p2, p5])
  .then((res) => console.log(res))
  .catch((err) => console.log(err)); // 1.5秒后打印 p5 rejected 延时1.5秒

// 两个失败的 Promise
promiseAll([p1, p4, p5])
  .then((res) => console.log(res))
  .catch((err) => console.log(err)); // p4 rejected
