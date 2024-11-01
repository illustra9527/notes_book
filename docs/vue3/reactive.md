# reactive vs ref

## 介紹

`ref` 和 `reactive` 被包成 Proxy 代理，使變數更直接地成為響應式對象

- reactive：適用於物件，會使用 Proxy 將物件整體設為響應式。
- ref：適用於基本數據型別或單一值的響應式封裝。透過 `.value` 來讀取和設置值。在 template 使用時，會自動解包

```js
import { ref, reactive } from "vue";

const count = ref(0); // 單一值響應式
const state = reactive({ name: "Alice", age: 25 }); // 複雜物件響應式
```

## 比較

| 特性         | `ref`              | `reactive`               |
| ------------ | ------------------ | ------------------------ |
| **適用對象** | 單一值（基本類型） | 複雜結構（物件、陣列等） |
| **訪問方式** | `.value`           | 直接訪問                 |
| **性能**     | 輕量、高效         | 適合多屬性、複雜狀態管理 |
| **深層監測** | 不支援嵌套結構     | 支援嵌套物件和陣列的監測 |

## 選擇

### ref

當需要管理單一變量（如 `string`、`number`、`boolean` ...etc）

```js
const isLoading = ref(false);
const counter = ref(0);

console.log(count.value);
```

解包說明

```js
<template>
  <!-- 無需使用 count.value -->
  <p>{{ count }}</p>
  <button @click="increment">Increment</button>
</template>

<script setup>
import { ref } from "vue";

const count = ref(0);

function increment() {
  count.value++; // 在 JavaScript 中仍然需要 .value
}
</script>
```

### reactive

複雜、巢狀結構的資料格式

```js
const user = reactive({
  name: "John Doe",
  preferences: {
    theme: "dark",
    notifications: true,
  },
});

console.log(user.name);
```
