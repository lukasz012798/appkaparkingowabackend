const Parking = require("./models/parking");

const getParking = (callback) => {
  Parking.find({}).exec((err, data) => {
    if (err) {
      callback("_błąd");
      return;
    }
    callback(data);
  });
};

const postParking = (callback, body) => {
  console.log(body);
  const parkingData = new Parking(body);

  parkingData.save((err) => {
    if (err) {
      callback(
        {
          status: "Internal Server Error",
        },
        500
      );
      return;
    }
    callback(
      {
        status: "Created",
      },
      201
    );
  });
};

module.exports.getParking = getParking;
module.exports.postParking = postParking;
