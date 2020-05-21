const request = require('request')

const key = ""

const forcast = (latitude , longitude, callback) => {
    const url = `http://api.weatherapi.com/v1/forecast.json?key=${key}&q=${encodeURIComponent(latitude, longitude)}&days=1`

    request({ url: url, json: true}, (error, { body } = {}) => {
        if(error) {
            callback('Unable to connect', undefined)
        } else if(body.error) {
            callback('Unable to find Locations, try another location', undefined)
        } else {
            const data = body
            const {current:currentData} = data
            // const locationData = data.location
            callback(undefined, `It is currently ${currentData['temp_c']} degress out. There is ${currentData['precip_mm']}% chance of Rain`)
        }
    })
}

module.exports = forcast