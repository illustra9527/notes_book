# 函式

## 函式型別與回傳型別

TypeScript 允許為函數的參數和返回值指定型別，這樣能避免因參數類型錯誤而導致的問題

```js
function greet(name: string): string {
  return `Hello, ${name}`;
}
```

## 可選參數與默認值

使用 `?` 來定義可選參數，使用 `=` 指定默認值

```js
function greet(name: string, age?: number): string {
  return age ? `${name} is ${age} years old.` : `Hello, ${name}!`;
}

function add(a: number, b: number = 10): number {
  return a + b;
}
```

## 函式重載（Overloading）

TypeScript 支援函數重載，可用於定義同名但參數型別不同的函數。

允許為同一個函式提供多個不同的呼叫方式，使得同一函式可以根據不同的參數組合而實現不同的行為。  
這通常在處理多種輸入類型或返回不同類型的值時非常有用


```js
function combine(a: number, b: number): number;
function combine(a: string, b: string): string;
function combine(a: any, b: any): any {
  return a + b;
}
```

函式重載是透過`定義多個函式簽名`來實現的。
這些簽名定義了函式可以接受的不同參數組合，但函式的實際實現（implementation）只能寫一次  
實現函式時，TypeScript 會根據傳入的參數類型自動選擇適合的簽名  

透過通過重載，可以根據參數的不同類型處理不同的邏輯，而不必建立多個不同名稱的函式


### 範例
假設我們有一個函式 getInfo，它接受兩種不同類型的參數：

1. 當參數是 number 時，回傳此數字的平方。
2. 當參數是 string 時，回傳字串的長度。

```js
// 定義函式簽名（overload signatures）
function getInfo(value: number): number;
function getInfo(value: string): number;

// 實際實現函式（implementation）
function getInfo(value: any): number {
  if (typeof value === "number") {
    return value * value;
  } else if (typeof value === "string") {
    return value.length;
  }
}

// 使用函式
console.log(getInfo(5));        // 輸出：25
console.log(getInfo("hello"));  // 輸出：5
```