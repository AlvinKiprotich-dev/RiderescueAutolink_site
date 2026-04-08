"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Bell, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Settings, 
  LogOut,
  CheckCircle,
  AlertCircle,
  Info,
  Calendar,
  Clock,
  X,
  RefreshCw
} from "lucide-react";
import { toast } from "sonner";
import { 
  getMyProfile, 
  getUserNotifications, 
  markNotificationAsRead, 
  markAllNotificationsAsRead,
  logout 
} from "@/lib/actions";
import { INotification, NotificationType, NotificationStatus } from "@/types/notification";

interface UserProfile {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  role: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function UserProfile() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [notifications, setNotifications] = useState<INotification[]>([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      const response: any = await getMyProfile();
      if (response.success && response.data) {
        setUser(response.data.user as UserProfile);
      } else {
        toast.error("Failed to fetch user profile");
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
      toast.error("Failed to fetch user profile");
    } finally {
      setLoading(false);
    }
  };

  const fetchNotifications = async () => {
    try {
      const response = await getUserNotifications();
      if (response.success && response.data) {
        const data = response.data as any;
        setNotifications(data.notifications || data || []);
        setUnreadCount((data.notifications || data || []).filter((n: INotification) => !n.readAt).length);
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  const handleMarkAsRead = async (notificationId: string) => {
    try {
      const response = await markNotificationAsRead(notificationId);
      if (response.success) {
        toast.success("Notification marked as read");
        fetchNotifications();
      } else {
        toast.error(response.message || "Failed to mark notification as read");
      }
    } catch (error) {
      console.error("Error marking notification as read:", error);
      toast.error("Failed to mark notification as read");
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      const response = await markAllNotificationsAsRead();
      if (response.success) {
        toast.success("All notifications marked as read");
        fetchNotifications();
      } else {
        toast.error(response.message || "Failed to mark all notifications as read");
      }
    } catch (error) {
      console.error("Error marking all notifications as read:", error);
      toast.error("Failed to mark all notifications as read");
    }
  };

  const handleLogout = async () => {
    try {
      const response = await logout();
      if (response.success) {
        toast.success("Logged out successfully");
        // Redirect to login page
        window.location.href = "/login";
      } else {
        toast.error(response.message || "Failed to logout");
      }
    } catch (error) {
      console.error("Error logging out:", error);
      toast.error("Failed to logout");
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "service_approved":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "service_rejected":
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      case "new_request":
        return <Bell className="h-4 w-4 text-blue-600" />;
      case "payment_received":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "service_update":
        return <Info className="h-4 w-4 text-yellow-600" />;
      case "booking_status_update":
        return <Calendar className="h-4 w-4 text-purple-600" />;
      case "system_message":
        return <Settings className="h-4 w-4 text-gray-600" />;
      default:
        return <Bell className="h-4 w-4 text-gray-600" />;
    }
  };

  const getNotificationColor = (type: string) => {
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

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  useEffect(() => {
    fetchUserProfile();
    fetchNotifications();
  }, []);

  useEffect(() => {
    if (isOpen) {
      fetchNotifications();
    }
  }, [isOpen]);

  if (loading) {
    return (
      <div className="flex items-center gap-3">
        <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
          <RefreshCw className="h-4 w-4 animate-spin text-muted-foreground" />
        </div>
        <span className="text-sm font-medium text-muted-foreground">Loading...</span>
      </div>
    );
  }

  return (
    <>
      {/* User Profile Button */}
      <div className="flex items-center gap-4">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5 text-muted-foreground" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                  {unreadCount > 9 ? "9+" : unreadCount}
                </span>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-96 sm:w-[540px]">
            <SheetHeader>
              <SheetTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notifications ({notifications.length})
              </SheetTitle>
            </SheetHeader>
            <div className="mt-6 space-y-4">
              {/* Notification Actions */}
              <div className="flex items-center justify-between">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleMarkAllAsRead}
                  disabled={unreadCount === 0}
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Mark All Read
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={fetchNotifications}
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh
                </Button>
              </div>

              {/* Notifications List */}
              <ScrollArea className="h-[calc(100vh-200px)]">
                <div className="space-y-3">
                  {notifications.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <Bell className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
                      <p>No notifications</p>
                    </div>
                  ) : (
                    notifications.map((notification) => (
                      <Card 
                        key={notification._id} 
                        className={`transition-colors ${
                          !notification.readAt 
                            ? "bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800" 
                            : ""
                        }`}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 mt-1">
                              {getNotificationIcon(notification.type)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2">
                                <div className="flex-1">
                                  <h4 className="font-medium text-foreground line-clamp-1">
                                    {notification.title}
                                  </h4>
                                  <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                                    {notification.message}
                                  </p>
                                  <div className="flex items-center gap-2 mt-2">
                                    <Badge className={getNotificationColor(notification.type)}>
                                      {notification.type.replace('_', ' ')}
                                    </Badge>
                                    <span className="text-xs text-muted-foreground">
                                      {formatDate(notification.createdAt)}
                                    </span>
                                  </div>
                                </div>
                                {!notification.readAt && (
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleMarkAsRead(notification._id)}
                                    className="flex-shrink-0"
                                  >
                                    <CheckCircle className="h-4 w-4" />
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>
              </ScrollArea>
            </div>
          </SheetContent>
        </Sheet>

        {/* User Profile */}
        <Sheet>
          <SheetTrigger asChild>
            <div className="flex items-center gap-3 cursor-pointer hover:bg-muted/50 rounded-lg p-2 transition-colors">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user?.avatar} alt={user?.name} />
                <AvatarFallback className="text-xs">
                  {user ? getInitials(user.name) : "U"}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium text-foreground hidden sm:block">
                {user?.name || "User"}
              </span>
            </div>
          </SheetTrigger>
          <SheetContent side="right" className="w-80">
            <SheetHeader>
              <SheetTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Profile
              </SheetTitle>
            </SheetHeader>
            <div className="mt-6 space-y-6">
              {/* User Info */}
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={user?.avatar} alt={user?.name} />
                      <AvatarFallback className="text-lg">
                        {user ? getInitials(user.name) : "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground">{user?.name}</h3>
                      <p className="text-sm text-muted-foreground">{user?.email}</p>
                      <Badge className="mt-1">
                        {user?.role || "User"}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Info */}
              {user?.phone && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Contact Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-foreground">{user.email}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-foreground">{user.phone}</span>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Account Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Account Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Status</span>
                    <Badge className={user?.isActive ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" : "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"}>
                      {user?.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Member Since</span>
                    <span className="text-sm text-foreground">
                      {user?.createdAt ? formatDate(user.createdAt) : "N/A"}
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* Actions */}
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start text-destructive hover:text-destructive"
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
