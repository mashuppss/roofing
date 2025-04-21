# RoofReplacementsLLC Website

## Overview
This project is a modern, high-quality website for RoofReplacementsLLC, a roofing company. The website is built using Next.js with TypeScript, and it features a sleek, professional design inspired by the aesthetics of Apple and Tesla.

## Project Structure
The project is organized as follows:

```
roof-replacements-llc
├── app
│   ├── components
│   │   ├── AboutUs.tsx
│   │   ├── ContactForm.tsx
│   │   ├── Footer.tsx
│   │   ├── Header.tsx
│   │   ├── HeroSection.tsx
│   │   ├── Portfolio.tsx
│   │   ├── Services.tsx
│   │   └── Testimonials.tsx
│   ├── styles
│   │   └── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── public
├── package.json
├── next.config.js
├── tsconfig.json
└── README.md
```

## Features
- **Responsive Design**: The website is designed to be mobile-first and responsive across all devices.
- **Smooth Animations**: Implemented using GSAP for a modern user experience.
- **Dark/Light Mode Toggle**: Users can switch between dark and light themes, with preferences saved in local storage.
- **Contact Form**: A minimalist form with real-time validation, integrated with a backend API for submissions.
- **Portfolio Gallery**: A grid-based gallery showcasing completed roofing projects with hover effects.
- **Testimonials Carousel**: A modern layout for customer reviews with subtle animations.

## Setup Instructions
1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd roof-replacements-llc
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Run the Development Server**:
   ```bash
   npm run dev
   ```

4. **Open in Browser**:
   Navigate to `http://localhost:3000` to view the website.

## Deployment
The application can be deployed to GitHub Pages or any other hosting service that supports Next.js applications. Follow the respective deployment instructions for your chosen platform.

## Contributing
Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for details.