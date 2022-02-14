const bcrypt = require("bcryptjs");

const User = require("../models/userModel");

exports.signUp = async (req, res) => {
  const { username, password } = req.body;

  try {
    const hashpassword = await bcrypt.hash(password, 12);

    const newUser = await User.create({
      username,
      password: hashpassword,
    });

    req.session.user = newUser;

    res.status(201).json({
      status: "Success",
      data: {
        user: newUser,
      },
    });
  } catch (e) {
    res.status(400).json({
      status: "Fail",
    });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({
        status: "Fail",
        message: "user not found",
      });
    }

    const isCorrect = await bcrypt.compare(password, user.password);

    console.log(`isCorrect = ${isCorrect}`);

    if (isCorrect) {
      req.session.user = user;

      res.status(200).json({
        status: "Success",
      });
    } else {
      res.status(400).json({
        status: "Fail",
        message: "Incorrect username or passowrd",
      });
    }
  } catch (e) {
    res.status(400).json({
      status: "Fail",
    });
  }
};
