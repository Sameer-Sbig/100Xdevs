const express = require("express");
const zod = require("zod");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
// remember we have entered the db name in last of the link
mongoose
  .connect("mongodb+srv://sameerkurkure22:Pranita123@100xdevs.lcyis.mongodb.net/user_app", {})
  .then(() => console.log("Connected to  user app database"))
  .catch((err) => console.error(err));
// now describing the model

const User = mongoose.model('Users' , {name:String , email:String , password:String});

const user = new User({name:"Sameer Kurkure 22" , email:"sameerkurkure22@gmail.com" , password:"pranita123"});
// user.save().then(console.log("New User added to db"));
const app = express();
app.use(express.json());
const jwtPassword = "123456";

app.post("/signup", function(req, res) {
    const username = req.body.userName;
    const email = req.body.email;
    const password = req.body.password;

   let userExists= User.findOne({email:email});
   if(userExists){
    return res.status(400).json({
        "message": "User already exists"
    })
   }
    const user = new User({
      name: username,
      email: email,
      password: password
    });
  
    user.save()
      .then(() => {
        console.log("New user added to db with name " + username);
        res.send({
          msg: "New User added to db"
        });
      })
      .catch((error) => {
        console.log(error);
        res.status(403).json({
          msg: "You are missing something"
        });
      });
  });
  
  app.post("/login", async function(req, res) {
    const email = req.body.email;
    const password = req.body.password;
  
    try {
      const user = await User.findOne({ email: email });
  
      if (!user) {
        return res.status(400).json({
          msg: "User not found"
        });
      }
  
      if (user.password !== password) {
        return res.status(401).json({
          msg: "Incorrect password"
        });
      }
  
      // Create a token that expires in 10 seconds
      const token = jwt.sign(
        { userId: user._id, email: user.email },
        'your_secret_key',
        { expiresIn: '10s' }
      );
  
      res.status(200).json({
        msg: "Login successful",
        token: token
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        msg: "Internal Server Error"
      });
    }
  });
  



app.listen(3000, () => {
  console.log("The server is running on port 3000");
});
