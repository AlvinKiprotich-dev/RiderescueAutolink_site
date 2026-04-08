import { IUser } from "./user";

export enum VehicleType {
  CAR = "car",
  TRUCK = "truck",
  MOTORCYCLE = "motorcycle",
  BUS = "bus",
  TRAILER = "trailer",
  VAN = "van",
  BIKE = "bike",
  OTHER = "other",
}

// Vehicle status
export enum VehicleStatus {
  GOOD_CONDITION = "good_condition",
  NEEDS_MAINTENANCE = "needs_maintenance",
  HIDDEN = "hidden",
}

export interface IVehicle {
  _id: string;
  photo: string;
  insuranceCompany: string;
  insurancePolicyExpirationDate: Date;
  owner: IUser;
  type: string;
  numberPlate: string;
  vin: string;
  make: string;
  model: string | any;
  year: number;
  color: string;
  status: VehicleStatus;
  updatedAt: Date;
  createdAt: Date;
}
