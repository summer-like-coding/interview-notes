import { hopeTheme } from "vuepress-theme-hope";
import { Navbar } from "./navbar/index.js";
import { Sidebar } from "./sidebar/index.js";

export default hopeTheme({
  hostname: "https://summer.alexsun.top/interview-notes/",

  iconAssets: "iconfont",

  logo: "/logo.svg",

  repo: "summer-like-coding/interview-notes",

  docsDir: "src",

  navbar: Navbar,
  sidebar: Sidebar,
  // 页脚支持
  displayFooter: true,
  footer:
    '<a href="https://beian.miit.gov.cn/" target="_blank">苏ICP备2023012081号</a>',
  copyright: "Copyright © 2023 summer",

  metaLocales: {
    editLink: "在 GitHub 上编辑此页",
  },

  plugins: {
    // all features are enabled for demo, only preserve features you need here
    mdEnhance: {
      align: true,
      attrs: true,
      chart: true,
      codetabs: true,
      demo: true,
      echarts: true,
      figure: true,
      flowchart: true,
      gfm: true,
      imgLazyload: true,
      imgSize: true,
      include: true,
      katex: true,
      mark: true,
      mermaid: true,
      tasklist: true,
      playground: {
        presets: ["ts", "vue"],
      },
      stylize: [
        {
          matcher: "Recommended",
          replacer: ({ tag }) => {
            if (tag === "em")
              return {
                tag: "Badge",
                attrs: { type: "tip" },
                content: "Recommended",
              };
          },
        },
      ],
      sub: true,
      sup: true,
      tabs: true,
      vPre: true,
      vuePlayground: true,
    },
    // 自动生成目录
    autoCatalog: {},
    // 代码复制
    copyCode: {
      showInMobile: true,
    },
  },
});
