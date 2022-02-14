'use strict';

const { getSecret } = require("./secretManager");
const { createClient } = require("redis");


function responseJson( statusCode, body ) {
    return {
        statusCode,
        body: JSON.stringify(body)
    };
}

exports.getWeather = async (event) => {
    const { city } = event.pathParameters;

    const secret = await getSecret(process.env.SECRET_NAME, process.env.REGION);
    const client = createClient({ url: process.env.REDIS_URL })

    const cachedCity = await client.get(city)
    if(cachedCity) {
        return responseJson(200, JSON.parse(cachedCity));
    }
    
    const endpoint = process.env.API_URL;
    const { data } = await axios.get(endpoint, {
        params: { access_key: secret, query: city }
    });

    if('error' in data) {
        return responseJson(500, { error: true });
    }

    const responseData = {
        city: data.location.name,
        temperature: data.current.temperature,
        textWeather: data.current.weather_descriptions,
        windSpeed: data.current.wind_speed,
        windDir: data.current.wind_dir,
        pressure: data.current.pressure,
        humidity: data.current.humidity,
    }

    await client.set(`${city}`, JSON.stringify(responseData));

    return responseJson(200, responseData);
}
