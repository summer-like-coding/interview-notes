import { sidebar } from "vuepress-theme-hope";

export const Sidebar = sidebar({
  "/": [
    "",
    {
      text: "CSS篇",
      icon: "css",
      prefix: "CSS/",
      link: "CSS/",
      // 设置structure会根据本地文件，自动生成侧边栏
      children: "structure",
    },
    {
      text: "JavaScript篇",
      icon: "javascript",
      prefix: "JavaScript/",
      link: "JavaScript/",
      // 设置structure会根据本地文件，自动生成侧边栏
      children: "structure",
    },
    {
      text: "React篇",
      icon: "react",
      prefix: "React/",
      link: "React/",
      // 设置structure会根据本地文件，自动生成侧边栏
      children: "structure",
    },
    {
      text: "Vue篇",
      icon: "vue",
      prefix: "Vue/",
      link: "Vue/",
      // 设置structure会根据本地文件，自动生成侧边栏
      children: "structure",
    },
    {
      text: "TypeScript篇",
      icon: "typescript",
      prefix: "TypeScript/",
      link: "TypeScript/",
      children: "structure",
    },
    {
      text: "Network篇",
      icon: "network",
      prefix: "Network/",
      link: "Network/",
      children: "structure",
    },
    {
      text: "ES6篇",
      icon: "es6",
      prefix: "ES6/",
      link: "ES6/",
      children: "structure",
    },{
      text: "浏览器篇",
      icon: "browser",
      prefix: "Browser/",
      link: "Browser/",
      children: "structure",
    },{
      text: "项目篇",
      icon: "project",
      prefix: "Project/",
      link: "Project/",
      children: "structure",
    },{
      text: "场景篇",
      icon: "scene",
      prefix: "Scene/",
      link: "Scene/",
      children: "structure",
    },{
      text: "面试复盘篇",
      icon: "interview",
      prefix: "Interview/",
      link: "Interview/",
      children: "structure",
    }
  ],
});
