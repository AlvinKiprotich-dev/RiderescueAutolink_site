import { IUser } from "./user";
import { IVehicle } from "./vehicle";
import { IService } from "./service";

export enum BookingStatus {
  PENDING = "pending",
  ACCEPTED = "accepted",
  REJECTED = "rejected",
  COMPLETED = "completed"
}

export interface IBooking  {
  _id: string;
  user: IUser;
  service: IService;
  vehicle: IVehicle;
  issues: string[];
  description: string;
  status: BookingStatus;
  location: {
    type: string;
    coordinates: number[];
  };
  scheduledDate: Date;
  // Pairing fields
  isPaired: boolean;
  pairingCode: string;
  pairedAt?: Date;
  updatedAt: Date;
  createdAt: Date;
}
