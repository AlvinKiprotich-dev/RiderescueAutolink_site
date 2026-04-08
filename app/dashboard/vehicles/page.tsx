"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Search, 
  Filter, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Car, 
  Calendar,
  MapPin,
  User,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  Download,
  RefreshCw,
  Fuel,
  Settings,
  AlertTriangle
} from "lucide-react";
import { toast } from "sonner";
import { getVehicles, deleteVehicle, updateVehicle } from "@/lib/actions";
import { IVehicle, VehicleStatus, VehicleType } from "@/types/vehicle";

export default function VehiclesPage() {
  const [vehicles, setVehicles] = useState<IVehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedVehicle, setSelectedVehicle] = useState<IVehicle | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

  const fetchVehicles = async () => {
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

      const response = await getVehicles(query);
      
      if (response.success && response.data) {
        const data = response.data as any;
        setVehicles(data.vehicles || data);
        if (data.pagination) {
          setTotalPages(data.pagination.totalPages);
        }
      } else {
        toast.error("Failed to fetch vehicles");
      }
    } catch (error) {
      console.error("Error fetching vehicles:", error);
      toast.error("Failed to fetch vehicles");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, [currentPage, searchQuery, statusFilter, typeFilter]);

  // Debounce search query to avoid too many API calls
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery !== "") {
        setCurrentPage(1); // Reset to first page when searching
        fetchVehicles();
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleDeleteVehicle = async (vehicleId: string) => {
    if (!confirm("Are you sure you want to delete this vehicle?")) return;

    try {
      const response = await deleteVehicle(vehicleId);
      if (response.success) {
        toast.success("Vehicle deleted successfully");
        fetchVehicles();
      } else {
        toast.error(response.message || "Failed to delete vehicle");
      }
    } catch (error) {
      console.error("Error deleting vehicle:", error);
      toast.error("Failed to delete vehicle");
    }
  };

  const handleStatusChange = async (vehicleId: string, newStatus: string) => {
    try {
      const response = await updateVehicle(vehicleId, { status: newStatus });
      if (response.success) {
        toast.success("Vehicle status updated successfully");
        fetchVehicles();
      } else {
        toast.error(response.message || "Failed to update vehicle status");
      }
    } catch (error) {
      console.error("Error updating vehicle status:", error);
      toast.error("Failed to update vehicle status");
    }
  };

  const getStatusColor = (status: VehicleStatus) => {
    const colors = {
      [VehicleStatus.GOOD_CONDITION]: "bg-green-100 text-green-800",
      [VehicleStatus.NEEDS_MAINTENANCE]: "bg-yellow-100 text-yellow-800",
      [VehicleStatus.HIDDEN]: "bg-gray-100 text-gray-800"
    };
    return colors[status] || colors[VehicleStatus.GOOD_CONDITION];
  };

  const getTypeColor = (type: string) => {
    const colors = {
      [VehicleType.CAR]: "bg-blue-100 text-blue-800",
      [VehicleType.TRUCK]: "bg-green-100 text-green-800",
      [VehicleType.MOTORCYCLE]: "bg-purple-100 text-purple-800",
      [VehicleType.BUS]: "bg-orange-100 text-orange-800",
      [VehicleType.VAN]: "bg-indigo-100 text-indigo-800",
      [VehicleType.TRAILER]: "bg-red-100 text-red-800",
      [VehicleType.BIKE]: "bg-pink-100 text-pink-800",
      [VehicleType.OTHER]: "bg-gray-100 text-gray-800"
    };
    return colors[type as keyof typeof colors] || colors[VehicleType.OTHER];
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

  const isExpiringSoon = (dateString: string) => {
    const expiryDate = new Date(dateString);
    const today = new Date();
    const diffTime = expiryDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 30 && diffDays > 0;
  };

  const isExpired = (dateString: string) => {
    const expiryDate = new Date(dateString);
    const today = new Date();
    return expiryDate < today;
  };

  const getUniqueMakes = () => {
    const makes = vehicles.map(vehicle => vehicle.make);
    return [...new Set(makes)];
  };

  return (
    <div className="space-y-6 container mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Vehicles</h1>
          <p className="text-muted-foreground">Manage all vehicles in the system</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={fetchVehicles} disabled={loading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Vehicle
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Car className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Total Vehicles</p>
                <p className="text-2xl font-bold">{vehicles.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                <Car className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Good Condition</p>
                <p className="text-2xl font-bold">
                  {vehicles.filter(v => v.status === VehicleStatus.GOOD_CONDITION).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-yellow-100 rounded-full flex items-center justify-center">
                <Settings className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Needs Maintenance</p>
                <p className="text-2xl font-bold">
                  {vehicles.filter(v => v.status === VehicleStatus.NEEDS_MAINTENANCE).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-red-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Hidden</p>
                <p className="text-2xl font-bold">
                  {vehicles.filter(v => 
                    v.status === VehicleStatus.HIDDEN
                  ).length}
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
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search vehicles..."
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
                <SelectItem value={VehicleStatus.GOOD_CONDITION}>Good Condition</SelectItem>
                <SelectItem value={VehicleStatus.NEEDS_MAINTENANCE}>Needs Maintenance</SelectItem>
                <SelectItem value={VehicleStatus.HIDDEN}>Hidden</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value={VehicleType.CAR}>Car</SelectItem>
                <SelectItem value={VehicleType.TRUCK}>Truck</SelectItem>
                <SelectItem value={VehicleType.MOTORCYCLE}>Motorcycle</SelectItem>
                <SelectItem value={VehicleType.BUS}>Bus</SelectItem>
                <SelectItem value={VehicleType.VAN}>Van</SelectItem>
                <SelectItem value={VehicleType.TRAILER}>Trailer</SelectItem>
                <SelectItem value={VehicleType.BIKE}>Bike</SelectItem>
                <SelectItem value={VehicleType.OTHER}>Other</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="w-full">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Vehicles Table */}
      <Card>
        <CardHeader>
          <CardTitle>Vehicles ({vehicles.length})</CardTitle>
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
                    <TableHead>Vehicle</TableHead>
                    <TableHead>Owner</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Insurance</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {vehicles.map((vehicle) => (
                    <TableRow key={vehicle._id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">
                            {vehicle.year} {vehicle.make} {vehicle.model}
                          </div>
                          <div className="text-sm text-gray-500">
                            {vehicle.numberPlate} • {vehicle.color}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{vehicle.owner?.name || 'N/A'}</div>
                          <div className="text-sm text-gray-500">{vehicle.owner?.email || 'N/A'}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getTypeColor(vehicle.type)}>
                          {vehicle.type}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(vehicle.status)}>
                          {vehicle.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {vehicle.insurancePolicyExpirationDate ? (
                          <div className={`flex items-center gap-1 ${
                            isExpired(vehicle.insurancePolicyExpirationDate.toString()) ? 'text-red-600' :
                            isExpiringSoon(vehicle.insurancePolicyExpirationDate.toString()) ? 'text-yellow-600' : 'text-gray-600'
                          }`}>
                            <Calendar className="h-3 w-3" />
                            {formatDate(vehicle.insurancePolicyExpirationDate)}
                          </div>
                        ) : (
                          <span className="text-gray-400">Not set</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3 text-gray-400" />
                          {formatDate(vehicle.createdAt)}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setSelectedVehicle(vehicle)}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-md">
                              <DialogHeader>
                                <DialogTitle>Vehicle Details</DialogTitle>
                              </DialogHeader>
                              {selectedVehicle && (
                                <div className="space-y-4">
                                  <div>
                                    <h3 className="text-lg font-semibold">
                                      {selectedVehicle.year} {selectedVehicle.make} {selectedVehicle.model}
                                    </h3>
                                    <p className="text-gray-600">{selectedVehicle.numberPlate}</p>
                                  </div>
                                  <div className="space-y-2">
                                    <div className="flex justify-between">
                                      <span className="text-gray-600">Color:</span>
                                      <span>{selectedVehicle.color}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-gray-600">Status:</span>
                                      <Badge className={getStatusColor(selectedVehicle.status)}>
                                        {selectedVehicle.status}
                                      </Badge>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-gray-600">Type:</span>
                                      <Badge className={getTypeColor(selectedVehicle.type)}>
                                        {selectedVehicle.type}
                                      </Badge>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-gray-600">VIN:</span>
                                      <span>{selectedVehicle.vin}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-gray-600">Owner:</span>
                                      <span>{selectedVehicle.owner?.name || 'N/A'}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-gray-600">Insurance Company:</span>
                                      <span>{selectedVehicle.insuranceCompany}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-gray-600">Insurance Expiry:</span>
                                      <span>{formatDate(selectedVehicle.insurancePolicyExpirationDate)}</span>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </DialogContent>
                          </Dialog>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteVehicle(vehicle._id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
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
    </div>
  );
}
