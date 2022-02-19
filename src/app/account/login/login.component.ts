import { AfterViewInit, Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { CustomValidators } from 'ngx-custom-validators';
import { Observable, fromEvent, merge } from 'rxjs';
import { DisplayMessage, GenericValidator, ValidationMessages } from 'src/app/utils/generic-form-validation';


import { User } from '../models/user';
import { AccountService } from '../services/account.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit, AfterViewInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[] = [];

  errors: any[] = [];
  loginForm: FormGroup;
  user: User = { password: '', email: '', confirmPassword: '' };

  validationMessages: ValidationMessages;
  genericValidador: GenericValidator;
  displayMessage: DisplayMessage = {};

  constructor(
    private fb: FormBuilder, 
    private service: AccountService,
    private router: Router) {
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
    this.loginForm = this.fb.group({
      email: ['',[Validators.required, Validators.email]],
      password: ['',[Validators.required, CustomValidators.rangeLength([6, 15])]],
    })
  }

  ngAfterViewInit(): void {
    let controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    merge(...controlBlurs).subscribe(() => {
      this.displayMessage = this.genericValidador.processarMensagens(this.loginForm);
    });
  }

  auth(){
    this.service.login(this.loginForm.value).subscribe(success => {this.success(success)}, error =>{this.error(error)});
  }


  success(response: any){
    this.loginForm.reset();
    this.errors = [];
    this.service.LocalStorage.addUserLocalStorage(response);
    this.router.navigate(['/home']);
  }

  error(response: any){
    this.errors = response.error.errors; 
  }

}
