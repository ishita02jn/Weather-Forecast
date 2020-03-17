const express = require('express')
const hbs = require('hbs')
const path = require('path')
const getLatNlong = require('./utils/geocoding')
const weatherReport = require('./utils/weather')

const app = express()
const port = process.env.PORT || 3000
//Define paths for express cofig
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebar engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
//for static pages(Directory)
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: "Weather Forecast",
        name: 'Ishita Jain'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Ishita Jain'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Ishita Jain'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error:'Address must be provided'
        })
    }
    const address=req.query.address
    getLatNlong(address, (error, {latitude, longitude, location}={}) => {
        if (error) {
            return res.send({error})
        }
        // console.log(response)
        // console.log("Weather Forecast for - " + location)
        weatherReport(latitude, longitude, (error, data) => {
            if (error) {
                return res.send({error})
            }
            res.send({
                forecast:data,
                location,
                address
            })
            // console.log(data.daily.data[0].summary+'Currently it is ' + data.currently.temperature +
            //     " degrees out. The chance for rain is " + data.currently.precipProbability + '% !')

        })

    })
    
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        error: "help content not found",
        name:'Ishita Jain'
    })
})
app.get('*', (req, res) => {
    res.render('error', {
        error: "404 page not found",
        name:'Ishita Jain'
    })
})

app.listen(port, () => {
    console.log('Server is started o port number '+port)
})