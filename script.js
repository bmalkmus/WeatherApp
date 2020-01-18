let citySearch
let searchHistory
let historyList
let date = moment().format("MM/DD/YYYY")
let forecast

if (!localStorage.getItem("city")) {
    
    searchHistory = []
    
    localStorage.setItem('cities', JSON.stringify(searchHistory));
};

function listUpdate(){
$('#search-results').empty();
historyList = JSON.parse(localStorage.getItem("cities"));
historyList = $(historyList).slice(-10);
    for (i = 0; i < historyList.length; i++){
        $('#search-results').prepend(historyList[i]+"<hr>");
    }
};


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
  
function currentInfo(){
    let queryURLCurrent = "https://api.openweathermap.org/data/2.5/weather?q=" + citySearch +"&units=imperial&appid=945dc48fe14dbea48344eae4427f193e"
    $.ajax({
        url: queryURLCurrent,
        method: "GET"
      })
      
    .then(function(response) {
          currentIcon = $('<img>')
          currentIcon.attr("src", "http://openweathermap.org/img/wn/"+response.weather[0].icon+"@2x.png");
          let currentSelection = $("<h3>").text(citySearch + " (" + date +")");
          let temperature = $('<p>').text("Temperature: " + response.main.temp + " &#8457;")
          let windspeed = $('<p>').text("Windspeed: " + response.wind.speed + " MPH")
            let humidity = $('<p>').text("Humidity:  " + response.main.humidity + "%")
            $('#current-info').empty();
          $('#current-info').append(currentSelection);
          $('#current-info').append(temperature);
          $('#current-info').append(humidity);
          $('#current-info').append(windspeed);


    })}

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
            let dateFC = moment(this.dt_txt, "YYYY-MM-DD hh:mm:ss").format("MM/DD/YY");
            let Icon = $('<img>');
            Icon.attr("src", "http://openweathermap.org/img/wn/"+this.weather[0].icon+"@2x.png");
            let foreTemp = $('<p>').text("Temperature: " + this.main.temp + " &#8457;");
            let foreHumidity = $('<p>').text("Humidity:  " + this.main.humidity + "%")
            $(dailyDiv).append(dateFC);
            $(dailyDiv).append(Icon);
            $(dailyDiv).append(foreTemp);
            $(dailyDiv).append(foreHumidity);
            $("#5-day").append(dailyDiv);


    })
})
      }

listUpdate();
