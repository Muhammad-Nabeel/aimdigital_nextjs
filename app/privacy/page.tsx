import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { addressLine, site } from "@/config/site";

export const metadata: Metadata = {
  title: "Privacy policy",
  description:
    "How AIM Digital collects, uses and protects personal information, including quote requests and cookies.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy policy" href="/privacy" updated="4 November 2026">
      <p>
        This policy explains how {site.name} (“AIM Digital”, “we”, “us”) uses
        personal information when you visit this website or contact us. We are
        the data controller for this information under UK data protection law
        (UK GDPR and the Data Protection Act 2018).
      </p>

      <h2>Who we are</h2>
      <p>
        {site.name}, registered in England & Wales, company number{" "}
        {site.companyNumber}. Registered office: {addressLine}. For any privacy
        question, email <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>

      <h2>What we collect</h2>
      <ul>
        <li>
          <strong>Quote requests:</strong> your name, email address, and
          optionally your company and phone number, plus the service, budget,
          timing and project details you enter.
        </li>
        <li>
          <strong>Direct contact:</strong> anything you send us by email, phone
          or WhatsApp.
        </li>
        <li>
          <strong>Technical data:</strong> our hosting provider automatically
          processes information such as your IP address and browser type to
          deliver and secure the website.
        </li>
      </ul>
      <p>
        We do not use analytics or advertising tracking on this website, and we
        do not sell personal information.
      </p>

      <h2>How and why we use it</h2>
      <ul>
        <li>
          To reply to your enquiry and prepare a proposal, as a step before
          entering a contract with you, or in our legitimate interest in
          responding to business enquiries.
        </li>
        <li>
          To deliver agreed work and manage our client relationship, to perform
          our contract with you.
        </li>
        <li>
          To keep the website secure and prevent misuse, in our legitimate
          interest in protecting our services.
        </li>
      </ul>

      <h2>Who we share it with</h2>
      <p>
        We share personal information only with service providers that help us
        run this website and respond to you:
      </p>
      <ul>
        <li>
          <strong>Resend</strong>, which delivers quote requests to our inbox.
          Resend may process data in the United States under safeguards approved
          for UK data transfers.
        </li>
        <li>
          <strong>Our website hosting and database providers</strong>, which
          store and serve the website.
        </li>
        <li>
          <strong>Trustpilot</strong>, whose review widget on our home page is
          loaded from Trustpilot’s servers and is covered by Trustpilot’s own
          privacy policy.
        </li>
        <li>
          <strong>WhatsApp (Meta)</strong>, only if you choose to contact us
          that way.
        </li>
      </ul>

      <h2>Cookies and browser storage</h2>
      <p>
        This website does not set analytics or advertising cookies. We store
        your light or dark theme choice in your browser so the site remembers
        it; this stays on your device. The Trustpilot widget may set its own
        cookies when it loads. You can block or delete cookies in your browser
        settings; the website will still work.
      </p>

      <h2>How long we keep it</h2>
      <p>
        We keep enquiries for up to 24 months after our last contact so we can
        follow up on your project. If you become a client, we keep project and
        billing records for as long as needed to meet our legal and accounting
        obligations, normally six years.
      </p>

      <h2>Your rights</h2>
      <p>
        You can ask us to access, correct, delete or restrict the use of your
        personal information, object to how we use it, or request a copy to
        transfer elsewhere. Email{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a> and we will respond
        within one month. If you are unhappy with how we have handled your
        information, you can complain to the Information Commissioner’s Office
        at <a href="https://ico.org.uk/make-a-complaint/">ico.org.uk</a>.
      </p>

      <h2>Changes to this policy</h2>
      <p>
        We will update this page if our practices change. The date at the top
        shows when it was last revised.
      </p>
    </LegalPage>
  );
}
