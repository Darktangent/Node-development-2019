const request=require("request")
let getWeather=(lat,lng,callback)=>{
    request({
        url:`https://api.darksky.net/forecast/a0165bd6b4934bd385b8c70db60f00cf/${lat},${lng}`,json:true
    },(error,response,body)=>{
        if(!error && response.statusCode===200){
            callback(undefined,{temp:body.currently.temperature,
            apparentTemperature:body.currently.apparentTemperature})
        }else{
            callback("Unable tofetch weather")
        }
        
    })
}
module.exports.getWeather=getWeather;