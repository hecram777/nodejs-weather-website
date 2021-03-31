const path = require("path");
const express = require("express");
const hbs = require("hbs");
const { geocode } = require("./utils/geocode");
const { forecast, prettyPrint } = require("./utils/forecast");

//create app
const app = express();

//Port configuration
const port = process.env.PORT || 3000;

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

//routes
app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Hector Omar",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Hector Omar",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Hector Omar",
    helpText: "Hi everyone",
  });
});

app.get("/weather", (req, res) => {
  //desctructuring query from request parameter
  const { query = undefined } = req;
  
  //get the address
  const { address = undefined } = query;

  //verify if query string is provided
  if (!query || !address) {
    return res.send({
      error: "You must provide an address",
    });
  }  
  
  //get the weather
  geocode(address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error });
    }

    //pass latitude and longitude to the forecast function
    forecast(latitude, longitude, (forecastError, forecastData) => {
      if (forecastError) {
        return res.send({ error: forecastError });
      }

      //write the response
      res.send({
        forecast: prettyPrint(forecastData),
        location,
        address,
      });
    });
  });
});

app.get("/products", (req, res) => {
  const { query } = req;

  if (!query || !query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }

  res.send({ products: [] });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Hector Omar",
    errorMessage: "Help article not found.",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Hector Omar",
    errorMessage: "Page not found.",
  });
});

//listening port and run server
app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
