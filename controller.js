const Parking = require("./models/parking");

const postParking = (callback, body) => {
  // console.log(body);
  const error = [];
  // name validation
  if (typeof body.name !== "string") error.push("Name has to be a string!");
  if (body.name.length > 50) error.push("Name's too long");
  if (body.latitude);
  if (error.length > 0) {
    callback();
  }
  const parkingData = new Parking(body);
  console.log(body);
  callback(
    {
      error: `Created: ${body.name}`,
    },
    201
  );
};

module.exports.postParking = postParking;
