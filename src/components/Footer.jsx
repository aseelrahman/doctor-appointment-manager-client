import Image from "next/image";
import Link from "next/link";
import { FaFacebook, FaLinkedin } from "react-icons/fa";
import { FaSquareInstagram, FaSquareXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-accent-soft pt-10 px-4">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 text-center md:grid-cols-3 md:text-left lg:gap-12">
        {/* Brand */}
        <div className="flex flex-col items-center md:items-start">
          <Image
            src="/doctime_logo.png"
            alt="DocTime logo"
            width={300}
            height={100}
            className="h-auto w-56 sm:w-64"
          />

          <p className="mt-3 max-w-md text-sm leading-6 text-muted">
            Book trusted doctors near you, manage appointments, and take charge
            of your health.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-lg font-bold">Quick Links</h2>

          <ul className="mt-4 flex flex-col items-center gap-3 md:items-start">
            <li>
              <Link
                href="/"
                className="text-sm text-muted transition-colors hover:text-accent"
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                href="/"
                className="text-sm text-muted transition-colors hover:text-accent"
              >
                All Appointments
              </Link>
            </li>

            <li>
              <Link
                href="/"
                className="text-sm text-muted transition-colors hover:text-accent"
              >
                Dashboard
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div className="flex flex-col items-center md:items-start">
          <h2 className="text-lg font-bold">Follow Us</h2>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-3xl sm:text-4xl">
            <Link
              href="https://www.facebook.com/"
              aria-label="Facebook"
              className="transition-transform duration-300 hover:scale-110 hover:text-accent"
            >
              <FaFacebook />
            </Link>

            <Link
              href="https://x.com/"
              aria-label="X"
              className="transition-transform duration-300 hover:scale-110 hover:text-accent"
            >
              <FaSquareXTwitter />
            </Link>

            <Link
              href="https://www.instagram.com/"
              aria-label="Instagram"
              className="transition-transform duration-300 hover:scale-110 hover:text-accent"
            >
              <FaSquareInstagram />
            </Link>

            <Link
              href="https://www.linkedin.com/"
              aria-label="LinkedIn"
              className="transition-transform duration-300 hover:scale-110 hover:text-accent"
            >
              <FaLinkedin />
            </Link>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-8">
        <p className="py-4 text-center text-xs text-muted sm:text-sm">
          &copy; 2026 DocTime. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
