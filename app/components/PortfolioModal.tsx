'use client';

import React from 'react';
import Image from 'next/image';
import { FaTimes } from 'react-icons/fa';

// Define the type for the project data
interface PortfolioItem {
  id: number;
  title: string;
  category: string;
  imageUrl: string; // Base URL
  description?: string; // Add more details if needed
  details?: string[];
}

interface PortfolioModalProps {
  item: PortfolioItem | null;
  onClose: () => void;
}

export default function PortfolioModal({ item, onClose }: PortfolioModalProps) {
  if (!item) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4 transition-opacity duration-300">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden max-w-3xl w-full relative transform scale-95 group-hover:scale-100 transition-transform duration-300">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 transition-colors z-10"
          aria-label="Close modal"
        >
          <FaTimes className="w-6 h-6" />
        </button>
        <div className="md:flex">
          <div className="md:w-1/2 relative aspect-video md:aspect-auto">
            <Image
              src={item.imageUrl}
              alt={item.title}
              fill
              className="object-cover"
              unoptimized
            />
          </div>
          <div className="md:w-1/2 p-6 md:p-8 overflow-y-auto max-h-[80vh]">
            <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">{item.title}</h2>
            <p className="text-sm text-primary-light dark:text-primary-dark mb-4">{item.category}</p>
            {item.description && (
              <p className="text-gray-700 dark:text-gray-300 mb-4">{item.description}</p>
            )}
            {item.details && item.details.length > 0 && (
              <div>
                <h4 className="font-semibold mb-2 text-gray-800 dark:text-gray-200">Details:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 dark:text-gray-400">
                  {item.details.map((detail, index) => (
                    <li key={index}>{detail}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}