const express = require("express");
const zod = require("zod");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());
const jwtPassword="123456";

const ALL_USERS = [
    {
        username:"sameerkurkure22@gmail.com",
        password:"1234",
        name:"Sameer Kurkure"
    },
    {
        username:"sameerkurkure10@gmail.com",
        password:"1234567",
        name:"Sameer Kurkure 10"
    },
    {
        username:"sameerkurkure05@gmail.com",
        password:"1234",
        name:"Sameer Kurkure 05"
    }
]

function userExits(username,password)  {

    // logic to check if the user exists 
    const userExits = false;
    for(let i=0; i<ALL_USERS.length;i++){
        if(ALL_USERS[i].username == username && ALL_USERS[i].password==password){
            userExits=true;
        }
    }
    return userExits;


}

app.post("/signup" , (req ,res) => {
    const username = req.body.username;
    const password = req.body.password;

    if(!userExits(username,password)){
        return res.status(403).json({
            msg:"User does not exits in our memory"
        })
    }

    const token = jwt.sign({username:username}, "sssssshhhh");
    return res.json({
        token,
    });
});


app.get("/login" , (req,res) =>{
    const token = req.headers.authorization;
    try {
        const decoded = jwt.verify(token, jwtPassword);
        const username = decoded.username;

    } catch (error) {
        return res.status(403).json({
            msg:"Invalid Token",
        })
        
    } 

})


app.listen(3000, ()=> {
    console.log("The server is running on port 3000");
})