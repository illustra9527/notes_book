# github Actions

介紹如何用 github actions 執行 ci/cd

## 新增 yml file

新增檔案 `.github/workflows/deploy.yml`

```
name: Deploy Notes to Pages

on:
  push:
    # 使用哪個分支
    branches: [main]

  workflow_dispatch:

# 设置 GITHUB_TOKEN 的权限，以允许部署到 GitHub Pages
permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        with:
          fetch-depth: 0 # 如果未启用 lastUpdated，则不需要
      # - uses: pnpm/action-setup@v3 # 如果使用 pnpm，请取消此区域注释
      #   with:
      #     version: 9
      # - uses: oven-sh/setup-bun@v1 # 如果使用 Bun，请取消注释
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - name: Setup Pages
        uses: actions/configure-pages@v4
      - name: Install dependencies
        run: npm ci
      - name: Build with VitePress
        run: npm run docs:build
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: docs/.vitepress/dist

  # 部署工作
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    needs: build
    runs-on: ubuntu-latest
    name: Deploy
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

## public 根目錄確認

在 `config.mjs` 的 `base` 屬性中設定根目錄  
如果 github 路徑是 project

```js{3}
export default defineConfig({
  // .....
  base: "/project/",
})
```

## github 設定

進入選單 `Settings` > `Pages`  
選擇 `Build and deployment` > `Source` > `GitHub Actions`

這樣每次 push `main` 分支的時候，都會自動部署
