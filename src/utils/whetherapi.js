const request = require('request')
//api key from dark sky api
//we can edit the api like changing the lang etc
//go to docs of api https://darksky.net/dev/docs#forecast-request
//const url ='https://api.darksky.net/forecast/55ba7379cd27e3c06806b504fc69fab1/85.14139,25.61'
//change like url?lang=hi&units=si
//in this we are changing data with parse but if we do json = true then it will auto come 

//without callback

// request({url: url,json:true},(error,response)=>{
//     if(error){
//         console.log('Unable to connect to Whether service!')
//     }else if(response.body.error){
//         console.log('Unable to find location!')

//     }else{
//     console.log('summary :'+ response.body.daily.data[0].summary+' pressure: '+response.body.timezone)
//     }
// })

//with callback

const forecast = (latitude,longitude,callback) =>{
    const url = 'https://api.darksky.net/forecast/55ba7379cd27e3c06806b504fc69fab1/'+ latitude +','+longitude
    request({url,json:true},(error,response)=>{
        if(error){
            callback('Unable to conncet to whether service !',undefined)
        }else if (response.body.error){
            callback('Unable to find location!',undefined)
        }else{
            //'Here temperature is '+ response.body.currently.temperature+ ' and 
            callback(undefined,'It looks '+ response.body.daily.data[0].summary
            )
        }
    })
}
module.exports = forecast
