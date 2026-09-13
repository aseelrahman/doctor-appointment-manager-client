"use client";
import Link from "next/link";
import { useState } from "react";

import Image from "next/image";
import { Button } from "@heroui/react";
import { ThemeToggleBtn } from "./ThemeToggleBtn";

const NAV_LINKS = [
  { label: "Home", href: `/` },
  { label: "All Appointments", href: "/" },
  { label: "Dashboard", href: "/" },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-separator bg-background/70 backdrop-blur-lg">
      <div className="flex lg:grid lg:grid-cols-[1fr_auto_1fr] h-16 items-center justify-between px-6">
        {/* Logo */}
        <Link href={"/"}>
          <div className="flex items-center gap-2 font-black ">
            <Image
              src="/doctime_logo.png"
              width={150}
              height={50}
              alt="DocTime logo"
            />
          </div>
        </Link>

        {/* Nav Tabs */}
        <div className="hidden lg:flex justify-center items-center gap-4">
          <nav>
            <ul className="flex font-semibold text-xl items-center gap-4">
              {NAV_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <Link href={href}>{label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Theme Toggle and Menu Bar */}
        <div className="flex justify-end items-center gap-1">
          {/* Theme Toggle */}
          {/* Login Button */}
          <Link href={"/login"}>
            <Button>
              <span className="font-bold text-md">Login</span>
            </Button>
          </Link>
          <Link href={"/register"}>
            <Button>
              <span className="font-bold text-md">Register</span>
            </Button>
          </Link>
          <ThemeToggleBtn />
          {/* Menu Bar */}
          <button
            className="lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className="sr-only">Menu</span>
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <nav className="border-t border-separator md:hidden">
          <ul className="flex flex-col gap-2 p-4">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={label}>
                <Link href={href} className="block py-2">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
