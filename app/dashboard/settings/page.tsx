"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Building,
  Wrench,
  FileText,
  Settings,
  Plus,
  Search,
  Filter,
  Download,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import {
  getBrands,
  createBrand,
  updateBrand,
  deleteBrand,
  getExpertise,
  createExpertise,
  updateExpertise,
  deleteExpertise,
  getServiceDocumentsRequired,
  createServiceDocumentRequired,
  updateServiceDocumentRequired,
  deleteServiceDocumentRequired,
} from "@/lib/actions";
import { IBrand, BrandCategory } from "@/types/brand";
import { IExpertise, Category } from "@/types/expertise";
import { IRequiredDocument, DocumentType } from "@/types/document";
import { ServiceType } from "@/types/service";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("brands");
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Brands state
  const [brands, setBrands] = useState<IBrand[]>([]);
  const [isBrandDialogOpen, setIsBrandDialogOpen] = useState(false);
  const [editingBrand, setEditingBrand] = useState<IBrand | null>(null);
  const [brandForm, setBrandForm] = useState({
    name: "",
    description: "",
    category: BrandCategory.AUTOMOTIVE,
    isActive: true,
  });

  // Expertise state
  const [expertise, setExpertise] = useState<IExpertise[]>([]);
  const [isExpertiseDialogOpen, setIsExpertiseDialogOpen] = useState(false);
  const [editingExpertise, setEditingExpertise] = useState<IExpertise | null>(null);
  const [expertiseForm, setExpertiseForm] = useState({
    name: "",
    description: "",
    category: Category.MECHANICAL,
    serviceTypes: [] as ServiceType[],
    isActive: true,
    estimatedCost: 0,
    estimatedDurationHrs: 1,
  });

  // Required Documents state
  const [requiredDocuments, setRequiredDocuments] = useState<IRequiredDocument[]>([]);
  const [isDocumentDialogOpen, setIsDocumentDialogOpen] = useState(false);
  const [editingDocument, setEditingDocument] = useState<IRequiredDocument | null>(null);
  const [documentForm, setDocumentForm] = useState({
    serviceType: "",
    documentType: DocumentType.LICENSE,
    name: "",
    description: "",
    required: true,
    order: 1,
    isActive: true,
  });

  const fetchBrands = async () => {
    try {
      setLoading(true);
      const response = await getBrands({
        keyword: searchQuery,
        status: statusFilter !== "all" ? statusFilter : undefined,
      });
      if (response.success && response.data) {
        const data = response.data as any;
        setBrands(data.brands || data || []);
      }
    } catch (error) {
      toast.error("Failed to fetch brands");
    } finally {
      setLoading(false);
    }
  };

  const fetchExpertise = async () => {
    try {
      setLoading(true);
      const response = await getExpertise({
        keyword: searchQuery,
        status: statusFilter !== "all" ? statusFilter : undefined,
      });
      if (response.success && response.data) {
        const data = response.data as any;
        setExpertise(data.expertise || data || []);
      }
    } catch (error) {
      toast.error("Failed to fetch expertise");
    } finally {
      setLoading(false);
    }
  };

  const fetchRequiredDocuments = async () => {
    try {
      setLoading(true);
      const response = await getServiceDocumentsRequired({
        keyword: searchQuery,
        status: statusFilter !== "all" ? statusFilter : undefined,
      });
      if (response.success && response.data) {
        const data = response.data as any;
        setRequiredDocuments(data.requiredDocuments || data || []);
      }
    } catch (error) {
      toast.error("Failed to fetch required documents");
    } finally {
      setLoading(false);
    }
  };

  // Load data when component mounts
  useEffect(() => {
    fetchBrands();
  }, []);

  // Load data when tab changes
  useEffect(() => {
    if (activeTab === "brands") {
      fetchBrands();
    } else if (activeTab === "expertise") {
      fetchExpertise();
    } else if (activeTab === "documents") {
      fetchRequiredDocuments();
    }
  }, [activeTab]);

  // Load data when filters change
  useEffect(() => {
    if (activeTab === "brands") {
      fetchBrands();
    } else if (activeTab === "expertise") {
      fetchExpertise();
    } else if (activeTab === "documents") {
      fetchRequiredDocuments();
    }
  }, [searchQuery, statusFilter]);

  const handleBrandSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingBrand) {
        const response = await updateBrand(editingBrand._id, brandForm);
        if (response.success) {
          toast.success("Brand updated successfully");
          setIsBrandDialogOpen(false);
          setEditingBrand(null);
          resetBrandForm();
          fetchBrands();
        } else {
          toast.error(response.message || "Failed to update brand");
        }
      } else {
        const response = await createBrand(brandForm);
        if (response.success) {
          toast.success("Brand created successfully");
          setIsBrandDialogOpen(false);
          resetBrandForm();
          fetchBrands();
        } else {
          toast.error(response.message || "Failed to create brand");
        }
      }
    } catch (error) {
      toast.error("Failed to save brand");
    }
  };

  const handleExpertiseSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingExpertise) {
        const response = await updateExpertise(editingExpertise._id, expertiseForm);
        if (response.success) {
          toast.success("Expertise updated successfully");
          setIsExpertiseDialogOpen(false);
          setEditingExpertise(null);
          resetExpertiseForm();
          fetchExpertise();
        } else {
          toast.error(response.message || "Failed to update expertise");
        }
      } else {
        const response = await createExpertise(expertiseForm);
        if (response.success) {
          toast.success("Expertise created successfully");
          setIsExpertiseDialogOpen(false);
          resetExpertiseForm();
          fetchExpertise();
        } else {
          toast.error(response.message || "Failed to create expertise");
        }
      }
    } catch (error) {
      toast.error("Failed to save expertise");
    }
  };

  const handleDocumentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingDocument) {
        const response = await updateServiceDocumentRequired(editingDocument._id, documentForm);
        if (response.success) {
          toast.success("Required document updated successfully");
          setIsDocumentDialogOpen(false);
          setEditingDocument(null);
          resetDocumentForm();
          fetchRequiredDocuments();
        } else {
          toast.error(response.message || "Failed to update required document");
        }
      } else {
        const response = await createServiceDocumentRequired(documentForm);
        if (response.success) {
          toast.success("Required document created successfully");
          setIsDocumentDialogOpen(false);
          resetDocumentForm();
          fetchRequiredDocuments();
        } else {
          toast.error(response.message || "Failed to create required document");
        }
      }
    } catch (error) {
      toast.error("Failed to save required document");
    }
  };

  const handleDeleteBrand = async (brandId: string) => {
    if (!confirm("Are you sure you want to delete this brand?")) return;
    try {
      const response = await deleteBrand(brandId);
      if (response.success) {
        toast.success("Brand deleted successfully");
        fetchBrands();
      } else {
        toast.error(response.message || "Failed to delete brand");
      }
    } catch (error) {
      toast.error("Failed to delete brand");
    }
  };

  const handleDeleteExpertise = async (expertiseId: string) => {
    if (!confirm("Are you sure you want to delete this expertise?")) return;
    try {
      const response = await deleteExpertise(expertiseId);
      if (response.success) {
        toast.success("Expertise deleted successfully");
        fetchExpertise();
      } else {
        toast.error(response.message || "Failed to delete expertise");
      }
    } catch (error) {
      toast.error("Failed to delete expertise");
    }
  };

  const handleDeleteDocument = async (documentId: string) => {
    if (!confirm("Are you sure you want to delete this required document?")) return;
    try {
      const response = await deleteServiceDocumentRequired(documentId);
      if (response.success) {
        toast.success("Required document deleted successfully");
        fetchRequiredDocuments();
      } else {
        toast.error(response.message || "Failed to delete required document");
      }
    } catch (error) {
      toast.error("Failed to delete required document");
    }
  };

  const resetBrandForm = () => {
    setBrandForm({
      name: "",
      description: "",
      category: BrandCategory.AUTOMOTIVE,
      isActive: true,
    });
  };

  const resetExpertiseForm = () => {
    setExpertiseForm({
      name: "",
      description: "",
      category: Category.MECHANICAL,
      serviceTypes: [],
      isActive: true,
      estimatedCost: 0,
      estimatedDurationHrs: 1,
    });
  };

  const resetDocumentForm = () => {
    setDocumentForm({
      serviceType: "",
      documentType: DocumentType.LICENSE,
      name: "",
      description: "",
      required: true,
      order: 1,
      isActive: true,
    });
  };

  const openBrandDialog = (brand?: IBrand) => {
    if (brand) {
      setEditingBrand(brand);
      setBrandForm({
        name: brand.name,
        description: brand.description || "",
        category: brand.category,
        isActive: brand.isActive,
      });
    } else {
      setEditingBrand(null);
      resetBrandForm();
    }
    setIsBrandDialogOpen(true);
  };

  const openExpertiseDialog = (expertise?: IExpertise) => {
    if (expertise) {
      setEditingExpertise(expertise);
      setExpertiseForm({
        name: expertise.name,
        description: expertise.description || "",
        category: expertise.category,
        serviceTypes: expertise.serviceTypes,
        isActive: expertise.isActive,
        estimatedCost: expertise.estimatedCost || 0,
        estimatedDurationHrs: expertise.estimatedDurationHrs || 1,
      });
    } else {
      setEditingExpertise(null);
      resetExpertiseForm();
    }
    setIsExpertiseDialogOpen(true);
  };

  const openDocumentDialog = (document?: IRequiredDocument) => {
    if (document) {
      setEditingDocument(document);
      setDocumentForm({
        serviceType: document.serviceType,
        documentType: document.documentType,
        name: document.name,
        description: document.description,
        required: document.required,
        order: document.order,
        isActive: document.isActive,
      });
    } else {
      setEditingDocument(null);
      resetDocumentForm();
    }
    setIsDocumentDialogOpen(true);
  };

  const getStatusColor = (isActive: boolean) => {
    return isActive
      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      : "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      automotive: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
      motorcycle: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
      truck: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
      bus: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
      other: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300",
    };
    return colors[category as keyof typeof colors] || colors.other;
  };

  const getExpertiseCategoryColor = (category: string) => {
    const colors = {
      mechanical: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
      electrical: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
      diagnostic: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
      other: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300",
    };
    return colors[category as keyof typeof colors] || colors.other;
  };

  const formatDate = (dateString: string | Date) => {
    if (!dateString) return "Not available";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Invalid date";

    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-6 container mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground">Manage system configuration and data</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            onClick={() => {
              if (activeTab === "brands") fetchBrands();
              else if (activeTab === "expertise") fetchExpertise();
              else if (activeTab === "documents") fetchRequiredDocuments();
            }}
            disabled={loading}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>
      </div>

      {/* Settings Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="brands" className="flex items-center gap-2">
            <Building className="h-4 w-4" />
            Brands
          </TabsTrigger>
          <TabsTrigger value="expertise" className="flex items-center gap-2">
            <Wrench className="h-4 w-4" />
            Expertise
          </TabsTrigger>
          <TabsTrigger value="documents" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Required Documents
          </TabsTrigger>
        </TabsList>

        {/* Brands Tab */}
        <TabsContent value="brands" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Brand Management</CardTitle>
                <Button onClick={() => openBrandDialog()}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Brand
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Filters */}
                <div className="flex items-center gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search brands..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>

                {/* Brands Table */}
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Brand Name</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Created</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {loading ? (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center py-8">
                            <RefreshCw className="h-8 w-8 animate-spin text-muted-foreground mx-auto" />
                          </TableCell>
                        </TableRow>
                      ) : brands.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                            No brands found
                          </TableCell>
                        </TableRow>
                      ) : (
                        brands.map((brand) => (
                          <TableRow key={brand._id}>
                            <TableCell className="font-medium text-foreground">
                              {brand.name}
                            </TableCell>
                            <TableCell>
                              <Badge className={getCategoryColor(brand.category)}>
                                {brand.category}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-muted-foreground">
                              {brand.description || "No description"}
                            </TableCell>
                            <TableCell>
                              <Badge className={getStatusColor(brand.isActive)}>
                                {brand.isActive ? "Active" : "Inactive"}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-muted-foreground">
                              {formatDate(brand.createdAt)}
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex items-center justify-end space-x-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => openBrandDialog(brand)}
                                >
                                  Edit
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleDeleteBrand(brand._id)}
                                  className="text-destructive"
                                >
                                  Delete
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Expertise Tab */}
        <TabsContent value="expertise" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Expertise Management</CardTitle>
                <Button onClick={() => openExpertiseDialog()}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Expertise
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Filters */}
                <div className="flex items-center gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search expertise..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>

                {/* Expertise Table */}
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Expertise Name</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Estimated Cost</TableHead>
                        <TableHead>Duration (hrs)</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Created</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {loading ? (
                        <TableRow>
                          <TableCell colSpan={8} className="text-center py-8">
                            <RefreshCw className="h-8 w-8 animate-spin text-muted-foreground mx-auto" />
                          </TableCell>
                        </TableRow>
                      ) : expertise.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                            No expertise found
                          </TableCell>
                        </TableRow>
                      ) : (
                        expertise.map((item) => (
                          <TableRow key={item._id}>
                            <TableCell className="font-medium text-foreground">
                              {item.name}
                            </TableCell>
                            <TableCell>
                              <Badge className={getExpertiseCategoryColor(item.category)}>
                                {item.category}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-muted-foreground">
                              {item.description || "No description"}
                            </TableCell>
                            <TableCell className="text-foreground">
                              ${item.estimatedCost || 0}
                            </TableCell>
                            <TableCell className="text-foreground">
                              {item.estimatedDurationHrs || 1}h
                            </TableCell>
                            <TableCell>
                              <Badge className={getStatusColor(item.isActive)}>
                                {item.isActive ? "Active" : "Inactive"}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-muted-foreground">
                              {formatDate(item.createdAt)}
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex items-center justify-end space-x-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => openExpertiseDialog(item)}
                                >
                                  Edit
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleDeleteExpertise(item._id)}
                                  className="text-destructive"
                                >
                                  Delete
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Required Documents Tab */}
        <TabsContent value="documents" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Required Documents Management</CardTitle>
                <Button onClick={() => openDocumentDialog()}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Document
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Filters */}
                <div className="flex items-center gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search documents..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>

                {/* Documents Table */}
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Document Name</TableHead>
                        <TableHead>Service Type</TableHead>
                        <TableHead>Document Type</TableHead>
                        <TableHead>Required</TableHead>
                        <TableHead>Order</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Created</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {loading ? (
                        <TableRow>
                          <TableCell colSpan={9} className="text-center py-8">
                            <RefreshCw className="h-8 w-8 animate-spin text-muted-foreground mx-auto" />
                          </TableCell>
                        </TableRow>
                      ) : requiredDocuments.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
                            No required documents found
                          </TableCell>
                        </TableRow>
                      ) : (
                        (Array.isArray(requiredDocuments) ? requiredDocuments : []).map(
                          (document) => (
                            <TableRow key={document._id}>
                              <TableCell className="font-medium text-foreground">
                                {document.name}
                              </TableCell>
                              <TableCell>
                                <Badge variant="outline" className="capitalize">
                                  {document.serviceType}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <Badge variant="outline" className="capitalize">
                                  {document.documentType.replace("_", " ")}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <Badge
                                  className={
                                    document.required
                                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                                      : "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
                                  }
                                >
                                  {document.required ? "Required" : "Optional"}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-foreground">{document.order}</TableCell>
                              <TableCell className="text-muted-foreground">
                                {document.description || "No description"}
                              </TableCell>
                              <TableCell>
                                <Badge className={getStatusColor(document.isActive)}>
                                  {document.isActive ? "Active" : "Inactive"}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-muted-foreground">
                                {formatDate(document.createdAt)}
                              </TableCell>
                              <TableCell className="text-right">
                                <div className="flex items-center justify-end space-x-2">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => openDocumentDialog(document)}
                                  >
                                    Edit
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleDeleteDocument(document._id)}
                                    className="text-destructive"
                                  >
                                    Delete
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          )
                        )
                      )}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Brand Dialog */}
      <Dialog open={isBrandDialogOpen} onOpenChange={setIsBrandDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{editingBrand ? "Edit Brand" : "Add New Brand"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleBrandSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="brand-name">Brand Name</Label>
              <Input
                id="brand-name"
                value={brandForm.name}
                onChange={(e) => setBrandForm({ ...brandForm, name: e.target.value })}
                placeholder="Enter brand name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="brand-category">Category</Label>
              <Select
                value={brandForm.category}
                onValueChange={(value) =>
                  setBrandForm({ ...brandForm, category: value as BrandCategory })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={BrandCategory.AUTOMOTIVE}>Automotive</SelectItem>
                  <SelectItem value={BrandCategory.MOTORCYCLE}>Motorcycle</SelectItem>
                  <SelectItem value={BrandCategory.TRUCK}>Truck</SelectItem>
                  <SelectItem value={BrandCategory.BUS}>Bus</SelectItem>
                  <SelectItem value={BrandCategory.OTHER}>Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="brand-description">Description</Label>
              <Textarea
                id="brand-description"
                value={brandForm.description}
                onChange={(e) => setBrandForm({ ...brandForm, description: e.target.value })}
                placeholder="Enter brand description"
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="brand-status">Status</Label>
              <Select
                value={brandForm.isActive.toString()}
                onValueChange={(value) =>
                  setBrandForm({ ...brandForm, isActive: value === "true" })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="true">Active</SelectItem>
                  <SelectItem value="false">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={() => setIsBrandDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">{editingBrand ? "Update Brand" : "Create Brand"}</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Expertise Dialog */}
      <Dialog open={isExpertiseDialogOpen} onOpenChange={setIsExpertiseDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{editingExpertise ? "Edit Expertise" : "Add New Expertise"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleExpertiseSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="expertise-name">Expertise Name</Label>
              <Input
                id="expertise-name"
                value={expertiseForm.name}
                onChange={(e) => setExpertiseForm({ ...expertiseForm, name: e.target.value })}
                placeholder="Enter expertise name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="expertise-category">Category</Label>
              <Select
                value={expertiseForm.category}
                onValueChange={(value) =>
                  setExpertiseForm({ ...expertiseForm, category: value as Category })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={Category.MECHANICAL}>Mechanical</SelectItem>
                  <SelectItem value={Category.ELECTRICAL}>Electrical</SelectItem>
                  <SelectItem value={Category.DIAGNOSTIC}>Diagnostic</SelectItem>
                  <SelectItem value={Category.OTHER}>Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="expertise-estimated-cost">Estimated Cost ($)</Label>
              <Input
                id="expertise-estimated-cost"
                type="number"
                value={expertiseForm.estimatedCost}
                onChange={(e) =>
                  setExpertiseForm({
                    ...expertiseForm,
                    estimatedCost: parseFloat(e.target.value) || 0,
                  })
                }
                placeholder="0"
                min="0"
                step="0.01"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="expertise-duration">Estimated Duration (hours)</Label>
              <Input
                id="expertise-duration"
                type="number"
                value={expertiseForm.estimatedDurationHrs}
                onChange={(e) =>
                  setExpertiseForm({
                    ...expertiseForm,
                    estimatedDurationHrs: parseFloat(e.target.value) || 1,
                  })
                }
                placeholder="1"
                min="0.5"
                step="0.5"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="expertise-description">Description</Label>
              <Textarea
                id="expertise-description"
                value={expertiseForm.description}
                onChange={(e) =>
                  setExpertiseForm({ ...expertiseForm, description: e.target.value })
                }
                placeholder="Enter expertise description"
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="expertise-status">Status</Label>
              <Select
                value={expertiseForm.isActive.toString()}
                onValueChange={(value) =>
                  setExpertiseForm({ ...expertiseForm, isActive: value === "true" })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="true">Active</SelectItem>
                  <SelectItem value="false">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-end space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsExpertiseDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit">
                {editingExpertise ? "Update Expertise" : "Create Expertise"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Required Document Dialog */}
      <Dialog open={isDocumentDialogOpen} onOpenChange={setIsDocumentDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {editingDocument ? "Edit Required Document" : "Add New Required Document"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleDocumentSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="document-name">Document Name</Label>
              <Input
                id="document-name"
                value={documentForm.name}
                onChange={(e) => setDocumentForm({ ...documentForm, name: e.target.value })}
                placeholder="Enter document name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="document-service-type">Service Type</Label>
              <Input
                id="document-service-type"
                value={documentForm.serviceType}
                onChange={(e) => setDocumentForm({ ...documentForm, serviceType: e.target.value })}
                placeholder="Enter service type"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="document-type">Document Type</Label>
              <Select
                value={documentForm.documentType}
                onValueChange={(value) =>
                  setDocumentForm({ ...documentForm, documentType: value as DocumentType })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={DocumentType.LICENSE}>License</SelectItem>
                  <SelectItem value={DocumentType.VEHICLE_REGISTRATION}>
                    Vehicle Registration
                  </SelectItem>
                  <SelectItem value={DocumentType.INSURANCE}>Insurance</SelectItem>
                  <SelectItem value={DocumentType.PROFESSIONAL_CERTIFICATE}>
                    Professional Certificate
                  </SelectItem>
                  <SelectItem value={DocumentType.OTHER}>Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="document-order">Order</Label>
              <Input
                id="document-order"
                type="number"
                value={documentForm.order}
                onChange={(e) =>
                  setDocumentForm({ ...documentForm, order: parseInt(e.target.value) || 1 })
                }
                placeholder="1"
                min="1"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="document-required">Required</Label>
              <Select
                value={documentForm.required.toString()}
                onValueChange={(value) =>
                  setDocumentForm({ ...documentForm, required: value === "true" })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="true">Required</SelectItem>
                  <SelectItem value="false">Optional</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="document-description">Description</Label>
              <Textarea
                id="document-description"
                value={documentForm.description}
                onChange={(e) => setDocumentForm({ ...documentForm, description: e.target.value })}
                placeholder="Enter document description"
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="document-status">Status</Label>
              <Select
                value={documentForm.isActive.toString()}
                onValueChange={(value) =>
                  setDocumentForm({ ...documentForm, isActive: value === "true" })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="true">Active</SelectItem>
                  <SelectItem value="false">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-end space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsDocumentDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit">
                {editingDocument ? "Update Document" : "Create Document"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
