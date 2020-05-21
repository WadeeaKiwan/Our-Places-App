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

const getUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find({}, "-password"); // await User.find({}, 'email name');
  } catch (err) {
    const error = new HttpError("Fetching users failed, please try again later", 500);
    return next(error);
  }

  if (!users || users.length === 0) {
    return next(new HttpError("Could not find users", 404));
  }

  res.json({ users: users.map((user) => user.toObject({ getters: true })) });
};

const signup = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(new HttpError("Invalid inputs passed, please check your data.", 422));
  }

  const { name, email, password, places } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email });
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

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    const error = new HttpError("Logging in failed, please try again later", 500);
    return next(error);
  }

  if (!existingUser || existingUser.password !== password) {
    const error = new HttpError("Invalid credetials, could not log you in", 401);
    return next(error);
  }

  res.status(200).json({ message: "Logged in!" });
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
