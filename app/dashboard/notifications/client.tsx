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
  Bell, 
  Calendar,
  Mail,
  User,
  AlertCircle,
  CheckCircle,
  Info,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  Download,
  RefreshCw,
  Settings,
  Volume2,
  VolumeX
} from "lucide-react";
import { toast } from "sonner";
import { 
  getNotifications, 
  deleteNotification, 
  updateNotification
} from "@/lib/actions";
import { INotification, NotificationType, NotificationStatus } from "@/types/notification";

export default function NotificationsClient() {
  const [notifications, setNotifications] = useState<INotification[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedNotification, setSelectedNotification] = useState<INotification | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const query: any = {
        page: currentPage,
        limit: 10,
        keyword: searchQuery,
      };

      if (statusFilter !== "all") {
        query.status = statusFilter;
      }

      if (typeFilter !== "all") {
        query.type = typeFilter;
      }

      const response = await getNotifications(query);
      
      if (response.success && response.data) {
        const data = response.data as any;
        setNotifications(data.notifications || data);
        if (data.pagination) {
          setTotalPages(data.pagination.totalPages);
        }
      } else {
        toast.error("Failed to fetch notifications");
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
      toast.error("Failed to fetch notifications");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, [currentPage, searchQuery, statusFilter, typeFilter]);

  const handleDeleteNotification = async (notificationId: string) => {
    if (!confirm("Are you sure you want to delete this notification?")) return;

    try {
      const response = await deleteNotification(notificationId);
      if (response.success) {
        toast.success("Notification deleted successfully");
        fetchNotifications();
      } else {
        toast.error(response.message || "Failed to delete notification");
      }
    } catch (error) {
      console.error("Error deleting notification:", error);
      toast.error("Failed to delete notification");
    }
  };

  const getStatusColor = (status: string) => {
    const colors = {
      sent: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      delivered: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      read: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200",
      failed: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
    };
    return colors[status as keyof typeof colors] || colors.read;
  };

  const getTypeColor = (type: string) => {
    const colors = {
      service_approved: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      service_rejected: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
      new_request: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      payment_received: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      service_update: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
      booking_status_update: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
      system_message: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
    };
    return colors[type as keyof typeof colors] || colors.system_message;
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "service_approved":
        return <CheckCircle className="h-4 w-4" />;
      case "service_rejected":
        return <AlertCircle className="h-4 w-4" />;
      case "new_request":
        return <Bell className="h-4 w-4" />;
      case "payment_received":
        return <CheckCircle className="h-4 w-4" />;
      case "service_update":
        return <Info className="h-4 w-4" />;
      case "booking_status_update":
        return <Calendar className="h-4 w-4" />;
      case "system_message":
        return <Settings className="h-4 w-4" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };

  const formatDate = (dateString: string | Date) => {
    if (!dateString) return "Not available";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Invalid date";
    
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  const getUnreadCount = () => {
    return notifications.filter(n => !n.readAt).length;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Notifications</h1>
          <p className="text-muted-foreground">Manage all system notifications</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={fetchNotifications} disabled={loading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Send Notification
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Bell className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Notifications</p>
                <p className="text-2xl font-bold text-foreground">{notifications.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center">
                <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Unread</p>
                <p className="text-2xl font-bold text-foreground">{getUnreadCount()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Sent</p>
                <p className="text-2xl font-bold text-foreground">
                  {notifications.filter(n => n.status === 'sent').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
                <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Failed</p>
                <p className="text-2xl font-bold text-foreground">
                  {notifications.filter(n => n.status === 'failed').length}
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
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search notifications..."
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
                <SelectItem value="sent">Sent</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="read">Read</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="service_approved">Service Approved</SelectItem>
                <SelectItem value="service_rejected">Service Rejected</SelectItem>
                <SelectItem value="new_request">New Request</SelectItem>
                <SelectItem value="payment_received">Payment Received</SelectItem>
                <SelectItem value="service_update">Service Update</SelectItem>
                <SelectItem value="booking_status_update">Booking Status Update</SelectItem>
                <SelectItem value="system_message">System Message</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="w-full">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Notifications Table */}
      <Card>
        <CardHeader>
          <CardTitle>Notifications ({notifications.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <RefreshCw className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Notification</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Sent Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {notifications.map((notification) => (
                    <TableRow key={notification._id} className={!notification.readAt ? "bg-blue-50 dark:bg-blue-950/20" : ""}>
                      <TableCell>
                        <div>
                          <div className="font-medium text-foreground">{notification.title}</div>
                          <div className="text-sm text-muted-foreground line-clamp-2">
                            {notification.message}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium text-foreground">User ID: {notification.user}</div>
                          <div className="text-sm text-muted-foreground">External ID: {notification.externalUserId}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getTypeIcon(notification.type)}
                          <Badge className={getTypeColor(notification.type)}>
                            {notification.type.replace('_', ' ')}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(notification.status)}>
                          {notification.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3 text-muted-foreground" />
                          {notification.sentAt ? formatDate(notification.sentAt) : "Not sent"}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setSelectedNotification(notification)}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-md">
                              <DialogHeader>
                                <DialogTitle>Notification Details</DialogTitle>
                              </DialogHeader>
                              {selectedNotification && (
                                <div className="space-y-4">
                                  <div>
                                    <h3 className="text-lg font-semibold text-foreground">{selectedNotification.title}</h3>
                                    <p className="text-muted-foreground">{selectedNotification.message}</p>
                                  </div>
                                  <div className="space-y-2">
                                    <div className="flex justify-between">
                                      <span className="text-muted-foreground">User ID:</span>
                                      <span className="text-foreground">{selectedNotification.user}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-muted-foreground">External User ID:</span>
                                      <span className="text-foreground">{selectedNotification.externalUserId}</span>
                                    </div>
                                    {selectedNotification.playerId && (
                                      <div className="flex justify-between">
                                        <span className="text-muted-foreground">Player ID:</span>
                                        <span className="text-foreground">{selectedNotification.playerId}</span>
                                      </div>
                                    )}
                                    <div className="flex justify-between">
                                      <span className="text-muted-foreground">Type:</span>
                                      <Badge className={getTypeColor(selectedNotification.type)}>
                                        {selectedNotification.type.replace('_', ' ')}
                                      </Badge>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-muted-foreground">Status:</span>
                                      <Badge className={getStatusColor(selectedNotification.status)}>
                                        {selectedNotification.status}
                                      </Badge>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-muted-foreground">Created:</span>
                                      <span className="text-foreground">{formatDate(selectedNotification.createdAt)}</span>
                                    </div>
                                    {selectedNotification.sentAt && (
                                      <div className="flex justify-between">
                                        <span className="text-muted-foreground">Sent:</span>
                                        <span className="text-foreground">{formatDate(selectedNotification.sentAt)}</span>
                                      </div>
                                    )}
                                    {selectedNotification.deliveredAt && (
                                      <div className="flex justify-between">
                                        <span className="text-muted-foreground">Delivered:</span>
                                        <span className="text-foreground">{formatDate(selectedNotification.deliveredAt)}</span>
                                      </div>
                                    )}
                                    {selectedNotification.readAt && (
                                      <div className="flex justify-between">
                                        <span className="text-muted-foreground">Read:</span>
                                        <span className="text-foreground">{formatDate(selectedNotification.readAt)}</span>
                                      </div>
                                    )}
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
                            onClick={() => handleDeleteNotification(notification._id)}
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
          <div className="text-sm text-muted-foreground">
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
