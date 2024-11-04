# v-model

vue3 對於雙向綁定的調整

- 支援自訂 prop 和事件名稱，還可以在單個組件中使用多個 v-model

- 修正預設綁定 prop 名稱與事件，統一的命名約定
vue2 原本是綁定 `input` 跟 `value`，改為 `modelValue`，並使用 `update:modelValue` 事件

```js
/* 子組件 */
<template>
  <div>
    <input :value="title" @input="$emit('update:title', $event.target.value)" placeholder="輸入標題" />
    <textarea :value="content" @input="$emit('update:content', $event.target.value)" placeholder="輸入內容"></textarea>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

// 定義 props
const props = defineProps({
  title: String,
  content: String
})

// 定義 emit
const emit = defineEmits(['update:title', 'update:content'])
</script>
```

```js
/* 父組件 */
<template>
  <MyComponent v-model:title="postTitle" v-model:content="postContent" />
</template>

<script setup>
import { ref } from 'vue'
import MyComponent from './MyComponent.vue'

// 定義父組件的狀態
const postTitle = ref('初始標題')
const postContent = ref('初始內容')
</script>
```
