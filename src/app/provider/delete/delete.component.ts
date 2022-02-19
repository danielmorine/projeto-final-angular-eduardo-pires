import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Provider } from "../models/provider";
import { ProviderService } from "../services/provider.service";

@Component({
    selector: 'app-delete',
    templateUrl: './delete.component.html'
})

export class DeleteComponent implements OnInit {

    providerModel: Provider = new Provider();

    constructor(
        private service: ProviderService,
        private route: ActivatedRoute,
        private router: Router,
        private toastr: ToastrService
    ){
        this.service.getById(route.params['id'])
        .subscribe(providerModel => this.providerModel = this.providerModel);
        
    }


    ngOnInit(): void {
        
    }

    deleteById(){
        this.service.deleteById(this.providerModel.id).subscribe(success => {this.success(success)}, error => {this.error()});
    }

    success(response: any){
        const toast = this.toastr.success('Fornecedor excluido com Sucesso!', ':)');
        if(toast){
            toast.onHidden.subscribe(() => {
                this.router.navigate(['/provider/get-all']);
            });
        }
    }

    error(){
        this.toastr.error('Problema ao tentar deletar', ':/');
    }
}