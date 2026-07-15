import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import AboutPage from "./AboutPage";
import {
  ArrowUpRight,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Dribbble,
  Instagram,
  Linkedin,
  Github,
  Sparkles,
  Send,
  Layers,
  Compass,
  ArrowRight,
  Mail,
  MapPin,
  Phone,
  Clock,
  ExternalLink,
  Cpu,
  Monitor,
  MousePointer2,
  PenTool,
  TrendingUp,
  MonitorSmartphone,
  Share2,
  Image as ImageIcon,
  BookOpen,
  Sliders,
  Play,
  LayoutGrid,
  Boxes,
  Clipboard,
  Brush,
  Code2,
  Globe,
  Triangle,
  Diamond,
  Figma,
  Framer,
  Film,
  Quote,
  ShoppingBag,
  Palette,
  CheckSquare,
  Volume2,
  Video,
  Wand2,
  FileText,
  Zap
} from "lucide-react";

// ==========================================
// 0. LOGO COMPONENT (EXACT SVG DESIGNED BY USER)
// ==========================================
function Logo({ className = "h-[38px]" }: { className?: string }) {
  return (
    <img
      src="https://lh3.googleusercontent.com/d/1Bz50pJBUhgW_BonXMZi9pQorMZkj9EQv"
      alt="Capri Monrose"
      className={`${className} object-contain`}
      referrerPolicy="no-referrer"
    />
  );
}

// ==========================================
// 1. MAGNETIC LINK COMPONENT
// ==========================================
function MagneticLink({
  children,
  href,
  onClick,
  className,
}: {
  children: React.ReactNode;
  href?: string;
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
}) {
  const linkRef = useRef<HTMLAnchorElement & HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!linkRef.current) return;
    const { left, top, width, height } = linkRef.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    // Pull factor: 0.25 (stretches up to a quarter of the offset)
    setPosition({ x: distanceX * 0.25, y: distanceY * 0.25 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  if (href) {
    return (
      <a
        ref={linkRef as any}
        href={href}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
        className={`relative inline-block transition-transform duration-200 ease-out group ${className}`}
        style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      ref={linkRef as any}
      type="button"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={`relative inline-block transition-transform duration-200 ease-out group ${className}`}
      style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
    >
      {children}
    </button>
  );
}

// ==========================================
// 2. CUSTOM CURSOR COMPONENT
// ==========================================
function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trailPosition, setTrailPosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isHidden, setIsHidden] = useState(true);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsHidden(false);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") !== null ||
        target.closest("button") !== null ||
        target.classList.contains("interactive") ||
        target.closest(".interactive") !== null;
      setIsHovered(!!isInteractive);
    };

    const handleMouseLeaveWindow = () => {
      setIsHidden(true);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseleave", handleMouseLeaveWindow);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeaveWindow);
    };
  }, []);

  // Smooth trail animation for the outer ring
  useEffect(() => {
    let animationFrameId: number;
    const updateTrail = () => {
      setTrailPosition((prev) => {
        const dx = position.x - prev.x;
        const dy = position.y - prev.y;
        return {
          x: prev.x + dx * 0.15,
          y: prev.y + dy * 0.15,
        };
      });
      animationFrameId = requestAnimationFrame(updateTrail);
    };
    animationFrameId = requestAnimationFrame(updateTrail);
    return () => cancelAnimationFrame(animationFrameId);
  }, [position]);

  if (isHidden) return null;

  return (
    <>
      <div
        className={`custom-cursor-dot cursor-difference ${isHovered ? "scale-[1.8] bg-cyan-400" : ""}`}
        style={{ left: `${position.x}px`, top: `${position.y}px` }}
      />
      <div
        className={`custom-cursor-ring cursor-difference ${
          isHovered ? "scale-[2.2] border-cyan-400 bg-white/5" : ""
        }`}
        style={{ left: `${trailPosition.x}px`, top: `${trailPosition.y}px` }}
      />
    </>
  );
}

// ==========================================
// 3. BREATHING ORB TRIO COMPONENT
// ==========================================
function BreathingOrbs({ scrollY }: { scrollY: number }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Orb 1: Violet/Purple, drifting, positive parallax */}
      <div
        className="absolute w-[350px] md:w-[600px] h-[350px] md:h-[600px] rounded-full blur-[100px] md:blur-[140px] animate-drift-1"
        style={{
          top: "5%",
          left: "-5%",
          background: "radial-gradient(circle, rgba(139, 92, 246, 0.18) 0%, rgba(10, 10, 15, 0) 70%)",
          transform: `translateY(${scrollY * 0.12}px)`,
        }}
      />

      {/* Orb 2: Cyan/Teal, drifting, negative parallax */}
      <div
        className="absolute w-[400px] md:w-[700px] h-[400px] md:h-[700px] rounded-full blur-[110px] md:blur-[150px] animate-drift-2"
        style={{
          top: "35%",
          right: "-10%",
          background: "radial-gradient(circle, rgba(6, 182, 212, 0.15) 0%, rgba(10, 10, 15, 0) 70%)",
          transform: `translateY(${scrollY * -0.06}px)`,
        }}
      />

      {/* Orb 3: Soft magenta/purple, drifting, rapid parallax */}
      <div
        className="absolute w-[300px] md:w-[500px] h-[300px] md:h-[500px] rounded-full blur-[90px] md:blur-[120px] animate-drift-3"
        style={{
          top: "65%",
          left: "20%",
          background: "radial-gradient(circle, rgba(168, 85, 247, 0.12) 0%, rgba(10, 10, 15, 0) 70%)",
          transform: `translateY(${scrollY * 0.18}px)`,
        }}
      />
    </div>
  );
}

