export type UserStatus = "ACTIVE" | "BLOCKED" | "DELETED"
export type UserRole = "USER" | "ADMIN" | "SUPER_ADMIN"

export interface IUser {
  id: string
  name: string
  email: string
  role: UserRole
  status: UserStatus
  image?: string
  emailVerified: boolean
  createdAt: string
}
