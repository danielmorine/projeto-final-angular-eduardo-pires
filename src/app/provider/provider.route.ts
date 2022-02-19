import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DeleteComponent } from "./delete/delete.component";
import { DetailsComponent } from "./details/details.component";
import { EditComponent } from "./edit/edit.component";
import { ListComponent } from "./list/list.component";
import { NewComponent } from "./new/new.component";
import { ProviderAppComponent } from "./provider.app.component";

const providerRouterConfig: Routes = [
    {
        path: '', component: ProviderAppComponent,
        children: [
            { path: 'new-provider', component: NewComponent },
            { path: 'list', component: ListComponent },
            { path: 'edit/:id', component: EditComponent },
            { path: 'details/:id', component: DetailsComponent },
            { path: 'delete/:id', component: DeleteComponent }
        ]
    }
]
@NgModule({
    imports: [
        RouterModule.forChild(providerRouterConfig)
    ],
    exports: [RouterModule]
})

export class ProviderRoutingModule{}