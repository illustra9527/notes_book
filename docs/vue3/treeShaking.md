# Tree-Shaking

## Tree-Shaking 是什麼

在 compiler 中，將不需要的程式碼移除以達到減少編譯時間的技術稱為：[死碼刪除 Dead Code Elimination - wiki](https://zh.wikipedia.org/wiki/%E6%AD%BB%E7%A2%BC%E5%88%AA%E9%99%A4)

Tree-Shaking 就是死碼刪除的新的實現原理，主要應用於 JavaScript 的模組打包工具（如 Webpack、Rollup 等）

## Tree-Shaking 的工作原理

利用 ES6 module 的靜態特性`（import 和 export）`，可以在打包時分析哪些模組和變量沒有被使用，進而刪除
相較於 CommonJS 的動態模組系統`（require）`，ES6 module 更易於靜態分析，利於 tree-shaking

## Tree-Shaking in Vue 3

- 核心功能模組化：核心架構模組化，讓應用按需引入，減少無用程式碼  
  內部的功能模組化，分離為多個獨立的功能模組。例如，`reactivity`、`runtime-core`、`runtime-dom` 都可以分別打包

- Composition API 的 tree-shaking 支持：僅引入應用中使用到的 API，減少不必要的程式碼  
  完全模組化，僅在使用到的 API 時才會被引入並打包  
  例如，當使用 ref 和 computed 時，打包工具僅會打包這些 API，而不會引入其他 Composition API 的功能

- 按需加載全局 API：全局 API 支援 tree-shaking，不使用的全局 API 不會被引入  
  全局 API（如 createApp、defineComponent 等），只有使用的 API 才會被打包工具引入

- 模板編譯器與虛擬 DOM 精簡：更高效的模板編譯器和虛擬 DOM，減少不必要的 runtime 功能  
