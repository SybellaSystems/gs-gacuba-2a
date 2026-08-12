import React, { useState } from "react";
import { SchoolConfig } from "../types";
import LucideIcon from "./LucideIcon";
import { motion, AnimatePresence } from "motion/react";

interface NavbarProps {
  config: SchoolConfig;
  onNavigate: (sectionId: string) => void;
  activeSection: string;
}

export default function Navbar({ config, onNavigate, activeSection }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const homeItem = { id: "home", label: "Home" };

  const navGroups = [
    {
      label: "About",
      isDropdown: true,
      items: [
        { id: "about", label: "About Us" },
        { id: "academics", label: "Academics" }
      ]
    },
    {
      label: "Campus",
      isDropdown: true,
      items: [
        { id: "sports-academy", label: "Sports & Athletics" },
        { id: "campus", label: "Campus Life" },
        { id: "outcomes", label: "Outcomes" }
      ]
    },
    {
      label: "Explore",
      isDropdown: false,
      items: [
        { id: "gallery", label: "Gallery" },
        { id: "news", label: "News" }
      ]
    }
  ];

  const menuItems = [homeItem, ...navGroups.flatMap((group) => group.items)];

  const handleMenuClick = (sectionId: string) => {
    onNavigate(sectionId);
    setIsMobileMenuOpen(false);
  };

  return (
    <header 
      className="sticky top-0 z-40 bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100 transition-all duration-300"
      id="school-navbar"
    >
      <div className="max-w-[1400px] mx-auto px-2 sm:px-4 lg:px-5">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-3 sm:gap-4 py-3 sm:py-4">
          
          {/* School Brand Identity (Logo + Name) */}
          <div 
            className="flex items-center space-x-2.5 cursor-pointer shrink-0" 
            onClick={() => onNavigate("home")}
          >
            {config.logoUrl ? (
              <img 
                src={config.logoUrl} 
                alt={`${config.name} Logo`} 
                referrerPolicy="no-referrer"
                className="h-10 sm:h-11 w-10 sm:w-11 object-contain filter drop-shadow-sm transition-transform duration-300 hover:scale-105 shrink-0"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = "none";
                }}
              />
            ) : null}

            {(!config.logoUrl) && (
              <div 
                className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm tracking-widest shadow-sm border border-white/20 shrink-0"
                style={{ backgroundColor: config.primaryColor }}
              >
                <LucideIcon name="School" size={18} />
              </div>
            )}

            <div className="shrink-0">
              <div className="font-sans font-extrabold text-gray-900 text-xs sm:text-sm md:text-base leading-tight tracking-tight uppercase whitespace-nowrap">
                {config.name}
              </div>
              <div 
                className="text-[9px] sm:text-[10px] font-bold tracking-wide uppercase transition-colors whitespace-nowrap"
                style={{ color: config.secondaryColor }}
              >
                {config.district} District • Est. {config.established}
              </div>
            </div>
          </div>

          {/* Desktop Navigation Links - Home separated and groups shown as dropdowns */}
          <nav className="hidden lg:flex items-center gap-6 shrink min-w-0">
            <button
              onClick={() => onNavigate(homeItem.id)}
              className={`inline-flex items-center gap-2 text-[12px] sm:text-xs xl:text-sm font-semibold tracking-tight transition-all duration-200 px-3 py-2 whitespace-nowrap cursor-pointer rounded-2xl hover:bg-gray-50/90 ${
                activeSection === homeItem.id ? "text-gray-950 font-extrabold" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <LucideIcon name="Home" size={16} className="text-current" />
              {homeItem.label}
            </button>

            {navGroups.map((group) => {
              const isOpen = openDropdown === group.label;
              return (
                <div
                  key={group.label}
                  className="relative"
                  onMouseEnter={() => group.isDropdown && setOpenDropdown(group.label)}
                  onMouseLeave={() => group.isDropdown && setOpenDropdown(null)}
                >
                  {group.isDropdown ? (
                    <>
                      <button
                        type="button"
                        onClick={() => setOpenDropdown(isOpen ? null : group.label)}
                        className="inline-flex items-center gap-2 text-[12px] sm:text-xs xl:text-sm font-semibold tracking-tight transition-all duration-200 px-3 py-2 rounded-2xl text-gray-700 hover:text-gray-900 hover:bg-gray-50/90 border border-gray-200 bg-white"
                      >
                        {group.label}
                        <LucideIcon name="ChevronDown" size={14} />
                      </button>

                      {isOpen && (
                        <div className="absolute left-0 top-full mt-2 min-w-[190px] rounded-3xl border border-gray-200 bg-white shadow-xl shadow-gray-200/20 ring-1 ring-black/5 z-50">
                          <div className="flex flex-col py-2">
                            {group.items.map((item) => (
                              <button
                                key={item.id}
                                onClick={() => {
                                  onNavigate(item.id);
                                  setOpenDropdown(null);
                                }}
                                className="text-left px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                              >
                                {item.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="flex items-center gap-3 xl:gap-4">
                      {group.items.map((item) => {
                        const isActive = activeSection === item.id;
                        return (
                          <button
                            key={item.id}
                            onClick={() => onNavigate(item.id)}
                            className={`text-[12px] sm:text-xs xl:text-sm font-semibold tracking-tight transition-all duration-200 relative px-3 py-2 whitespace-nowrap cursor-pointer rounded-2xl hover:bg-gray-50/90 ${
                              isActive ? "text-gray-950 font-extrabold" : "text-gray-600 hover:text-gray-900"
                            }`}
                          >
                            {item.label}
                            {isActive && (
                              <motion.div
                                layoutId="activeNavIndicator"
                                className="absolute bottom-0 left-1 right-1 h-0.5 rounded-full"
                                style={{ backgroundColor: config.primaryColor }}
                                transition={{ type: "spring", stiffness: 380, damping: 30 }}
                              />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Right Header Toolbar (Search + CTA Button + Mobile Trigger) */}
          <div className="flex items-center space-x-2 shrink-0">
            
            {/* Interactive Search toggle */}
            <div className="relative flex items-center">
              <AnimatePresence>
                {isSearchOpen && (
                  <motion.input
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 140, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="border border-gray-200 text-xs px-2.5 py-1.5 rounded-lg focus:outline-none focus:ring-1 focus:border-transparent mr-1.5 bg-gray-50 text-gray-800"
                    style={{ ["--tw-ring-color" as any]: config.primaryColor }}
                  />
                )}
              </AnimatePresence>
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="text-gray-500 hover:text-gray-800 p-1.5 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer shrink-0"
                aria-label="Search website"
              >
                <LucideIcon name={isSearchOpen ? "X" : "Search"} size={16} />
              </button>
            </div>

            {/* Quick CTA - Admissions / Inquiry Button */}
            <button
              onClick={() => onNavigate("contact")}
              className="hidden sm:inline-flex items-center text-xs font-bold px-3 py-2 rounded-xl text-white shadow-sm hover:shadow-md transition-all active:scale-95 cursor-pointer whitespace-nowrap shrink-0"
              style={{ backgroundColor: config.primaryColor }}
            >
              <span>Ask About Admission</span>
              <LucideIcon name="Mail" size={12} className="ml-1" />
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-1.5 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer shrink-0"
              aria-label="Toggle Menu"
            >
              <LucideIcon name={isMobileMenuOpen ? "X" : "Menu"} size={22} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation (using framer motion) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <div className="px-4 py-3.5 space-y-2">
              {menuItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleMenuClick(item.id)}
                    className="w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium transition-colors flex items-center justify-between cursor-pointer"
                    style={{
                      backgroundColor: isActive ? `${config.primaryColor}10` : "transparent",
                      color: isActive ? config.primaryColor : "#4b5563"
                    }}
                  >
                    <span>{item.label}</span>
                    {isActive && <LucideIcon name="ChevronRight" size={14} style={{ color: config.primaryColor }} />}
                  </button>
                );
              })}
              <div className="pt-2 border-t border-gray-100">
                <button
                  onClick={() => handleMenuClick("contact")}
                  className="w-full text-center py-2.5 rounded-xl text-sm font-semibold text-white shadow-sm hover:shadow transition-all cursor-pointer"
                  style={{ backgroundColor: config.primaryColor }}
                >
                  Join Us Today
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
