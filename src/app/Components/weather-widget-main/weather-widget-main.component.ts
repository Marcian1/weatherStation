import { Component, OnInit } from '@angular/core';
import { WeatherService } from 'src/app/weather.service';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-weather-widget-main',
  templateUrl: './weather-widget-main.component.html',
  styleUrls: ['./weather-widget-main.component.css']
})
export class WeatherWidgetMainComponent implements OnInit {

  WeatherData:any;
  constructor(private weatherService : WeatherService) { }

  ngOnInit() {
    this.WeatherData = {
      main : {},
      isDay: true
    };
    setInterval( ()=>{this.getWeatherData()},1000);
  }

  getWeatherData(){
    /*fetch('https://api.openweathermap.org/data/2.5/weather?q=mumbai&appid=ff1bc4683fc7325e9c57e586c20cc03e')
    .then(response=>response.json())
    .then(data=>{this.setWeatherData(data);
    console.log(data);})*/

    this.weatherService.getWeather().subscribe(
      (data) => {
        console.log(data.humidity);
        this.WeatherData.main.humidity=data.humidity.toFixed(2);
        this.WeatherData.temp_celcius=data.temperature;
        this.WeatherData.main.location = data.location;
        this.WeatherData.main.date = data.date;
        let time: string = data.time;
        this.WeatherData.main.time = data.time.slice(0,5);
      },
      (err) => console.log(err)
    ); 

    // let data = JSON.parse('{"coord":{"lon":72.85,"lat":19.01},"weather":[{"id":721,"main":"Haze","description":"haze","icon":"50n"}],"base":"stations","main":{"temp":297.15,"feels_like":297.4,"temp_min":297.15,"temp_max":297.15,"pressure":1013,"humidity":69},"visibility":3500,"wind":{"speed":3.6,"deg":300},"clouds":{"all":20},"dt":1580141589,"sys":{"type":1,"id":9052,"country":"IN","sunrise":1580089441,"sunset":1580129884},"timezone":19800,"id":1275339,"name":"Mumbai","cod":200}');
    // this.setWeatherData(data);
  }

  setWeatherData(data){
    this.WeatherData = data;
    let sunsetTime = new Date(this.WeatherData.sys.sunset * 1000);
    this.WeatherData.sunset_time = sunsetTime.toLocaleTimeString();
    let currentDate = new Date();
    this.WeatherData.isDay = (currentDate.getTime() < sunsetTime.getTime());
    this.WeatherData.temp_celcius = (this.WeatherData.main.temp - 273.15).toFixed(0);
    this.WeatherData.temp_min = (this.WeatherData.main.temp_min - 273.15).toFixed(0);
    this.WeatherData.temp_max = (this.WeatherData.main.temp_max - 273.15).toFixed(0);
    this.WeatherData.temp_feels_like = (this.WeatherData.main.feels_like - 273.15).toFixed(0);
  }

}
