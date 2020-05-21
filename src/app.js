//node modules
const path = require('path')
//

//npm modules
const express = require('express')
const hbs = require('hbs')
//

//callback functions
const geoCode = require('./utils/geocode.js')
const forcast = require('./utils/forcast.js')

//functions called
const app = express()
const log = console.log
//

// all paths
const publicDirectoryPath = path.join(__dirname, '../public')
const viewDirectoryPath = path.join(__dirname, '../templates/views')
const partialsDirectoryPath = path.join(__dirname, '../templates/partials')
//

//static directory setup
app.use(express.static(publicDirectoryPath))
//

//handle bars setup and view location
app.set('view engine', 'hbs')
app.set('views', viewDirectoryPath)
hbs.registerPartials(partialsDirectoryPath)
//

app.get('/', (req, res) => {
    res.render('index', {
        title: "Weather",
        name: "Godsend Joseph"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About Me",
        name: "Godsend Joseph"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: "Some helpful text will come here",
        title: "Help",
        name: "Godsend Joseph"
    })
})

app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send(
            {
                errorMsg: "Sorry but an Address is required",
                query_string_required: "?address=your location"
            }
        )
    }

    geoCode(req.query.address, (error, { latitude, longitude, location } = {}) => {

        if (error) {
            return res.send({error})
        }
        forcast(latitude, longitude, (error, forcastData) => {
            if (error) {
                return res.send({error})
            }

            res.send(
                {
                    address: req.query.address,
                    forcast: forcastData,
                    location: location
                }
            )
        })

    })
})

app.get('/help/*', (req, res) => {
    res.render("404", {
        title: '404',
        name: "Godsend Joseph",
        message: 'Help Article not found'
    })
})

app.get('*', (req, res) => {
    res.render("404", {
        title: '404',
        name: "Godsend joseph",
        message: "404 page not found"
    })
})

app.listen(3000, () => {
    console.log("server is running on port 3000")
})