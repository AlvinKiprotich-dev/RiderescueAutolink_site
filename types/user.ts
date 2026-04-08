export enum UserStatus {
  ACTIVE = "active",
  SUSPENDED = "suspended",
  DELETED = "deleted",
}

export enum UserRoles {
  ADMIN = "admin",
  USER = "user",
  MECHANIC = "mechanic",
  DRIVER = "driver",
  GARAGE_OWNER = "garage_owner",
}

export interface IUser {
  _id: string;
  name: string;
  email: string;
  status: UserStatus;
  roles: UserRoles[];
  phone?: string;
  avatar?: string;
  address?: string;
  location?: {
    type: string;
    coordinates: number[];
  };
  isOnline: boolean;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}
