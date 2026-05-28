import HeroSection from "../components/HeroSection";
import BrandTagLine from "../components/BrandTagLine"
import PopularProducts from "../components/PopularProducts";


export default function HomeView({ searchQuery }) {
  return (
    <div className="w-full">
      
      <HeroSection />
      <BrandTagLine />
      <PopularProducts searchQuery={searchQuery} />
      
    </div>
  );
};
