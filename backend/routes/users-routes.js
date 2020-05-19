const express = require("express");

const { getUserById } = require("../controllers/users-controller");

const router = express.Router();

router.get("/:uid", getUserById);

module.exports = router;
