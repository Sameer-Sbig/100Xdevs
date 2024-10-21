// let x : number = 1;
// x = 100;
// console.log(x);


// function greet(firstname : string , lastname:string){
//     console.log("Hare Krishna  "  + firstname + " prabhuji");
// }
// greet("Sameer","Kurkure");


// function sum (a:number , b: number) : number{
//     return a+b;
// }

// const value = sum(4,4);
// console.log(value);


//code to check if the user is legal or not 
// INTERFACES
 
// interface User {
//     firstName :String,
//     lastName : String,
//     age:number,
//     email?:String // email is an optional argument
// }
// const isLegal =(user : User) :boolean =>{

//     if(user.age>18){

//         console.log("IsLegal")
//         return true;
//     }
//     else{
//         return false;
//     }
// }

// isLegal({
//     firstName: "Sameer",
//     lastName:"Kurkure",
//     age:24
// })



// classes implementing interfaces

interface Person {
    name:String,
    age:number,
    greet(phrase:String) : void
}


class Employee implements Person{
    name: string;
    age: number;
    constructor(n:string , a:number){
        this.name=n;
        this.age=a;
    }

    greet(phrase: String): void {
        // throw new Error("Method not implemented.");
        console.log(`${phrase} ${this.name}`);
    }
   
    
}


//TYPES they are similar to interfaces but they cannot be implemented by classes like interfaces 


//EG we want to print id of the user whose datatype can be either number or a string
 type id = string | number;
