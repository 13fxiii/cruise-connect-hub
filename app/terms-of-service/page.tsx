import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "Terms of Service | CRUISE CONNECT HUB",
  description: "Terms of Service for CRUISE CONNECT HUB - Read our terms and conditions for using our community platform.",
}

export default function TermsOfServicePage() {
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
            Terms of Service
          </h1>
          <p className="text-lg text-muted-foreground">
            Last updated: {lastUpdated}
          </p>
        </header>

        <article className="prose prose-neutral dark:prose-invert max-w-none">
          <section className="mb-10">
            <h2 className="mb-4 text-2xl font-semibold text-foreground">1. Acceptance of Terms</h2>
            <p className="mb-4 text-muted-foreground leading-relaxed">
              Welcome to {appName}〽️. By accessing or using our community platform at{" "}
              <a href={websiteUrl} className="text-primary hover:underline">{websiteUrl}</a>, 
              you agree to be bound by these Terms of Service (&quot;Terms&quot;). If you do not agree to these Terms, 
              please do not use our services.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              These Terms constitute a legally binding agreement between you and {appName}. We reserve the right 
              to modify these Terms at any time, and such modifications will be effective immediately upon posting.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="mb-4 text-2xl font-semibold text-foreground">2. Description of Service</h2>
            <p className="mb-4 text-muted-foreground leading-relaxed">
              {appName} is a community platform designed to connect users with shared interests. Our services include 
              but are not limited to:
            </p>
            <ul className="mb-4 list-disc space-y-2 pl-6 text-muted-foreground">
              <li>Community forums and discussion boards</li>
              <li>User profiles and networking features</li>
              <li>Content sharing and collaboration tools</li>
              <li>Event organization and participation</li>
              <li>Direct messaging and communication features</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="mb-4 text-2xl font-semibold text-foreground">3. User Accounts</h2>
            <p className="mb-4 text-muted-foreground leading-relaxed">
              To access certain features of {appName}, you may be required to create an account. You agree to:
            </p>
            <ul className="mb-4 list-disc space-y-2 pl-6 text-muted-foreground">
              <li>Provide accurate, current, and complete information during registration</li>
              <li>Maintain and promptly update your account information</li>
              <li>Keep your password secure and confidential</li>
              <li>Accept responsibility for all activities under your account</li>
              <li>Notify us immediately of any unauthorized use of your account</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed">
              You must be at least 13 years of age to create an account. If you are under 18, you must have 
              parental or guardian consent to use our services.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="mb-4 text-2xl font-semibold text-foreground">4. User Conduct</h2>
            <p className="mb-4 text-muted-foreground leading-relaxed">
              When using {appName}, you agree NOT to:
            </p>
            <ul className="mb-4 list-disc space-y-2 pl-6 text-muted-foreground">
              <li>Post content that is unlawful, harmful, threatening, abusive, harassing, defamatory, or invasive of privacy</li>
              <li>Impersonate any person or entity or misrepresent your affiliation</li>
              <li>Upload viruses, malware, or other malicious code</li>
              <li>Spam, phish, or engage in any fraudulent activity</li>
              <li>Collect or harvest user data without consent</li>
              <li>Interfere with or disrupt our services or servers</li>
              <li>Violate any applicable laws or regulations</li>
              <li>Engage in any activity that could harm minors</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="mb-4 text-2xl font-semibold text-foreground">5. User Content</h2>
            <p className="mb-4 text-muted-foreground leading-relaxed">
              You retain ownership of content you post on {appName}. However, by posting content, you grant us a 
              non-exclusive, worldwide, royalty-free license to use, reproduce, modify, and display your content 
              in connection with our services.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              You are solely responsible for your content and the consequences of posting it. We reserve the right 
              to remove any content that violates these Terms or that we find objectionable.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="mb-4 text-2xl font-semibold text-foreground">6. Intellectual Property</h2>
            <p className="text-muted-foreground leading-relaxed">
              All content, features, and functionality of {appName} (excluding user content) are owned by us and 
              are protected by copyright, trademark, and other intellectual property laws. You may not copy, modify, 
              distribute, or create derivative works without our express written permission.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="mb-4 text-2xl font-semibold text-foreground">7. Termination</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may terminate or suspend your account and access to our services immediately, without prior notice, 
              for any reason, including breach of these Terms. Upon termination, your right to use our services will 
              cease immediately. You may also delete your account at any time through your account settings.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="mb-4 text-2xl font-semibold text-foreground">8. Disclaimer of Warranties</h2>
            <p className="text-muted-foreground leading-relaxed">
              {appName} is provided &quot;as is&quot; and &quot;as available&quot; without warranties of any kind, either express or 
              implied. We do not warrant that our services will be uninterrupted, secure, or error-free. We disclaim 
              all warranties, including implied warranties of merchantability, fitness for a particular purpose, and 
              non-infringement.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="mb-4 text-2xl font-semibold text-foreground">9. Limitation of Liability</h2>
            <p className="text-muted-foreground leading-relaxed">
              To the maximum extent permitted by law, {appName} and its affiliates shall not be liable for any 
              indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, 
              or goodwill, arising from your use of our services.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="mb-4 text-2xl font-semibold text-foreground">10. Governing Law</h2>
            <p className="text-muted-foreground leading-relaxed">
              These Terms shall be governed by and construed in accordance with applicable laws, without regard to 
              conflict of law principles. Any disputes arising from these Terms shall be resolved through binding 
              arbitration or in the courts of competent jurisdiction.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="mb-4 text-2xl font-semibold text-foreground">11. Contact Information</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have any questions about these Terms of Service, please contact us through our platform at{" "}
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
              href="/privacy-policy" 
              className="text-sm text-primary hover:underline"
            >
              Privacy Policy
            </Link>
          </div>
        </footer>
      </div>
    </main>
  )
}
