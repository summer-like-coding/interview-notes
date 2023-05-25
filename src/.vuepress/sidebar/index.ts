import { sidebar } from "vuepress-theme-hope";

export const Sidebar = sidebar({
  "/": [
    "",
    {
      text: "JavaScript篇",
      prefix: "JavaScript/",
      link: "JavaScript/",
      // 设置structure会根据本地文件，自动生成侧边栏
      children: "structure",
    },
    {
      text: "React篇",
      prefix: "React/",
      link: "React/",
      // 设置structure会根据本地文件，自动生成侧边栏
      children: "structure",
    },
  ],
});
