const request = require('request')

// const geocodingUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angles.json?access_token=pk.eyJ1IjoiaXNoaXRhMDIiLCJhIjoiY2sxMjgyazA5MDBtdzNpcjRyeGxiam84dSJ9.DDQiyHIJjRjHb8MVK6AUHQ'

const getLatNlong=(address,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiaXNoaXRhMDIiLCJhIjoiY2sxMjgyazA5MDBtdzNpcjRyeGxiam84dSJ9.DDQiyHIJjRjHb8MVK6AUHQ&limit=1'
    request({ url, json: true }, (error, {body}={}) => {
        if (error) {
            callback('Unable to connect')
        } else if (body.message) {
            callback(body.message)
        } else if (body.features.length === 0) {
            callback("Not a valid place")
        } else {
            // console.log(body.features[0].place_name)
            // console.log(body.features[0].center)
            const res={
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name
            }
            callback(undefined,res)
        }
    })
}

module.exports= getLatNlong