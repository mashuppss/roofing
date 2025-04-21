'use client'; // Needed for client-side rendering and hooks
import React from 'react';
import Link from 'next/link';
import Image from 'next/image'; // Import Image component
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';

// Suggestion: Move socialLinks to a shared constants file
const socialLinks = [
  { label: 'Facebook', icon: <FaFacebookF />, url: '#' },
  { label: 'Twitter', icon: <FaTwitter />, url: '#' },
  { label: 'LinkedIn', icon: <FaLinkedinIn />, url: '#' },
  { label: 'Instagram', icon: <FaInstagram />, url: '#' },
];

export default function Footer() {
  return (
    <footer className="bg-navy text-gray-200 dark:text-gray-300 py-24 mt-16 border-t border-border-dark/50">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 text-center md:text-left">
        {/* Column 1: About/Logo */}
        <div>
          <Link href="/" className="relative inline-block h-10 w-40 mb-4 bg-primary-light dark:bg-primary-dark p-1 rounded-md">
            <Image
              src="/assets/logo.png"
              alt="RoofReplacementsLLC Logo"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-contain"
            />
          </Link>
          <p className="text-sm text-gray-300 dark:text-gray-400">Providing premium roofing solutions with quality and integrity.</p>
          <div className="flex justify-center md:justify-start space-x-4 mt-6">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className="text-gray-400 hover:text-primary-light dark:hover:text-primary-dark transition-colors text-xl"
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h4 className="text-lg font-semibold mb-4 text-white">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="#services" className="text-gray-300 dark:text-gray-400 hover:text-primary-light dark:hover:text-primary-dark transition-colors">Services</Link></li>
            <li><Link href="#portfolio" className="text-gray-300 dark:text-gray-400 hover:text-primary-light dark:hover:text-primary-dark transition-colors">Portfolio</Link></li>
            <li><Link href="#about" className="text-gray-300 dark:text-gray-400 hover:text-primary-light dark:hover:text-primary-dark transition-colors">About Us</Link></li>
            <li><Link href="#contact" className="text-gray-300 dark:text-gray-400 hover:text-primary-light dark:hover:text-primary-dark transition-colors">Contact</Link></li>
          </ul>
        </div>

        {/* Column 3: Newsletter Signup */}
        <div>
          <h4 className="text-lg font-semibold mb-4 text-white">Stay Updated</h4>
          <p className="text-sm mb-4 text-gray-300 dark:text-gray-400">Sign up for occasional news and special offers.</p>
          <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-grow p-2 rounded-md border border-border-dark/50 bg-gray-800/50 text-white placeholder-gray-400 focus:outline-none focus:border-primary-dark focus:ring-1 focus:ring-primary-dark text-sm"
              required
              aria-label="Email for newsletter"
            />
            <button
              type="submit"
              className="bg-primary-dark text-white font-semibold py-2 px-4 rounded-md hover:opacity-90 transition-opacity text-sm"
            >
              Subscribe
            </button>
          </form>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2"> (UI only - no backend integration)</p>
        </div>
      </div>
      <div className="text-center text-sm mt-12 pt-8 border-t border-border-dark/50 text-gray-400 dark:text-gray-500">
        © {new Date().getFullYear()} RoofReplacementsLLC. All Rights Reserved.
      </div>
    </footer>
  );
}