// ==========================================
// 4. PROJECT CARD COMPONENT (SKELETON MOCK)
// ==========================================
function ProjectCard({
  number,
  title,
  category,
  description = "Sleek graphic viewport. Ready for you to inject your case study, creative layout, or brand asset details.",
  aspectRatio = "aspect-[16/10]",
  icon = <Compass className="w-8 h-8 text-white/20 group-hover:text-cyan-400 transition-colors duration-500" />,
  gradient = "from-violet-600/10 via-transparent to-cyan-500/10",
  imageUrl,
  onClick,
}: {
  number: string;
  title: string;
  category: string;
  description?: string;
  aspectRatio?: string;
  icon?: React.ReactNode;
  gradient?: string;
  imageUrl?: string;
  onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={`reveal group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/5 bg-white/[0.01] backdrop-blur-sm p-6 transition-all duration-500 hover:border-violet-500/30 hover:bg-white/[0.03] ${
        onClick ? "cursor-pointer hover:shadow-[0_25px_50px_rgba(139,92,246,0.06)]" : ""
      }`}
    >
      {/* Decorative corners */}
      <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      {/* Mock Graphic Frame */}
      <div className={`relative w-full ${aspectRatio} rounded-xl overflow-hidden bg-black/50 border border-white/5 mb-6 flex items-center justify-center`}>
        {imageUrl ? (
          <>
            <img
              src={imageUrl}
              alt={title}
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Subtle premium dark gradient overlay over image to integrate with theme */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-85 group-hover:opacity-60 transition-opacity duration-500 pointer-events-none" />
          </>
        ) : (
          <>
            {/* Abstract design grid */}
            <div
              className="absolute inset-0 opacity-10 transition-opacity duration-500 group-hover:opacity-20"
              style={{
                backgroundImage: `
                  radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                  linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
                `,
                backgroundSize: "16px 16px, 32px 32px, 32px 32px",
              }}
            />

            {/* Dynamic color flare */}
            <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-30 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`} />

            {/* Geometric aesthetic elements */}
            <div className="relative w-28 h-28 rounded-full border border-white/5 flex items-center justify-center transition-all duration-700 group-hover:border-white/10 group-hover:scale-105">
              {/* Dashed outer spinner */}
              <div className="absolute w-20 h-20 border-t-2 border-b-2 border-dashed border-violet-500/20 rounded-full animate-spin [animation-duration:16s] group-hover:border-violet-500/40" />
              {/* Solid nested ring */}
              <div className="absolute w-14 h-14 border border-cyan-400/10 rounded-full transition-all duration-500 group-hover:border-cyan-400/30 group-hover:rotate-180" />
              {icon}
            </div>
          </>
        )}
      </div>

      <div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-[11px] font-mono tracking-widest text-violet-400 uppercase font-semibold">
            {number}
          </span>
          <span className="text-[10px] font-mono tracking-widest text-white/40 uppercase">
            {category}
          </span>
        </div>
        <h4 className="font-display text-lg md:text-xl font-bold tracking-tight text-white/90 group-hover:text-white transition-colors duration-300">
          {title}
        </h4>
        <p className="text-[14px] text-white/50 font-sans mt-2 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}

// ==========================================
// 4.5 PROJECTS PAGE COMPONENTS & DATA
// ==========================================

export interface ProjectType {
  id: string;
  title: string;
  number: string;
  eyebrow: string;
  tags: string[];
  category: string;
  subCategory: string;
  description: string;
  imageUrl: string;
  gradient: string;
  role: string;
  timeline: string;
  tools: string[];
  client: string;
  challenge: string;
  strategy: string;
  results: string[];
  gallery: string[];
  galleryItems?: {
    url: string;
    title: string;
    description: string;
  }[];
}

const ALL_PROJECTS: ProjectType[] = [
  {
    id: "golden-crown",
    title: "Golden Crown Limousine",
    number: "01",
    eyebrow: "BRANDING // MARKETING",
    tags: ["BRANDING", "MARKETING", "WEB & UX/UI", "SOCIAL & CONTENT"],
    category: "Branding",
    subCategory: "Identity & Marketing Campaign",
    description: "Client required a comprehensive brand identity to reflect its premium service standards. I developed a cohesive visual presence across all customer touchpoints, including the logo, brand guidelines, website, and social media which was specifically designed to attract luxury travelers and corporate clients.",
    imageUrl: "https://lh3.googleusercontent.com/d/1aXA9PgIAEVX2sOKCZwDvcMQHsGL89A6h",
    gradient: "from-violet-600/20 via-transparent to-cyan-500/20",
    role: "Lead Brand Designer & Strategist",
    timeline: "4 Months (2025)",
    tools: ["Photoshop", "Illustrator", "InDesign", "Lightroom"],
    client: "Golden Crown Luxury Transportation",
    challenge: "The existing brand lacked the visual presence expected within the luxury transportation market. Without a consistent identity or strong digital presence, it struggled to communicate the elevated experience customers expect when choosing premium transportation services.",
    strategy: "Centered on creating a sophisticated brand system inspired by luxury hospitality. Every element, from typography and color palette to photography direction, website design, and social media content was crafted to communicate elegance, reliability, and exclusivity while delivering a seamless experience across every touch point.",
    results: [
      "35% Increase in corporate contract acquisitions within 3 months of rollout.",
      "Established a comprehensive brand guidelines book for drivers, partners, and internal staff.",
      "Designed dynamic advertising assets that drove a 40% higher click-through-rate on campaigns."
    ],
    gallery: [
      "https://lh3.googleusercontent.com/d/1qUXz-LvFEgAXnLQy6HaAsYdSkMeoh79C",
      "https://lh3.googleusercontent.com/d/16fOiPR2SCEbf5h6gB-R_tz9QBPF7kFf_",
      "https://lh3.googleusercontent.com/d/15bngla2_JYGCAGNGBYR2CLy-qCJg15pu",
      "https://lh3.googleusercontent.com/d/1mRNA-ZQDM3BfOO1RF81Q04NtDmNJAmQ_",
      "https://lh3.googleusercontent.com/d/11SImbsx0EAR5lNZ-8ykLaMvM6SAoE42p"
    ],
    galleryItems: [
      {
        url: "https://lh3.googleusercontent.com/d/1aXA9PgIAEVX2sOKCZwDvcMQHsGL89A6h",
        title: "LOGO DESIGN // BRANDING",
        description: "BRAND IDENTITY INSPIRED BY LUXURY, PROFESSIONALISM, AND TRUST."
      },
      {
        url: "https://lh3.googleusercontent.com/d/1qUXz-LvFEgAXnLQy6HaAsYdSkMeoh79C",
        title: "BRAND GUIDELINES // BRANDING",
        description: "BUILDING BRAND CONSISTENCY"
      },
      {
        url: "https://lh3.googleusercontent.com/d/16fOiPR2SCEbf5h6gB-R_tz9QBPF7kFf_",
        title: "WEB & UX/UI",
        description: "DESIGNED TO REFLECT A PREMIUM CUSTOMER EXPERIENCE."
      },
      {
        url: "https://lh3.googleusercontent.com/d/15bngla2_JYGCAGNGBYR2CLy-qCJg15pu",
        title: "WEB // MARKETING",
        description: "BUILT TO SUPPORT MARKETING CAMPAIGNS"
      },
      {
        url: "https://lh3.googleusercontent.com/d/1mRNA-ZQDM3BfOO1RF81Q04NtDmNJAmQ_",
        title: "SOCIAL MEDIA & CONTENT",
        description: "GROWING BRAND PRESENCE"
      },
      {
        url: "https://lh3.googleusercontent.com/d/11SImbsx0EAR5lNZ-8ykLaMvM6SAoE42p",
        title: "SOCIAL MEDIA // MARKETING",
        description: "ADVERTISING DESIGNED TO INCREASE VISIBILITY, GENERATE LEADS, AND DRIVE CUSTOMER ENGAGEMENT."
      }
    ]
  },
  {
    id: "mdc-sharks",
    title: "Miami Dade College Sharks",
    number: "02",
    eyebrow: "BRANDING // SOCIAL & CONTENT",
    tags: ["BRANDING", "SOCIAL & CONTENT", "PRINT"],
    category: "Social & Content",
    subCategory: "Athletic Brand Reimagining",
    description: "The project reimagines the team's visual identity through a cohesive system spanning logos, uniforms, social media, venue graphics, and digital experiences. Resulting in a brand built to inspire school pride, engage fans, and unify every sport under one recognizable identity.",
    imageUrl: "https://lh3.googleusercontent.com/d/1TrD8GhPv4nefo7EsAfeEmNNh_48dunBd",
    gradient: "from-cyan-500/20 via-transparent to-fuchsia-500/20",
    role: "Identity Designer",
    timeline: "6 Months (2024)",
    tools: ["Illustrator", "Photoshop", "After Effects"],
    client: "Miami Dade College Athletics Dept.",
    challenge: "The existing athletic identity lacked the energy, consistency, and flexibility expected of today's collegiate sports programs. The goal was to modernize the brand while preserving the Sharks' legacy, creating a visual system that could perform seamlessly across uniforms, digital media, environmental graphics, and game-day experiences.",
    strategy: "Inspired by professional sports branding, I developed a bold visual identity centered around versatility and consistency. From uniforms and social graphics to arena signage and jumbotron content, everything was designed to work together as one cohesive athletic brand that strengthens school pride and enhances the fan experience.",
    results: [
      "Achieved full athletic program adoption across all 8 sports divisions.",
      "Generated a 150% boost in school bookstore athletic apparel sales.",
      "Provided a modular digital system enabling instant social media template creation."
    ],
    gallery: [
      "https://lh3.googleusercontent.com/d/1bhnOWXXJYr5k3TENBYdidRmH9JdyJbmX",
      "https://lh3.googleusercontent.com/d/1zu3Em6HoOrHOcMlrxdIWZv99_wtHzSL2",
      "https://lh3.googleusercontent.com/d/1MYjvuhtbgFoTMvaioy0CVNAtMiFmi1Di",
      "https://lh3.googleusercontent.com/d/1Fk45TizJ-fCGSHDEBGPeIChDZHOv6K2S",
      "https://lh3.googleusercontent.com/d/1ZCX17StubOowJw1tHt7q9L40zy2-vVCh"
    ],
    galleryItems: [
      {
        url: "https://lh3.googleusercontent.com/d/1TrD8GhPv4nefo7EsAfeEmNNh_48dunBd",
        title: "LOGO DESIGN // BRANDING",
        description: "REIMAGINING THE SHARKS WITH A BOLD, CONTEMPORARY VISUAL IDENTITY"
      },
      {
        url: "https://lh3.googleusercontent.com/d/1bhnOWXXJYr5k3TENBYdidRmH9JdyJbmX",
        title: "BRANDING",
        description: "DEFINING THE VISUAL STANDARDS FOR EVERY ATHLETIC TOUCHPOINT."
      },
      {
        url: "https://lh3.googleusercontent.com/d/1zu3Em6HoOrHOcMlrxdIWZv99_wtHzSL2",
        title: "BRANDING // UNIFORM DESIGN",
        description: "UNIFIED UNIFORMS CREATED ACROSS BASKETBALL, VOLLEYBALL, AND BASEBALL PROGRAMS."
      },
      {
        url: "https://lh3.googleusercontent.com/d/1MYjvuhtbgFoTMvaioy0CVNAtMiFmi1Di",
        title: "SOCIAL MEDIA & CONTENT",
        description: "DESIGN TEMPLATES TO ENGAGE FANS THROUGH EVERY STAGE OF THE SEASON."
      },
      {
        url: "https://lh3.googleusercontent.com/d/1Fk45TizJ-fCGSHDEBGPeIChDZHOv6K2S",
        title: "BRANDING // PRINT",
        description: "BRANDING BEYOND THE COURTS & FIELDS."
      },
      {
        url: "https://lh3.googleusercontent.com/d/1ZCX17StubOowJw1tHt7q9L40zy2-vVCh",
        title: "BRANDING // DIGITAL",
        description: "SCOREBOARD VISUALS BUILT TO ENERGIZE ATHLETES AND ENGAGE FANS."
      }
    ]
  },
  {
    id: "workeasy",
    title: "WorkEasy Software Ecosystem",
    number: "03",
    eyebrow: "BRANDING // MARKETING",
    tags: ["BRANDING", "MARKETING", "WEB & UX/UI", "SOCIAL & CONTENT", "PRINT"],
    category: "Branding",
    subCategory: "Marketing",
    description: "Following a company-wide name change, WorkEasy Software needed more than a new logo. It required an entirely new brand ecosystem. As Lead Graphic Designer, I helped shape the company's identity across digital, print, product, marketing, trade shows, and internal communications, ensuring every customer and employee touchpoint reflected a cohesive and modern enterprise brand.",
    imageUrl: "https://lh3.googleusercontent.com/d/1yqqqbFKTZDoeEVZusofvqcYdg4VZ_EwS",
    gradient: "from-fuchsia-600/20 via-transparent to-violet-500/20",
    role: "Art Director & UX Designer",
    timeline: "5 Months (2025)",
    tools: ["Figma", "Illustrator", "Adobe XD", "Miro"],
    client: "WorkEasy Tech Group Inc.",
    challenge: "A legal name dispute required the company to transition to a new identity without disrupting customer trust or market recognition. The challenge extended beyond rebranding. It meant rebuilding every visual touchpoint while supporting multiple product lines, ongoing marketing initiatives, conventions, software launches, and internal communications.",
    strategy: "Rather than treating the rebrand as a single design project, I developed a scalable visual system that could evolve alongside the business. From brand guidelines and websites to product launches, advertising campaigns, trade show experiences, software interfaces, video production, and internal communications, every deliverable was designed to reinforce a unified brand while supporting sales, marketing, and product teams.",
    results: [
      "Improved brand recall and trust across customer touchpoints.",
      "Helped decrease user onboarding friction by 22% with aligned documentation layouts.",
      "Empowered engineering teams to build features 2x faster using the unified UI system."
    ],
    gallery: [
      "https://lh3.googleusercontent.com/d/1iVfHgwVsIEAN5L3LSyOPZBYeQDwbFCO_",
      "https://lh3.googleusercontent.com/d/1-K9ZgLEp7sPNGn0xBKzlM_twUmiBOgJM",
      "https://lh3.googleusercontent.com/d/1BoXI2FQjBnvSXRJccMif3bVcAtB8moej",
      "https://lh3.googleusercontent.com/d/171LdQtQuWK6qm1wQqxMmyfCMJEGWYQXk"
    ],
    galleryItems: [
      {
        url: "https://lh3.googleusercontent.com/d/1yqqqbFKTZDoeEVZusofvqcYdg4VZ_EwS",
        title: "BRANDING",
        description: "A scalable brand system designed to support an expanding company."
      },
      {
        url: "https://lh3.googleusercontent.com/d/1iVfHgwVsIEAN5L3LSyOPZBYeQDwbFCO_",
        title: "WEB & UX/UI",
        description: "A responsive digital experience built to communicate trust, innovation, and enterprise solutions."
      },
      {
        url: "https://lh3.googleusercontent.com/d/1-K9ZgLEp7sPNGn0xBKzlM_twUmiBOgJM",
        title: "MARKETING",
        description: "Integrated campaigns spanning Google Ads, Meta, email marketing and landing pages."
      },
      {
        url: "https://lh3.googleusercontent.com/d/1BoXI2FQjBnvSXRJccMif3bVcAtB8moej",
        title: "BRANDING // PRINT",
        description: "Print solutions that strengthen the brand."
      },
      {
        url: "https://lh3.googleusercontent.com/d/171LdQtQuWK6qm1wQqxMmyfCMJEGWYQXk",
        title: "Social Media & Content",
        description: "Content created to educate, engage, and promote products across multiple platforms."
      }
    ]
  },
  {
    id: "good-roads",
    title: "Good Roads Auto Systems",
    number: "04",
    eyebrow: "BRANDING // SOCIAL & CONTENT",
    tags: ["BRANDING", "MARKETING", "WEB & UX/UI", "SOCIAL & CONTENT", "PRINT"],
    category: "Marketing",
    subCategory: "Branding",
    description: "Good Roads Auto Systems was a multi-brand wheel manufacturer serving both wholesale distributors and automotive enthusiasts. As the sole in-house Graphic Designer, I helped grew five distinct brands by developing cohesive marketing campaigns, digital experiences, print collateral, and content tailored to different audiences.",
    imageUrl: "https://lh3.googleusercontent.com/d/1lupSwieSUE0CZTUtvPd8513-U83tqYpF",
    gradient: "from-violet-600/20 via-transparent to-cyan-500/20",
    role: "In-House Graphic Designer",
    timeline: "4 Months (2025)",
    tools: ["Photoshop", "Illustrator", "InDesign", "Lightroom"],
    client: "Good Roads Auto Systems",
    challenge: "When I joined the team, the company's marketing efforts were heavily focused on B2B sales, with minimal social media presence and limited direct engagement with consumers. The challenge was to establish a stronger digital presence while maintaining each brand's unique personality and supporting the company's wholesale business.",
    strategy: "I developed a marketing system that balanced consistency with individuality across five brands. From websites and annual catalogs to photography, social media, email campaigns, event coverage, and promotional materials, every deliverable was designed to strengthen brand recognition and create meaningful connections with both dealers and consumers.",
    results: [
      "35% Increase in corporate contract acquisitions within 3 months of rollout.",
      "Established a comprehensive brand guidelines book for drivers, partners, and internal staff.",
      "Designed dynamic advertising assets that drove a 40% higher click-through-rate on campaigns."
    ],
    gallery: [
      "https://lh3.googleusercontent.com/d/1cF_7OAazIRgYvBKtxxewEAzpHE30Yzrz",
      "https://lh3.googleusercontent.com/d/1rfwqWw60Dn8PDTLlv87iwpKq7SqVprbc",
      "https://lh3.googleusercontent.com/d/126SPmDv2FWAL_7qGNZPYP3d9_VS9Wby1",
      "https://lh3.googleusercontent.com/d/11ZtgRJCjF1uolLB2Q8xjonTycJp0E3z5"
    ],
    galleryItems: [
      {
        url: "https://lh3.googleusercontent.com/d/1lupSwieSUE0CZTUtvPd8513-U83tqYpF",
        title: "Branding",
        description: "Managing distinct identities while maintaining consistency across an entire brand portfolio."
      },
      {
        url: "https://lh3.googleusercontent.com/d/1cF_7OAazIRgYvBKtxxewEAzpHE30Yzrz",
        title: "Web",
        description: "Responsive websites tailored to each audience and product line."
      },
      {
        url: "https://lh3.googleusercontent.com/d/1rfwqWw60Dn8PDTLlv87iwpKq7SqVprbc",
        title: "Marketing // Print",
        description: "Packaging, annual catalogs, brochures, promotional materials, and product collateral."
      },
      {
        url: "https://lh3.googleusercontent.com/d/126SPmDv2FWAL_7qGNZPYP3d9_VS9Wby1",
        title: "Social Media & Content",
        description: "Growing communities for each brand with engaging content through social media platforms."
      },
      {
        url: "https://lh3.googleusercontent.com/d/11ZtgRJCjF1uolLB2Q8xjonTycJp0E3z5",
        title: "Photography",
        description: "Capturing the brand through visual content showcasing the product in their natural environment."
      }
    ]
  },
  {
    id: "more-projects",
    title: "More Projects",
    number: "05",
    eyebrow: "BRANDING // MARKETING",
    tags: ["BRANDING"],
    category: "Branding",
    subCategory: "Marketing",
    description: "Throughout my career, I've partnered with businesses across a wide range of industries to develop brand identities, websites, marketing materials, and promotional assets. Each project presented its own goals, audience, and creative direction, giving me the opportunity to adapt my approach while delivering thoughtful design solutions that reflected each client's unique identity.",
    imageUrl: "https://lh3.googleusercontent.com/d/1gBR0ZLOQXIbcsn4j0tGBWcM1Tm260ZlB",
    gradient: "from-rose-500/20 via-transparent to-violet-500/20",
    role: "Senior Graphic Designer & Brand Builder",
    timeline: "2024 - 2026",
    tools: ["Photoshop", "Illustrator", "InDesign", "Figma"],
    client: "Various Clients",
    challenge: "No two clients had the same vision or audience. From marine services and construction to automotive, events, and marketing agencies, each project required a unique visual identity while staying true to the client's goals, personality, and industry.",
    strategy: "Every project began with understanding the client's business and audience before developing a visual direction that fit their brand. Whether creating a logo, building a website, designing apparel, or producing marketing materials, the focus was always on delivering work that was functional, memorable, and built to support their long term goals.",
    results: [
      "Collaborated with diverse businesses to design custom logos, visual systems, and marketing assets.",
      "Developed multiple responsive websites and digital storefronts to enhance client online presence.",
      "Designed a wide array of high-quality print materials, fleet graphics, and merchandise packages."
    ],
    gallery: [
      "https://lh3.googleusercontent.com/d/11CS0Azvb5AD3uLKGYrr2BfpZ_JeAEDI-",
      "https://lh3.googleusercontent.com/d/1AQVepGcyWug13rhE1V0g6VfJcPQzUuQa",
      "https://lh3.googleusercontent.com/d/16BU2ViAfWYWF0wOBu5r_8_ofZsFN1Wxh",
      "https://lh3.googleusercontent.com/d/1o7xTKfbLG1zWb4yrSPnt_7JEGn2lGv1m",
      "https://lh3.googleusercontent.com/d/1eZPaW0LvVbqLXx238JB70DwAnaUTcGNu"
    ],
    galleryItems: [
      {
        url: "https://lh3.googleusercontent.com/d/1gBR0ZLOQXIbcsn4j0tGBWcM1Tm260ZlB",
        title: "Complete Brand Experience",
        description: "Logo, E-commerce website, and marketing collateral."
      },
      {
        url: "https://lh3.googleusercontent.com/d/11CS0Azvb5AD3uLKGYrr2BfpZ_JeAEDI-",
        title: "Building Digital Presence",
        description: "Brand identity and responsive agency website."
      },
      {
        url: "https://lh3.googleusercontent.com/d/1AQVepGcyWug13rhE1V0g6VfJcPQzUuQa",
        title: "Luxury Brand Identity",
        description: "Branding designed for premium events and experiences."
      },
      {
        url: "https://lh3.googleusercontent.com/d/16BU2ViAfWYWF0wOBu5r_8_ofZsFN1Wxh",
        title: "Brand On The Move",
        description: "Logo and fleet graphics for a mobile service business."
      },
      {
        url: "https://lh3.googleusercontent.com/d/1o7xTKfbLG1zWb4yrSPnt_7JEGn2lGv1m",
        title: "Personality Through Branding",
        description: "Custom logo and branded apparel with a bold character."
      },
      {
        url: "https://lh3.googleusercontent.com/d/1eZPaW0LvVbqLXx238JB70DwAnaUTcGNu",
        title: "Celebrating Community",
        description: "Carnival branding and promotional merchandise."
      }
    ]
  }
];

// ------------------------------------------
// PROJECTS CATALOG COMPONENT
// ------------------------------------------
function ProjectsCatalog({ onSelectProject }: { onSelectProject: (p: ProjectType) => void }) {
  const [activeTab, setActiveTab] = useState<string>("ALL");

  const categories = ["ALL", "BRANDING", "MARKETING", "WEB & UX/UI", "SOCIAL & CONTENT", "PRINT"];

  const filteredProjects = ALL_PROJECTS.filter((p) => {
    if (activeTab === "ALL") return true;
    return p.tags?.some(t => t.toUpperCase() === activeTab.toUpperCase());
  });

  return (
    <div className="py-24 md:py-32 relative z-10 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        
        {/* Intro Section with Premium Framing */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16 border-b border-white/5 pb-10">
          <div className="max-w-2xl">
            <span className="text-[11px] font-mono tracking-[0.3em] text-[#06B6D4] uppercase font-semibold block mb-2">
              PORTFOLIO // SELECTED WORK
            </span>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
              Design with <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] to-[#06B6D4]">Authority</span>
            </h2>
          </div>
          <p className="text-white/50 text-[16px] sm:text-[18px] max-w-xl font-sans leading-relaxed">
            Explore a collection of strategic branding, digital, and marketing projects designed to solve problems, engage audiences, and deliver results.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="flex flex-wrap gap-2.5 mb-12">
          {categories.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2.5 rounded-full text-[10px] sm:text-xs font-mono font-bold tracking-widest uppercase transition-all duration-300 border ${
                  isActive
                    ? "bg-gradient-to-r from-[#8B5CF6] to-[#06B6D4] text-white border-transparent shadow-lg shadow-[#8B5CF6]/15 hover:shadow-[#8B5CF6]/25 scale-[1.03]"
                    : "bg-white/[0.02] text-white/50 border-white/10 hover:text-white hover:border-white/25 hover:bg-white/[0.04]"
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* Count Label */}
        <div className="mb-8 flex justify-between items-center text-white/40 font-mono text-[10px] tracking-widest uppercase">
          <span>SHOWING {filteredProjects.length} OUT OF {ALL_PROJECTS.length} CURATED PROJECTS</span>
          <span className="hidden sm:inline">REF // ALL_RECORDS_ACTIVE</span>
        </div>

        {/* Grid Layout (2 Columns instead of 3, making grid larger) */}
        <AnimatePresence mode="popLayout">
          {filteredProjects.length > 0 ? (
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12"
            >
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  onClick={() => onSelectProject(project)}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/5 bg-white/[0.01] backdrop-blur-sm p-6 transition-all duration-500 hover:border-violet-500/30 hover:bg-white/[0.03] hover:shadow-[0_25px_50px_rgba(139,92,246,0.06)] cursor-pointer"
                >
                  {/* Corners decorative markers */}
                  <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  {/* Image Frame */}
                  <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden bg-black/50 border border-white/5 mb-6">
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      referrerPolicy="no-referrer"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent opacity-90 group-hover:opacity-75 transition-opacity duration-500 pointer-events-none" />
                    
                    {/* Concept Badge positioned inside the frame, top-left */}
                    {project.id === "mdc-sharks" && (
                      <span className="absolute top-4 left-4 z-10 px-2.5 py-1 rounded bg-[#0A0A0F]/85 backdrop-blur-md text-[9px] font-mono font-bold text-cyan-400 border border-cyan-500/30 uppercase tracking-widest shadow-lg">
                        CONCEPT
                      </span>
                    )}
                  </div>

                  {/* Text Details */}
                  <div>
                    <div className="flex justify-between items-center mb-2.5">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] sm:text-[11px] font-mono tracking-widest text-[#06B6D4] uppercase font-bold">
                          {project.eyebrow}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono tracking-widest text-white/30 uppercase">
                        {project.number} // SPEC
                      </span>
                    </div>
                    <h3 className="font-display text-lg sm:text-xl font-bold tracking-tight text-white/90 group-hover:text-white transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-[13px] sm:text-[14px] text-white/50 font-sans mt-2.5 leading-relaxed font-light">
                      {project.description}
                    </p>

                    <div className="mt-6 pt-5 border-t border-white/5 flex items-center justify-between">
                      <span className="text-[12px] font-mono font-bold tracking-widest text-white/40 uppercase group-hover:text-white/80 transition-colors">
                        EXPLORE PROJECT DETAILS
                      </span>
                      <ArrowUpRight className="w-4 h-4 text-[#8B5CF6] group-hover:text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-24 text-center border border-dashed border-white/10 rounded-2xl bg-white/[0.01] backdrop-blur-sm"
            >
              <Sliders className="w-10 h-10 text-white/20 mx-auto mb-4" />
              <h4 className="font-display text-lg font-bold text-white mb-2 uppercase tracking-wide">NO MATCHING CASE STUDIES FOUND</h4>
              <p className="text-white/40 text-sm max-w-md mx-auto font-sans leading-relaxed px-6">
                We couldn't find any projects matching your parameters. Try updating your filters.
              </p>
              <button
                onClick={() => { setActiveTab("ALL"); }}
                className="mt-6 inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold tracking-widest bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white transition-all font-mono uppercase"
              >
                RESET FILTERS
              </button>
            </motion.div>
          )}
        </AnimatePresence>



      </div>
    </div>
  );
}

// ------------------------------------------
// PROJECT DETAIL MODAL COMPONENT
// ------------------------------------------
// ------------------------------------------
// PROJECT DETAIL VIEW COMPONENT (SPLIT-SCREEN ART DIRECTION)
// ------------------------------------------
function ProjectDetailView({ project, onBack }: { project: ProjectType; onBack: () => void }) {
  const [activeLightBoxIndex, setActiveLightBoxIndex] = useState<number | null>(null);

  const allImages = [project.imageUrl, ...project.gallery];

  // Handle lightbox keyboard navigation
  useEffect(() => {
    if (activeLightBoxIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        setActiveLightBoxIndex((prev) => (prev !== null ? (prev - 1 + allImages.length) % allImages.length : null));
      } else if (e.key === "ArrowRight") {
        setActiveLightBoxIndex((prev) => (prev !== null ? (prev + 1) % allImages.length : null));
      } else if (e.key === "Escape") {
        setActiveLightBoxIndex(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeLightBoxIndex, allImages.length]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className={`relative max-w-7xl mx-auto px-6 md:px-12 pt-32 pb-16 ${activeLightBoxIndex !== null ? 'z-[9999]' : 'z-10'}`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        
        {/* LEFT COLUMN: SCROLLABLE IMAGE GALLERY (60% split) */}
        <div className="lg:col-span-7 space-y-8">
          {/* Intro Cover Image */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            onClick={() => setActiveLightBoxIndex(0)}
            className="relative aspect-[16/10] sm:aspect-[16/9] bg-[#0C0C14] rounded-2xl overflow-hidden border border-white/10 group shadow-2xl cursor-zoom-in"
          >
            <img
              src={project.imageUrl}
              alt={`${project.title} Intro Cover`}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-103"
              onError={(e) => {
                e.currentTarget.src = project.gallery[0] || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-85 pointer-events-none" />
          </motion.div>

          {/* 5-Image Gallery */}
          <div className="space-y-8">
            {project.gallery.map((imgUrl, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.8, delay: i * 0.05, ease: "easeOut" }}
                onClick={() => setActiveLightBoxIndex(i + 1)}
                className="relative aspect-[16/10] sm:aspect-[16/9] bg-[#0C0C14] rounded-2xl overflow-hidden border border-white/10 group shadow-2xl cursor-zoom-in"
              >
                <img
                  src={imgUrl}
                  alt={`${project.title} Detail Layout 0${i + 1}`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-103"
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-80 pointer-events-none" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: STATIC COPY (40% split - styled as sticky panel) */}
        <div className="lg:col-span-5 lg:sticky lg:top-32 self-start">
          <div className="flex flex-col justify-between space-y-6 text-left border border-white/5 bg-white/[0.01] backdrop-blur-md p-6 sm:p-8 rounded-2xl shadow-2xl relative overflow-hidden group hover:border-cyan-500/10 transition-all duration-500 max-h-[calc(100vh-180px)] overflow-y-auto no-scrollbar">
            {/* Dynamic background subtle neon glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#8B5CF6]/5 via-transparent to-[#06B6D4]/5 opacity-60 pointer-events-none rounded-2xl" />
            <div className="absolute inset-0 bg-grid-small opacity-[0.02] pointer-events-none rounded-2xl" />

            <div className="relative z-10 space-y-6">
              {/* Eyebrow */}
              <div>
                <span className="text-[11px] font-mono tracking-[0.3em] text-[#06B6D4] uppercase font-bold block mb-1">
                  {project.eyebrow}
                </span>
                <h1 className="font-display text-[15px] sm:text-[19px] lg:text-[23px] font-extrabold tracking-tight text-white leading-tight">
                  {project.title}
                </h1>
              </div>

              {/* Overview Section */}
              <div className="space-y-3.5 pt-4 border-t border-white/5">
                <h4 className="text-[11px] font-mono tracking-[0.2em] text-white/40 uppercase font-bold">
                  OVERVIEW
                </h4>
                <p className="text-white/70 text-[14px] leading-relaxed font-sans font-light">
                  {project.description}
                </p>
              </div>

              {/* The Challenge */}
              <div className="pt-4 border-t border-white/5">
                <h4 className="text-[11px] font-mono tracking-[0.2em] text-[#06B6D4] uppercase font-bold mb-1.5">
                  THE CHALLENGE
                </h4>
                <p className="text-white/60 text-[14px] leading-relaxed font-sans font-light">
                  {project.challenge}
                </p>
              </div>

              {/* The Creative Strategy */}
              <div className="pt-4 border-t border-white/5">
                <h4 className="text-[11px] font-mono tracking-[0.2em] text-[#06B6D4] uppercase font-bold mb-1.5">
                  THE CREATIVE STRATEGY
                </h4>
                <p className="text-white/60 text-[14px] leading-relaxed font-sans font-light">
                  {project.strategy}
                </p>
              </div>
            </div>

            {/* Inline CTA / Back block */}
            <div className="relative z-10 pt-4 border-t border-white/5 mt-auto flex items-center justify-between">
              <button
                onClick={onBack}
                className="inline-flex items-center gap-2 text-[11px] font-mono font-bold tracking-[0.2em] text-white/40 hover:text-white uppercase transition-colors bg-transparent border-0 cursor-pointer focus:outline-none p-0"
              >
                ← ALL PROJECTS
              </button>
              <span className="text-[9px] font-mono text-white/20 uppercase tracking-widest">
                DOC // REF_{project.id.toUpperCase()}
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* LIGHTBOX MODAL */}
      <AnimatePresence>
        {activeLightBoxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center p-2 sm:p-4"
            onClick={() => setActiveLightBoxIndex(null)}
          >
            {/* Main content container */}
            <div 
              className="relative w-full max-w-4xl aspect-[16/10] sm:aspect-[16/9] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Left Chevron */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveLightBoxIndex((prev) => (prev !== null ? (prev - 1 + allImages.length) % allImages.length : null));
                }}
                className="absolute -left-2 sm:-left-16 text-white/60 hover:text-white p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer z-51"
                title="Previous Image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Current Image */}
              <motion.div
                key={activeLightBoxIndex}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full rounded-2xl overflow-hidden border border-white/10 bg-[#0C0C14] shadow-2xl relative"
              >
                <img
                  src={allImages[activeLightBoxIndex]}
                  alt={`${project.title} Large View`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800";
                  }}
                />
              </motion.div>

              {/* Right Chevron */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveLightBoxIndex((prev) => (prev !== null ? (prev + 1) % allImages.length : null));
                }}
                className="absolute -right-2 sm:-right-16 text-white/60 hover:text-white p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer z-51"
                title="Next Image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Counter and info */}
            <div className="mt-6 flex flex-col items-center text-center gap-1.5 max-w-3xl px-6" onClick={(e) => e.stopPropagation()}>
              <span className="text-[10px] font-mono tracking-[0.3em] text-[#06B6D4] uppercase font-bold">
                VISUAL ASSET {activeLightBoxIndex + 1} // {allImages.length}
              </span>
              <h3 className="text-white text-base sm:text-lg font-bold uppercase tracking-wide">
                {(project.galleryItems?.[activeLightBoxIndex]?.title || 
                  (activeLightBoxIndex === 0 
                    ? (project.id === "golden-crown" ? "RESPONSIVE WEBSITE EXPERINCE" : "Cover Image // Architectural View") 
                    : `Detail Layout 0${activeLightBoxIndex}`)).toUpperCase()}
              </h3>
              {(project.galleryItems?.[activeLightBoxIndex]?.description || project.id === "golden-crown") && (
                <p className="text-white/60 text-xs sm:text-sm font-sans font-light tracking-wide uppercase">
                  {(project.galleryItems?.[activeLightBoxIndex]?.description || "").toUpperCase()}
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ==========================================
// 5. MAIN APP COMPONENT
// ==========================================
export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'projects' | 'about'>('home');
  const [selectedProject, setSelectedProject] = useState<ProjectType | null>(null);

  const [scrollY, setScrollY] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [testiIndex, setTestiIndex] = useState(0);

  // Smooth scroll depth tracking
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScroll = window.scrollY;
          setScrollY(currentScroll);
          setScrolled(currentScroll > 50);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // IntersectionObserver for Scroll Reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -60px 0px" }
    );

    const elements = document.querySelectorAll(".reveal");
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, [currentView]);

  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formError, setFormError] = useState("");

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (!contactName.trim() || !contactEmail.trim() || !contactMessage.trim()) {
      setFormError("ALL FIELDS ARE REQUIRED.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(contactEmail)) {
      setFormError("PLEASE ENTER A VALID EMAIL ADDRESS.");
      return;
    }

    setIsSubmitting(true);
    
    // Get Web3Forms access key from Vite env variables
    const accessKey = (import.meta as any).env.VITE_WEB3FORMS_ACCESS_KEY;
    
    if (accessKey) {
      try {
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: JSON.stringify({
            access_key: accessKey,
            name: contactName,
            email: contactEmail,
            message: contactMessage,
            subject: `New Portfolio Message from ${contactName}`,
            from_name: "Capri Portfolio Website"
          })
        });
        
        const data = await response.json();
        
        if (data.success) {
          setIsSubmitting(false);
          setIsSubmitted(true);
          setContactName("");
          setContactEmail("");
          setContactMessage("");
        } else {
          setFormError(data.message || "FAILED TO TRANSMIT MESSAGE. PLEASE VERIFY KEY.");
          setIsSubmitting(false);
        }
      } catch (err) {
        console.error("Form submission error:", err);
        setFormError("TRANSMISSION ERROR. PLEASE TRY AGAIN LATER.");
        setIsSubmitting(false);
      }
    } else {
      // Graceful local backup simulation when no key is configured yet
      // To ensure they know exactly what to do, we log instructions in console
      console.warn(
        "CONTACT FORM NOTICE: Real email deliveries are ready! Register a free access key at https://web3forms.com/ for caprimonrose@gmail.com, then add it to your environment variables as: VITE_WEB3FORMS_ACCESS_KEY"
      );
      
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
        setContactName("");
        setContactEmail("");
        setContactMessage("");
      }, 1200);
    }
  };

  const handleStartProjectClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#0A0A0F] text-white selection:bg-cyan-500/30 selection:text-white antialiased overflow-x-clip">
      {/* Visual background overlays */}
      <div className="noise-overlay" />
      <div className="absolute inset-0 bg-[#0A0A0F] z-[-2]" />
      
      {/* Custom difference cursor */}
      <CustomCursor />

      {/* Ambient drifting & parallaxis gradient orbs */}
      <BreathingOrbs scrollY={scrollY} />

      {/* ==========================================
          NAV BAR SECTION
          ========================================== */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled ? "nav-glass py-4 shadow-xl" : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          {/* Logo / Brand Title using the design's rounded gradient brand icon and tracking */}
          <button
            onClick={() => {
              setSelectedProject(null);
              setCurrentView('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="group flex items-center bg-transparent border-0 p-0 cursor-pointer text-left focus:outline-none"
          >
            <Logo className="h-[29px] sm:h-[34px] md:h-[38px] shrink-0 transform group-hover:scale-105 transition-transform duration-300" />
          </button>

          {/* Desktop Nav Links (Magnetic + Underlying Stretch) */}
          <div className="hidden lg:flex items-center gap-10">
            <MagneticLink
              onClick={() => {
                setSelectedProject(null);
                setCurrentView('projects');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`text-xs font-bold tracking-widest ${(currentView === 'projects' || selectedProject) ? 'text-cyan-400' : 'text-white/60'} hover:text-white`}
            >
              <span className="relative py-2">
                PROJECTS
                <span className={`absolute bottom-0 left-0 h-[1.5px] bg-gradient-to-r from-[#8B5CF6] to-[#06B6D4] transition-all duration-300 ${(currentView === 'projects' || selectedProject) ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
              </span>
            </MagneticLink>
            <MagneticLink
              onClick={() => {
                setSelectedProject(null);
                setCurrentView('about');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`text-xs font-bold tracking-widest ${currentView === 'about' && !selectedProject ? 'text-cyan-400' : 'text-white/60'} hover:text-white`}
            >
              <span className="relative py-2">
                ABOUT
                <span className={`absolute bottom-0 left-0 h-[1.5px] bg-gradient-to-r from-[#8B5CF6] to-[#06B6D4] transition-all duration-300 ${currentView === 'about' ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
              </span>
            </MagneticLink>
          </div>

          {/* Desktop CTA Pill & Hamburger */}
          <div className="flex items-center gap-4">
            <MagneticLink
              onClick={handleStartProjectClick}
              className="group/navSec hidden lg:inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-xs font-bold tracking-widest bg-white/[0.02] hover:bg-white/5 border border-white/15 hover:border-[#8b5cf6]/30 text-white/80 hover:text-white transition-all duration-300 uppercase font-mono"
            >
              <span className="flex items-center gap-2">
                LET'S TALK
                <ArrowRight className="w-3.5 h-3.5 text-[#8b5cf6] group-hover/navSec:translate-x-1 transition-transform duration-300" />
              </span>
            </MagneticLink>

            {/* Mobile Hamburger toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-white/80 hover:text-white transition-colors duration-200 interactive"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Nav Overlay Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 z-40 bg-[#0A0A0F]/95 backdrop-blur-xl flex flex-col justify-center px-8"
          >
            <div className="flex flex-col gap-8 text-center items-center justify-center">
              <button
                onClick={() => {
                  setSelectedProject(null);
                  setMobileMenuOpen(false);
                  setCurrentView('projects');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`font-display text-3xl font-extrabold tracking-wide hover:text-cyan-400 transition-colors bg-transparent border-0 cursor-pointer ${(currentView === 'projects' || selectedProject) ? 'text-cyan-400' : 'text-white'}`}
              >
                PROJECTS
              </button>
              <button
                onClick={() => {
                  setSelectedProject(null);
                  setMobileMenuOpen(false);
                  setCurrentView('about');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`font-display text-3xl font-extrabold tracking-wide hover:text-cyan-400 transition-colors bg-transparent border-0 cursor-pointer ${currentView === 'about' && !selectedProject ? 'text-cyan-400' : 'text-white'}`}
              >
                ABOUT
              </button>

              <div className="flex flex-col gap-4 mt-8 w-full max-w-[260px]">
                <button
                  onClick={(e) => {
                    setMobileMenuOpen(false);
                    window.open("https://drive.google.com/file/d/1qTmO-ohW1js2eQ-yly1TDbB9z7tnVErf/view?usp=sharing", "_blank");
                  }}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs font-bold tracking-widest bg-white/[0.04] hover:bg-white/10 border border-white/15 text-white/80 hover:text-white transition-all duration-300 uppercase font-mono cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-cyan-400" />
                  DOWNLOAD RESUME
                </button>
                <button
                  onClick={(e) => {
                    setMobileMenuOpen(false);
                    handleStartProjectClick(e);
                  }}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs font-bold tracking-widest bg-gradient-to-r from-[#8B5CF6] to-[#06B6D4] hover:opacity-90 hover:scale-[1.02] text-white shadow-lg shadow-[#8B5CF6]/15 hover:shadow-[#8B5CF6]/25 transition-all duration-300 uppercase font-mono cursor-pointer"
                >
                  LET'S TALK <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {selectedProject ? (
        <ProjectDetailView
          project={selectedProject}
          onBack={() => {
            setSelectedProject(null);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        />
      ) : currentView === 'home' ? (
        <>
          {/* ==========================================
              HERO SECTION (BLANK FRAMEWORK WITH NO DETAILS)
              ========================================== */}
          <header className="relative pt-32 pb-16 lg:pt-40 lg:pb-24 overflow-hidden z-10">
            {/* Architectural Perspective Grid */}
            <div className="perspective-grid" />

            {/* Scroll exploration indicator from Artistic Flair design */}
            <div className="absolute left-12 bottom-12 hidden xl:flex flex-col space-y-4 items-center">
              <div className="w-px h-24 bg-gradient-to-b from-transparent to-white/20"></div>
              <span className="text-[10px] [writing-mode:vertical-rl] rotate-180 tracking-[0.3em] text-white/20 uppercase font-bold">SCROLL TO EXPLORE</span>
            </div>

            <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative">
              <div className="flex flex-col items-center text-center">
                {/* Cascading animations for hero elements */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  className="flex items-center bg-white/5 border border-white/15 px-4 py-1.5 rounded-full text-[11px] font-mono tracking-[0.2em] text-[#06B6D4] uppercase mb-8 text-center"
                >
                  <span className="hidden sm:inline">SENIOR GRAPHIC DESIGNER // BRAND BUILDER</span>
                  <span className="sm:hidden text-center leading-relaxed">SENIOR GRAPHIC DESIGNER //<br />BRAND BUILDER</span>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="font-display text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[68px] leading-[1.2] font-extrabold tracking-tight mix-blend-difference mb-8 text-center"
                >
                  Designing brands with<br />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#8B5CF6] to-[#06B6D4]">
                    strategy, creativity,<br />
                    and purpose.
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="text-lg text-white/60 font-light leading-relaxed tracking-wide max-w-3xl mb-12"
                >
                  From branding and print to digital campaigns and AI-powered creative workflows, I develop design solutions that support business goals, strengthen brand presence, and drive engagement.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full sm:w-auto"
                >
                  <button
                    onClick={() => {
                      setCurrentView('projects');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-xs font-bold tracking-widest bg-gradient-to-r from-[#8B5CF6] to-[#06B6D4] hover:opacity-90 hover:scale-[1.03] text-white shadow-lg shadow-[#8B5CF6]/15 hover:shadow-[#8B5CF6]/25 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 uppercase font-mono w-full sm:w-auto cursor-pointer"
                  >
                    View Projects
                  </button>
                  <MagneticLink
                    onClick={(e) => {
                      e.preventDefault();
                      window.open("https://drive.google.com/file/d/1qTmO-ohW1js2eQ-yly1TDbB9z7tnVErf/view?usp=sharing", "_blank");
                    }}
                    className="group/heroSec inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-xs font-bold tracking-widest bg-white/[0.02] hover:bg-white/5 border border-white/15 hover:border-cyan-500/30 text-white/80 hover:text-white transition-all duration-300 uppercase font-mono w-full sm:w-auto"
                  >
                    <span className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-cyan-400" />
                      Download Resume
                    </span>
                  </MagneticLink>
                </motion.div>
              </div>
            </div>
          </header>

          {/* ==========================================
              PORTFOLIO WORK GRID PLACEHOLDER
              ========================================== */}
          <section id="work" className="py-24 md:py-32 relative z-10 px-6 md:px-12 bg-black/20">
            <div className="max-w-7xl mx-auto">
              {/* Section Header */}
              <div className="reveal flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16 border-b border-white/5 pb-10">
                <div>
                  <span className="text-[11px] font-mono tracking-[0.3em] text-[#06B6D4] uppercase font-semibold">
                    01 // FEATURED PROJECTS
                  </span>
                  <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mt-2">
                    Move Brands <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] to-[#06B6D4]">Forward</span>
                  </h2>
                </div>
                <p className="text-white/50 text-[18px] max-w-xl font-sans leading-relaxed">
                  From branding to large-scale marketing campaigns, these featured projects highlight my approach to strategy, storytelling, and design across print, digital, and experiential mediums.
                </p>
              </div>

              {/* Interactive Responsive Grid - 3 columns for 3 projects */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
                <ProjectCard
                   number="Branding // Marketing"
                   title="Golden Crown Limousine"
                   category=""
                   description="Elevating a premier transportation brand through luxury-focused identity, digital marketing campaigns, and elegant design touchpoints crafted to attract high-end and VIP clientele."
                   icon={<Sparkles className="w-8 h-8 text-white/20 group-hover:text-cyan-400 transition-colors duration-500" />}
                   gradient="from-violet-600/10 via-transparent to-cyan-500/15"
                   imageUrl="https://lh3.googleusercontent.com/d/1aXA9PgIAEVX2sOKCZwDvcMQHsGL89A6h"
                   onClick={() => {
                     const p = ALL_PROJECTS.find(proj => proj.id === "golden-crown");
                     if (p) setSelectedProject(p);
                   }}
                />
                <ProjectCard
                   number="BRANDING // SOCIAL & CONTENT"
                   title="Miami Dade College Sharks"
                   category="CONCEPT"
                   description="A modern reimagining of collegiate athletic identity, featuring clean logo redesigns, environmental graphics, merchandise systems, and social assets tailored for today's landscape."
                   icon={<Layers className="w-8 h-8 text-white/20 group-hover:text-cyan-400 transition-colors duration-500" />}
                   gradient="from-cyan-500/10 via-transparent to-fuchsia-500/15"
                   imageUrl="https://lh3.googleusercontent.com/d/1TrD8GhPv4nefo7EsAfeEmNNh_48dunBd"
                   onClick={() => {
                     const p = ALL_PROJECTS.find(proj => proj.id === "mdc-sharks");
                     if (p) setSelectedProject(p);
                   }}
                />
                <ProjectCard
                   number="BRANDING // MARKETING"
                   title="WorkEasy Software"
                   category=""
                   description="Led a complete brand transformation, delivering a cohesive identity across digital platforms, product experiences, marketing collateral, documentation, and internal assets."
                   icon={<Compass className="w-8 h-8 text-white/20 group-hover:text-cyan-400 transition-colors duration-500" />}
                   gradient="from-fuchsia-600/10 via-transparent to-violet-500/15"
                   imageUrl="https://lh3.googleusercontent.com/d/1yqqqbFKTZDoeEVZusofvqcYdg4VZ_EwS"
                   onClick={() => {
                     const p = ALL_PROJECTS.find(proj => proj.id === "workeasy");
                     if (p) setSelectedProject(p);
                   }}
                />
              </div>

              {/* Centered Interactive View All Link */}
              <div className="reveal flex justify-center mt-16">
                <button
                  onClick={() => {
                    setCurrentView('projects');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="group/all inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-xs font-bold tracking-widest bg-white/[0.02] hover:bg-white/5 border border-white/15 hover:border-[#8b5cf6]/30 text-white/80 hover:text-white transition-all duration-300 uppercase font-mono cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    VIEW ALL PROJECTS
                    <ArrowRight className="w-4 h-4 text-[#8b5cf6] group-hover/all:translate-x-1 transition-transform duration-300" />
                  </span>
                </button>
              </div>
            </div>
          </section>

      {/* ==========================================
          ABOUT ME SECTION
          ========================================== */}
      <section id="about" className="py-24 md:py-32 relative z-10 px-6 md:px-12 bg-black/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Column: Immersive Profile Photo Placeholder */}
            <div className="reveal lg:col-span-5 w-full">
              <div className="relative w-full aspect-[4/3] lg:aspect-[3/4] rounded-2xl border border-white/10 bg-[#0C0C14]/60 backdrop-blur-md overflow-hidden group shadow-2xl">
                {/* Embedded breathing aurora blob animation system */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                  <div className="absolute w-[200px] h-[200px] rounded-full blur-[50px] animate-drift-1 opacity-40"
                    style={{
                      top: "10%",
                      left: "-5%",
                      background: "radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, transparent 70%)"
                    }}
                  />
                  <div className="absolute w-[220px] h-[220px] rounded-full blur-[60px] animate-drift-2 opacity-35"
                    style={{
                      bottom: "10%",
                      right: "-5%",
                      background: "radial-gradient(circle, rgba(6, 182, 212, 0.4) 0%, transparent 70%)"
                    }}
                  />
                  <div className="absolute w-[180px] h-[180px] rounded-full blur-[45px] animate-drift-3 opacity-30"
                    style={{
                      top: "40%",
                      left: "30%",
                      background: "radial-gradient(circle, rgba(168, 85, 247, 0.3) 0%, transparent 70%)"
                    }}
                  />
                </div>

                {/* Subtle Grid texture overlay */}
                <div
                  className="absolute inset-0 opacity-[0.08] mix-blend-overlay z-20"
                  style={{
                    backgroundImage: "radial-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px)",
                    backgroundSize: "20px 20px",
                  }}
                />

                {/* Profile Photo */}
                <div className="absolute inset-0 z-10 rounded-2xl overflow-hidden">
                  <img
                    src="https://lh3.googleusercontent.com/d/1CLgoLykfdTSb0MKoMZjJwx-Sz1rBs-Wr"
                    alt="Capri Monrose"
                    className="w-full h-full object-cover rounded-2xl transition-transform duration-700 ease-out group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Elegant dark bottom fade mask */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F] via-transparent to-transparent opacity-90 z-20" />

                {/* Spec markings from Artistic Flair */}
                <div className="absolute top-4 left-4 text-[7px] font-mono tracking-widest text-white/30 z-20">
                  REF_09_PHOTO_SPEC
                </div>
                <div className="absolute bottom-4 right-4 text-[7px] font-mono tracking-widest text-cyan-400 z-20">
                  TRUE_ALIGN // LENS_C
                </div>
              </div>
            </div>

            {/* Right Column: Bio Content and Stats */}
            <div className="reveal lg:col-span-7 flex flex-col justify-center">
              <span className="text-[11px] font-mono tracking-[0.3em] text-[#06B6D4] uppercase font-bold">
                02 // MY STORY
              </span>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mt-2 mb-6">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] to-[#06B6D4]">Creative</span> by nature
              </h2>

              <p className="text-white/70 text-base sm:text-lg leading-relaxed mb-8 font-light">
                Creativity has always been part of who I am, from designing school event flyers as a kid to building brands and campaigns for businesses across multiple industries. Today, I bring that same passion and curiosity to every project, creating thoughtful design solutions that connect brands with people.
              </p>

              {/* 3 Highlight Stats */}
              <div className="grid grid-cols-3 gap-4 sm:gap-6 py-8 border-y border-white/5 mb-10 text-left">
                <div>
                  <span className="block text-2xl sm:text-3xl md:text-4xl font-extrabold font-display tracking-tight text-white">
                    10 +
                  </span>
                  <span className="block text-[11px] font-mono text-white/40 uppercase tracking-widest mt-1">
                    Years of Experience
                  </span>
                </div>
                <div>
                  <span className="block text-2xl sm:text-3xl md:text-4xl font-extrabold font-display tracking-tight text-white">
                    15+
                  </span>
                  <span className="block text-[11px] font-mono text-white/40 uppercase tracking-widest mt-1">
                    Industries Served
                  </span>
                </div>
                <div>
                  <span className="block text-2xl sm:text-3xl md:text-4xl font-extrabold font-display tracking-tight text-white">
                    100%
                  </span>
                  <span className="block text-[11px] font-mono text-white/40 uppercase tracking-widest mt-1">
                    Client Satisfied
                  </span>
                </div>
              </div>

              {/* Link to the contact section */}
              <div>
                <MagneticLink
                  onClick={handleStartProjectClick}
                  className="group/aboutBtn inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-xs font-bold tracking-widest bg-white/[0.02] hover:bg-white/5 border border-white/15 hover:border-[#8b5cf6]/30 text-white/80 hover:text-white transition-all duration-300 uppercase font-mono"
                >
                  <span className="flex items-center gap-2">
                    LET'S WORK TOGETHER
                    <ArrowRight className="w-4 h-4 text-[#8b5cf6] group-hover/aboutBtn:translate-x-1 transition-transform duration-300" />
                  </span>
                </MagneticLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          CAPABILITIES / SERVICES SECTION
          ========================================== */}
      <section id="capabilities" className="py-24 md:py-32 relative z-10 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="reveal flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16 border-b border-white/5 pb-10">
            <div>
              <span className="text-[11px] font-mono tracking-[0.3em] text-[#06B6D4] uppercase font-semibold">
                03 // CORE EXPERTISE
              </span>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mt-2">
                What I <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] to-[#06B6D4]">deliver</span>
              </h2>
            </div>
            <p className="text-white/50 text-[18px] max-w-xl font-sans leading-relaxed">
              Strategic creative solutions spanning branding, marketing, digital experiences, and content designed to drive results.
            </p>
          </div>

          {/* Interactive capabilities rows */}
          <div className="flex flex-col">
            {[
              {
                id: "C1",
                title: "LOGO & BRANDING",
                tagline: "BRAND IDENTITY",
                desc: "Building memorable brand identities through logos, visual systems, guidelines, and cohesive experiences across every touchpoint.",
                icon: <PenTool className="w-6 h-6 text-violet-400 group-hover:text-cyan-400 transition-colors" />,
              },
              {
                id: "C2",
                title: "MARKETING & ADVERTISING",
                tagline: "RESULTS-DRIVEN DESIGN",
                desc: "Creating high-converting marketing assets including digital ads, print collateral, campaigns, and lead-generation creative.",
                icon: <TrendingUp className="w-6 h-6 text-violet-400 group-hover:text-cyan-400 transition-colors" />,
              },
              {
                id: "C3",
                title: "WEB DESIGN & UX//UI",
                tagline: "DIGITAL EXPERIENCES",
                desc: "Designing intuitive websites, applications, and scalable design systems while leveraging AI-enhanced workflows to accelerate innovation.",
                icon: <MonitorSmartphone className="w-6 h-6 text-violet-400 group-hover:text-cyan-400 transition-colors" />,
              },
              {
                id: "C4",
                title: "SOCIAL MEDIA DESIGN",
                tagline: "Social engagement",
                desc: "Creating platform-specific content, advertising, and campaigns while utilizing AI tools to streamline production and content ideation.",
                icon: <Share2 className="w-6 h-6 text-violet-400 group-hover:text-cyan-400 transition-colors" />,
              },
            ].map((cap, idx) => (
              <div
                key={cap.id}
                className={`reveal group flex flex-col lg:flex-row justify-between items-start lg:items-center py-8 hover:bg-white/[0.01] px-4 -mx-4 transition-all duration-300 rounded-lg ${
                  idx !== 3 ? "border-b border-white/5" : ""
                }`}
              >
                <div className="flex items-start lg:items-center gap-6 mb-4 lg:mb-0">
                  <div className="p-3 bg-white/5 border border-white/10 rounded-xl group-hover:border-violet-500/30 transition-colors">
                    {cap.icon}
                  </div>
                  <div>
                    <h3 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-white/90 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#8B5CF6] group-hover:to-[#06B6D4] transition-all duration-300">
                      {cap.title === "LOGO & BRANDING" ? (
                        <>
                          <span className="hidden sm:inline">LOGO & BRANDING</span>
                          <span className="sm:hidden block">LOGO &<br />BRANDING</span>
                        </>
                      ) : (
                        cap.title
                      )}
                    </h3>
                    <p className="text-xs text-white/40 font-mono mt-1 uppercase tracking-wider">{cap.tagline}</p>
                  </div>
                </div>
                <div className="lg:max-w-md xl:max-w-lg">
                  <p className="text-sm text-white/60 leading-relaxed font-sans font-light">
                    {cap.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
          TOOLS SECTION (Expert, Intermediate, Familiar)
          ========================================== */}
      <section id="tools" className="py-24 md:py-32 relative z-10 px-6 md:px-12 border-t border-white/5 bg-black/5">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="reveal flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16 border-b border-white/5 pb-10">
            <div>
              <span className="text-[11px] font-mono tracking-[0.3em] text-[#06B6D4] uppercase font-semibold">
                04 // INSIDE MY TOOLBOX
              </span>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mt-2">
                Built to <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] to-[#06B6D4]">create</span>
              </h2>
            </div>
            <p className="text-white/50 text-[18px] max-w-xl font-sans leading-relaxed font-light">
              A curated toolkit of industry-standard design software, industry-leading platforms, and AI-powered solutions that support my creative process from concept to execution.
            </p>
          </div>

          {/* Categories */}
          <div className="space-y-20">
            {/* Category: Expert */}
            <div className="reveal group/cat">
              {/* Header block with labeled badge, category name, and full-width hairline rule */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div className="flex flex-col sm:flex-row sm:items-center items-start gap-3 sm:gap-4">
                  <span className="whitespace-nowrap px-3 py-1 rounded-full text-[11px] font-bold tracking-widest bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono uppercase">
                    EXPERT // ADVANCED
                  </span>
                  <h3 className="text-lg font-bold tracking-widest text-white/90 uppercase font-sans">
                    Daily Drivers
                  </h3>
                </div>
                <span className="text-[11px] font-mono text-white/30 tracking-widest">
                  MASTERTED THROUGH EXPERINCE
                </span>
              </div>
              <div className="h-px bg-gradient-to-r from-emerald-500/30 via-white/10 to-transparent w-full mb-8" />
              
              {/* Grid Layout of Expert Tools: Photoshop, Illustrator, Adobe XD, InDesign, Premiere Pro, Envato Elements */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {[
                  { name: "Photoshop", desc: "Advanced Photo Manipulation", imageUrl: "https://lh3.googleusercontent.com/d/1iXh75aA0T7r_xSKfjmHh5G3b0ahc_GTI", color: "border-blue-500/20 hover:border-blue-500/40 hover:bg-blue-500/[0.03]", glow: "hover:shadow-[0_0_25px_rgba(59,130,246,0.15)]" },
                  { name: "Illustrator", desc: "Vector Design Expertise", imageUrl: "https://lh3.googleusercontent.com/d/12KMbo5UKV3PfxyTL_jpc_wjN-nJ1ix3f", color: "border-amber-500/20 hover:border-amber-500/40 hover:bg-amber-500/[0.03]", glow: "hover:shadow-[0_0_25px_rgba(245,158,11,0.15)]" },
                  { name: "Adobe XD", desc: "User Experience Design", imageUrl: "https://lh3.googleusercontent.com/d/1sLpqTmznfE-SFX-t6uXcJNx4nbO7nVXD", color: "border-pink-500/20 hover:border-pink-500/40 hover:bg-pink-500/[0.03]", glow: "hover:shadow-[0_0_25px_rgba(236,72,153,0.15)]" },
                  { name: "InDesign", desc: "Publication Layout Design", imageUrl: "https://lh3.googleusercontent.com/d/1f4MzwsFy21RrhWkXC_jDMUBgoOKv0qej", color: "border-rose-500/20 hover:border-rose-500/40 hover:bg-rose-500/[0.03]", glow: "hover:shadow-[0_0_25px_rgba(244,63,94,0.15)]" },
                  { name: "Premiere Pro", desc: "Professional Video Editing", imageUrl: "https://lh3.googleusercontent.com/d/1Eyuv8x35eujzib-f7368i5gGyluxfIwH", color: "border-purple-500/20 hover:border-purple-500/40 hover:bg-purple-500/[0.03]", glow: "hover:shadow-[0_0_25px_rgba(168,85,247,0.15)]" },
                  { name: "Envato Elements", desc: "Creative Asset Library", imageUrl: "https://lh3.googleusercontent.com/d/1hXCrZBKbomgSyNXMZNfFXX-dMH_KIWf3", color: "border-emerald-500/20 hover:border-emerald-500/40 hover:bg-emerald-500/[0.03]", glow: "hover:shadow-[0_0_25px_rgba(16,185,129,0.15)]" },
                ].map((tool) => (
                  <div
                    key={tool.name}
                    className={`group/tool relative flex flex-col justify-start p-5 rounded-xl border bg-white/[0.01] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 ${tool.color} ${tool.glow} hover:border-[#8B5CF6]/30 hover:shadow-[0_0_25px_rgba(139,92,246,0.15)]`}
                  >
                    <div className="mb-4">
                      <div className="w-12 h-12 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center p-0 overflow-hidden group-hover/tool:scale-105 transition-transform">
                        <img
                          src={tool.imageUrl}
                          alt={tool.name}
                          className="w-full h-full object-contain"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold tracking-tight text-white/90 font-sans group-hover/tool:text-white transition-colors">
                        {tool.name}
                      </h4>
                      <p className="text-[12px] text-white/40 mt-1 leading-snug">
                        {tool.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Category: Supporting Tools */}
            <div className="reveal group/cat">
              {/* Header block with labeled badge, category name, and full-width hairline rule */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div className="flex flex-col sm:flex-row sm:items-center items-start gap-3 sm:gap-4">
                  <span className="whitespace-nowrap px-3 py-1 rounded-full text-[11px] font-bold tracking-widest bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-mono uppercase">
                    EXTENDED // UTILITY
                  </span>
                  <h3 className="text-lg font-bold tracking-widest text-white/90 uppercase font-sans">
                    SUPPORTING TOOLS
                  </h3>
                </div>
                <span className="text-[11px] font-mono text-white/30 tracking-widest">
                  BEYOND THE BASICS
                </span>
              </div>
              <div className="h-px bg-gradient-to-r from-cyan-500/30 via-white/10 to-transparent w-full mb-8" />
              
              {/* Grid Layout of Supporting Tools: ClickUp, Canva, ChatGPT, Google Gemini, Shopify */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {[
                  { name: "ClickUp", desc: "Project Workflow Management", imageUrl: "https://lh3.googleusercontent.com/d/1n3D4AQ_koFhF8Yi4dnAsDVvBxOvXxuMo" },
                  { name: "Canva", desc: "Rapid Content Creation", imageUrl: "https://lh3.googleusercontent.com/d/19ZTbWonPYo_AT9UpWG52kRhA8T4wTaZs" },
                  { name: "Google Workspace", desc: "Collaborative Productivity Tools", imageUrl: "https://lh3.googleusercontent.com/d/1FPcL-f9GB4z4ghewIhj0j5gK5J136Jri" },
                  { name: "Google Gemini", desc: "AI Research Support", imageUrl: "https://lh3.googleusercontent.com/d/1ROsB-QrQjKq9KQoDfmhdoVE0ks6dQOEX" },
                  { name: "ChatGPT", desc: "AI Content Assistance", imageUrl: "https://lh3.googleusercontent.com/d/1NBFg7cqVOvJupk0Gv0nGntEHfTZEgwuT" },
                  { name: "Shopify", desc: "Ecommerce Store Management", imageUrl: "https://lh3.googleusercontent.com/d/1_Wbuh9mtjjK0mW1G6Nee206A3aXjcFp8" },
                ].map((tool) => (
                  <div
                    key={tool.name}
                    className="group/tool relative flex flex-col justify-start p-5 rounded-xl border border-cyan-500/10 hover:border-cyan-500/30 hover:bg-cyan-500/[0.02] bg-white/[0.01] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_0_25px_rgba(6,182,212,0.12)] hover:border-[#8B5CF6]/30"
                  >
                    <div className="mb-4">
                      <div className="w-12 h-12 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center p-0 overflow-hidden group-hover/tool:scale-105 transition-transform">
                        <img
                          src={tool.imageUrl}
                          alt={tool.name}
                          className="w-full h-full object-contain"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold tracking-tight text-white/90 font-sans group-hover/tool:text-white transition-colors">
                        {tool.name}
                      </h4>
                      <p className="text-[12px] text-white/40 mt-1 leading-snug">
                        {tool.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Category: Emerging Tools */}
            <div className="reveal group/cat">
              {/* Header block with labeled badge, category name, and full-width hairline rule */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div className="flex flex-col sm:flex-row sm:items-center items-start gap-3 sm:gap-4">
                  <span className="whitespace-nowrap px-3 py-1 rounded-full text-[11px] font-bold tracking-widest bg-amber-500/10 border border-amber-500/20 text-amber-400 font-mono uppercase">
                    FAMILIAR // LEARNING
                  </span>
                  <h3 className="text-lg font-bold tracking-widest text-white/90 uppercase font-sans">
                    EMERGING TOOLS
                  </h3>
                </div>
                <span className="text-[11px] font-mono text-white/30 tracking-widest">
                  EXPLORING NEW POSSIBILITIES
                </span>
              </div>
              <div className="h-px bg-gradient-to-r from-amber-500/30 via-white/10 to-transparent w-full mb-8" />
              
              {/* Grid Layout of Emerging Tools */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {[
                  { name: "Figma", desc: "Collaborative Interface Design", imageUrl: "https://lh3.googleusercontent.com/d/1Qt9N4kZ20gLS3ofCHkK5qF3VBfmML0Uc" },
                  { name: "Claude", desc: "AI Writing Assistant", imageUrl: "https://lh3.googleusercontent.com/d/1AIUSUsvTMXQg-AFydn3kppdRBFH2xETz" },
                  { name: "Eleven Labs", desc: "AI Voice Generation", imageUrl: "https://lh3.googleusercontent.com/d/1S-yiGRkeJQMLbcaTBeOXSFCVYGIcFJeT" },
                  { name: "Descript", desc: "AI Video Editing", imageUrl: "https://lh3.googleusercontent.com/d/1MZdlofkOYDYOE9SKr880ckbMh9J2ebtI" },
                  { name: "Lovable", desc: "AI Web Development", imageUrl: "https://lh3.googleusercontent.com/d/1uwjrmPjAsIq0diyHStHBT5LQmiOygQGU" },
                  { name: "Adobe Express", desc: "Quick Content Creation", imageUrl: "https://lh3.googleusercontent.com/d/1olg2f32ca7lytO-Tt_-ocXDuvYj3xaHX" },
                ].map((tool) => (
                  <div
                    key={tool.name}
                    className="group/tool relative flex flex-col justify-start p-5 rounded-xl border border-amber-500/10 hover:border-amber-500/30 hover:bg-amber-500/[0.02] bg-white/[0.01] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_0_25px_rgba(245,158,11,0.12)] hover:border-amber-500/30"
                  >
                    <div className="mb-4">
                      <div className="w-12 h-12 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center p-0 overflow-hidden group-hover/tool:scale-105 transition-transform">
                        <img
                          src={tool.imageUrl}
                          alt={tool.name}
                          className="w-full h-full object-contain"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold tracking-tight text-white/90 font-sans group-hover/tool:text-white transition-colors">
                        {tool.name}
                      </h4>
                      <p className="text-[12px] text-white/40 mt-1 leading-snug">
                        {tool.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          TESTIMONIALS SECTION
          ========================================== */}
      <section id="testimonials" className="py-24 md:py-32 relative z-10 px-6 md:px-12 border-t border-white/5 bg-black/10">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="reveal flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16 pb-10 border-b border-white/5">
            <div>
              <span className="text-[11px] font-mono tracking-[0.3em] text-[#06B6D4] uppercase font-semibold">
                05 // REPUTATION MATTERS
              </span>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mt-2">
                Voices of <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] to-[#06B6D4]">experience</span>
              </h2>
            </div>
            <p className="text-white/50 text-[18px] max-w-xl font-sans leading-relaxed font-light">
              Thoughts and reflections from managers and team members who have witnessed my work ethic, creativity, and dedication firsthand.
            </p>
          </div>

          {/* Testimonial Cards Slider (Responsive for both Mobile & Desktop) */}
          {(() => {
            const testimonials = [
              {
                quote: "Capri is a team player and hard working professional, with high expertise on digital design. During the time I have been working with him he has shown deep design expertise and integrating AI for advanced AI design for greater speed and efficiency. He would be a great asset for any company.",
                name: "Philippa Chin-Sang",
                role: "Performance Marketing Manager",
                initials: "PC",
                imageUrl: "https://lh3.googleusercontent.com/d/1a77cv0vyFgcdlNqOX3N8tZaLHAxIC3eb",
                color: "from-purple-600/10 to-transparent",
                borderGlow: "hover:border-purple-500/30 hover:shadow-[0_0_30px_rgba(139,92,246,0.1)]",
                avatarBg: "bg-purple-500/20 text-purple-300 border-purple-500/30"
              },
              {
                quote: "Working with Capri was a fantastic experience. I came to him with a vague idea of what I wanted, and understood exactly what I needed for my logo. He made the entire design process smooth and seamless. I couldn't be happier with the final result, I’ve received so many compliments on it! Highly recommended.",
                name: "Lizbeth Pagan",
                role: "Director of Quality Operations, Great HealthWorks",
                initials: "LP",
                imageUrl: "https://lh3.googleusercontent.com/d/1XATF4uhKYsU8nsT2rR0jhtdW_10cAg_r",
                color: "from-cyan-600/10 to-transparent",
                borderGlow: "hover:border-cyan-500/30 hover:shadow-[0_0_30px_rgba(6,182,212,0.1)]",
                avatarBg: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30"
              },
              {
                quote: "Capri has been an incredible partner in building the Exclusive Limousine brand. From our logo and website to marketing materials and branded merchandise, his work has consistently exceeded our expectations. We highly recommend Capri to anyone looking for exceptional graphic design services.",
                name: "Perrez Trotman",
                role: "Operating Manager, Exclusive Limousine",
                initials: "PT",
                imageUrl: "https://lh3.googleusercontent.com/d/1WWQRG72iaZK5nWraJU-H8fWVfZmFl-bm",
                color: "from-purple-600/10 to-transparent",
                borderGlow: "hover:border-purple-500/30 hover:shadow-[0_0_30px_rgba(139,92,246,0.1)]",
                avatarBg: "bg-purple-500/20 text-purple-300 border-purple-500/30"
              },
              {
                quote: "I've had the pleasure of working with Mr. Monrose on several design projects, and he consistently transforms simple ideas into thoughtful, distinctive work that exceeds expectations. One logo he created is now featured alongside globally recognized brands like VISA and LVMH, a testament to the quality of his work.",
                name: "Aniska Tonge",
                role: "Director Of Operations, Alliance Theater",
                initials: "AT",
                imageUrl: "https://lh3.googleusercontent.com/d/1xIXjsZtSxhTqFzpYnsymQLk_8phm3TjX",
                color: "from-cyan-600/10 to-transparent",
                borderGlow: "hover:border-cyan-500/30 hover:shadow-[0_0_30px_rgba(6,182,212,0.1)]",
                avatarBg: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30"
              },
              {
                quote: "Capri is not only a highly talented visual and graphic artist, but also a skilled storyteller. His ability to combine video, graphics, photography, and typography to position products and services while creating an emotional connection that drives action, increases sales, and strengthens brand visibility is what truly sets him apart. He is also incredibly easy to work with and highly collaborative. I highly recommend Capri for any visual communications, creative, or storytelling project.",
                name: "Jamie Crespo",
                role: "OWNER, MANGO OPTIC",
                initials: "JC",
                imageUrl: "https://lh3.googleusercontent.com/d/175XRard3STLuhalaA_D8fVYaS8hXRsh6",
                color: "from-cyan-600/10 to-transparent",
                borderGlow: "hover:border-cyan-500/30 hover:shadow-[0_0_30px_rgba(6,182,212,0.1)]",
                avatarBg: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30"
              },
              {
                quote: "Working with Capri was a great experience. He took the time to understand exactly what I was looking for and brought my vision to life with a clean, professional presentation template. He was responsive, easy to work with, and delivered high-quality work in a timely manner. I highly recommend Capri to anyone looking for a talented designer who truly listens and delivers.",
                name: "Sharrian Turnbull",
                role: "Manager, People Operations",
                initials: "ST",
                imageUrl: "https://lh3.googleusercontent.com/d/12EBAI00PUJXcY19pcgrUGGQmrRWymPLu",
                color: "from-purple-600/10 to-transparent",
                borderGlow: "hover:border-purple-500/30 hover:shadow-[0_0_30px_rgba(139,92,246,0.1)]",
                avatarBg: "bg-purple-500/20 text-purple-300 border-purple-500/30"
              }
            ];

            // Safely guard index
            const activeIndex = testiIndex % testimonials.length;
            const activeCards = [
              testimonials[activeIndex],
              testimonials[(activeIndex + 1) % testimonials.length],
              testimonials[(activeIndex + 2) % testimonials.length]
            ];

            return (
              <div className="relative w-full">
                {/* Active Testimonial Cards Grid */}
                <div className="relative min-h-[480px] sm:min-h-[400px] md:min-h-[380px] flex flex-col justify-center overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeIndex}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full"
                    >
                      {activeCards.map((card, idx) => (
                        <div
                          key={card.name}
                          className={`reveal group/card relative flex flex-col justify-between p-8 rounded-3xl border border-white/5 bg-white/[0.01] backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 ${card.borderGlow} ${idx > 0 ? "hidden md:flex" : "flex"}`}
                        >
                          {/* Subtle colorful glow inside card */}
                          <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-20 group-hover/card:opacity-40 transition-opacity duration-500 pointer-events-none rounded-3xl`} />

                          <div>
                            {/* Styled Quote Icon */}
                            <div className="mb-6 flex justify-between items-center">
                              <div className="p-3 rounded-xl bg-white/5 border border-white/5 text-white/30 group-hover/card:text-cyan-400 group-hover/card:scale-105 transition-all duration-300">
                                <Quote className="w-5 h-5 text-cyan-400" />
                              </div>
                              <span className="font-mono text-[9px] text-white/20 tracking-wider">
                                VERIFIED_REVIEW // 0{((activeIndex + idx) % testimonials.length) + 1}
                              </span>
                            </div>

                            {/* Testimonial Quote text */}
                            <p className="text-white/75 text-sm leading-relaxed font-sans font-light italic mb-8">
                              "{card.quote}"
                            </p>
                          </div>

                          {/* Person Profile Area */}
                          <div className="flex items-center gap-4 pt-6 border-t border-white/5 mt-auto">
                            {/* Immersive Profile Pic */}
                            <div className={`relative w-11 h-11 rounded-full flex items-center justify-center overflow-hidden border font-mono text-xs font-bold shrink-0 ${card.avatarBg}`}>
                              {card.imageUrl ? (
                                <img
                                  src={card.imageUrl}
                                  alt={card.name}
                                  className="w-full h-full object-cover rounded-full"
                                  referrerPolicy="no-referrer"
                                />
                              ) : (
                                <>
                                  <div className="absolute inset-0 bg-grid-small opacity-10" />
                                  <div className="absolute inset-0.5 rounded-full border border-white/5" />
                                  <span className="relative z-10 tracking-wider">{card.initials}</span>
                                </>
                              )}
                            </div>

                            {/* Name and Role */}
                            <div>
                              <h4 className="text-sm font-bold text-white/90 font-sans tracking-tight group-hover/card:text-white transition-colors">
                                {card.name}
                              </h4>
                              <p className="text-[11px] font-mono text-white/40 uppercase tracking-widest mt-0.5">
                                {card.role}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Slider Navigation controls */}
                <div className="flex justify-center items-center gap-6 mt-10">
                  <button
                    onClick={() => setTestiIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
                    className="p-3 rounded-full border border-white/5 bg-white/[0.02] hover:bg-white/5 text-white/50 hover:text-cyan-400 hover:border-cyan-500/30 transition-all duration-300 cursor-pointer"
                    aria-label="Previous testimonial"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  <div className="flex justify-center gap-2">
                    {testimonials.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setTestiIndex(idx)}
                        className={`w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                          idx === activeIndex ? "bg-gradient-to-r from-[#8B5CF6] to-[#06B6D4] w-6" : "bg-white/20"
                        }`}
                        aria-label={`Go to slide ${idx + 1}`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={() => setTestiIndex((prev) => (prev + 1) % testimonials.length)}
                    className="p-3 rounded-full border border-white/5 bg-white/[0.02] hover:bg-white/5 text-white/50 hover:text-cyan-400 hover:border-cyan-500/30 transition-all duration-300 cursor-pointer"
                    aria-label="Next testimonial"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            );
          })()}
        </div>
      </section>
        </>
      ) : currentView === 'projects' ? (
        <ProjectsCatalog
          onSelectProject={(p) => {
            setSelectedProject(p);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        />
      ) : (
        <AboutPage
          setCurrentView={setCurrentView}
          handleStartProjectClick={handleStartProjectClick}
        />
      )}

      {/* ==========================================
          CONTACT SECTION
          ========================================== */}
      <section id="contact" className="py-24 md:py-32 relative z-10 px-6 md:px-12 border-t border-white/5 bg-black/20">
        <div className="max-w-3xl mx-auto text-center">
          {/* Section Header */}
          <div className="reveal flex flex-col items-center mb-16">
            <span className="text-[11px] font-mono tracking-[0.3em] text-[#06B6D4] uppercase font-bold">
              07 // OPEN TO OPPORTUNITIES
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mt-2 mb-4">
              Let's build <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] to-[#06B6D4]">together</span>
            </h2>
            <div className="h-[2px] w-12 bg-gradient-to-r from-violet-500 to-cyan-400 mb-6" />
            <p className="text-white/50 text-[18px] max-w-xl font-sans leading-relaxed font-light">
              Whether you're looking to elevate your brand, launch a new project, or expand your creative team, I'd love to hear about your goals and explore how we can bring your vision to life.
            </p>
          </div>

          {/* Form Container */}
          <div className="reveal max-w-xl mx-auto">
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form
                  key="contact-form"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  onSubmit={handleContactSubmit}
                  className="space-y-6 text-left border border-white/5 bg-white/[0.01] backdrop-blur-md p-8 rounded-2xl shadow-2xl relative overflow-hidden group hover:border-cyan-500/20 transition-all duration-500"
                >
                  {/* Subtle colorful glow inside card */}
                  <div className="absolute inset-0 bg-gradient-to-br from-violet-600/5 via-transparent to-cyan-500/5 opacity-50 pointer-events-none rounded-2xl" />

                  {/* Form fields */}
                  <div className="space-y-2">
                    <label className="block text-[10px] font-mono text-white/40 uppercase tracking-widest font-semibold">
                      Your Name
                    </label>
                    <input
                      type="text"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="e.g., Jean Nouvel"
                      className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-cyan-500/50 focus:bg-white/[0.04] focus:shadow-[0_0_15px_rgba(6,182,212,0.1)] transition-all duration-300 font-sans font-light"
                      disabled={isSubmitting}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-[10px] font-mono text-white/40 uppercase tracking-widest font-semibold">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      placeholder="e.g., jean@nouvel.com"
                      className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-cyan-500/50 focus:bg-white/[0.04] focus:shadow-[0_0_15px_rgba(6,182,212,0.1)] transition-all duration-300 font-sans font-light"
                      disabled={isSubmitting}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-[10px] font-mono text-white/40 uppercase tracking-widest font-semibold">
                      Project Message
                    </label>
                    <textarea
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      placeholder="Describe the scope, aesthetic preferences, and budget..."
                      rows={4}
                      className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-cyan-500/50 focus:bg-white/[0.04] focus:shadow-[0_0_15px_rgba(6,182,212,0.1)] transition-all duration-300 font-sans font-light resize-none"
                      disabled={isSubmitting}
                      required
                    />
                  </div>

                  {/* Form Error Message */}
                  {formError && (
                    <div className="text-rose-500 text-xs font-mono tracking-wider bg-rose-500/10 border border-rose-500/20 px-4 py-3 rounded-xl animate-shake">
                      {formError}
                    </div>
                  )}

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-xs font-bold tracking-widest bg-gradient-to-r from-[#8B5CF6] to-[#06B6D4] hover:opacity-90 hover:scale-[1.03] text-white shadow-lg shadow-[#8B5CF6]/15 hover:shadow-[#8B5CF6]/25 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 uppercase font-mono disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                          TRANSMITTING...
                        </>
                      ) : (
                        <>
                          LET'S TALK
                          <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform duration-300" />
                        </>
                      )}
                    </button>
                  </div>
                </motion.form>
              ) : (
                <motion.div
                  key="contact-success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="border border-cyan-500/20 bg-cyan-500/[0.02] backdrop-blur-md p-10 rounded-2xl shadow-2xl relative overflow-hidden text-center"
                >
                  <div className="absolute inset-0 bg-radial from-cyan-500/10 to-transparent pointer-events-none" />
                  
                  {/* Glowing Success Sphere Graphic */}
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center shadow-lg mx-auto mb-6 border border-white/10">
                    <Send className="w-8 h-8 text-white" />
                  </div>

                  <h3 className="font-display text-2xl font-extrabold tracking-tight text-white mb-2">
                    MESSAGE SENT!
                  </h3>
                  <p className="text-cyan-400 font-mono text-[10px] tracking-widest uppercase mb-4">
                    STATUS // SECURELY_DELIVERED
                  </p>
                  <p className="text-white/60 text-sm leading-relaxed max-w-sm mx-auto mb-8 font-light">
                    Thanks for reaching out. I've received your message and will get back to you as soon as possible.
                  </p>

                  <MagneticLink
                    onClick={() => setIsSubmitted(false)}
                    className="group/successBtn inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-xs font-bold tracking-widest bg-white/[0.02] hover:bg-white/5 border border-white/15 hover:border-[#8b5cf6]/30 text-white/80 hover:text-white transition-all duration-300 uppercase font-mono"
                  >
                    <span className="flex items-center gap-2">
                      SEND ANOTHER MESSAGE
                      <ArrowRight className="w-4 h-4 text-[#8b5cf6] group-hover/successBtn:translate-x-1 transition-transform duration-300" />
                    </span>
                  </MagneticLink>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ==========================================
          FOOTER SECTION (GRADIENT RULE + GRID + SOCIALS)
          ========================================== */}
      <footer id="footer" className="relative z-10 pt-24 pb-12 px-6 md:px-12 bg-black/40">
        {/* Beautiful Thin Gradient Rule at the top of the footer */}
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-violet-500/40 to-transparent mb-20" />

        <div className="max-w-7xl mx-auto">
          {/* Main Footer Link Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-20">
            {/* Brand column */}
            <div className="lg:col-span-6">
              <a
                href="#"
                className="flex items-center mb-6"
              >
                <Logo className="h-[29px] sm:h-[34px] md:h-[38px] shrink-0" />
              </a>
              <p className="text-white/50 text-sm max-w-sm leading-relaxed mb-8">
                Strategic design solutions crafted to help brands connect, engage, and grow.
              </p>
            </div>

            {/* Link grid (2 columns: MENU and LOCATION) */}
            <div className="grid grid-cols-2 gap-8 lg:col-span-6">
              {/* Column 1 */}
              <div>
                <h4 className="text-[11px] font-mono tracking-widest text-violet-400 uppercase font-semibold mb-6">
                  MENU
                </h4>
                <ul className="space-y-4 text-sm font-sans">
                  <li>
                    <button
                      onClick={() => {
                        setSelectedProject(null);
                        setCurrentView('projects');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="text-white/60 hover:text-white uppercase tracking-wider text-xs font-bold transition-colors bg-transparent border-0 cursor-pointer p-0 text-left focus:outline-none"
                    >
                      PROJECTS
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        setSelectedProject(null);
                        setCurrentView('about');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className={`uppercase tracking-wider text-xs font-bold transition-colors bg-transparent border-0 cursor-pointer p-0 text-left focus:outline-none ${currentView === 'about' ? 'text-cyan-400' : 'text-white/60 hover:text-white'}`}
                    >
                      ABOUT
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        const el = document.getElementById("contact");
                        if (el) el.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="text-white/60 hover:text-white uppercase tracking-wider text-xs font-bold transition-colors bg-transparent border-0 cursor-pointer p-0 text-left focus:outline-none"
                    >
                      LET'S TALK
                    </button>
                  </li>
                </ul>
              </div>

              {/* Column 2 */}
              <div>
                <h4 className="text-[11px] font-mono tracking-widest text-violet-400 uppercase font-semibold mb-6">
                  CONTACT
                </h4>
                <ul className="space-y-4 text-xs font-mono text-white/50 leading-relaxed">
                  <li className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <a href="tel:9542757800" className="hover:text-white transition-colors">(954) 275-7800</a>
                  </li>
                  <li className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <a href="mailto:caprimonrose@gmail.com" className="hover:text-white transition-colors">caprimonrose@gmail.com</a>
                  </li>
                  <li className="flex items-start gap-2">
                    <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                    <span>FORT LAUDERDALE, FL</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom Bar with copyright */}
          <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row justify-center items-center gap-6">
            <div className="text-xs font-mono text-white/40 text-center">
              © 2026 CAPRI MONROSE. ALL RIGHTS RESERVED. DESIGNED WITH PRECISION.
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
