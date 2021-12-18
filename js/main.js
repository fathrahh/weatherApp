const appKey = 'APIKEY';
const city = document.querySelector('.search-city');
const btnSearch = document.querySelector('.btn-search');
const cards = document.querySelector('.card-1');
const card2 = document.querySelector('.card-2');

btnSearch.addEventListener('click', async () => {
    try {
        const response = await fetchCurrentWeather(city.value);
        let card = updateCard(response);
        cards.innerHTML = card;
        card = cardDetail(response);
        card2.innerHTML = card;
    } catch (e) {
        console.log(e);
    }
});

function fetchCurrentWeather(city) {
    return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${appKey}&lang=id`)
        .then(response => {
            if (!response.ok) {
                throw new Error("ada yang salah");
            } else {
                return response.json();
            }
        })
        .then(resp => resp)
        .catch(err => console.log(err));
}

function updateCard(response) {
    console.log(response);
    let mains = response.main;
    let cityName = response.name;
    let c = kelvinToCelcius(mains.temp);
    let desc = String(response.weather[0].description);
    let icon = response.weather[0].icon;
    let tempMax = kelvinToCelcius(mains.temp_max);
    let tempMin = kelvinToCelcius(mains.temp_min);
    desc = desc[0].toUpperCase() + desc.substr(1);
    return `<div class="card">
                <div class="content">
                    <div class="card-header">
                            <h1>${cityName}</h1>
                    </div>
                    <div class="card-body">
                        <div class="current-weather">
                            <h2>${c}°</h2>
                            <span>${desc}</span>
                        </div>
                        <div class="weather-info">
                            <img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="icon cuaca">
                            <div class="max-min-current-weather">
                                <span>${tempMax}°/${tempMin}°</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
}

function kelvinToCelcius(k) {
    return Math.floor(k - 273);
}

function cardDetail(response) {
    let mains = response.main;
    let city = response.name;
    let feelsLike = kelvinToCelcius(mains.feels_like);
    let maxTemp = kelvinToCelcius(mains.temp_max);
    let minTemp = kelvinToCelcius(mains.temp_min);
    let humidity = mains.humidity;
    let visibility = parseFloat(response.visibility / 1000);
    let pressure = mains.pressure;
    let cloud = response.clouds.all;
    let wind = response.wind.speed;


    return `<div class="card card-detail">
                <div class="card-header2">
                    <h2>Cuaca Hari Ini di ${city}</h2>
                    <div class="temp-feels">
                        <h2>${feelsLike}°</h2>
                        <span>Terasa Seperti</span>
                    </div>
                </div>
                <div class="card-body2">
                    <div class="left">
                        <div class="details first-border">
                            <div class="detail-title">
                                <i class="fas fa-exclamation"></i>
                                <span>Max-min</span>
                            </div>
                            <div class="detail-value">
                                <span>${maxTemp}°/${minTemp}°</span>
                            </div>
                        </div>
                        <div class="details border-bottom">
                            <div class="detail-title">
                                <i class="fas fa-tint"></i>
                                <span>Kelembapan</span>
                            </div>
                            <div class="detail-value">
                                <span>${humidity}%</span>
                            </div>
                        </div>
                        <div class="details border-bottom">
                            <div class="detail-title">
                                <i class="fas fa-angle-double-down"></i>
                                <span>Tekanan</span>
                            </div>
                            <div class="detail-value">
                                <span>${pressure}mb</span>
                            </div>
                        </div>
                    </div>
                    <div class="right">
                        <div class="details first-border">
                            <div class="detail-title">
                                <i class="fas fa-eye"></i>
                                <span>Jarak Pandang</span>
                            </div>
                            <div class="detail-value">
                                <span>${visibility}km</span>
                            </div>
                        </div>
                        <div class="details border-bottom">
                            <div class="detail-title">
                                <i class="fas fa-cloud"></i>
                                <span>Awan</span>
                            </div>
                            <div class="detail-value">
                                <span>${cloud}%</span>
                            </div>
                        </div>
                        <div class="details border-bottom">
                            <div class="detail-title">
                                <i class="fas fa-wind"></i>
                                <span>Angin</span>
                            </div>
                            <div class="detail-value">
                                <span>${wind}%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`
}