import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Color } from '../color';
import { Country } from '../country';
import { Type } from '../type';
import { PetRequest } from '../pet-request';
import { UserService } from '../user.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-pet-form',
  templateUrl: './pet-form.component.html',
  styleUrls: ['./pet-form.component.css']
})
export class PetFormComponent implements OnInit{
  colors: Color[];
  countries: Country[];
  types: Type[];

  pet: PetRequest;
  message: string = '';

  
  petId: number = null as any;

  constructor(private http: HttpClient, private userService: UserService, private router: Router, private route: ActivatedRoute) { 
    this.pet = new PetRequest;
  }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.petId = params['id'];
      this.pet.name = params['name'];
      this.pet.code = params['code'];
      this.pet.typeId = params['typeId'];
      this.pet.colorId = params['colorId'];
      this.pet.countryId = params['countryId'];

    });
    

    const colorsUrl = 'http://localhost:8080/api/color';
    const countriesUrl = 'http://localhost:8080/api/country';
    const typesUrl = 'http://localhost:8080/api/type';
    
    this.http.get<Color[]>(colorsUrl).subscribe(
      (data) => {
        this.colors = data;
      },
      (error) => {
        console.error('Error fetching colors:', error);
      }
    );


    this.http.get<Country[]>(countriesUrl).subscribe(
      (data) => {
        this.countries = data;
      },
      (error) => {
        console.error('Error fetching countries:', error);
      }
    );


    this.http.get<Type[]>(typesUrl).subscribe(
      (data) => {
        this.types = data;
      },
      (error) => {
        console.error('Error fetching types:', error);
      }
    );
  }



  onInput(event: any) {
    // Get the input value from the event
    const inputValue = event.target.value;

    // Filter out non-numeric characters using a regular expression
    const numericValue = inputValue.replace(/\D/g, '');

    // Set the filtered numeric value back to the input field
    event.target.value = numericValue;
  }



  onSubmit() {

    if(this.petId != null){

      this.userService.editPet(this.pet, this.petId).subscribe(
        (response) => {
          if(response){
            this.router.navigate(['/mypets']);
          }
          else{
            this.message = 'Couldn\'t edit pet';
          }
        },
        (error) => {
          console.error('Error while editing pet: ', error);
        }
      )
    }
    else{
      this.userService.addPet(this.pet).subscribe(
        (response) => {
          if(response){
            this.router.navigate(['/mypets']);
          }
          else{
            this.message = 'Couldn\'t add new pet';
          }
        },
        (error) => {
          console.error('Error while adding new pet: ', error);
        }
        
      ) 
    }
 
    
  }
}
