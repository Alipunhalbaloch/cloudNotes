const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require("../middleware/fetchuser");
const JWT_SECRET="Aliisgoodboy$";



// Route:1 create a user using :POST "/api/auth/createuser".no login required

      router.post(
          "/createuser",
                [
                body("name", "enter valid name").isLength({ min: 3 }),
                body("email", "entr a valid emal").isEmail(),
                body("password", "password must be 5 characters").isLength({ min: 5 }),
              ],
                async (req, res) => {
// if there are error .return bad request and the error
                  let success=false;
        const errors = validationResult(req);
          if (!errors.isEmpty()) {
          return res.status(400).json({success, errors: errors.array() });
          }
          
          try {
//check wheather email already exists

            let user = await User.findOne({ email: req.body.email });
              if (user) {
              return res.status(400).json({success, error: "sorry user email already exists" });
                        }
// create a new user

        const salt= await bcrypt.genSalt(10);
         const secPassword= await bcrypt.hash(req.body.password, salt)
        user = await User.create({
                                  name: req.body.name,
                                  email: req.body.email,
                                  password: secPassword,
                                });

                const data={
                    user:{id:user.id}
                          }    

              const Authtoken=jwt.sign(data, JWT_SECRET );
                success=true;
                  res.json({success,Authtoken});
  //catch errors here
                  } catch (error) {
                    console.error(error.message);
                      res.status(500).send("Internal server error");
                              } 
                          }
                      );



// Route:2 Authenticate user :POST "/api/auth/createuser".no login required

      router.post(
        "/login",
                  [
                    body("email", "entr a valid emal").isEmail(),
                    body("password", "password cannt be blank").exists(),
                  ],
                      async (req, res) => {
                          let  success=false;
// if there are error .return bad request and the error
              const errors = validationResult(req);
                          if (!errors.isEmpty()) {
                            return res.status(400).json({ errors: errors.array() });
                          }

                    const {email,password}= req.body;
              try {
                      let user= await User.findOne({email});
                        if(!user){
                          success=false
                          return res.status(400).json({error:'please try to login with correct credentials'})
                        }


                const passwordCompare= await bcrypt.compare(password, user.password);
                          if(!passwordCompare){
                            success=false
                            return res.status(400).json({success,error:'please try to login with correct credentials'})
                          }
                const data={
                  user:{id:user.id}
                          }
                const Authtoken=jwt.sign(data, JWT_SECRET );
                 success= true;
                 res.json({success,Authtoken});


              }catch (error) {
                console.error(error.message);
                res.status(500).send("Internal server error")
              }

        })

   // Route:3 Get loggedin data using :POST "/api/auth/getuser".login required     


   router.post(
    "/getuser",fetchuser,async (req, res) => {
                  try {
                     userId = req.user.id;
                     const user=await User.findById(userId).select("-password")
                     res.send(user);

                      

                    }catch (error) {
                      console.error(error.message);
                      res.status(500).send("Internal server error")
                    }




                  })










module.exports = router;
