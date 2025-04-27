import Link from "../link";
import Navbar from "./Navbar";
import CartButton from "./cart-button";
import { getCurrentLocale } from "@/lib/getCurrentLocale";
import getTrans from "@/lib/translation";
import LanguageSwitcher from "./language-switcher";

async function Header() {
  const locale = await getCurrentLocale();
  const translations = await getTrans(locale);

  return (
    <header className="py-4 md:py-6">
      <div className="container flex items-center justify-between gap-6 lg:gap-10">
        <Link
          href={`/${locale}`}
          className="text-2xl font-semibold text-primary"
        >
          🍕 {translations.logo}
        </Link>
        <Navbar translations={translations} />
        <LanguageSwitcher />
        <CartButton />
      </div>
    </header>
  );
}

export default Header;
