const User = require("../models/userModel");
const clearImage = require("../utils/clearImg");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const thumb = req.file;

  User.findOne({ where: { email: email } })
    .then((userDoc) => {
      if (userDoc) {
        const error = new Error("Email already taken. Please try another one.");
        error.statusCode = 422;
        throw error;
      }
      return bcrypt
        .hash(password, 12)
        .then((hashedPwd) => {
          return User.create({
            name: name,
            email: email,
            password: hashedPwd,
            thumbnail: thumb ? thumb.filename : null,
          });
        })
        .then((result) => {
          res.status(201).json({
            message: "User created successfully",
            result: result,
          });
        });
    })
    .catch((error) => {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next(error);
    });
};

exports.login = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  let expiryTime = "72";
  let loadedUser;
  User.findOne({ where: { email: email } })
    .then((user) => {
      if (!user) {
        const error = new Error("No user found!");
        error.statusCode = 404;
        throw error;
      }
      const { id, name, email, role } = user;
      loadedUser = { id, name, email, role };
      return bcrypt.compare(password, user.password);
    })
    .then((doMatch) => {
      if (!doMatch) {
        const error = new Error("Password does not match.");
        error.statusCode = 422;
        throw error;
      }
      const token = jwt.sign(
        {
          userID: loadedUser.id,
          role: loadedUser.role,
        },
        process.env.JWT_SECRET,
        { expiresIn: expiryTime + "h" }
      );
      res.status(200).json({
        token: token,
        expiresIn: expiryTime,
        user: loadedUser,
        message: "Successfully logged in!",
      });
    })
    .catch((error) => {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next(error);
    });
};

// get all users for admin

exports.getAllUsers = (req, res, next) => {
  User.findAll({ order: [["id", "DESC"]] })
    .then((users) => {
      res.status(200).json({
        users: users,
      });
    })
    .catch((error) => {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next(error);
    });
};
// getOneUser

exports.getOneUser = (req, res, next) => {
  const id = req.params.id;

  if (req.userID != id) {
    const error = new Error("User does not match.");
    error.statusCode = 400;
    throw error;
  }

  User.findOne({ where: { id: id } })
    .then((user) => {
      if (!user) {
        const error = new Error("No user found");
        error.statusCode = 400;
        throw error;
      }
      res.status(200).json({
        user: user,
      });
    })
    .catch((error) => {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next(error);
    });
};

exports.editProfile = (req, res, next) => {
  const id = req.params.id;
  const oldpassword = req.body.oldpassword;
  const newname = req.body.newname;
  const newpassword = req.body.newpassword;
  const newimage = req.file;

  let newHashedPassword;

  if (newpassword) {
    bcrypt
      .hash(newpassword, 12)
      .then((hwpd) => {
        newHashedPassword = hwpd;
      })
      .catch((error) => {
        if (!error.statusCode) {
          error.statusCode = 500;
        }
        next(error);
      });
  }

  User.findOne({ where: { id: id } })
    .then((user) => {
      if (!user) {
        const error = new Error("No user found");
        error.statusCode = 400;
        throw error;
      }
      return bcrypt.compare(oldpassword, user.password);
    })
    .then((doMatch) => {
      if (!doMatch) {
        const error = new Error("Password does not match.");
        error.statusCode = 422;
        throw error;
      }
      User.findOne({ where: { id: id } })
        .then((cng) => {
          cng.name = newname;
          if (newpassword) {
            cng.password = newHashedPassword;
          }
          if (newimage) {
            clearImage(cng.thumbnail);
            cng.thumbnail = newimage.filename;
          }
          cng.save();
          res.status(200).json({
            message: "Profile Edit Successfull",
          });
        })
        .catch((error) => {
          if (!error.statusCode) {
            error.statusCode = 500;
          }
          next(error);
        });
    })
    .catch((error) => {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next(error);
    });
};

// setUserRole

exports.setUserRole = (req, res, next) => {
  const id = req.params.id;
  const newrole = req.body.newrole;

  User.findOne({ where: { id: id } })
    .then((user) => {
      user.role = newrole;
      user.save();
      res.status(200).json({
        message: "Role Edit Successfull",
      });
    })
    .catch((error) => {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next(error);
    });
};
// deleteUser

exports.deleteUser = (req, res, next) => {
  const id = req.params.id;

  User.findOne({ where: { id: id } })
    .then((user) => {
      if(user.thumbnail){
        clearImage(user.thumbnail)
      }
      user.destroy();
      res.status(200).json({
        message: "User delete Successfull",
      });
    })
    .catch((error) => {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next(error);
    });
};
