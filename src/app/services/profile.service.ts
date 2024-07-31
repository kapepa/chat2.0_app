import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ProfileInt } from '../interface/profile.int';
import { environment } from '../../environment/environment';
import { BehaviorSubject, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private url = environment.api;
  myProfile: ProfileInt | null = null;
  myProfile$: BehaviorSubject<ProfileInt | null> = new BehaviorSubject(this.myProfile);
  http = inject(HttpClient)

  constructor() { }

  getAccounts () {
    return this.http.get<ProfileInt[]>(`${this.url}/user/all`)
  }

  getMyself () {
    return this.http.get<ProfileInt>(`${this.url}/user/myself`).pipe(
      tap(profile => {
        this.myProfile = profile;
        this.myProfile$.next(this.myProfile)
      })
    )
  }

  getSubscribers () {
    return this.http.get<ProfileInt[]>(`${this.url}/subscribe/all`).pipe(
      map(res => res.slice(0,3))
    )
  }

  get getMyProfile() {
    return this.myProfile$.asObservable();
  }
}
