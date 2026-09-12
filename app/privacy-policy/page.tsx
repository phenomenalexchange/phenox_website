import { ILogoTwo } from "@/utils/icons.utils";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | PhenoX",
  description: "Privacy Policy for PhenoX and Phenomenal Giants Ltd.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-primary-white text-primary-black">
      <header className="bg-primary-black px-4 py-8 text-primary-white md:py-12">
        <div className="mx-auto max-w-5xl">
          <Link
            href="/"
            aria-label="Back to website"
            title="Back to website"
            className="flex flex-col text-2xl leading-none text-gray-300-custom transition-colors hover:text-accent-yellow "
          >
            <span aria-hidden="true">&larr;</span>
            <span className=" text-sm">Back to website</span>
          </Link>
          <div className="flex flex-col items-center text-center">
            <Image
              src={ILogoTwo}
              alt="PhenoX - Home of successful transactions"
              width={220}
              height={84}
              priority
              className="mt-10 h-auto w-56"
            />
            <h1 className="mt-4 text-4xl font-semibold md:text-6xl">
              Privacy Policy
            </h1>
          </div>
        </div>
      </header>

      <article className="mx-auto max-w-4xl px-4 py-12 text-base leading-8 text-gray-700 md:py-20">
        <p className="mt-4">
          Phenomenal Giants Ltd (&quot;Phenomenal Giants&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) respects your privacy and is committed to protecting your personal data.
        </p>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold text-primary-black">1. WHO WE ARE</h2>
          <p className="mt-4">
            This Privacy Policy explains how we collect, use, disclose, and protect personal information when you visit or interact with our website: <a className="underline" href="https://www.phenomenalgiants.com/">https://www.phenomenalgiants.com/</a>
          </p>
          <p className="mt-4">
            This Privacy Policy applies specifically to our website. It does not govern the processing of personal data within the PhenoX mobile application, which is subject to a separate PhenoX App Privacy Policy.
          </p>
          <p className="mt-4">
            For privacy-related questions, requests, or concerns, contact us at <a className="underline" href="mailto:admin@phenomenalgiants.com">admin@phenomenalgiants.com</a>.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold text-primary-black">2. INFORMATION WE COLLECT</h2>
          <p className="mt-4">Because users cannot create PhenoX accounts directly through our website, we generally collect limited personal information from website visitors.</p>
          <p className="mt-4">Information you provide may include your name, email address, information contained in messages or enquiries, information voluntarily provided when contacting us, and other information you choose to provide.</p>
          <p className="mt-4">When you access our website, certain technical information may be processed automatically by our website infrastructure, including IP address, browser type, device type, operating system, date and time of access, pages or resources requested, and basic server and security logs.</p>
          <p className="mt-4">We currently do not use third-party analytics services to track or profile visitors to our website.</p>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold text-primary-black">3. HOW WE USE YOUR INFORMATION</h2>
          <p className="mt-4">We may use information collected through our website to:</p>
          <ul className="mt-4 list-disc space-y-2 pl-6">
            <li>Operate and maintain the website.</li>
            <li>Respond to enquiries and communications.</li>
            <li>Provide information about Phenomenal Giants and our services.</li>
            <li>Protect the website against fraud, abuse, attacks, and other security threats.</li>
            <li>Maintain website security and reliability.</li>
            <li>Comply with applicable legal and regulatory obligations.</li>
            <li>Send marketing communications and promotional information where permitted by applicable law.</li>
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold text-primary-black">4. MARKETING COMMUNICATIONS</h2>
          <p className="mt-4">We may send marketing emails, promotional communications, announcements, and information about our services, products, offers, or campaigns.</p>
          <p className="mt-4">Where required by applicable law, we will obtain appropriate consent before sending certain marketing communications.</p>
          <p className="mt-4">You may unsubscribe from marketing emails at any time by using the unsubscribe mechanism included in the relevant email or by contacting us at <a className="underline" href="mailto:admin@phenomenalgiants.com">admin@phenomenalgiants.com</a>.</p>
          <p className="mt-4">Even if you opt out of marketing communications, we may still send important non-marketing communications where necessary.</p>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold text-primary-black">5. COOKIES</h2>
          <p className="mt-4">Our website may use cookies or similar technologies necessary for operation, security, and functionality.</p>
          <p className="mt-4">We currently do not use third-party analytics services.</p>
          <p className="mt-4">If we introduce analytics, advertising, tracking, or other non-essential cookies in the future, we will update this Privacy Policy and, where required, provide appropriate notice and consent mechanisms.</p>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold text-primary-black">6. HOW WE SHARE YOUR INFORMATION</h2>
          <p className="mt-4">We do not sell your personal data.</p>
          <p className="mt-4">We may disclose personal information where reasonably necessary to service providers that help us operate our website; hosting and infrastructure providers; professional advisers; government authorities, regulators, law-enforcement agencies, or other persons where disclosure is required or permitted by law; or other parties where you have provided appropriate consent or disclosure is otherwise legally permitted.</p>
          <p className="mt-4">Our website infrastructure is hosted using Railway. Information processed through our website infrastructure may therefore be processed by Railway as a service provider on our behalf.</p>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold text-primary-black">7. INTERNATIONAL DATA TRANSFERS</h2>
          <p className="mt-4">Some service providers or technology infrastructure may process information outside Nigeria.</p>
          <p className="mt-4">Where personal data is transferred outside Nigeria, we will take appropriate steps required by applicable data protection law to ensure that the transfer and processing are conducted lawfully and appropriate safeguards are applied.</p>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold text-primary-black">8. DATA SECURITY</h2>
          <p className="mt-4">We take reasonable technical and organisational measures to protect personal information against unauthorised access, alteration, disclosure, loss, misuse, or destruction.</p>
          <p className="mt-4">However, no method of transmitting or storing information electronically can be guaranteed to be completely secure.</p>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold text-primary-black">9. DATA RETENTION</h2>
          <p className="mt-4">We retain personal information only for as long as reasonably necessary for the purposes for which it was collected, to comply with applicable legal and regulatory obligations, resolve disputes, enforce agreements, and protect our legitimate interests.</p>
          <p className="mt-4">The specific retention period may vary depending on the nature of the information and the purpose for which it is processed.</p>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold text-primary-black">10. YOUR DATA PROTECTION RIGHTS</h2>
          <p className="mt-4">Subject to applicable law and lawful exemptions, you may have rights concerning your personal data, including the right to:</p>
          <ul className="mt-4 list-disc space-y-2 pl-6">
            <li>Request access to personal information we hold about you.</li>
            <li>Request correction of inaccurate or incomplete information.</li>
            <li>Request deletion of personal information in appropriate circumstances.</li>
            <li>Request restriction of certain processing.</li>
            <li>Object to certain processing.</li>
            <li>Withdraw consent where processing is based on consent.</li>
            <li>Request portability of personal information where applicable.</li>
            <li>Exercise other rights available to you under applicable data protection law.</li>
          </ul>
          <p className="mt-4">To exercise a privacy right, contact <a className="underline" href="mailto:admin@phenomenalgiants.com">admin@phenomenalgiants.com</a>. We may need to verify your identity before processing certain requests.</p>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold text-primary-black">11. THIRD-PARTY WEBSITES</h2>
          <p className="mt-4">Our website may contain links to websites or services operated by third parties.</p>
          <p className="mt-4">We are not responsible for the privacy practices, content, security, or policies of third-party websites. We recommend reviewing their privacy policies before providing them with personal information.</p>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold text-primary-black">12. CHILDREN&apos;S PRIVACY</h2>
          <p className="mt-4">Our website is not intended to knowingly collect personal information from children.</p>
          <p className="mt-4">If you believe that a child has provided personal information to us without appropriate authorisation, please contact us so that we can assess and take appropriate action.</p>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold text-primary-black">13. CHANGES TO THIS PRIVACY POLICY</h2>
          <p className="mt-4">We may update this Privacy Policy from time to time to reflect changes in our services, technology, legal requirements, or privacy practices.</p>
          <p className="mt-4">When we make changes, we will update the &quot;Last Updated&quot; date at the top of this Privacy Policy.</p>
          <p className="mt-4">We encourage you to review this page periodically.</p>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold text-primary-black">14. CONTACT US</h2>
          <p className="mt-4">If you have questions, concerns, complaints, or requests regarding this Privacy Policy or the processing of your personal data, please contact:</p>
          <address className="mt-4 not-italic">
            Phenomenal Giants Ltd<br />
            Email: <a className="underline" href="mailto:admin@phenomenalgiants.com">admin@phenomenalgiants.com</a><br />
            Website: <a className="underline" href="https://www.phenomenalgiants.com/">https://www.phenomenalgiants.com/</a>
          </address>
        </section>
      </article>
    </main>
  );
}
