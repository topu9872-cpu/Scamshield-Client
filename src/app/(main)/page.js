import Banner from "@/Components/Banner/Banner";
import FAQ from "@/Components/FAQ/FAQ";
import Footer from "@/Components/Footer/Footer";
import HowItWorks from "@/Components/HowItWorks/HowItWorks";
import WhyChoose from "@/Components/WhyChoose/WhyChoose";

export default function Home() {
  return (
   <main>
    <Banner/>
    <HowItWorks/>
    <WhyChoose/>
    <FAQ/>
    <Footer/>
   </main>
  );
}
