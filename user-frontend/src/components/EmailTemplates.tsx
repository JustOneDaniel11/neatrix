import React from 'react';

interface EmailVerificationTemplateProps {
  userFirstName: string;
  verificationLink: string;
}

export const EmailVerificationTemplate: React.FC<EmailVerificationTemplateProps> = ({
  userFirstName,
  verificationLink
}) => {
  return (
    <table role="presentation" cellPadding={0} cellSpacing={0} width="100%" style={{ backgroundColor: '#f3f4f6' }}>
      <tbody>
        <tr>
          <td align="center">
            <table role="presentation" cellPadding={0} cellSpacing={0} width="100%" style={{ maxWidth: '600px', width: '100%', backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif' }}>
              <tbody>
                <tr>
                  <td align="center" style={{ backgroundColor: '#2563eb', padding: '15px 10px' }}>
                    <div style={{ color: '#ffffff', fontSize: '20px', fontWeight: 'bold', lineHeight: 1.3 }}>Welcome to Neatrix Professional Cleaning Services!</div>
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: '20px 15px', color: '#333333' }}>
                    <div style={{ color: '#1f2937', fontSize: '20px', marginBottom: '20px' }}>Hi {userFirstName},</div>
                    <div style={{ fontSize: '16px', marginBottom: '20px', color: '#4b5563' }}>Thank you for signing up with Neatrix Professional Cleaning Services! We're excited to help you keep your space spotless.</div>
                    <div style={{ fontSize: '16px', marginBottom: '20px', color: '#4b5563' }}>To get started, please verify your email address by clicking the button below:</div>
                    <table role="presentation" cellPadding={0} cellSpacing={0} width="100%" style={{ marginBottom: '20px' }}>
                      <tbody>
                        <tr>
                          <td align="center">
                            <a href={verificationLink} style={{ backgroundColor: '#2563eb', color: '#ffffff', padding: '12px 24px', textDecoration: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: 'bold', display: 'block', width: '100%', maxWidth: '280px', textAlign: 'center' }}>Verify Email Address</a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <div style={{ backgroundColor: '#f9fafb', padding: '16px', borderRadius: '8px', marginBottom: '20px' }}>
                      <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '8px' }}>If the button doesn't work, copy and paste this link into your browser:</div>
                      <div style={{ fontSize: '14px', color: '#2563eb', wordBreak: 'break-all' }}>{verificationLink}</div>
                    </div>
                    <table role="presentation" cellPadding={0} cellSpacing={0} width="100%" style={{ marginBottom: '20px' }}>
                      <tbody>
                        <tr>
                          <td style={{ borderLeft: '4px solid #2563eb', paddingLeft: '16px' }}>
                            <div style={{ color: '#1f2937', fontSize: '18px', marginBottom: '8px' }}>What's Next?</div>
                            <div style={{ color: '#4b5563', fontSize: '14px' }}>
                              <div style={{ marginBottom: '6px' }}>Complete your profile setup</div>
                              <div style={{ marginBottom: '6px' }}>Browse our cleaning services</div>
                              <div style={{ marginBottom: '6px' }}>Book your first cleaning session</div>
                              <div style={{ marginBottom: '6px' }}>Enjoy a spotless space!</div>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <table role="presentation" cellPadding={0} cellSpacing={0} width="100%">
                      <tbody>
                        <tr>
                          <td align="center" style={{ backgroundColor: '#f3f4f6', padding: '16px', borderRadius: '8px' }}>
                            <div style={{ color: '#1f2937', fontSize: '16px', marginBottom: '10px' }}>Need Help?</div>
                            <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '12px' }}>Our support team is here to help you 24/7</div>
                            <table role="presentation" cellPadding={0} cellSpacing={0}>
                              <tbody>
                                <tr>
                                  <td align="center" style={{ padding: '4px 10px' }}>
                                    <a href="tel:+2349034842430" style={{ color: '#2563eb', textDecoration: 'none', fontSize: '14px', fontWeight: 'bold' }}>📞 Call Us</a>
                                  </td>
                                  <td align="center" style={{ padding: '4px 10px' }}>
                                    <a href="https://wa.me/2349034842430" style={{ color: '#25d366', textDecoration: 'none', fontSize: '14px', fontWeight: 'bold' }}>💬 WhatsApp</a>
                                  </td>
                                  <td align="center" style={{ padding: '4px 10px' }}>
                                    <a href="mailto:contactneatrix@gmail.com" style={{ color: '#2563eb', textDecoration: 'none', fontSize: '14px', fontWeight: 'bold' }}>✉️ Email</a>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td align="center" style={{ backgroundColor: '#1f2937', padding: '16px' }}>
                    <div style={{ color: '#9ca3af', fontSize: '12px', marginBottom: '8px' }}>This email was sent to verify your Neatrix Professional Cleaning Services account.</div>
                    <div style={{ color: '#9ca3af', fontSize: '12px' }}>© 2024 Neatrix Professional Cleaning Services. All rights reserved.</div>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

