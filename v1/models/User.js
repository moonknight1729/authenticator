const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { SECRET_ACCESS_TOKEN } = require("../config");

const Schema = new mongoose.Schema({
  firstname: {
    type: String,
  },
  lastname: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
});

Schema.pre("save", function (next) {
  const user = this;

  if (!user.isModified("password")) return next();
  else {
    const password = user.password;
    bcrypt.hash(password, 10, function (err, hash) {
      next();
    });
  }
});

Schema.methods.generateAccessJWT = () => {
  const payload = { id: this._id };
  return jwt.sign(payload, SECRET_ACCESS_TOKEN, {
    expiresIn: "20m",
  });
};

module.exports = mongoose.model("users", Schema);
