import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProfileService } from '../../services/profile.service';
import { LoginFormData } from '../../interface/form-data.int';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { RoutesEnum } from '../../../enums/routes.enum';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  isLoading: boolean = false;

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.min(5)]],
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
  ) {}

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = !this.isLoading;
      const formData: LoginFormData = this.loginForm.value;
      this.authService.loginUser(formData).subscribe({
        next: () => {
          this.router.navigate([RoutesEnum.Search])
        },
        error: () => {
          console.log("Something went wrong!")
        },
        complete: () => {
          this.isLoading = !this.isLoading;
        }
      })
    }
  }

  get btnDisabled () {
    return !this.loginForm.valid || !this.isLoading;
  }
}
