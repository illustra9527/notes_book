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
    /* 先設定大綱 */
    sidebar: {
      "/vue3/": [
        {
          text: "vue3 介紹",
          items: [
            { text: "本篇內容", link: "/index.md" },
            { text: "reactive 與 ref", link: "/reactive.md" },
            { text: "setup 語法糖", link: "/setup.md" },
            { text: "watch", link: "/watch.md" },
            { text: "v-model", link: "/v-model.md" },
            { text: "Composables", link: "/composables.md" },
            { text: "Pinia", link: "/pinia.md" },
          ],
        },
      ],
      "/typescriptDoc/": [
        {
          text: "typescript 介紹",
          items: [
            { text: "簡介", link: "/index.md" },
            { text: "常見類型", link: "/vue3.md" },
            { text: "函式", link: "/function.md" },
            { text: "泛型（Generics）", link: "/generics.md" },
            { text: "型別推斷與型別兼容性", link: "/vue3.md" },
            { text: "interface 和 type 的比較", link: "/vue3.md" },
            { text: "常見類型", link: "/vue3.md" },
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
