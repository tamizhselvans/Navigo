"use client";
import { useState } from "react";
import { useLocale } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useRouter, usePathname } from "@/i18n/navigation";

const localeNames = {
  en: "English",
  ta: "Tamil",
};

export default function Navbar() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { key: "Find Bus", href: `/${locale}`, icon: "fi fi-ss-bus-alt" },
    { key: "About", href: `/${locale}/about`, icon: "fi fi-ss-info" },
  ];

  const handleLanguageChange = (event) => {
    event.preventDefault();
    const params = new URLSearchParams(searchParams);
    const queryString = params?.toString() || null;
    const selectedLanguage = event.target.value;
    const newUrl = queryString ? `${pathname}?${queryString}` : `${pathname}`;
    router.replace(newUrl, { locale: selectedLanguage });
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
        {/* SOS Button */}
        <button
          className="btn btn-danger ms-3 fw-semibold"
          onClick={() => alert("Alert sent successfull")}
        >
          🚨 SOS
        </button>
      </div>
    </nav>
  );
}
