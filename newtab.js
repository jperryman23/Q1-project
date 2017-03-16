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

        var time1 = moment().utcOffset('dddd, MMMM Do YYYY, HH:MM:ss');
        // console.log(time1);
        $(".time").append(time1._d)

        $("#ulList").on('click', 'input', function(){

            var checkValue = $(this).attr('id');
            console.log(checkValue)
            $("label[for=" + checkValue + "]").toggleClass("cssStyle");
            // $('label').toggleClass("cssStyle");
        })

        // var time2 = moment().utcOffset('dddd MMMM Do YYYY HH MM SS-5');
        // console.log(time2._d);
        // $(".time.2").append(time2._d)

        var now = new Date(Date.now());
        var formatted = now.getDate() + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
        console.log(formatted);
        $("h4").append("Clock: " + formatted);
});



$(".buttonAdd").on('click', function(){
     var task = $(".addTask").val();
     var newInput = $("#addTask").val().replace(/\s/g, "");

    $(".ulList").append("<li> <input type='checkbox' id='" + newInput +"'><label for='" + newInput + "'>" + task + "</label></li>")

    $("#addTask").val("")
});



// $(function(){
//   $(".checkbox").change(function(){
//     if ($(this).is(':checked')) {
//         $("label").css("text-decoration", "line-through")
//     //    alert('You can rock now...');
// } else {
//     $("label").css("text-decoration", " ");
// };
//   });
// });



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
            error: function(){
                alert('An error has occurred');
            },
            success: function(data){
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
                error: function(){
                    alert('An error has occurred');
                },
                success: function(data){
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
