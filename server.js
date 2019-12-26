const express = require("express");
const request = require("request");

const app = express();

app.set("view engine", "ejs");

const city = "Las Vegas";
const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=71284fc332ab796c8a27b5712f1ee8f2`;

app.get("/", (req, res) => {
    request(url, (error, response, body) => {
        weather_json = JSON.parse(body);
        console.log(weather_json);
        const weather = {
            city: city,
            temperature: Math.round(weather_json.main.temp),
            description: weather_json.weather[0].description,
            icon: weather_json.weather[0].icon
        };
        const weather_data = { weather: weather };
        res.render("weather", weather_data);
    });
});

app.listen(8000);
