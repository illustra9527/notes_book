import { h } from "vue";
import DefaultTheme from "vitepress/theme";
import type { Theme as ThemeConfig } from "vitepress";
import { NolebaseGitChangelogPlugin } from "@nolebase/vitepress-plugin-git-changelog/client";

import "@nolebase/vitepress-plugin-git-changelog/client/style.css";

export const Theme: ThemeConfig = {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    });
    // 其他配置
  },
  enhanceApp({ app }) {
    app.use(NolebaseGitChangelogPlugin);
  },
};

export default Theme;
