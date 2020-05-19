const express = require("express");

const router = express.Router();

const DUMMY_PLACES = [
  {
    id: "p1",
    imageUrl:
      "https://firebasestorage.googleapis.com/v0/b/socialape-ad195.appspot.com/o/matthias-schroder-KoBCaTPydqs-unsplash.jpg?alt=media",
    title: "Strada Statale Porrettana",
    description: "Strada Statale Porrettana",
    address: "Strada Statale Porrettana, 240, 40135 Bologna BO, Italy, Bologna",
    creatorId: "u1",
    location: {
      lat: 44.4896115,
      lng: 11.3129859
    }
  },
  {
    id: "p2",
    imageUrl:
      "https://firebasestorage.googleapis.com/v0/b/socialape-ad195.appspot.com/o/filip-mroz-VH7NuUbj104-unsplash.jpg?alt=media",
    title: "One Queen Street East",
    description: "One Queen Street East",
    address: "One Queen Street East, Toronto, Canada",
    creatorId: "u1",
    location: {
      lat: 43.6672424,
      lng: -79.395718
    }
  },
  {
    id: "p3",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/7/7c/Empire_State_Building%2C_New_York%2C_NY.jpg",
    title: "Empire State Building",
    description: "One of the most sky scrapers in the world!",
    address: "20 W 34th St, New York, NY 10001, United States",
    creatorId: "u2",
    location: {
      lat: 40.7484405,
      lng: -73.9856644
    }
  }
];

router.get("/:pid", (req, res, next) => {
  const placeId = req.params.pid; // { pid: 'p1' }
  const place = DUMMY_PLACES.find((p) => p.id === placeId);

  if (!place) {
    const error = new Error("Could not a place for the provided id.");
    error.code = 404;
    throw error;
  }

  res.json({ place }); // => { place } => { place: place }
});

router.get("/user/:uid", (req, res, next) => {
  const userId = req.params.uid;
  const place = DUMMY_PLACES.find((p) => p.creatorId === userId);

  if (!place) {
    const error = new Error("Could not a place for the provided id.");
    error.code = 404;
    return next(error);
  }

  res.json({ place });
});

module.exports = router;
