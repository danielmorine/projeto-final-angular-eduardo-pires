import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageUtils } from 'src/app/utils/localstorage';

@Component({
    selector: 'app-menu-login',
    templateUrl: './menu-login.componenent.html'
})

export class MenuLoginComponent{
    token: string = "";
    user: any;
    email: string = "";
    localStorageutils = new LocalStorageUtils();

    constructor(private router: Router){}

    auth():boolean{
        this.token = this.localStorageutils.getUserToken();
        this.user = this.localStorageutils.getUser();

        if(this.user)
            this.email = this.user.email;

        return this.token !== null;
    }

    logout(){
        this.localStorageutils.cleanUser();
        this.router.navigate(['/home']);
    }
}