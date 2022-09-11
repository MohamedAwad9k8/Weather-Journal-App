/* Global Variables */
const baseUrlGeo = "https://api.openweathermap.org/geo/1.0/zip?zip=";
const apiKey = "db5ca65c7eb6c043a46017f12449131b";
const baseUrlWeather = "http://api.openweathermap.org/data/2.5/weather?";
const doc = document;
const generateButton = doc.getElementById("generate");


//const { application } = require("express");

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getDate() + '/' + Number(d.getMonth()+1) + '/' + d.getFullYear();




/* Setting Routes */

//GET method route
const getData = async function(url = ''){
    const response = await fetch(url);
    const resData = await response.json();
    console.log("data recieved!");
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

let generateAPI = async function (geoLink){
    let response = await fetch(geoLink);
    if (!response.ok){
        alert("Error!!! Please enter a valid ZIP CODE.");
    }
    let resData = await response.json();
    let lon = resData.lon;
    let lat = resData.lat;
    let coordinates = `lat=${lat}&lon=${lon}`;
    let weatherLink = baseUrlWeather + coordinates + "&appid=" + apiKey + "&units=metric";;
    return(weatherLink);
}





/* Updating UI */
const updateUI = function(date, temp, userFeelings) {
    doc.getElementById("date").innerHTML = date;
    doc.getElementById("temp").innerHTML = temp;
    doc.getElementById("content"). innerHTML = userFeelings;
    console.log("UI has been updated");
}

const displayWeatherApiResults = function(weather){
    doc.getElementById("WeatherAPI").innerHTML = `
    Maximum Temperature : 23.86 <br><br>
    Minimum Temperature : 19.99 <br><br>
    Temperature : 21.59 <br><br>
    Feels Like : 21.76 <br><br>
    Humidity : 75 <br><br>
    Pressure : 1023 <br><br>`;
}

/* Calling Functions */
//self invoking function that gets data from server and updates UI based on latest entry
!async function() {
    //get Data from API EndPoint
    let endPointData = await getData("/getData");
    //Use the data from the EndPoint to update the UI
    updateUI(endPointData.date,endPointData.temp,endPointData.feelings);
 }();



/*Event Listener*/


const getWeather = async function() {
    const feelingsContainer = doc.getElementById("feelings");
    const zipContainer= doc.getElementById("zip");
    let zipCode = zipContainer.value;
    let userFeelings = feelingsContainer.value;
    //Generating the API link for the geocoding inquiry to get the latitude and longitude
    let geoLink = baseUrlGeo + zipCode + ",us&appid=" + apiKey;
    //Generating the API link for the weather inquiry to get the weather
    weatherLink = await generateAPI(geoLink);
    console.log(weatherLink);
    let weather = await getData(weatherLink);
    console.log(weather.main);

    //send Data to API EndPoint
    let data = {"date":newDate, "temp":weather.main.temp, "feelings":userFeelings}
    postData("/postData", data);
    //get Data from API EndPoint    
    await getData("/getData");
    let endPointData = await getData("/getData");
    //Use the data from the EndPoint to update the UI
    updateUI(endPointData.date,endPointData.temp,endPointData.feelings);
    displayWeatherApiResults(weather.main);    
}
generateButton.addEventListener('click', getWeather);


