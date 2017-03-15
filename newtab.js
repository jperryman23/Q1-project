$(document).ready(function() {
    $(".toDoList").draggable();
    $(".weather").draggable();
    $(".noName").draggable();


        // $("body").css("background-position" , "0%")
});

// var time = moment().utcOffset('dddd MMMM Do YYYY HH MM SS+8')
// console.log(time._d);

$( function() {
  $( ".resizable" ).resizable();
} );

var isClicked = false;


$("body").mousemove(function(event){
// console.log(event);
if(!isClicked){
    var mouseX = event.clientX
    // console.log(mouseX);
    var windowWidth = $(window).width()
    var percent = (mouseX / windowWidth) * 100
    // console.log(percent);

    $("body").css("background-position" , percent +'%')
}
});

$("body").mousedown(function(){
    isClicked = true;
    // console.log("clicked");
});

$("body").mouseup(function(){
    isClicked = false;
    // console.log("is off");
});



$.ajax({
        url: 'http://api.wunderground.com/api/59d1d82f8ef55eeb/conditions/q/CO/Denver.json',
        type: 'GET',
        data: {
            format: 'json'
        },
        error: function(){
            alert('An error has occurred');
        },
        success: function(data){
              console.log(data);
              $(".city").append(data.current_observation.display_location.full);
              $(".temp").append("Temperature: " + data.current_observation.temperature_string);
              $(".icon").append("<img src='" + data.current_observation.icon_url + "'>");
            }
    })
