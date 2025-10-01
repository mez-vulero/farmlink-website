import { Hero } from "@/components/site/hero";
import { SectionHeader } from "@/components/site/section-header";
import { FeatureGrid } from "@/components/site/feature-grid";
import { WorkflowTabs } from "@/components/site/workflow-tabs";
import { OfflineSection } from "@/components/site/offline-section";
import { InsightsSection } from "@/components/site/insights-section";
import { Testimonials } from "@/components/site/testimonials";
import { CTA } from "@/components/site/cta";

export default function Home() {
  return (
    <div className="space-y-24">
      <Hero />

      <section id="features" className="space-y-12">
        <SectionHeader
          eyebrow="Unified operations"
          title="Everything your cooperative needs to run sustainably"
          description="Link farmer households, weigh-ins, payouts, inventory, and compliance data to keep your teams aligned at every stage of the harvest."
          align="center"
        />
        <FeatureGrid />
      </section>

      <section id="workflows" className="space-y-12">
        <SectionHeader
          eyebrow="Orchestrated workflows"
          title="Purpose-built workspaces for each team"
          description="FarmLink choreographs cherry receptions, finance, field outreach, and compliance so handoffs are automated and nothing falls through."
        />
        <WorkflowTabs />
      </section>

      <section id="offline" className="space-y-12">
        <SectionHeader
          eyebrow="Offline resilience"
          title="Connectivity drops. FarmLink keeps working."
          description="Caching, background sync, and device controls mean your mission-critical operations continue even when the signal doesn’t."
        />
        <OfflineSection />
      </section>

      <section id="insights" className="space-y-12">
        <SectionHeader
          eyebrow="Executive visibility"
          title="Operational insights you can act on"
          description="Visualize deliveries and balances in real time, trigger payouts with confidence, and prove compliance to partners."
        />
        <InsightsSection />
      </section>

      <section className="space-y-12">
        <SectionHeader
          eyebrow="Trusted in the field"
          title="Cooperatives using FarmLink are raising the bar"
          description="Leaders across East Africa are digitizing their supply chains and rewarding farmers faster with FarmLink."
        />
        <Testimonials />
      </section>

      <CTA />
    </div>
  );
}
