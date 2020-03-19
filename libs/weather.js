var APIKeys = new Object();
APIKeys.Default = '05cfc2f770266767738359e67d01e979';

var getPosition = function(options) {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
}

var getCurrentWeather = function(latitude, longitude) {
    return new Promise((resolve, reject) => {
        var res = new Object();
        var xhr = new XMLHttpRequest();

        var getUrl = 'https://api.openweathermap.org/data/2.5/weather';
        getUrl += '?lat=' + latitude;
        getUrl += '&lon=' + longitude;
        getUrl += '&appid=' + APIKeys.Default;

        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {  // complete
                if (xhr.status === 200) {   // success
                    res = JSON.parse(xhr.responseText);

                    resolve(res);
                } else {    // fail
                    reject("ERROR(" + getUrl + '): failed: xhr.status = ' + xhr.status);
                }
            } else {
                // in communication
            }
        }

        xhr.open('GET', getUrl, true);
        xhr.send();
    });
}

var setWeatherDOM = function(weatherForm) {
    console.log(weatherForm);

    var weatherNode = document.getElementById('weather');
    (weatherNode.getElementsByClassName('name'))[0].innerText = weatherForm.name;
    (weatherNode.getElementsByClassName('temp'))[0].innerText = weatherForm.temp;
    (weatherNode.getElementsByClassName('weather'))[0].innerText = weatherForm.weather;

    return 0;
}

var setWeather = function() {
    getPosition().then(
        response => {
            var latitude = response.coords.latitude;
            var longitude = response.coords.longitude;
    
            latitude.toFixed(2);
            longitude.toFixed(2);
    
            return getCurrentWeather(latitude, longitude);
        },
    
        error => {
            console.log(error);
        }
    ).then(
        response => {
            var weatherForm = new Object();
            weatherForm.name = response.name;
            weatherForm.temp = Math.round(response.main.temp - 273.15) + '\xB0';
            weatherForm.weather = response.weather[0].main;;
    
            setWeatherDOM(weatherForm);
        },
    
        error => {
            console.log(error);
        }
    )
}

setWeather();


document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('weather').addEventListener('click', function() {
        setWeather();
    }, false)
});