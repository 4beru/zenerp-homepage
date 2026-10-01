/**
 * Zen ERP — Homepage.
 * Hero → Services → Approach → Contact.
 *
 * The homepage is intentionally focused: one opening statement followed by
 * the service catalog, working approach, and final contact action.
 */
export default function Home() {
  return (
    <div className="flex min-h-svh flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <ScrollProgress />
      <Header />
      <main className="flex flex-1 flex-col">
        <Hero />
        <Services />
        <Process />
        <ContactSection />
      </main>
      <Footer />
      <BackToTop />
      <ContactDialog />
    </div>
  );
}
