const HttpError = require("../models/http-error");

const DUMMY_USERS = [
  {
    id: "u1",
    name: "Wadeea Kiwan",
    image:
      "https://firebasestorage.googleapis.com/v0/b/socialape-ad195.appspot.com/o/995518179.jpg?alt=media",
    placeCount: 2
  },
  {
    id: "u2",
    name: "Max Bla",
    image:
      "https://firebasestorage.googleapis.com/v0/b/socialape-ad195.appspot.com/o/480532018.jpg?alt=media",
    placeCount: 1
  }
];

const getUserById = (req, res, next) => {
  const userId = req.params.uid;
  const user = DUMMY_USERS.find((u) => u.id === userId);

  if (!user) {
    throw new HttpError("Could not find a user for the provided id.", 404);
  }

  res.json({ user });
};

exports.getUserById = getUserById;
