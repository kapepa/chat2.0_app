import { Component, inject, OnInit } from '@angular/core';
import { ProfileHeaderComponent } from '../../components/profile-header/profile-header.component';
import { CommonModule } from '@angular/common';
import { ProfileService } from '../../services/profile.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProfileInt } from '../../interface/profile.int';
import { FormConverter } from '../../utils/form-converter';

type TypeOfProfile = Pick<ProfileInt, "firstName" | "lastName" | "username" | "description" | "stack" >

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ProfileHeaderComponent,
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent implements OnInit {
  fb = inject(FormBuilder)
  profileService = inject(ProfileService);
  
  myProfile$ = this.profileService.getMyProfile;
  form = this.fb.group({
    id: ["", [Validators.required]],
    firstName: ["", [Validators.required, Validators.minLength(5)]],
    lastName: ["", [Validators.required]],
    username: ["", [Validators.required]],
    description: [""],
    stack: [""],
  })

  ngOnInit(): void {
    this.myProfile$.subscribe((profile) => {
      if(!!profile) {
        this.form.setValue({
          id: profile!.id,
          firstName: profile!.firstName,
          lastName: profile!.lastName,
          username: profile!.username,
          description: profile!.description,
          stack: profile!.stack.join(','),
        })
      }
    })
  }

  onSubmit() {
    if(this.form.valid) {
      const getId = this.form.get("id")!.value;
      const values = Object.assign(this.form.value, { stack: this.form.value.stack?.split(",") })
      const toForm: FormData = FormConverter(values);
      if (!!getId) this.profileService.patchProfile(toForm, getId).subscribe();
    }
  }
}
