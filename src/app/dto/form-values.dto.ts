import { ProfileInt } from "../interface/profile.int"

export type TypeOfProfile = Pick<ProfileInt, "firstName" | "lastName" | "username" | "description" | "stack" | "avatarUrl" >

export interface FormValuesDto {
  filed: keyof TypeOfProfile, 
  value: string | File | null | undefined,
}