import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Legal — Terms, Privacy & Cookie Notice | Alongway",
  description: "Terms & Conditions, Privacy Policy, and Cookie Notice for Alongway.",
};

export default function LegalPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20 lg:px-10">
      <p className="font-accent text-xs font-semibold uppercase tracking-[0.18em] text-charcoal/40">
        Last Updated: 02/12/2026
      </p>
      <h1 className="font-display mt-4 text-4xl font-extrabold tracking-tight text-charcoal">
        Legal
      </h1>
      <p className="mt-4 text-base leading-7 text-charcoal/70">
        By accessing or using{" "}
        <a href="https://alongway.co" className="text-blue hover:underline">
          alongway.co
        </a>{" "}
        ("Website"), you agree to the following Terms and Policies. If you do not agree, please do not use this Website.
      </p>

      {/* TERMS & CONDITIONS */}
      <section className="mt-14">
        <h2 className="font-display text-2xl font-extrabold tracking-tight text-charcoal">
          Terms &amp; Conditions
        </h2>

        <div className="mt-8 space-y-8 text-sm leading-7 text-charcoal/80">
          <div>
            <h3 className="font-display font-bold text-charcoal">1. Orders &amp; Production</h3>
            <p className="mt-2">All goods are made-to-order unless otherwise stated. Full payment is required before production begins unless agreed in writing. Production starts only after written artwork approval and payment confirmation. Once production has begun, orders cannot be canceled or modified.</p>
          </div>

          <div>
            <h3 className="font-display font-bold text-charcoal">2. Artwork Approval</h3>
            <p className="mt-2">All artwork, placement, spelling, sizing, colors, and specifications must be approved in writing before production. Approved proofs are final. Alongway is not responsible for errors present in approved artwork.</p>
          </div>

          <div>
            <h3 className="font-display font-bold text-charcoal">3. Production Variations</h3>
            <p className="mt-2">Custom manufacturing includes normal industry tolerances. Minor variations are not considered defects, including:</p>
            <ul className="mt-2 list-disc pl-5 space-y-1">
              <li>Slight color differences between screens and physical goods</li>
              <li>Fabric shade differences between dye lots</li>
              <li>Placement tolerances</li>
              <li>Embroidery density or thread variation</li>
              <li>Size tolerances</li>
              <li>Natural material inconsistencies</li>
            </ul>
            <p className="mt-2">These variations are inherent in custom production and are accepted upon approval.</p>
          </div>

          <div>
            <h3 className="font-display font-bold text-charcoal">4. Turnaround &amp; Delivery</h3>
            <p className="mt-2">Estimated timelines are not guaranteed. Delays may occur due to production complexity, material shortages, freight delays, customs processing, carrier issues, weather events, or other circumstances outside our control.</p>
            <p className="mt-2">At Alongway, our customers and our quality are our priority. While certain delays may be outside of our control, we take proactive steps to communicate clearly, problem-solve quickly, and ensure the best possible outcome for your project.</p>
          </div>

          <div>
            <h3 className="font-display font-bold text-charcoal">5. Shipping &amp; Risk of Loss</h3>
            <p className="mt-2">Risk transfers to the client once goods are delivered to the carrier. Alongway is not responsible for carrier delays, lost shipments, or delivery issues caused by incorrect addresses provided by the client.</p>
            <p className="mt-2">That said, we do not leave our clients on their own. If an issue arises in transit, we assist in filing claims, communicating with carriers, and working toward a resolution whenever possible.</p>
          </div>

          <div>
            <h3 className="font-display font-bold text-charcoal">6. Defects &amp; Returns</h3>
            <p className="mt-2">If you believe your order contains a manufacturing defect, notify us within 3 days of delivery and provide clear photos.</p>
            <p className="mt-2">Defective items must be returned to Alongway before replacements or credits are issued. Returned items allow us to verify the issue and correct it properly. Replacement goods are not issued without return of the affected units.</p>
            <p className="mt-2">Custom goods are otherwise non-returnable due to their made-to-order nature.</p>
            <p className="mt-2">We stand behind our work. If a legitimate production issue occurs, we will review it promptly and determine the best path forward to make it right.</p>
          </div>

          <div>
            <h3 className="font-display font-bold text-charcoal">7. Payment Terms</h3>
            <p className="mt-2">We accept payment via Stripe, QuickBooks, Melio, or other approved processors. By submitting payment, you authorize Alongway to charge your selected payment method.</p>
            <p className="mt-2">Overdue invoices may accrue interest at the maximum rate permitted by law.</p>
          </div>

          <div>
            <h3 className="font-display font-bold text-charcoal">8. Chargebacks</h3>
            <p className="mt-2">By placing an order, you agree not to initiate a chargeback once production has begun. Written approvals and confirmed invoices constitute contractual agreement. Improper chargebacks may result in collections and recovery of associated fees.</p>
          </div>

          <div>
            <h3 className="font-display font-bold text-charcoal">9. Intellectual Property</h3>
            <p className="mt-2">You represent that you own or have the legal right to use all submitted artwork. You agree to indemnify Alongway against any claims related to intellectual property infringement arising from client-provided designs.</p>
          </div>

          <div>
            <h3 className="font-display font-bold text-charcoal">10. Content &amp; Marketing Usage</h3>
            <p className="mt-2">Unless otherwise agreed in writing, Alongway may photograph, film, or otherwise document completed products for use in:</p>
            <ul className="mt-2 list-disc pl-5 space-y-1">
              <li>Website galleries</li>
              <li>Social media</li>
              <li>Email marketing</li>
              <li>Advertising</li>
              <li>Internal portfolio use</li>
              <li>Sales materials</li>
            </ul>
            <p className="mt-2">If your project is confidential, please notify us in writing before production begins.</p>
          </div>

          <div>
            <h3 className="font-display font-bold text-charcoal">11. Limitation of Liability</h3>
            <p className="mt-2">To the fullest extent permitted by law, Alongway&apos;s total liability shall not exceed the amount paid for the specific order in question.</p>
            <p className="mt-2">We are not liable for indirect or consequential damages such as lost profits or missed events. However, we always work in good faith to support our clients and find reasonable solutions where possible.</p>
          </div>

          <div>
            <h3 className="font-display font-bold text-charcoal">12. Governing Law</h3>
            <p className="mt-2">These Terms are governed by the laws of the State of California. Any disputes shall be resolved in California.</p>
          </div>
        </div>
      </section>

      {/* PRIVACY POLICY */}
      <section className="mt-16 border-t border-charcoal/10 pt-14">
        <h2 className="font-display text-2xl font-extrabold tracking-tight text-charcoal">
          Privacy Policy
        </h2>

        <div className="mt-8 space-y-8 text-sm leading-7 text-charcoal/80">
          <div>
            <h3 className="font-display font-bold text-charcoal">1. Information We Collect</h3>
            <p className="mt-2">We may collect:</p>
            <ul className="mt-2 list-disc pl-5 space-y-1">
              <li>Name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Company name</li>
              <li>Billing and shipping address</li>
              <li>IP address</li>
              <li>Website usage data</li>
            </ul>
            <p className="mt-2">Payment information is securely processed by third-party providers including Stripe, QuickBooks, and Melio. Alongway does not store full credit card information.</p>
          </div>

          <div>
            <h3 className="font-display font-bold text-charcoal">2. How We Use Information</h3>
            <p className="mt-2">We use collected information to:</p>
            <ul className="mt-2 list-disc pl-5 space-y-1">
              <li>Process orders</li>
              <li>Communicate about projects</li>
              <li>Provide customer support</li>
              <li>Improve our Website</li>
              <li>Send marketing communications (if opted in)</li>
              <li>Run advertising campaigns</li>
            </ul>
          </div>

          <div>
            <h3 className="font-display font-bold text-charcoal">3. Marketing Communications</h3>
            <p className="mt-2">If you opt in, we may send promotional emails or SMS messages. You may unsubscribe at any time using the link in emails or by replying STOP to SMS messages.</p>
          </div>

          <div>
            <h3 className="font-display font-bold text-charcoal">4. Cookies &amp; Tracking</h3>
            <p className="mt-2">We use cookies and tracking technologies including Google Analytics and Meta Pixel to measure performance and improve advertising. You may disable cookies in your browser settings.</p>
          </div>

          <div>
            <h3 className="font-display font-bold text-charcoal">5. Third-Party Services</h3>
            <p className="mt-2">We may share necessary information with trusted service providers including Stripe, QuickBooks, Melio, HubSpot, Typeform, Klaviyo, shipping carriers, and advertising platforms. We do not sell personal data.</p>
          </div>

          <div>
            <h3 className="font-display font-bold text-charcoal">6. Data Security</h3>
            <p className="mt-2">We implement commercially reasonable safeguards. While no system is completely secure, we take reasonable steps to protect your information.</p>
          </div>

          <div>
            <h3 className="font-display font-bold text-charcoal">7. California Privacy Rights</h3>
            <p className="mt-2">California residents may request access, deletion, or correction of personal data by contacting{" "}
              <a href="mailto:hello@alongway.co" className="text-blue hover:underline">hello@alongway.co</a>.
            </p>
          </div>

          <div>
            <h3 className="font-display font-bold text-charcoal">8. Updates</h3>
            <p className="mt-2">We may update this Legal page periodically. Continued use of the Website constitutes acceptance of updates.</p>
          </div>
        </div>
      </section>

      {/* COOKIE NOTICE */}
      <section className="mt-16 border-t border-charcoal/10 pt-14">
        <h2 className="font-display text-2xl font-extrabold tracking-tight text-charcoal">
          Cookie Notice
        </h2>
        <p className="mt-4 text-sm leading-7 text-charcoal/80">
          Alongway uses cookies and tracking technologies to enhance your browsing experience, analyze traffic, and measure advertising performance.
        </p>
        <p className="mt-3 text-sm leading-7 text-charcoal/80">
          By continuing to use this Website, you consent to our use of cookies as described above. You may manage or disable cookies in your browser settings.
        </p>
      </section>
    </div>
  );
}