interface WelcomeEmailTemplateProps {
  userFirstName: string;
  loginLink: string;
}

export const WelcomeEmailTemplate: React.FC<WelcomeEmailTemplateProps> = ({
  userFirstName,
  loginLink
}) => {
  return (
    <table role="presentation" cellPadding={0} cellSpacing={0} width="100%" style={{ backgroundColor: '#f3f4f6' }}>
      <tbody>
        <tr>
          <td align="center">
            <table role="presentation" cellPadding={0} cellSpacing={0} width="100%" style={{ maxWidth: '600px', width: '100%', backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif' }}>
              <tbody>
                <tr>
                  <td align="center" style={{ backgroundColor: '#16a34a', padding: '16px' }}>
                    <div style={{ color: '#ffffff', fontSize: '22px', fontWeight: 'bold' }}>🎉 Welcome to Neatrix Professional Cleaning Services!</div>
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: '24px 16px', color: '#333333' }}>
                    <div style={{ color: '#1f2937', fontSize: '20px', marginBottom: '16px' }}>Hi {userFirstName},</div>
                    <div style={{ fontSize: '16px', marginBottom: '16px', color: '#4b5563' }}>Congratulations! Your email has been successfully verified and your Neatrix Professional Cleaning Services account is now active.</div>
                    <div style={{ fontSize: '16px', marginBottom: '20px', color: '#4b5563' }}>You can now access all our premium cleaning services and book your first session.</div>
                    <table role="presentation" cellPadding={0} cellSpacing={0} width="100%" style={{ marginBottom: '20px' }}>
                      <tbody>
                        <tr>
                          <td align="center">
                            <a href={loginLink} style={{ backgroundColor: '#16a34a', color: '#ffffff', padding: '14px 24px', textDecoration: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: 'bold', display: 'block', width: '100%', maxWidth: '300px', textAlign: 'center' }}>Access Your Dashboard</a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <table role="presentation" cellPadding={0} cellSpacing={0} width="100%" style={{ backgroundColor: '#f0f9ff', borderRadius: '8px', marginBottom: '20px' }}>
                      <tbody>
                        <tr>
                          <td align="center" style={{ padding: '16px' }}>
                            <div style={{ color: '#1f2937', fontSize: '18px', marginBottom: '10px' }}>Our Premium Services</div>
                            <table role="presentation" cellPadding={0} cellSpacing={0}>
                              <tbody>
                                <tr>
                                  <td align="center" style={{ padding: '8px 14px' }}>
                                    <div style={{ fontSize: '24px', marginBottom: '4px' }}>🏠</div>
                                    <div style={{ fontSize: '14px', color: '#4b5563', fontWeight: 'bold' }}>House Cleaning</div>
                                  </td>
                                  <td align="center" style={{ padding: '8px 14px' }}>
                                    <div style={{ fontSize: '24px', marginBottom: '4px' }}>🏢</div>
                                    <div style={{ fontSize: '14px', color: '#4b5563', fontWeight: 'bold' }}>Office Cleaning</div>
                                  </td>
                                  <td align="center" style={{ padding: '8px 14px' }}>
                                    <div style={{ fontSize: '24px', marginBottom: '4px' }}>✨</div>
                                    <div style={{ fontSize: '14px', color: '#4b5563', fontWeight: 'bold' }}>Deep Cleaning</div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <table role="presentation" cellPadding={0} cellSpacing={0} width="100%" style={{ marginBottom: '20px', border: '2px solid #f59e0b', borderRadius: '8px', backgroundColor: '#fef3c7' }}>
                      <tbody>
                        <tr>
                          <td align="center" style={{ padding: '16px' }}>
                            <div style={{ color: '#92400e', fontSize: '18px', marginBottom: '8px' }}>🎁 Welcome Offer!</div>
                            <div style={{ color: '#92400e', fontSize: '16px', fontWeight: 'bold' }}>Get 20% off your first cleaning service</div>
                            <div style={{ color: '#92400e', fontSize: '14px', marginTop: '6px' }}>Use code: WELCOME20</div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td align="center" style={{ backgroundColor: '#1f2937', padding: '16px' }}>
                    <div style={{ color: '#9ca3af', fontSize: '12px', marginBottom: '8px' }}>Thank you for choosing Neatrix Professional Cleaning Services for your cleaning needs.</div>
                    <div style={{ color: '#9ca3af', fontSize: '12px' }}>© 2024 Neatrix Professional Cleaning Services. All rights reserved.</div>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

// Utility function to generate email HTML
import { renderToStaticMarkup } from 'react-dom/server';
export const generateEmailHTML = (template: React.ReactElement): string => {
  const body = renderToStaticMarkup(template);
  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta http-equiv="x-ua-compatible" content="ie=edge"><title>Neatrix Professional Cleaning Services</title><style>@media only screen and (max-width:600px){.sm-full{width:100%!important;display:block!important}.sm-px{padding-left:15px!important;padding-right:15px!important}}</style></head><body style="margin:0;padding:0;background-color:#f3f4f6">${body}</body></html>`;
};