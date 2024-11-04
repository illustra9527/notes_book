# 定義和管理類型的方法

## interface 介面

interface 用來描述物件的結構。可以定義約束屬性、方法、函式參數類型。  
interface 支持擴展（`extends`），並能合併同名接口。

```js
interface Person {
  name: string;
  age: number;
}

interface Employee extends Person {
  employeeId: number;
}
```

## type

type 是 TypeScript 中更靈活的類型別名，用來創建聯合類型(Union)、交叉類型(Intersection)、原始類型、函式類型等
type 沒有合併功能，可以使用 & 運算符進行組合

```js
// 基本類型別名
type StringOrNumber = number;

// 聯合類型：允許類型為多個選項之一
type OrderNumber = string | number;

// 字面量類型：用來定特定值的類型
type YesOrNo = "yes" | "no";

// 組合類型
type Person = { name: string, age: number };

// 交叉類型：合併多個類型的屬性
type Employee = Person & { employeeId: number };

// 函式類型
type Greet = (name: string) => string;
```

## class 類別

### 類別和介面可用於面向對象編程。介面可用於限制類別的結構，並確保類別實現指定的屬性和方法。

```js
interface Animal {
  name: string;
  makeSound(): void;
}

class Dog implements Animal {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  makeSound() {
    console.log("Woof!");
  }
}
```

### 存取修飾詞（public, private, protected）

TypeScript 支援存取修飾詞來控制類別屬性的可見性：

- public：所有地方都可以訪問。
- private：僅能在類別內部訪問。
- protected：僅能在類別及其子類別中訪問。

```js
class Person {
  public name: string;
  private age: number;
  protected address: string;

  constructor(name: string, age: number, address: string) {
    this.name = name;
    this.age = age;
    this.address = address;
  }
}
```

### 類別繼承與多型

類別可透過 extends 關鍵字實現繼承並覆寫父類方法

```js
class Animal {
  makeSound(): void {
    console.log("Some sound");
  }
}

class Dog extends Animal {
  makeSound(): void {
    console.log("Bark!");
  }
}
```

## declare class

用來宣告外部類別的存在，通常是為了提供外部函式庫或模組的類別定義，而不需要具體實現。
這樣的類別定義常見於 .d.ts 文件中。

```js
declare class ClassName {
  propertyName: Type;
  methodName(param: Type): ReturnType;
}
```

### 使用場景

- 與 JavaScript 函式庫互動  
  若該函式庫沒有提供 TypeScript 的型別定義檔案，可以使用 declare class 來為其中的類別提供基本的型別宣告

- 定義全域類別或物件

- 避免 TypeScript 錯誤  
  當我們知道某些物件或類別存在但沒有實際的實現時，可以使用 declare class 來避免 TypeScript 在找不到這些類別或方法時報錯。

### 範例

假設有一個函式庫的 person 類別沒有 ts 的類別檢查，可以為他新增一個型別宣告檔案 `my-library.d.ts`
這樣 ts 依然可以正常檢查 person 類別的型別

```js
// my-library.js
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  sayHello() {
    console.log(`Hello, my name is ${this.name}.`);
  }
}

export { Person };
```

```js
// my-library.d.ts
declare class Person {
  name: string;
  age: number;

  constructor(name: string, age: number);
  sayHello(): void;
}
```

```js
// main.ts
const john = new Person("John Doe", 30);
john.sayHello(); // 輸出: Hello, my name is John Doe.
```

## 總結

- interface：用於描述物件的結構，適合 OOP 編程，支援擴展和合併。
- type：提供類型別名，適合更靈活和複雜的類型，如聯合和交叉類型。
- class：用於定義物件的藍圖和實現。
- declare class：宣告外部類別，通常用於聲明文件。
- enum：定義具名常量集合
