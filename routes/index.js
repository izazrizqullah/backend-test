const express = require("express");
const router = express.Router();
const book = require("./books");
const auth = require("./auth");
const file = require("./file");

router.use("/books", book);
router.use("/", auth);
router.use("/", file);

module.exports = router;
