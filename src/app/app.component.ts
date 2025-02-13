import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone:false
})
export class AppComponent {
  showTabs = true;

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      
    });
  }
}
