'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap'; // Import GSAP

export default function HeroSection() {
  const heroRef = useRef(null);
  const headlineRef = useRef(null);
  const subheadlineRef = useRef(null); // Ref for the paragraph
  const ctaRef = useRef(null);

  // GSAP animation on component mount
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Ensure refs are current before animating
    if (headlineRef.current && subheadlineRef.current && ctaRef.current) {
      tl.fromTo(headlineRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, delay: 0.3 } // Add slight delay
      )
      .fromTo(subheadlineRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8 },
        "-=0.6" // Start slightly after headline starts
      )
      .fromTo(ctaRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.6 },
        "-=0.5" // Start slightly after subheadline starts
      );
    }
    // Cleanup function (optional, but good practice if needed)
    // return () => {
    //   tl.kill(); // Kill the timeline instance on unmount
    // };
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center text-center text-white overflow-hidden"
    >
      {/* Background Container */}
      <div className="absolute inset-0 bg-gray-900"> {/* Fallback background */}
         <img
           src="/assets/homepage01.gif"
           alt="Roofing work background"
           className="absolute inset-0 w-full h-full object-cover opacity-40" // Adjust opacity if needed
         />
         <div className="absolute inset-0 bg-white/50"></div> {/* Overlay for contrast */}
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 p-4"> {/* Ensure this is relative z-10 */}
        <h1
          ref={headlineRef}
          className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight opacity-0"
          style={{ textShadow: '2px 2px 8px rgba(0, 0, 0, 0.7)' }}
        >
          Transform Your Home with RoofReplacementsLLC
        </h1>
        <p
          ref={subheadlineRef}
          className="text-lg md:text-xl mb-8 max-w-2xl mx-auto opacity-0"
          style={{ textShadow: '1px 1px 4px rgba(0, 0, 0, 0.7)' }}
        >
          Experience the pinnacle of roofing quality and service. Protect your investment with a roof built to last.
        </p>
        <div ref={ctaRef} className="opacity-0">
            <Link
            href="#contact"
            className="inline-block bg-primary-light dark:bg-primary-dark text-white text-lg font-semibold py-3 px-8 rounded-lg shadow-lg hover:opacity-90 transition-all duration-300 transform hover:scale-105"
            >
            Get a Free Quote
            </Link>
        </div>
      </div>
    </section>
  );
}