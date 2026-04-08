"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Car,
  Shield,
  MapPin,
  Star,
  CheckCircle,
  ArrowRight,
  Facebook,
  Twitter,
  Instagram,
  ChevronDown,
  X,
} from "lucide-react";
import { MobileSidebar } from "@/components/mobile-sidebar";

// Modal components
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function HomePage() {
  // Waitlist Modal State
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleWaitlistSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsLoading(true);
    // Dummy submission
    setTimeout(() => {
      setIsLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  const openWaitlist = () => {
    setIsWaitlistOpen(true);
    setSubmitted(false);
    setEmail("");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-blur]:bg-background/60 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Riderescue
              </span>
            </div>
            <nav className="hidden lg:flex items-center space-x-8">
              <div className="flex items-center space-x-1 text-muted-foreground hover:text-foreground cursor-pointer transition-colors">
                <span>Services</span>
                <ChevronDown className="h-4 w-4" />
              </div>
              <Link href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">
                Pricing
              </Link>
              <div className="flex items-center space-x-1 text-muted-foreground hover:text-foreground cursor-pointer transition-colors">
                <span>Resources</span>
                <ChevronDown className="h-4 w-4" />
              </div>
              <Link href="#partners" className="text-muted-foreground hover:text-foreground transition-colors">
                Reviews
              </Link>
            </nav>
            <div className="flex items-center space-x-3">
              <Button onClick={openWaitlist} className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Get App
              </Button>
              <MobileSidebar />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-primary/5" />
        <div className="relative max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <Badge variant="secondary" className="mb-4">
                  Your number one stop vehicle repair solution.
                </Badge>
                <h1 className="text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                  Kenya's
                  <br />
                  <span className="text-primary">roadside rescue solution </span>
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
                  Just need emergency automotive help? Use Riderescue platform to connect with verified
                  mechanics, towing services, and garages to get back on the road.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={openWaitlist}
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg"
                >
                  Get App
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>

              {/* Key Features */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-foreground font-medium">Expert automotive professionals</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-foreground font-medium">100% faster than average response time</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-foreground font-medium">Complete service from anywhere</span>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                  ))}
                </div>
                <Link href="#reviews" className="text-muted-foreground hover:text-primary transition-colors">
                  Read our reviews
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Professional automotive service"
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Made Simple */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-foreground mb-4">Automotive help made simple.</h2>
          <p className="text-xl text-muted-foreground mb-16 max-w-3xl mx-auto">
            Forget the 10+ phone calls and long wait times for help.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 text-center border-0 shadow-lg bg-gradient-to-br from-background to-primary/5">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4">Mobile mechanics</h3>
              <p className="text-muted-foreground">
                Get serviced by trusted and certified professional mechanics to help you get on the road on time.
              </p>
            </Card>
            <Card className="p-8 text-center border-0 shadow-lg bg-gradient-to-br from-background to-primary/5">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <MapPin className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4">Garage network</h3>
              <p className="text-muted-foreground">Get serviced by trusted motorvehicle repair garages.</p>
            </Card>
            <Card className="p-8 text-center border-0 shadow-lg bg-gradient-to-br from-background to-primary/5">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Car className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4">Emergency towing</h3>
              <p className="text-muted-foreground">Get 24-hour access to towing service.</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Expert Team */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1487754180451-c456f719a1fc?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                alt="Expert automotive technicians"
                className="rounded-2xl shadow-xl"
              />
            </div>
            <div>
              <h2 className="text-4xl font-bold text-foreground mb-6">
                Work with expert automotive professionals to <span className="text-primary">get back on the road</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                With over a thousand service providers in our network, our team has the expertise you need to get your vehicle running smoothly again.
              </p>
              <Button onClick={openWaitlist} className="bg-primary hover:bg-primary/90 text-primary-foreground mb-6">
                Get support now
              </Button>
              <p className="text-sm text-muted-foreground">All prices are subject to VAT.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Rest of your sections (Comparison, Partners, Testimonials, FAQ, Final CTA, Footer) */}
      {/* ... (kept exactly as you had them) ... */}

      {/* Final CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            Your automotive emergency doesn't need to be so complicated
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Riderescue makes it simple to get the help you need, when you need it. Connect with verified professionals, get quality service, and get back on the road fast.
          </p>
          <Button onClick={openWaitlist} size="lg" variant="secondary" className="bg-background text-foreground hover:bg-background/90">
            Get App
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Footer content unchanged */}
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            {/* ... your footer columns ... */}
          </div>
          <div className="border-t border-border pt-8 text-center text-muted-foreground">
            <p>© 2024 Riderescue. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Coming Soon + Waitlist Modal */}
      <Dialog open={isWaitlistOpen} onOpenChange={setIsWaitlistOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center">
              {submitted ? "You're on the list!" : "App Coming Soon!"}
            </DialogTitle>
            <DialogDescription className="text-center pt-2">
              {submitted
                ? "We'll notify you the moment Riderescue app goes live. Get ready to rescue your ride!"
                : "Be the first to know when the Riderescue mobile app launches in Kenya."}
            </DialogDescription>
          </DialogHeader>

          <div className="mt-6">
            {submitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-10 w-10 text-primary" />
                </div>
                <p className="text-muted-foreground">
                  Thank you! Check your email soon for early access perks.
                </p>
                <Button onClick={() => setIsWaitlistOpen(false)} className="mt-6" variant="outline">
                  Close
                </Button>
              </div>
            ) : (
              <form onSubmit={handleWaitlistSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="email">Email address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="mt-2"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90"
                  disabled={isLoading || !email.trim()}
                >
                  {isLoading ? "Joining waitlist..." : "Join Waitlist"}
                </Button>
                <p className="text-xs text-center text-muted-foreground">
                  No spam. We only send important updates.
                </p>
              </form>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
