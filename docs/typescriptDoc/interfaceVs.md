# interface 和 type 的比較

- interface  
  通常用來定義物件的結構、類別的型別以及函式，可以進行擴展和合併。

- type
  用來創建任何型別的別名，可以定義基本型別、聯合型別、交集型別、元組、函式等。

## 擴展與合併

### 擴展 (`extends`) 用於 interface

在 interface 中可以使用 extends 關鍵字來擴展其他 interface，這樣可以很方便地繼承其他物件結構

```js
interface Person {
  name: string;
  age: number;
}

interface Employee extends Person {
  employeeId: number;
}

const employee: Employee = {
  name: "Alice",
  age: 30,
  employeeId: 123,
};
```

### 型別組合 (`&`) 用於 type

type 不能像 interface 那樣繼承，但可以使用 & 運算符進行組合

```js
type Person = {
  name: string,
  age: number,
};

type Employee = Person & {
  employeeId: number,
};

const employee: Employee = {
  name: "Bob",
  age: 25,
  employeeId: 456,
};
```

## interface 的合併宣告

在 interface 中，如果定義兩次同名的 interface，TypeScript 會自動合併它們的屬性（這稱為合併宣告（Declaration Merging））。而 type 不支持合併宣告。

```js
interface User {
  name: string;
}

interface User {
  age: number;
}

// 合併結果
const user: User = {
  name: "John",
  age: 30,
};
```

## 特性比較

| 特性               | `interface`            | `type`                               |
| ------------------ | ---------------------- | ------------------------------------ |
| **擴展性**         | 可繼承、可合併         | 只能擴展但無法合併                   |
| **用於物件和類別** | 最常用，預設選擇       | 適合定義更複雜的型別                 |
| **支援的型別**     | 物件結構               | 基本型別、聯合型別、交集型別、元組等 |
| **函式和元組型別** | 不支援                 | 支援函式、元組定義                   |
| **使用語法**       | 繼承物件結構 (extends) | 可用 `&` 運算符進行型別組合          |

## 使用情境比較

| 使用情境                          | 選擇                    |
| --------------------------------- | ----------------------- |
| 定義`物件` / class 結構並希望擴展 | `interface`             |
| 定義函式型別或元組                | `type`                  |
| 合併多個型別                      | `type`（使用 `&` 組合） |
| 需要自動合併宣告                  | `interface`             |
| 定義聯合型別                      | `type`                  |
