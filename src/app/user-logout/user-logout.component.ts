import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import { UserRequest } from '../user-request';

@Component({
  selector: 'app-user-logout',
  templateUrl: './user-logout.component.html',
  styleUrls: ['./user-logout.component.css']
})
export class UserLogoutComponent implements OnInit {

  constructor(
    private route: ActivatedRoute, 
      private router: Router, 
        private userService: UserService) {
  }


  ngOnInit() {
    this.userService.logout().subscribe(
      () => {
        // Redirect the user to the home page or any other desired page
        this.router.navigate(['/']);
      },
      (error) => {
        console.error('Logout failed:', error);
      }
    );
  }

}
