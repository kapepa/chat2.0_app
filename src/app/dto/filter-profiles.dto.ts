import { ProfileInt } from "../interface/profile.int";

type FilterUserType = Partial<Pick<ProfileInt, "firstName" | "lastName" >>;

export interface FilterProfilesDto extends FilterUserType {
  stack: string,
}