var isClicked = false;


$(document).ready(function() {

    $(".toDoList").draggable();
    $(".weather").draggable();
    $(".noNews").draggable();
    $(".notes").draggable();

    $(".resizable").resizable();

    $("ul").sortable();

    $('#textarea1').val('New Text');
    $('#textarea1').trigger('autoresize');


    var myTime = moment().format('LLLL'); // dddd MMMM do, YYYY h:mm:ss a
    $("h5").append(myTime);


    // var time1 = moment().utcOffset('dddd, MMMM Do YYYY, HH:MM:ss');
    // // console.log(time1);
    // $(".time").append(time1._d)


    // var moment = require('moment-timezone');
    // moment().tz("America/Los_Angeles").format();
    // var mytime = moment().tz("America/Los_Angeles").format();
    // console.log(mytime);



    $("#ulList").on('click', 'input', function() {
        var checkValue = $(this).attr('id');
        // console.log(checkValue)
        $("label[for=" + checkValue + "]").toggleClass("cssStyle");
        // $('label').toggleClass("cssStyle");
    })





});



$(".buttonAdd").on('click', function() {
    var task = $(".addTask").val();
    var newInput = $("#addTask").val().replace(/\s/g, "");

    $(".ulList").append("<li> <input type='checkbox' id='" + newInput + "'><label for='" + newInput + "'>" + task + "</label></li>")

    $("#addTask").val("")
});



$("body").mousemove(function(event) {
    // console.log(event);
    if (!isClicked) {
        var mouseX = event.clientX
        // console.log(mouseX);
        var windowWidth = $(window).width()
        var percent = (mouseX / windowWidth) * 100
        // console.log(percent);

        $("body").css("background-position", percent + '%')
    }
});



$("body").mousedown(function() {
    isClicked = true;
    // console.log("clicked");
});

$("body").mouseup(function() {
    isClicked = false;
    // console.log("is off");
});



$.ajax({
    url: 'http://api.wunderground.com/api/59d1d82f8ef55eeb/conditions/q/CO/Denver.json',
    type: 'GET',
    data: {
        format: 'json'
    },
    error: function() {
        alert('An error has occurred');
    },
    success: function(data) {
        //    console.log(data);
        $(".city").append(data.current_observation.display_location.full);
        $(".temp").append("Temperature: " + data.current_observation.temperature_string);
        $(".icon").append("<img src='" + data.current_observation.icon_url + "'>");
    }
});

$.ajax({
    url: 'http://api.wunderground.com/api/59d1d82f8ef55eeb/forecast10day/q/CO/Denver.json',
    type: 'GET',
    data: {
        format: 'json'
    },
    error: function() {
        alert('An error has occurred');
    },
    success: function(data) {
        //   console.log(data);
        $(".conditionsToday").append(data.forecast.simpleforecast.forecastday["0"].conditions);
        $(".conditionsTomorrow").append(data.forecast.txt_forecast.forecastday[2].fcttext);
        $(".weekday.nextDay").append(data.forecast.txt_forecast.forecastday[2].title);
        $(".iconTomorrow").append("<img src='" + data.forecast.txt_forecast.forecastday[2].icon_url + "'>");

        $(".conditionsPlusTwo").append(data.forecast.txt_forecast.forecastday[4].fcttext);
        $(".weekday.plusTwo").append(data.forecast.txt_forecast.forecastday[4].title);
        $(".iconPlusTwo").append("<img src='" + data.forecast.txt_forecast.forecastday[4].icon_url + "'>");

        //   $(".temp").append("Temperature: " + data.current_observation.temperature_string);
        //   $(".icon").append("<img src='" + data.current_observation.icon_url + "'>");
    }
})

