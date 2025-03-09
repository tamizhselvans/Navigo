"use client";
import React from "react";

export default function Navbar() {
  const navItems = [
    { key: "home", href: "#" },
    { key: "about", href: "#about" },
    { key: "services", href: "#services" },
    { key: "contact", href: "#contact" },
  ];

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
                  Home
                </a>
              </li>
            ))}
          </ul>

          <select
            // value={language}
            // onChange={(e) => setLanguage(e.target.value as any)}
            className="form-select form-select-sm navbar-language-select"
            style={{ width: "auto" }}
          >
            <option value="en">EN</option>
            <option value="es">ES</option>
            <option value="fr">FR</option>
          </select>
        </div>
      </div>
    </nav>
  );
}
