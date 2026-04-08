"use server";
import AppServer from "@/lib/server";
import { ApiEndpoints } from "./endpoints";

// ==================== AUTH ENDPOINTS ====================
export const login = async (credentials: { email: string; password: string }) => {
  const response = await AppServer.post(`${ApiEndpoints.auth}/login`, credentials);
  return response;
};

export const register = async (userData: any) => {
  const response = await AppServer.post(`${ApiEndpoints.auth}/register`, userData);
  return response;
};

export const logout = async () => {
  const response = await AppServer.post(`${ApiEndpoints.auth}/logout`);
  return response;
};

export const refreshToken = async () => {
  const response = await AppServer.post(`${ApiEndpoints.auth}/refresh`);
  return response;
};

export const forgotPassword = async (email: string) => {
  const response = await AppServer.post(`${ApiEndpoints.auth}/forgot-password`, { email });
  return response;
};

export const resetPassword = async (token: string, password: string) => {
  const response = await AppServer.post(`${ApiEndpoints.auth}/reset-password`, { token, password });
  return response;
};

// ==================== USERS ENDPOINTS ====================
export const getUsers = async (query?: any) => {
  const response = await AppServer.get(`${ApiEndpoints.users}`, { query });
  return response;
};

export const getUser = async (id: string) => {
  const response = await AppServer.get(`${ApiEndpoints.users}/${id}`);
  return response;
};

// get my profile
export const getMyProfile = async () => {
  const response = await AppServer.get(`${ApiEndpoints.users}/profile/me`);
  return response;
};

// get user notifications
export const getUserNotifications = async () => {
  const response = await AppServer.get(`${ApiEndpoints.notifications}/user/me`);
  return response;
};

export const createUser = async (userData: any) => {
  const response = await AppServer.post(`${ApiEndpoints.users}`, userData);
  return response;
};

export const updateUser = async (id: string, userData: any) => {
  const response = await AppServer.patch(`${ApiEndpoints.users}/${id}`, userData);
  return response;
};

export const deleteUser = async (id: string) => {
  const response = await AppServer.delete(`${ApiEndpoints.users}/${id}`);
  return response;
};

export const getUserProfile = async () => {
  const response = await AppServer.get(`${ApiEndpoints.users}/profile`);
  return response;
};

export const updateUserProfile = async (profileData: any) => {
  const response = await AppServer.patch(`${ApiEndpoints.users}/profile`, profileData);
  return response;
};

// ==================== BOOKINGS ENDPOINTS ====================
export const getBookings = async (query?: any) => {
  const response = await AppServer.get(`${ApiEndpoints.bookings}`, { query });
  return response;
};

export const getBooking = async (id: string) => {
  const response = await AppServer.get(`${ApiEndpoints.bookings}/${id}`);
  return response;
};

export const createBooking = async (bookingData: any) => {
  const response = await AppServer.post(`${ApiEndpoints.bookings}`, bookingData);
  return response;
};

export const updateBooking = async (id: string, bookingData: any) => {
  const response = await AppServer.patch(`${ApiEndpoints.bookings}/${id}`, bookingData);
  return response;
};

export const deleteBooking = async (id: string) => {
  const response = await AppServer.delete(`${ApiEndpoints.bookings}/${id}`);
  return response;
};

export const cancelBooking = async (id: string) => {
  const response = await AppServer.patch(`${ApiEndpoints.bookings}/${id}/cancel`);
  return response;
};

export const confirmBooking = async (id: string) => {
  const response = await AppServer.patch(`${ApiEndpoints.bookings}/${id}/confirm`);
  return response;
};

// ==================== BRANDS ENDPOINTS ====================
export const getBrands = async (query?: any) => {
  const response = await AppServer.get(`${ApiEndpoints.brands}`, { query });
  return response;
};

export const getBrand = async (id: string) => {
  const response = await AppServer.get(`${ApiEndpoints.brands}/${id}`);
  return response;
};

export const createBrand = async (brandData: any) => {
  const response = await AppServer.post(`${ApiEndpoints.brands}`, brandData);
  return response;
};

export const updateBrand = async (id: string, brandData: any) => {
  const response = await AppServer.patch(`${ApiEndpoints.brands}/${id}`, brandData);
  return response;
};

export const deleteBrand = async (id: string) => {
  const response = await AppServer.delete(`${ApiEndpoints.brands}/${id}`);
  return response;
};

// ==================== EXPERTISE ENDPOINTS ====================
export const getExpertise = async (query?: any) => {
  const response = await AppServer.get(`${ApiEndpoints.expertise}`, { query });
  return response;
};

export const getExpertiseItem = async (id: string) => {
  const response = await AppServer.get(`${ApiEndpoints.expertise}/${id}`);
  return response;
};

export const createExpertise = async (expertiseData: any) => {
  const response = await AppServer.post(`${ApiEndpoints.expertise}`, expertiseData);
  return response;
};

