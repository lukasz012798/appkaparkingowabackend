const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const parkingSchema = new Schema({
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
  side: {
    type: Number,
  },
});

module.exports = mongoose.model("parking", parkingSchema);
