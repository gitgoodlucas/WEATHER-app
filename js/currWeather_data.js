let weather = {
    "apiKey": "d4b96a3f1132c0a611af52c634abf1da",
    fetchWeather: function (city) {
        fetch(
            "http://api.openweathermap.org/data/2.5/weather?q="
            + city 
            + "&units=metric&appid=" 
            + this.apiKey
            )
        // Once the url is fetched, will get the response and put into data json format.
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            window.alert("City not found...");
        })
        .then((data) => {
            this.displayWeather(data);
        })
        .catch((error) => {
            console.log(error)
        });
    },

    displayWeather: function(data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        const { country } = data.sys;
        console.log(name,icon,description,temp,humidity,speed);

        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon +".png";
        document.querySelector(".temperature").innerText = parseInt(temp) + " °C";
        document.querySelector(".description").innerText = description;
        document.querySelector(".humidity").innerText = "Humidity: " + parseInt(humidity) + "%";
        document.querySelector(".wind").innerText = "Wind Speed: " + speed + " km/h";
        document.querySelector(".country").innerHTML = country;
        document.querySelector(".weather").classList.remove("loading");
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1920x1080/?" + name + " city" + "')"
    },
    // Searches for the value added into the search-bar text box.
    search: function () {
        this.fetchWeather(document.querySelector(".search-bar").value);
    }
};

let geocode = {
    reverseGeocode: function(latitude, longitude) {
        var api_key = 'e52a83ab87744023bba2f482c35085ff';

        var api_url = 'https://api.opencagedata.com/geocode/v1/json'

        var request_url = api_url
            + '?'
            + 'key=' + api_key
            + '&q=' + encodeURIComponent(latitude + ',' + longitude)
            + '&pretty=1'
            + '&no_annotations=1';

        // see full list of required and optional parameters:
        // https://opencagedata.com/api#forward

        var request = new XMLHttpRequest();
        request.open('GET', request_url, true);

        request.onload = function() {

            if (request.status === 200){ 
            // Success!
            var data = JSON.parse(request.responseText);
            weather.fetchWeather(data.results[0].components.city);

            } else if (request.status <= 500){ 
            // We reached our target server, but it returned an error
            console.log("unable to geocode! Response code: " + request.status);
            var data = JSON.parse(request.responseText);
            console.log('error msg: ' + data.status.message);
            } else {
            console.log("server error");
            }
        };

        request.onerror = function() {
            // There was a connection error of some sort
            console.log("unable to connect to server");        
        };

        request.send();  // make the request
    },
    getLocation: function () {
        function success(data){
            geocode.reverseGeocode(data.coords.latitude, data.coords.longitude);
        }
        if (navigator.geolocation){
            navigator.geolocation.getCurrentPosition(success, console.error);
        }
        else{
            weather.fetchWeather("Praia Grande");
        }
    }
};

document
.querySelector(".search button")
.addEventListener("click", function () {
    weather.search();
});

// Event listener to check if the enter key is pressed.
document.querySelector(".search-bar").addEventListener("keyup", function(event) {
    if (event.key == "Enter") {
        weather.search();
    }
});

// Call the getlocation function, if fails, gets the default fetch value
geocode.getLocation();