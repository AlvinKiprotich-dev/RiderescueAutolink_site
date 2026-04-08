"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import {
  Car,
  ArrowLeft,
  AlertTriangle,
  Download,
  Mail,
  Phone,
  Shield,
  Clock,
  Trash2,
  CheckCircle,
  XCircle,
  Info,
  FileText,
  Database,
  MessageSquare,
} from "lucide-react"
import { toast } from "sonner"

export default function DeleteAccountPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [reason, setReason] = useState("")
  const [customReason, setCustomReason] = useState("")
  const [confirmations, setConfirmations] = useState({
    understand: false,
    dataLoss: false,
    noRecovery: false,
    finalConfirm: false,
  })
  const [isLoading, setIsLoading] = useState(false)
  const [wantDataDownload, setWantDataDownload] = useState(false)

  const totalSteps = 3
  const progress = (currentStep / totalSteps) * 100

  const deletionReasons = [
    "No longer need the service",
    "Found a better alternative",
    "Privacy concerns",
    "Too many notifications",
    "Difficult to use",
    "Technical issues",
    "Cost concerns",
    "Other",
  ]

  const handleStepOne = () => {
    if (!email || !password) {
      toast.error("Please enter both email and password")
      return
    }

    // Simulate verification
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setCurrentStep(2)
      toast.success("Identity verified successfully")
    }, 2000)
  }

  const handleStepTwo = () => {
    if (!reason) {
      toast.error("Please select a reason for deletion")
      return
    }

    if (reason === "Other" && !customReason.trim()) {
      toast.error("Please provide a custom reason")
      return
    }

    setCurrentStep(3)
  }

  const handleFinalDeletion = () => {
    const allConfirmed = Object.values(confirmations).every(Boolean)

    if (!allConfirmed) {
      toast.error("Please confirm all checkboxes to proceed")
      return
    }

    setIsLoading(true)

    // Simulate account deletion process
    setTimeout(() => {
      setIsLoading(false)
      toast.success("Account deletion request submitted successfully")
      // In a real app, this would redirect to a confirmation page or logout
    }, 3000)
  }

  const handleDataDownload = () => {
    toast.success("Data download started. You'll receive an email when ready.")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Car className="h-5 w-5 text-white" />
              </div>
              <span className="text-2xl font-bold text-primary">RideRescue</span>
            </Link>
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Trash2 className="h-8 w-8 text-destructive" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Delete Your Account</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We're sorry to see you go. Please review the information below before proceeding.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">
              Step {currentStep} of {totalSteps}
            </span>
            <span className="text-sm text-muted-foreground">{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Warning Alert */}
        <Alert className="mb-8 border-destructive/50 bg-destructive/5">
          <AlertTriangle className="h-4 w-4 text-destructive" />
          <AlertDescription className="text-destructive">
            <strong>Important:</strong> Account deletion is permanent and cannot be undone. All your data will be
            permanently removed from our systems within 30 days.
          </AlertDescription>
        </Alert>

        {/* Step Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {currentStep === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Shield className="h-5 w-5 mr-2 text-primary" />
                    Verify Your Identity
                  </CardTitle>
                  <CardDescription>Please confirm your identity to proceed with account deletion</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <Button onClick={handleStepOne} disabled={isLoading} className="w-full">
                    {isLoading ? "Verifying..." : "Verify Identity"}
                  </Button>
                </CardContent>
              </Card>
            )}

            {currentStep === 2 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MessageSquare className="h-5 w-5 mr-2 text-primary" />
                    Help Us Improve
                  </CardTitle>
                  <CardDescription>Please let us know why you're leaving (optional but helpful)</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label>Reason for leaving</Label>
                    <Select value={reason} onValueChange={setReason}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a reason" />
                      </SelectTrigger>
                      <SelectContent>
                        {deletionReasons.map((r) => (
                          <SelectItem key={r} value={r}>
                            {r}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {reason === "Other" && (
                    <div className="space-y-2">
                      <Label htmlFor="custom-reason">Please specify</Label>
                      <Textarea
                        id="custom-reason"
                        placeholder="Tell us more about your reason..."
                        value={customReason}
                        onChange={(e) => setCustomReason(e.target.value)}
                      />
                    </div>
                  )}

                  <div className="bg-muted/50 p-4 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <Download className="h-5 w-5 text-primary mt-0.5" />
                      <div className="flex-1">
                        <h4 className="font-medium mb-2">Download Your Data</h4>
                        <p className="text-sm text-muted-foreground mb-3">
                          Before deleting your account, you can download a copy of your data including booking history,
                          preferences, and profile information.
                        </p>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="data-download"
                            checked={wantDataDownload}
                            onCheckedChange={setWantDataDownload}
                          />
                          <Label htmlFor="data-download" className="text-sm">
                            Yes, I want to download my data first
                          </Label>
                        </div>
                        {wantDataDownload && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="mt-3 bg-transparent"
                            onClick={handleDataDownload}
                          >
                            <Download className="h-4 w-4 mr-2" />
                            Start Download
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>

                  <Button onClick={handleStepTwo} className="w-full">
                    Continue to Final Step
                  </Button>
                </CardContent>
              </Card>
            )}

            {currentStep === 3 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-destructive">
                    <AlertTriangle className="h-5 w-5 mr-2" />
                    Final Confirmation
                  </CardTitle>
                  <CardDescription>Please read and confirm the following before we delete your account</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <Checkbox
                        id="understand"
                        checked={confirmations.understand}
                        onCheckedChange={(checked) =>
                          setConfirmations((prev) => ({ ...prev, understand: checked as boolean }))
                        }
                      />
                      <Label htmlFor="understand" className="text-sm leading-relaxed">
                        I understand that deleting my account will permanently remove all my data, including booking
                        history, preferences, and profile information.
                      </Label>
                    </div>

                    <div className="flex items-start space-x-3">
                      <Checkbox
                        id="data-loss"
                        checked={confirmations.dataLoss}
                        onCheckedChange={(checked) =>
                          setConfirmations((prev) => ({ ...prev, dataLoss: checked as boolean }))
                        }
                      />
                      <Label htmlFor="data-loss" className="text-sm leading-relaxed">
                        I acknowledge that this action cannot be undone and I will lose access to all services and
                        features associated with my account.
                      </Label>
                    </div>

                    <div className="flex items-start space-x-3">
                      <Checkbox
                        id="no-recovery"
                        checked={confirmations.noRecovery}
                        onCheckedChange={(checked) =>
                          setConfirmations((prev) => ({ ...prev, noRecovery: checked as boolean }))
                        }
                      />
                      <Label htmlFor="no-recovery" className="text-sm leading-relaxed">
                        I understand that I will not be able to recover my account or data after the deletion process is
                        complete.
                      </Label>
                    </div>

                    <div className="flex items-start space-x-3">
                      <Checkbox
                        id="final-confirm"
                        checked={confirmations.finalConfirm}
                        onCheckedChange={(checked) =>
                          setConfirmations((prev) => ({ ...prev, finalConfirm: checked as boolean }))
                        }
                      />
                      <Label htmlFor="final-confirm" className="text-sm leading-relaxed font-medium">
                        I confirm that I want to permanently delete my RideRescue account.
                      </Label>
                    </div>
                  </div>

                  <Alert className="border-destructive/50 bg-destructive/5">
                    <Clock className="h-4 w-4 text-destructive" />
                    <AlertDescription className="text-destructive">
                      <strong>Processing Time:</strong> Your account will be scheduled for deletion and permanently
                      removed within 30 days as required by data protection laws.
                    </AlertDescription>
                  </Alert>

                  <div className="flex space-x-4">
                    <Button variant="outline" onClick={() => setCurrentStep(2)} className="flex-1">
                      Go Back
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={handleFinalDeletion}
                      disabled={isLoading || !Object.values(confirmations).every(Boolean)}
                      className="flex-1"
                    >
                      {isLoading ? "Processing..." : "Delete My Account"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* What Gets Deleted */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Database className="h-5 w-5 mr-2 text-destructive" />
                  What Gets Deleted
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-2">
                  <XCircle className="h-4 w-4 text-destructive" />
                  <span className="text-sm">Profile information</span>
                </div>
                <div className="flex items-center space-x-2">
                  <XCircle className="h-4 w-4 text-destructive" />
                  <span className="text-sm">Booking history</span>
                </div>
                <div className="flex items-center space-x-2">
                  <XCircle className="h-4 w-4 text-destructive" />
                  <span className="text-sm">Payment methods</span>
                </div>
                <div className="flex items-center space-x-2">
                  <XCircle className="h-4 w-4 text-destructive" />
                  <span className="text-sm">Preferences & settings</span>
                </div>
                <div className="flex items-center space-x-2">
                  <XCircle className="h-4 w-4 text-destructive" />
                  <span className="text-sm">Reviews & ratings</span>
                </div>
              </CardContent>
            </Card>

            {/* What We Keep */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-muted-foreground" />
                  What We Keep
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Legal compliance records</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Financial transaction logs</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Anonymized usage analytics</span>
                </div>
                <p className="text-xs text-muted-foreground mt-3">
                  These are kept for legal and security purposes only and cannot be linked back to you.
                </p>
              </CardContent>
            </Card>

            {/* Need Help */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Info className="h-5 w-5 mr-2 text-primary" />
                  Need Help?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Before deleting your account, consider reaching out to our support team. We might be able to help
                  resolve any issues you're experiencing.
                </p>
                <div className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                    <Mail className="h-4 w-4 mr-2" />
                    support@riderescue.com
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                    <Phone className="h-4 w-4 mr-2" />
                    1-800-RESCUE-1
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Legal Notice */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Legal Notice</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Account deletion is processed in accordance with applicable data protection laws including GDPR, CCPA,
                  and other regional privacy regulations. For more information, please review our{" "}
                  <Link href="/privacy" className="text-primary hover:underline">
                    Privacy Policy
                  </Link>
                  .
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
