import Categories from "./_components/Home/Categories";
import Devices from "./_components/Home/Devices";
import Hero from "./_components/Home/Hero";
import Pricing from "./_components/Home/Pricing";
import FAQ from "./_components/shared/FAQ";

export default function Home() {
  return (
    <>
      <Hero />
      <Categories />
      <Devices />
      <FAQ />
      <Pricing />
    </>
  )
}
