const express = require("express");
const router = express.Router();
const DAL = require("./../DAL");
const controller = require("./../controller");

// pobieranie wszystkich obiektów
router.get("/", (req, res) => {
  DAL.getParking((data) => res.json(data));
});

// dodawanie nowej notatki
router.post("/note", (req, res) => {
  console.log(req.body);
  DAL.postNote((data, status) => res.status(status).json(data), req.body);
});

// dodawanie nowego obiektu
router.post("/", (req, res) => {
  controller.postParking(
    (data, status) => res.status(status).json(data),
    req.body
  );
});

// aktualizacja obiektu na podstawie podanego id
router.put("/", (req, res) => {
  controller.putParking(
    (data, status) => res.status(status).json(data),
    req.body
  );
});

// usuwanie obiektu na podstawie podanego id
router.delete("/:id", (req, res) => {
  DAL.deleteParking(
    (data, status) => res.status(status).json(data),
    req.params.id
  );
});

module.exports = router;
