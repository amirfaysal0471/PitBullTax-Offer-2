import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Hero } from "@/components/sections/hero";
import { ProofStrip } from "@/components/sections/proof-strip";
import { TranscriptExample } from "@/components/sections/transcript-example";
import { Audience } from "@/components/sections/audience";
import { Comparison } from "@/components/sections/comparison";
import { Platform } from "@/components/sections/platform";
import { Software } from "@/components/sections/software";
import { Product } from "@/components/sections/product";
import { CaseJourney } from "@/components/sections/case-journey";
import { Steps } from "@/components/sections/steps";
import { Walkthrough } from "@/components/sections/walkthrough";
import { Feedback } from "@/components/sections/feedback";
import { Testimonials } from "@/components/sections/testimonials";
import { Community } from "@/components/sections/community";
import { Guidance } from "@/components/sections/guidance";
import { Faq } from "@/components/sections/faq";
import { FinalCta } from "@/components/sections/final-cta";

// Handoff sections (01–14) plus software, testimonial and community sections from offer2.pitbulltax.com.
export default function Home() {
  return (
    <div id="top">
      <Header />

      <main>
        <Hero />
        <ProofStrip />
        <TranscriptExample />
        <Audience />
        <Comparison />
        <Platform />
        <Software />
        <Product />
        <CaseJourney />
        <Steps />
        <Walkthrough />
        <Feedback />
        <Testimonials />
        <Community />
        <Guidance />
        <Faq />
        <FinalCta />
      </main>

      <Footer />
    </div>
  );
}
