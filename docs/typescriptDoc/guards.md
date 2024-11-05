# 型別推斷與型別兼容性

## 型別推斷

TypeScript 會自動推斷變數的型別，無需手動指定。

```js
let name = "Alice"; // TypeScript 推斷 name 為 string
```

## 型別守衛（Type Guards）

使用 `typeof`、`instanceof` 或自定義型別守衛函數來進行型別檢查。

```js
function isString(value: any): value is string {
  return typeof value === "string";
}
```

## 型別斷言（Type Assertions）

當 TypeScript 推斷不夠準確時，可以使用型別斷言強制指定變數的型別。

```js
let someValue: any = "Hello, world!";
let strLength: number = (someValue as string).length;
```

## TypeScript 推斷不夠準確的情況

- 複雜物件或嵌套結構
  當處理嵌套物件或深層結構時，TypeScript 有時無法準確推斷內層的型別，特別是當物件鍵值的型別變化較多或動態生成時

```js
const userProfile = {
  name: "Alice",
  settings: {
    theme: "dark",
    notifications: true,
  },
};

// TypeScript 可能推斷為字面量型別，而不是一般的物件結構
// 使用時如果有其他屬性可能會報錯
```

解決方法：使用介面或型別註解來明確指定物件的完整結構。

```js
interface settings {
  theme: string;
  notifications: boolean;
}
```

- 泛型使用中推斷不足
  當泛型參數需要在多種情境下使用時，TypeScript 無法推斷其確切型別，可能會推斷為 `any`，導致型別安全性下降

```js
function identity<T>(value: T): T {
  return value;
}

const result = identity("Hello"); // TypeScript 可以推斷為 string
const result2 = identity(42);     // 推斷為 number
// 但如果沒有明確傳入參數，T 可能推斷為 unknown
```

解決方法：在泛型函式呼叫時顯式指定型別

```js
identity<string>("Hello")
```