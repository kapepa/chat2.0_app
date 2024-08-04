import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { ProfileInt } from '../interface/profile.int';
import { environment } from '../../environment/environment';
import { BehaviorSubject, map, tap } from 'rxjs';
import { FilterProfilesDto } from '../dto/filter-profiles.dto';
import { setHttpParams } from '../utils/http-params';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private url = environment.api;

  filteredProfiles = signal<ProfileInt[]>([]);

  myProfile: ProfileInt | null = null;
  myProfile$: BehaviorSubject<ProfileInt | null> = new BehaviorSubject(this.myProfile);

  mySubscribers: ProfileInt[] | null = null;
  mySubscribers$: BehaviorSubject<ProfileInt[] | null> = new BehaviorSubject(this.mySubscribers);

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
      map(res => {
        this.mySubscribers = res;
        this.mySubscribers$.next(this.mySubscribers);
        return res.slice(0,3)
      })
    )
  }

  getUserById (id: string) {
    return this.http.get<ProfileInt>(`${this.url}/user/one/${id}`)
  }

  patchProfile(form: FormData, id: string) {
    return this.http.patch(`${this.url}/user/update/${id}`,form);
  }

  filterProfiles(dto: FilterProfilesDto) {
    const params = setHttpParams<FilterProfilesDto>(dto)
    return this.http.get<ProfileInt[]>(`${this.url}/user/find`, { params }).pipe(
      tap((profiles) => {
        this.filteredProfiles.set(profiles)
      })
    );
  }

  get getMyProfile() {
    return this.myProfile$.asObservable();
  }

  get getMySubscribers() {
    return this.mySubscribers$.asObservable();
  }
}
