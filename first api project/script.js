function setAction(form) {
    // form.action = "register.html";
    // var city = "New York"

    var city = document.getElementById("city").value;
    // console.log(city);

    $.getJSON("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=91d5660d430811093fe8ca300646ef76", function (data) {
        // console.log(data);

        var icon = "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
        var temp = Math.floor(data.main.temp);

        var weather = data.weather[0].main;
        if (jQuery.isEmptyObject({ data })) {
            alert("hello");

        }
        $('.icon').attr('src', icon);
        $('.weather').text(weather);
        $('.temp').text(temp + " \u00B0C");

    });



    return false;
}