export const updateExpertise = async (id: string, expertiseData: any) => {
  const response = await AppServer.patch(`${ApiEndpoints.expertise}/${id}`, expertiseData);
  return response;
};

export const deleteExpertise = async (id: string) => {
  const response = await AppServer.delete(`${ApiEndpoints.expertise}/${id}`);
  return response;
};

// ==================== NOTIFICATIONS ENDPOINTS ====================
export const getNotifications = async (query?: any) => {
  const response = await AppServer.get(`${ApiEndpoints.notifications}`, { query });
  return response;
};

export const getNotification = async (id: string) => {
  const response = await AppServer.get(`${ApiEndpoints.notifications}/${id}`);
  return response;
};

export const createNotification = async (notificationData: any) => {
  const response = await AppServer.post(`${ApiEndpoints.notifications}`, notificationData);
  return response;
};

export const updateNotification = async (id: string, notificationData: any) => {
  const response = await AppServer.patch(`${ApiEndpoints.notifications}/${id}`, notificationData);
  return response;
};

export const deleteNotification = async (id: string) => {
  const response = await AppServer.delete(`${ApiEndpoints.notifications}/${id}`);
  return response;
};

export const markNotificationAsRead = async (id: string) => {
  const response = await AppServer.patch(`${ApiEndpoints.notifications}/${id}/read`);
  return response;
};

export const markAllNotificationsAsRead = async () => {
  const response = await AppServer.patch(`${ApiEndpoints.notifications}/read-all`);
  return response;
};

// ==================== SERVICES ENDPOINTS ====================
export const getServices = async (query?: any) => {
  const response = await AppServer.get(`${ApiEndpoints.services}`, { query });
  return response;
};

export const getService = async (id: string) => {
  const response = await AppServer.get(`${ApiEndpoints.services}/${id}`);
  return response;
};

export const createService = async (serviceData: any) => {
  const response = await AppServer.post(`${ApiEndpoints.services}`, serviceData);
  return response;
};

export const updateService = async (id: string, serviceData: any) => {
  const response = await AppServer.patch(`${ApiEndpoints.services}/${id}`, serviceData);
  return response;
};

export const deleteService = async (id: string) => {
  const response = await AppServer.delete(`${ApiEndpoints.services}/${id}`);
  return response;
};

export const activateService = async (id: string) => {
  const response = await AppServer.patch(`${ApiEndpoints.services}/${id}/activate`);
  return response;
};

export const deactivateService = async (id: string) => {
  const response = await AppServer.patch(`${ApiEndpoints.services}/${id}/deactivate`);
  return response;
};

// ==================== UPLOADS ENDPOINTS ====================
export const uploadFile = async (file: File, options?: any) => {
  const formData = new FormData();
  formData.append("file", file);

  if (options) {
    Object.keys(options).forEach((key) => {
      formData.append(key, options[key]);
    });
  }

  const response = await AppServer.post(`${ApiEndpoints.uploads}`, formData, { isMultipart: true });
  return response;
};

export const uploadMultipleFiles = async (files: File[], options?: any) => {
  const formData = new FormData();

  files.forEach((file, index) => {
    formData.append(`files[${index}]`, file);
  });

  if (options) {
    Object.keys(options).forEach((key) => {
      formData.append(key, options[key]);
    });
  }

  const response = await AppServer.post(`${ApiEndpoints.uploads}/multiple`, formData, {
    isMultipart: true,
  });
  return response;
};

export const deleteUpload = async (id: string) => {
  const response = await AppServer.delete(`${ApiEndpoints.uploads}/${id}`);
  return response;
};

export const getUpload = async (id: string) => {
  const response = await AppServer.get(`${ApiEndpoints.uploads}/${id}`);
  return response;
};

// ==================== VEHICLES ENDPOINTS ====================
export const getVehicles = async (query?: any) => {
  const response = await AppServer.get(`${ApiEndpoints.vehicles}`, { query });
  return response;
};

export const getVehicle = async (id: string) => {
  const response = await AppServer.get(`${ApiEndpoints.vehicles}/${id}`);
  return response;
};

export const createVehicle = async (vehicleData: any) => {
  const response = await AppServer.post(`${ApiEndpoints.vehicles}`, vehicleData);
  return response;
};

export const updateVehicle = async (id: string, vehicleData: any) => {
  const response = await AppServer.patch(`${ApiEndpoints.vehicles}/${id}`, vehicleData);
  return response;
};

export const deleteVehicle = async (id: string) => {
  const response = await AppServer.delete(`${ApiEndpoints.vehicles}/${id}`);
  return response;
};

// ==================== SERVICES DOCUMENTS ENDPOINTS ====================
export const getServiceDocuments = async (query?: any) => {
  const response = await AppServer.get(`${ApiEndpoints.servicesDocuments}`, { query });
  return response;
};

export const getServiceDocument = async (id: string) => {
  const response = await AppServer.get(`${ApiEndpoints.servicesDocuments}/${id}`);
  return response;
};

export const createServiceDocument = async (documentData: any) => {
  const response = await AppServer.post(`${ApiEndpoints.servicesDocuments}`, documentData);
  return response;
};

