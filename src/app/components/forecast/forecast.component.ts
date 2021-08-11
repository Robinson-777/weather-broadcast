import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { WeatherService } from '../../service/weather.service';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['../../app.component.scss']
})
export class ForecastComponent {
  loc$: Observable<string>;
  loc: string;
  theme$: Observable<boolean>;
  theme: boolean;
  forecast: any = <any>{};
  filterForecast = <any>[];
  msg: string;
  constructor(
    private store: Store<any>,
    private weatherService: WeatherService
  ) {
    this.loc$ = store.pipe(select('loc'));
    this.loc$.subscribe(loc => {
      if (loc) {
        this.loc = loc;
        this.getForecast(loc);
      }
    })
    this.theme$ = store.pipe(select('theme'));
    // Based on theme change It will change data from AM to PM
    this.theme$.subscribe(theme => {
      this.theme = theme;
      if (this.forecast && this.forecast.list) {
        if (this.theme) {
          this.filterForecast = this.forecast.list.filter((d) => {
            return d.dt_txt.includes('21:00:00');
          });
        }
        else {
          this.filterForecast = this.forecast.list.filter((d) => {
            return d.dt_txt.includes('09:00:00');
          });
        }
      }
    });
  }

  // get forecast data for next five days and filter by 9 AM
  getForecast(loc: string) {
    this.weatherService.getForecast(loc)
      .subscribe(res => {
        if (res) {
          this.forecast = res;
          this.filterForecast = this.forecast.list.filter((d) => {
            return d.dt_txt.includes('09:00:00');
          })
        }
      }, err => {
      })
  }
  //check the data is not empty
  resultFound() {
    return Object.keys(this.forecast).length > 0;
  }
}