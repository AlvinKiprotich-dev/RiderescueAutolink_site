"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Car, Calendar, Building, Bell, DollarSign, Plus, ArrowRight } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { getUsers, getVehicles, getBookings, getServices, getNotifications } from "@/lib/actions";

interface DashboardStats {
  users: {
    total: number;
    active: number;
    newThisMonth: number;
  };
  vehicles: {
    total: number;
    active: number;
    inMaintenance: number;
  };
  bookings: {
    total: number;
    pending: number;
    completed: number;
    revenue: number;
  };
  providers: {
    total: number;
    active: number;
    avgRating: number;
  };
  notifications: {
    total: number;
    unread: number;
    sentToday: number;
  };
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    users: { total: 0, active: 0, newThisMonth: 0 },
    vehicles: { total: 0, active: 0, inMaintenance: 0 },
    bookings: { total: 0, pending: 0, completed: 0, revenue: 0 },
    providers: { total: 0, active: 0, avgRating: 0 },
    notifications: { total: 0, unread: 0, sentToday: 0 },
  });
  const [loading, setLoading] = useState(true);
  const [recentBookings, setRecentBookings] = useState<any[]>([]);
  const [recentUsers, setRecentUsers] = useState<any[]>([]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      // Fetch all data in parallel
      const [usersRes, vehiclesRes, bookingsRes, providersRes, notificationsRes]: any[] =
        await Promise.all([
          getUsers({ limit: 1000 }),
          getVehicles({ limit: 1000 }),
          getBookings({ limit: 1000 }),
          getServices({ limit: 1000 }),
          getNotifications({ limit: 1000 }),
        ]);

      const users = usersRes.success ? usersRes.data?.users || usersRes.data || [] : [];
      const vehicles = vehiclesRes.success
        ? vehiclesRes.data?.vehicles || vehiclesRes.data || []
        : [];
      const bookings = bookingsRes.success
        ? bookingsRes.data?.bookings || bookingsRes.data || []
        : [];
      const providers = providersRes.success
        ? providersRes.data?.services || providersRes.data || []
        : [];
      const notifications = notificationsRes.success
        ? notificationsRes.data?.notifications || notificationsRes.data || []
        : [];

      // Calculate stats
      const now = new Date();
      const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

      setStats({
        users: {
          total: users.length,
          active: users.filter((u: any) => u.status === "active").length,
          newThisMonth: users.filter((u: any) => new Date(u.createdAt) >= thisMonth).length,
        },
        vehicles: {
          total: vehicles.length,
          active: vehicles.filter((v: any) => v.status === "active").length,
          inMaintenance: vehicles.filter((v: any) => v.status === "maintenance").length,
        },
        bookings: {
          total: bookings.length,
          pending: bookings.filter((b: any) => b.status === "pending").length,
          completed: bookings.filter((b: any) => b.status === "completed").length,
          revenue: bookings.reduce(
            (sum: number, b: any) => sum + (b.actualCost || b.estimatedCost || 0),
            0
          ),
        },
        providers: {
          total: providers.length,
          active: providers.filter((p: any) => p.status === "active").length,
          avgRating:
            providers.length > 0
              ? providers.reduce((sum: number, p: any) => sum + (p.rating || 0), 0) /
                providers.length
              : 0,
        },
        notifications: {
          total: notifications.length,
          unread: notifications.filter((n: any) => !n.readAt).length,
          sentToday: notifications.filter((n: any) => n.sentAt && new Date(n.sentAt) >= today)
            .length,
        },
      });

      // Get recent data
      setRecentBookings(bookings.slice(0, 5));
      setRecentUsers(users.slice(0, 5));
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      toast.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusColor = (status: string) => {
    const colors = {
      active: "bg-green-100 text-green-800",
      pending: "bg-yellow-100 text-yellow-800",
      completed: "bg-blue-100 text-blue-800",
      maintenance: "bg-orange-100 text-orange-800",
    };
    return colors[status as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Welcome to your RideRescue admin dashboard</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button onClick={fetchDashboardData} variant="outline">
            <ArrowRight className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Booking
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.users.total}</div>
            <p className="text-xs text-muted-foreground">
              +{stats.users.newThisMonth} new this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.bookings.total}</div>
            <p className="text-xs text-muted-foreground">{stats.bookings.pending} pending</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(stats.bookings.revenue)}</div>
            <p className="text-xs text-muted-foreground">
              {stats.bookings.completed} completed bookings
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Providers</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.providers.active}</div>
            <p className="text-xs text-muted-foreground">
              Avg rating: {stats.providers.avgRating.toFixed(1)}/5
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Stats */}
      {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Users Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Active Users</span>
              <Badge className="bg-green-100 text-green-800">{stats.users.active}</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">New This Month</span>
              <Badge variant="outline">{stats.users.newThisMonth}</Badge>
            </div>
            <Link href="/dashboard/users">
              <Button variant="outline" className="w-full">
                View All Users
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Car className="h-5 w-5" />
              Vehicles Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Active Vehicles</span>
              <Badge className="bg-green-100 text-green-800">{stats.vehicles.active}</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">In Maintenance</span>
              <Badge className="bg-orange-100 text-orange-800">
                {stats.vehicles.inMaintenance}
              </Badge>
            </div>
            <Link href="/dashboard/vehicles">
              <Button variant="outline" className="w-full">
                View All Vehicles
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Unread</span>
              <Badge className="bg-yellow-100 text-yellow-800">{stats.notifications.unread}</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Sent Today</span>
              <Badge variant="outline">{stats.notifications.sentToday}</Badge>
            </div>
            <Link href="/dashboard/notifications">
              <Button variant="outline" className="w-full">
                View All Notifications
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div> */}

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentBookings.map((booking) => (
                <div
                  key={booking._id}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <div className="h-8 w-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                      <Calendar className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <p className="font-medium">{booking.user?.name || "Unknown User"}</p>
                      <p className="text-sm text-muted-foreground">
                        {booking.service?.name || "Unknown Service"}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className={getStatusColor(booking.status)}>{booking.status}</Badge>
                    <p className="text-xs text-muted-foreground mt-1">
                      {formatDate(booking.createdAt)}
                    </p>
                  </div>
                </div>
              ))}
              {recentBookings.length === 0 && (
                <p className="text-muted-foreground text-center py-4">No recent bookings</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentUsers.map((user) => (
                <div
                  key={user._id}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <div className="h-8 w-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                      <Users className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className={getStatusColor(user.status)}>{user.status}</Badge>
                    <p className="text-xs text-muted-foreground mt-1">
                      {formatDate(user.createdAt)}
                    </p>
                  </div>
                </div>
              ))}
              {recentUsers.length === 0 && (
                <p className="text-muted-foreground text-center py-4">No recent users</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link href="/dashboard/bookings">
              <Button variant="outline" className="w-full h-20 flex-col">
                <Calendar className="h-6 w-6 mb-2" />
                <span>New Booking</span>
              </Button>
            </Link>
            <Link href="/dashboard/users">
              <Button variant="outline" className="w-full h-20 flex-col">
                <Users className="h-6 w-6 mb-2" />
                <span>Add User</span>
              </Button>
            </Link>
            <Link href="/dashboard/vehicles">
              <Button variant="outline" className="w-full h-20 flex-col">
                <Car className="h-6 w-6 mb-2" />
                <span>Add Vehicle</span>
              </Button>
            </Link>
            <Link href="/dashboard/providers">
              <Button variant="outline" className="w-full h-20 flex-col">
                <Building className="h-6 w-6 mb-2" />
                <span>Add Provider</span>
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
