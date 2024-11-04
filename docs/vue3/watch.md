# watch

- 寫法調整
- 可在 `setup` 使用
- 可同時監聽多個參數，觸發相同 `callback`
- `ref` 自動解包

## 寫法調整

```js
import { reactive, watch } from "vue";

const person = reactive({
  name: "Alice",
  age: 25,
});

watch(
  person,
  (newValue, oldValue) => {
    console.log("Person object changed", newValue);
  },
  { deep: true },
  { immediate: true }
);
```

## 同時監聽數個參數

```js
import { ref, watch } from "vue";

const firstName = ref("Alice");
const lastName = ref("Smith");

watch([firstName, lastName], ([newFirst, newLast], [oldFirst, oldLast]) => {
  console.log(`Name changed from ${oldFirst} ${oldLast} to ${newFirst} ${newLast}`);
});

```

## vs Vue 2

| 特性             | Vue 2                              | Vue 3                                            |
| ---------------- | ---------------------------------- | ------------------------------------------------ |
| **使用方式**     | 使用 `this.$watch` 監聽數據變化    | 使用 `watch` 函式                                |
| **參數**         | 需要傳入被監聽的屬性名稱和 callback | 接受一個或多個響應式數據或 getter 作為第一個參數 |
| **多個監聽**     | 需要使用多個 `this.$watch` 調用    | 可以同時監聽多個響應式數據，透過 `watch` 的 API  |
| **深度監聽**     | 使用 `deep: true`                  | 使用 `deep` 參數或選項                           |
| **即時監聽**     | 使用 `immediate: true`             | 使用 `immediate` 參數                            |
| **返回值**       | 無返回值                           | 返回一個清理函式以取消監聽                       |
| **處理函式參數** |  callback接收新值和舊值             | 可使用 `handler` 來接收新舊值                    |
