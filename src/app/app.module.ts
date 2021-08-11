import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatToolbarModule,
  MatInputModule,
  MatTabsModule,
  MatCardModule,
  MatDividerModule,
  MatListModule,
  MatSlideToggleModule
} from '@angular/material';
import { HomePageComponent } from './components/home-page/home-page.component';
import { StoreModule } from '@ngrx/store';
import { locationReducer } from './store/reducer/location-reducer';
import { themeReducer } from './store/reducer/theme-reducer';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { FormsModule } from '@angular/forms';
import { WeatherService } from './service/weather.service';
import { CurrentWeatherComponent } from './components/current-weather/current-weather.component';
import { ForecastComponent } from './components/forecast/forecast.component';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    TopBarComponent,
    CurrentWeatherComponent,
    ForecastComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    StoreModule.forRoot({
      loc: locationReducer,
      theme: themeReducer
    }),
    FormsModule,
    MatInputModule,
    MatTabsModule,
    MatCardModule,
    HttpClientModule,
    MatDividerModule,
    MatSlideToggleModule,
    MatListModule
  ],
  providers: [
    WeatherService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }