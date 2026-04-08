"use client"

import { useState, useEffect, Suspense } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Search,
  Filter,
  MapPin,
  Navigation,
  Users,
  Car,
  Truck,
  AlertCircle,
  CheckCircle,
  Clock,
  RefreshCw,
  Maximize2,
  ZoomIn,
  ZoomOut,
} from "lucide-react"
import { toast } from "sonner"

// Mock data for demo purposes
const mockPeople = [
  {
    id: "1",
    name: "John Smith",
    email: "john@example.com",
    phone: "+1 (555) 123-4567",
    status: "online",
    type: "driver",
    location: { lat: 40.7128, lng: -74.006, address: "New York, NY" },
    vehicle: "Toyota Camry - ABC123",
    lastSeen: new Date(),
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    phone: "+1 (555) 234-5678",
    status: "busy",
    type: "driver",
    location: { lat: 40.7589, lng: -73.9851, address: "Times Square, NY" },
    vehicle: "Honda Civic - XYZ789",
    lastSeen: new Date(Date.now() - 300000),
  },
  {
    id: "3",
    name: "Mike Wilson",
    email: "mike@example.com",
    phone: "+1 (555) 345-6789",
    status: "offline",
    type: "mechanic",
    location: { lat: 40.7505, lng: -73.9934, address: "Brooklyn Bridge, NY" },
    vehicle: "Service Van - DEF456",
    lastSeen: new Date(Date.now() - 1800000),
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily@example.com",
    phone: "+1 (555) 456-7890",
    status: "online",
    type: "customer",
    location: { lat: 40.7282, lng: -73.7949, address: "Queens, NY" },
    vehicle: null,
    lastSeen: new Date(),
  },
  {
    id: "5",
    name: "David Brown",
    email: "david@example.com",
    phone: "+1 (555) 567-8901",
    status: "busy",
    type: "driver",
    location: { lat: 40.6892, lng: -74.0445, address: "Staten Island, NY" },
    vehicle: "Ford F-150 - GHI789",
    lastSeen: new Date(Date.now() - 600000),
  },
]

function MapContent() {
  const [people, setPeople] = useState(mockPeople)
  const [filteredPeople, setFilteredPeople] = useState(mockPeople)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [selectedPerson, setSelectedPerson] = useState<(typeof mockPeople)[0] | null>(null)
  const [mapCenter, setMapCenter] = useState({ lat: 40.7128, lng: -74.006 })
  const [zoomLevel, setZoomLevel] = useState(12)

  useEffect(() => {
    let filtered = people

    if (searchQuery) {
      filtered = filtered.filter(
        (person) =>
          person.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          person.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          person.location.address.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((person) => person.status === statusFilter)
    }

    if (typeFilter !== "all") {
      filtered = filtered.filter((person) => person.type === typeFilter)
    }

    setFilteredPeople(filtered)
  }, [searchQuery, statusFilter, typeFilter, people])

  const getStatusColor = (status: string) => {
    const colors = {
      online: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      busy: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
      offline: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200",
    }
    return colors[status as keyof typeof colors] || colors.offline
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "driver":
        return <Car className="h-4 w-4" />
      case "mechanic":
        return <Truck className="h-4 w-4" />
      case "customer":
        return <Users className="h-4 w-4" />
      default:
        return <Users className="h-4 w-4" />
    }
  }

  const formatLastSeen = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / 60000)

    if (minutes < 1) return "Just now"
    if (minutes < 60) return `${minutes}m ago`
    const hours = Math.floor(minutes / 60)
    if (hours < 24) return `${hours}h ago`
    const days = Math.floor(hours / 24)
    return `${days}d ago`
  }

  const handlePersonClick = (person: (typeof mockPeople)[0]) => {
    setSelectedPerson(person)
    setMapCenter({ lat: person.location.lat, lng: person.location.lng })
  }

  const handleRefresh = () => {
    toast.success("Map data refreshed")
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Live Map</h1>
          <p className="text-muted-foreground">Track people and vehicles in real-time</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={handleRefresh}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button>
            <Maximize2 className="h-4 w-4 mr-2" />
            Fullscreen
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Online</p>
                <p className="text-2xl font-bold text-foreground">
                  {people.filter((p) => p.status === "online").length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center">
                <Clock className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Busy</p>
                <p className="text-2xl font-bold text-foreground">{people.filter((p) => p.status === "busy").length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                <AlertCircle className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Offline</p>
                <p className="text-2xl font-bold text-foreground">
                  {people.filter((p) => p.status === "offline").length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <MapPin className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total</p>
                <p className="text-2xl font-bold text-foreground">{people.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Map and Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Map */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Interactive Map</CardTitle>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" onClick={() => setZoomLevel(Math.min(zoomLevel + 1, 18))}>
                    <ZoomIn className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setZoomLevel(Math.max(zoomLevel - 1, 1))}>
                    <ZoomOut className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Demo Map Container */}
              <div className="relative h-96 bg-gradient-to-br from-blue-50 to-green-50 dark:from-blue-950 dark:to-green-950 rounded-lg overflow-hidden border">
                {/* Map Grid Pattern */}
                <div className="absolute inset-0 opacity-20">
                  <div className="grid grid-cols-12 grid-rows-8 h-full">
                    {Array.from({ length: 96 }).map((_, i) => (
                      <div key={i} className="border border-gray-300 dark:border-gray-600"></div>
                    ))}
                  </div>
                </div>

                {/* Roads */}
                <div className="absolute inset-0">
                  <div className="absolute top-1/2 left-0 right-0 h-2 bg-gray-400 dark:bg-gray-600 transform -translate-y-1/2"></div>
                  <div className="absolute top-0 bottom-0 left-1/2 w-2 bg-gray-400 dark:bg-gray-600 transform -translate-x-1/2"></div>
                  <div className="absolute top-1/4 left-1/4 right-1/4 h-1 bg-gray-300 dark:bg-gray-700"></div>
                  <div className="absolute top-3/4 left-1/4 right-1/4 h-1 bg-gray-300 dark:bg-gray-700"></div>
                </div>

                {/* Person Markers */}
                {filteredPeople.map((person, index) => {
                  const x = 20 + ((index * 60) % 300)
                  const y = 50 + ((index * 40) % 200)

                  return (
                    <div
                      key={person.id}
                      className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-200 hover:scale-110 ${
                        selectedPerson?.id === person.id ? "scale-125 z-10" : ""
                      }`}
                      style={{ left: `${x}px`, top: `${y}px` }}
                      onClick={() => handlePersonClick(person)}
                    >
                      <div
                        className={`w-6 h-6 rounded-full border-2 border-white shadow-lg flex items-center justify-center ${
                          person.status === "online"
                            ? "bg-green-500"
                            : person.status === "busy"
                              ? "bg-yellow-500"
                              : "bg-gray-500"
                        }`}
                      >
                        {getTypeIcon(person.type)}
                      </div>

                      {/* Tooltip */}
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 hover:opacity-100 transition-opacity whitespace-nowrap">
                        {person.name}
                      </div>
                    </div>
                  )
                })}

                {/* Selected Person Info Overlay */}
                {selectedPerson && (
                  <div className="absolute top-4 left-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg border max-w-xs">
                    <div className="flex items-center space-x-3 mb-3">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          selectedPerson.status === "online"
                            ? "bg-green-500"
                            : selectedPerson.status === "busy"
                              ? "bg-yellow-500"
                              : "bg-gray-500"
                        }`}
                      ></div>
                      <div>
                        <h3 className="font-semibold text-foreground">{selectedPerson.name}</h3>
                        <p className="text-sm text-muted-foreground">{selectedPerson.type}</p>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="text-foreground">{selectedPerson.location.address}</span>
                      </div>
                      {selectedPerson.vehicle && (
                        <div className="flex items-center space-x-2">
                          <Car className="h-4 w-4 text-muted-foreground" />
                          <span className="text-foreground">{selectedPerson.vehicle}</span>
                        </div>
                      )}
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-foreground">{formatLastSeen(selectedPerson.lastSeen)}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Map Controls */}
                <div className="absolute bottom-4 right-4 flex flex-col space-y-2">
                  <Button size="sm" variant="secondary">
                    <Navigation className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Filters */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Filters
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search people..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="space-y-2">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="online">Online</SelectItem>
                    <SelectItem value="busy">Busy</SelectItem>
                    <SelectItem value="offline">Offline</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="driver">Drivers</SelectItem>
                    <SelectItem value="mechanic">Mechanics</SelectItem>
                    <SelectItem value="customer">Customers</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* People List */}
          <Card>
            <CardHeader>
              <CardTitle>People ({filteredPeople.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {filteredPeople.map((person) => (
                  <div
                    key={person.id}
                    className={`flex items-center space-x-3 p-3 rounded-lg border cursor-pointer transition-colors hover:bg-accent ${
                      selectedPerson?.id === person.id ? "bg-accent border-primary" : ""
                    }`}
                    onClick={() => handlePersonClick(person)}
                  >
                    <div className="relative">
                      <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center">
                        {getTypeIcon(person.type)}
                      </div>
                      <div
                        className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                          person.status === "online"
                            ? "bg-green-500"
                            : person.status === "busy"
                              ? "bg-yellow-500"
                              : "bg-gray-500"
                        }`}
                      ></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground truncate">{person.name}</p>
                      <p className="text-sm text-muted-foreground truncate">{person.location.address}</p>
                    </div>
                    <div className="flex flex-col items-end space-y-1">
                      <Badge className={getStatusColor(person.status)}>{person.status}</Badge>
                      <span className="text-xs text-muted-foreground">{formatLastSeen(person.lastSeen)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default function MapPage() {
  return (
    <Suspense fallback={<div>Loading map...</div>}>
      <MapContent />
    </Suspense>
  )
}
