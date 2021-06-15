const hbs = require('hbs')
const path = require('path')
const express = require('express')
const app = express()

const port = process.env.PORT 
const geocode = require('./utils/geocode')
const forecast = require('./utils/whetherapi')

//define paths for express config
const publicDirectorypath = path.join(__dirname,'../public')
//console.log(publicDirectorypath)
const viewPath = path.join(__dirname,'/templates/views')
const partialPath = path.join(__dirname,'/templates/partial')
//setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialPath)

//setup static directory to serve
app.use(express.static(publicDirectorypath))

//for dynamic
app.get('',(req,res)=>{
    res.render('index.hbs',{
        title:'Weather app',
        name:'Laxman Kumar'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Me',
        name:'Laxman Kumar'
    })
})
app.get('/help',(req,res)=>{
    res.render('help.hbs',{
        title:'Help',
        name:'Laxman Kumar'
    })
})

//for wrong search
app.get('/help/*',(req,res)=>{
    res.render('help_404.hbs',{
        title:'Help article not found',
        name:'Laxman Kumar'
    })

})

app.get('/weather',(req,res)=>{
    const address = req.query.address
    if(!address){
        return res.send({
            error:'You must provide a search term'
        })
    }
    geocode(address,(error,{latitude,longitude,location}={}) =>{//instead of {latitude,longitude,location} we can use data and fetch it like data.latitude
        if(error){
            return res.send({
                error: error
            })
        }
        forecast(latitude,longitude,(error,forcastData)=>{
            if(error){

               return res.send({
                error: error
            })
            }
            res.send({
                forecast: forcastData,
                location: location
               
                
            })
        })
    })
    
})

app.get('/products',(req,res)=>{
    res.send({
        products:[]

    })
})

app.get('*',(req,res)=>{
    res.render('404.hbs',{
        title:'Page not found',
        name:'Laxman Kumar'

    })
})

/*app.get('',(req,res)=>{
    res.send('<h1>Whether</h1>')
})
app.get('/help',(req,res)=>{
    res.send({
        location:'provide current location'
    })
})
app.get('/about',(req,res)=>{
    res.send('<h1> About </h1>')
})
app.get('/whether',(req,res)=>{
    res.send('whether page')
})*/

 app.listen(port,()=>{
     console.log('server in up on port '+port)
 })