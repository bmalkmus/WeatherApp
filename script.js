let citySearch
let searchHistory
let historyList


if (!localStorage.getItem("city")) {
    
    searchHistory = []
    
    localStorage.setItem('cities', JSON.stringify(searchHistory));
};
function listUpdate(){
$('#search-results').empty();
historyList = JSON.parse(localStorage.getItem("cities"));
    for (i = 0; i < historyList.length; i++){
        console.log(historyList[i]);
        $('#search-results').append(historyList[i]+"<br>");
    }};


$("#search").click(function(){
    citySearch = $("#city-search").val()
    localStorage.setItem('city', citySearch);
    searchHistory = JSON.parse(localStorage.getItem("cities"));
    searchHistory.push(citySearch);
    localStorage.setItem('cities', JSON.stringify(searchHistory));
    listUpdate();
})

listUpdate();




