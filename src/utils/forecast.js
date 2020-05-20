const request = require("request");

// Get forecast using co-ordinates
const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=92d033fdb5be166718a3539b9cbec071&query=${latitude},${longitude}`;

  request({ url: url, json: true }, (err, { body } = {}) => {
    if (err) {
      callback("Unable to connect weather services!");
    } else if (body.error) {
      callback("Unable to find location!");
    } else {
      callback(
        undefined,
        `${body.current.weather_descriptions[0]}.
        It is currently ${body.current.temperature} degress out. It feels like ${body.current.feelslike} degress out. 
        The humidity is ${body.current.humidity}%. The chances for rain is ${body.current.precip}% `
      );
    }
  });
};

module.exports = forecast;
