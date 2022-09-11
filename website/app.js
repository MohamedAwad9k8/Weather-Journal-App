/* Global Variables */
const baseUrlGeo = "https://api.openweathermap.org/geo/1.0/zip?zip=";
const apiKey = "db5ca65c7eb6c043a46017f12449131b";
var zipCode = "11757";
const baseUrlWeather = "http://api.openweathermap.org/data/2.5/weather?";
const generateButton = document.getElementById("generate");

//const { application } = require("express");

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getDate() + '/' + Number(d.getMonth()+1) + '/' + d.getFullYear() ;
console.log(newDate);




/* Setting Routes */

//GET method route
const getData = async function(url = ''){
    const response = await fetch(url);
    const resData = await response.json();
    console.log(resData);
    return resData;
}


//POST method route
const postData = async function(url = '', data = {}){
    console.log(data);
    const response = await fetch (url, {
        method: "POST",
        credentials: "same-origin",
        headers: {
            'Content-Type' : 'application/json',
        },
        body: JSON.stringify(data),
    });
    const newData = await response.json();
    console.log(newData);
    return newData;
}

/* Generating API */
let geoLink = baseUrlGeo + zipCode + ",us&appid=" + apiKey;

let generateAPI = async function (geoLink){
    let response = await fetch(geoLink);
    let resData = await response.json();
    let lon = resData.lon;
    let lat = resData.lat;
    let coordinates = `lat=${lat}&lon=${lon}`;
    let weatherLink = baseUrlWeather + coordinates + "&appid=" + apiKey;
    return(weatherLink);
}





/* Updating UI */

/* Calling Functions */
// getData("/getData");
// let data = {"Day": 10, "Month": "September"};
// postData("/postData", data);


/*Event Listener*/


const getWeather = async function() {
    weatherLink = await generateAPI(geoLink);
    console.log(weatherLink);
    let weather = await getData(weatherLink);
    console.log(weather.main);
    
}
generateButton.addEventListener('click', getWeather);

