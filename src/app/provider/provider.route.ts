import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DeleteComponent } from "./delete/delete.component";
import { DetailsComponent } from "./details/details.component";
import { EditComponent } from "./edit/edit.component";
import { ListComponent } from "./list/list.component";
import { NewComponent } from "./new/new.component";
import { ProviderAppComponent } from "./provider.app.component";
import { ProviderGuard } from "./services/provider.guard";
import { ProviderResolve } from "./services/provider.resolve";

const providerRouterConfig: Routes = [
    {
        path: '', component: ProviderAppComponent,
        children: [
            { 
                path: 'new-provider', 
                component: NewComponent, 
                data: [
                    { 
                        claim: { 
                            nome: 'Fornecedor', 
                            valor: 'Adicionar'
                        }
                    }
                ], 
                canActivate: [ProviderGuard], 
                canDeactivate: [ProviderGuard] 
            },
            { 
                path: 'get-all', 
                component: ListComponent 
            },
            { 
                path: 'edit/:id', 
                component: EditComponent, 
                resolve: { 
                    provider: ProviderResolve 
                } 
            },
            { 
                path: 'details/:id', 
                component: DetailsComponent 
            },
            { 
                path: 'delete/:id', 
                component: DeleteComponent 
            }
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