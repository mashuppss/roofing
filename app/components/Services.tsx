'use client'; // Required for useEffect, useRef

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger'; // Import ScrollTrigger
import { FaHouseChimneyWindow, FaScrewdriverWrench, FaMagnifyingGlassChart } from "react-icons/fa6"; // Import icons from react-icons

// Register ScrollTrigger plugin (do this once in your app)
gsap.registerPlugin(ScrollTrigger);

const servicesData = [
  // Keep icon size w-20 h-20
  { icon: <FaHouseChimneyWindow className="w-20 h-20 text-primary-light dark:text-primary-dark" />, title: 'Roof Replacement', description: 'Complete tear-off and replacement using high-quality materials and expert installation for a durable, long-lasting roof that enhances your home\'s value and protection.' },
  { icon: <FaScrewdriverWrench className="w-20 h-20 text-primary-light dark:text-primary-dark" />, title: 'Roof Repairs', description: 'Fast, reliable repairs for leaks, storm damage, missing shingles, and general wear to extend your roof\'s lifespan and prevent further issues.' },
  { icon: <FaMagnifyingGlassChart className="w-20 h-20 text-primary-light dark:text-primary-dark" />, title: 'Roof Inspections', description: 'Comprehensive visual and structural inspections to assess roof condition, identify potential problems early, and provide detailed reports for maintenance or real estate purposes.' },
];

export default function Services() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const textRef = useRef(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]); // Ref for the cards array

  useEffect(() => {
    // Ensure refs are current before animating
    if (!titleRef.current || !textRef.current || cardsRef.current.length === 0) return;

    const ctx = gsap.context(() => {
      // Animate Title and Text TO visible state
      gsap.to([titleRef.current, textRef.current], {
        autoAlpha: 1, // Target state
        y: 0,         // Target state
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none', // Play once on enter
        },
      });

      // Staggered animation for cards TO visible state
      gsap.to(cardsRef.current, {
        autoAlpha: 1, // Target state
        y: 0,         // Target state
        duration: 0.6,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none none', // Play once on enter
        },
      });
    }, sectionRef); // Scope the context to the section

    return () => ctx.revert(); // Cleanup animations on unmount
  }, []); // Dependency array is empty, runs once on mount

  return (
    // Section background is bg-card-light/dark
    <section id="services" ref={sectionRef} className="py-16 md:py-24 bg-card-light dark:bg-card-dark overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Add invisible class for initial state */}
        <h2 ref={titleRef} className="text-3xl md:text-4xl font-bold text-center mb-4 text-text-light dark:text-text-dark invisible translate-y-[50px]">
          Our Services
        </h2>
        {/* Add invisible class for initial state */}
        <p ref={textRef} className="text-center text-lg text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto invisible translate-y-[50px]">
          We offer comprehensive roofing solutions tailored to your needs, ensuring quality and durability.
        </p>
        {/* Grid container - adjust gap/columns if needed */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {servicesData.map((service, index) => (
            <div
              key={index}
              ref={el => { cardsRef.current[index] = el; }} // Assign ref to each card
              // Removed fixed w/h. Added w-full, max-w-lg, min-h-96
              className="w-full max-w-lg min-h-96 bg-background-light dark:bg-background-dark p-0 rounded-xl shadow-lg border border-border-light dark:border-border-dark
                         transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-xl
                         flex flex-col items-center text-center overflow-hidden
                         invisible translate-y-[50px]" // Initial state for GSAP
            >
              {/* Icon Container */}
              <div className="w-full h-40 bg-gradient-to-br from-primary-light/20 to-primary-dark/20 dark:from-primary-light/10 dark:to-primary-dark/10 flex items-center justify-center mb-6">
                {service.icon}
              </div>
              {/* Content Container */}
              <div className="px-6 pb-8 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold mb-3 text-text-light dark:text-text-dark">{service.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-base flex-grow">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}