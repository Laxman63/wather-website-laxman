const request = require('request')

//Geocoding API MAPBOX
//TO convert location to lat and long
//wihtout any callback

// const urlgeo = 'https://api.mapbox.com/geocoding/v5/mapbox.places/patna.json?access_token=pk.eyJ1IjoiZ295YWw5MzE0IiwiYSI6ImNrN243bDBnMjBxM3IzbXFnNmR4Yno2cWUifQ.9axEjTbpeByRhwvz6DK1pw'
// request({url:urlgeo,json:true},(error,response)=>{
//     if(error){
//         console.log('Unable to connect to Whether service!')
//     }else if(response.body.features.length === 0){
//         console.log('Unable to find location!')
//     }else{
//   console.log('lat: '+response.body.features[0].center[0]+'long : '+response.body.features[0].center[1])
//     }
// })

//with callback
const geocode = (address,callback) =>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoiZ295YWw5MzE0IiwiYSI6ImNrN243bDBnMjBxM3IzbXFnNmR4Yno2cWUifQ.9axEjTbpeByRhwvz6DK1pw'
    request({url,json:true},(error ,response) =>{
        if(error){
            callback('Unable to connect to Whether service!',undefined)
        } else if(response.body.features.length === 0){
            callback('Unable to find location!',undefined)
        }else{
            callback(undefined,{
                latitude:response.body.features[0].center[0],
                longitude: response.body.features[0].center[1],
                location: response.body.features[0].place_name
            })
        }
    })
}
module.exports = geocode