export const updateServiceDocument = async (id: string, documentData: any) => {
  const response = await AppServer.patch(`${ApiEndpoints.servicesDocuments}/${id}`, documentData);
  return response;
};

export const deleteServiceDocument = async (id: string) => {
  const response = await AppServer.delete(`${ApiEndpoints.servicesDocuments}/${id}`);
  return response;
};

// ==================== SERVICES HOURS ENDPOINTS ====================
export const getServiceHours = async (query?: any) => {
  const response = await AppServer.get(`${ApiEndpoints.servicesHours}`, { query });
  return response;
};

export const getServiceHour = async (id: string) => {
  const response = await AppServer.get(`${ApiEndpoints.servicesHours}/${id}`);
  return response;
};

export const createServiceHour = async (hourData: any) => {
  const response = await AppServer.post(`${ApiEndpoints.servicesHours}`, hourData);
  return response;
};

export const updateServiceHour = async (id: string, hourData: any) => {
  const response = await AppServer.patch(`${ApiEndpoints.servicesHours}/${id}`, hourData);
  return response;
};

export const deleteServiceHour = async (id: string) => {
  const response = await AppServer.delete(`${ApiEndpoints.servicesHours}/${id}`);
  return response;
};

// ==================== SERVICES REPRESENTATIVES ENDPOINTS ====================
export const getServiceRepresentatives = async (query?: any) => {
  const response = await AppServer.get(`${ApiEndpoints.servicesRepresentatives}`, { query });
  return response;
};

export const getServiceRepresentative = async (id: string) => {
  const response = await AppServer.get(`${ApiEndpoints.servicesRepresentatives}/${id}`);
  return response;
};

export const createServiceRepresentative = async (representativeData: any) => {
  const response = await AppServer.post(
    `${ApiEndpoints.servicesRepresentatives}`,
    representativeData
  );
  return response;
};

export const updateServiceRepresentative = async (id: string, representativeData: any) => {
  const response = await AppServer.patch(
    `${ApiEndpoints.servicesRepresentatives}/${id}`,
    representativeData
  );
  return response;
};

export const deleteServiceRepresentative = async (id: string) => {
  const response = await AppServer.delete(`${ApiEndpoints.servicesRepresentatives}/${id}`);
  return response;
};

// ==================== SERVICES REVIEWS ENDPOINTS ====================
export const getServiceReviews = async (query?: any) => {
  const response = await AppServer.get(`${ApiEndpoints.servicesReviews}`, { query });
  return response;
};

export const getServiceReview = async (id: string) => {
  const response = await AppServer.get(`${ApiEndpoints.servicesReviews}/${id}`);
  return response;
};

export const createServiceReview = async (reviewData: any) => {
  const response = await AppServer.post(`${ApiEndpoints.servicesReviews}`, reviewData);
  return response;
};

export const updateServiceReview = async (id: string, reviewData: any) => {
  const response = await AppServer.patch(`${ApiEndpoints.servicesReviews}/${id}`, reviewData);
  return response;
};

export const deleteServiceReview = async (id: string) => {
  const response = await AppServer.delete(`${ApiEndpoints.servicesReviews}/${id}`);
  return response;
};

// ==================== SERVICES DOCUMENTS REQUIRED ENDPOINTS ====================
export const getServiceDocumentsRequired = async (query?: any) => {
  const response = await AppServer.get(`${ApiEndpoints.servicesDocumentsRequired}`, { query });
  return response;
};

export const getServiceDocumentRequired = async (id: string) => {
  const response = await AppServer.get(`${ApiEndpoints.servicesDocumentsRequired}/${id}`);
  return response;
};

export const createServiceDocumentRequired = async (documentData: any) => {
  const response = await AppServer.post(`${ApiEndpoints.servicesDocumentsRequired}`, documentData);
  return response;
};

export const updateServiceDocumentRequired = async (id: string, documentData: any) => {
  const response = await AppServer.patch(
    `${ApiEndpoints.servicesDocumentsRequired}/${id}`,
    documentData
  );
  return response;
};

export const deleteServiceDocumentRequired = async (id: string) => {
  const response = await AppServer.delete(`${ApiEndpoints.servicesDocumentsRequired}/${id}`);
  return response;
};

// ==================== DOCUMENT VERIFICATION ENDPOINTS ====================
export const getServiceDocumentsForVerification = async (serviceId: string) => {
  const response = await AppServer.get(`${ApiEndpoints.servicesDocuments}/service/${serviceId}`);
  return response;
};

export const verifyServiceDocument = async (documentId: string, verified: boolean) => {
  const response = await AppServer.patch(`${ApiEndpoints.servicesDocuments}/${documentId}`, {
    verified
  });
  return response;
};

export const approveServiceProvider = async (serviceId: string) => {
  const response = await AppServer.patch(`${ApiEndpoints.services}/${serviceId}/status`, {
    status: "approved"
  });
  return response;
};
