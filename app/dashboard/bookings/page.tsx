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
  Calendar, 
  Clock,
  MapPin,
  User,
  Car,
  Building,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  Download,
  RefreshCw,
  CheckCircle,
  XCircle,
  AlertCircle,
  DollarSign
} from "lucide-react";
import { toast } from "sonner";
import { getBookings, deleteBooking, updateBooking, confirmBooking, cancelBooking } from "@/lib/actions";
import { IBooking, BookingStatus } from "@/types/booking";

export default function BookingsPage() {
  const [bookings, setBookings] = useState<IBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");  
  const [serviceTypeFilter, setServiceTypeFilter] = useState("all");
  const [pairingFilter, setPairingFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedBooking, setSelectedBooking] = useState<IBooking | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

  const fetchBookings = async () => {
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

      if (serviceTypeFilter !== "all") {
        query.serviceType = serviceTypeFilter;
      }

      if (pairingFilter !== "all") {
        query.isPaired = pairingFilter === "paired";
      }

      const response = await getBookings(query);
      
      if (response.success && response.data) {
        const data = response.data as any;
        setBookings(data.bookings || data);
        if (data.pagination) {
          setTotalPages(data.pagination.totalPages);
        }
      } else {
        toast.error("Failed to fetch bookings");
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
      toast.error("Failed to fetch bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [currentPage, searchQuery, statusFilter, serviceTypeFilter, pairingFilter]);

  // Debounce search query to avoid too many API calls
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery !== "") {
        setCurrentPage(1); // Reset to first page when searching
        fetchBookings();
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleDeleteBooking = async (bookingId: string) => {
    if (!confirm("Are you sure you want to delete this booking?")) return;

    try {
      const response = await deleteBooking(bookingId);
      if (response.success) {
        toast.success("Booking deleted successfully");
        fetchBookings();
      } else {
        toast.error(response.message || "Failed to delete booking");
      }
    } catch (error) {
      console.error("Error deleting booking:", error);
      toast.error("Failed to delete booking");
    }
  };

  const handleConfirmBooking = async (bookingId: string) => {
    try {
      const response = await confirmBooking(bookingId);
      if (response.success) {
        toast.success("Booking confirmed successfully");
        fetchBookings();
      } else {
        toast.error(response.message || "Failed to confirm booking");
      }
    } catch (error) {
      console.error("Error confirming booking:", error);
      toast.error("Failed to confirm booking");
    }
  };

  const handleCancelBooking = async (bookingId: string) => {
    try {
      const response = await cancelBooking(bookingId);
      if (response.success) {
        toast.success("Booking cancelled successfully");
        fetchBookings();
      } else {
        toast.error(response.message || "Failed to cancel booking");
      }
    } catch (error) {
      console.error("Error cancelling booking:", error);
      toast.error("Failed to cancel booking");
    }
  };

  const getStatusColor = (status: BookingStatus) => {
    const colors = {
      [BookingStatus.PENDING]: "bg-yellow-100 text-yellow-800",
      [BookingStatus.ACCEPTED]: "bg-blue-100 text-blue-800",
      [BookingStatus.REJECTED]: "bg-red-100 text-red-800",
      [BookingStatus.COMPLETED]: "bg-green-100 text-green-800"
    };
    return colors[status] || colors[BookingStatus.PENDING];
  };

  const getStatusIcon = (status: BookingStatus) => {
    switch (status) {
      case BookingStatus.ACCEPTED:
        return <CheckCircle className="h-4 w-4" />;
      case BookingStatus.REJECTED:
        return <XCircle className="h-4 w-4" />;
      case BookingStatus.PENDING:
        return <AlertCircle className="h-4 w-4" />;
      case BookingStatus.COMPLETED:
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
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

  const formatTime = (date: Date | string) => {
    try {
      const dateObj = typeof date === 'string' ? new Date(date) : date;
      if (isNaN(dateObj.getTime())) {
        return 'Invalid Time';
      }
      return dateObj.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit"
      });
    } catch (error) {
      return 'Invalid Time';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD"
    }).format(amount);
  };

  const getServiceTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "towing":
        return <Car className="h-4 w-4" />;
      case "mechanic":
      case "garage":
        return <Building className="h-4 w-4" />;
      default:
        return <Building className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Bookings</h1>
          <p className="text-muted-foreground">Manage all service bookings in the system</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={fetchBookings} disabled={loading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Booking
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Total Bookings</p>
                <p className="text-2xl font-bold">{bookings.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-yellow-100 rounded-full flex items-center justify-center">
                <AlertCircle className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold">
                  {bookings.filter(b => b.status === BookingStatus.PENDING).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold">
                  {bookings.filter(b => b.status === BookingStatus.COMPLETED).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-purple-100 rounded-full flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Total Bookings</p>
                <p className="text-2xl font-bold">
                  {bookings.length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Paired</p>
                <p className="text-2xl font-bold">
                  {bookings.filter(b => b.isPaired).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-orange-100 rounded-full flex items-center justify-center">
                <AlertCircle className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Not Paired</p>
                <p className="text-2xl font-bold">
                  {bookings.filter(b => !b.isPaired).length}
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
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search bookings..."
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
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
                <SelectItem value="no_show">No Show</SelectItem>
              </SelectContent>
            </Select>
            <Select value={serviceTypeFilter} onValueChange={setServiceTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Service Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="towing">Towing</SelectItem>
                <SelectItem value="mechanic">Mechanic</SelectItem>
                <SelectItem value="repair">Repair</SelectItem>
                <SelectItem value="emergency">Emergency</SelectItem>
              </SelectContent>
            </Select>
            <Select value={pairingFilter} onValueChange={setPairingFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Pairing Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Pairing</SelectItem>
                <SelectItem value="paired">Paired</SelectItem>
                <SelectItem value="not_paired">Not Paired</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="w-full">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Bookings Table */}
      <Card>
        <CardHeader>
          <CardTitle>Bookings ({bookings.length})</CardTitle>
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
                    <TableHead>Booking</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Service</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Vehicle</TableHead>
                    <TableHead>Pairing</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bookings.map((booking) => (
                    <TableRow key={booking._id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">#{booking._id?.slice(-6) || 'N/A'}</div>
                          <div className="text-sm text-gray-500">
                            {formatDate(booking.createdAt)}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{booking.user?.name || 'N/A'}</div>
                          <div className="text-sm text-gray-500">{booking.user?.email || 'N/A'}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getServiceTypeIcon(booking.service?.type || '')}
                          <div>
                            <div className="font-medium">{booking.service?.name || 'N/A'}</div>
                            <div className="text-sm text-gray-500">{booking.service?.user?.name || 'N/A'}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3 text-gray-400" />
                          <span className="text-sm">Location</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{formatDate(booking.scheduledDate || new Date())}</div>
                          <div className="text-sm text-gray-500">{formatTime(booking.scheduledDate || new Date())}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          {getStatusIcon(booking.status)}
                          <Badge className={getStatusColor(booking.status)}>
                            {booking.status}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="text-sm text-gray-500">
                            Vehicle: {booking.vehicle?.make || 'N/A'} {booking.vehicle?.model || ''}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Badge className={booking.isPaired ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>
                            {booking.isPaired ? "Paired" : "Not Paired"}
                          </Badge>
                          {booking.pairingCode && (
                            <span className="text-xs font-mono bg-gray-100 px-2 py-1 rounded">
                              {booking.pairingCode}
                            </span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setSelectedBooking(booking)}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-md">
                              <DialogHeader>
                                <DialogTitle>Booking Details</DialogTitle>
                              </DialogHeader>
                              {selectedBooking && (
                                <div className="space-y-4">
                                  <div>
                                    <h3 className="text-lg font-semibold">
                                      Booking #{selectedBooking._id?.slice(-6) || 'N/A'}
                                    </h3>
                                    <p className="text-gray-600">{selectedBooking.service?.name || 'N/A'}</p>
                                  </div>
                                  <div className="space-y-2">
                                    <div className="flex justify-between">
                                      <span className="text-gray-600">Customer:</span>
                                      <span>{selectedBooking.user?.name || 'N/A'}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-gray-600">Email:</span>
                                      <span>{selectedBooking.user?.email || 'N/A'}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-gray-600">Phone:</span>
                                      <span>{selectedBooking.user?.phone || 'N/A'}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-gray-600">Service Provider:</span>
                                      <span>{selectedBooking.service.user?.name || 'N/A'}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-gray-600">Status:</span>
                                      <Badge className={getStatusColor(selectedBooking.status)}>
                                        {selectedBooking.status}
                                      </Badge>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-gray-600">Date:</span>
                                      <span>{formatDate(selectedBooking.scheduledDate || new Date())}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-gray-600">Time:</span>
                                      <span>{formatTime(selectedBooking.scheduledDate || new Date())}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-gray-600">Location:</span>
                                      <span>Coordinates: {selectedBooking.location?.coordinates?.join(', ') || 'N/A'}</span>
                                    </div>
                                    {selectedBooking.vehicle && (
                                      <div className="flex justify-between">
                                        <span className="text-gray-600">Vehicle:</span>
                                        <span>{selectedBooking.vehicle?.make || 'N/A'} {selectedBooking.vehicle?.model || ''}</span>
                                      </div>
                                    )}
                                    <div className="flex justify-between">
                                      <span className="text-gray-600">Description:</span>
                                      <span>{selectedBooking.description || 'N/A'}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-gray-600">Pairing Status:</span>
                                      <Badge className={selectedBooking.isPaired ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>
                                        {selectedBooking.isPaired ? "Paired" : "Not Paired"}
                                      </Badge>
                                    </div>
                                    {selectedBooking.pairingCode && (
                                      <div className="flex justify-between">
                                        <span className="text-gray-600">Pairing Code:</span>
                                        <span className="font-mono font-bold text-lg">{selectedBooking.pairingCode}</span>
                                      </div>
                                    )}
                                    {selectedBooking.pairedAt && (
                                      <div className="flex justify-between">
                                        <span className="text-gray-600">Paired At:</span>
                                        <span>{formatDate(selectedBooking.pairedAt)} {formatTime(selectedBooking.pairedAt)}</span>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              )}
                            </DialogContent>
                          </Dialog>
                          {booking.status === BookingStatus.PENDING && (
                            <>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => handleConfirmBooking(booking._id)}
                              >
                                <CheckCircle className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => handleCancelBooking(booking._id)}
                              >
                                <XCircle className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteBooking(booking._id)}
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
