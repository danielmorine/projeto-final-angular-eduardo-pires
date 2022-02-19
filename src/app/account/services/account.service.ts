import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from "rxjs/operators";

import { User } from "../models/user";
import { BaseService } from "src/app/services/baseService";

@Injectable()
export class AccountService extends BaseService {
   constructor(private http: HttpClient){super();} 

   createUser(user: User) : Observable<User>{
        let response = this.http
        .post(`${this.UrlService}nova-conta`, user, this.GetHeaderJson())
        .pipe(
            map(this.extractReponseData),
            catchError(this.serviceError));

            return response;
   }

   login(user: User){
       let response = this.http.post(`${this.UrlService}login`, user, this.GetHeaderJson())
       .pipe( map(this.extractReponseData),
       catchError(this.serviceError));

       return response;
    }
}