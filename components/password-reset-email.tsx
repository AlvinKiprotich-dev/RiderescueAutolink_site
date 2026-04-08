import * as React from 'react';

interface PasswordResetEmailProps {
  userEmail: string;
  resetLink: string;
  expiryTime?: string;
}

const PasswordResetEmail: React.FC<PasswordResetEmailProps> = ({
  userEmail,
  resetLink,
  expiryTime = "24 hours"
}) => {
  return (
    <html lang="en" dir="ltr">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Reset your RideRescue AutoLink password</title>
        <style>{`
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background-color: #f3f4f6;
            padding: 40px 0;
            line-height: 1.6;
          }
          
          .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            overflow: hidden;
          }
          
          .header {
            background-color: #EC8027;
            color: white;
            text-align: center;
            padding: 32px;
          }
          
          .header h1 {
            font-size: 28px;
            font-weight: bold;
            margin: 0 0 8px 0;
          }
          
          .header p {
            font-size: 16px;
            margin: 0;
            opacity: 0.9;
          }
          
          .content {
            padding: 40px 32px;
          }
          
          .content h2 {
            font-size: 24px;
            font-weight: bold;
            color: #282828;
            margin: 0 0 24px 0;
          }
          
          .content p {
            font-size: 16px;
            color: #282828;
            margin: 0 0 24px 0;
            line-height: 24px;
          }
          
          .button-container {
            text-align: center;
            margin: 32px 0;
          }
          
          .button {
            background-color: #EC8027;
            color: white;
            padding: 16px 32px;
            border-radius: 8px;
            text-decoration: none;
            font-size: 16px;
            font-weight: 600;
            display: inline-block;
          }
          
          .link-text {
            font-size: 14px;
            color: #666666;
            margin: 24px 0;
          }
          
          .reset-link {
            font-size: 14px;
            color: #EC8027;
            word-break: break-all;
            margin: 32px 0;
          }
          
          .security-notice {
            background-color: #f8f9fa;
            border-left: 4px solid #EC8027;
            padding: 20px;
            margin: 32px 0;
            border-radius: 0 4px 4px 0;
          }
          
          .security-notice h3 {
            font-size: 14px;
            color: #282828;
            font-weight: 600;
            margin: 0 0 12px 0;
          }
          
          .security-notice p {
            font-size: 14px;
            color: #666666;
            margin: 0 0 8px 0;
            line-height: 20px;
          }
          
          .security-notice p:last-child {
            margin: 0;
          }
          
          .support-link {
            color: #EC8027;
            text-decoration: none;
          }
          
          .footer {
            background-color: #f8f9fa;
            padding: 24px 32px;
            border-top: 1px solid #e5e7eb;
            border-radius: 0 0 8px 8px;
          }
          
          .footer p {
            font-size: 12px;
            color: #666666;
            text-align: center;
            margin: 0 0 8px 0;
          }
          
          .footer p:last-child {
            margin: 0;
          }
          
          .footer a {
            color: #666666;
            text-decoration: none;
          }
          
          @media (max-width: 600px) {
            .container {
              margin: 0 16px;
            }
            
            .content {
              padding: 24px 20px;
            }
            
            .header {
              padding: 24px 20px;
            }
            
            .footer {
              padding: 20px;
            }
          }
        `}</style>
      </head>
      <body>
        <div className="container">
          {/* Header */}
          <div className="header">
            <h1>RideRescue AutoLink</h1>
            <p>Password Reset Request</p>
          </div>

          {/* Main Content */}
          <div className="content">
            <h2>Reset Your Password</h2>
            
            <p>Hi there,</p>
            
            <p>We received a request to reset the password for your RideRescue AutoLink account associated with <strong>{userEmail}</strong>.</p>
            
            <p>Click the button below to create a new password:</p>

            {/* Reset Button */}
            <div className="button-container">
              <a href={resetLink} className="button">
                Reset Password
              </a>
            </div>

            <p className="link-text">Or copy and paste this link into your browser:</p>
            
            <p className="reset-link">{resetLink}</p>

            {/* Security Notice */}
            <div className="security-notice">
              <h3>Security Notice:</h3>
              <p>• This link will expire in {expiryTime}</p>
              <p>• If you didn't request this reset, please ignore this email</p>
              <p>• For security, never share this link with anyone</p>
            </div>

            <p>Need help? Contact our support team at{' '}
              <a href="mailto:support@riderescue.com" className="support-link">
                support@riderescue.com
              </a>
            </p>
          </div>

          {/* Footer */}
          <div className="footer">
            <p>© 2025 RideRescue AutoLink. All rights reserved.</p>
            <p>123 Rescue Street, Nairobi, Kenya | <a href="#">Unsubscribe</a></p>
          </div>
        </div>
      </body>
    </html>
  );
};

export default PasswordResetEmail;
