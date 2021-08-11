import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { WeatherService } from '../../service/weather.service';
import { SET_LOCATION } from '../../store/reducer/location-reducer';
import { WeatherData } from '../../models/weatherData.model';
@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['../../app.component.scss']
})
export class CurrentWeatherComponent {
  loc$: Observable<string>;
  loc: string;
  theme$: Observable<boolean>;
  theme: boolean;
  listCurrentWeather: WeatherData[] = [];
  msg: string;
  ukCountriesList: string[] = []
  @Output() redirectTabEvent = new EventEmitter<string>();
  constructor(
    private store: Store<any>,
    private weatherService: WeatherService
  ) {
    // 5 Europe cities
    this.ukCountriesList = [
      'London', 'Paris', 'Florence', 'Prague', 'Barcelona'
    ]
    this.loc$ = store.pipe(select('loc'));
    this.loc$.subscribe(loc => {
      if (loc) {
        this.loc = loc;
      }
    })
    this.listCurrentWeather = [];
    this.ukCountriesList.forEach(location => {
      this.getWeather(location);
    });
    this.theme$ = store.pipe(select('theme'));
    this.theme$.subscribe(theme => {
      this.theme = theme;
    });
  }
  // get whether data from API for 5 europ cities
  getWeather(loc: string) {
    this.msg = '';
    this.weatherService.getCurrentWeather(loc)
      .subscribe((res: any) => {
        if (res) {
          const objCurWeather = new WeatherData();
          objCurWeather.cityName = res.name;
          objCurWeather.temperature = res.main.temp;
          objCurWeather.sunRiseTime = res.sys.sunrise;
          objCurWeather.sunSetTime = res.sys.sunset;
          objCurWeather.cityImg = './assets/img/cities/' +
            res.name.toLowerCase() + '.jpg';
          this.listCurrentWeather.push(objCurWeather);
        }

      }, err => {
        if (err.error && err.error.message) {
          alert(err.error.message);
          this.msg = err.error.message;
          return;
        }
        alert('Failed to get weather.');
      });

  }
  // get forecaste data from API
  getForecast(loc) {
    if (this.loc !== loc) {
      this.store.dispatch({ type: SET_LOCATION, payload: loc });
    }
    else {
      this.redirectTabEvent.emit('redirect');
    }
  }
  // check the data is not empty
  resultFound() {
    return this.listCurrentWeather.length > 0;
  }

}