import { ServiceType } from "./service";

export enum Category {
  MECHANICAL = "mechanical",
  ELECTRICAL = "electrical",
  DIAGNOSTIC = "diagnostic",
  OTHER = "other",
}

export interface IExpertise {
  _id: string;
  name: string;
  description?: string;
  category: Category;
  serviceTypes: ServiceType[];
  isActive: boolean;
  estimatedCost?: number;
  estimatedDurationHrs?: number;
  createdAt: Date;
  updatedAt: Date;
}
