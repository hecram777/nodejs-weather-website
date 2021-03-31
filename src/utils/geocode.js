const request = require("request");

const geocode = (address, callback) => {
	const apiKeyGeoCode =
		"pk.eyJ1IjoiaGVjcmFtNzc3IiwiYSI6ImNrbXYwd3MzaDAwbDUyd28zNDlyaHFjbDUifQ.YU3dNgoC259bmNMm1dmcHg";

	const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
		address
	)}.json?access_token=${apiKeyGeoCode}`;
    
	request(
		{ url, json: true, method: "GET" },
		(error, {body}) => {
			if (error) {
				callback("Unable to conect to location services!", undefined);
			} else if (body.features.length === 0) {
				callback(
					"Unable to find location, Try another search.",
					undefined
				);
			} else {
				const { features } = body;
				const data = {
					longitude: features[0].center[0],
					latitude: features[0].center[1],
					location: features[0].place_name,
				};
				callback(undefined, data);
			}
		}
	);
};

module.exports = {
	geocode,
};
