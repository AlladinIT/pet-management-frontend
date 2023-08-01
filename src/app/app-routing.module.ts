import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserListComponent } from './user-list/user-list.component';
import { UserFormComponent } from './user-form/user-form.component';
import { PetListComponent } from './pet-list/pet-list.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserLogoutComponent } from './user-logout/user-logout.component';
import { PetFormComponent } from './pet-form/pet-form.component';

const routes: Routes = [
  { path: 'users', component: UserListComponent },
  { path: 'register', component: UserFormComponent },
  { path: 'mypets', component:  PetListComponent},
  { path: 'login', component: UserLoginComponent},
  { path: 'logout', component: UserLogoutComponent},
  { path: 'logout', component: UserLogoutComponent},
  { path: 'addPet', component: PetFormComponent},
  { path: 'addPet/:id', component: PetFormComponent } //EDIT PET
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
