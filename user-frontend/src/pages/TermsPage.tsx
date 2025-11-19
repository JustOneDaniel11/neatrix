import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";

const TermsPage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEO
        title="Terms of Service"
        description="Neatrix Terms of Service covering bookings, payments, cancellations, and user responsibilities."
        pathname="/terms"
        keywords={["Neatrix terms", "terms of service", "cleaning service terms"]}
      />
      <Header />
      <main className="container mx-auto px-4 pt-24 pb-24">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">Terms of Service</h1>
          <p className="text-muted-foreground mb-8">Last updated: 01 Nov 2025</p>

          <section className="space-y-6">
            <p>
              Welcome to Neatrix. These Terms of Service ("Terms") govern your access to
              and use of our website, applications, and professional cleaning services
              (collectively, the "Services"). By using the Services, you agree to be
              bound by these Terms.
            </p>

            <h2 className="text-xl font-semibold">1. Eligibility and Acceptance</h2>
            <p>
              You must be at least 18 years old and capable of entering a legally binding
              agreement to use our Services. By accessing or using the Services, you
              confirm you accept these Terms and our Privacy Policy.
            </p>

            <h2 className="text-xl font-semibold">2. Scope of Services</h2>
            <p>
              Neatrix provides professional cleaning services for homes, offices, schools,
              and related spaces within our service areas. The specific scope, frequency,
              and pricing of a job will be set out at booking and confirmed by email or in
              your account dashboard.
            </p>

            <h2 className="text-xl font-semibold">3. Scheduling, Rescheduling, and Cancellations</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Bookings are confirmed only after you receive a confirmation message.</li>
              <li>
                You may reschedule or cancel up to 24 hours before the appointment
                without a fee. Cancellations within 24 hours may incur a late-cancel fee.
              </li>
              <li>
                If our team cannot access the premises at the scheduled time, a call-out
                or no-access fee may apply.
              </li>
            </ul>

            <h2 className="text-xl font-semibold">4. Pricing and Payment</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Prices are shown at booking and may vary based on property size, service
                type, add-ons, and special requirements.
              </li>
              <li>
                You authorize Neatrix or its payment partners to charge your selected
                payment method for services rendered and applicable fees/taxes.
              </li>
              <li>
                Promotional pricing is subject to specific terms and may be withdrawn at
                any time.
              </li>
            </ul>

            <h2 className="text-xl font-semibold">5. Customer Responsibilities</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide accurate booking details and access instructions.</li>
              <li>
                Secure valuables and delicate items. Notify us of any fragile, high-value,
                or specialty surfaces requiring specific care.
              </li>
              <li>
                Ensure utilities (water, electricity) are available during service.
              </li>
            </ul>

            <h2 className="text-xl font-semibold">6. Supplies and Equipment</h2>
            <p>
              Our team arrives with standard cleaning supplies and equipment unless
              otherwise agreed. If you prefer specific products or methods, please provide
              them and notify us in advance.
            </p>

            <h2 className="text-xl font-semibold">7. Health, Safety, and Access</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                We reserve the right to refuse service where conditions present health or
                safety risks to our team.
              </li>
              <li>
                Pet-friendly service is available; please secure pets as needed for their
                safety and our team’s comfort.
              </li>
            </ul>

            <h2 className="text-xl font-semibold">8. Satisfaction Guarantee</h2>
            <p>
              If you are not satisfied, contact us within 24 hours of service completion.
              We will assess and, where reasonable, arrange a touch-up for the specific
              areas of concern.
            </p>

            <h2 className="text-xl font-semibold">9. Prohibited Uses</h2>
            <p>
              You may not misuse the Services, including attempting to interfere with the
              website/app, reverse engineering, scraping, or using the Services for
              unlawful purposes.
            </p>

            <h2 className="text-xl font-semibold">10. Accounts and Security</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Keep your account credentials secure. You are responsible for activity under your account.</li>
              <li>Notify us immediately of unauthorized access or security incidents.</li>
            </ul>

            <h2 className="text-xl font-semibold">11. Property Damage and Liability</h2>
            <p>
              We take reasonable care when performing services. If damage occurs, contact
              us promptly with details and supporting evidence. Our liability is limited
              to direct damages proven to result from negligence, and excludes indirect,
              incidental, or consequential losses.
            </p>

            <h2 className="text-xl font-semibold">12. Intellectual Property</h2>
            <p>
              The Neatrix name, logo, content, and software are protected by applicable
              intellectual property laws. You may not copy, modify, or distribute
              proprietary materials without permission.
            </p>

            <h2 className="text-xl font-semibold">13. Third-Party Services</h2>
            <p>
              Our Services may integrate third-party tools (e.g., payment processors,
              authentication providers). Those services may have their own terms. We are
              not responsible for third-party content or policies.
            </p>

            <h2 className="text-xl font-semibold">14. Termination</h2>
            <p>
              We may suspend or terminate access to the Services at any time for conduct
              that violates these Terms or presents risk. You may stop using the Services
              at any time.
            </p>

            <h2 className="text-xl font-semibold">15. Disclaimers</h2>
            <p>
              The Services are provided on an "as is" and "as available" basis. To the
              maximum extent permitted by law, we disclaim warranties of merchantability,
              fitness for a particular purpose, and non-infringement.
            </p>

            <h2 className="text-xl font-semibold">16. Limitation of Liability</h2>
            <p>
              To the extent permitted by law, Neatrix and its affiliates will not be
              liable for lost profits, revenues, data, or indirect/special/consequential
              damages. In all cases, our aggregate liability is limited to the amounts
              paid by you for the Services in the 3 months preceding the incident.
            </p>

            <h2 className="text-xl font-semibold">17. Indemnification</h2>
            <p>
              You agree to indemnify and hold Neatrix harmless from claims arising out of
              your use of the Services, your breach of these Terms, or your violation of
              law or third-party rights.
            </p>

            <h2 className="text-xl font-semibold">18. Governing Law and Disputes</h2>
            <p>
              These Terms are governed by the laws of the Federal Republic of Nigeria. Any
              disputes will be resolved in the courts of Lagos State, Nigeria.
            </p>

            <h2 className="text-xl font-semibold">19. Changes to Terms</h2>
            <p>
              We may update these Terms from time to time. Material changes will be
              posted on the site or communicated via email. Continued use of the Services
              after changes indicates acceptance.
            </p>

            <h2 className="text-xl font-semibold">20. Contact</h2>
            <p>
              For questions about these Terms, contact us at contactneatrix@gmail.com or
              +234 903 484 2430.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TermsPage;

