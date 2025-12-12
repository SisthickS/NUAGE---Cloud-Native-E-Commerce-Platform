import React, { useState, useRef } from "react";
import {
  Cloud,
  Zap,
  Cpu,
  Bell,
  Code,
  ArrowRight,
  Search as SearchIcon,
} from "lucide-react"; // Using lucide-react for modern icons

/**
 * SearchBar — expands on focus/click and uses a glassy style
 */
const SearchBar = () => {
  // `active` = clicked/focused (fully expanded). Default is false.
  // The bar is shown in a medium width by default (so "expanded at the start").
  const [active, setActive] = useState(false);
  const inputRef = useRef(null);

  return (
    <div
      className={`flex items-center rounded-full px-3 py-1 transition-all duration-300 text-white/80 bg-white/3 backdrop-blur-md ring-1 ring-white/10 shadow-sm ${
        active ? "w-96 md:w-96" : "w-56 md:w-72"
      }`}
      onClick={() => {
        setActive(true);
        // focus the input when clicked
        setTimeout(() => inputRef.current && inputRef.current.focus(), 50);
      }}
    >
      <SearchIcon className="w-4 h-4 ml-1 mr-2 text-white/70" />
      <input
        ref={inputRef}
        type="search"
        aria-label="Search"
        placeholder="Search products, docs..."
        className={`bg-transparent outline-none text-sm text-white/90 placeholder-white/60 transition-all duration-300 opacity-100 w-full`}
        onBlur={() => setActive(false)}
      />
    </div>
  );
};

const Header = () => (
  <header className="fixed top-0 left-0 right-0 z-50 p-4">
    <div className="max-w-7xl mx-auto flex items-center gap-4">
      {/* Logo */}
      <div className="text-2xl font-extrabold text-white tracking-wider flex-shrink-0">
        NUAGE
      </div>

      {/* Search (between logo and other components). It will expand on click/focus and push the right-side components away */}
      <div className="flex-1 flex items-center">
        <SearchBar />
      </div>

      {/* Right-side components (nav + CTA) */}
      <div className="hidden md:flex items-center space-x-6 p-3 rounded-full bg-white/5 backdrop-blur-md ring-1 ring-white/10 shadow-lg">
        <nav className="hidden md:flex space-x-6">
          {["Features", "Pricing", "Docs", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-white/80 hover:text-white transition duration-200 px-4 py-1 rounded-full hover:bg-white/10"
            >
              {item}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-full shadow-lg transition duration-300">
          Sign Up
        </button>
      </div>
    </div>
  </header>
);

/**
 * Hero Section (Focusing on the main glassy card)
 */
const HeroSection = () => (
  <section className="relative min-h-screen flex items-center justify-center p-4 overflow-hidden">
    {/* Background Gradient & Blob Effect */}
    <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-indigo-950"></div>
    {/* Faux Light/Aura Effect (Helps the glass pop) */}
    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/30 rounded-full mix-blend-lighten filter blur-3xl opacity-50 animate-blob"></div>
    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/30 rounded-full mix-blend-lighten filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>

    <div className="relative z-10 text-center max-w-4xl mx-auto mt-16">
      {/* The Main Glassy Element */}
      <div className="p-8 md:p-12 rounded-3xl bg-white/5 backdrop-blur-xl ring-1 ring-white/20 shadow-2xl transition duration-500 hover:ring-white/40">
        <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-cyan-300 leading-tight mb-4">
          Experience the Future, Today.
        </h1>
        <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
          AeroFlow provides seamless, cloud-native solutions with an interface
          as clean and transparent as glass.
        </p>
        <div className="flex justify-center space-x-4">
          <button className="flex items-center bg-cyan-500 hover:bg-cyan-600 text-gray-900 font-bold py-3 px-8 rounded-full text-lg shadow-xl shadow-cyan-500/30 transition duration-300 transform hover:scale-[1.02]">
            Get Started <ArrowRight className="w-5 h-5 ml-2" />
          </button>
          <button className="bg-white/10 hover:bg-white/20 text-white font-bold py-3 px-8 rounded-full text-lg ring-1 ring-white/20 transition duration-300">
            View Demo
          </button>
        </div>
      </div>
    </div>
  </section>
);

/**
 * Feature Card (Individual Glassy Element)
 */
const GlassyFeatureCard = ({ icon: Icon, title, description }) => (
  <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-lg ring-1 ring-white/10 shadow-xl hover:ring-white/30 transition duration-300">
    <Icon className="w-10 h-10 text-cyan-400 mb-4 p-1.5 rounded-lg bg-white/10" />
    <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
    <p className="text-white/70">{description}</p>
  </div>
);

/**
 * Features Section
 */
const FeaturesSection = () => (
  <section id="features" className="py-24 bg-gray-950/50 backdrop-blur-sm">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-extrabold text-white mb-4">
          Built for Speed and Clarity
        </h2>
        <p className="text-lg text-white/60">
          Transparent technology with incredible power under the hood.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <GlassyFeatureCard
          icon={Cloud}
          title="Serverless Deployment"
          description="Scale infinitely without managing infrastructure. True cloud-native architecture."
        />
        <GlassyFeatureCard
          icon={Zap}
          title="Lightning Fast APIs"
          description="Our GraphQL endpoints deliver data with minimal latency for blazing-fast apps."
        />
        <GlassyFeatureCard
          icon={Cpu}
          title="AI-Powered Analytics"
          description="Get real-time, deep insights into your data with our proprietary AI engine."
        />
      </div>
    </div>
  </section>
);

/**
 * Footer
 */
const Footer = () => (
  <footer className="bg-gray-950/70 backdrop-blur-md text-white/50 py-8 border-t border-white/10">
    <div className="max-w-7xl mx-auto px-4 text-center">
      <p className="mb-4">
        © {new Date().getFullYear()} AeroFlow. All rights reserved.
      </p>
      <div className="space-x-4 text-sm">
        <a href="#" className="hover:text-white transition">
          Privacy
        </a>
        <a href="#" className="hover:text-white transition">
          Terms
        </a>
        <a href="#" className="hover:text-white transition">
          Status
        </a>
      </div>
    </div>
  </footer>
);

/**
 * Main App Component
 */
function App() {
  return (
    // Set min-height and use a slightly different gradient on the body for depth
    <div className="min-h-screen bg-gray-950 antialiased">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
