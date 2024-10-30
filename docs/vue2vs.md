# Vue2 vs Vue3

簡單說明 Vue2 與 Vue3 的差異

## 雙向綁定

**Vue2**

1. 深層屬性監聽：使用 `Object.defineProperty` ，只能監聽到直接屬性
2. 新增、移除屬性：無法自動更新，需用 $set, $delete
3. 陣列監聽：無法監聽到陣列部分操作，如 `splice`

**Vue3**

1. 深層屬性監聽：使用 `Proxy` ，攔截對物件的所有操作（包括屬性訪問、屬性設置、刪除屬性等）
2. 新增、移除屬性： proxy 攔截不需再使用 $set $delete
3. 陣列監聽：可攔截所有陣列改變

## 根節點

**Vue2**  
template 只能存在一個根節點，而且必須存在，有時會出現無意義的包裹元素

```
<template>
  <div>template 下只能只有一個 element</div>
</template>
```

**Vue3**  
可存在多個根節點

```
<template>
  <div>element 1</div>
  <div>element 2</div>
</template>
```

## API

**Vue2**
使用 Options API

組件內的不同屬性和邏輯會按照「屬性分散」的方式書寫，如 `data`、`methods`、`computed` 等
簡單的組件很直觀，但在大型或複雜組件中不易組織和重複利用邏輯
也會造成爬程式碼的混亂

```
export default {
  date() {
    return {
      //
    }
  },
  computed: {
    //
  },
  methods: {
    //
  }
}
```

**Vue3**
使用 Composition API

可將同一邏輯封裝在一起，不用在分散到各個屬性中

```
export default {
  setup() {
    const count = ref(0);
    const doubleCount = computed(() => count.value * 2);

    function increment() {
      count.value++;
    }

    return { count, doubleCount, increment };
  },
};
```

## 生命週期

| Vue 2 鉤子      | Vue 3 鉤子          | 說明                                                    |
| --------------- | ------------------- | ------------------------------------------------------- |
| -               | `setup()`           |                                                         |
| `beforeCreate`  | -                   | Vue 實例初始化前執行，無法訪問 `data`、`methods` 等屬性 |
| `created`       | -                   | Vue 實例創建後執行，可以訪問 `data` 等屬性              |
| `beforeMount`   | `onBeforeMount`     | 組件即將掛載到 DOM 前執行                               |
| `mounted`       | `onMounted`         | 組件已掛載到 DOM 上，適合操作 DOM                       |
| `beforeUpdate`  | `onBeforeUpdate`    | 組件更新響應式數據但尚未重新渲染前執行                  |
| `updated`       | `onUpdated`         | 組件更新並重新渲染 DOM 後執行                           |
| `beforeDestroy` | `onBeforeUnmount`   | 組件即將銷毀前執行，適合進行清理工作                    |
| `destroyed`     | `onUnmounted`       | 組件完全銷毀後執行                                      |
| -               | `onRenderTracked`   | 依賴被追蹤時觸發，用於性能監控                          |
| -               | `onRenderTriggered` | 組件重新渲染時觸發，用於性能優化                        |
| -               | `onErrorCaptured`   | 錯誤捕捉鉤子，用於處理組件內部異常                      |

Vue 3 將部分生命週期方法改為以 `onXxx` 形式的 Composition API
新增了 onBeforeUnmount 和 onUnmounted，替代 Vue 2 的 `beforeDestroy` 和 `destroyed`
Vue 3 允許在 setup 中使用生命週期方法，可以按需引入

```
import { onMounted, onUnmounted } from "vue";

export default {
  setup() {
    onMounted(() => {
      console.log("Component mounted");
    });

    onUnmounted(() => {
      console.log("Component unmounted");
    });
  },
};
```

## data

**Vue2**
以函數回傳物件，確保每個組件有自己的 data

```
data() {
  return {
    count: 0
  };
}
```

**Vue3**
直接在 setup 中定義，以 ref 或 reactive 來建立響應式資料

```
<script setup>
import { ref, reactive } from "vue";

const count = ref(0)
const state = reactive({ count: 0 });
</script>
```

## props, emit

**Vue2**

props 在 Options API 中定義，並需透過 `this.$emit` 來傳遞事件

```
// 父組件
<ChildComponent :message="msg" @update="handleUpdate" />

// 子組件
export default {
  props: ["message"],
  methods: {
    updateMessage() {
      this.$emit("update", "New message");
    },
  },
};

```

**Vue3**
在 setup 可直接存取傳入的 props，使用 context.emit 來觸發事件

```
// 父組件
<ChildComponent v-model="msg" />

// 子組件
<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({ modelValue: String });
const emit = defineEmits(['update:modelValue']);

function updateMessage() {
  emit("update:modelValue", "New message");
}
</script>

```

## typescript

Vue 3 完全支援 typescript
