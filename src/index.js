"use strict";

console.log('loaded');

const state = {
    // Wave 2
    tempValue: null,
    increaseTempControl: null,
    decreaseTempControl: null,
    landscape: null,

    // Wave 3
    cityNameInput: null,
    headerCityName: null,

    // Wave 4
    currentTempButton: null,

    // Wave 5
    skySelect: null,

    // Wave 6
    cityNameReset: null,
}


// Wave 2: Increase and Decrease Temperature 
const setTemp = (changeInTemp) => {
    state.tempValue.textContent = +state.tempValue.textContent + changeInTemp;
    changeTempColors();
    changeLandscapes();
};


const changeTempColors = () => {
    const temp = Number(state.tempValue.textContent)
    state.tempValue.classList.remove('red', 'orange', 'yellow', 'green', 'teal');
    if (temp >= 80) {
        state.tempValue.classList.add('red');
    } else if (temp >= 70 && temp <= 79) {
        state.tempValue.classList.add('orange');
    } else if (temp >= 60 && temp <= 69) {
        state.tempValue.classList.add('yellow');
    } else if (temp >= 50 && temp <= 59) {
        state.tempValue.classList.add('green');
    } else if (temp <= 49) {
        state.tempValue.classList.add('teal');
    };
}


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


// Wave 3: Naming the City
const changeHeaderCityName = () => {
    state.headerCityName.textContent = state.cityNameInput.value;
}


// Wave 4: Calling APIs
const getWeatherForCity = () => {
    const cityName = document.getElementById('cityNameInput').value;

    axios.get('https://weather-report-proxy-server-e84x.onrender.com/location', {
        params: { q: cityName }
    })
        .then(response => {
            const lat = response.data[0].lat;
            const lon = response.data[0].lon;
            return axios.get('https://weather-report-proxy-server-e84x.onrender.com/weather', {
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


// Wave 5: Selecting the Sky
const updateSky = () => {
    const sky = document.getElementById("skySelect").value;
    const skyDisplay = document.getElementById("sky");
    const gardenContent = document.getElementById("gardenContent");

    const skyOptions = {
        sunny: "☁️ ☁️ ☁️ ☀️ ☁️ ☁️",
        cloudy: "☁️☁️ ☁️ ☁️☁️ ☁️ 🌤 ☁️ ☁️☁️",
        rainy: "🌧🌈⛈🌧🌧💧⛈🌧🌦🌧💧🌧🌧",
        snowy: "🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨",
    };

    skyDisplay.textContent = skyOptions[sky];
    gardenContent.classList.remove('sunny', 'cloudy', 'rainy', 'snowy');
    gardenContent.classList.add(sky);
};


// Wave 6: Resetting the City Name
const resetCityName = () => {
    state.cityNameInput.value = 'Seattle';
    state.headerCityName.textContent = state.cityNameInput.value;
}


const registerEvents = () => {
    state.increaseTempControl.addEventListener('click', () => { setTemp(1) });
    state.decreaseTempControl.addEventListener('click', () => { setTemp(-1) });
    state.cityNameInput.addEventListener('input', changeHeaderCityName);
    state.cityNameReset.addEventListener('click', resetCityName);
    state.currentTempButton.addEventListener('click', getWeatherForCity);
    state.skySelect.addEventListener('change', updateSky);
}


const onloaded = () => {
    loadControls();
    registerEvents();
    changeTempColors();
    changeLandscapes();
    changeHeaderCityName();
    updateSky();
}


const loadControls = () => {
    // Wave 2
    state.tempValue = document.getElementById('tempValue');
    state.increaseTempControl = document.getElementById('increaseTempControl');
    state.decreaseTempControl = document.getElementById('decreaseTempControl');
    state.landscape = document.getElementById('landscape');

    // Wave 3
    state.cityNameInput = document.getElementById('cityNameInput');
    if (!state.cityNameInput.value) {
        state.cityNameInput.value = 'Seattle';
    }

    state.headerCityName = document.getElementById('headerCityName');

    // Wave 4
    state.currentTempButton = document.getElementById('currentTempButton');

    // Wave 5
    state.skySelect = document.getElementById('skySelect');

    // Wave 6
    state.cityNameReset = document.getElementById('cityNameReset');
}


document.addEventListener('DOMContentLoaded', () => {
  onloaded();
});