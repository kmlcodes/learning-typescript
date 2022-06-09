/*-------------------------------------------------------------------- 
This single file contains the codes written to practice Typescript.
The material used to learn is a book named "Programming
TypeScript"  by Boris Cherny.
 Each chapter is divided into sections indicated by comment block. 
-------------------------------------------------------------------- */


/*-------------------------------------------------------------------- 
TYPES
-------------------------------------------------------------------- */
//any
let x: any = 5;
let y: any = 'hello';
let z = x + y;

//unknown
let u: unknown = 34;

//boolean
let f1 = true; //implicit
let f2: boolean = false; //explicit
const f3 = true // specific boolean (type is true)
let f5: true = true // type literal (type is true)

//number
let n1 = 5;
let n2: number = 6.5;
let n3: 3.14 = 3.14;
let n4 = 123_456_78; //using _ to separate
const n5 = 64; //type is 64

//bigint (ends with n) - only available above ES2020
// let b1 = 4384309456n; //implicit
// let b2: bigint = 61366823482348n; //explicit 
// let b3: 6666n = 6666n // specific value type

//string
let name = "Ram";
let planet: String = "Mars";
let owner: 'admin' = 'admin';

//symbol
let s1 = Symbol('abc');
let s2: symbol = Symbol('abc');
const s3 = Symbol('xyz'); //type is xyz

// objects
let obj1: object = { x: 5, y: 3 } //explicit (bad)
let obj2 = { x: 5, y: 3 } //implicit (its good to let ts implicitly infer object type whenever it can)

let user1: { name: string, address: string } = { name: "Kumar", address: "Pokhara" }; //object literal

class Book { constructor(public name: string, isbn: number) { } }; //class
let nepali = new Book("Nepali", 1234567890987);

let obj3: {
    a: number, //number
    b?: string, // string or undefined (i.e optional property)
    [key: number]: boolean // It means this object might have any no. of numeric properties with boolean value   
}
let RoomIds: {
    [student_name: string]: number // any key name can be used
} = {
    "Ajay": 22,
    "Bibek": 15
}

let obj4: {
    readonly id: 100, //read-only value
    total: number
}
//empty object types (always try to avoid)
let obj5 = {};
let obj6: Object; //same as above

//every type is assignable to empty object as shown below
obj5 = []
obj5 = { id: 5 }
obj5 = 33

//type aliasing
type Age = number; //age is alias for number
type Person = {
    name: string,
    age: Age
}
let my_age: Age = 50;
my_age = 20; //number can be assigned to Age type

// Union and Intersection of types
type t1 = {
    c: number,
    a: number,
    r: number
}
type t2 = {
    b: number,
    a: number,
    t: number
}
type All = t1 | t2; // union -> { c, a , r, b,t}
type Common = t1 & t2; // intersection -> {a}

function isTrueOrNull(isTrue: boolean) { //return type is boolean or null 
    if (isTrue) return true;
    return null;
}

//arrays (denoted as T[] or Array<T>)
let evens = [2, 4, 6, 8]; // number[]
let guitarists = ['steve vai', 'eddie van halen']; // string[]
let arr1 = [23, 'as', 'ok', 78]; // (number | string)[]
const arr2 = ['nepal', 2079]; // (number | string)[]

let zip_codes: number[] = []; //number[] declared explicitly (can only store homogeneous types i.e only number in this case)
let arr3 = []; // any[] (can store any type of values)
arr3.push("id"); // string[]
arr3.push(100);  // (string | number)[]

// Always try to store same types in an array otherwise we need to perform extra type checks as show below
let datas = ['hi', 2, 3, 'bye'];
datas.map(x => {
    if (typeof (x) === 'number') {
        return x * x;
    }
    return x.toUpperCase();
})

// tuples (also uses [] like arrays but with fixed length)
let std1: [number, string] = [100, "rohit"];
let co_ordinate: [number, number] = [30.15, 67.88];
let members: [string, string, string?] = ["Ramesh", "Hari"]//optional element
let points: [number, number, number?][] = [[1, 2], [1, 3], [1, 3, 5]]; // tuples allowing 2d array and optional 3d array
let children: [string, ...string[]] = ["loli", "joli", "goli"] // should have at least one string

//readonly arrays and tuples (short form)
let r1: readonly number[];
let t1: readonly [number, string, boolean];

//readonly arrays (longer form) -> all forms given below are same
type StrReadOnly1 = readonly string[];
type StrReadOnly2 = ReadonlyArray<string>
type StrReadOnly3 = Readonly<string[]>

//readonly tuples  -> all forms given below are same
type TUPReadOnly1 = readonly [boolean, string];
type TUPReadOnly2 = Readonly<[boolean, string]>

// null ,undefined,void and never
/*
 undefined -> hasn't been defined yet
 null -> absence of something
 void ->return type of function that explicitly doesn't return anything (eg. console.log)
 never -> return type of function that never returns at all (eg. function that throws exception or runs forever)
 */

// enums
enum Gender {
    Male,
    Female,
    Unspecified
}

enum Option { // explicit values
    Read = 1,
    Write = 2,
    Seek = 3,
}
//using enum values
let opt1 = Option.Read;
let opt2 = Option['Seek']

// splitting enums
enum Action {
    Go = 1,
    Come,
    Wait
}
enum Action {
    Rest,
    Show
}

// enums can use computed values 
enum Poisa {
    Pach = 5,
    Hajar = 700 + 300,
}
//enum with mixed values
enum Poisa2 {
    Pach = 5,
    Hajar = 500,
    Pachatar = 'LXXV'
}

//safe enum (prevents accessing as Action[0])
const enum Color {
    red = 'red',
    black = '#ffffff',
    pink = 0xc10050
}
 // Note:- always use string valued enums and
 // prevent const enum as they behave a lot
 //like regular js object