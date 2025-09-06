// src/components/Header.jsx
import React, { useState } from "react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: "#mechanics", text: "Home" },
    { href: "#calculator", text: "Estimate" },
    { href: "#strategies", text: "Strategies" },
    { href: "#faq", text: "FAQ" },
  ];

  const handleScroll = (e, href) => {
    e.preventDefault();
    document.querySelector(href).scrollIntoView({
      behavior: "smooth",
    });
    if (isOpen) {
      setIsOpen(false);
    }
  };

  return (
    <nav className="glass-nav fixed top-0 left-0 right-0 z-50">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <span className="text-2xl text-white font-semibold">BPI Amore</span>
          <div className="hidden md:flex space-x-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleScroll(e, link.href)}
                className="nav-link"
              >
                {link.text}
              </a>
            ))}
          </div>
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)}>
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      <div className={`md:hidden ${isOpen ? "block" : "hidden"}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleScroll(e, link.href)}
              className="nav-link-mobile"
            >
              {link.text}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Header;
