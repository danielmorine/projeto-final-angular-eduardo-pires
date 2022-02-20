import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DeleteComponent } from "./delete/delete.component";
import { DetailsComponent } from "./details/details.component";
import { EditComponent } from "./edit/edit.component";
import { ListComponent } from "./list/list.component";
import { NewComponent } from "./new/new.component";
import { ProviderAppComponent } from "./provider.app.component";
import { ProviderRoutingModule } from "./provider.route";
import { ProviderService } from "./services/provider.service";

import { NgBrazil } from 'ng-brazil';
import { TextMaskModule } from 'angular2-text-mask';

@NgModule({
    declarations: [
        ProviderAppComponent,
        DeleteComponent,
        DetailsComponent,
        EditComponent,
        ListComponent,
        NewComponent
    ],
    imports: [
        CommonModule,
        ProviderRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        NgBrazil,
        TextMaskModule,
    ],
    providers: [
        ProviderService      
    ]
})

export class ProviderModule{}