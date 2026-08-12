import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SCHOOLS_DATA } from "./data/schools";
import { fetchSchoolConfig } from "./lib/supabase";
import Topbar from "./components/Topbar";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Welcome from "./components/Welcome";
import Stats from "./components/Stats";
import Academics from "./components/Academics";
import SportsAcademy from "./components/SportsAcademy";
import CampusExperience from "./components/CampusExperience";
import OutcomesExperience from "./components/OutcomesExperience";
import Gallery from "./components/Gallery";
import NewsAnnouncements from "./components/NewsAnnouncements";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import LucideIcon from "./components/LucideIcon";

// Custom Subpage Banner Component
function SubpageHeader({ title, subtitle, config }: { title: string; subtitle: string; config: any }) {
  return (
    <div 
      className="relative py-12 sm:py-16 text-white overflow-hidden bg-gradient-to-br from-slate-950 via-[#0b2545] to-slate-900 border-b border-white/10"
      id="subpage-header"
    >
      {/* Delicate background ambient highlights */}
      <div className="absolute -right-16 -bottom-16 w-64 h-64 rounded-full bg-amber-400/5 blur-3xl pointer-events-none" />
      <div className="absolute -left-16 -top-16 w-64 h-64 rounded-full bg-sky-500/5 blur-3xl pointer-events-none" />
      
      <div className="max-w-[1400px] mx-auto px-2 sm:px-4 lg:px-5 relative z-10">
        <nav className="flex items-center space-x-2 text-[10px] uppercase tracking-widest text-slate-400 font-semibold mb-3">
          <span className="opacity-70">School Portal</span>
          <span>/</span>
          <span style={{ color: config.secondaryColor }}>{title}</span>
        </nav>
        
        <h1 className="font-sans font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
          {title}
        </h1>
        <p className="text-slate-300 text-xs sm:text-sm mt-2 max-w-3xl leading-relaxed font-light">
          {subtitle}
        </p>
      </div>
    </div>
  );
}

