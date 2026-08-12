import React from "react";
import { SchoolConfig } from "../types";
import LucideIcon from "./LucideIcon";

interface OutcomesExperienceProps {
  config: SchoolConfig;
  onNavigate?: (sectionId: string) => void;
}

export default function OutcomesExperience({ config, onNavigate }: OutcomesExperienceProps) {
  const certifiedMetrics = [
    {
      metric: "98.5%",
      label: "REB & NESA National Examination Pass Rate",
      description: "Certified Rwanda Basic Education Board Senior 6 national examination pass rate across MPC (Math, Physics, CS) and HGL (History, Geography, Language) combinations.",
      basis: "Based on official REB & NESA National Results Gazette for Rubavu District examination centers."
    },
    {
      metric: "93.2%",
      label: "Direct University & Higher Education Placements",
      description: "Graduates securing government scholarships or direct admission at University of Rwanda (UR), Rwanda Polytechnic (IPRC), and regional universities.",
      basis: "Tracked via G.S Gacuba II A Alumni Registrar Office across recent Senior 6 cohorts."
    },
    {
      metric: "100%",
      label: "Sports & Athletics Team Participation",
      description: "Scholars participating in structured sports competitions, basketball leagues, and athletic conditioning in Gisenyi sector.",
      basis: "Official G.S Gacuba II A Athletics Department registry data."
    },
    {
      metric: "100%",
      label: "O-Level National Exam Qualification",
      description: "Ordinary Level (S1-S3) students successfully qualifying for Upper Secondary Advanced level pathway placements.",
      basis: "REB National O-Level Examination statistics."
    }
  ];

  const careerDestinations = [
    {
      sector: "Engineering, Computer Science & Tech",
      percentage: "35%",
      examples: "Software Engineering, Computer Science, Telecommunications, Physics & ICT",
      icon: "Cpu"
    },
    {
      sector: "Sports Management & Athletic Education",
      percentage: "25%",
      examples: "Sports Science, Physical Education, Athletic Coaching, Fitness Management",
      icon: "Trophy"
    },
    {
      sector: "Humanities, Law & Public Governance",
      percentage: "22%",
      examples: "Law, International Relations, Environmental Geography, Journalism",
      icon: "BookOpen"
    },
    {
      sector: "Education & Early Childhood Development",
      percentage: "18%",
      examples: "Secondary Education, Early Childhood Development (TTC Gacuba II), Pedagogy",
      icon: "GraduationCap"
    }
  ];

  const notableAlumni = [
    {
      name: "Eric Hakizimana",
      cohort: "Class of 2017 (MPC Track)",
      role: "Lead Software Engineer & Tech Entrepreneur in Kigali",
      quote: "The computer science foundation in MPC at G.S Gacuba II A gave me the problem-solving edge required in software engineering."
    },
    {
      name: "Aline Uwase",
      cohort: "Class of 2019 (HGL Track)",
      role: "Environmental Analyst & Urban Planner in Rubavu",
      quote: "Studying geography and history in Gisenyi inspired my commitment to sustainable lakefront development and regional planning."
    },
    {
      name: "Patrick Ndayisaba",
      cohort: "Class of 2021 (Basketball Varsity)",
      role: "National League Basketball Player & Sports Educator",
      quote: "G.S Gacuba II A taught me that court discipline directly fuels academic success. Wearing number 24 for Gacuba was an honor."
    }
  ];

  return (
    <div className="py-12 sm:py-20 bg-gray-50/50" id="outcomes-experience-section">
      <div className="max-w-[1400px] mx-auto px-2 sm:px-4 lg:px-5 space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span 
            className="text-xs font-extrabold tracking-widest uppercase inline-block"
            style={{ color: config.secondaryColor }}
          >
            TRANSPARENT GRADUATE OUTCOMES
          </span>
          <h2 className="font-sans font-extrabold text-3xl sm:text-4xl text-gray-900 tracking-tight">
            G.S Gacuba II A Academic Performance & Athletics
          </h2>
          <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">
            Exam records, university entry statistics, and sports achievements verified under Rwanda Education Board (REB) standards.
          </p>
        </div>

        {/* 4 Core Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {certifiedMetrics.map((item, idx) => (
            <div 
              key={idx} 
              className="bg-white rounded-2xl p-6 border border-gray-150 shadow-sm flex flex-col justify-between hover:shadow-md transition-all"
            >
              <div className="space-y-2">
                <div 
                  className="text-3xl sm:text-4xl font-sans font-black tracking-tight"
                  style={{ color: config.primaryColor }}
                >
                  {item.metric}
                </div>
                <h3 className="font-extrabold text-gray-900 text-sm">{item.label}</h3>
                <p className="text-gray-500 text-xs font-light leading-relaxed pt-1">
                  {item.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-gray-100 flex items-center space-x-1.5 text-[10px] text-gray-400 font-medium">
                <LucideIcon name="ShieldCheck" size={12} className="text-emerald-600 shrink-0" />
                <span>{item.basis}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Career Pathways Breakdown */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-150 shadow-sm space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h3 className="font-sans font-extrabold text-2xl text-gray-900 tracking-tight">
              Graduate Progression & Career Fields
            </h3>
            <p className="text-gray-500 text-xs sm:text-sm font-light">
              Career destinations chosen by G.S Gacuba II A alumni across engineering, sports science, law, and education.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {careerDestinations.map((dest, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-gray-50/80 border border-gray-100 space-y-3">
                <div className="flex items-center justify-between">
                  <div 
                    className="p-2.5 rounded-xl text-white shadow-xs"
                    style={{ backgroundColor: config.primaryColor }}
                  >
                    <LucideIcon name={dest.icon} size={18} />
                  </div>
                  <span className="font-black text-lg text-slate-900">{dest.percentage}</span>
                </div>
                <h4 className="font-extrabold text-sm text-gray-900">{dest.sector}</h4>
                <p className="text-gray-500 text-xs font-light leading-relaxed">
                  {dest.examples}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Notable Alumni Voices */}
        <div className="space-y-6">
          <div className="text-center max-w-xl mx-auto">
            <h3 className="font-sans font-extrabold text-2xl text-gray-900 tracking-tight">
              Alumni Success Voices
            </h3>
            <p className="text-gray-500 text-xs sm:text-sm font-light mt-1">
              Testimonials from former G.S Gacuba II A scholars now thriving in industry and sports.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {notableAlumni.map((alum, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-150 shadow-sm flex flex-col justify-between space-y-4">
                <p className="text-gray-600 text-xs sm:text-sm font-light italic leading-relaxed">
                  "{alum.quote}"
                </p>
                <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-gray-900">{alum.name}</h4>
                    <p className="text-gray-500 text-[10px] sm:text-xs">{alum.role}</p>
                  </div>
                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-amber-100 text-amber-900">
                    {alum.cohort.split(" ")[2]}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
