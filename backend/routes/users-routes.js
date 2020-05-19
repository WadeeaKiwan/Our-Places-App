const express = require("express");

const router = express.Router();

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

router.get("/:uid", (req, res, next) => {
  const userId = req.params.uid;
  const user = DUMMY_USERS.find((u) => u.id === userId);

  res.json({ user });
});

module.exports = router;
