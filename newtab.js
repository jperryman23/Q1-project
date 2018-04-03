var isClicked = false;
// var elem = document.querySelector('.dropdown-trigger');
// var instance = M.Dropdown.getInstance(elem);


$(document).ready(function() {
    $("#textarea").val(localStorage.getItem('text'));

    // $('.dropdown-trigger').dropdown();

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

        checkList[checkValue]["status"] = $(this)[0].checked;
        checkListSave()
    })

    $('.changeBackground').click(function() {
      getImage();
    })

});

$("#textarea").on('keyup', function(event){
    localStorage.setItem('text', $("#textarea").val())
    // console.log($("#textarea").val());
})

// --------- LOCAL STORAGE ON CHECKBOXES --------------


// var taskItems = document.getElementsByClassName("taskItems");
// console.log(taskItems[1]);
//
// console.log(taskItems[0].visible = 'hidden');
//
// //TODO: each element in the array IS an element in the html.
// //they are not strings they are html elements.
// taskItems[0].style.visibility = 'hidden';

// var checks = "[";
// for (var i = 0; i < ulList.length; i++) {
//
// }
//               {"id:" + addTask +,"val" }
//               {"label:" + id +,"val" }
//               {"checkValue:" + id +,"val" }
//              ];

var checkList = {
}
console.log(checkList);

function checkListSave(){
    localStorage.setItem('checklist', JSON.stringify(checkList))
}


function getImage(){
  var options = ['images/background-image.jpg', 'images/flamenco-beach.jpeg', 'images/south-africa.jpg', 'images/costa-rica.jpg'];
  var random = Math.floor(Math.random() * options.length)
  var newBackground = options[random]
  $('body').css({'background-image': 'url(' + newBackground + ')'})
  };





$(".buttonAdd").on('click', function() {
    var task = $(".addTask").val();
    var newInput = $("#addTask").val().replace(/\s/g, "");

    $(".ulList").append("<li class='taskItem'> <input type='checkbox' id='" + newInput + "'><label for='" + newInput + "'>" + task + "</label></li>")

    $("#addTask").val("")

    checkList[newInput] = {
        label: newInput,
        status: false

    }

    checkListSave()
});




$("body").mousemove(function(event) { // console.log(event);
    if (!isClicked) {
        var mouseX = event.clientX
        // console.log(mouseX);
        var windowWidth = $(window).width()
        var percent = (mouseX / windowWidth) * 100
        //  console.log(percent);

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
        //    console.log(data.articles["2"]);

// "<img src='" + "http:" + data.articles["0"].urlToImage + "' height='60px' width='60px'>")
        $(".newsImage").append(
            "<img src='" + data.articles["0"].urlToImage + "' height='60px' width='60px'>")

        // $(".newTitle").append(data.articles["0"].title)

        $(".newDesc").append(data.articles["0"].description + "<a href='" + data.articles["0"].url + "'>" + " read more >> " + "</a>")

        $(".newsImage2").append(
            "<img src='"  + data.articles["1"].urlToImage + "' height='60px' width='60px'>")

        $(".newDesc2").append(data.articles["1"].title + "<a href='" + data.articles["1"].url + "'>" + " read more >> " + "</a>")

        $(".newsImage3").append(
            "<img src='"  + data.articles["2"].urlToImage + "' height='60px' width='60px'>")

        $(".newDesc3").append(data.articles["2"].title + "<a href='" + data.articles["2"].url + "'>" + " read more >> " + "</a>")

        $(".newsImage4").append(
            "<img src='" + data.articles["3"].urlToImage + "' height='60px' width='60px'>")

        $(".newDesc4").append(data.articles["3"].title + "<a href='" + data.articles["3"].url + "'>" + " read more >> " + "</a>")

        $(".newsImage5").append(
            "<img src='" + data.articles["4"].urlToImage + "' height='60px' width='60px'>")

        $(".newDesc5").append(data.articles["4"].title + "<a href='" + data.articles["4"].url + "'>" + " read more >> " + "</a>")

    }
})




//SLOW LOOP TO RUN AJAX REQUEST SEQUENTIALLY AT X INTREVALS
function getWeather(url, city) {
    return {
        url: url,
        city: city
    }
}

var weatherObjects = [getWeather('http://api.timezonedb.com/v2/get-time-zone?key=MG52BKMUNLKS&format=json&by=zone&zone=America/New_York', '.NYC'),
    getWeather('http://api.timezonedb.com/v2/get-time-zone?key=MG52BKMUNLKS&format=json&by=zone&zone=America/Argentina/Buenos_Aires', '.BA'),
    getWeather('http://api.timezonedb.com/v2/get-time-zone?key=MG52BKMUNLKS&format=json&by=zone&zone=Europe/London', '.London'),
    getWeather('http://api.timezonedb.com/v2/get-time-zone?key=MG52BKMUNLKS&format=json&by=zone&zone=Europe/Paris', '.Paris'),
    getWeather('http://api.timezonedb.com/v2/get-time-zone?key=MG52BKMUNLKS&format=json&by=zone&zone=Australia/Brisbane', '.Brisbane'),
    getWeather('http://api.timezonedb.com/v2/get-time-zone?key=MG52BKMUNLKS&format=json&by=zone&zone=Asia/Shanghai', '.Shanghai'),
];

// console.log(weatherObjects);
let weatherObjectsIndex = 0

function loopSlow() {
    makeCall(weatherObjects[weatherObjectsIndex]);
    weatherObjectsIndex = weatherObjectsIndex + 1
    if (weatherObjectsIndex < 6) {
        setTimeout(loopSlow, 2000)
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
