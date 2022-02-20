import { Component, ElementRef, OnInit, ViewChildren } from "@angular/core";
import { AbstractControl, FormBuilder, FormControlName, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { fromEvent, merge, Observable } from "rxjs";

import { IFormGroup, IFormBuilder } from '@rxweb/types';
import { ToastrService } from "ngx-toastr";
import { NgBrazilValidators } from 'ng-brazil';
import { utilsBr } from 'js-brasil';

import { Address } from "../models/address";
import { Provider } from "../models/provider";
import { ProviderService } from "../services/provider.service";
import { StringUtils } from "src/app/utils/StringUtils";
import { DisplayMessage, GenericValidator, ValidationMessages } from "src/app/utils/generic-form-validation";
import { zipCodeAddress } from "../models/zipCodeaddress";


@Component({
    selector: 'app-new',
    templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {

    @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

    errors: any[]  =[];

    validationMessages: ValidationMessages;
    genericValidator: GenericValidator;
    displayMessage: DisplayMessage = {};

    providerModel: Provider;
    form: IFormGroup<Provider>;
    formBuilder: IFormBuilder;
    
    MASKS = utilsBr.MASKS;
    formResult: string = '';
  
    documentText: string = 'CPF (requerido)';
    cpfRequired: string = 'CPF (requerido)';
    cnpjRequired: string = 'CNPJ (requerido)'

    changesNotSave: boolean;
    
    constructor(private fb: FormBuilder,
        private service: ProviderService,
        private router: Router,
        private toastr: ToastrService)
    {
        this.formBuilder = fb;
        this.validationMessages = {
            name: {
                required: 'Informe o nome',
            },
            documentNumber: {
                required: 'Informe o Documento',
                cpf: 'CPF em formato inválido',
                cnpj: 'CNPJ em formato inválido'
            },
            publicPlace: {
                required: 'Informe o Logradouro'
            },
            number: {
                required: 'Informe o Número'
            },
            neighborhood: {
                required: 'Informe o Bairro'
            },
            zipCode: {
                required: 'CPE em formato inválido'
            },
            city: {
                required: 'Informe a cidade'
            },
            state: {
                required: 'Informe o Estado'
            }
        };

        this.genericValidator = new GenericValidator(this.validationMessages);
    }

    ngOnInit(): void {

        this.form = this.formBuilder.group<Provider>({
            id: [''],
            name: ['', [Validators.required]],
            documentNumber: ['', [Validators.required, NgBrazilValidators.cpf]],
            isActive: ['',[Validators.required]],
            typeProvider: ['', [Validators.required]],     
            
            address: this.formBuilder.group<Address>({
              providerId:[''],
              id:[''],
              publicPlace: ['', [Validators.required]],
              number: ['', [Validators.required]],
              complement: [''],
              neighborhood: ['', [Validators.required]],
              zipCode: ['', [Validators.required, NgBrazilValidators.cep]],
              city: ['', [Validators.required]],
              state: ['', [Validators.required]]
            })
        });
        
        this.form.patchValue({ isActive: true, typeProvider: '1' });                             
    } 

    ngAfterViewInit(): void {
        this.typeProviderForm().valueChanges.subscribe(() => {
            this.changeDocumentValidationByTypeProvider();
            this.configElementsValidation();
            this.validateForm();
        });
        this.configElementsValidation();
    }
       
    public typeProviderForm(): AbstractControl {
        return this.form.get('typeProvider');
    }

    public documentNumber(): AbstractControl {
        return this.form.get('documentNumber');
    }  
    
    public addProvider(): void {
        if(this.form.dirty && this.form.valid){
            this.providerModel = Object.assign({}, this.form, this.form.value);
            this.formResult = JSON.stringify(this.providerModel);

            this.providerModel.address.zipCode = StringUtils.justNumbers(this.providerModel.address.zipCode);
            this.providerModel.documentNumber = StringUtils.justNumbers(this.providerModel.documentNumber);

            this.service.add(this.providerModel)
                        .subscribe(success => {this.onSuccess(success)}, error => {this.onError(error)});
        }
    }

    public getZipCode(zipCode: string): void {
        zipCode = StringUtils.justNumbers(zipCode);

        if(zipCode.length < 8) return;

        this.service.getZipCode(zipCode).subscribe(response => {this.setAddress(response)}, error => this.errors.push(error));        
    }

    private setAddress(result: zipCodeAddress): void {           
        this.form.patchValue({
            address: {
                city:result.localidade,
                complement: result.complemento,
                neighborhood: result.bairro,
                number: this.form.value.address.number,
                publicPlace: result.logradouro,
                zipCode: result.cep,
                state: result.uf,
                id: this.form.value.address.id,
                providerId: this.form.value.address.providerId
            }
        })
    }

    private onSuccess(response: any): void {
        this.form.reset();
        this.errors = [];

        this.changesNotSave = false;

        let toast = this.toastr.success('Fornecedor cadastrado com sucesso!', 'Sucesso');
        if(toast){
            toast.onHidden.subscribe(() => {
                this.router.navigate(['/providers/get-all']);
            });
        }
    }

    private onError(response: any): void {
        this.errors = response.error.errros;
        this.toastr.error('Error', ':/');
    }

    private configElementsValidation(): void {
        let controlBlurs: Observable<any>[] = this.formInputElements.map((formControll: ElementRef) => fromEvent(formControll.nativeElement, 'blur'));
        
        merge(...controlBlurs).subscribe(() => this.validateForm());
    }

    private validateForm(): void {
        this.displayMessage = this.genericValidator.processarMensagens(this.form);
        this.changesNotSave = true;
    }

    private changeDocumentValidationByTypeProvider(): void { 
        if(this.typeProviderForm().value === "1"){
            this.documentNumber().clearValidators();
            this.documentNumber().setValidators([Validators.required, NgBrazilValidators.cpf]);
            this.documentText = this.cpfRequired;
        } else {
            this.documentNumber().clearValidators();
            this.documentNumber().setValidators([Validators.required, NgBrazilValidators.cnpj]);
            this.documentText = this.cnpjRequired;
        }
    }
}