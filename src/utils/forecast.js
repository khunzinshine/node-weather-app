const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=9bd6fb3365ef781e503e5fa0d925c386&query=" +
    latitude +
    "," +
    longitude +
    "&unit=c";

  request({ url: url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect weather service!", undefined);
    } else if (body.error) {
      callback("Unalbel to find locations!", undefined);
    } else {
      callback(
        undefined,

        " Temperature is: " +
          body.current.temperature +
          " Celcisus. " +
          " But it feels like: " +
          body.current.feelslike +
          " degrees out. " +
          "Humidity is: " +
          body.current.humidity +
          " PrecipProbability temperature is: " +
          body.current.precip +
          "." +
          " Weather descriptions is: " +
          body.current.weather_descriptions[0]
      );
    }
  });
};
module.exports = forecast;
