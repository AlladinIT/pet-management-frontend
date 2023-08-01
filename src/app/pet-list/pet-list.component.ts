import { Component,Output ,OnInit, EventEmitter } from '@angular/core';
import { PetResponse } from '../pet-response';

import { UserService } from '../user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-pet-list',
  templateUrl: './pet-list.component.html',
  styleUrls: ['./pet-list.component.css']
})
export class PetListComponent implements OnInit{

    isEditing = true;

    pets: PetResponse[];
    constructor(private userService: UserService, private router: Router) {
    }

    ngOnInit() {
      this.userService.getAllPets().subscribe(data => {
        this.pets = data;
      });
    }

    toggleEditMode(petId: string, petName: string, petCode: string, typeId: String, colorId: String, countryId: String) {

      const params: any = {
        id: petId,
        name: petName,
        code: petCode,
        typeId: typeId,
        colorId: colorId,
        countryId: countryId
      };


      this.router.navigate(['/addPet',  params]);
    }

    deletePet(petId: string){
      this.userService.deletePet(Number(petId)).subscribe(
        () => {
          console.log(`Pet with ID ${petId} deleted successfully.`);
          window.location.reload();
          
        },
        (error) => {
          console.error('Error deleting pet:', error);
        }
      );
    }
}
