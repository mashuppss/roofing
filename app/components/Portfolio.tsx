'use client'; // Required for state and effects

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import PortfolioModal from './PortfolioModal'; // Import the modal component
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import nextConfig from '../../next.config.mjs'; // Import the config
// Import useTranslations if you plan to translate titles/descriptions later
// import { useTranslations } from 'next-intl';

gsap.registerPlugin(ScrollTrigger);

// Get basePath from config, default to empty string if not set
const basePath = nextConfig.basePath || '';

// Define the type for the project data
interface PortfolioItem {
  id: number;
  title: string;
  category: string;
  imageUrl: string; // Now holds the direct path to the image
  description?: string;
  details?: string[];
}

// Updated portfolio items with actual image paths
const portfolioItems: PortfolioItem[] = [
  { id: 1, title: 'Modern Residence Roof', category: 'Replacement', imageUrl: `${basePath}/assets/roofing/1.jpg`, description: 'Complete asphalt shingle roof replacement...', details: ['GAF Timberline HDZ Shingles', 'Synthetic Underlayment', 'Improved Ventilation System'] },
  { id: 2, title: 'Commercial Flat Roof', category: 'Repair', imageUrl: `${basePath}/assets/roofing/2.jpg`, description: 'Leak detection and repair...', details: ['TPO Membrane Patching', 'Seam Inspection and Repair', 'Drainage Cleaning'] },
  { id: 3, title: 'Suburban Home Inspection', category: 'Inspection', imageUrl: `${basePath}/assets/roofing/3.jpg`, description: 'Detailed pre-sale roof inspection...', details: ['Drone Inspection Utilized', 'Comprehensive Report Provided', 'Minor Sealant Repairs Recommended'] },
  { id: 4, title: 'Luxury Villa Tile Roof', category: 'Replacement', imageUrl: `${basePath}/assets/roofing/4.jpg`, description: 'Installation of premium clay tile roofing...', details: ['Spanish Clay Tiles', 'Copper Flashing Details', 'Enhanced Water Shielding'] },
  { id: 5, title: 'Historic Property Slate Repair', category: 'Repair', imageUrl: `${basePath}/assets/roofing/5.jpg`, description: 'Careful repair and replacement...', details: ['Salvaged Slate Matching', 'Traditional Copper Work', 'Structural Assessment'] },
  { id: 6, title: 'New Construction Shingles', category: 'Installation', imageUrl: `${basePath}/assets/roofing/6.jpg`, description: 'Efficient installation of architectural shingles...', details: ['Owens Corning Duration Shingles', 'Ice & Water Shield Application', 'Ridge Vent Installation'] },
/*  { id: 7, title: 'Leak Fix and Patching', category: 'Repair', imageUrl: `${basePath}/assets/roofing/7.jpg`, description: 'Located and repaired persistent roof leak.' },
  { id: 8, title: 'Luxury Estate Roofing', category: 'Replacement', imageUrl: `${basePath}/assets/roofing/8.jpg`, description: 'High-end roofing materials for a luxury property.' },*/
];

export default function Portfolio() {
  // const t = useTranslations('Portfolio'); // Initialize if translating
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [isMounted, setIsMounted] = useState(false); // Add isMounted state
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const textRef = useRef(null);
  const gridRef = useRef(null); // Ref for the grid container

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    // Ensure component is mounted and refs are available before running GSAP
    if (!isMounted || !titleRef.current || !textRef.current || !gridRef.current) return;

    const portfolioItemsElements = gsap.utils.toArray('.portfolio-item');
    if (portfolioItemsElements.length === 0) return;

    const ctx = gsap.context(() => {
      // Animate Title and Text TO visible state
      gsap.to([titleRef.current, textRef.current], {
        autoAlpha: 1, // Target state
        y: 0,         // Target state
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none none' },
      });

      // Staggered animation for portfolio items TO visible state
      gsap.to(portfolioItemsElements, {
        autoAlpha: 1, // Target state
        y: 0,         // Target state
        duration: 0.6,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: { trigger: gridRef.current, start: 'top 80%', toggleActions: 'play none none none' },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isMounted]); // Add isMounted to dependency array

  const openModal = (item: PortfolioItem) => setSelectedItem(item);
  const closeModal = () => setSelectedItem(null);

  return (
    <>
      {/* Section remains relative */}
      <section id="portfolio" ref={sectionRef} className="relative py-16 md:py-24 bg-card-light dark:bg-card-dark overflow-hidden">
        {/* Background GIF Container */}
        <div className="absolute inset-0">
          {/* ... Image and Overlay ... */}
          <Image
            src={`${basePath}/assets/homepage05.gif`} // Use basePath variable
            // alt={t('backgroundAlt')} // Use translated alt text
            alt="Portfolio background" // Placeholder alt text
            fill
            className="object-cover opacity-50 dark:opacity-30"
            unoptimized
          />
          <div className="absolute inset-0 bg-card-light/70 dark:bg-card-dark/80"></div>
        </div>

        {/* Content Container - Added z-10 */}
        <div className="container mx-auto px-4 relative z-10"> {/* Added z-10 */}
          {/* Add invisible class for initial state */}
          <h2 ref={titleRef} className="text-3xl md:text-4xl font-bold text-center mb-4 text-text-light dark:text-text-dark invisible translate-y-[50px]">
            {/* {t('title')} */} {/* Use translated title */}
            Featured Projects {/* Placeholder title */}
          </h2>
          {/* Add invisible class for initial state */}
          <p ref={textRef} className="text-center text-lg text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto invisible translate-y-[50px]">
            {/* {t('subtitle')} */} {/* Use translated subtitle */}
            Explore examples of our high-quality craftsmanship and attention to detail. {/* Placeholder subtitle */}
          </p>
          <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {portfolioItems.map((item) => (
              <div
                key={item.id}
                className="portfolio-item group relative overflow-hidden rounded-lg shadow-lg cursor-pointer aspect-[3/2] invisible translate-y-[50px]"
                onClick={() => openModal(item)}
              >
                 <Image
                  src={item.imageUrl} // Use the direct image path
                  alt={item.title} // Use item title for alt text (consider translating)
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transform transition duration-500 ease-in-out group-hover:scale-110"
                />
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent group-hover:from-black/80 group-hover:via-black/50 transition duration-300 ease-in-out flex flex-col justify-end p-4 md:p-6">
                  <h3 className="text-white text-lg md:text-xl font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-4 group-hover:translate-y-0">
                    {item.title} {/* Consider translating */}
                  </h3>
                  <p className="text-gray-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 translate-y-4 group-hover:translate-y-0">
                    {item.category} {/* Consider translating */}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pass translated close text if needed */}
      {/* <PortfolioModal item={selectedItem} onClose={closeModal} closeText={t('modalClose')} /> */}
      <PortfolioModal item={selectedItem} onClose={closeModal} /> {/* Placeholder */}
    </>
  );
}