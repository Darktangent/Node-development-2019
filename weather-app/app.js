//AIzaSyALqVQDFJkKkd8uuBOkv0lyCHlQ_d4QOD8
const request=require("request");
const yargs=require("yargs")
const weather=require("./weather/weather")
const geocode=require("./geocode/geocode")
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

geocode.geocodeAddress(argv.address,(errorMessage, results)=>{
    if(errorMessage){
        console.log(errorMessage)
    }else{
        // console.log(JSON.stringify(results,undefined,2))
        console.log(results.address)
        weather.getWeather(results.latitude,results.longitude,-122.4233,(errorMessage,weatherResults)=>{
            if(errorMessage){
                console.log(errorMessage)
            }else{
                console.log(JSON.stringify(weatherResults,undefined,2))
            }
        });
    }
})

