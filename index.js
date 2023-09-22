const URL = "http://api.weatherapi.com/v1/current.json?key=74f1afe87a554fb184d112523231809&q="
const URL2 = "https://api.giphy.com/v1/gifs/translate?api_key=RT63HeDUgMQBJw2DfxCmRbqOLOL8XEw9&s="

async function weather(location, url){
    const response = await fetch(url + location)
    const weatherData = await response.json()
    return weatherData
}

async function weatherInfo(location){
   const conditionText = weather(location, URL)
    .then(data => {
        const temp = data.current.temp_c;
        const humidity = data.current.humidity;
        const cloud = data.current.cloud;
        const wind = data.current.wind_kph
        const icon = data.current.condition.icon
        const city = data.location.name
        const country = data.location.country
        const condition = data.current.condition.text;

        tempInfo.textContent = `${temp}°`
        humidityInfo.textContent = `Humidity: ${humidity}`
        cloudInfo.textContent = `Cloud: ${cloud}`
        windInfo.textContent = `Wind Speed: ${wind}kph`
        cloudIcon.src = icon
        cityInfo.textContent = `${city} / ${country.slice(0,2)}`

        return condition
    })

    return conditionText
}

async function giphs(giphText){
    weather(giphText, URL2)
        .then(data => {
          const giph = data.data.images.original.url;
          giphsInfo.src = giph;
        })
}

function inputLocation(){
    const location = document.querySelector(".location")
    const submit = document.querySelector(".submitBtn")

    submit.addEventListener("click", async function(e){
        e.preventDefault()
        const locationInfo = location.value;
        const giphText = await weatherInfo(locationInfo)
        giphs(`${giphText} Weather`) //used condition text from weather api for giphy api!!
    })
}

inputLocation()

//dom
const body = document.querySelector("body")
const cloudIcon = document.querySelector(".icon")
const tempInfo = document.querySelector(".temp")
const humidityInfo = document.querySelector(".humidity")
const cloudInfo = document.querySelector(".cloud")
const windInfo = document.querySelector(".wind")
const cityInfo = document.querySelector(".city")
const giphsInfo = document.querySelector(".giphsImg")


