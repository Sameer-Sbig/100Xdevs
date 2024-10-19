// here we have pasted logic to check inside code itself if user exists



const ALL_USERS = [
    {
      username: "sameerkurkure22@gmail.com",
      password: "1234",
      name: "Sameer Kurkure",
    },
    {
      username: "sameerkurkure10@gmail.com",
      password: "1234567",
      name: "Sameer Kurkure 10",
    },
    {
      username: "sameerkurkure05@gmail.com",
      password: "1234",
      name: "Sameer Kurkure 05",
    },
  ];
  
  function userExits(username, password) {
    // logic to check if the user exists
    let userExits = false;
    for (let i = 0; i < ALL_USERS.length; i++) {
      if (
        ALL_USERS[i].username == username &&
        ALL_USERS[i].password == password
      ) {
        userExits = true;
      }
    }
    return userExits;
  }
  
  app.post("/signin", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
  
    if (!userExits(username, password)) {
      return res.status(403).json({
        msg: "User does not exits in our memory",
      });
    }
  
    const token = jwt.sign({ username: username }, jwtPassword);
    return res.json({
      token,
    });
  });
  
  app.get("/users", (req, res) => {
    const token = req.headers.authorization;
    try {
      const decoded = jwt.verify(token, jwtPassword);
      const username = decoded.username;
      // returning the list of users
      if (decoded) {
        res.status(200).json({
          // this will return information of all users except the one who is trying to fetch this list
          message: ALL_USERS.filter((value) => {
            if (value.username == username) {
              return false;
            } else {
              return true;
            }
          }),
        });
      }
    } catch (error) {
      return res.status(403).json({
        msg: "Invalid Token",
      });
    }
  });