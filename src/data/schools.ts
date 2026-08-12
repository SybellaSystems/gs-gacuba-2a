import { SchoolConfig } from "../types";

export const SCHOOLS_DATA: SchoolConfig[] = [
  {
    id: "gs-gacuba-2a",
    name: "G.S Gacuba 2 A",
    frenchName: "G.S Gacuba 2 A",
    slogan: "Academic Excellence, Civic Discipline & Athletic Leadership",
    established: "1982",
    location: "Gisenyi Sector, near TTC Gacuba II Campus, Rubavu District",
    district: "Rubavu",
    type: "Government-Aided Day Secondary School",
    gender: "Co-educational (Boys & Girls)",
    logoUrl: "/assets/gacuba_logo.svg",
    primaryColor: "#5c2a18", // Deep Rich Warm Brown
    secondaryColor: "#ea580c", // Vibrant Athletic Orange
    accentColor: "#9a3412", // Burnt Terracotta Orange
    contact: {
      email: "info@gsgacuba2a.edu.rw",
      phone: "+250 788 567 890",
      address: "Gisenyi Sector, near TTC Gacuba II Campus, Rubavu District, Western Province, Rwanda",
      facebook: "https://facebook.com/gsgacuba2a",
      twitter: "https://twitter.com/gsgacuba2a",
      instagram: "https://instagram.com/gs_gacuba2a_official",
      youtube: "https://youtube.com/@gsgacuba2a"
    },
    heroSlides: [
      {
        image: "/assets/hero_athlete.jpg",
        title: "Home of Champion Student Athletes & Academic Leaders",
        description: "Promoting athletic excellence, team spirit, and discipline across basketball, football, and regional inter-school championships in Rubavu District.",
        tag: "Active Sports & Athletics Program"
      },
      {
        image: "/assets/gacuba_mpc.jpg",
        title: "A'Level Science & Computing (MPC Combination)",
        description: "Preparing future innovators with intensive training in Advanced Mathematics, Physics, and Computer Science under the NESA national curriculum.",
        tag: "MPC Science Combination"
      },
      {
        image: "/assets/gacuba_campus.jpg",
        title: "A'Level Humanities & Languages (HGL Combination)",
        description: "Cultivating critical thinkers and civic leaders through History, Geography, and Language studies in the heart of Gisenyi sector.",
        tag: "HGL Humanities Track"
      }
    ],
    welcome: {
      title: "Welcome to Groupe Scolaire Gacuba II A",
      message: "Groupe Scolaire Gacuba II A (G.S Gacuba II A) is a premier government-aided day school located in the vibrant Gisenyi sector of Rubavu District, Western Province. Serving both Ordinary Level (O'Level S1–S3) and Advanced Level (A'Level) secondary students, our institution delivers a well-rounded education under the guidelines of the Rwanda Education Board (REB) and the National Examination and School Inspection Authority (NESA). Our A'Level academic streams offer prestigious combinations in Mathematics, Physics, Computer Science (MPC) as well as History, Geography, and Language (HGL). Situated adjacent to the TTC Gacuba II campus—renowned for teacher education and Early Childhood Development (ECD)—G.S Gacuba II A is equally celebrated for its competitive sports academy, fostering disciplined student athletes in basketball, football, volleyball, and track athletics.",
      authorName: "SEBUHORO Ernest",
      authorRole: "Headmaster",
      authorImage: "/assets/principal_portrait.jpg"
    },
    stats: [
      { label: "Active Day Scholars", value: "800+", icon: "Users" },
      { label: "REB & NESA Accreditation", value: "Government-Aided", icon: "ShieldCheck" },
      { label: "Sports Teams & Clubs", value: "12 Active Teams", icon: "Trophy" },
      { label: "A'Level Specializations", value: "MPC & HGL Tracks", icon: "GraduationCap" }
    ],
    academicPrograms: [
      {
        title: "MPC Combination (Mathematics, Physics, Computer Science)",
        code: "MPC",
        description: "A high-demand A'Level science combination focusing on advanced calculus, physical mechanics, software fundamentals, and digital literacy.",
        icon: "Cpu"
      },
      {
        title: "HGL Combination (History, Geography, Language)",
        code: "HGL",
        description: "An enriched A'Level humanities pathway exploring African & World history, physical geography, environmental systems, and literature.",
        icon: "BookOpen"
      },
      {
        title: "Ordinary Level (O'Level S1 - S3) General Education",
        code: "O'Level",
        description: "Comprehensive 3-year national lower secondary curriculum covering mathematics, physics, chemistry, biology, history, geography, Kinyarwanda, English, and French.",
        icon: "GraduationCap"
      },
      {
        title: "ECD & Teacher Training Partnership (TTC Gacuba II)",
        code: "TTC / ECD",
        description: "Direct collaboration with neighboring TTC Gacuba II for Early Childhood Development mentorship, practical teaching orientation, and community outreach.",
        icon: "HeartHandshake"
      }
    ],
    sportsAcademy: {
      title: "G.S Gacuba II A Athletic & Sports Academy",
      description: "At G.S Gacuba II A, athletics and academic rigor go hand-in-hand. Our school sports academy provides elite coaching in basketball, football, volleyball, and track athletics. Participating in Rubavu District and national FEASSSA school competitions, our student athletes build endurance, leadership, sportsmanship, and academic resilience.",
      image: "/assets/hero_athlete.jpg",
      features: [
        "Competitive Basketball program with active student league tournaments",
        "Football, Volleyball, and Athletics teams coached by certified sports instructors",
        "Sportsmanship, health education, and physical conditioning integrated into daily schedules",
        "Participation in Rubavu District and Inter-School FEASSSA games"
      ]
    },
    galleryItems: [],
    news: []
  }
];
