const container = document.querySelector('.container');
const searchBar = document.querySelector('.search-bar');
const searchBtn = document.querySelector('.search-btn');
const langES = document.getElementById('lang-es');
const langEN = document.getElementById('lang-en');
const langMenu = document.querySelector('.lang-menu');

searchBtn.addEventListener('click', requestData);
searchBar.addEventListener('keyup', e => {
    if (e.key === 'Enter') {
        requestData();
    };
    return;
});

function requestData() {
    fetchData(`https://api.openweathermap.org/data/2.5/weather?q=${searchBar.value}&appid=${'943f9308085199b2e6b2c5c8dbabd19c'}&units=metric&lang=${localStorage.lang}`);
        searchBar.value = '';
}

navigator.geolocation.getCurrentPosition(success => {
    const { latitude, longitude } = success.coords;
    fetchData(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${'943f9308085199b2e6b2c5c8dbabd19c'}&units=metric&lang=${localStorage.lang}`);
}, error => {
    console.log(error);
});

function fetchData(api) {
    fetch(api)
        .then(res => res.json())
        .then(data => {
            modifyData(data);
            container.classList.add('visible');
        });

}

function modifyData(data) {
    const { name, weather, main, wind } = data;
    const { temp } = data.main;
    const { country } = data.sys;
    document.querySelector('.country').textContent = `${name}, ${country}`;
    document.querySelector('.temperature').textContent = `${Math.round(main.temp)}°C`;
    document.querySelector('.weather-icon').src = `http://openweathermap.org/img/wn/${weather[0].icon}.png`;
    document.querySelector('.weather-text').textContent = `${weather[0].description}`;
    document.querySelector('.wind').textContent = `${wind.speed}`;
    document.querySelector('.humidity').textContent = `${main.humidity}`;

    // Title and Icon Tab
    document.getElementById('head-title').textContent = `Weather App | ${name}, ${country}`;
    document.getElementById('head-icon').href = `http://openweathermap.org/img/wn/${weather[0].icon}.png`;
}


// TODO: Add History.
// TODO: Add Translation to Spanish

langMenu.value = localStorage.lang || 'en';

function getSelectedValue() {

    if (langMenu.value === 'en') {
        localStorage.lang = 'en';
    }
    else if (langMenu.value === 'es') {
        localStorage.lang = 'es';
        document.querySelector('.lang').children[0].textContent = 'Idioma';
        document.querySelector('.search-bar').placeholder = 'Introduce una Ciudad';
    }
}

langMenu.addEventListener('change', () => {
    getSelectedValue();
    document.location.reload();
});
getSelectedValue();
