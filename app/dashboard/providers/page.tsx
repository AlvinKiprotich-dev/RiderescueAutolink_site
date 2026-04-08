"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Search, 
  Filter, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Building, 
  MapPin,
  Phone,
  Mail,
  Star,
  ChevronLeft,
  ChevronRight,
  Download,
  RefreshCw,
  Clock,
  CheckCircle,
  AlertCircle,
  FileText
} from "lucide-react";
import { toast } from "sonner";
import { getServices, deleteService, updateService } from "@/lib/actions";
import { IService, ServiceStatus, ServiceType } from "@/types/service";
import DocumentVerificationDialog from "@/components/document-verification-dialog";

export default function ServiceProvidersPage() {
  const [services, setServices] = useState<IService[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedService, setSelectedService] = useState<IService | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isDocumentDialogOpen, setIsDocumentDialogOpen] = useState(false);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const query: any = {
        limit: 10,
      };

      // Only add page parameter if not on page 1
      if (currentPage > 1) {
        query.page = currentPage;
      }

      // Only add search parameter if not empty
      if (searchQuery.trim()) {
        query.keyword = searchQuery;
      }

      // Only add filters if not "all"
      if (statusFilter !== "all") {
        query.status = statusFilter;
      }

      if (typeFilter !== "all") {
        query.type = typeFilter;
      }

      const response = await getServices(query);
      
      if (response.success && response.data) {
        const data = response.data as any;
        setServices(data.services || data);
        if (data.pagination) {
          setTotalPages(data.pagination.totalPages);
        }
      } else {
        toast.error("Failed to fetch services");
      }
    } catch (error) {
      console.error("Error fetching services:", error);
      toast.error("Failed to fetch services");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, [currentPage, searchQuery, statusFilter, typeFilter]);

  // Debounce search query to avoid too many API calls
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery !== "") {
        setCurrentPage(1); // Reset to first page when searching
        fetchServices();
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleDeleteService = async (serviceId: string) => {
    if (!confirm("Are you sure you want to delete this service?")) return;

    try {
      const response = await deleteService(serviceId);
      if (response.success) {
        toast.success("Service deleted successfully");
        fetchServices();
      } else {
        toast.error(response.message || "Failed to delete service");
      }
    } catch (error) {
      console.error("Error deleting service:", error);
      toast.error("Failed to delete service");
    }
  };

  const handleStatusChange = async (serviceId: string, newStatus: string) => {
    try {
      const response = await updateService(serviceId, { status: newStatus });
      if (response.success) {
        toast.success("Service status updated successfully");
        fetchServices();
      } else {
        toast.error(response.message || "Failed to update service status");
      }
    } catch (error) {
      console.error("Error updating service status:", error);
      toast.error("Failed to update service status");
    }
  };

  const getStatusColor = (status: ServiceStatus) => {
    const colors = {
      [ServiceStatus.PENDING]: "bg-yellow-100 text-yellow-800",
      [ServiceStatus.APPROVED]: "bg-green-100 text-green-800",
      [ServiceStatus.SUSPENDED]: "bg-red-100 text-red-800",
      [ServiceStatus.REJECTED]: "bg-gray-100 text-gray-800"
    };
    return colors[status] || colors[ServiceStatus.PENDING];
  };

  const getTypeColor = (type: ServiceType) => {
    const colors = {
      [ServiceType.MECHANIC]: "bg-blue-100 text-blue-800",
      [ServiceType.GARAGE]: "bg-green-100 text-green-800",
      [ServiceType.TOWING]: "bg-purple-100 text-purple-800"
    };
    return colors[type] || colors[ServiceType.MECHANIC];
  };

  const formatDate = (date: Date | string) => {
    try {
      const dateObj = typeof date === 'string' ? new Date(date) : date;
      if (isNaN(dateObj.getTime())) {
        return 'Invalid Date';
      }
      return dateObj.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric"
      });
    } catch (error) {
      return 'Invalid Date';
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(word => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getUniqueCities = () => {
    const cities = services.map(service => service.city);
    return [...new Set(cities)];
  };

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`h-4 w-4 ${
            i <= rating ? "text-yellow-400 fill-current" : "text-gray-300"
          }`}
        />
      );
    }
    return stars;
  };

  const isCurrentlyAvailable = (isAvailable: boolean) => {
    return isAvailable;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Services</h1>
          <p className="text-muted-foreground">Manage all services in the system</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button 
            variant="outline" 
            onClick={() => {
              setStatusFilter(ServiceStatus.PENDING);
              setCurrentPage(1);
            }}
            className="bg-yellow-50 border-yellow-200 text-yellow-700 hover:bg-yellow-100"
          >
            <FileText className="h-4 w-4 mr-2" />
            Pending ({services.filter(s => s.status === ServiceStatus.PENDING).length})
          </Button>
          <Button variant="outline" onClick={fetchServices} disabled={loading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Building className="h-6 w-6 text-blue-600" />
              <div>
                <p className="text-xs font-medium text-gray-600">Total</p>
                <p className="text-xl font-bold">{services.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="h-6 w-6 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-600">Approved</p>
                <p className="text-xl font-bold">
                  {services.filter(s => s.status === ServiceStatus.APPROVED).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="h-6 w-6 bg-yellow-100 rounded-full flex items-center justify-center">
                <FileText className="h-4 w-4 text-yellow-600" />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-600">Pending</p>
                <p className="text-xl font-bold">
                  {services.filter(s => s.status === ServiceStatus.PENDING).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="h-6 w-6 bg-purple-100 rounded-full flex items-center justify-center">
                <Star className="h-4 w-4 text-purple-600" />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-600">Avg Rating</p>
                <p className="text-xl font-bold">
                  {services.length > 0 
                    ? (services.reduce((sum, s) => sum + s.rating, 0) / services.length).toFixed(1)
                    : "0.0"
                  }
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search providers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value={ServiceStatus.PENDING}>Pending Review</SelectItem>
                <SelectItem value={ServiceStatus.APPROVED}>Approved</SelectItem>
                <SelectItem value={ServiceStatus.SUSPENDED}>Suspended</SelectItem>
                <SelectItem value={ServiceStatus.REJECTED}>Rejected</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value={ServiceType.MECHANIC}>Mechanic</SelectItem>
                <SelectItem value={ServiceType.GARAGE}>Garage</SelectItem>
                <SelectItem value={ServiceType.TOWING}>Towing</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Services Table */}
      <Card>
        <CardHeader>
          <CardTitle>Services ({services.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <RefreshCw className="h-8 w-8 animate-spin text-gray-400" />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Provider</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Verification</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {services.map((service) => (
                    <TableRow key={service._id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar>
                            <AvatarImage src={service.photo} />
                            <AvatarFallback>{getInitials(service.name)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{service.name}</div>
                            <div className="text-sm text-gray-500">
                              {service.email}
                            </div>
                            <div className="text-xs text-gray-400">
                              {service.areaOfExpertise.length} expertise areas
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <Badge className={getTypeColor(service.type)}>
                            {service.type}
                          </Badge>
                          <div className="text-xs text-gray-500">
                            {service.isAvailable ? (
                              <span className="text-green-600">Available</span>
                            ) : (
                              <span className="text-gray-500">Unavailable</span>
                            )}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          {renderStars(service.rating)}
                          <span className="text-xs text-gray-600">
                            ({service.reviewCount})
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setSelectedService(service);
                                setIsDocumentDialogOpen(true);
                              }}
                              className="text-xs"
                              title="View and verify uploaded documents"
                            >
                              <FileText className="h-3 w-3 mr-1" />
                              Documents
                            </Button>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => setSelectedService(service)}
                                >
                                  <Eye className="h-3 w-3" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-md">
                                <DialogHeader>
                                  <DialogTitle>Service Details</DialogTitle>
                                </DialogHeader>
                                {selectedService && (
                                  <div className="space-y-4">
                                    <div className="flex items-center space-x-3">
                                      <Avatar className="h-16 w-16">
                                        <AvatarImage src={selectedService.photo} />
                                        <AvatarFallback>{getInitials(selectedService.name)}</AvatarFallback>
                                      </Avatar>
                                      <div>
                                        <h3 className="text-lg font-semibold">{selectedService.name}</h3>
                                        <p className="text-gray-600">{selectedService.email}</p>
                                      </div>
                                    </div>
                                    <div className="space-y-2">
                                      <div className="flex justify-between">
                                        <span className="text-gray-600">Type:</span>
                                        <Badge className={getTypeColor(selectedService.type)}>
                                          {selectedService.type}
                                        </Badge>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-gray-600">Status:</span>
                                        <Badge className={getStatusColor(selectedService.status)}>
                                          {selectedService.status}
                                        </Badge>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-gray-600">Rating:</span>
                                        <div className="flex items-center gap-1">
                                          {renderStars(selectedService.rating)}
                                          <span>({selectedService.reviewCount})</span>
                                        </div>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-gray-600">Phone:</span>
                                        <span>{selectedService.phone}</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-gray-600">Address:</span>
                                        <span>{selectedService.address}</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-gray-600">About:</span>
                                        <span>{selectedService.about}</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-gray-600">Created:</span>
                                        <span>{formatDate(selectedService.createdAt)}</span>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </DialogContent>
                            </Dialog>
                          </div>
                          <div className="flex items-center gap-1">
                            <Badge className={getStatusColor(service.status)}>
                              {service.status}
                            </Badge>
                            {service.status === ServiceStatus.PENDING && (
                              <Badge variant="outline" className="text-xs text-yellow-600">
                                Review
                              </Badge>
                            )}
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Document Verification Dialog */}
      <DocumentVerificationDialog
        service={selectedService}
        isOpen={isDocumentDialogOpen}
        onClose={() => {
          setIsDocumentDialogOpen(false);
          setSelectedService(null);
        }}
        onServiceUpdated={fetchServices}
      />
    </div>
  );
}
