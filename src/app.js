const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

const publicDir = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");
app.set("view engine", "hbs");
app.set("views", viewPath);
app.use(express.static(publicDir));
hbs.registerPartials(partialsPath);

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Khun Zin Shine",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    text: "This is some helpful text",
    name: "Khun Zin Shine",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Page",
    name: "Khun Zin Shine",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({ error: "You should provide an address!" });
  }
  geocode(
    req.query.address,
    (error, { latitude, longitude, Location } = {}) => {
      if (error) {
        return res.send({
          error: error,
        });
      }
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error: error });
        }
        res.send({
          forecast: forecastData,
          Location,
          address: req.query.address,
        });
      });
    }
  );
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    errorMsg: "Help article not found.",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    errorMsg: "404 Not Found.",
  });
});

app.listen(3000, () => {
  console.log("Server is up to port 3000!");
});
