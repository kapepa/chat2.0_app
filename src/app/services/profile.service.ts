import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ProfileInt } from '../interface/profile.int';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private url = environment.api;
  http = inject(HttpClient)

  constructor() { }

  getAccounts () {
    return this.http.get<ProfileInt[]>(`${this.url}/user/all`)
  }

  getMyself () {
    return this.http.get(`${this.url}/user/myself`)
  }
}
