import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpResponse, HttpEvent } from '@angular/common/http';
import { UserRequest } from './user-request';
import { UserResponse } from './user-response';
import { Observable } from 'rxjs';

import { PetResponse } from './pet-response';
import { PetRequest } from './pet-request';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private usersUrl: string;
  private loginUrl: string;
  private logoutUrl: string;
  private checkLoginUrl: string;

  private petUrl: string;

  requestOptions = {
    withCredentials: true // Enable credentials (cookies), otherwise another session is created
  };
  

  constructor(private http: HttpClient) { 
    this.usersUrl = 'http://localhost:8080/api/person'
    this.loginUrl = 'http://localhost:8080/api/login'
    this.logoutUrl = 'http://localhost:8080/api/logout'
    this.checkLoginUrl = 'http://localhost:8080/api/check-login'

    this.petUrl = 'http://localhost:8080/api/pet'
  }

  public getAllUsers(): Observable<UserResponse[]> {
    return this.http.get<UserResponse[]>(this.usersUrl, this.requestOptions);
    
  }

  public register(user: UserRequest) {
    return this.http.post<UserRequest>(this.usersUrl, user, this.requestOptions);
  }

  public login(user: UserRequest): Observable<any> {
    return this.http.post<UserRequest>(this.loginUrl, user, this.requestOptions);
  }


  public logout() {
    const emptyBody = {};
    return this.http.post(this.logoutUrl,emptyBody, this.requestOptions);
  }


  isLoggedIn(): Observable<boolean> {
    return this.http.get<boolean>(this.checkLoginUrl, this.requestOptions);
  }

  public getAllPets(): Observable<PetResponse[]> {
    return this.http.get<PetResponse[]>(this.petUrl, this.requestOptions);
    
  }
  

  public addPet(pet: PetRequest) {
    return this.http.post<PetRequest>(this.petUrl, pet, this.requestOptions);
  }

  public editPet(pet: PetRequest, petId: number) {
    return this.http.put<PetRequest>(`${this.petUrl}/${petId}`, pet, this.requestOptions);
  }

  public deletePet(petId: number) {

    return this.http.delete(`${this.petUrl}/${petId}`,this.requestOptions);
  }

}

