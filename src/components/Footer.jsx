import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className=" sticky bg-gray-900 text-gray-300 py-12">
      <div className="max-w-6xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h2 className="text-2xl font-semibold text-white mb-4">
            Swiftshopify
          </h2>
          <p className="text-sm">
            Welcome to Swiftshopify, your one-stop destination for top-quality
            products. Discover the best deals and trends all year round.
          </p>
          <div className="flex space-x-4 mt-4">
            <a
              href="https://facebook.com"
              aria-label="Facebook"
              className="text-gray-400 hover:text-white"
            >
              <FaFacebook size={20} />
            </a>
            <a
              href="https://twitter.com"
              aria-label="Twitter"
              className="text-gray-400 hover:text-white"
            >
              <FaTwitter size={20} />
            </a>
            <a
              href="https://instagram.com"
              aria-label="Instagram"
              className="text-gray-400 hover:text-white"
            >
              <FaInstagram size={20} />
            </a>
            <a
              href="https://linkedin.com"
              aria-label="LinkedIn"
              className="text-gray-400 hover:text-white"
            >
              <FaLinkedin size={20} />
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <a href="#shop" className="hover:text-white">
                Shop
              </a>
            </li>
            <li>
              <a href="#about" className="hover:text-white">
                About Us
              </a>
            </li>
            <li>
              <a href="#faq" className="hover:text-white">
                FAQs
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:text-white">
                Contact
              </a>
            </li>
            <li>
              <a href="#terms" className="hover:text-white">
                Terms & Conditions
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-white mb-4">
            Stay Connected
          </h3>
          <p className="text-sm mb-4">
            Subscribe to our newsletter for the latest updates and exclusive
            deals.
          </p>
          <form className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 rounded-l-md border-none focus:ring-2 focus:ring-orange-500"
            />
            <button className="bg-orange-500 text-white px-4 py-2 rounded-r-md hover:bg-orange-600">
              Subscribe
            </button>
          </form>
        </div>
      </div>
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm text-gray-500">
        @ {new Date().getFullYear()} Swiftshopify. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
