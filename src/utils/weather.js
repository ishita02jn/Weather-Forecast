const request = require('request')

const weatherReport = (latitude, longitude, callback) => {

    const weatherReportUrl = 'https://api.darksky.net/forecast/1cde2a987499309b45973fc006cf9e95/' + latitude + ',' + longitude+'?units=si'

    request({ url: weatherReportUrl, json: true }, (error, {body}={}) => {
        if (error) {
            callback('Unable to connect')
        } else if (body.error) {
            callback(body.error)
        } else {
            callback(undefined, body.daily.data[0].summary+'Currently it is ' + body.currently.temperature +
       " degrees out. The chance for rain is " + body.currently.precipProbability + '% !')
        }
    })
}

module.exports= weatherReport