/**
 * @description Json转换为html
 * @param {Object} json
 * @returns {String} html
 */

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

// test
const json = {
  tag: "DIV",
  attrs: {
    id: "app",
  },
  children: [
    {
      tag: "SPAN",
      children: [{ tag: "A", children: [] }],
    },
    {
      tag: "SPAN",
      children: [
        { tag: "A", children: [] },
        { tag: "A", children: [] },
      ],
    },
  ],
};

const html = json2html(json);
console.log(html);
