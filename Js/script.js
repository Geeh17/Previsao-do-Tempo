const key = '63bd84f73c0b0036ac56402d126fccdb';
async function getPosition(position) {
    const dados = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
    }
    const init = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${dados.latitude}&lon=${dados.longitude}&appid=${key}&lang=pt_br&units=metric`).then(result => result.json())
    dataInit(init)
}
function dataInit(init) {
    document.querySelector('.city').innerHTML = 'Time in ' + init.name;
    document.querySelector('.temp').innerHTML = Math.floor(init.main.temp) + '°C';
    document.querySelector('.weather-text').innerHTML = init.weather[0].description;
    document.querySelector('.humidity').innerHTML = 'Moisture: ' + init.main.humidity + '%';
    document.querySelector('.weather-image').src = `https://openweathermap.org/img/wn/${init.weather[0].icon}.png`;
}
function geoError(error) {
    if (error.code == 1){
        alert('The user did not allow geolocation')
    }
}
navigator.geolocation.getCurrentPosition(getPosition, geoError)
function dataScreen(data) {
    document.querySelector('.city').innerHTML = 'Time in ' + data.name;
    document.querySelector('.temp').innerHTML = Math.floor(data.main.temp) + '°C';
    document.querySelector('.weather-text').innerHTML = data.weather[0].description;
    document.querySelector('.humidity').innerHTML = 'Moisture: ' + data.main.humidity + '%';
    document.querySelector('.weather-image').src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
}
async function searchCity(city) {
    const data = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&lang=pt_br&units=metric`).then(result => result.json());
    dataScreen(data);
}
function clickButton() {
    let city = document.querySelector('.input-city').value.trimEnd();
    searchCity(city);
}