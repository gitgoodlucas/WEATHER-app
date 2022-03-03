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
        .then((response) => response.json())
        .then((data) => this.displayWeather(data));
    },
    displayWeather: function(data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        console.log(name,icon,description,temp,humidity,speed);

        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon +".png";
        document.querySelector(".temperature").innerText = parseInt(temp) + " °C";
        document.querySelector(".description").innerText = description;
        document.querySelector(".humidity").innerText = "Humidity: " + parseInt(humidity) + "%";
        document.querySelector(".wind").innerText = "Wind Speed: " + speed + " km/h";
        document.querySelector(".weather").classList.remove("loading");
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1920x1080/?" + name + "city" + "')"
    },
    // Searches for the value added into the search-bar text box.
    search: function () {
        this.fetchWeather(document.querySelector(".search-bar").value);
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

// TODO: Event listener to check if the city is inexistent.
// TODO: Display country flags.
//

// Waits the page to be fully loaded to call the fetchWeather.
weather.fetchWeather("Praia Grande");