const { v4: uuid } = require("uuid");
const { validationResult } = require("express-validator");
const mongoose = require("mongoose");

const HttpError = require("../models/http-error");
const getCoordsForAddress = require("../util/location");
const Place = require("../models/Place");
const User = require("../models/User");

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

const getPlaceById = async (req, res, next) => {
  const placeId = req.params.pid; // { pid: 'p1' }

  let place;
  try {
    place = await Place.findById(placeId);
  } catch (err) {
    const error = new HttpError("Something went wrong, could not find a place", 500);
    return next(error);
  }

  if (!place) {
    const error = new HttpError("Could not find a place for the provided id.", 404);
    return next(error);
  }

  res.json({ place: place.toObject({ getters: true }) }); // { getters: true } to add `id` property to the created object
};

const getPlacesByUserId = async (req, res, next) => {
  const userId = req.params.uid;

  let places;
  try {
    places = await Place.find({ creatorId: userId });
  } catch (err) {
    const error = new HttpError("Fetching places failed, please try again later", 500);
    return next(error);
  }

  if (!places || places.length === 0) {
    return next(new HttpError("Could not find places for the provided id.", 404));
  }

  res.json({ places: places.map((place) => place.toObject({ getters: true })) });
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

  let user;
  try {
    user = await User.findById(creatorId);
  } catch (err) {
    const error = new HttpError("Creating place failed, please try again", 500);
    return next(error);
  }

  if (!user) {
    const error = new HttpError("Could not find user for provided id.", 404);
    return next(error);
  }

  console.log(user);

  try {
    const sess = await mongoose.startSession(); // If the collection is not created on atlas, we have to create it manually
    sess.startTransaction();
    await createdPlace.save({ session: sess });
    user.places.push(createdPlace);
    await user.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError("Creating place failed, please try again", 500);
    return next(error);
  }

  res.status(201).json({ place: createdPlace });
};

const updatePlace = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(new HttpError("Invalid inputs passed, please check your data.", 422));
  }

  const { title, description } = req.body;
  const placeId = req.params.pid;

  let updatedPlace;
  try {
    updatedPlace = await Place.findById(placeId);
  } catch (err) {
    const error = new HttpError("Something went wrong, could not update place.", 500);
    return next(error);
  }

  updatedPlace.title = title;
  updatedPlace.description = description;

  try {
    await updatedPlace.save();
  } catch (err) {
    const error = new HttpError("Something went wrong, could not update place.", 500);
    return next(error);
  }

  res.status(200).json({ place: updatedPlace.toObject({ getters: true }) });
};

const deletePlace = async (req, res, next) => {
  const placeId = req.params.pid;

  let place;
  try {
    place = await Place.findById(placeId).populate("creatorId");
  } catch (err) {
    const error = new HttpError("Something went wrong, could not delete place.", 500);
    return next(error);
  }

  if (!place) {
    const error = new HttpError("Could not find place for this id.", 404);
    return next(error);
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await place.remove({ session: sess });
    place.creatorId.places.pull(place);
    await place.creatorId.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError("Something went wrong, could not delete place.", 500);
    return next(error);
  }

  res.status(200).json({ message: "Place deleted successfully." });
};

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;
