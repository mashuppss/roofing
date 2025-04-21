'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaAward, FaShieldAlt, FaClock, FaGem } from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

const whyChooseUsData = [
  {
    icon: <FaAward className="w-10 h-10 mb-4 text-primary-light dark:text-primary-dark" />,
    title: '25+ Years Experience',
    description: 'Decades of industry expertise and thousands of successful projects completed.',
  },
  {
    icon: <FaShieldAlt className="w-10 h-10 mb-4 text-primary-light dark:text-primary-dark" />,
    title: 'Licensed & Insured',
    description: 'Fully licensed, bonded, and insured for your complete protection and peace of mind.',
  },
  {
    icon: <FaClock className="w-10 h-10 mb-4 text-primary-light dark:text-primary-dark" />,
    title: 'On-Time Completion',
    description: 'We respect your time with efficient project management and timely completion.',
  },
  {
    icon: <FaGem className="w-10 h-10 mb-4 text-primary-light dark:text-primary-dark" />,
    title: 'Premium Materials',
    description: 'We use only top-quality materials from trusted manufacturers with excellent warranties.',
  },
];

export default function WhyChooseUs() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!titleRef.current || itemsRef.current.length === 0) return;

    const ctx = gsap.context(() => {
      // Animate Title
      gsap.to(titleRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });

      // Staggered animation for items (cards)
      gsap.to(itemsRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none none',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="why-choose-us" ref={sectionRef} className="py-16 md:py-24 bg-background-light dark:bg-background-dark overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 ref={titleRef} className="text-3xl md:text-4xl font-bold text-center mb-12 text-text-light dark:text-text-dark invisible translate-y-[50px]">
          Why Choose RoofReplacementsLLC?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {whyChooseUsData.map((item, index) => (
            <div
              key={index}
              ref={el => { itemsRef.current[index] = el; }}
              className="bg-card-light dark:bg-card-dark p-10 rounded-xl shadow-lg border border-border-light dark:border-border-dark
                         flex flex-col items-center text-center
                         invisible translate-y-[50px]"
            >
              {item.icon}
              <h3 className="text-xl font-semibold mb-2 text-text-light dark:text-text-dark">{item.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}