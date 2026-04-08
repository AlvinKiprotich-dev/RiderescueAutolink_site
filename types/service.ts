export enum ServiceStatus {
  PENDING = "pending",
  APPROVED = "approved",
  SUSPENDED = "suspended",
  REJECTED = "rejected",
}

export enum ServiceType {
  MECHANIC = "mechanic",
  GARAGE = "garage",
  TOWING = "towing",
}

export interface IService {
  _id: string;
  type: ServiceType;
  isAvailable: boolean;
  status: ServiceStatus;
  name: string;
  about: string;
  photo: string;
  user: any;
  phone: string;
  email: string;
  address: string;
  city: string;
  country: string;
  geoLocation: {
    type: string;
    coordinates: number[];
  };
  brandOfExpertise: string[];
  areaOfExpertise: string[];
  rating: number;
  reviewCount: number;
  createdAt: Date;
  updatedAt: Date;
}
