import Link from "next/link";
import { ArrowLeft, Shield, Eye, UserCheck } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-primary hover:underline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </div>

        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>

          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-foreground/80 mb-6">Last Updated: July 18, 2025</p>

            <p className="mb-6">
              At RideRescue, we take your privacy seriously. This Privacy Policy explains how we
              collect, use, disclose, and safeguard your information when you use our website,
              mobile application, and services (collectively, the "Services").
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-10">
              <div className="bg-card p-6 rounded-lg border border-border text-center">
                <Shield className="h-10 w-10 mx-auto mb-4 text-primary" />
                <h3 className="font-semibold mb-2">Data Protection</h3>
                <p className="text-sm text-foreground/70">
                  We implement industry-standard security measures to protect your personal
                  information.
                </p>
              </div>

              <div className="bg-card p-6 rounded-lg border border-border text-center">
                <Eye className="h-10 w-10 mx-auto mb-4 text-primary" />
                <h3 className="font-semibold mb-2">Transparency</h3>
                <p className="text-sm text-foreground/70">
                  We're clear about what data we collect and how we use it.
                </p>
              </div>

              <div className="bg-card p-6 rounded-lg border border-border text-center">
                <UserCheck className="h-10 w-10 mx-auto mb-4 text-primary" />
                <h3 className="font-semibold mb-2">User Control</h3>
                <p className="text-sm text-foreground/70">
                  You have control over your personal information and how it's used.
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-semibold mt-8 mb-4">1. Information We Collect</h2>
            <p className="mb-4">
              We collect several types of information from and about users of our Services,
              including:
            </p>
            <ul className="list-disc pl-6 mb-6">
              <li className="mb-2">
                <strong>Personal Information:</strong> Name, email address, phone number, postal
                address, and payment information.
              </li>
              <li className="mb-2">
                <strong>Vehicle Information:</strong> Make, model, year, and license plate number of
                your vehicle.
              </li>
              <li className="mb-2">
                <strong>Location Information:</strong> GPS location when you use our mobile
                application to request services.
              </li>
              <li className="mb-2">
                <strong>Usage Information:</strong> How you interact with our Services, including
                the features you use, the time spent on the Services, and the pages you visit.
              </li>
              <li className="mb-2">
                <strong>Device Information:</strong> Information about your mobile device or
                computer, including the hardware model, operating system, unique device identifiers,
                and mobile network information.
              </li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">2. How We Use Your Information</h2>
            <p className="mb-4">We use the information we collect to:</p>
            <ul className="list-disc pl-6 mb-6">
              <li className="mb-2">Provide, maintain, and improve our Services</li>
              <li className="mb-2">Process and complete transactions</li>
              <li className="mb-2">Connect you with service providers</li>
              <li className="mb-2">
                Send you technical notices, updates, security alerts, and support messages
              </li>
              <li className="mb-2">Respond to your comments, questions, and requests</li>
              <li className="mb-2">
                Communicate with you about products, services, offers, and events
              </li>
              <li className="mb-2">
                Monitor and analyze trends, usage, and activities in connection with our Services
              </li>
              <li className="mb-2">
                Detect, investigate, and prevent fraudulent transactions and other illegal
                activities
              </li>
              <li className="mb-2">Personalize and improve the Services</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">3. Sharing of Information</h2>
            <p className="mb-4">We may share your information with:</p>
            <ul className="list-disc pl-6 mb-6">
              <li className="mb-2">
                <strong>Service Providers:</strong> We share your information with service providers
                who need access to your information to provide services on our behalf, such as
                payment processing, data analysis, email delivery, hosting services, and customer
                service.
              </li>
              <li className="mb-2">
                <strong>Roadside Assistance Providers:</strong> We share your information with
                roadside assistance providers to facilitate the services you request.
              </li>
              <li className="mb-2">
                <strong>Business Partners:</strong> We may share your information with business
                partners with whom we jointly offer products or services.
              </li>
              <li className="mb-2">
                <strong>Legal Requirements:</strong> We may disclose your information if required to
                do so by law or in response to valid requests by public authorities.
              </li>
              <li className="mb-2">
                <strong>Business Transfers:</strong> We may share or transfer your information in
                connection with a merger, acquisition, reorganization, sale of assets, or
                bankruptcy.
              </li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">4. Data Retention</h2>
            <p className="mb-4">
              We retain your information for as long as necessary to provide our Services and as
              described in this Privacy Policy. We may also retain your information if required by
              law or for our legitimate business interests.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">5. Your Choices</h2>
            <p className="mb-4">
              You can opt out of receiving promotional emails from us by following the instructions
              in those emails. If you opt out, we may still send you non-promotional emails, such as
              emails about your account or our ongoing business relations.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">6. Security</h2>
            <p className="mb-4">
              We take reasonable measures to protect your information from unauthorized access, use,
              or disclosure. However, no method of transmission over the internet or electronic
              storage is 100% secure, and we cannot guarantee absolute security.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
