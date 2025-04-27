"use client";
import { Pages, Routes } from "@/constants/enums";
import Link from "../link";
import { Button, buttonVariants } from "../ui/button";
import { useState } from "react";
import { Menu, XIcon } from "lucide-react";
import { Translations } from "@/types/translations";
import { useParams, usePathname } from "next/navigation";

function Navbar({ translations }: { translations: Translations }) {
  const { locale } = useParams();
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState(false);
  const links = [
    {
      id: crypto.randomUUID(),
      title: translations.navbar.menu,
      href: Routes.MENU,
    },
    {
      id: crypto.randomUUID(),
      title: translations.navbar.about,
      href: Routes.ABOUT,
    },
    {
      id: crypto.randomUUID(),
      title: translations.navbar.contact,
      href: Routes.CONTACT,
    },
    {
      id: crypto.randomUUID(),
      title: translations.navbar.login,
      href: `${Routes.AUTH}/${Pages.LOGIN}`,
    },
  ];
  return (
    <nav className="flex justify-end flex-1">
      <Button
        variant="secondary"
        size="sm"
        className="md:hidden"
        onClick={() => setOpenMenu(true)}
      >
        <Menu className="!w-6 !h-6" />
      </Button>
      <ul
        className={`fixed md:static ${
          openMenu ? "left-0 z-50" : "-left-full"
        } top-0 px-10 py-20 md:p-0 flex flex-col md:flex-row items-start md:items-center gap-10 h-full md:h-auto w-full md:w-auto bg-background md:bg-transparent transition-all duration-200`}
      >
        <Button
          variant="secondary"
          size="sm"
          className="md:hidden absolute top-10 right-10"
          onClick={() => setOpenMenu(false)}
        >
          <XIcon className="!w-6 !h-6" />
        </Button>
        {links.map((link) => (
          <li key={link.id}>
            <Link
              onClick={() => setOpenMenu(false)}
              href={`/${locale}/${link.href}`}
              className={`${
                link.href === `${Routes.AUTH}/${Pages.LOGIN}`
                  ? `${buttonVariants({ size: "lg" })} !px-8 !rounded-full`
                  : "text-accent hover:text-primary transition-colors duration-200"
              } font-semibold ${
                pathname.startsWith(`/${locale}/${link.href}`)
                  ? "text-primary"
                  : "text-accent"
              }`}
            >
              {link.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;
