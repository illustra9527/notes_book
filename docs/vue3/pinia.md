# pinia

- 不需要 mutation，直接操作狀態
- 減少模板程式碼  
  組建使用時不再需要使用 `mapGetters`, `mapActions` 引用
- 模組化
- TypeScript 的支援

## 範例
### 1 
```js
// Pinia store.js
import { defineStore } from 'pinia';

export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0,
  }),
  actions: {
    increment() {
      this.count++; // 直接修改狀態
    },
    decrement() {
      this.count--; // 直接修改狀態
    },
  },
});

// 在組件中使用時
const counter = useCounterStore();
counter.increment(); // 直接調用 action
```

### 2 通常使用

在 defineStore 裡面定義的 (const) 的變數， 就是存在 store
return 後可使用。在重新整理，整個 app 重新渲染之前都會存在

```js
// 檔案會存在 @/store/user-info.ts
import { defineStore } from 'pinia'

export const useUserInfoStore = defineStore('userInfo', () => {
  const userInfo = ref<any>({
    name: 'John Lee'
  })

  const setUserInfo = (data: any) => {
    userInfo.value = {
      ...userInfo.value,
      ...data
    }
  }

  const getUserInfo = (key: string) => {
    return userInfo.value[key] ?? ''
  }

  const resetUserInfo = () => {
    userInfo.value = {}
  }

  return { userInfo, setUserInfo, resetUserInfo, getUserInfo }
})


// 組件使用時
import { useUserInfoStore } from '@stores/user-info.ts'

const { userInfo, setUserInfo } = useUserInfoStore()
```

## vs VueX

| 特性                | Pinia                          | Vuex                         |
| ------------------- | ------------------------------ | ---------------------------- |
| **API 設計**        | 簡單直觀，易於使用             | 相對複雜，較多樣板程式碼     |
| **TypeScript 支援** | 內建支援，易於使用             | 支援但需要額外配置           |
| **狀態管理模式**    | 模組化，獨立定義 store         | 全局 store，模組需要額外設置 |
| **行為定義**        | 直接在 state 中使用 actions    | 使用 mutations 和 actions    |
| **開發者工具支援**  | 更好的整合，提供清晰的狀態追蹤 | 也有支援，但不如 Pinia 直觀  |
| **文檔**            | 簡潔明瞭，示範易懂             | 文檔相對較長且詳盡           |
| **支持 SSR**        | 良好支援，方便用於 Nuxt.js     | 也支持 SSR，但配置相對複雜   |
