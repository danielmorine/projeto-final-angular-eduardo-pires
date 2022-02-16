import { AfterViewInit, Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControl, FormControlName, FormGroup, Validators} from '@angular/forms';
import { GenericValidator, ValidationMessages, DisplayMessage } from 'src/app/utils/generic-form-validation';
import { CustomValidators } from 'ngx-custom-validators';
import { Observable, fromEvent, merge } from 'rxjs';


import { User } from '../models/user';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-form',
  templateUrl: './newUser.component.html',
})
export class newUserComponent implements OnInit, AfterViewInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[] = [];


  errors: any[] = [];
  newUserForm: FormGroup;
  user: User = { confirmPassword: '', password: '', email: '' };
  changeNotSave: boolean = false;

  validationMessages: ValidationMessages;
  genericValidador: GenericValidator;
  displayMessage: DisplayMessage = {};

  constructor(
    private fb: FormBuilder, 
    private service: AccountService) {
      this.validationMessages = {
        email: {
          required: 'Informe o e-email',
          email: 'Email inválido'
        },
        password: {
          required: 'Informa a senha',
          rangeLength: 'A senha deve possuir entre 6 a 15 caracteres'
        },
        confirmPassword: {
          required: 'Informe a senha novamente',
          rangeLength: 'A senha deve possuir entre 6 a 15 caracteres',
          equalTo: 'As senha não conferem'
        }
      }

      this.genericValidador = new GenericValidator(this.validationMessages);
    }

  ngOnInit(): void {
    let password = new FormControl('', [Validators.required, CustomValidators.rangeLength([6, 15])]);
    let confirmPassword = new FormControl('', [Validators.required, CustomValidators.rangeLength([6, 15]), CustomValidators.equalTo(password)]);

    
    this.newUserForm = this.fb.group({
      email: ['',[Validators.required, Validators.email]],
      password: password,
      confirmPassword: confirmPassword
    })
  }

  ngAfterViewInit(): void {
    let controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    merge(...controlBlurs).subscribe(() => {
      this.displayMessage = this.genericValidador.processarMensagens(this.newUserForm);
      this.changeNotSave = true;
    });
  }

  addAccount(){
    if(this.newUserForm.dirty && this.newUserForm.valid){
      this.user = Object.assign({}, this.user, this.newUserForm.value);

      this.service.createUser(this.user).subscribe(success => {this.success(success)}, error => {this.error(error)});

      this.changeNotSave = true;
    }
  }

  success(response: any){

  }

  error(response: any){

  }

}
