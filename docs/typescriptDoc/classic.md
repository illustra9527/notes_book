# 基本語法

- 使用 TypeScript 可以為變數指定類型：`string`、`number`、`boolean`、`Array`、`Tuple`、`Enum`、`any` 等。

```js
let message: string = "Hello, TypeScript!";
let age: number = 25;
let isStudent: boolean = true;
let hobbies: string[] = ["Reading", "Gaming"];
let person: [string, number] = ["Alice", 30]; // Tuple
```

## Enum

enum 是 TypeScript 中的列舉類型，用於定義一組命名常量
它可以是數字列舉或字串列舉，便於在程式中使用具名常量，而非直接使用數值或字串字面量

```js
// 數字列舉
enum Direction {
  Up = 1,
  Down,
  Left,
  Right
}

// 字串列舉
enum Status {
  Success = "SUCCESS",
  Failure = "FAILURE",
}
```
