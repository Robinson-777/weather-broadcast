import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['../../app.component.scss']
})
export class HomePageComponent {
  loc$: Observable<string>;
  loc: string;
  theme$: Observable<boolean>;
  theme: boolean;
  tabIdx: number = 0;
  constructor(private store: Store<any>) {
    this.loc$ = store.pipe(select('loc'));
    this.loc$.subscribe(loc => {
      this.loc = loc;
      if (this.loc) {
        this.tabIdx = 1;
      }
    });
    this.theme$ = store.pipe(select('theme'));
    this.theme$.subscribe(theme => {
      this.theme = theme;
    });
  }
  redirectTab(data: string) {
    debugger;
    if (data) {
      this.tabIdx = 1;
    }
  }
}