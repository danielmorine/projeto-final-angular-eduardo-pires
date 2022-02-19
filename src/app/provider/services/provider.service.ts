import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BaseService } from "src/app/services/baseService";
import { Provider } from "../models/provider";

@Injectable()

export class ProviderService extends BaseService {
    constructor(private http: HttpClient){
        super();
    }

    deleteById(id: string): Observable<Provider> {
        return new Observable<Provider>();
    }    
    editById(Provider: Provider): Observable<Provider>{
        return new Observable<Provider>();
    }

    getById(id: string) : Observable<Provider>{
        return new Observable<Provider>();
    }

    getAll(provider: Provider): Observable<Provider>{
        return new Observable<Provider>();
    }

    add(provider: Provider): Observable<Provider>{
        return new Observable<Provider>();
    }
}