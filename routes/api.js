const express = require("express");
const router = express.Router();
const DAL = require("./../DAL");
const controller = require("./../controller");

// pobieranie wszystkich obiektów
router.get("/", (req, res) => {
  DAL.getParking((data) => res.json(data));
});

// dodawanie nowego obiektu
router.post("/", (req, res) => {
  DAL.postParking((data, status) => res.status(status).json(data), req.body);
});

// dodawanie nowej notatki
router.post("/note", (req, res) => {
  DAL.postNote((data, status) => res.status(status).json(data), req.body);
});

// router.post("/", (req, res) => {
//   controller.postParking(
//     (data, status) => res.status(status).json(data),
//     req.body
//   );
// });

// aktualizacja obiektu na podstawie podanego id
router.put("/", (req, res) => {
  DAL.putParking((data, status) => res.status(status).json(data), req.body);
});

// usuwanie obiektu na podstawie podanego id
router.delete("/:id", (req, res) => {
  DAL.deleteParking(
    (data, status) => res.status(status).json(data),
    req.params.id
  );
});

module.exports = router;
