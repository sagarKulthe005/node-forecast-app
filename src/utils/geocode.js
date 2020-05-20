const request = require("request");

// Get the co-ordinates of address
const geoCode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1Ijoic2FnYXJrdWx0aGUwMDUiLCJhIjoiY2thNHd0NTMzMDRrNzNpbnVhazBpc2MyayJ9.oO6RgrKKqz5F8x5h7lVJoQ&limit=1`;

  request({ url, json: true }, (err, { body } = {}) => {
    if (err) {
      callback("Unable to connect to location services!");
    } else if (body.features.length === 0) {
      callback("Unable to find location. Please try another search");
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        langitude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geoCode;
