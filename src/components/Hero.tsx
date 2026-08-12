import React, { useState, useEffect } from "react";
import { SchoolConfig } from "../types";
import LucideIcon from "./LucideIcon";
import { motion, AnimatePresence } from "motion/react";

interface HeroProps {
  config: SchoolConfig;
  onCtaClick: (sectionId: string) => void;
}

export default function Hero({ config, onCtaClick }: HeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedPathwayTab, setSelectedPathwayTab] = useState<string>("mpc");

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % config.heroSlides.length);
    }, 6500);
    return () => clearInterval(timer);
  }, [config.heroSlides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % config.heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + config.heroSlides.length) % config.heroSlides.length);
  };

  const pathwayHighlights: Record<string, { title: string; subtitle: string; icon: string; badge: string }> = {
    mpc: {
      title: "MPC Science Combination",
      subtitle: "Math, Physics & Computer Science with Modern Computer Labs",
      icon: "Cpu",
      badge: "NESA & REB Accredited"
    },
    hgl: {
      title: "HGL Humanities Pathway",
      subtitle: "History, Geography & Language for Future Civic Leaders",
      icon: "BookOpen",
      badge: "A'Level Humanities"
    },
    olevel: {
      title: "Ordinary Level (S1 - S3)",
      subtitle: "Foundational Rwandan Lower Secondary Curriculum",
      icon: "GraduationCap",
      badge: "General Secondary"
    },
    sports: {
      title: "G.S Gacuba II A Athletics",
      subtitle: "Championship Basketball, Football & Athletics Academy",
      icon: "Trophy",
      badge: "Rubavu District Stars"
    }
  };

  return (
    <section 
      id="home" 
      className="relative min-h-[580px] sm:min-h-[640px] lg:min-h-[700px] bg-gradient-to-br from-[#271108] via-[#451e10] to-[#1a0a04] overflow-hidden text-white flex items-center"
      h-id="innovative-hero-section"
    >
      {/* Background Animated Image Canvas with Ambient Gradients */}
      <AnimatePresence mode="wait">
        {config.heroSlides.map((slide, index) => {
          if (index !== currentSlide) return null;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 1.08 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              className="absolute inset-0"
            >
              <img
                src={slide.image}
                alt={slide.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center opacity-30 filter brightness-90"
              />
              {/* Distinctive Warm Brown & Orange mesh gradient overlays */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#271108] via-[#271108]/90 to-[#451e10]/50" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#271108] via-transparent to-[#271108]/70" />
            </motion.div>
          );
        })}
      </AnimatePresence>

      {/* Decorative Glowing Mesh Orbs */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-[#ea580c]/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#ea580c]/15 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Content Container */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 w-full py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Dynamic Hero Messaging */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Top Category Tag Badge */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`tag-${currentSlide}`}
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-widest bg-[#ea580c] text-white shadow-md border border-white/20 backdrop-blur-md"
              >
                <LucideIcon name="ShieldCheck" size={13} className="text-white" />
                <span>{config.heroSlides[currentSlide].tag}</span>
              </motion.div>
            </AnimatePresence>

            {/* Slide Main Heading */}
            <AnimatePresence mode="wait">
              <motion.h1
                key={`title-${currentSlide}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="font-sans font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.12] text-white"
              >
                {config.heroSlides[currentSlide].title}
              </motion.h1>
            </AnimatePresence>

            {/* Slide Narrative Description */}
            <AnimatePresence mode="wait">
              <motion.p
                key={`desc-${currentSlide}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.45, delay: 0.1, ease: "easeOut" }}
                className="text-amber-100/90 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl font-light"
              >
                {config.heroSlides[currentSlide].description}
              </motion.p>
            </AnimatePresence>

            {/* Action Buttons Row */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <button
                onClick={() => onCtaClick("academics")}
                className="px-6 py-3.5 rounded-xl font-extrabold text-xs sm:text-sm shadow-lg transition-all active:scale-95 cursor-pointer bg-[#ea580c] hover:bg-[#c2410c] text-white flex items-center space-x-2"
              >
                <span>Explore Academic Pathways</span>
                <LucideIcon name="ArrowRight" size={15} />
              </button>

              <button
                onClick={() => onCtaClick("contact")}
                className="px-6 py-3.5 rounded-xl font-bold text-xs sm:text-sm bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-md transition-all active:scale-95 cursor-pointer flex items-center space-x-2"
              >
                <LucideIcon name="CreditCard" size={15} className="text-amber-300" />
                <span>Admissions & Fee Structure</span>
              </button>
            </div>

            {/* Quick Metrics Bar at Bottom of Left Column */}
            <div className="pt-6 grid grid-cols-3 gap-4 border-t border-white/10 text-xs">
              <div>
                <div className="font-extrabold text-white text-base sm:text-lg">Gisenyi Sector</div>
                <div className="text-amber-100/70 text-[11px] font-light">Rubavu District, Rwanda</div>
              </div>
              <div className="border-l border-white/10 pl-4">
                <div className="font-extrabold text-amber-400 text-base sm:text-lg">Government-Aided</div>
                <div className="text-amber-100/70 text-[11px] font-light">REB & NESA Authorized</div>
              </div>
              <div className="border-l border-white/10 pl-4">
                <div className="font-extrabold text-[#ea580c] text-base sm:text-lg">TTC Gacuba II</div>
                <div className="text-amber-100/70 text-[11px] font-light">Campus Neighbor</div>
              </div>
            </div>

          </div>

          {/* Right Column: Prominent Basketball Athlete Feature & Interactive Pathway Matrix */}
          <div className="lg:col-span-5 relative">
            <div className="bg-slate-900/85 backdrop-blur-xl border border-white/20 rounded-3xl p-5 sm:p-6 shadow-2xl space-y-5 relative overflow-hidden">
              
              {/* BIG Athlete Feature Badge & Image Box */}
              <div className="relative rounded-2xl overflow-hidden bg-gradient-to-t from-slate-950 via-slate-900 to-emerald-950 border border-white/15 group">
                <img 
                  src="/assets/hero_athlete.jpg" 
                  alt="GS Gacuba II A Star Student Athlete" 
                  className="w-full h-56 sm:h-64 object-cover object-top filter brightness-105 contrast-105 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                
                <div className="absolute top-3 left-3 bg-amber-500 text-slate-950 text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-full shadow-md flex items-center space-x-1">
                  <LucideIcon name="Trophy" size={12} />
                  <span>GS Gacuba II A #24 Athlete</span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 text-left space-y-0.5">
                  <span className="text-[10px] text-amber-300 font-bold uppercase tracking-wider">Basketball & Athletics Pride</span>
                  <h4 className="text-sm sm:text-base font-extrabold text-white leading-tight">
                    Home of Rubavu District Sports Champions
                  </h4>
                  <p className="text-[11px] text-slate-300 font-light line-clamp-1">
                    Combining academic focus in MPC & HGL with competitive athletic leadership.
                  </p>
                </div>
              </div>

              {/* Header inside Card */}
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center space-x-2.5">
                  <div className="w-7 h-7 rounded-lg bg-emerald-600/30 border border-emerald-400/30 flex items-center justify-center text-emerald-300">
                    <LucideIcon name="GraduationCap" size={16} />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-xs sm:text-sm text-white tracking-tight">G.S Gacuba II A Streams</h3>
                    <p className="text-[10px] text-blue-200/70 font-light">Select pathway to inspect</p>
                  </div>
                </div>
                <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  REB Authorized
                </span>
              </div>

              {/* Pathway Tabs Bar */}
              <div className="grid grid-cols-4 gap-1.5 p-1 bg-white/5 rounded-xl border border-white/10">
                {[
                  { id: "mpc", label: "MPC" },
                  { id: "hgl", label: "HGL" },
                  { id: "olevel", label: "O'Level" },
                  { id: "sports", label: "Sports" }
                ].map((tab) => {
                  const isSelected = tab.id === selectedPathwayTab;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setSelectedPathwayTab(tab.id)}
                      className={`py-1.5 text-[11px] font-extrabold rounded-lg transition-all cursor-pointer ${
                        isSelected
                          ? "bg-amber-500 text-slate-950 shadow-md"
                          : "text-blue-200/70 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              {/* Active Pathway Details Card */}
              {pathwayHighlights[selectedPathwayTab] && (
                <div className="bg-white/5 border border-white/10 p-4 rounded-2xl space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-emerald-400 font-bold text-xs">
                      <LucideIcon name={pathwayHighlights[selectedPathwayTab].icon} size={16} />
                      <span>{pathwayHighlights[selectedPathwayTab].title}</span>
                    </div>
                    <span className="text-[10px] text-blue-200/60 font-medium">
                      {pathwayHighlights[selectedPathwayTab].badge}
                    </span>
                  </div>
                  <p className="text-xs text-blue-100 font-light leading-relaxed">
                    {pathwayHighlights[selectedPathwayTab].subtitle}
                  </p>
                  <div className="pt-2 flex items-center justify-between text-[11px] text-blue-300 font-semibold">
                    <span className="flex items-center space-x-1">
                      <LucideIcon name="CheckCircle2" size={13} className="text-emerald-400" />
                      <span>Full Lab & Class Facility</span>
                    </span>
                    <button
                      onClick={() => onCtaClick("academics")}
                      className="text-emerald-400 hover:underline flex items-center space-x-1 cursor-pointer font-bold"
                    >
                      <span>Syllabus Details</span>
                      <LucideIcon name="ChevronRight" size={12} />
                    </button>
                  </div>
                </div>
              )}

              {/* Slide Switcher Preview Row */}
              <div className="pt-2 border-t border-white/10 space-y-2">
                <div className="flex items-center justify-between text-[11px] text-blue-200/70">
                  <span className="font-semibold uppercase tracking-wider text-[10px] text-emerald-400">Campus Highlights</span>
                  <span>{currentSlide + 1} / {config.heroSlides.length}</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {config.heroSlides.map((slide, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentSlide(idx)}
                      className={`relative h-14 rounded-xl overflow-hidden border transition-all cursor-pointer group ${
                        idx === currentSlide
                          ? "border-emerald-400 ring-2 ring-emerald-500/40 opacity-100"
                          : "border-white/10 opacity-60 hover:opacity-100"
                      }`}
                    >
                      <img
                        src={slide.image}
                        alt={slide.tag}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-slate-950/40 group-hover:bg-transparent transition-all" />
                      <div className="absolute bottom-1 left-1.5 right-1.5 text-[9px] font-extrabold text-white truncate drop-shadow">
                        {slide.tag}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Slide Navigation Controls */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-slate-900/60 hover:bg-slate-900 text-white/80 hover:text-white transition-all border border-white/10 cursor-pointer hidden sm:block z-20 backdrop-blur-md"
        aria-label="Previous Slide"
      >
        <LucideIcon name="ChevronLeft" size={22} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-slate-900/60 hover:bg-slate-900 text-white/80 hover:text-white transition-all border border-white/10 cursor-pointer hidden sm:block z-20 backdrop-blur-md"
        aria-label="Next Slide"
      >
        <LucideIcon name="ChevronRight" size={22} />
      </button>

      {/* Bottom Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 z-20">
        <motion.div
          key={currentSlide}
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 6.5, ease: "linear" }}
          className="h-full bg-emerald-500"
        />
      </div>
    </section>
  );
}

