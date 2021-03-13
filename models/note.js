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
  heading: {
    type: Number,
  },
  note: {
    type: String,
  },
});

module.exports = mongoose.model("note", noteSchema);
