import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { BaseService } from "src/app/services/baseService";
import { Provider } from "../models/provider";
import { zipCodeAddress } from "../models/zipCodeaddress";

@Injectable()
export class ProviderService extends BaseService {
    constructor(private http: HttpClient){
        super();
    }

    deleteById(id: string): Observable<Provider> {
        return this.http.delete(`${this.UrlService}fornecedores/${id}`, super.getAuthHeaderJSON())
        .pipe(
            map(super.extractReponseData),
            catchError(super.serviceError)
        );
    }

    editById(provider: Provider): Observable<Provider>{
        return this.http.put(`${this.UrlService}fornecedores/${provider.id}`, provider, super.getAuthHeaderJSON())
        .pipe(
            map(super.extractReponseData),
            catchError(super.serviceError));
    }

    getById(id: string) : Observable<Provider>{
        return this.http.get<Provider>(`${this.UrlService}fornecedores/${id}`).pipe(catchError(super.serviceError));
    }

    getAll(): Observable<Provider[]>{
        return this.http.get<Provider[]>(`${this.UrlService}fornecedores`).pipe(catchError(super.serviceError));
    }

    add(provider: Provider): Observable<Provider>{
        return this.http.post(`${this.UrlService}fornecedores`, provider, super.getAuthHeaderJSON())
                .pipe(
                    map(super.extractReponseData),
                    catchError(super.serviceError));
    }

    getZipCode(zipCode: string): Observable<zipCodeAddress>{
        return this.http.get<zipCodeAddress>(`https://viacep.com.br/ws/${zipCode}/json/`)
                        .pipe(catchError(super.serviceError))
    }
}