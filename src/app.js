const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geoCode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

// Define paths for express config
const publicPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partial");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicPath));

app.get("", (req, res) => {
  res.render("index", { title: "Weather", name: "Sagar" });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About", name: "Sagar" });
});

app.get("/help", (req, res) => {
  res.render("help", { title: "Help", name: "Sagar" });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({ error: "You must provide address" });
  }
  geoCode(req.query.address, (err, { latitude, langitude, location } = {}) => {
    if (err) {
      return res.send({ error: err });
    }
    forecast(latitude, langitude, (err, forecastData) => {
      if (err) {
        return res.send({ err });
      }
      res.send({
        forecast: forecastData,
        location,
        address: req.query.address,
      });
    });
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Sagar",
    errorMessage: "help article not found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Sagar",
    errorMessage: "Page not found",
  });
});

app.listen(3000, () => {
  console.log("Server started on port 3000!");
});
