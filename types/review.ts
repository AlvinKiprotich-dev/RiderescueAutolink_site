export interface IReview {
  _id: string;
  service: any; // Service ID
  user: any; // User ID who wrote the review
  rating: number; // 1-5 stars
  comment: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
