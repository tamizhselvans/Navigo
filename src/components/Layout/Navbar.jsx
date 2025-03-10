"use client";
import { useState } from "react";
import { useLocale } from "next-intl";
// import { useRouter, usePathname } from "next/navigation";
import { useRouter, usePathname } from "@/i18n/navigation";

const localeNames = {
  en: "English",
  ta: "Tamil",
};

export default function Navbar() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const navItems = [
    { key: "home", href: "#" },
    { key: "about", href: "#about" },
    { key: "services", href: "#services" },
    { key: "contact", href: "#contact" },
  ];

  const handleLanguageChange = (event) => {
    event.preventDefault();
    const selectedLanguage = event.target.value;
    router.push(pathname);
    router.replace(pathname, { locale: selectedLanguage });
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm fixed-top">
      <div className="container">
        <a className="navbar-brand d-flex align-items-center" href="#">
          {/* <Globe className="me-2" size={24} /> */}
          <span>Logo</span>
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {navItems.map((item) => (
              <li className="nav-item" key={item.key}>
                <a className="nav-link" href={item.href}>
                  {item.key}
                </a>
              </li>
            ))}
          </ul>

          <select defaultValue={locale} onChange={handleLanguageChange}>
            {Object.entries(localeNames).map(([localeKey, localeValue]) => (
              <option key={localeKey} value={localeKey}>
                {localeValue}
              </option>
            ))}
          </select>
        </div>
      </div>
    </nav>
  );
}
