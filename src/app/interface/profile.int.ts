export interface ProfileInt {
  id: string,
  username: string,
  description: string,
  avatarUrl: string | null,
  subscriptionAmount: number,
  firstName: string,
  lastName: string,
  isActive: boolean,
  stack: string[],
  city: string,
}