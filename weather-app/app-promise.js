//AIzaSyALqVQDFJkKkd8uuBOkv0lyCHlQ_d4QOD8
const request=require("request");
const yargs=require("yargs")
const axios=require("axios")

const argv=yargs
    .options({
        a:{
            demand:true,
            alias:'address',
            describe:"Address tofetch weather for",
            string:true
        }
    }).help()
    .alias('help','h')
    .argv;

    let encodedAddress=encodeURIComponent(argv.address)
    let geocodeUrl=`https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=AIzaSyALqVQDFJkKkd8uuBOkv0lyCHlQ_d4QOD8`

    axios.get(geocodeUrl).then((response)=>{
        if(response.data.status==="ZERO_RESULTS"){
            throw new Error("Unable to find that address")
        }
        let lat=response.data.results[0].geometry.location.lat;
        let lng=response.data.results[0].geometry.location.lng;
        let weatherUrl=`https://api.darksky.net/forecast/a0165bd6b4934bd385b8c70db60f00cf/${lat},${lng}`
        console.log(response.data.results[0].formatted_address);
        return axios.get(weatherUrl)
        
    }).then((response)=>{
        let temp=response.data.currently.temperature;
        let apparentTemp=response.data.currently.apparentTemperature;
        console.log(`It's currently ${temp}. It feels like ${apparentTemp}`)
    }).catch((e)=>{
        if(e.code==="ENOTFOUND"){
            console.log("unable to connect to API server")
        }else{
            console.log(e.message)
        }
        
    })

