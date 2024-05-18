const express = require("express");
const router = express.Router();
const upload = require("../utils/storage");
const fs = require("fs");
const csv = require("csv-parser");
const path = require("path");

router.post("/uploads", upload.single("file"), (req, res, next) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(404).json({
        message: "File tidak ditemukan",
      });
    }

    return res.status(200).json({
      message: "File berhasil di upload",
    });
  } catch (error) {
    next(error);
  }
});

router.get("/retrieve/:filename", (req, res, next) => {
  try {
    const filePath = path.join(
      __dirname,
      "../public/files",
      req.params.filename
    );

    console.log(filePath);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: "File not found" });
    }

    const results = [];

    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (data) => {
        const [nama, usia] = data["nama,usia"].split(",");
        results.push({ nama: nama, usia: parseInt(usia) });
      })
      .on("end", () => {
        res.status(200).json(results);
      })
      .on("error", (error) => {
        res
          .status(500)
          .json({ message: "Error reading file", error: error.message });
      });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