$.ajax({
    url: 'https://newsapi.org/v1/articles?source=cnn&sortBy=top&apiKey=3286922d938b4e6bb9e32cb1b3e3b57e',
    type: 'GET',
    data: {
        format: 'json'
    },
    error: function() {
        alert('An error has occurred');
    },
    success: function(data) {
        //   console.log(data.articles["0"]);

        $(".newsImage").append(
            "<img src='" + data.articles["0"].urlToImage + "' height='75px' width='75px'>")
        //  $(".col.s9.test").append(data.articles["0"].title),
        $(".newDesc").append(data.articles["0"].description)


        $(".newsImage2").append(
            "<img src='" + data.articles["1"].urlToImage + "' height='75px' width='75px'>")
        //  $(".col.s9.test").append(data.articles["0"].title),
        $(".newDesc2").append(data.articles["1"].description)

        $(".newsImage3").append(
            "<img src='" + data.articles["2"].urlToImage + "' height='75px' width='75px'>")
        //  $(".col.s9.test").append(data.articles["0"].title),
        $(".newDesc3").append(data.articles["2"].description)

        $(".newsImage4").append(
            "<img src='" + data.articles["3"].urlToImage + "' height='75px' width='75px'>")
        //  $(".col.s9.test").append(data.articles["0"].title),
        $(".newDesc4").append(data.articles["3"].description)

    }
})

// var time1 = moment().utcOffset('dddd, MMMM Do YYYY, HH:MM:ss');
// // console.log(time1);
// $(".time").append(time1._d)

// TIME - NEW YORK CITY

//SLOW LOOP TO RUN AJAX REQUEST SEQUENTIALLY AT X INTREVALS
function getWeather(url, city){
    return {
        url: url,
        city: city
    }
}

var weatherObjects =
[getWeather('http://api.timezonedb.com/v2/get-time-zone?key=MG52BKMUNLKS&format=json&by=zone&zone=America/New_York', '.NYC'),
getWeather('http://api.timezonedb.com/v2/get-time-zone?key=MG52BKMUNLKS&format=json&by=zone&zone=America/Argentina/Buenos_Aires','.BA'),
getWeather('http://api.timezonedb.com/v2/get-time-zone?key=MG52BKMUNLKS&format=json&by=zone&zone=Europe/London', '.London'),
getWeather('http://api.timezonedb.com/v2/get-time-zone?key=MG52BKMUNLKS&format=json&by=zone&zone=Europe/Paris', '.Paris'),
getWeather('http://api.timezonedb.com/v2/get-time-zone?key=MG52BKMUNLKS&format=json&by=zone&zone=Australia/Brisbane', '.Brisbane'),
getWeather('http://api.timezonedb.com/v2/get-time-zone?key=MG52BKMUNLKS&format=json&by=zone&zone=Asia/Shanghai', '.Shanghai'),
];

// console.log(weatherObjects);
let weatherObjectsIndex = 0
function loopSlow(){
    makeCall(weatherObjects[weatherObjectsIndex]);
        weatherObjectsIndex = weatherObjectsIndex + 1
        if (weatherObjectsIndex < 6) {
            setTimeout(loopSlow, 1100)
        }
};
loopSlow();

function makeCall(weatherObject) {
    $.ajax({
        url: weatherObject.url,
        type: 'GET',
        data: {
            format: 'json'
        },
        error: function() {
            alert('An error has occurred');
        },
        success: function(data) {
             $(weatherObject.city).append(data.formatted + " " + data.abbreviation);
        }
    });
}



// $.ajax({
//     url: 'http://api.timezonedb.com/v2/get-time-zone?key=MG52BKMUNLKS&format=json&by=zone&zone=America/New_York',
//     type: 'GET',
//     data: {
//         format: 'json'
//     },
//     error: function() {
//         alert('An error has occurred');
//     },
//     success: function(data) {
//          $(".NYC").append(data.formatted + " " + data.abbreviation);
//     }
// });
//
// // TIME - BUENOS AIRES
// $.ajax({
//     url: 'http://api.timezonedb.com/v2/get-time-zone?key=MG52BKMUNLKS&format=json&by=zone&zone=America/Argentina/Buenos_Aires',
//     type: 'GET',
//     data: {
//         format: 'json'
//     },
//     error: function() {
//         alert('An error has occurred');
//     },
//     success: function(data) {
//          $(".BA").append(data.formatted + " " + data.abbreviation);
//     }
// });
//
// // TIME - LONDON, UNITED KINGDOM
// $.ajax({
//     url: 'http://api.timezonedb.com/v2/get-time-zone?key=MG52BKMUNLKS&format=json&by=zone&zone=Europe/London',
//     type: 'GET',
//     data: {
//         format: 'json'
//     },
//     error: function() {
//         alert('An error has occurred');
//     },
//     success: function(data) {
//          $(".London").append(data.formatted + " " + data.abbreviation);
//     }
// });
