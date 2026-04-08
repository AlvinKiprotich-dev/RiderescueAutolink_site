export enum NotificationType {
  SERVICE_APPROVED = "service_approved",
  SERVICE_REJECTED = "service_rejected",
  NEW_REQUEST = "new_request",
  PAYMENT_RECEIVED = "payment_received",
  SERVICE_UPDATE = "service_update",
  BOOKING_STATUS_UPDATE = "booking_status_update",
  SYSTEM_MESSAGE = "system_message",
}

export enum NotificationStatus {
  SENT = "sent",
  DELIVERED = "delivered",
  READ = "read",
  FAILED = "failed",
}

export interface INotification {
  _id: string;
  user: any; // User ID
  type: NotificationType;
  title: string;
  message: string;
  data?: Record<string, any>; // Additional data for the notification
  status: NotificationStatus;
  externalUserId: string; // OneSignal external user ID
  playerId?: string; // OneSignal player ID
  sentAt?: Date;
  deliveredAt?: Date;
  readAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}
