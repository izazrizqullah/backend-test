require("dotenv").config();
const express = require("express");
const router = express.Router();
const User = require("../models/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

router.post("/register", async (req, res, next) => {
  const findUser = await User.findOne({ username: req.body.username });

  if (findUser) {
    return res.status(409).json({
      message: "Username sudah digunakan",
    });
  }

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    username: req.body.username,
    password: hashPassword,
  });

  try {
    const createUser = await user.save();

    return res.status(200).json({
      createUser,
    });
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  const user = await User.findOne({ username: req.body.username });

  if (!user)
    return res.status(400).json({
      message: "Username salah",
    });

  const validPassword = await bcrypt.compare(req.body.password, user.password);

  if (!validPassword) {
    return res.status(400).json({
      message: "Password salah",
    });
  }

  const token = jwt.sign({ _id: user._id }, JWT_SECRET);
  return res.status(200).header("auth-token", token).json({
    message: "Berhasil login",
    token: token,
  });
});

module.exports = router;
