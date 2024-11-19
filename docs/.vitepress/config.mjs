import { defineConfig } from "vitepress";
import {
  GitChangelog,
  GitChangelogMarkdownSection,
} from "@nolebase/vitepress-plugin-git-changelog/vite";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Notes",
  description: "just notes for f2e",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [{ text: "Home", link: "/" }],
    sidebar: {
      "/vue3/": [
        {
          text: "vue3 介紹",
          items: [
            { text: "本篇內容", link: "/vue3/" },
            { text: "reactive 與 ref", link: "/vue3/reactive" },
            { text: "setup 語法糖", link: "/vue3/setup" },
            { text: "watch", link: "/vue3/watch" },
            { text: "v-model", link: "/vue3/v-model" },
            { text: "Composables", link: "/vue3/composables" },
            { text: "Tree-Shaking", link: "/vue3/treeShaking" },
            { text: "Pinia", link: "/vue3/pinia" },
          ],
        },
      ],
      "/typescriptDoc/": [
        {
          text: "typescript 介紹",
          items: [
            { text: "簡介", link: "/typescriptDoc/index" },
            { text: "基本語法", link: "/typescriptDoc/classic" },
            { text: "定義和管理類型的方法", link: "/typescriptDoc/info" },
            { text: "函式", link: "/typescriptDoc/function" },
            { text: "泛型(Generics)", link: "/typescriptDoc/generics" },
            { text: "型別推斷與型別兼容性", link: "/typescriptDoc/guards" },
            {
              text: "interface 和 type 的比較",
              link: "/typescriptDoc/interfaceVs",
            },
          ],
        },
      ],
      "/vitePress/": [
        {
          text: "vitePress 介紹",
          items: [
            { text: "vitePress", link: "/vitePress/index" },
            { text: "github Actions", link: "/vitePress/github" },
            { text: "套件", link: "/vitePress/plugin" },
          ],
        },
      ],
      "/javascriptDoc/": [
        {
          text: "js 學習筆記",
          items: [
            { text: "for-of", link: "/javascriptDoc/for-of" }
          ],
        },
      ],
    },

    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],
  },
  vite: {
    plugins: [
      GitChangelog({
        repoURL: () => "https://github.com/illustra9527/notes_book.git",
      }),
      GitChangelogMarkdownSection(),
    ],
  },
  base: "/notes_book/",
});
