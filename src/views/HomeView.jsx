import HeroSection from "../components/HeroSection";
import BrandTagLine from "../components/BrandTagLine"
import PopularProducts from "../components/PopularProducts";

/* ----- VIEW COMPONENT: HomeView ----- */

export default function HomeView() {
  return (
    <div className="w-full">
      
      <HeroSection />
      <BrandTagLine />
      <PopularProducts />
      
    </div>
  );
};
