const express = require("express");
const router = express.Router();
const DAL = require("./../DAL");

// pobieranie wszystkich parkingow
router.get("/", (req, res) => {
  DAL.getParking((data) => res.json(data));
});

router.post("/", (req, res) => {
  DAL.postParking((data, status) => res.status(status).json(data), req.body);
  // res.json(req.body)
});

module.exports = router;
