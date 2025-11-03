import Header from "@/components/Header";
import Footer from "@/components/Footer";

const PrivacyPolicyPage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="container mx-auto px-4 pt-24 pb-24">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-muted-foreground mb-8">Last updated: 01 Nov 2025</p>

          <section className="space-y-6">
            <p>
              Your privacy matters to Neatrix. This Privacy Policy explains what data we
              collect, how we use it, and the choices you have. By using our website,
              applications, and professional cleaning services (the "Services"), you
              consent to the practices described here.
            </p>

            <h2 className="text-xl font-semibold">1. Information We Collect</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Account Information: name, email, phone number, and password when you
                create an account.
              </li>
              <li>
                Service Details: address, property type/size, service preferences,
                instructions, and communications related to bookings.
              </li>
              <li>
                Payment Information: processed securely by our payment partners; we do
                not store full card details on our servers.
              </li>
              <li>
                Device and Usage Data: IP address, browser type, device identifiers,
                pages viewed, and interactions to improve performance and security.
              </li>
              <li>
                Communications: emails, support messages, ratings, and feedback.
              </li>
            </ul>

            <h2 className="text-xl font-semibold">2. How We Use Your Information</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide, schedule, and manage cleaning services.</li>
              <li>Process payments and send invoices/receipts.</li>
              <li>Authenticate accounts and secure access.</li>
              <li>Communicate about bookings, updates, and support.</li>
              <li>Improve site/app performance, reliability, and user experience.</li>
              <li>Comply with legal obligations and enforce our Terms.</li>
            </ul>

            <h2 className="text-xl font-semibold">3. Legal Bases</h2>
            <p>
              We rely on legitimate interests (service delivery and improvement), consent
              (where required), and contractual necessity (providing booked services) to
              process personal data.
            </p>

            <h2 className="text-xl font-semibold">4. Cookies and Tracking</h2>
            <p>
              We use cookies and similar technologies to keep you signed in, remember
              preferences, and measure performance. You can adjust cookie settings in your
              browser; some features may not work without essential cookies.
            </p>

            <h2 className="text-xl font-semibold">5. Sharing of Information</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Service Providers: authentication, hosting, analytics, payment
                processing, messaging, and customer support partners.
              </li>
              <li>
                Legal and Safety: to comply with law, enforce Terms, or protect rights,
                property, and safety of users and the public.
              </li>
              <li>
                Business Transfers: in connection with a merger, acquisition, or asset
                sale, subject to safeguards and continued protection.
              </li>
            </ul>

            <h2 className="text-xl font-semibold">6. International Transfers</h2>
            <p>
              If data is transferred internationally, we apply appropriate safeguards to
              protect your information in accordance with applicable laws.
            </p>

            <h2 className="text-xl font-semibold">7. Data Security</h2>
            <p>
              We implement reasonable technical and organizational measures to protect
              personal data. No system can be fully secure; please keep your account
              credentials confidential and report suspected misuse.
            </p>

            <h2 className="text-xl font-semibold">8. Data Retention</h2>
            <p>
              We retain personal data for as long as necessary to provide services, meet
              legal obligations, and resolve disputes. When no longer needed, we will
              delete or anonymize information.
            </p>

            <h2 className="text-xl font-semibold">9. Your Rights</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Access, correct, or update your account information.</li>
              <li>Request deletion, subject to legal or contractual limitations.</li>
              <li>Withdraw consent where processing is based on consent.</li>
              <li>Object to or restrict certain processing activities.</li>
            </ul>

            <h2 className="text-xl font-semibold">10. Marketing Communications</h2>
            <p>
              You can opt out of non-essential marketing emails at any time using the
              unsubscribe link or your account settings. We may still send important
              transactional messages.
            </p>

            <h2 className="text-xl font-semibold">11. Children’s Privacy</h2>
            <p>
              Our Services are not directed to children under 13. We do not knowingly
              collect personal data from children. If you believe a child has provided
              data, contact us to remove it.
            </p>

            <h2 className="text-xl font-semibold">12. Do Not Track</h2>
            <p>
              Our Services do not respond to Do Not Track signals. You may use browser
              controls to manage cookies and tracking preferences.
            </p>

            <h2 className="text-xl font-semibold">13. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Material changes will
              be posted on the site or communicated via email. Continued use indicates
              acceptance of the updated Policy.
            </p>

            <h2 className="text-xl font-semibold">14. Contact</h2>
            <p>
              For privacy questions or requests, contact us at contactneatrix@gmail.com or
              +234 903 484 2430.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicyPage;

