import { inject, Injectable } from '@angular/core';
import { LoginFormData } from '../interface/form-data.int';
import { FormDataUtil } from './form-data-util';
import { environment } from '../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = environment.api;
  http = inject(HttpClient)
  cookieService = inject(CookieService);
  formDataUtil = inject(FormDataUtil)

  access_token: string | null = null;
  refresh_token: string | null = null;

  loginUser(payload: LoginFormData) {
    const form = this.formDataUtil.createFormData<LoginFormData>(payload)
    return this.http.post<{ access_token: string, refresh_token: string }>(`${this.url}/auth/login`, form).pipe(
      tap(({ access_token, refresh_token }) => {
        this.access_token = access_token;
        this.refresh_token = refresh_token;

        this.cookieService.set('access_token', this.access_token)
        this.cookieService.set('refresh_token', this.refresh_token)
      })
    )
  }

  get isAuth() {
    if(!this.access_token) this.access_token = this.cookieService.get('access_token');
    return !!this.access_token;
  }
}
