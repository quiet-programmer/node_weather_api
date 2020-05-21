const request = require('request')

const token_key = "pk.eyJ1IjoiZ29kc2VuZC1qb3NlcGgiLCJhIjoiY2thZGFuaGw5MDdyeDJxbWJmem8yNzdnOCJ9.n3sbl9xEZRJod_NbpEaN1Q"

const geoCode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${token_key}`

    request({ url: url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find that location, try another location', undefined)
        } else {
            const data = body
            const mapData = data.features[0].center
            const location = data.features[0].place_name

            callback(undefined, {
                latitude: mapData[1],
                longitude: mapData[0],
                location: location
            })
        }
    })
}

module.exports = geoCode