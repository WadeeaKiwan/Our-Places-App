const { v4: uuid } = require("uuid");
const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");
const getCoordsForAddress = require("../util/location");
const Place = require("../models/Place");

let DUMMY_PLACES = [
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

const getPlaceById = (req, res, next) => {
  const placeId = req.params.pid; // { pid: 'p1' }

  const place = DUMMY_PLACES.find((p) => p.id === placeId);

  if (!place) {
    throw new HttpError("Could not find a place for the provided id.", 404);
  }

  res.json({ place }); // => { place } => { place: place }
};

const getPlacesByUserId = (req, res, next) => {
  const userId = req.params.uid;
  const places = DUMMY_PLACES.filter((p) => p.creatorId === userId);

  if (!places || places.length === 0) {
    return next(new HttpError("Could not find places for the provided id.", 404));
  }

  res.json({ places });
};

const createPlace = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(new HttpError("Invalid inputs passed, please check your data.", 422)); // throw will not work with asynchronous code
  }

  const { title, description, address, creatorId } = req.body;

  let location;
  try {
    location = await getCoordsForAddress(address);
  } catch (error) {
    return next(error);
  }

  const createdPlace = new Place({
    title,
    description,
    address,
    location,
    imageUrl:
      "https://firebasestorage.googleapis.com/v0/b/socialape-ad195.appspot.com/o/matthias-schroder-KoBCaTPydqs-unsplash.jpg?alt=media",
    creatorId
  });

  try {
    await createdPlace.save();
  } catch (err) {
    const error = new HttpError("Creating place failed, please try again", 500);
    return next(error);
  }

  res.status(201).json({ place: createdPlace });
};

const updatePlace = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new HttpError("Invalid inputs passed, please check your data.", 422);
  }

  const { title, description } = req.body;
  const placeId = req.params.pid;

  const updatedPlace = { ...DUMMY_PLACES.find((p) => p.id === placeId) };
  const placeIndex = DUMMY_PLACES.findIndex((p) => p.id === placeId);
  updatedPlace.title = title;
  updatedPlace.description = description;

  DUMMY_PLACES[placeIndex] = updatedPlace;

  res.status(200).json({ place: updatedPlace });
};

const deletePlace = (req, res, next) => {
  const placeId = req.params.pid;

  if (!DUMMY_PLACES.find((p) => p.id === placeId)) {
    throw new HttpError("Could not find a place for that id.", 404);
  }

  DUMMY_PLACES = DUMMY_PLACES.filter((p) => p.id !== placeId);

  res.status(200).json({ message: "Place deleted successfully." });
};

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;
