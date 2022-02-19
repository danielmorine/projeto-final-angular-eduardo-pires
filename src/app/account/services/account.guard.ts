import { Injectable } from "@angular/core";
import { CanActivate, CanDeactivate, Router } from "@angular/router";
import { LocalStorageUtils } from "src/app/utils/localstorage";
import { AccountAppComponent } from "../account.app.component";
import { newUserComponent } from "../newUserComponent/newUser.component";

@Injectable()
export class AccountGuard implements CanDeactivate<AccountAppComponent>, CanActivate {

    localStorageutils = new LocalStorageUtils();

    constructor(private router: Router){}

    canDeactivate(component: newUserComponent) {
        if(component.changeNotSave){
            return window.confirm('Deseja abandonar o preenchimento do formulário?');
        }

        return true
    }

    canActivate() {
        if(this.localStorageutils.getUserToken()){
            this.router.navigate(['/home'])
        }

        return true;
    }
}