import MainHeading from "@/components/main-heading";
import Menu from "@/components/menu";
import { getCurrentLocale } from "@/lib/getCurrentLocale";
import getTrans from "@/lib/translation";
import { getBestSellers } from "@/server/db/products";

async function BestSeller() {
  const bestSellers = await getBestSellers(3);
  const locale = await getCurrentLocale();
  const { home } = await getTrans(locale);
  const { bestSeller } = home;
  return (
    <section>
      <div className="container">
        <div className="text-center mb-4">
          <MainHeading
            title={bestSeller.OurBestSellers}
            subTitle={bestSeller.checkOut}
          />
        </div>
        <Menu items={bestSellers} />
      </div>
    </section>
  );
}

export default BestSeller;
