export interface IUpload {
    _id: string;
    originalName: string;
    fileName: string;
    filePath: string;
    fileSize: number;
    mimeType: string;
    url: string;
    publicId?: string;
    storageType: 'local' | 'cloudinary';
    uploadedBy: any;
    folder?: string;
    resourceType?: string;
    format?: string;
    width?: number;
    height?: number;
    bytes?: number;
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
  }
