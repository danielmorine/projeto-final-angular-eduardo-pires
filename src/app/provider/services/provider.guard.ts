import { Injectable } from "@angular/core";
import { CanActivate, CanDeactivate, Router } from "@angular/router";
import { LocalStorageUtils } from "src/app/utils/localstorage";
import { NewComponent } from "../new/new.component";
import { ProviderAppComponent } from "../provider.app.component";

@Injectable()
export class ProviderGuard implements CanDeactivate<ProviderAppComponent>, CanActivate {
    
    localStorageutils = new LocalStorageUtils();

    constructor(private router: Router){}

    canDeactivate(component: NewComponent) {
        if(component.changesNotSave){
            return window.confirm('Deseja abandonar o cadastro do forncedor?');
        }
        return true
    }

    canActivate() {
        if(this.localStorageutils.getUserToken()){
            this.router.navigate(['/home'])
        }
        return true
    }
}