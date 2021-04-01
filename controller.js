const DAL = require("./DAL");
const Parking = require("./models/parking");

const validation = (callback, body) => {
  const error = [];
  const { id, name, latitude, longitude, type, exit, side } = body;

  //id length check
  if (id !== undefined)
    if (id.length !== 24)
      error.push("Id must be a string of 24 hex characters");

  // undefined check
  if (
    name === undefined ||
    latitude === undefined ||
    type === undefined ||
    (type === 1 && exit === undefined) ||
    (type !== 1 && exit !== undefined)
  )
    return callback(
      {
        error:
          "You need to pass 'name', 'latitude', 'longitude', 'type'. If type is 1 - autohof: 'exit' is also obligatory! You mustn't pass 'exit' if the type of object is different than autohof!",
      },
      400
    );

  // typeof check
  if (typeof name !== "string") error.push("Name has to be a string!");
  if (typeof latitude !== "number" || typeof longitude !== "number")
    error.push("Latitude and longitude has to be a number: 0-360!");
  if (typeof type !== "number")
    error.push(
      "Type has to be a number: 1 - autohof, 2 - rastatte, 3 - parkplatz, 4 - toilette parkplatz!"
    );
  if (exit !== undefined)
    if (typeof exit !== "number") error.push("Exit has to be a number!");
  if (side !== undefined)
    if (typeof side !== "number") error.push("Side has to be number!");

  // name validation
  if (name.length > 50) error.push("Name's too long!");

  // latitude validation
  if (latitude < 47.26666 || latitude > 55.05)
    error.push("Wrong latitude value! It has to be number: 47.26666 - 50.05");

  // longitude validation
  if (longitude < 5.88333 || longitude > 15.03333)
    error.push(
      "Wrong longitude value! It has to be number: 5.88333 - 15.03333"
    );

  // type validation
  if (![1, 2, 3, 4].includes(type))
    error.push(
      "Type has to be a number: 1 - autohof, 2 - rastatte, 3 - parkplatz, 4 - toilette parkplatz!"
    );

  // exit validation
  if (exit !== undefined)
    if (exit < 1 || exit > 200) error.push("Exit has to be a number: 1-200!");

  // side validation
  if (side !== undefined && side !== null)
    if (side < 0 || side > 360) error.push("Side has to be a number: 0-360!");
  if (error.length > 0) callback({ error: [...error] }, 400);
  return error;
};

const postParking = (callback, body) => {
  const error = validation(callback, body);
  if (error.length == 0) {
    DAL.postParking((data, status) => callback(data, status), body);
  }
};

const putParking = async (callback, body) => {
  const error = validation(callback, body);
  if (error.length === 0)
    Parking.find({ _id: body.id }).exec((err, data) => {
      if (err) {
        console.log(err);
      } else {
        if (data.length === 0) {
          if (body.id === undefined) error.push("You need to pass id!");
          else
            error.push(
              `There\'s no record with id: ${body.id} in the database!`
            );
        }
        if (error.length == 0) {
          DAL.putParking((data, status) => callback(data, status), body);
        } else {
          callback(
            {
              error: [...error],
            },
            400
          );
        }
      }
    });
};

module.exports.postParking = postParking;
module.exports.putParking = putParking;
