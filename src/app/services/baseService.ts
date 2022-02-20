import { HttpErrorResponse, HttpHeaders } from "@angular/common/http"
import { throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { LocalStorageUtils } from "../utils/localstorage";

export abstract class BaseService{
    protected UrlService: string = environment.apiUrlv1;

    public LocalStorage = new LocalStorageUtils();
    protected GetHeaderJson() {
        return {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        };
    }

    protected extractReponseData(response: any){
        return response.data || {};
    }

    protected serviceError(response: Response | any){
        let customError: string[] = [];

        if(response instanceof HttpErrorResponse){
            if(response.statusText === "Unknow Error"){
                customError.push("Ocorreu um erro desconhecido");
                response.error.errors = customError;
            }
        }
        return throwError(response);
    }

    protected getAuthHeaderJSON(){
        return {
            headers: new HttpHeaders({ 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.LocalStorage.getUserToken()}`
            })
        };
    }
}