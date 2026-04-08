"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { 
  CheckCircle, 
  XCircle, 
  FileText, 
  Download, 
  Eye, 
  AlertCircle,
  Check,
  X,
  ExternalLink
} from "lucide-react";
import { toast } from "sonner";
import { 
  getServiceDocumentsForVerification, 
  verifyServiceDocument, 
  approveServiceProvider 
} from "@/lib/actions";
import { IServiceDocumentsResponse, IServiceDocument, IRequiredDocument } from "@/types/document";
import { IService } from "@/types/service";

interface DocumentVerificationDialogProps {
  service: IService | null;
  isOpen: boolean;
  onClose: () => void;
  onServiceUpdated: () => void;
}

export default function DocumentVerificationDialog({
  service,
  isOpen,
  onClose,
  onServiceUpdated
}: DocumentVerificationDialogProps) {
  const [documentsData, setDocumentsData] = useState<IServiceDocumentsResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState<string | null>(null);
  const [approving, setApproving] = useState(false);

  const fetchDocuments = async () => {
    if (!service) return;

    try {
      setLoading(true);
      const response = await getServiceDocumentsForVerification(service._id);
      
      if (response.success) {
        setDocumentsData(response.data as unknown as IServiceDocumentsResponse);
      } else {
        toast.error("Failed to fetch documents");
      }
    } catch (error) {
      console.error("Error fetching documents:", error);
      toast.error("Failed to fetch documents");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && service) {
      fetchDocuments();
    }
  }, [isOpen, service]);

  const handleVerifyDocument = async (documentId: string, verified: boolean) => {
    try {
      setVerifying(documentId);
      const response = await verifyServiceDocument(documentId, verified);
      
      if (response.success) {
        toast.success(`Document ${verified ? 'verified' : 'unverified'} successfully`);
        fetchDocuments(); // Refresh the documents
      } else {
        toast.error(response.message || "Failed to update document verification");
      }
    } catch (error) {
      console.error("Error verifying document:", error);
      toast.error("Failed to verify document");
    } finally {
      setVerifying(null);
    }
  };

  const handleApproveService = async () => {
    if (!service) return;

    try {
      setApproving(true);
      const response = await approveServiceProvider(service._id);
      
      if (response.success) {
        toast.success("Service provider approved successfully");
        onServiceUpdated();
        onClose();
      } else {
        toast.error(response.message || "Failed to approve service provider");
      }
    } catch (error) {
      console.error("Error approving service:", error);
      toast.error("Failed to approve service provider");
    } finally {
      setApproving(false);
    }
  };

  const getDocumentStatus = (documentId: string) => {
    if (!documentsData?.documents) return null;
    return documentsData.documents.find(doc => doc.document === documentId);
  };

  const getUploadedDocumentsCount = () => {
    if (!documentsData?.documents) return 0;
    return documentsData.documents.length;
  };

  const getRequiredDocumentsCount = () => {
    if (!documentsData?.requiredDocuments) return 0;
    return documentsData.requiredDocuments.filter(doc => doc.required).length;
  };

  const getVerifiedDocumentsCount = () => {
    if (!documentsData?.documents) return 0;
    return documentsData.documents.filter(doc => doc.verified).length;
  };

  const canApproveService = () => {
    const uploadedCount = getUploadedDocumentsCount();
    const requiredCount = getRequiredDocumentsCount();
    const verifiedCount = getVerifiedDocumentsCount();
    
    return uploadedCount >= requiredCount && verifiedCount >= requiredCount;
  };

  const getProgressPercentage = () => {
    const uploadedCount = getUploadedDocumentsCount();
    const requiredCount = getRequiredDocumentsCount();
    
    if (requiredCount === 0) return 100;
    return Math.min((uploadedCount / requiredCount) * 100, 100);
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
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
    } catch (error) {
      return 'Invalid Date';
    }
  };

  if (!service) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Document Verification - {service.name}
          </DialogTitle>
        </DialogHeader>

        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Progress Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Document Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Uploaded Documents</span>
                    <Badge variant="outline">
                      {getUploadedDocumentsCount()} / {getRequiredDocumentsCount()} required
                    </Badge>
                  </div>
                  <Progress value={getProgressPercentage()} className="w-full" />
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div className="text-center">
                      <div className="font-semibold text-green-600">{getUploadedDocumentsCount()}</div>
                      <div className="text-gray-500">Uploaded</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-blue-600">{getVerifiedDocumentsCount()}</div>
                      <div className="text-gray-500">Verified</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-purple-600">{getRequiredDocumentsCount()}</div>
                      <div className="text-gray-500">Required</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Required Documents List */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Required Documents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {documentsData?.requiredDocuments?.map((requiredDoc) => {
                    const uploadedDoc = getDocumentStatus(requiredDoc._id);
                    const isUploaded = !!uploadedDoc;
                    const isVerified = uploadedDoc?.verified || false;

                    return (
                      <div
                        key={requiredDoc._id}
                        className={`p-4 rounded-lg border ${
                          isUploaded ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <h4 className="font-medium">{requiredDoc.name}</h4>
                              {requiredDoc.required && (
                                <Badge variant="destructive" className="text-xs">Required</Badge>
                              )}
                              {!requiredDoc.required && (
                                <Badge variant="secondary" className="text-xs">Optional</Badge>
                              )}
                            </div>
                            <p className="text-sm text-gray-600 mt-1">{requiredDoc.description}</p>
                            
                            {isUploaded && (
                              <div className="mt-2 space-y-2">
                                <div className="flex items-center gap-2">
                                  <FileText className="h-4 w-4 text-blue-600" />
                                  <span className="text-sm font-medium">{uploadedDoc.name}</span>
                                  <span className="text-xs text-gray-500">
                                    {formatDate(uploadedDoc.createdAt)}
                                  </span>
                                </div>
                                
                                <div className="flex items-center gap-2">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => window.open(uploadedDoc.url, '_blank')}
                                  >
                                    <Eye className="h-3 w-3 mr-1" />
                                    View
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => window.open(uploadedDoc.url, '_blank')}
                                  >
                                    <Download className="h-3 w-3 mr-1" />
                                    Download
                                  </Button>
                                </div>
                              </div>
                            )}
                          </div>

                          <div className="flex items-center gap-2">
                            {isUploaded ? (
                              <>
                                {isVerified ? (
                                  <Badge className="bg-green-100 text-green-800">
                                    <CheckCircle className="h-3 w-3 mr-1" />
                                    Verified
                                  </Badge>
                                ) : (
                                  <Badge className="bg-yellow-100 text-yellow-800">
                                    <AlertCircle className="h-3 w-3 mr-1" />
                                    Pending
                                  </Badge>
                                )}
                                
                                <div className="flex items-center gap-1">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleVerifyDocument(uploadedDoc._id, !isVerified)}
                                    disabled={verifying === uploadedDoc._id}
                                  >
                                    {isVerified ? (
                                      <>
                                        <X className="h-3 w-3 mr-1" />
                                        Unverify
                                      </>
                                    ) : (
                                      <>
                                        <Check className="h-3 w-3 mr-1" />
                                        Verify
                                      </>
                                    )}
                                  </Button>
                                </div>
                              </>
                            ) : (
                              <Badge variant="outline" className="text-gray-500">
                                <XCircle className="h-3 w-3 mr-1" />
                                Not Uploaded
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Approval Section */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Service Approval</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    {canApproveService() ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-600" />
                    )}
                    <span className="font-medium">
                      {canApproveService() 
                        ? "All required documents are uploaded and verified"
                        : "Missing required documents or unverified documents"
                      }
                    </span>
                  </div>
                  
                  <Button
                    onClick={handleApproveService}
                    disabled={!canApproveService() || approving}
                    className="w-full"
                  >
                    {approving ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Approving...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Approve Service Provider
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
