'use client'; // Needed for potential client-side interactions (e.g., mobile menu)

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image'; // Import the Image component
import ThemeToggle from './ThemeToggle'; // Import the theme toggle
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa'; // Import social icons
import nextConfig from '../../next.config.mjs'; // Import the config

// Suggestion: Move socialLinks to a shared constants file (e.g., app/lib/constants.ts)
// and import it here and in Footer.tsx to avoid duplication.
const socialLinks = [
  { label: 'Facebook', icon: <FaFacebookF />, url: '#' },
  { label: 'Twitter', icon: <FaTwitter />, url: '#' },
  { label: 'LinkedIn', icon: <FaLinkedinIn />, url: '#' },
  { label: 'Instagram', icon: <FaInstagram />, url: '#' },
];

// Get basePath from config, default to empty string if not set
const basePath = nextConfig.basePath || '';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scroll effect for header background/shadow
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Basic navigation links
  const navLinks = [
    { href: '#services', label: 'Services' },
    { href: '#portfolio', label: 'Portfolio' },
    { href: '#about', label: 'About Us' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <header
      // Suggestion: Add fallback background for glassmorphism
      className={`sticky top-0 z-50 transition-all duration-300 ${ // Changed transition-shadow to transition-all
        isScrolled
          ? 'shadow-md glassmorphism bg-white/80 dark:bg-gray-900/80' // Added bg color fallback
          : 'bg-transparent'
      } text-text-light dark:text-text-dark`}
    >
      <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Increased height and width from h-10 w-40 to h-12 w-48 */}
        <Link href="/" className="relative h-12 w-48 bg-primary-light dark:bg-primary-dark p-1 rounded-md"> {/* Adjust padding/rounded as needed */}
          <Image
            src={`${basePath}/assets/logo.png`} // Use basePath variable
            alt="RoofReplacementsLLC Logo"
            fill // Use fill to make it responsive within the container
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Example sizes, adjust as needed
            className="object-contain" // Use contain to show the whole logo without cropping
            priority // Add priority if it's above the fold
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-primary-light dark:hover:text-primary-dark transition-colors"
            >
              {link.label}
            </Link>
          ))}
          {/* Add Social Icons Here */}
          <div className="flex items-center space-x-3 border-l border-gray-300 dark:border-gray-600 pl-4 ml-4">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className="text-gray-500 dark:text-gray-400 hover:text-primary-light dark:hover:text-primary-dark transition-colors text-lg" // Adjusted size/color
              >
                {link.icon}
              </a>
            ))}
          </div>
          <ThemeToggle />
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <ThemeToggle />
          <button
            onClick={toggleMobileMenu}
            className="ml-4 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-light dark:focus:ring-primary-dark"
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen} // Suggestion: Add aria-expanded
          >
            {/* Basic Hamburger Icon */}
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Panel */}
      {/* Suggestion (Optional): Add transition classes for smoother open/close */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full glassmorphism bg-white/95 dark:bg-gray-900/95 shadow-lg py-2"> {/* Added fallback bg */}
          <div className="flex flex-col items-center space-y-2 px-4 pb-3 pt-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block w-full text-center py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)} // Close menu on click
              >
                {link.label}
              </Link>
            ))}
            {/* Add Social Icons for Mobile Menu */}
            <div className="flex justify-center space-x-5 pt-4 mt-4 border-t border-gray-300 dark:border-gray-600 w-full">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="text-gray-600 dark:text-gray-300 hover:text-primary-light dark:hover:text-primary-dark transition-colors text-xl" // Adjusted size/color
                  onClick={() => setIsMobileMenuOpen(false)} // Close menu on click
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}