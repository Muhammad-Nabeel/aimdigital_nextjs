import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/legal-page";
import { addressLine, site } from "@/config/site";

export const metadata: Metadata = {
  title: "Terms of use",
  description: "The terms that apply when you use the AIM Digital website.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <LegalPage title="Terms of use" href="/terms" updated="4 November 2026">
      <p>
        These terms apply to your use of this website, operated by {site.name}{" "}
        (company number {site.companyNumber}, registered office {addressLine}).
        By using the website, you accept these terms. They do not cover paid
        work: each project is governed by the proposal and agreement we make
        with you.
      </p>

      <h2>Using this website</h2>
      <p>
        You may browse, share and link to this website for lawful purposes. You
        must not attempt to disrupt it, gain unauthorised access to any part of
        it, or submit false or automated enquiries through its forms.
      </p>

      <h2>Information on this website</h2>
      <p>
        Our articles, guides and service descriptions are general information,
        not professional advice for your specific situation. Prices shown are a
        guide; your quote confirms the scope, hours and costs for your project.
        We aim to keep content accurate and up to date, but do not guarantee
        that it is complete or error-free.
      </p>

      <h2>Intellectual property</h2>
      <p>
        The content, design and branding of this website belong to AIM Digital
        or are used with permission. Client names and logos belong to their
        owners. You may not copy or republish our content for commercial use
        without our written permission.
      </p>

      <h2>Links to other websites</h2>
      <p>
        We link to client websites, review platforms and social networks for
        your convenience. We are not responsible for their content or privacy
        practices.
      </p>

      <h2>Our liability</h2>
      <p>
        We are not liable for any loss arising from your use of, or reliance on,
        information on this website, except where the law does not allow us to
        exclude liability, such as for death or personal injury caused by
        negligence, or for fraud.
      </p>

      <h2>Privacy</h2>
      <p>
        Our <Link href="/privacy">privacy policy</Link> explains how we handle
        personal information you share with us.
      </p>

      <h2>Governing law</h2>
      <p>
        These terms are governed by the law of England and Wales, and the courts
        of England and Wales have jurisdiction over any dispute.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about these terms? Email{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>
    </LegalPage>
  );
}
