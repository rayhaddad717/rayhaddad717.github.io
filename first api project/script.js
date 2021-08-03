function setAction(form) {
    // form.action = "register.html";
    // var city = "New York"

    var city = document.getElementById("city").value;
    // console.log(city);

    $.getJSON("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=91d5660d430811093fe8ca300646ef76", function (data) {
        console.log(data);

        var icon = "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
        var temp = Math.floor(data.main.temp);

        var weatherDescription = data.weather[0].main;

        var country = data.sys.country;

        var humidity = data.main.humidity;
        var feelsLike = Math.floor(data.main.feels_like);
        var pressure = data.main.pressure;
        var maxTemp = data.main.temp_max;
        var minTemp = data.main.temp_min;


        var flag = "http://openweathermap.org/images/flags/" + country.toLowerCase() + ".png";
        $('.icon').attr('src', icon);
        $('.weatherDescription').text(weatherDescription);
        $('.temp').text(temp + " \u00B0C");
        $('.humidity').text(humidity + "%");
        $('.feelsLike').text(feelsLike + "\u00B0C");
        $('.pressure').text(pressure + "hPa");
        $('.maxTemp').text(maxTemp + "\u00B0C");
        $('.minTemp').text(minTemp + "\u00B0C");
        $('.country').text(country);
        $('.country').attr('href', "https://google.com/search?q=country%20" + country);
        $('.flag').attr('src', flag);
        var content = document.getElementById("full");

        var fullInfo = document.getElementById("fullInfo");
        if (full.checked) {
            fullInfo.style.display = "flex";

        }
        else {
            fullInfo.style.display = "none";
        }




    });



    return false;
}
