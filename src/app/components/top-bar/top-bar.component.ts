import { SET_THEME } from './../../store/reducer/theme-reducer';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['../../app.component.scss']
})
export class TopBarComponent implements OnInit {
  loc: string;
  isDark: boolean = false;
  constructor(private store: Store<any>) { }
  ngOnInit() {
  }
  //Function to toggle the theme.
  toggleTheme() {
    this.isDark = !this.isDark;
    this.store.dispatch({ type: SET_THEME, payload: this.isDark });
  }

}