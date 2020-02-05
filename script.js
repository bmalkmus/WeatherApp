$(document).ready(function(){

let citySearch
let searchHistory
let historyList
let date = moment().format("MM/DD/YYYY")
let forecast

if (!localStorage.getItem("city")) {
    
    searchHistory = []
    
    localStorage.setItem('cities', JSON.stringify(searchHistory));
};

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(successFunction, errorFunction);
}

else{
    alert("Geolocation is not allowed")
} 

function successFunction(position) {
    let lat = position.coords.latitude;
    let long = position.coords.longitude;
    let loadCurrent = "https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+long+"&units=imperial&appid=945dc48fe14dbea48344eae4427f193e";
    let CurrentUV = "https://api.openweathermap.org/data/2.5/uvi?appid=945dc48fe14dbea48344eae4427f193e&lat="+lat+"&lon="+long
    $.ajax({
        url: loadCurrent,
        method: "GET"
      })
      .then(function(response) {
        currentIcon = $('<img>')
          currentIcon.attr("src", "http://openweathermap.org/img/wn/"+response.weather[0].icon+"@2x.png");
          let currentSelection = $("<h3>").text("Current Location (" + date +")");
          let temperature = $('<p>').html("Temperature: " + response.main.temp + " &#8457;")
          let windspeed = $('<p>').text("Windspeed: " + response.wind.speed + " MPH")
            let humidity = $('<p>').text("Humidity:  " + response.main.humidity + "%")
            $('#current-info').empty();
            currentSelection.append(currentIcon);
          $('#current-info').append(currentSelection);
          $('#current-info').append(temperature);
          $('#current-info').append(humidity);
          $('#current-info').append(windspeed);
      })
      $.ajax({
        url: CurrentUV,
        method: "GET"})
      
        .then(function(response) {
         let uv = $('<p>').text("UV index: "+response.value);
         $('#current-info').append(uv);
        });

    
    let loadFore = "https://api.openweathermap.org/data/2.5/forecast?lat="+lat+"&lon="+long+"&units=imperial&appid=945dc48fe14dbea48344eae4427f193e";
    $.ajax({
        url: loadFore,
        method: "GET"
      })
      .then(function(response) {
        forecast = [];
        for(i = 4; i < response.list.length; i+=8){
            forecast.push(response.list[i])
        }
        
        $(forecast).each(function(){
            let dailyDiv = $("<div>")
            $(dailyDiv).addClass("daily");
            let dateFC = $('<p>').text(moment(this.dt_txt, "YYYY-MM-DD hh:mm:ss").format("MM/DD/YY"));
            $(dateFC).addClass("date")
            let Icon = $('<img>');
            Icon.attr("src", "http://openweathermap.org/img/wn/"+this.weather[0].icon+"@2x.png");
            let foreTemp = $('<p>').html("Temperature: " + this.main.temp + " &#8457;");
            let foreHumidity = $('<p>').text("Humidity:  " + this.main.humidity + "%")
            $(dailyDiv).append(dateFC);
            $(dailyDiv).append(Icon);
            $(dailyDiv).append(foreTemp);
            $(dailyDiv).append(foreHumidity);
            $("#5-day").append(dailyDiv);

    })
})
    


}

function errorFunction(error){
    switch(error.code) {
        case error.PERMISSION_DENIED:
          alert("User denied the request for Geolocation.")
          break;
        case error.POSITION_UNAVAILABLE:
          alert("Location information is unavailable.")
          break;
        case error.TIMEOUT:
          alert("The request to get user location timed out.")
          break;
        case error.UNKNOWN_ERROR:
          alert("An unknown error occurred.")
          break;
      }
}


function listUpdate(){
$('#search-results').empty();
historyList = JSON.parse(localStorage.getItem("cities"));
historyList = $(historyList).slice(-10);
    for (i = 0; i < historyList.length; i++){
        $('#search-results').prepend('<p class = "historyList">'+historyList[i]+"</p> <hr>");
    }
};

function currentInfo(){
    let queryURLCurrent = "https://api.openweathermap.org/data/2.5/weather?q=" + citySearch +"&units=imperial&appid=945dc48fe14dbea48344eae4427f193e"
    let lat 
    let long
    let searchUV = "http://api.openweathermap.org/data/2.5/uvi?appid=945dc48fe14dbea48344eae4427f193e&lat="+lat+"&lon="+long

    $.ajax({
        url: queryURLCurrent,
        method: "GET"
      })
      
    .then(function(response) {
          currentIcon = $('<img>')
          currentIcon.attr("src", "http://openweathermap.org/img/wn/"+response.weather[0].icon+"@2x.png");
          let currentSelection = $("<h3>").text(citySearch + " (" + date +")");
          let temperature = $('<p>').html("Temperature: " + response.main.temp + " &#8457;")
          let windspeed = $('<p>').text("Windspeed: " + response.wind.speed + " MPH")
            let humidity = $('<p>').text("Humidity:  " + response.main.humidity + "%")
            $('#current-info').empty();
            currentSelection.append(currentIcon);
          $('#current-info').append(currentSelection);
          $('#current-info').append(temperature);
          $('#current-info').append(humidity);
          $('#current-info').append(windspeed);
          
          lat = response.coord.lat;
          long = response.coord.lon;

          let searchUV = "http://api.openweathermap.org/data/2.5/uvi?appid=945dc48fe14dbea48344eae4427f193e&lat="+lat+"&lon="+long;

          $.ajax({
            url: searchUV,
            method: "GET"})
          
            .then(function(response) {
             let uv = $('<p>').text("UV index: "+response.value);
             $('#current-info').append(uv);
            });

    })

}
  
  function forecastInfo(){
          let queryURLFiveDay = "https://api.openweathermap.org/data/2.5/forecast?q=" + citySearch + "&units=imperial&appid=945dc48fe14dbea48344eae4427f193e"
          $.ajax({
          url: queryURLFiveDay,
          method: "GET"
        })
        
        .then(function(response) {
          forecast = [];
          for(i = 4; i < response.list.length; i+=8){
              forecast.push(response.list[i])
          }
          
          $(forecast).each(function(){
              let dailyDiv = $("<div>")
              $(dailyDiv).addClass("daily")
              let dateFC = $('<p>').text(moment(this.dt_txt, "YYYY-MM-DD hh:mm:ss").format("MM/DD/YY"));
              $(dateFC).addClass("date")
              let Icon = $('<img>');
              Icon.attr("src", "http://openweathermap.org/img/wn/"+this.weather[0].icon+"@2x.png");
              let foreTemp = $('<p>').html("Temperature: " + this.main.temp + " &#8457;");
              let foreHumidity = $('<p>').text("Humidity:  " + this.main.humidity + "%")
              $(dailyDiv).append(dateFC);
              $(dailyDiv).append(Icon);
              $(dailyDiv).append(foreTemp);
              $(dailyDiv).append(foreHumidity);
              $("#5-day").append(dailyDiv);
  
  
      })
  })
}

$("#search").click(function(){
    citySearch = $("#city-search").val()
    localStorage.setItem('city', citySearch);
    searchHistory = JSON.parse(localStorage.getItem("cities"));
    searchHistory.push(citySearch);
    localStorage.setItem('cities', JSON.stringify(searchHistory));
    $("#5-day").empty();
    listUpdate();
    currentInfo();
    forecastInfo();
})

$("#search-results").on('click',".historyList", function(){
  citySearch = $(this).text();
  $('#5-day').empty();
  currentInfo();
  forecastInfo();
  
})

listUpdate();

})
