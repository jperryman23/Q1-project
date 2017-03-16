
    var isClicked = false;


$(document).ready(function() {

    $(".toDoList").draggable();
    $(".weather").draggable();
    $(".noName").draggable();

    $(".resizable").resizable();

    $("ul").sortable();



        var time1 = moment().utcOffset('dddd, MMMM Do YYYY, HH:MM:ss');
        console.log(time1);
        $(".time").append(time1._d)



        // var time2 = moment().utcOffset('dddd MMMM Do YYYY HH MM SS-5');
        // console.log(time2._d);
        // $(".time.2").append(time2._d)
});



$(".buttonAdd").on('click', function(){
     var task = $(".addTask").val();
     var newInput = $("#addTask").val().replace(/\s/g, "");

    $(".ulList").append("<li> <input type='checkbox' id='" + newInput +"'><label for='" + newInput + "'>" + task + "</label></li>")

    $("#addTask").val("")
});



$(function(){
  $(".checkbox").change(function(){
    if ($(this).is(':checked')) {
        $("label").css("text-decoration", "line-through")
    //    alert('You can rock now...');
} else {
    $("label").css("text-decoration", " ");
};
  });
});



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
            //   console.log(data);
              $(".city").append(data.current_observation.display_location.full);
              $(".temp").append("Temperature: " + data.current_observation.temperature_string);
              $(".icon").append("<img src='" + data.current_observation.icon_url + "'>");
            }
    })
