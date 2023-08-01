import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import { UserRequest } from '../user-request';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent {

  user: UserRequest;

  message: string = '';


  constructor(
    private route: ActivatedRoute, 
      private router: Router, 
        private userService: UserService) {
    this.user = new UserRequest();
  }

  onSubmit() {
    this.userService.register(this.user).subscribe(
      (response) => {
        if(response){
          this.router.navigate(['/users']);
        }
        else{
          this.message = 'Registration unsuccessful';
        }
      },
      (error) => {
        console.error('Registration failed:', error);
      }
      
    )  
    
  }


  confirmPassword: string = '';

  passwordsMatch(): boolean {
    return this.user.password === this.confirmPassword;
  }

}
