"use strict"; // more error reporting help from the browser, we can request strict behavior.

// Wave 2: Increase and Decrease Temperature 
console.log('loaded');
const state = {
    // <span id="increaseTempControl">⬆️</span>
    // <span id="tempValue"></span>
    // <span id="decreaseTempControl">⬇️</span>
    tempValue: null, // get temprature from APIs?
    increaseTempControl: null,
    decreaseTempControl: null,
    landscape: null,

    // Wave 3
    cityNameInput: null,
    headerCityName: null,

    // Wave 6: Resetting the City Name
    cityNameReset: null,
}


const handleIncreaseTempControlClicked = () => {
    // If the tempValue is not exist, it will default as 0?
    // increase tempValue by 1
    // Method 1
    // state.tempValue.textContent = +state.tempValue.textContent + 1;
    // Method 2
    state.tempValue.textContent = Number(state.tempValue.textContent) + 1;
    changeTempColors();
    changeLandscapes();
}


const handleDecreaseTempControlClicked = () => {
    // decrease tempValue by 1
    state.tempValue.textContent = +state.tempValue.textContent - 1;
    changeTempColors();
    changeLandscapes();
}



const registerEvents = () => {
    state.increaseTempControl.addEventListener('click', handleIncreaseTempControlClicked);
    state.decreaseTempControl.addEventListener('click', handleDecreaseTempControlClicked);
    state.cityNameInput.addEventListener('input', changeHeaderCityName);
    state.cityNameReset.addEventListener('click', resetCityName);
}


// Temperature Ranges Change Text Color
// Temperature (F)	Color
// 80+	Red
// 70-79	Orange
// 60-69	Yellow
// 50-59	Green
// 49 or below	Teal
const changeTempColors = () => {
    const temp = Number(state.tempValue.textContent)
    if (temp >= 80) {
        state.tempValue.style.color = 'red';
    } else if (temp >= 70 && temp <= 79) {
        state.tempValue.style.color = 'orange'; changeLandscapes();
    } else if (temp >= 60 && temp <= 69) {
        state.tempValue.style.color = 'yellow';
    } else if (temp >= 50 && temp <= 59) {
        state.tempValue.style.color = 'green';
    } else if (temp <= 49) {
        state.tempValue.style.color = 'teal';
    };
}

// Temperature Ranges Change Landscape
// Temperature (F)	Landscape
// 80+	"🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂"
// 70-79	"🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷"
// 60-69	"🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃"
// 59 or below	"🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲"

const changeLandscapes = () => {
    const temp = Number(state.tempValue.textContent)
    if (temp >= 80) {
        state.landscape.textContent = "🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂";
    } else if (temp >= 70 && temp <= 79) {
        state.landscape.textContent = "🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷";
    } else if (temp >= 60 && temp <= 69) {
        state.landscape.textContent = "🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃";
    } else if (temp <= 59) {
        state.landscape.textContent = "🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲";
    };
}


const changeHeaderCityName = () => {
    // .value to get the value of the user input
    // state.headerCityName.textContent = '!!!!!!!!!!';

    // Set Default city in input

    //  Will NOT work, set the default on loadedControls instead
    // If you force-set the input to "Seattle" immediately when it’s empty, 
    // the user can’t clear or delete the text — it just snaps back to "Seattle" as soon as the input is empty.
    // if (state.cityNameInput.value === '') {
    //     state.cityNameInput.value = 'Seattle';
    // }
    state.headerCityName.textContent = state.cityNameInput.value;
}



// Wave 4: Calling APIs
const getWeatherForCity = () => {
    const cityName = document.getElementById('cityNameInput').value;

    axios.get('http://127.0.0.1:5000/location', {
        params: { q: cityName }
    })
        .then(response => {
            const lat = response.data[0].lat;
            const lon = response.data[0].lon;
            return axios.get('http://127.0.0.1:5000/weather', {
                params: { lat: lat, lon: lon }
            });
        })
        .then(weatherResponse => {
            const tempKelvin = weatherResponse.data.main.temp;
            const tempFahrenheit = Math.round((tempKelvin - 273.15) * 9 / 5 + 32);
            document.getElementById('tempValue').textContent = tempFahrenheit;

            changeTempColors();
            changeLandscapes();
        })
        .catch(error => {
            console.error('Error fetching weather:', error);
            document.getElementById('tempValue').textContent = 'N/A';
        });
};

document.getElementById('currentTempButton').addEventListener('click', getWeatherForCity);



// Wave 6: Resetting the City Name
const resetCityName = () => {
    state.cityNameInput.value = 'Seattle';
    state.headerCityName.textContent = state.cityNameInput.value;
}

const onloaded = () => {
    loadedControls();
    registerEvents();
    changeTempColors();
    changeLandscapes();
    changeHeaderCityName();
}


const loadedControls = () => {
    state.tempValue = document.getElementById('tempValue');
    state.increaseTempControl = document.getElementById('increaseTempControl');
    state.decreaseTempControl = document.getElementById('decreaseTempControl');
    state.landscape = document.getElementById('landscape');

    // Wave 3
    state.cityNameInput = document.getElementById('cityNameInput');
    // Set default only if empty on load
    if (!state.cityNameInput.value) {
        state.cityNameInput.value = 'Seattle';
    }

    state.headerCityName = document.getElementById('headerCityName');

    // Wave 6
    state.cityNameReset = document.getElementById('cityNameReset');
}


onloaded();
