import { useState } from 'react';
import { type DivisionId } from './config/site';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { DivisionsSection } from './components/DivisionsSection';
import { TestimonialCarousel } from './components/TestimonialCarousel';
import { ProcessAndPricing } from './components/ProcessAndPricing';
import { IntakeSection } from './components/IntakeSection';
import { RapidDispatchModal } from './components/RapidDispatchModal';
import { CertificationsModal } from './components/CertificationsModal';
import { Footer } from './components/Footer';

export default function App() {
  const [activeTab, setActiveTab] = useState<DivisionId>('remote');
  const [submitted, setSubmitted] = useState(false);
  const [resetSignal, setResetSignal] = useState(0);
  const [connectModalOpen, setConnectModalOpen] = useState(false);
  const [certsModalOpen, setCertsModalOpen] = useState(false);
  const [initialCertId, setInitialCertId] = useState<string | undefined>(undefined);

  function handleSelectDivisionAndScroll(division: DivisionId) {
    if (submitted) {
      setResetSignal((n) => n + 1);
    }
    setActiveTab(division);
    setSubmitted(false);
    const intakeElement = document.getElementById('intake');
    if (intakeElement) {
      intakeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  function handleTabChange(division: DivisionId) {
    if (submitted) {
      setResetSignal((n) => n + 1);
    }
    setActiveTab(division);
    setSubmitted(false);
  }

  function handleOpenCertifications(certId?: string) {
    setInitialCertId(certId);
    setCertsModalOpen(true);
  }

  return (
    <div className="min-h-screen bg-[#060913] text-[#f8fafc]">
      <Header onOpenConnectModal={() => setConnectModalOpen(true)} />

      <main>
        <Hero onSelectDivision={handleSelectDivisionAndScroll} />
        <DivisionsSection
          onSelectDivision={handleSelectDivisionAndScroll}
          onOpenCertifications={handleOpenCertifications}
        />
        <TestimonialCarousel onSelectDivision={handleSelectDivisionAndScroll} />
        <ProcessAndPricing onSelectDivision={handleSelectDivisionAndScroll} />
        <IntakeSection
          activeTab={activeTab}
          onTabChange={handleTabChange}
          submitted={submitted}
          onSubmittedChange={setSubmitted}
          resetSignal={resetSignal}
        />
      </main>

      <Footer />

      <RapidDispatchModal
        open={connectModalOpen}
        onClose={() => setConnectModalOpen(false)}
        onSelectDivision={handleSelectDivisionAndScroll}
      />

      <CertificationsModal
        open={certsModalOpen}
        initialCertId={initialCertId}
        onClose={() => setCertsModalOpen(false)}
      />
    </div>
  );
}
