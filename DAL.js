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
        status: `Created: ${body.name}`,
      },
      201
    );
  });
};

const putParking = (callback, body) => {
  const { id, name, latitude, longitude, type, side, exit } = body;
  Parking.findOneAndUpdate(
    {
      _id: id,
    },
    {
      $set: {
        name: name,
        latitude: latitude,
        longitude: longitude,
        type: type,
        side: side,
        exit: exit,
      },
    },
    {
      new: true,
    },
    (err, doc) => {
      if (err) {
        callback("error", 500);
      }
      callback("updated", 201);
    }
  );
};

const deleteParking = (callback, id) => {
  Parking.findByIdAndDelete(id, (err) => {
    if (err) {
      callback(err, 500);
      return;
    }
    callback("_deleted", 200);
  });
};

module.exports.getParking = getParking;
module.exports.postParking = postParking;
module.exports.putParking = putParking;
module.exports.deleteParking = deleteParking;
