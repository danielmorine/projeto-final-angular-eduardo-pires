import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AccountAppComponent } from "./account.app.component";
import { FormComponent } from "./form/form.component";
import { LoginComponent } from "./login/login.component";

const accountRouterConfig: Routes = [
 {
     path: '', component: AccountAppComponent,
     children: [
         { path: 'form', component: FormComponent },
         { path: 'login', component: LoginComponent }
     ]
 }   
]

@NgModule({
    imports: [
        RouterModule.forChild(accountRouterConfig)
    ],
    exports: [RouterModule]
})

export class AccountRoutingModule {}