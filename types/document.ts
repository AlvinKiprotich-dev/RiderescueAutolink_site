import { ServiceType } from "./service";

export enum DocumentType {
  LICENSE = "license",
  INSURANCE = "insurance",
  GOOD_CONDUCT = "good_conduct",
  PROFESSIONAL_CERTIFICATE = "professional_certificate",
  BUSINESS_LICENSE = "business_license",
  BUSINESS_PERMIT = "business_permit",
  TOWING_PERMIT = "towing_permit",
  ID_FRONT = "id_front",
  ID_BACK = "id_back",
  VEHICLE_REGISTRATION = "vehicle_registration",
  VEHICLE_INSURANCE = "vehicle_insurance",
  VEHICLE_TAX = "vehicle_tax",
  VEHICLE_MAINTENANCE_RECORDS = "vehicle_maintenance_records",
  VEHICLE_MANUAL = "vehicle_manual",
  VEHICLE_REPAIR_INVOICE = "vehicle_repair_invoice",
  VEHICLE_REPAIR_ESTIMATE = "vehicle_repair_estimate",
  PASSPORT_PHOTO = "passport_photo",
  PHOTOS_OF_GARAGE = "photos_of_garage",
  VEHICLE_LOGBOOK = "vehicle_logbook",	
  OTHER = "other",
}

export interface IServiceDocument {
  _id: string;
  type: string;
  name: string;
  url: string;
  service: string;
  document: string;
  verified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IRequiredDocument {
  _id: string;
  serviceType: string;
  documentType: string;
  name: string;
  description: string;
  required: boolean;
  order: number;
}

export interface IServiceDocumentsResponse {
  success: boolean;
  message: string;
  documents: IServiceDocument[];
  requiredDocuments: IRequiredDocument[];
  service: any;
  pagination?: {
    page: number;
    total: number;
    limit: number;
    totalPages: number;
  };
}
