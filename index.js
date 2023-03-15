import useApiKey from './key.js';
import getCountryName from './ico.js'

document.getElementById("weatherButton").addEventListener("click", getWeather)
const display = document.getElementById('weatherContainer')


function getWeather() {
  const location = document.getElementById("locationInput").value;
  const apiKey = useApiKey()
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;
  
  try {
    fetch(apiUrl)
      .then(response => response.json()) 
      .then(data => {
        if (data.cod == '400') {
          if (data.message == 'Nothing to geocode') {
            display.textContent = 'Provide the location!'
          }
        } else if (data.cod == '404') {
          if (data.message == 'city not found') {
            display.textContent = 'Enter valid city name!'
          }
        }
        const {name, weather, main, sys} = data
        const {description, icon} = weather[0]
        const {temp} = main
        const {country} = sys

        const weatherText = `
         <div>
            <p>
              <span style='font-size: 1.8rem;'>${name}, </span>
              <br>
              <span style='font-size: 1.3rem;'> ${getCountryName(country)}</span>
            </p>
            <img src='https://openweathermap.org/img/wn/${icon}@2x.png'>
          </div>
          <div class="weather-details">
            <p>${description}</p>
            <p style="font-size: 1.9rem">${Math.floor(temp)}°C</p>
          </div>
        `
        display.innerHTML = weatherText
      })
  } catch(e) {
    console.log('error', e)
  }
}







