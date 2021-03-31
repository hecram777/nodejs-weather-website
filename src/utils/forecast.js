const request = require("request");

const forecast = (latitude, longitude, callback) => {
	//parameters
	const apiKey = "09c28dd3102dff4412b986c42ba46c67";
	const coord = `${latitude},${longitude}`;
	const metricUnit = "m";

	//current or forecast
	const urlOption = "current";
	const url = `http://api.weatherstack.com/${urlOption}?access_key=${apiKey}&query=${coord}&units=${metricUnit}`;

	//Get weather and forecast
	request({ url, json: true, method: "GET" }, (error, {body}) => {
		if (!error) {
			const {
				temperature,
				feelslike,
				weather_descriptions,
			} = body.current;
			callback(undefined, {
				temperature: temperature,
				feelslike: feelslike,
				weather_descriptions: weather_descriptions,
			});
		} else if (body.error) {
			callback("Unable to find location", undefined);
		} else {
			callback(
				`${error.Code} - Unable to connect to weather service!`,
				undefined
			);
		}
	});
};

prettyPrint = (forecastData) => {
	const {temperature, feelslike, weather_descriptions} = forecastData;
    return `${weather_descriptions[0]}... This is ${temperature} degress out. Feels like ${feelslike} degress out.`
};

module.exports = { forecast, prettyPrint };
