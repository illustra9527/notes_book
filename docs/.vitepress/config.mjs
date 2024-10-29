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
            { text: "簡介", link: "/index.md" },
            { text: "常見類型", link: "/vue3.md" },
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

    vite: {
      plugins: [
        GitChangelog({
          // 填写在此处填写您的仓库链接
          repoURL: () => "https://github.com/nolebase/integrations",
        }),
        GitChangelogMarkdownSection(),
      ],
    },
  },
});
