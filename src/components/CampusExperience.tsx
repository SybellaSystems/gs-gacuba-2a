import React, { useState } from "react";
import { SchoolConfig } from "../types";
import LucideIcon from "./LucideIcon";

interface CampusExperienceProps {
  config: SchoolConfig;
  onNavigate?: (sectionId: string) => void;
}

export default function CampusExperience({ config, onNavigate }: CampusExperienceProps) {
  const [activeTab, setActiveTab] = useState<string>("day-campus");

  const campusPillars = [
    {
      id: "day-campus",
      title: "Day Scholar Campus & Study Courtyard",
      icon: "Home",
      tagline: "Vibrant Day School Environment in Gisenyi Sector",
      content: "Located in the heart of Gisenyi sector near TTC Gacuba II, G.S Gacuba II A provides a secure, well-structured day school environment. Day scholars benefit from spacious study courtyards, peer discussion zones, clean sanitation facilities, and disciplined daily routines under REB standards.",
      highlights: [
        "Spacious outdoor study courtyards and discussion benches",
        "Secure campus perimeter and active student safety protocols",
        "Proximity to TTC Gacuba II campus and educational hubs",
        "Clean drinking water stations and sanitary facilities"
      ],
      image: "/assets/gacuba_campus.jpg"
    },
    {
      id: "sports-facilities",
      title: "Basketball Courts & Sports Grounds",
      icon: "Trophy",
      tagline: "Home of District Basketball Champions & Athletics",
      content: "Physical fitness is central to our school identity. G.S Gacuba II A features dedicated outdoor basketball courts, a football field, volleyball courts, and track facilities where student athletes train daily for Rubavu District and national FEASSSA tournaments.",
      highlights: [
        "Standard outdoor basketball court with night lighting options",
        "Multi-sport grounds for football, volleyball, and athletics",
        "Certified sports coaches and team conditioning instructors",
        "Regular inter-class and inter-school league competitions"
      ],
      image: "/assets/hero_athlete.jpg"
    },
    {
      id: "labs-classrooms",
      title: "MPC Computer Lab & HGL Lecture Rooms",
      icon: "Cpu",
      tagline: "Equipped for Digital Technology & Scientific Discovery",
      content: "Supporting our A'Level Math, Physics, Computer Science (MPC) and History, Geography, Language (HGL) streams, our computer laboratories feature desktop workstations, high-speed connectivity, physics apparatus, and rich reference libraries.",
      highlights: [
        "Modern desktop workstations for Computer Science practicals",
        "Physics and Mathematics experimental apparatus",
        "Spacious, well-lit classrooms designed for interactive teaching",
        "Reference library stocked with REB and NESA curriculum guides"
      ],
      image: "/assets/gacuba_mpc.jpg"
    },
    {
      id: "wellness-health",
      title: "Health First Aid & Student Care",
      icon: "ShieldCheck",
      tagline: "Dedicated On-site First Aid & Health Care",
      content: "Student health and physical safety are carefully guarded. Our on-site first aid station provides immediate medical assistance for minor injuries or ailments, backed by direct protocols to Rubavu District Hospital.",
      highlights: [
        "Qualified first-aid attendant and wellness support officer",
        "First aid kits stationed across sports courts and laboratories",
        "Routine health and hygiene educational workshops",
        "Direct emergency care linkage with Rubavu District Hospital"
      ],
      image: "/assets/gacuba_basketball.jpg"
    }
  ];

  const currentPillar = campusPillars.find(p => p.id === activeTab) || campusPillars[0];

  const dailySchedule = [
    { time: "07:00 AM", activity: "Campus Arrival & Morning Roll Call" },
    { time: "07:30 AM", activity: "General Assembly & National Anthem" },
    { time: "08:00 AM", activity: "Morning Academic Lessons (MPC & HGL)" },
    { time: "10:30 AM", activity: "Break & Hydration Refreshment" },
    { time: "11:00 AM", activity: "Mid-Day Class & Computer Lab Practicals" },
    { time: "01:00 PM", activity: "Lunch & Peer Discussion Break" },
    { time: "02:00 PM", activity: "Afternoon Lessons & Library Research" },
    { time: "04:30 PM", activity: "Basketball, Football & Track Athletics Training" },
    { time: "06:00 PM", activity: "Day Scholar Departure & Evening Homework Prep" }
  ];

  return (
    <div className="py-12 sm:py-20 bg-white" id="campus-life-section">
      <div className="max-w-[1400px] mx-auto px-2 sm:px-4 lg:px-5 space-y-16">
        
        {/* Intro heading */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span 
            className="text-xs font-extrabold tracking-widest uppercase inline-block"
            style={{ color: config.secondaryColor }}
          >
            GISENYI SECTOR DAY SCHOOL CAMPUS
          </span>
          <h2 className="font-sans font-extrabold text-3xl sm:text-4xl text-gray-900 tracking-tight">
            G.S Gacuba II A Campus & Athletics Facilities
          </h2>
          <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">
            Discover our day school facilities in Rubavu District, from our championship basketball court to our MPC computer science lab.
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
          {campusPillars.map((pillar) => {
            const isSelected = pillar.id === activeTab;
            return (
              <button
                key={pillar.id}
                onClick={() => setActiveTab(pillar.id)}
                className={`px-4 sm:px-6 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all duration-300 flex items-center space-x-2 cursor-pointer shadow-sm ${
                  isSelected
                    ? "text-white shadow-md scale-[1.02]"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
                style={{
                  backgroundColor: isSelected ? config.primaryColor : undefined
                }}
              >
                <LucideIcon name={pillar.icon} size={16} />
                <span>{pillar.title}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Pillar Detailed View Card */}
        <div className="bg-gray-50/80 rounded-3xl p-6 sm:p-10 border border-gray-100 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Info Side */}
            <div className="lg:col-span-6 space-y-5">
              <span 
                className="text-xs font-extrabold tracking-wider uppercase px-3 py-1 rounded-full bg-white border border-gray-200 inline-block shadow-2xs"
                style={{ color: config.secondaryColor }}
              >
                {currentPillar.tagline}
              </span>
              
              <h3 className="font-sans font-extrabold text-2xl sm:text-3xl text-gray-900 tracking-tight">
                {currentPillar.title}
              </h3>
              
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed font-light">
                {currentPillar.content}
              </p>

              <div className="space-y-3 pt-2">
                <h4 className="font-bold text-xs sm:text-sm text-gray-900 uppercase tracking-wider">Key Highlights:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {currentPillar.highlights.map((item, idx) => (
                    <div key={idx} className="flex items-start space-x-2 text-xs text-gray-700 font-medium">
                      <LucideIcon name="CheckCircle2" size={14} className="text-emerald-600 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Image Side */}
            <div className="lg:col-span-6 relative">
              <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-200/80 bg-white p-1.5">
                <img
                  src={currentPillar.image}
                  alt={currentPillar.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-[280px] sm:h-[360px] object-cover rounded-xl"
                />
              </div>
            </div>

          </div>
        </div>

        {/* Daily Schedule Section */}
        <div className="bg-gradient-to-br from-[#2c1308] via-[#5c2a18] to-[#1e0a04] border border-[#ea580c]/30 rounded-3xl p-6 sm:p-10 text-white shadow-xl space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-amber-400 font-extrabold text-xs uppercase tracking-widest">
              G.S GACUBA II A DAY SCHOLAR ROUTINE
            </span>
            <h3 className="font-sans font-extrabold text-2xl sm:text-3xl tracking-tight">
              A Day in the Life of a G.S Gacuba II A Scholar
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm font-light">
              Balancing morning devotions, intensive academic lessons, lab practicals, and afternoon athletic training.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {dailySchedule.map((slot, idx) => (
              <div 
                key={idx} 
                className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center space-x-3.5 hover:bg-white/10 transition-colors"
              >
                <div 
                  className="w-10 h-10 rounded-xl font-extrabold text-xs flex items-center justify-center shrink-0 shadow-inner"
                  style={{ backgroundColor: config.secondaryColor, color: "#0f172a" }}
                >
                  {slot.time.split(" ")[0]}
                </div>
                <div>
                  <span className="text-[10px] text-amber-300 font-bold uppercase tracking-wider">{slot.time.split(" ")[1]}</span>
                  <h4 className="font-bold text-xs sm:text-sm text-white">{slot.activity}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
