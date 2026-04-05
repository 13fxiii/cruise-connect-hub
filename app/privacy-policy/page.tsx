import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "Privacy Policy | CRUISE CONNECT HUB",
  description: "Privacy Policy for CRUISE CONNECT HUB - Learn how we collect, use, and protect your personal information.",
}

export default function PrivacyPolicyPage() {
  const lastUpdated = "April 5, 2026"
  const appName = "CRUISE CONNECT HUB"
  const websiteUrl = "https://cruise-connect-hub.vercel.app"

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <Link 
          href="/" 
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        <header className="mb-12">
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Privacy Policy
          </h1>
          <p className="text-lg text-muted-foreground">
            Last updated: {lastUpdated}
          </p>
        </header>

        <article className="prose prose-neutral dark:prose-invert max-w-none">
          <section className="mb-10">
            <h2 className="mb-4 text-2xl font-semibold text-foreground">1. Introduction</h2>
            <p className="mb-4 text-muted-foreground leading-relaxed">
              Welcome to {appName}〽️ (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). We are committed to protecting your privacy 
              and personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard 
              your information when you visit our community platform at{" "}
              <a href={websiteUrl} className="text-primary hover:underline">{websiteUrl}</a>.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Please read this Privacy Policy carefully. By using {appName}, you consent to the practices 
              described in this policy.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="mb-4 text-2xl font-semibold text-foreground">2. Information We Collect</h2>
            
            <h3 className="mb-3 text-xl font-medium text-foreground">2.1 Personal Information</h3>
            <p className="mb-4 text-muted-foreground leading-relaxed">
              We may collect personal information that you voluntarily provide when using our services, including:
            </p>
            <ul className="mb-6 list-disc space-y-2 pl-6 text-muted-foreground">
              <li>Name and username</li>
              <li>Email address</li>
              <li>Profile picture and bio</li>
              <li>Phone number (optional)</li>
              <li>Location information (optional)</li>
              <li>Social media profiles (if linked)</li>
              <li>Any other information you choose to provide</li>
            </ul>

            <h3 className="mb-3 text-xl font-medium text-foreground">2.2 Automatically Collected Information</h3>
            <p className="mb-4 text-muted-foreground leading-relaxed">
              When you access our platform, we automatically collect certain information, including:
            </p>
            <ul className="mb-6 list-disc space-y-2 pl-6 text-muted-foreground">
              <li>Device information (type, operating system, browser)</li>
              <li>IP address and approximate location</li>
              <li>Usage data (pages visited, features used, time spent)</li>
              <li>Cookies and similar tracking technologies</li>
              <li>Referral source and exit pages</li>
            </ul>

            <h3 className="mb-3 text-xl font-medium text-foreground">2.3 User-Generated Content</h3>
            <p className="text-muted-foreground leading-relaxed">
              We collect content you create, share, or post on our platform, including posts, comments, 
              messages, and media files.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="mb-4 text-2xl font-semibold text-foreground">3. How We Use Your Information</h2>
            <p className="mb-4 text-muted-foreground leading-relaxed">
              We use the information we collect to:
            </p>
            <ul className="mb-4 list-disc space-y-2 pl-6 text-muted-foreground">
              <li>Provide, maintain, and improve our services</li>
              <li>Create and manage your account</li>
              <li>Process transactions and send related information</li>
              <li>Send administrative messages, updates, and security alerts</li>
              <li>Respond to your comments, questions, and support requests</li>
              <li>Personalize your experience and deliver relevant content</li>
              <li>Monitor and analyze usage trends and preferences</li>
              <li>Detect, prevent, and address technical issues and security threats</li>
              <li>Enforce our Terms of Service and community guidelines</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="mb-4 text-2xl font-semibold text-foreground">4. Information Sharing and Disclosure</h2>
            <p className="mb-4 text-muted-foreground leading-relaxed">
              We may share your information in the following circumstances:
            </p>
            <ul className="mb-4 list-disc space-y-2 pl-6 text-muted-foreground">
              <li><strong>With Other Users:</strong> Your profile information and public content are visible to other community members</li>
              <li><strong>Service Providers:</strong> We may share data with third-party vendors who assist in operating our platform</li>
              <li><strong>Legal Requirements:</strong> We may disclose information if required by law or to protect rights and safety</li>
              <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets</li>
              <li><strong>With Your Consent:</strong> We may share information when you give us explicit permission</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed">
              We do NOT sell your personal information to third parties.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="mb-4 text-2xl font-semibold text-foreground">5. Cookies and Tracking Technologies</h2>
            <p className="mb-4 text-muted-foreground leading-relaxed">
              We use cookies and similar tracking technologies to collect and store information about your 
              interactions with our platform. These include:
            </p>
            <ul className="mb-4 list-disc space-y-2 pl-6 text-muted-foreground">
              <li><strong>Essential Cookies:</strong> Required for basic platform functionality</li>
              <li><strong>Analytics Cookies:</strong> Help us understand how users interact with our platform</li>
              <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
              <li><strong>Authentication Cookies:</strong> Keep you logged in securely</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed">
              You can control cookie settings through your browser preferences. Note that disabling certain 
              cookies may affect platform functionality.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="mb-4 text-2xl font-semibold text-foreground">6. Data Security</h2>
            <p className="text-muted-foreground leading-relaxed">
              We implement appropriate technical and organizational security measures to protect your personal 
              information, including encryption, secure servers, and access controls. However, no method of 
              transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="mb-4 text-2xl font-semibold text-foreground">7. Data Retention</h2>
            <p className="text-muted-foreground leading-relaxed">
              We retain your personal information for as long as your account is active or as needed to provide 
              our services. We may also retain information to comply with legal obligations, resolve disputes, 
              and enforce our agreements. When you delete your account, we will delete or anonymize your data 
              within 30 days, except where retention is required by law.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="mb-4 text-2xl font-semibold text-foreground">8. Your Rights and Choices</h2>
            <p className="mb-4 text-muted-foreground leading-relaxed">
              Depending on your location, you may have the following rights regarding your personal information:
            </p>
            <ul className="mb-4 list-disc space-y-2 pl-6 text-muted-foreground">
              <li><strong>Access:</strong> Request a copy of your personal data</li>
              <li><strong>Correction:</strong> Request correction of inaccurate information</li>
              <li><strong>Deletion:</strong> Request deletion of your personal data</li>
              <li><strong>Portability:</strong> Request your data in a portable format</li>
              <li><strong>Opt-out:</strong> Unsubscribe from marketing communications</li>
              <li><strong>Restriction:</strong> Request limitation of processing</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed">
              To exercise these rights, please contact us through our platform or update your account settings.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="mb-4 text-2xl font-semibold text-foreground">9. Children&apos;s Privacy</h2>
            <p className="text-muted-foreground leading-relaxed">
              {appName} is not intended for children under 13 years of age. We do not knowingly collect 
              personal information from children under 13. If you believe we have collected information from 
              a child under 13, please contact us immediately, and we will take steps to delete such information.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="mb-4 text-2xl font-semibold text-foreground">10. International Data Transfers</h2>
            <p className="text-muted-foreground leading-relaxed">
              Your information may be transferred to and processed in countries other than your country of 
              residence. These countries may have different data protection laws. By using our services, you 
              consent to the transfer of your information to these countries.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="mb-4 text-2xl font-semibold text-foreground">11. Third-Party Links</h2>
            <p className="text-muted-foreground leading-relaxed">
              Our platform may contain links to third-party websites or services. We are not responsible for 
              the privacy practices of these third parties. We encourage you to review their privacy policies 
              before providing any personal information.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="mb-4 text-2xl font-semibold text-foreground">12. Changes to This Privacy Policy</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of any material changes 
              by posting the new policy on this page and updating the &quot;Last updated&quot; date. Your continued use 
              of our services after changes constitutes acceptance of the updated policy.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="mb-4 text-2xl font-semibold text-foreground">13. Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have any questions, concerns, or requests regarding this Privacy Policy or our data 
              practices, please contact us through our platform at{" "}
              <a href={websiteUrl} className="text-primary hover:underline">{appName}</a>.
            </p>
          </section>
        </article>

        <footer className="mt-12 border-t border-border pt-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} {appName}〽️. All rights reserved.
            </p>
            <Link 
              href="/terms-of-service" 
              className="text-sm text-primary hover:underline"
            >
              Terms of Service
            </Link>
          </div>
        </footer>
      </div>
    </main>
  )
}
