const db = require("../models");
const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");



exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
  };
  
  exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");
  };
  
  exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
  };
  
  exports.moderatorBoard = (req, res) => {
    res.status(200).send("Moderator Content.");
  };


  exports.createUser = (req, res)=> {
  

    db.sequelize
      .sync()
      .then(() => {
        db.user
          .create({
            username: req.body.username,
            email:req.body.email,
            password:req.body.password,
          })
          .then((result) => {
            res.send(result);
          })
          .catch((error) => {
            console.error("Failed to create a new record : ", error);
            res.send(error);
          });
      })
      .catch((error) => {
        console.error("Unable to create table : ", error);
          res.send(error);
      });
  }

  exports.loginUser = (req, res)=> {
    db.sequelize
      .sync()
      .then(() => {
      

      db.user.findOne({
      where : {
        email : req.body.email
      }
    }).then(async result => {
  

      if(result.password == req.body.password){
   
      const token  =   jwt.sign(req.body,  config.secret)
        res.send({
          token: token,
          'data' : result
        });
      }
     
      
    else   res.send('email or password is wrong');

    }).catch((error) => {
        console.error('Failed to retrieve data : ', error);
    });
      })
      .catch((error) => {
        console.error("Unable to create table : ", error);
          res.send(error);
      });
  }