import About from "@/components/about";
import BestSeller from "./_components/BestSeller";
import Hero from "./_components/Hero";
import Contact from "@/components/contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <BestSeller />
      <About />
      <Contact />
    </main>
  );
}
