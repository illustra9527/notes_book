# for-of

`for-of` 是 JavaScript 中用於遍歷可迭代物（iterables）的迴圈結構，特別適合於陣列和其他可迭代的物件，例如字串、Map、Set 等。與傳統的 `for`迴圈或 `for-in` 迴圈不同，`for-of` 能更簡潔地直接取得每個元素，無需使用索引來存取。

簡單說可以適用於不需要取得 index ，可迭代的迴圈

::: warning
需要注意的是 **for-of 只能用來遍歷可迭代的物件，不能用於純物件（object），因為物件本身不是 iterable。**
:::

## 介紹

```js
for (const element of iterable) {
  // 對每個 element 進行操作
}
```

1. 簡潔的語法：for-of 直接取出元素，而不是索引，讓程式碼更簡潔。
2. 適用於可迭代物：可以用來遍歷陣列、字串、Map、Set 等，對物件（object）則不適用。
3. 避免索引錯誤：不需要手動操作索引，也不用擔心陣列邊界，能減少潛在錯誤。

## 用法介紹

### 陣列

```js
const fruits = ["apple", "banana", "cherry"];

for (const fruit of fruits) {
  console.log(fruit); // apple, banana, cherry
}
```

### 字串

```js
const text = "hello";

for (const char of text) {
  console.log(char); // h, e, l, l, o
}
```

### map/set

```js
// Map
const map = new Map([
  [1, "a"],
  [2, "b"],
  [3, "c"],
]);
for (const [key, value] of map) {
  console.log(key, value); // 1 a, 2 b, 3 c
}

// Set
const set = new Set(["apple", "banana", "cherry"]);
for (const value of set) {
  console.log(value); // apple, banana, cherry
}
```

## 與其他迴圈方法的比較

### 迴圈比較

| 迴圈類型           | 適用場合                             | 主要特點                                                                       |
| ------------------ | ------------------------------------ | ------------------------------------------------------------------------------ |
| **`for` 迴圈**     | 需要索引或控制循環次數的情況         | 語法較繁瑣，但適合需要操作索引的情境。                                         |
| **`for-in` 迴圈**  | 遍歷物件屬性或陣列索引的情況         | 適用於物件屬性迭代，但遍歷陣列時取得的是索引，並非值本身。                     |
| **`for-of` 迴圈**  | 適合可迭代物（陣列、字串、Map、Set） | 簡潔易讀，直接取得元素值，但不適用於純物件（object），也不使用索引。           |
| **`forEach` 方法** | 陣列元素遍歷                         | 適合處理陣列元素，可以直接操作值；但不支援 `await`，無法在迴圈中進行異步操作。 |
