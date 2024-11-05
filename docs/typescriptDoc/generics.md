# 泛型(Generics)

泛型允許開發者在定義函式、類別或介面時，`不必預先指定具體型別`，而是可以使用一個「型別參數」來代表未來傳入的具體型別
泛型通常用於函式和類別中，為變數、屬性、參數和回傳值提供一種抽象的型別

通常以 T 表示（但可以用任何名稱），不先預設參數型別，而是在使用時傳入具體指定的型別，藉此增加彈性

## 函數中的應用

泛型讓函數在保持型別安全的同時更靈活，可以在調用時決定型別：

```js
function getArray<T>(items: T[]): T[] {
  return items;
}

const numArray = getArray < number > [1, 2, 3];
const strArray = getArray < string > ["a", "b", "c"];
```

## 泛型介面 interface

在介面中使用泛型，可以讓介面在不同型別下適用，這在設計資料結構（例如容器、API 回應）時非常有用：

```js
interface Container<T> {
  value: T;
}

const numberContainer: Container<number> = { value: 123 };
const stringContainer: Container<string> = { value: "Hello" };
```

## 泛型類別 class

類別也可以使用泛型，例如在集合、佇列等資料結構中，泛型讓類別能夠在不同型別下重複使用：

```js
class Box<T> {
  content: T;

  constructor(content: T) {
    this.content = content;
  }
}

const numberBox = new Box() < number > 123;
const stringBox = new Box() < string > "Hello";
```

## 函式多型 (函式重載)

```js
function pickOrCreate<T>(arr: T[], index: number, defaultValue: T): T {
  return arr[index] ?? defaultValue;
}

const numberArray = [1, 2, 3];
console.log(pickOrCreate(numberArray, 1, 0)); // 回傳 2
console.log(pickOrCreate(numberArray, 10, 0)); // 回傳 0

const stringArray = ["apple", "banana"];
console.log(pickOrCreate(stringArray, 0, "empty")); // 回傳 "apple"
console.log(pickOrCreate(stringArray, 10, "empty")); // 回傳 "empty"
```

## 泛型參數合併物件

```js
function mergeObjects<T, U>(obj1: T, obj2: U): T & U {
  return { ...obj1, ...obj2 };
}

const objA = { name: "Alice" };
const objB = { age: 30 };

const merged = mergeObjects(objA, objB);
console.log(merged); // { name: "Alice", age: 30 }
```

mergeObjects 函式接收兩個物件，分別使用泛型 T 和 U 來表示兩個不同的型別，並回傳它們的合併結果  
這樣，mergeObjects 可以合併任意型別的物件

## 泛型約束（Generic Constraints）

透過 `extends` 限制泛型參數的範例，指定泛型參數必須繼承某個型別或符合某個結構

### 意義

- 限制泛型範圍：讓程式碼使用更符合需求的型別，減少出錯的機會
- 提升型別安全性：讓 TypeScript 能夠檢查泛型參數是否符合所需屬性或結構
- 增強可讀性：有了泛型約束，可以讓程式碼意圖更明確

### 範例 1: 對數值型別的泛型約束

```js
interface HasLength {
  length: number;
}

function logLength<T extends HasLength>(item: T): void {
  console.log(item.length);
}

logLength("Hello");      // 正確，string 有 length
logLength([1, 2, 3]);    // 正確，array 有 length
// logLength(42);        // 錯誤，number 沒有 length 屬性
```

`T extends HasLength` 約束了 T 必須擁有 length 屬性，因此我們可以安全地訪問 item.length

### 範例 2: 對物件屬性的泛型約束

```js
function getProperty<T extends object, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const person = { name: "Alice", age: 25 };
const name = getProperty(person, "name"); // 正確，name 類型為 string
// const invalid = getProperty(person, "height"); // 錯誤，"height" 不存在於 person 中
```

`T extends object` 表示 `T` 必須是`物件型別`。
`K extends keyof T` 表示 `K` 必須是 `T 的屬性名稱`，確保我們傳入的 key 存在於 obj 中。

### 範例 3：多重泛型約束

```js
interface Person {
  name: string;
}

interface HasAge {
  age: number;
}

function greet<T extends Person & HasAge>(person: T): string {
  return `Hello, ${person.name}. You are ${person.age} years old.`;
}

const user = { name: "Bob", age: 30, city: "New York" };
greet(user); // 正確，user 擁有 name 和 age 屬性

```

## 泛型多參數

可以為泛型提供多個參數，這樣可以設計多型別的邏輯：

```js
function pair<T, U>(first: T, second: U): [T, U] {
  return [first, second];
}

const result = pair<number, string>(1, "one"); // [1, "one"]
```

## 泛型的好處

- 靈活性：可以適應多種型別，增強了程式碼的可重用性
- 型別安全：在保證型別一致性的前提下，避免了使用 any 可能引發的問題
- 可讀性與易於維護：讓程式碼更加清晰，型別的邏輯更明確

## T

最常用的`泛型標識符`，通常表示「Type」（型別），是一個佔位符，`表示任意的型別`
例如可以是任何型別，根據使用時指定。

```js
function identity<T>(value: T): T {
  return value;
}

console.log(identity < number > 42); // 輸出: 42
console.log(identity < string > "Hello"); // 輸出: "Hello"
```

::: tip
符號意義

```js
 function identity<宣告型別 T >(value: 傳入 value 是 T): 函式回傳的型別是 T {
  return value;
 }
```

:::

## K, V

K 和 V 通常用於定義具有鍵和值的物件型別  
K 表示「Key」（鍵），V 表示「Value」（值）  
這兩個標識符常見於泛型資料結構中，例如映射（Map）或字典（Dictionary）

```js
type KeyValuePair<K, V> = {
  key: K,
  value: V,
};

const pair1: KeyValuePair<string, number> = { key: "age", value: 30 };
const pair2: KeyValuePair<number, string> = { key: 1, value: "one" };

console.log(pair1); // 輸出: { key: "age", value: 30 }
console.log(pair2); // 輸出: { key: 1, value: "one" }
```

## 常用的泛型佔位符

::: tip
常用字母不是強制規定，而是一種`社群慣例`，通常用來表示泛型參數的用途，讓程式碼更具可讀性  
雖然可以自訂其他有意義的名稱，但遵循 code style 有助於其他開發者快速理解程式碼
:::

| 佔位符 | 含義與使用場合                               |
| ------ | -------------------------------------------- |
| `T`    | **Type**，代表任意類型，通常用於一般泛型參數 |
| `U`    | 第二個任意類型，通常與 `T` 搭配使用          |
| `K`    | **Key**，代表物件的鍵，常與 `keyof` 搭配     |
| `V`    | **Value**，代表物件的值，通常用於鍵值對中    |
| `E`    | **Element**，代表集合中的元素型別            |
| `R`    | **Return**，代表函式回傳值的型別             |
| `P`    | **Props**，表示屬性型別，常用於元件屬性      |
| `N`    | **Number**，在處理數字相關情境中使用         |
| `S`    | **State**，表示狀態型別，常見於狀態管理      |
