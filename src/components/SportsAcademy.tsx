import React from "react";
import { SchoolConfig } from "../types";
import LucideIcon from "./LucideIcon";

interface SportsAcademyProps {
  config: SchoolConfig;
  onNavigate?: (sectionId: string) => void;
}

export default function SportsAcademy({ config, onNavigate }: SportsAcademyProps) {
  return (
    <section id="sports-academy" className="py-12 sm:py-20 bg-white" h-id="sports-academy-section">
      <div className="max-w-[1400px] mx-auto px-2 sm:px-4 lg:px-5 space-y-16">
        
        {/* BIG FULL ATHLETE HERO FEATURE BOX */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#38180c] via-[#5c2a18] to-[#1a0a04] border border-[#ea580c]/30 shadow-2xl text-white p-6 sm:p-10 lg:p-12">
          
          {/* Background Ambient Warm Lighting */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#ea580c]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#ea580c]/15 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
            
            {/* FULL BIG ATHLETE IMAGE SHOWCASE (Takes 6 cols on desktop and is displayed huge) */}
            <div className="lg:col-span-6 relative order-1 lg:order-2">
              <div className="relative rounded-2xl overflow-hidden bg-gradient-to-t from-black via-transparent to-transparent p-1.5 border border-white/20 shadow-2xl group">
                <img
                  src={config.sportsAcademy.image || "/assets/hero_athlete.jpg"}
                  alt="G.S Gacuba II A Star Student Athlete #24"
                  referrerPolicy="no-referrer"
                  className="w-full h-[450px] sm:h-[580px] lg:h-[660px] object-cover object-top rounded-xl filter brightness-105 contrast-105 transition-transform duration-700 group-hover:scale-[1.02]"
                />
                
                {/* Floating Badge top right */}
                <div className="absolute top-4 right-4 bg-[#ea580c] text-white text-xs font-black uppercase tracking-wider px-3.5 py-1.5 rounded-full shadow-lg flex items-center space-x-1.5">
                  <LucideIcon name="Trophy" size={14} />
                  <span>Varsity Star #24</span>
                </div>

                {/* Floating Bottom Card on Image */}
                <div className="absolute bottom-4 left-4 right-4 bg-slate-950/85 backdrop-blur-md p-4 rounded-xl border border-white/20 shadow-xl space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-extrabold text-[#ea580c] uppercase tracking-widest">
                      Rubavu District Finals Star
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      Co-Ed Athletics
                    </span>
                  </div>
                  <h4 className="font-extrabold text-sm sm:text-base text-white">
                    Basketball & Athletics Leadership at G.S Gacuba II A
                  </h4>
                  <p className="text-[11px] text-gray-300 font-light">
                    Balancing rigorous academic streams (MPC & HGL) with competitive sports excellence in Gisenyi sector.
                  </p>
                </div>
              </div>
            </div>

            {/* Left Column Content */}
            <div className="lg:col-span-6 space-y-6 order-2 lg:order-1 text-left">
              
              {/* Tag */}
              <div className="flex items-center space-x-2">
                <span className="text-xs font-extrabold tracking-widest uppercase inline-block px-3.5 py-1 rounded-full bg-[#ea580c] text-white shadow-md">
                  CHAMPIONSHIP SPORTS ACADEMY
                </span>
              </div>

              {/* Title */}
              <h1 className="font-sans font-black text-3xl sm:text-5xl text-white tracking-tight leading-tight">
                G.S Gacuba II A Athletic & Sports Academy
              </h1>

              {/* Accent Divider */}
              <div className="h-1.5 w-24 rounded-full bg-[#ea580c]" />

              {/* Description */}
              <p className="text-gray-200 text-sm sm:text-base leading-relaxed font-light">
                At Groupe Scolaire Gacuba II A, athletics and academic rigor go hand-in-hand. Our sports academy provides elite coaching in basketball, football varsity, volleyball, and track athletics. Competing in Rubavu District and national FEASSSA school championships, our student athletes build endurance, leadership, sportsmanship, and academic resilience.
              </p>

              {/* Key Features list */}
              <div className="space-y-3.5 pt-2">
                {[
                  "Competitive Basketball program with active student league tournaments",
                  "Football, Volleyball, and Athletics teams coached by certified instructors",
                  "Physical conditioning and health education integrated with academic routines",
                  "Regular representation in Rubavu District and regional FEASSSA matches"
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-start space-x-3">
                    <div className="p-1.5 rounded-full bg-[#ea580c] text-white shrink-0 mt-0.5 shadow-sm">
                      <LucideIcon name="Check" size={14} className="stroke-[3]" />
                    </div>
                    <span className="text-gray-100 text-xs sm:text-sm font-medium leading-relaxed">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              {/* Stats Grid Bar */}
              <div className="pt-6 grid grid-cols-3 gap-4 border-t border-white/15 text-white">
                <div>
                  <div className="font-black text-xl sm:text-2xl text-[#ea580c]">12 Teams</div>
                  <div className="text-[11px] text-gray-300 font-light">Active Sports Clubs</div>
                </div>
                <div className="border-l border-white/15 pl-4">
                  <div className="font-black text-xl sm:text-2xl text-white">#24 Athlete</div>
                  <div className="text-[11px] text-gray-300 font-light">Basketball Star</div>
                </div>
                <div className="border-l border-white/15 pl-4">
                  <div className="font-black text-xl sm:text-2xl text-[#ea580c]">Rubavu</div>
                  <div className="text-[11px] text-gray-300 font-light">District Champions</div>
                </div>
              </div>

              {/* Call to Action */}
              {onNavigate && (
                <div className="pt-4">
                  <button
                    onClick={() => onNavigate("contact")}
                    className="inline-flex items-center text-xs sm:text-sm font-extrabold px-6 py-3.5 rounded-xl bg-[#ea580c] hover:bg-[#c2410c] text-white shadow-lg transition-all transform active:scale-95 cursor-pointer space-x-2"
                  >
                    <span>Inquire for Admission & Sports Trials</span>
                    <LucideIcon name="ArrowRight" size={14} />
                  </button>
                </div>
              )}

            </div>

          </div>
        </div>

        {/* SECONDARY SPORTS DISCIPLINES GRID */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-extrabold tracking-widest uppercase text-[#ea580c]">
              ATHLETIC DISCIPLINES AT G.S GACUBA II A
            </span>
            <h3 className="font-sans font-extrabold text-2xl sm:text-3xl text-gray-900 tracking-tight">
              Multidisciplinary Athletics in Gisenyi
            </h3>
            <p className="text-gray-500 text-xs sm:text-sm font-light">
              Providing modern facilities and coaching across multiple competitive sports disciplines.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Basketball Card */}
            <div className="bg-white rounded-2xl p-6 border border-gray-150 shadow-sm space-y-4 hover:shadow-md transition-all group">
              <div className="w-12 h-12 rounded-xl bg-[#5c2a18] text-white flex items-center justify-center shadow-md">
                <LucideIcon name="Trophy" size={22} />
              </div>
              <h4 className="font-extrabold text-lg text-gray-900">Varsity Basketball</h4>
              <p className="text-gray-600 text-xs leading-relaxed font-light">
                Our flagship basketball program features day scholar players training on our outdoor court, competing in Rubavu inter-school leagues.
              </p>
              <div className="pt-2 flex items-center space-x-1.5 text-[11px] font-bold text-[#ea580c]">
                <span>Daily Practice & Tournament Matches</span>
                <LucideIcon name="ChevronRight" size={12} />
              </div>
            </div>

            {/* Football / Soccer Card */}
            <div className="bg-white rounded-2xl p-6 border border-gray-150 shadow-sm space-y-4 hover:shadow-md transition-all group">
              <div className="w-12 h-12 rounded-xl bg-[#ea580c] text-white flex items-center justify-center shadow-md">
                <LucideIcon name="Activity" size={22} />
              </div>
              <h4 className="font-extrabold text-lg text-gray-900">Football & Soccer Varsity</h4>
              <p className="text-gray-600 text-xs leading-relaxed font-light">
                Co-ed football teams developing tactical awareness, physical endurance, and sportsmanship on Rubavu district pitches.
              </p>
              <div className="pt-2 flex items-center space-x-1.5 text-[11px] font-bold text-[#ea580c]">
                <span>Inter-School League Participation</span>
                <LucideIcon name="ChevronRight" size={12} />
              </div>
            </div>

            {/* Volleyball & Track Card */}
            <div className="bg-white rounded-2xl p-6 border border-gray-150 shadow-sm space-y-4 hover:shadow-md transition-all group">
              <div className="w-12 h-12 rounded-xl bg-[#5c2a18] text-white flex items-center justify-center shadow-md">
                <LucideIcon name="Users" size={22} />
              </div>
              <h4 className="font-extrabold text-lg text-gray-900">Volleyball & Track Athletics</h4>
              <p className="text-gray-600 text-xs leading-relaxed font-light">
                Sprint conditioning, long-distance running, and volleyball tournaments promoting health, discipline, and peer camaraderie.
              </p>
              <div className="pt-2 flex items-center space-x-1.5 text-[11px] font-bold text-[#ea580c]">
                <span>Health & Fitness Conditioning</span>
                <LucideIcon name="ChevronRight" size={12} />
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
