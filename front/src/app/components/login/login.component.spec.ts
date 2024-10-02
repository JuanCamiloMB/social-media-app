import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import  UserService from '../../services/user/user.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let router: Router;
  let userService: UserService;
  let toastService: ToastrService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LoginComponent, // Importa el componente standalone aquí
        ReactiveFormsModule, // Otros módulos que necesites
      ],
      providers: [
        { provide: Router, useValue: { navigate: jasmine.createSpy('navigate') } },
        { provide: ToastrService, useValue: { error: jasmine.createSpy('error'), success: jasmine.createSpy('success') } },
        { provide: UserService, useValue: { user: null, isAuth: false } },
      ]
    }).compileComponents();
  
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    toastService = TestBed.inject(ToastrService);
    userService = TestBed.inject(UserService);
  });
  

  it('debería ser inválido si los campos están vacíos', () => {
    const form = component.loginForm;
    expect(form.valid).toBeFalsy();
  });

  it('debería ser inválido si los campos están vacíos', () => {
    const form = component.loginForm;
    expect(form.valid).toBeFalsy();
  
    const username = form.controls['username'];
    const password = form.controls['password'];
  
    expect(username.valid).toBeFalsy();
    expect(password.valid).toBeFalsy();
  });
  
});
