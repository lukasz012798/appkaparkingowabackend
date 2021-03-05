const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const noteSchema = new Schema({
  name: {
    type: String,
  },
  latitude: {
    type: Number,
  },
  longitude: {
    type: Number,
  },
  type: {
    type: Number,
  },
  exit: {
    type: Number,
  },
  heading: {
    type: String,
  },
  note: {
    type: String,
  },
});

module.exports = mongoose.model("note", noteSchema);
