$(document).ready(function() {
  
  // Temperature units. 0 = Cel, 1 = Fah
  var units = 0;

  // Fills in all the information
  function update(api, arg) {
    $.getJSON(api, function(json) {
      var jsonarg, temps, date, hours, minutes, seconds;
      
      if (arg === 0)
        jsonarg = json;
      else
        jsonarg = json.list[arg];
      
      if (units === 0)
        temps = Math.round(jsonarg.main.temp - 273) + ' °C';
      else
        temps = Math.round(jsonarg.main.temp * 9/5 - 459.67) + ' °F' ;
      
      $("#theDate").html('<p id="theDate">' + Date() + '</p>');
      $("#currentTemp").html('<p id="currentTemp">' + temps + '</p>');
      $("#currentWeather").html('<p id="currentWeather">' + jsonarg.weather[0].main + ' - ' + jsonarg.weather[0].description + ' <img src="http://openweathermap.org/img/w/' + jsonarg.weather[0].icon + '.png" height="30" width="30"></p>');
      $("#currentHumidity").html('<p id="currentHumidity">' + jsonarg.main.humidity + '%</p>');
      $("#currentPressure").html('<p id="currentPressure">' + Math.floor(jsonarg.main.pressure) + ' hPa</p>');

      if (jsonarg.wind.deg !== undefined) {
        $("#currentWind").html('<p id="currentWind">' + jsonarg.wind.speed + ' m/s, ' + Math.floor(jsonarg.wind.deg) + '°</p>');
      } else {
        $("#currentWind").html('<p id="currentWind">' + jsonarg.wind.speed + ' m/s</p>');
      }

      if (arg === 0) {
        date = new Date(1000 * jsonarg.sys.sunrise);
        hours = date.getHours();
        minutes = "0" + date.getMinutes();
        seconds = "0" + date.getSeconds();
        $("#sunriseTime").html('<p id="sunriseTime">' + hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2) + ' PST</p>');
        date = new Date(1000 * jsonarg.sys.sunset);
        hours = date.getHours();
        minutes = "0" + date.getMinutes();
        seconds = "0" + date.getSeconds();
        $("#sunsetTime").html('<p id="sunsetTime">' + hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2) + ' PST</p>');
      } else {
        $("#sunriseTime").html('<p id="sunriseTime">Not available for forecast</p>');
        $("#sunsetTime").html('<p id="sunsetTime">Not available for forecast</p>')
      }
    });
  }

  // Update when combobox is changed
  $("#comboBox").change(function() {
    if ($("#comboBox").val() === "0") {
      update("http://api.openweathermap.org/data/2.5/weather?q=sanjose,us&appid=0c2fc54bb4d89a5dd2434df1688339f6", 0);
    } else {
      update("http://api.openweathermap.org/data/2.5/forecast?q=sanjose,us&appid=0c2fc54bb4d89a5dd2434df1688339f6", parseInt($("#comboBox").val()));
    }
  });

  // Toggle temperature unit
  $("#degrees").on("click", function() {
    if(units === 0){
      units = 1;
    }
    else{
      units = 0;
    }
    
    if ($("#comboBox").val() === "0") {
      update("http://api.openweathermap.org/data/2.5/weather?q=sanjose,us&appid=0c2fc54bb4d89a5dd2434df1688339f6", 0);
    } else {
      update("http://api.openweathermap.org/data/2.5/forecast?q=sanjose,us&appid=0c2fc54bb4d89a5dd2434df1688339f6", parseInt($("#comboBox").val()));
    }
  });
  
  // Update on page load
  update("http://api.openweathermap.org/data/2.5/weather?q=sanjose,us&appid=0c2fc54bb4d89a5dd2434df1688339f6", 0);
});