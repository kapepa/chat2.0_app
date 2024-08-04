import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ProfileService } from '../../../../services/profile.service';
import { debounceTime, startWith, switchMap } from 'rxjs';
import { FilterProfilesDto } from '../../../../dto/filter-profiles.dto';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-profile-filter',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './profile-filter.component.html',
  styleUrl: './profile-filter.component.scss'
})
export class ProfileFilterComponent {
  fb = inject(FormBuilder);
  profileService = inject(ProfileService);

  constructor() {
    this.form.valueChanges.pipe(
      startWith({}),
      debounceTime(2000),
      switchMap((values) => {
        return this.profileService.filterProfiles(values as FilterProfilesDto)
      }),
      takeUntilDestroyed(),
    ).subscribe();
  }

  form = this.fb.group({
    firstName: [""],
    lastName: [""],
    stack: [""],
  })
}
