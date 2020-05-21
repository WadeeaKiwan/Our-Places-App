const { v4: uuid } = require("uuid");
const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");
const User = require("../models/User");

const DUMMY_USERS = [
  {
    id: "u1",
    name: "Wadeea Kiwan",
    email: "test@test.com",
    password: "testers"
  },
  {
    id: "u2",
    name: "Max Bla",
    email: "test2@test.com",
    password: "testers"
  }
];

const getUsers = (req, res, next) => {
  const users = DUMMY_USERS;

  if (!users || users.length === 0) {
    throw new HttpError("Could not find users", 404);
  }

  res.json({ users });
};

const signup = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(new HttpError("Invalid inputs passed, please check your data.", 422));
  }

  const { name, email, password, places } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError("Signing up failed, please try again later", 500);
    return next(error);
  }

  if (existingUser) {
    const error = new HttpError("User exists already, please login instead.", 422);
    return next(error);
  }

  const createdUser = new User({
    name,
    email,
    password,
    image:
      "https://firebasestorage.googleapis.com/v0/b/socialape-ad195.appspot.com/o/995518179.jpg?alt=media",
    places
  });

  try {
    await createdUser.save();
  } catch (err) {
    const error = new HttpError("Signing up failed, please try again", 500);
    return next(error);
  }

  res.status(201).json({ user: createdUser.toObject({ getters: true }) });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  const identifiedUser = DUMMY_USERS.find((u) => u.email === email);

  if (!identifiedUser || identifiedUser.password !== password) {
    throw new HttpError("Could not identify user, credentials seem to be wrong.", 401);
  }

  res.status(200).json({ message: "Logged in!" });
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
