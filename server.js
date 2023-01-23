const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);

// set port, listen for requests

var corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true })); 


app.get("/", (req, res)=> {
  res.send("Hello from server data changed");
})

// simple route
app.get("/data", (req, res) => {
  console.log(req.body);
  res.json({ message: "Welcome to my application.", data : req.body });
});




// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

const db = require("./app/models");
// const Role = db.role;

// db.sequelize.sync({ force: false }).then(() => {
//   console.log("Drop and Resync Db");
//   // initial();
// });

function initial() {
  Role.create({
    id: 1,
    name: "user",
  });

  Role.create({
    id: 2,
    name: "moderator",
  });

  Role.create({
    id: 3,
    name: "admin",
  });
}

// db.sequelize.sync();
