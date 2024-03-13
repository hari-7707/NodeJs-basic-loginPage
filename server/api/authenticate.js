const express = require("express");
const router = express.Router();
const UserModel = require("./models/users");
const mongoose = require("mongoose");

router.post("/login", (req, res, next) => {
  console.log(req.body);
  const id = req.body.emailId;
  UserModel.findOne({ emailId: id })
    .then((result) => {
      if (result.password === req.body.password) {
        res.status(200).json({
          user: result,
        });
      } else {
        res.status(401).json({ error: "Invalid Credentials" });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

router.post("/signup", (req, res, next) => {
  const user = new UserModel({
    emailId: req.body.emailId,
    organizationType: req.body.organizationType,
    organizationName: req.body.organizationName,
    pancardNumber: req.body.pancardNumber,
    phoneNumber: req.body.phoneNumber,
    password: req.body.password,
  });
  /*UserModel.findOne({ emailId: user.emailId })
    .then((result) => {
      res.status(409).json({
        error:
          "User with the given email id is already present. Please try to sign in or use other email id to create",
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });*/
  user
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "User created",
        user: user,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

module.exports = router;
