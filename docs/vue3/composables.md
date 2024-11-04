# Composables

利用 Composition API 特性，將程式碼抽離為獨立的函式，並且可以在多個組件中重用  
這種方式讓邏輯更具結構化，且不會與組件生命週期、狀態、方法等產生命名衝突

## 範例

計數器的邏輯寫成 useCounter 的 Composable 函式：

```js{15}
// composables/useCounter.js
import { ref } from 'vue'

export function useCounter() {
  const count = ref(0)

  function increment() {
    count.value++
  }

  function decrement() {
    count.value--
  }

  return { count, increment, decrement }
}
```

在組件中使用這個 Composable：

```js{12}
<template>
  <div>
    <p>計數：{{ count }}</p>
    <button @click="increment">增加</button>
    <button @click="decrement">減少</button>
  </div>
</template>

<script setup>
import { useCounter } from './composables/useCounter'

const { count, increment, decrement } = useCounter()
</script>

```

## 特點

- 明確函式，不暴露程式邏輯，使程式碼更具結構化  
- 減少命名衝突。透過函式返回具體的變數和方法，因此可以明確控制變數的範圍  
- 可依需求 import 需要的功能，不用全部引入  
- 提高測試性  
  因為不依賴組件的生命周期，更容易單獨測試


## 與 mixins 差別

| 特性             | Composables                      | Mixins           |
| ---------------- | -------------------------------- | ---------------- |
| **結構清晰度**   | 高                               | 低               |
| **命名衝突**     | 不易衝突                         | 易衝突           |
| **靈活性**       | 高，支援依賴注入和參數傳遞       | 低，無法靈活修改 |
| **測試性**       | 易於測試，為獨立函式             | 較難測試         |
| **推薦使用場合** | 重複性高、邏輯複雜、結構化需求高 | 適合簡單重用邏輯 |

## 適用時機

- Composables：適合抽離複雜邏輯且需要重用的功能模組，例如表單驗證、資料抓取等

- mixins：適合簡單的邏輯重用，但通常在大型應用中會引起混亂

**Vue 3 推薦優先使用 Composables 來取代 mixins**
