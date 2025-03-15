"use client";
import { useState } from "react";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";

const localeNames = {
  en: "English",
  ta: "Tamil",
};

export default function Navbar() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { key: "Home", href: `/${locale}`, icon: "fi fi-ss-house-chimney" },
    { key: "About", href: "#about", icon: "fi fi-ss-info" },
    { key: "Services", href: "#services", icon: "fi fi-ss-time-twenty-four" },
    { key: "Contact", href: "#contact", icon: "fi fi-ss-customer-service" },
  ];

  const handleLanguageChange = (event) => {
    event.preventDefault();
    const selectedLanguage = event.target.value;
    router.replace(pathname, { locale: selectedLanguage });
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm fixed-top">
      <div className="container">
        {/* Logo */}
        <a className="navbar-brand fw-bold" href="#">
          NaviGo
        </a>

        {/* Mobile Menu Toggle */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded={isOpen ? "true" : "false"}
          aria-label="Toggle navigation"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navigation Links */}
        <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`} id="navbarNav">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {navItems.map((item) => (
              <li className="nav-item" key={item.key}>
                <a
                  className="nav-link px-3 py-2 text-dark fw-semibold position-relative"
                  href={item.href}
                >
                  <i className={item.icon}></i> {item.key}
                  <span
                    className="position-absolute start-0 bottom-0 w-100 bg-primary"
                    style={{
                      height: "2px",
                      transform: "scaleX(0)",
                      transition: "transform 0.3s ease-in-out",
                    }}
                  ></span>
                </a>
              </li>
            ))}
          </ul>

          {/* Language Selector */}
          <select
            className="form-select w-auto ms-3"
            defaultValue={locale}
            onChange={handleLanguageChange}
          >
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
