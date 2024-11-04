# `<script setup>` 語法糖

## 介紹

`<script setup>` 是 vue3 中新增的語法糖，允許在 `<script setup>` 內直接使用 Composition API ，不必再使用 `setup` 函數包起來，所有定義的變數、方法或屬性都可以直接於 `template` 中使用，不需要再 `return`

## 特點

- 不需 `return` 定義的變數、方法..etc
- `template` 可直接使用
- 在編譯上，`<script setup>` 比傳統 `setup` 更有效率

**註: setup 裡面 this 是指向 undefined**

## 範例

### script setup

定義的變數與方法，都可以直接在 template 中使用

```js
<template>
  <div>
    <p>{{ message }}</p>
    <button @click="increment">Click Count: {{ count }}</button>
  </div>
</template>

<script setup>
import { ref } from "vue";

// 定義響應式變量
const count = ref(0);
const message = ref("Hello Vue 3");

// 定義函數
function increment() {
  count.value++;
}
</script>
```

### setup

定義的變數與方法，需要 return， template 才能使用

```js
<template>
  <div>
    <p>{{ message }}</p>
    <button @click="increment">Click Count: {{ count }}</button>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    const count = ref(0);
    const message = ref("Hello Vue 3");

    function increment() {
      count.value++;
    }

    // 將變數等 return 给 template 使用
    return {
      count,
      message,
      increment
    };
  },
};
</script>
```
