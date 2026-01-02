import HeroSection from '@/components/home/HeroSection';
import FeaturesSection from '@/components/home/FeaturesSection';
// import TestimonialsSection from '@/components/home/TestimonialsSection';
import StatsSection from '@/components/home/StatsSection';
import CTASection from '@/components/home/CTASection';

export default function Home() {
  return (
    <div className="bg-white">
      <HeroSection />
      <FeaturesSection />
      <StatsSection />
      {/* <TestimonialsSection /> */}
      <CTASection />
    </div>
  );
}