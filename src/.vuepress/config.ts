import { defineUserConfig } from "vuepress";
import { searchProPlugin } from "vuepress-plugin-search-pro";
import theme from "./theme.js";

export default defineUserConfig({
  base: "/interview-notes/",
  lang:'zh-CN',

  theme,
  plugins: [
    // 配置搜索内容
    // 后续可以设置DocSearch，他需要域名
    searchProPlugin({
      // 索引全部内容
      indexContent: true,
      // 为分类和标签添加索引
      customFields: [
        {
          getter: (page) => page.frontmatter.category as string | string[],
          formatter: "分类：$content",
        },
        {
          getter: (page) => page.frontmatter.tag as string | string[],
          formatter: "标签：$content",
        },
      ],
    })
  ]

  // Enable it with pwa
  // shouldPrefetch: false,
});
