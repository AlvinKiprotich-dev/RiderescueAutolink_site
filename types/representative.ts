import { IService } from "./service";
import { IUser } from "./user";

export interface IRepresentative {
  user: IUser;
  service: IService;
  role: RepresentativeRole;
  status: RepresentativeStatus;
  createdAt?: Date;
  updatedAt?: Date;
}

export enum RepresentativeRole {
  OWNER = "owner",
  MANAGER = "manager",
  STAFF = "staff"
}

export enum RepresentativeStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
  SUSPENDED = "suspended"
}
