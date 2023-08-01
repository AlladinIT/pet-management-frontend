import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import { UserRequest } from '../user-request';


@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent {

  user: UserRequest;

  message: string = '';

  constructor(
    private route: ActivatedRoute, 
      private router: Router, 
        private userService: UserService) {
    this.user = new UserRequest();
  }


  onSubmit() {
    this.userService.login(this.user).subscribe(
      (response) => {
        if(response.status){
          this.router.navigate(['/mypets']);
        }
        else{
          this.message = response.message;
        }
      },
      (error) => {
        console.error('Login failed:', error);
      }
      
    )  
    
  }

  
}
