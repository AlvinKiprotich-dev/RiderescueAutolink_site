export enum BrandCategory {
  AUTOMOTIVE = "automotive",
  MOTORCYCLE = "motorcycle",
  TRUCK = "truck",
  BUS = "bus",
  OTHER = "other",
}

export interface IBrand {
  _id: string;
  name: string;
  description?: string;
  logo?: string;
  isActive: boolean;
  category: BrandCategory; 
  createdAt: Date;
  updatedAt: Date;
}
