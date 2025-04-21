'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import nextConfig from '../../next.config.mjs'; // Import the config

gsap.registerPlugin(ScrollTrigger);

// Get basePath from config, default to empty string if not set
const basePath = nextConfig.basePath || '';

// List of certification logos based on the directory listing
const certificationLogos = [
  '/assets/certifications/791-7916366_master-shingle-applicator-certainteed-logo-master-shingle-applicator.png',
  '/assets/certifications/Atlas-768x469.png',
  '/assets/certifications/FRSA-blue-website-member-300dpi-1-768x768.jpg',
  '/assets/certifications/NEW.png',
  '/assets/certifications/TRI-logo-removebg-preview.png',
  '/assets/certifications/br-logo-w-roof-tile-components-print-1-e1574450520947.jpg',
  '/assets/certifications/eagle-roofing-logo.png',
  '/assets/certifications/gaf-logo.png',
  '/assets/certifications/tamko-logo-768x576.png',
].map(path => `${basePath}${path}`); // Prepend basePath to each path

export default function GlobalRelationships() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const logosRef = useRef(null);

  useEffect(() => {
    if (!contentRef.current || !logosRef.current) return;

    const logoElements = gsap.utils.toArray('.certification-logo');

    const ctx = gsap.context(() => {
      // Animate content TO visible state
      gsap.to(contentRef.current, {
        autoAlpha: 1,
        x: 0, // Animate from left
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none none' },
      });

      // Animate logos TO visible state (staggered)
      gsap.to(logoElements, {
        autoAlpha: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: logosRef.current, start: 'top 85%', toggleActions: 'play none none none' },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    // Using background-light/dark for contrast
    <section id="global-relationships" ref={sectionRef} className="py-16 md:py-24 bg-background-light dark:bg-background-dark overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column: Text Content */}
          <div ref={contentRef} className="invisible translate-x-[-50px]"> {/* Initial state for animation */}
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-text-light dark:text-text-dark">
              Global Relationships
            </h2>
            <h3 className="text-xl font-semibold text-primary-light dark:text-primary-dark mb-6">
              Company Partners
            </h3>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <p>
                We provide removal, installation and thorough clean-up after each project.
              </p>
              <p>
                We promise to guide you every step of your project. A roofing system is a compilation of many parts and materials. Our expert team of professionals will provide you with peace of mind from selecting your roofing materials – from shingles, tiles and beyond.
              </p>
            </div>
          </div>

          {/* Right Column: Logos */}
          <div ref={logosRef}>
            <div className="grid grid-cols-3 gap-6 md:gap-8 items-center">
              {certificationLogos.map((logoSrc, index) => (
                <div
                  key={index}
                  className="certification-logo relative aspect-video bg-white dark:bg-gray-100 p-2 rounded-md shadow-sm flex items-center justify-center invisible translate-y-[30px]" // Added bg for contrast, initial animation state
                >
                  <Image
                    src={logoSrc} // Use the modified path from the array
                    alt={`Certification Logo ${index + 1}`}
                    fill
                    sizes="(max-width: 768px) 30vw, 15vw"
                    className="object-contain" // Use contain to show the whole logo
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}