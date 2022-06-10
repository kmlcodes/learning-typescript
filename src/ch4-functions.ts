/*-------------------------------------------------------------------- 
 Functions
-------------------------------------------------------------------- */

//we usually annote function parameters explicitly
function add(a: number, b: number) { }

// Return type is usually inferred but can be annoted explicitly
function subtract(a: number, b: number): number { return a - b }

// five ways to declare functions
function square(a: number) { return a * a } //named function
let double = function (a: number) { return 2 * a } //function expression
let perimeter_square = (length: number) => { return 4 * length } //arrow function expression
let greet = (name: string) => "hello " + name //shorthand arrow expression
let alert = new Function('msg', 'return "alert! msg is" + msg ') //function constructor

//optional parameters
function displayInfo1(id: number, username: string, email?: string) {
    console.log("User ID: " + id + " Username: " + username + " Email: " + email || "Not available");
}
//optional parameters
function displayInfo2(id: number, username: string, email = "Not available") {
    console.log("User ID: " + id + " Username: " + username + " Email: " + email || "Not available");
}
// default parameter with explicit type annotation
type User = {
    id?: number,
    name?: string
}
function show_msg(msg: string, from: User = {}) { }

// variadic functions (i.e taking variable number of arguments)

// traditional way of doing this is using arguments object  but it is unsafe 
function unsafeVariadicSum(): number {
    return Array.from(arguments).reduce((total, n) => total + n, 0) // total and n are 'any' type
}

// type safe variadic functions using rest parameters
function safeVaraidicSum(...nums: number[]): number {
    return nums.reduce((total, n) => total + n, 0) // total and n are 'number' type as expected
}

// ways to invoke(or call) a function
add(1, 2) // using parenthesis
add.apply(null, [1, 2]) //apply binds to this (i.e null in this example) and spreads second argument over function's parameters
add.call(null, 1, 2) //call is same as apply but applies arguments instead of spreading
add.bind(null, 1, 2)() // bind is similar but it return function instead of invoking so we invoked here using ()

// 'this' parameter is defined for every function in javascript unlike others where it live as method on classes
// it has different value depending how the functions are called
let myObj = {
    give() {
        return this
    }
}
myObj.give() // it gives object myObj in the body of give()

//if we reassign the give() before calling it, the result will change
let give = myObj.give
give() // now it is undefined

// In typesript, 'this' is reserved keyword that indicates first parameter and it isn't treated like other parameters 
function showMonth(this: Date) {
    return this.getMonth
}
showMonth.call(new Date) // now we need to bind Date type to 'this' while calling

// generator functions are used to generate bunch of values and they are lazy
// i.e only generate value when the consumer asks for it.

function* createFibGenerator() { //function* means it is generator
    let a = 0;
    let b = 1;
    while (true) { // it generates values forever
        yield a; // yield gives value to the consumer when it asks by calling next
        [a, b] = [b, a + b] //assign a -> b and b -> a + b 
    }
}
let fGen = createFibGenerator() // return type of generator is IterableIterator<number>
fGen.next() //{value: 0 , done:false}
fGen.next() //{value: 1 , done:false}
fGen.next() //{value: 1 , done:false}
fGen.next() //{value: 2 , done:false}

// Iterators are ways to consume values produced by generators
//  Iterable -> any object with propery Symbol.iterator, whose value is function that returns an iterator
// Iterator -> any object that defines the method called next which returns object with properties value and done

// we can manually define and iterator or iterable by creating object (or class)
// that implemnts next or Symbol.iterator respectively

//manually defined iterator
let odds = {
    *[Symbol.iterator]() {     //generator function 
        for (let i = 1; i <= 10; i++) {
            yield i
        }
    }
}
//odds is an iterable and calling the generator function odds[Symbol.iterator]() returns iterable iterator
// we can use built-in iterators for common collection types -> Array, Map , Set , String etc.