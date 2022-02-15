import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { User } from "../models/user";

@Injectable()
export class AccountService {
   constructor(private http: HttpClient){} 

   createUser(user: User){

   }

   login(user: User){
       
    }
}