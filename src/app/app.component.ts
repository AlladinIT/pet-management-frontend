import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  title = 'Pet Management';

  isLoggedIn: boolean = false;

  constructor(private router: Router, private userService: UserService) { }


  ngOnInit() {
    // Subscribe to the NavigationEnd event to trigger your method
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.onPageLoad();
      }
    });
  }


  onPageLoad() {
    this.userService.isLoggedIn().subscribe(
      (isLoggedIn) => {
        this.isLoggedIn = isLoggedIn;
      },
      (error) => {
        console.error('Error checking login status:', error);
      }
    );
    
  }
}
