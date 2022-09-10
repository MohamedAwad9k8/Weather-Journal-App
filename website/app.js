/* Global Variables */

//const { application } = require("express");

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

/* Generating API */

/* Setting Routes */

//GET method route
const getData = async function(url = ''){
    const response = await fetch(url, {
        method: "GET",
        credentials: "same-origin",
        headers: {
            'Accept': 'application/json',
            'Content-Type' : 'application/json',
        },
    });
    const resData = await response.json();
    console.log(resData);
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

/* Updating UI */

/* Calling Functions */
getData("/getData");
let data = {"Day": 10, "Month": "September"};
postData("/postData", data);