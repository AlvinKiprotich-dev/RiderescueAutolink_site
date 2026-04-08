"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Menu,
  X,
  Home,
  Calendar,
  Users,
  Car,
  Wrench,
  Bell,
  MapPin,
  Settings,
  LogOut,
  Phone,
  Mail,
  MapPin as LocationIcon,
  Clock,
  Award,
  HelpCircle,
  Info,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface SidebarItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

const sidebarItems: SidebarItem[] = [
  {
    title: "Home",
    href: "/",
    icon: Home,
  },
  {
    title: "Services",
    href: "#services",
    icon: Wrench,
  },
  {
    title: "Pricing",
    href: "#pricing",
    icon: Award,
  },
  {
    title: "About",
    href: "#about",
    icon: Info,
  },
  {
    title: "Contact",
    href: "#contact",
    icon: Phone,
  },
  {
    title: "Help",
    href: "#help",
    icon: HelpCircle,
  },
];

const contactItems = [
  {
    title: "Call Us",
    href: "tel:+254700000000",
    icon: Phone,
    description: "+254 700 000 000",
  },
  {
    title: "Email Us",
    href: "mailto:info@riderescue.com",
    icon: Mail,
    description: "info@riderescue.com",
  },
  {
    title: "Visit Us",
    href: "#location",
    icon: LocationIcon,
    description: "Nairobi, Kenya",
  },
];

export function MobileSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleItemClick = () => {
    setIsOpen(false);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden relative z-50"
          aria-label="Toggle mobile menu"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="w-[300px] sm:w-[400px] p-0 bg-background/95 backdrop-blur supports-[backdrop-blur]:bg-background/60 border-r"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                RideRescue
              </span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Navigation */}
          <ScrollArea className="flex-1 px-4 py-6">
            <nav className="space-y-2">
              {sidebarItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={handleItemClick}
                    className={cn(
                      "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.title}</span>
                    {item.badge && (
                      <span className="ml-auto text-xs bg-primary/20 text-primary px-2 py-1 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>

            <Separator className="my-6" />

            {/* Contact Information */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-foreground px-3">
                Contact Information
              </h3>
              <div className="space-y-2">
                {contactItems.map((item) => {
                  const Icon = item.icon;
                  
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={handleItemClick}
                      className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                    >
                      <Icon className="h-4 w-4" />
                      <div className="flex-1">
                        <div className="font-medium">{item.title}</div>
                        <div className="text-xs text-muted-foreground">
                          {item.description}
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            <Separator className="my-6" />

            {/* Quick Actions */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-foreground px-3">
                Quick Actions
              </h3>
              <div className="space-y-2">
                <Button
                  className="w-full justify-start"
                  variant="outline"
                  onClick={handleItemClick}
                >
                  <Clock className="h-4 w-4 mr-2" />
                  Emergency Service
                </Button>
                <Button
                  className="w-full justify-start"
                  variant="outline"
                  onClick={handleItemClick}
                >
                  <Award className="h-4 w-4 mr-2" />
                  Book Appointment
                </Button>
              </div>
            </div>
          </ScrollArea>

          {/* Footer */}
          <div className="p-6 border-t">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                <span className="text-sm text-muted-foreground">
                  24/7 Emergency Service Available
                </span>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={handleItemClick}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Admin Login
                </Button>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
} 