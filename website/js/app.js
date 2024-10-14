const weatherApiKey ='10a27c1f0f25a1172eeff705e886b292'



const baseUrl = 'https://api.openweathermap.org/data/2.5/weather'

const cityName = document.getElementById('cityInput');
const generate = document.getElementById('generate');



const resultCard = document.querySelector('.result');


const cityValue = document.getElementById('cityName');
const temperature = document.getElementById('temperature');
const description = document.getElementById('description');
const humidity = document.getElementById('humidity');
const date = document.getElementById('date');

const zipData = document.getElementById('zip-text');
const feelingData = document.getElementById('feeling-text');

const wind = document.getElementById('wind');

//openweather.org
const getWeatherData = async (baseUrl,city,key) => {

    try {
        const response = await fetch(`${baseUrl}?q=${city}&appid=${key}`)
        const data = await response.json()
        return data
        
    } catch (error) {
        console.error('Error fetching data:', error)
        
    
    }
}

const storeData = async(userRes,date,temperature) => {
     
    //making post reauest to our express backend
    const response = await fetch('api/weather', {
        method: 'POST', 
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            userRes,
            date,
            temperature
        })
    })
    
    }


//our own API
const getDataFromApi = async() => {
    const data = await fetch('api/weather',{
        method: 'GET',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    
    const weatherData = await data.json();
    return weatherData;
}
const handleClick = async() => {
    const city = cityName.value.trim();
    
    if (!city) {
        alert('Please enter a city name');
        return;
    }


function updateUi(data){
    console.log(data)
    cityValue.querySelector('span').innerText = data.userResult.name;
    const span = temperature.querySelector('span')
    span.innerText = `${data.temperature}${span.innerText}`;
    date.querySelector('span').innerText = data.date;

    description.querySelector('span').innerText = data.userResult.weather[0].description;
    description.querySelector('span').innerText = data.userResult.weather[0].description;

    humidity.querySelector('span').innerText = data.userResult.main.humidity + '%';
    wind.querySelector('span').innerText = ` ${data.userResult.wind.speed}/kph`;

    zipData.querySelector('span').innerText = data.userResult.zipcode;

    feelingData.querySelector('span').innerText = data.userResult.feeling;

    resultCard.style.display = 'block'
}

getWeatherData(baseUrl, city, weatherApiKey).then(data => {
    const { name, main:{temp}, dt } = data;
    const date = new Date(dt * 1000).toLocaleString();
    const temperature = Math.round(temp - 273.15);

    const zip = document.getElementById('zip').value;
    const feeling = document.getElementById('feeling').value;
    storeData({...data,zipcode:zip,feeling:feeling}, date, temperature)
    .then(() => getDataFromApi())
    .then(data => updateUi(data));

    })
}
//adding an event listener to the generate button
generate.addEventListener('click',handleClick);