export default function App() {
  // Config for the school; fall back to bundled data if live DB config does not exist.
  const [activeConfig, setActiveConfig] = useState(SCHOOLS_DATA[0]);
  const [activeSection, setActiveSection] = useState<string>("home");
  const [isLoadingConfig, setIsLoadingConfig] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadConfig() {
      try {
        const config = await fetchSchoolConfig(SCHOOLS_DATA[0]);
        if (!isMounted) return;
        setActiveConfig(config);
        if (config === SCHOOLS_DATA[0]) {
          console.info("App: using fallback hardcoded config (no DB data returned)");
        } else {
          console.info("App: loaded config from Supabase DB");
        }
      } catch (error) {
        setFetchError("Unable to load school content from Supabase.");
      } finally {
        if (isMounted) setIsLoadingConfig(false);
      }
    }

    loadConfig();
    return () => {
      isMounted = false;
    };
  }, []);

  // Sync activeSection with browser pathname using react-router
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const path = location.pathname.replace(/^\//, "");
    setActiveSection(path && path.length ? path : "home");
  }, [location.pathname]);

  // Reset scroll back to the top whenever active page route changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [activeSection]);

  const handleNavigate = (sectionId: string) => {
    // update browser URL via react-router
    if (sectionId === "home") {
      navigate("/");
    } else {
      navigate(`/${sectionId}`);
    }
    setActiveSection(sectionId);
  };

  

  return (
    <div className="min-h-screen flex flex-col bg-white overflow-x-hidden font-sans selection:bg-amber-100 selection:text-amber-900">
      
      {/* 1. Header & Branding Grid */}
      <Topbar config={activeConfig} />
      
      <Navbar 
        config={activeConfig} 
        onNavigate={handleNavigate} 
        activeSection={activeSection} 
      />

      

      {/* 2. Page Router Controller */}
      <main className="flex-1">
        
        {activeSection === "home" && (
          <div className="animate-fade-in space-y-16 pb-16">
            {/* Home Hero Slider */}
            <Hero config={activeConfig} onCtaClick={handleNavigate} />
            
            {/* Core Quick Stats Bar */}
            <Stats config={activeConfig} />

            {/* Structured Page Navigation Bento-Grid Dashboard */}
            <section className="max-w-[1400px] mx-auto px-2 sm:px-4 lg:px-5 py-8" id="home-bento-portal">
              <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
                <span 
                  className="text-xs font-extrabold tracking-widest uppercase inline-block"
                  style={{ color: activeConfig.secondaryColor }}
                >
                  EXPLORE OUR SCHOOL SECTIONS
                </span>
                <h2 className="font-sans font-extrabold text-2xl sm:text-3xl text-gray-900 tracking-tight">
                  Welcome to our Campus Portal
                </h2>
                <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">
                  Click on any of our dedicated website sections below to access full information about admissions, curriculum pathways, or civic leadership programs at G.S Gacuba 2 A.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                
                {/* About Teaser Card */}
                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 flex flex-col justify-between hover:shadow-md transition-all">
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center">
                      <LucideIcon name="Info" size={18} />
                    </div>
                    <h3 className="font-bold text-gray-900 text-base">Our Heritage & Mission</h3>
                    <p className="text-gray-500 text-xs font-light leading-relaxed">
                      Learn about our Gisenyi sector day school heritage, REB curriculum standards, and commitment to academic and athletic excellence.
                    </p>
                  </div>
                  <button 
                    onClick={() => handleNavigate("about")}
                    className="mt-5 text-xs font-bold flex items-center space-x-1.5 cursor-pointer hover:underline"
                    style={{ color: activeConfig.primaryColor }}
                  >
                    <span>Read Welcome Greeting</span>
                    <LucideIcon name="ArrowRight" size={12} />
                  </button>
                </div>

                {/* Academics Teaser Card */}
                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 flex flex-col justify-between hover:shadow-md transition-all">
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center">
                      <LucideIcon name="BookOpen" size={18} />
                    </div>
                    <h3 className="font-bold text-gray-900 text-base">Curriculum & Pathways</h3>
                    <p className="text-gray-500 text-xs font-light leading-relaxed">
                      Discover our MPC (Math, Physics, CS) and HGL (History, Geography, Language) combinations, along with lower secondary O'Level S1-S3.
                    </p>
                  </div>
                  <button 
                    onClick={() => handleNavigate("academics")}
                    className="mt-5 text-xs font-bold flex items-center space-x-1.5 cursor-pointer hover:underline"
                    style={{ color: activeConfig.primaryColor }}
                  >
                    <span>Explore Academic Streams</span>
                    <LucideIcon name="ArrowRight" size={12} />
                  </button>
                </div>

                {/* Leadership Teaser Card */}
                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 flex flex-col justify-between hover:shadow-md transition-all">
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center">
                      <LucideIcon name="Trophy" size={18} />
                    </div>
                    <h3 className="font-bold text-gray-900 text-base">Sports & Athletics Academy</h3>
                    <p className="text-gray-500 text-xs font-light leading-relaxed">
                      Explore our basketball, football varsity, volleyball, and track programs that dominate Rubavu District competitions.
                    </p>
                  </div>
                  <button 
                    onClick={() => handleNavigate("sports-academy")}
                    className="mt-5 text-xs font-bold flex items-center space-x-1.5 cursor-pointer hover:underline"
                    style={{ color: activeConfig.primaryColor }}
                  >
                    <span>View Sports Academy</span>
                    <LucideIcon name="ArrowRight" size={12} />
                  </button>
                </div>

                {/* Campus Life Teaser Card */}
                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 flex flex-col justify-between hover:shadow-md transition-all">
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center">
                      <LucideIcon name="Home" size={18} />
                    </div>
                    <h3 className="font-bold text-gray-900 text-base">Campus Life & Sports Grounds</h3>
                    <p className="text-gray-500 text-xs font-light leading-relaxed">
                      Tour our Gisenyi sector day campus, basketball courts, computer science laboratories, and student wellness care.
                    </p>
                  </div>
                  <button 
                    onClick={() => handleNavigate("campus")}
                    className="mt-5 text-xs font-bold flex items-center space-x-1.5 cursor-pointer hover:underline"
                    style={{ color: activeConfig.primaryColor }}
                  >
                    <span>Explore Campus Life</span>
                    <LucideIcon name="ArrowRight" size={12} />
                  </button>
                </div>

                {/* Outcomes Teaser Card */}
                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 flex flex-col justify-between hover:shadow-md transition-all">
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center">
                      <LucideIcon name="ShieldCheck" size={18} />
                    </div>
                    <h3 className="font-bold text-gray-900 text-base">Graduate Outcomes & Exams</h3>
                    <p className="text-gray-500 text-xs font-light leading-relaxed">
                      Verifiable REB national exam records (98.5% pass rate), university placement, and alumni success voices.
                    </p>
                  </div>
                  <button 
                    onClick={() => handleNavigate("outcomes")}
                    className="mt-5 text-xs font-bold flex items-center space-x-1.5 cursor-pointer hover:underline"
                    style={{ color: activeConfig.primaryColor }}
                  >
                    <span>View Certified Outcomes</span>
                    <LucideIcon name="ArrowRight" size={12} />
                  </button>
                </div>

                {/* Gallery Teaser Card */}
                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 flex flex-col justify-between hover:shadow-md transition-all">
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center">
                      <LucideIcon name="Image" size={18} />
                    </div>
                    <h3 className="font-bold text-gray-900 text-base">Campus Life Gallery</h3>
                    <p className="text-gray-500 text-xs font-light leading-relaxed">
                      Explore authentic snapshots of our basketball matches, MPC computer lab, and campus life in Gisenyi.
                    </p>
                  </div>
                  <button 
                    onClick={() => handleNavigate("gallery")}
                    className="mt-5 text-xs font-bold flex items-center space-x-1.5 cursor-pointer hover:underline"
                    style={{ color: activeConfig.primaryColor }}
                  >
                    <span>Browse Media Album</span>
                    <LucideIcon name="ArrowRight" size={12} />
                  </button>
                </div>

                {/* News Teaser Card */}
                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 flex flex-col justify-between hover:shadow-md transition-all">
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center">
                      <LucideIcon name="Newspaper" size={18} />
                    </div>
                    <h3 className="font-bold text-gray-900 text-base">Announcements & Bulletins</h3>
                    <p className="text-gray-500 text-xs font-light leading-relaxed">
                      Read about Rubavu basketball finals, REB exam timetables, and academic announcements at G.S Gacuba II A.
                    </p>
                  </div>
                  <button 
                    onClick={() => handleNavigate("news")}
                    className="mt-5 text-xs font-bold flex items-center space-x-1.5 cursor-pointer hover:underline"
                    style={{ color: activeConfig.primaryColor }}
                  >
                    <span>Read Latest Press</span>
                    <LucideIcon name="ArrowRight" size={12} />
                  </button>
                </div>

                {/* Contact Teaser Card */}
                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 flex flex-col justify-between hover:shadow-md transition-all">
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center">
                      <LucideIcon name="ClipboardList" size={18} />
                    </div>
                    <h3 className="font-bold text-gray-900 text-base">Online Enrollment Desk</h3>
                    <p className="text-gray-500 text-xs font-light leading-relaxed">
                      Ready to apply? Complete our online form for O'Level, MPC, or HGL admission at G.S Gacuba II A.
                    </p>
                  </div>
                  <button 
                    onClick={() => handleNavigate("contact")}
                    className="mt-5 text-xs font-bold flex items-center space-x-1.5 cursor-pointer hover:underline"
                    style={{ color: activeConfig.primaryColor }}
                  >
                    <span>Begin Registration Form</span>
                    <LucideIcon name="ArrowRight" size={12} />
                  </button>
                </div>

              </div>
            </section>

            {/* Quick action enrollment callout */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
              <div 
                className="rounded-2xl p-8 sm:p-12 text-white text-center sm:text-left flex flex-col sm:flex-row justify-between items-center gap-6 shadow-md"
                style={{ backgroundColor: activeConfig.primaryColor }}
              >
                <div>
                  <h3 className="font-extrabold text-xl sm:text-2xl tracking-tight">Admissions Open for New Day Scholars</h3>
                  <p className="text-slate-200 text-xs sm:text-sm font-light mt-1 max-w-xl">
                    Enroll now to secure your day scholar slot. Applications are open for O'Level (S1-S3), MPC (Math, Physics, CS), and HGL combinations.
                  </p>
                </div>
                <button 
                  onClick={() => handleNavigate("contact")}
                  className="bg-white text-slate-900 font-bold text-xs px-6 py-3.5 rounded-xl shadow-sm hover:scale-[1.02] active:scale-95 transition-all cursor-pointer shrink-0"
                >
                  Start My Online Enrollment
                </button>
              </div>
            </section>
          </div>
        )}

        {activeSection === "about" && (
          <div className="animate-fade-in">
            <SubpageHeader 
              title="About Our Institution" 
              subtitle={`Founded in ${activeConfig.established}, Groupe Scolaire Gacuba II A (G.S Gacuba II A) is a government-aided day school in Gisenyi sector offering O'Level, MPC, and HGL streams.`}
              config={activeConfig}
            />
            
            {/* Core Stats Bar */}
            <Stats config={activeConfig} isSubpage={true} />
            
            {/* Principal Welcome Msg & History */}
            <Welcome config={activeConfig} />

            {/* Deep History of Gacuba II Campus */}
            <section className="py-16 bg-white border-t border-gray-150">
              <div className="max-w-[1400px] mx-auto px-2 sm:px-4 lg:px-5">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  <div className="lg:col-span-6 space-y-6">
                    <h3 className="font-sans font-extrabold text-2xl text-slate-900">Academic Vision & Civic Ethics</h3>
                    <p className="text-gray-600 text-xs sm:text-sm leading-relaxed font-light">
                      At G.S Gacuba II A, our educational mission centers on academic rigor, technological competence, and athletic excellence. Under the Rwanda Basic Education Board (REB) national curriculum, we prepare young men and women to serve their community with honor and skill.
                    </p>
                    <p className="text-gray-600 text-xs sm:text-sm leading-relaxed font-light">
                      Located near TTC Gacuba II in Rubavu District, our campus provides well-equipped computer science laboratories, science classrooms, and multi-sport grounds that nurture holistic development.
                    </p>
                  </div>
                  <div className="lg:col-span-6 bg-slate-900/5 p-6 rounded-2xl border border-gray-100">
                    <h4 className="font-bold text-slate-950 text-sm sm:text-base mb-4">Our Core Pillars of Excellence</h4>
                    <div className="space-y-4">
                      {[
                        { title: "Academic Rigor", desc: "Top-tier REB and NESA national examination pass rates in MPC & HGL." },
                        { title: "Athletic Excellence", desc: "District-leading basketball team and varsity athletics." },
                        { title: "Community Synergy", desc: "Strong synergy with TTC Gacuba II for educational development." }
                      ].map((item, idx) => (
                        <div key={idx} className="flex space-x-3.5">
                          <div className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center font-bold text-xs shrink-0">
                            {idx + 1}
                          </div>
                          <div>
                            <h5 className="font-bold text-xs sm:text-sm text-slate-950">{item.title}</h5>
                            <p className="text-gray-500 text-[11px] sm:text-xs mt-0.5">{item.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {activeSection === "academics" && (
          <div className="animate-fade-in">
            <SubpageHeader 
              title="Academic Tracks & Combinations" 
              subtitle="Review our authorized learning combinations under REB & NESA standards: MPC (Math, Physics, Computer Science), HGL (History, Geography, Language), and O'Level (S1-S3)."
              config={activeConfig}
            />
            {/* Academic Program combinations (MPC, HGL, O'Level) */}
            <Academics config={activeConfig} onNavigate={handleNavigate} />
          </div>
        )}

        {activeSection === "sports-academy" && (
          <div className="animate-fade-in">
            <SubpageHeader 
              title="G.S Gacuba II A Sports & Athletics Academy" 
              subtitle="Combining rigorous academic studies with championship basketball, football varsity, volleyball, and track athletics in Rubavu District."
              config={activeConfig}
            />
            {/* Talent & Sports Projects focus segment */}
            <SportsAcademy config={activeConfig} onNavigate={handleNavigate} />
          </div>
        )}

        {activeSection === "campus" && (
          <div className="animate-fade-in">
            <SubpageHeader 
              title="Campus Life & Athletics Facilities" 
              subtitle="Tour our Gisenyi sector day school campus, outdoor basketball court, MPC computer lab, and student health care."
              config={activeConfig}
            />
            <CampusExperience config={activeConfig} onNavigate={handleNavigate} />
          </div>
        )}

        {activeSection === "outcomes" && (
          <div className="animate-fade-in">
            <SubpageHeader 
              title="Graduate Outcomes & National Exam Records" 
              subtitle="Verifiable REB national examination results, university placement statistics, and professional alumni pathways."
              config={activeConfig}
            />
            <OutcomesExperience config={activeConfig} onNavigate={handleNavigate} />
          </div>
        )}

        {activeSection === "gallery" && (
          <div className="animate-fade-in">
            <SubpageHeader 
              title="Campus Snapshot Gallery" 
              subtitle="A vibrant showcase of student life inside our Gisenyi sector classrooms, basketball matches, computer lab, and campus assemblies."
              config={activeConfig}
            />
            {/* Media & Image Lightroom Hub */}
            <Gallery config={activeConfig} />
          </div>
        )}

        {activeSection === "news" && (
          <div className="animate-fade-in">
            <SubpageHeader 
              title="School Announcements & Publications" 
              subtitle="Stay informed with our latest administrative updates, basketball championships, exams score bulletins, and term timetables."
              config={activeConfig}
            />
            {/* Announcement Press Releases */}
            <NewsAnnouncements config={activeConfig} />
          </div>
        )}

        {activeSection === "contact" && (
          <div className="animate-fade-in">
            <SubpageHeader 
              title="Online Admissions & Enrollment Desk" 
              subtitle="Submit your details to compile a comprehensive electronic application letter directed straight to our admissions registrar team."
              config={activeConfig}
            />
            {/* Admissions Form & Location map */}
            <Contact config={activeConfig} />
          </div>
        )}

      </main>

      {/* 3. Global footer */}
      <Footer config={activeConfig} onNavigate={handleNavigate} />

    </div>
  );
}
