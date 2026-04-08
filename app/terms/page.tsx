import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function TermsPage() {
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
          <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>

          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-foreground/80 mb-6">Last Updated: July 18, 2025</p>

            <p className="mb-6">
              Welcome to RideRescue. These Terms of Service ("Terms") govern your use of the RideRescue website, mobile
              applications, and services (collectively, the "Services"). By accessing or using our Services, you agree
              to be bound by these Terms.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">1. Acceptance of Terms</h2>
            <p className="mb-4">
              By accessing or using the Services, you agree to be bound by these Terms and our Privacy Policy. If you do
              not agree to these Terms, you may not access or use the Services.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">2. Description of Services</h2>
            <p className="mb-4">
              RideRescue provides a platform connecting users with roadside assistance service providers, including but
              not limited to towing services, mechanics, and garages. RideRescue does not provide roadside assistance
              services directly but facilitates connections between users and third-party service providers.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">3. User Accounts</h2>
            <p className="mb-4">
              To use certain features of the Services, you must create an account. You are responsible for maintaining
              the confidentiality of your account credentials and for all activities that occur under your account. You
              agree to provide accurate and complete information when creating your account and to update your
              information as necessary.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">4. User Responsibilities</h2>
            <p className="mb-4">
              You agree to use the Services only for lawful purposes and in accordance with these Terms. You agree not
              to:
            </p>
            <ul className="list-disc pl-6 mb-6">
              <li className="mb-2">Use the Services in any way that violates any applicable law or regulation</li>
              <li className="mb-2">
                Impersonate any person or entity or falsely state or misrepresent your affiliation with a person or
                entity
              </li>
              <li className="mb-2">
                Interfere with or disrupt the Services or servers or networks connected to the Services
              </li>
              <li className="mb-2">Attempt to gain unauthorized access to any portion of the Services</li>
              <li className="mb-2">Use the Services for any purpose other than their intended purpose</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">5. Service Provider Responsibilities</h2>
            <p className="mb-4">Service providers using the RideRescue platform agree to:</p>
            <ul className="list-disc pl-6 mb-6">
              <li className="mb-2">
                Provide accurate information about their services, qualifications, and availability
              </li>
              <li className="mb-2">Maintain all required licenses, permits, and insurance for their services</li>
              <li className="mb-2">Provide services in a professional and workmanlike manner</li>
              <li className="mb-2">Comply with all applicable laws and regulations</li>
              <li className="mb-2">Maintain the confidentiality of user information</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">6. Payment Terms</h2>
            <p className="mb-4">
              Users agree to pay for services provided through the RideRescue platform according to the rates displayed
              in the app. RideRescue may charge service fees in addition to the service provider's fees. All payments
              are processed through our third-party payment processors.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">7. Limitation of Liability</h2>
            <p className="mb-4">
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, RIDERESCUE SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL,
              SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY
              OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM:
            </p>
            <ul className="list-disc pl-6 mb-6">
              <li className="mb-2">YOUR ACCESS TO OR USE OF OR INABILITY TO ACCESS OR USE THE SERVICES</li>
              <li className="mb-2">ANY CONDUCT OR CONTENT OF ANY THIRD PARTY ON THE SERVICES</li>
              <li className="mb-2">ANY CONTENT OBTAINED FROM THE SERVICES</li>
              <li className="mb-2">UNAUTHORIZED ACCESS, USE, OR ALTERATION OF YOUR TRANSMISSIONS OR CONTENT</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">8. Indemnification</h2>
            <p className="mb-4">
              You agree to indemnify, defend, and hold harmless RideRescue and its officers, directors, employees,
              agents, and affiliates from and against any and all claims, damages, obligations, losses, liabilities,
              costs or debt, and expenses arising from your use of the Services.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">9. Modifications to Terms</h2>
            <p className="mb-4">
              RideRescue reserves the right to modify these Terms at any time. We will provide notice of significant
              changes by posting the updated Terms on our website or through the Services. Your continued use of the
              Services after such modifications constitutes your acceptance of the modified Terms.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">10. Termination</h2>
            <p className="mb-4">
              RideRescue may terminate or suspend your access to the Services immediately, without prior notice or
              liability, for any reason, including if you breach these Terms. Upon termination, your right to use the
              Services will immediately cease.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">11. Governing Law</h2>
            <p className="mb-4">
              These Terms shall be governed by and construed in accordance with the laws of the State of California,
              without regard to its conflict of law provisions.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">12. Contact Information</h2>
            <p className="mb-4">
              If you have any questions about these Terms, please contact us at legal@riderescue.com.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
