import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  FileText,
  Mail,
  Sparkles,
  Quote,
  Dumbbell,
  Waves,
  Anchor,
  Utensils,
  Smile,
  Activity,
  BookOpen,
  MapPin
} from "lucide-react";

// ==========================================
// MAGNETIC BUTTON FOR ABOUT PAGE
// ==========================================
function MagneticButton({
  children,
  onClick,
  className,
}: {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
}) {
  const btnRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!btnRef.current) return;
    const { left, top, width, height } = btnRef.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;
    setPosition({ x: distanceX * 0.2, y: distanceY * 0.2 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <button
      ref={btnRef}
      type="button"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={`relative transition-transform duration-200 ease-out group ${className}`}
      style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
    >
      {children}
    </button>
  );
}

interface TimelineItem {
  year: string;
  title: string;
  items: string[];
  description?: string;
}

const TIMELINE_DATA: TimelineItem[] = [
  {
    year: "2010",
    title: "The Big Move",
    items: [
      "Moved from the Caribbean to Fort Lauderdale.",
      "Started Art Institute.",
      "Started freelancing.",
      "Started working remotely for ColorMax.",
      "Learned large format printing.",
      "Worked with hundreds of local businesses."
    ]
  },
  {
    year: "2014",
    title: "Building Brands",
    items: [
      "Joined Good Roads.",
      "Helped build an in house marketing department.",
      "Helped transform XO Luxury Wheels into the company's highest performing brand.",
      "Expanded from print into websites, photography, social media, video, and digital marketing."
    ]
  },
  {
    year: "2017",
    title: "Scaling Marketing",
    items: [
      "Joined EasyClocking.",
      "Expanded into SaaS.",
      "Built websites.",
      "Built social media.",
      "Produced videos.",
      "Created campaigns."
    ]
  },
  {
    year: "2020",
    title: "Adapting Through Change",
    items: [
      "COVID.",
      "Working remotely.",
      "Content creation.",
      "Podcasts.",
      "Video production.",
      "Landing pages.",
      "Marketing automation."
    ]
  },
  {
    year: "2023",
    title: "Reinventing a Company",
    items: [
      "Company lawsuit.",
      "Entire rebrand.",
      "New naming strategy.",
      "New websites.",
      "New apps.",
      "New design systems.",
      "New product branding.",
      "Worked alongside executives."
    ]
  },
  {
    year: "2025",
    title: "The AI Shift",
    items: [],
    description: "I've always enjoyed learning emerging technologies. As AI became part of modern creative workflows, I began integrating tools like ChatGPT, Gemini, HeyGen, Descript, Lovable, and Ideogram to accelerate ideation, streamline production, and create more effective marketing content."
  },
  {
    year: "2026",
    title: "A New Chapter",
    items: [],
    description: "A company wide restructuring following a cyberattack marked the end of nearly nine years with WorkEasy Software. While it closed one chapter of my career, it also gave me the opportunity to step back, sharpen my skills, build this portfolio, and focus on what's next."
  }
];

interface AboutPageProps {
  setCurrentView: (view: 'home' | 'projects' | 'about') => void;
  handleStartProjectClick: (e: React.MouseEvent) => void;
}

export default function AboutPage({ setCurrentView, handleStartProjectClick }: AboutPageProps) {
  const [timelineIndex, setTimelineIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right
  const [testiIndex, setTestiIndex] = useState(0);
  const [lifeIndex, setLifeIndex] = useState(0);

  const handlePrevTimeline = () => {
    if (timelineIndex > 0) {
      setDirection(-1);
      setTimelineIndex(timelineIndex - 1);
    }
  };

  const handleNextTimeline = () => {
    if (timelineIndex < TIMELINE_DATA.length - 1) {
      setDirection(1);
      setTimelineIndex(timelineIndex + 1);
    }
  };

  // Keyboard navigation for timeline
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Avoid firing if the user is focused on an input or textarea
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA"
      ) {
        return;
      }

      if (e.key === "ArrowLeft") {
        handlePrevTimeline();
      } else if (e.key === "ArrowRight") {
        handleNextTimeline();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [timelineIndex]);

  // Framer Motion variants for timeline sliding
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 150 : -150,
      opacity: 0,
      scale: 0.95
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 28 },
        opacity: { duration: 0.3 },
        scale: { duration: 0.3 }
      }
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -150 : 150,
      opacity: 0,
      scale: 0.95,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 28 },
        opacity: { duration: 0.25 }
      }
    })
  };

  const handleResumeDownload = (e: React.MouseEvent) => {
    e.preventDefault();
    window.open("https://drive.google.com/file/d/1qTmO-ohW1js2eQ-yly1TDbB9z7tnVErf/view?usp=sharing", "_blank");
  };

  return (
    <div className="relative min-h-screen">
      
      {/* ==========================================
          HERO SECTION
          ========================================== */}
      <header className="relative pt-32 pb-16 lg:pt-40 lg:pb-24 overflow-hidden z-10">
        <div className="perspective-grid" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left side: Intro Copy */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="flex items-center bg-white/5 border border-white/15 px-4 py-1.5 rounded-full text-[11px] font-mono tracking-[0.2em] text-[#06B6D4] uppercase mb-6"
              >
                <span>ABOUT ME // CREATIVE BY NATURE</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[56px] leading-[1.15] font-extrabold tracking-tight mb-6"
              >
                Designing brands with{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#8B5CF6] to-[#06B6D4]">
                  strategy, creativity, and purpose.
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-base sm:text-lg text-white/60 font-light leading-relaxed tracking-wide max-w-2xl mb-8"
              >
                I'm a Senior Graphic Designer with 15+ years of experience helping businesses tell their stories through branding, marketing campaigns, digital experiences, and content that connects with audiences.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
              >
                <button
                  onClick={handleResumeDownload}
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full text-xs font-bold tracking-widest bg-gradient-to-r from-[#8B5CF6] to-[#06B6D4] hover:opacity-90 hover:scale-[1.03] text-white shadow-lg shadow-[#8B5CF6]/15 hover:shadow-[#8B5CF6]/25 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 uppercase font-mono cursor-pointer"
                >
                  <FileText className="w-4 h-4" />
                  Download Resume
                </button>
              </motion.div>
            </div>

            {/* Right side: Photo Frame */}
            <div className="lg:col-span-5 w-full">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative w-full aspect-[4/3] lg:aspect-[3/4] rounded-2xl border border-white/10 bg-[#0C0C14]/60 backdrop-blur-md overflow-hidden group shadow-2xl"
              >
                {/* Embedded breathing aurora system */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                  <div className="absolute w-[200px] h-[200px] rounded-full blur-[60px] animate-drift-1 opacity-45"
                    style={{
                      top: "15%",
                      left: "5%",
                      background: "radial-gradient(circle, rgba(139, 92, 246, 0.45) 0%, transparent 75%)"
                    }}
                  />
                  <div className="absolute w-[200px] h-[200px] rounded-full blur-[60px] animate-drift-2 opacity-40"
                    style={{
                      bottom: "15%",
                      right: "5%",
                      background: "radial-gradient(circle, rgba(6, 182, 212, 0.4) 0%, transparent 75%)"
                    }}
                  />
                </div>

                {/* Subtle grid */}
                <div
                  className="absolute inset-0 opacity-[0.06] mix-blend-overlay z-20"
                  style={{
                    backgroundImage: "radial-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px)",
                    backgroundSize: "20px 20px",
                  }}
                />

                {/* Main Image */}
                <div className="absolute inset-0 z-10 rounded-2xl overflow-hidden">
                  <img
                    src="https://lh3.googleusercontent.com/d/1CLgoLykfdTSb0MKoMZjJwx-Sz1rBs-Wr"
                    alt="Capri Monrose Portrait"
                    className="w-full h-full object-cover rounded-2xl transition-transform duration-700 ease-out group-hover:scale-103"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Bottom shading rule */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F] via-transparent to-transparent opacity-90 z-20" />

                <div className="absolute top-4 left-4 text-[7px] font-mono tracking-widest text-white/30 z-20">
                  PORTRAIT_FILE // CAPRI_MONROSE
                </div>
                <div className="absolute bottom-4 right-4 text-[7px] font-mono tracking-widest text-cyan-400 z-20 font-bold">
                  VERIFIED // DESIGN_LEAD
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </header>

      {/* ==========================================
          MY STORY SECTION
          ========================================== */}
      <section id="story" className="pt-12 pb-24 md:pt-16 md:pb-32 relative z-10 px-6 md:px-12 bg-black/20 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left side: Immersive Story Photo */}
            <div className="reveal lg:col-span-5 w-full">
              <div className="relative w-full aspect-[4/3] lg:aspect-[3/4] rounded-2xl border border-white/10 bg-[#0C0C14]/60 backdrop-blur-md overflow-hidden group shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F] via-transparent to-transparent opacity-40 z-20 rounded-2xl" />
                <img
                  src="https://lh3.googleusercontent.com/d/1LjK7n8u3zNf81cz2hL8rTc8EXpXcvurN"
                  alt="My Story Illustration"
                  className="w-full h-full object-cover rounded-2xl transition-transform duration-700 ease-out group-hover:scale-103"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            {/* Right side: Story Copy */}
            <div className="reveal lg:col-span-7 flex flex-col justify-center text-left">
              <span className="text-[11px] font-mono tracking-[0.3em] text-[#06B6D4] uppercase font-bold mb-2 block">
                02 // My story
              </span>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mt-2 mb-8">
                More than <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#8B5CF6] to-[#06B6D4]">design</span>
              </h2>

              <div className="space-y-6 text-white/80 text-base sm:text-lg font-light leading-relaxed tracking-wide">
                <p>
                  Design has shaped nearly every chapter of my life. What started as drawing, school art competitions, and designing event programs grew into a career spanning branding, marketing, UX, content creation, and creative leadership across multiple industries.
                </p>
                <p>
                  Along the way I've helped launch brands, rebuild companies after acquisitions and lawsuits, lead major rebrands, and create work that solved real business problems, not just looked good.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ==========================================
          VISUAL TIMELINE SECTION
          ========================================== */}
      <section id="timeline" className="py-24 md:py-32 relative z-10 px-6 md:px-12 bg-black/10 border-t border-white/5 overflow-hidden">
        <div className="max-w-5xl mx-auto">
          
          {/* Section Header */}
          <div className="reveal flex flex-col items-center text-center mb-16">
            <span className="text-[11px] font-mono tracking-[0.3em] text-[#06B6D4] uppercase font-semibold">
              03 // Career journey
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mt-2">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#8B5CF6] to-[#06B6D4]">Visual</span> Timeline
            </h2>
          </div>

          {/* Timeline Nav Tracker (Nodes representation) */}
          <div className="reveal mb-16 relative">
            {/* Perfectly Centered Line Track */}
            <div className="absolute inset-x-0 top-3 h-[1.5px] bg-white/10 z-0">
              <div className="relative w-full h-full">
                <div 
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#8B5CF6] to-[#06B6D4] transition-all duration-500 ease-out" 
                  style={{ width: `${(timelineIndex / (TIMELINE_DATA.length - 1)) * 100}%` }}
                />
              </div>
            </div>

            <div className="relative flex justify-between items-start z-10">
              {TIMELINE_DATA.map((milestone, idx) => {
                const isActive = idx === timelineIndex;
                const isPassed = idx < timelineIndex;
                return (
                  <button
                    key={milestone.year}
                    onClick={() => {
                      setDirection(idx > timelineIndex ? 1 : -1);
                      setTimelineIndex(idx);
                    }}
                    className="flex flex-col items-center gap-3 group focus:outline-none cursor-pointer"
                  >
                    <div 
                      className={`w-6 h-6 rounded-full border flex items-center justify-center transition-all duration-300 relative z-10 ${
                        isActive 
                          ? "bg-gradient-to-r from-[#8B5CF6] to-[#06B6D4] border-transparent scale-110 shadow-lg shadow-[#8B5CF6]/30" 
                          : isPassed
                            ? "bg-white/10 border-cyan-500/50"
                            : "bg-[#0A0A0F] border-white/10 group-hover:border-white/30"
                      }`}
                    >
                      {isActive && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </div>
                    <span 
                      className={`font-mono text-[11px] font-bold tracking-wider transition-colors duration-300 ${
                        isActive 
                          ? "text-cyan-400" 
                          : "text-white/30 group-hover:text-white/60"
                      }`}
                    >
                      {milestone.year}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Timeline Active Card Carousel */}
          <div className="relative min-h-[380px] flex items-center justify-center py-4">
            
            {/* Navigation Chevron Left */}
            <button
              onClick={handlePrevTimeline}
              disabled={timelineIndex === 0}
              className={`absolute left-0 sm:-left-12 lg:-left-20 p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer disabled:opacity-20 disabled:cursor-not-allowed disabled:hover:bg-white/5 z-20`}
              aria-label="Previous milestone"
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>

            {/* Milestone Card Container (Static/No Animation) */}
            <div className="w-full max-w-3xl overflow-visible px-4">
              <div
                key={timelineIndex}
                className="relative border border-white/10 bg-[#0C0C14]/40 backdrop-blur-xl p-8 sm:p-10 rounded-2xl shadow-2xl overflow-hidden group hover:border-[#8b5cf6]/20 transition-all duration-500"
              >
                {/* Subtle vector background glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-violet-600/5 via-transparent to-cyan-500/5 opacity-50 pointer-events-none rounded-2xl" />
                
                {/* Glowing vertical lines corner motif */}
                <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-white/20" />
                <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-white/20" />
                <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-white/20" />
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-white/20" />

                {/* Timeline active card top line layout */}
                <div className="flex flex-col md:flex-row-reverse md:justify-between md:items-center gap-3 mb-6 items-start text-left w-full">
                  <span className="font-mono text-[11px] text-white/40 uppercase tracking-widest">
                    CHAPTER 0{timelineIndex + 1} // 07
                  </span>
                  <div>
                    <span className="inline-block px-4 py-1.5 rounded-full text-[11px] font-mono font-bold tracking-widest bg-gradient-to-r from-[#8B5CF6]/15 to-[#06B6D4]/15 border border-cyan-500/20 text-cyan-300">
                      MILESTONE // {TIMELINE_DATA[timelineIndex].year}
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-display text-xl sm:text-2xl font-extrabold tracking-tight text-white mb-6 uppercase">
                  {TIMELINE_DATA[timelineIndex].title}
                </h3>

                {/* Details block */}
                {TIMELINE_DATA[timelineIndex].items.length > 0 ? (
                  <ul className="space-y-4 text-left">
                    {TIMELINE_DATA[timelineIndex].items.map((bullet, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-3">
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 shrink-0" />
                        <span className="text-white/70 text-[14px] sm:text-base font-light font-sans leading-relaxed">
                          {bullet}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-white/70 text-[14px] sm:text-base font-light font-sans leading-relaxed text-left">
                    {TIMELINE_DATA[timelineIndex].description}
                  </p>
                )}

              </div>
            </div>

            {/* Navigation Chevron Right */}
            <button
              onClick={handleNextTimeline}
              disabled={timelineIndex === TIMELINE_DATA.length - 1}
              className={`absolute right-0 sm:-right-12 lg:-right-20 p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer disabled:opacity-20 disabled:cursor-not-allowed disabled:hover:bg-white/5 z-20`}
              aria-label="Next milestone"
            >
              <ChevronRight className="w-5 h-5 text-white" />
            </button>

          </div>

          {/* Download Resume Button under Time Line Cards */}
          <div className="flex justify-center mt-12 mb-4">
            <button
              onClick={handleResumeDownload}
              className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full text-xs font-bold tracking-widest bg-gradient-to-r from-[#8B5CF6] to-[#06B6D4] hover:opacity-90 hover:scale-[1.03] text-white shadow-lg shadow-[#8B5CF6]/15 hover:shadow-[#8B5CF6]/25 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 uppercase font-mono cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              Download Resume
            </button>
          </div>

        </div>
      </section>

      {/* ==========================================
          TESTIMONIALS SECTION (BROUGHT FROM HOME)
          ========================================== */}
      <section className="py-24 md:py-32 relative z-10 px-6 md:px-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          
          {/* Section Header */}
          <div className="reveal flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16 border-b border-white/5 pb-10">
            <div>
              <span className="text-[11px] font-mono tracking-[0.3em] text-[#06B6D4] uppercase font-semibold">
                04 // Reputation matters
              </span>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mt-2">
                Voices of <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] to-[#06B6D4]">experience</span>
              </h2>
            </div>
            <p className="text-white/50 text-[18px] max-w-xl font-sans leading-relaxed font-light">
              Thoughts and reflections from managers and team members who have witnessed my work ethic, creativity, and dedication firsthand.
            </p>
          </div>

          {/* Testimonial Cards Desktop Grid */}
          <div className="hidden md:grid grid-cols-3 gap-8">
            {[
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
                quote: "I've had the pleasure of working with Mr. Monrose on several design projects, and he consistently transforms simple ideas into thoughtful, distinctive work that exceeds expectations. One logo he created is now featured alongside globally recognized brands like VISA and LVMH, a testament to the quality of his work.",
                name: "Aniska Tonge",
                role: "Director Of Operations, Alliance Theater",
                initials: "AT",
                color: "from-cyan-600/10 to-transparent",
                borderGlow: "hover:border-cyan-500/30 hover:shadow-[0_0_30px_rgba(6,182,212,0.1)]",
                avatarBg: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30"
              },
              {
                quote: "Working with Capri Monrose was a masterclass in professional communication and artistic execution. They took our complex design brief and synthesized it into a pristine online presence.",
                name: "Saffron Cole",
                role: "VP of Product, Tactile Labs",
                initials: "SC",
                color: "from-cyan-600/10 to-transparent",
                borderGlow: "hover:border-cyan-500/30 hover:shadow-[0_0_30px_rgba(6,182,212,0.1)]",
                avatarBg: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30"
              }
            ].map((item, index) => (
              <div
                key={index}
                className={`reveal group/card relative flex flex-col justify-between p-8 rounded-2xl border border-white/5 bg-white/[0.01] backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 ${item.borderGlow}`}
              >
                {/* Subtle colorful glow inside card */}
                <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-20 group-hover/card:opacity-40 transition-opacity duration-500 pointer-events-none rounded-2xl`} />

                <div>
                  {/* Styled Quote Icon */}
                  <div className="mb-6 flex justify-between items-center">
                    <div className="p-3 rounded-xl bg-white/5 border border-white/5 text-white/30 group-hover/card:text-cyan-400 group-hover/card:scale-105 transition-all duration-300">
                      <Quote className="w-5 h-5" />
                    </div>
                    <span className="font-mono text-[9px] text-white/20 tracking-wider">
                      VERIFIED_REVIEW // 0{index + 1}
                    </span>
                  </div>

                  {/* Testimonial Quote text */}
                  <p className="text-white/70 text-sm leading-relaxed font-sans font-light italic mb-8">
                    "{item.quote}"
                  </p>
                </div>

                {/* Person Profile Area */}
                <div className="flex items-center gap-4 pt-6 border-t border-white/5 mt-auto">
                  {/* Immersive Profile Pic Placeholder */}
                  <div className={`relative w-11 h-11 rounded-full flex items-center justify-center overflow-hidden border font-mono text-xs font-bold shrink-0 ${item.avatarBg}`}>
                    {item.imageUrl ? (
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-full h-full object-cover rounded-full"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <>
                        {/* Background grid representation */}
                        <div className="absolute inset-0 bg-grid-small opacity-10" />
                        
                        {/* Inner glowing circle */}
                        <div className="absolute inset-0.5 rounded-full border border-white/5" />
                        
                        <span className="relative z-10 tracking-wider">{item.initials}</span>
                      </>
                    )}
                  </div>

                  {/* Name and Role */}
                  <div>
                    <h4 className="text-sm font-bold text-white/90 font-sans tracking-tight group-hover/card:text-white transition-colors">
                      {item.name}
                    </h4>
                    <p className="text-[11px] font-mono text-white/40 uppercase tracking-widest mt-0.5">
                      {item.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Testimonial Cards Mobile Slider */}
          <div className="block md:hidden relative">
            {[
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
                quote: "I've had the pleasure of working with Mr. Monrose on several design projects, and he consistently transforms simple ideas into thoughtful, distinctive work that exceeds expectations. One logo he created is now featured alongside globally recognized brands like VISA and LVMH, a testament to the quality of his work.",
                name: "Aniska Tonge",
                role: "Director Of Operations, Alliance Theater",
                initials: "AT",
                color: "from-cyan-600/10 to-transparent",
                borderGlow: "hover:border-cyan-500/30 hover:shadow-[0_0_30px_rgba(6,182,212,0.1)]",
                avatarBg: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30"
              },
              {
                quote: "Working with Capri Monrose was a masterclass in professional communication and artistic execution. They took our complex design brief and synthesized it into a pristine online presence.",
                name: "Saffron Cole",
                role: "VP of Product, Tactile Labs",
                initials: "SC",
                color: "from-cyan-600/10 to-transparent",
                borderGlow: "hover:border-cyan-500/30 hover:shadow-[0_0_30px_rgba(6,182,212,0.1)]",
                avatarBg: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30"
              }
            ].map((item, index) => {
              if (index !== testiIndex) return null;
              return (
                <div key={index} className="relative min-h-[340px]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      className={`w-full p-8 rounded-2xl border border-white/5 bg-white/[0.01] backdrop-blur-sm relative flex flex-col justify-between h-full ${item.borderGlow}`}
                    >
                      {/* Subtle colorful glow inside card */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-20 pointer-events-none rounded-2xl`} />

                      <div>
                        {/* Styled Quote Icon */}
                        <div className="mb-6 flex justify-between items-center">
                          <div className="p-3 rounded-xl bg-white/5 border border-white/5 text-white/30 text-cyan-400">
                            <Quote className="w-5 h-5 text-cyan-400" />
                          </div>
                          <span className="font-mono text-[9px] text-white/20 tracking-wider">
                            VERIFIED_REVIEW // 0{index + 1}
                          </span>
                        </div>

                        {/* Testimonial Quote text */}
                        <p className="text-white/70 text-sm leading-relaxed font-sans font-light italic mb-8">
                          "{item.quote}"
                        </p>
                      </div>

                      {/* Person Profile Area */}
                      <div className="flex items-center gap-4 pt-6 border-t border-white/5 mt-auto">
                        <div className={`relative w-11 h-11 rounded-full flex items-center justify-center overflow-hidden border font-mono text-xs font-bold shrink-0 ${item.avatarBg}`}>
                          {item.imageUrl ? (
                            <img
                              src={item.imageUrl}
                              alt={item.name}
                              className="w-full h-full object-cover rounded-full"
                              referrerPolicy="no-referrer"
                            />
                          ) : (
                            <>
                              <div className="absolute inset-0 bg-grid-small opacity-10" />
                              <div className="absolute inset-0.5 rounded-full border border-white/5" />
                              <span className="relative z-10 tracking-wider">{item.initials}</span>
                            </>
                          )}
                        </div>

                        <div>
                          <h4 className="text-sm font-bold text-white/90 font-sans tracking-tight">
                            {item.name}
                          </h4>
                          <p className="text-[11px] font-mono text-white/40 uppercase tracking-widest mt-0.5">
                            {item.role}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              );
            })}

            {/* Slider dots */}
            <div className="flex justify-center gap-2 mt-6">
              {[0, 1, 2].map((idx) => (
                <button
                  key={idx}
                  onClick={() => setTestiIndex(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                    idx === testiIndex ? "bg-gradient-to-r from-[#8B5CF6] to-[#06B6D4] w-6" : "bg-white/20"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          OUTSIDE OF WORK SECTION
          ========================================== */}
      <section id="outside-work" className="py-24 md:py-32 relative z-10 px-6 md:px-12 border-t border-white/5 bg-black/5">
        <div className="max-w-7xl mx-auto">
          
          {/* Section Header */}
          <div className="reveal flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16 border-b border-white/5 pb-10">
            <div>
              <span className="text-[11px] font-mono tracking-[0.3em] text-[#06B6D4] uppercase font-bold">
                05 // Life beyond screen
              </span>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mt-2">
                What keeps me <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] to-[#06B6D4]">inspired</span>
              </h2>
            </div>
            <p className="text-white/50 text-[16px] sm:text-[18px] max-w-xl font-sans leading-relaxed font-light">
              I believe that new experiences, diverse perspectives, and staying active inspire stronger ideas and more meaningful creative work.
            </p>
          </div>

          {/* Activities Desktop Grid */}
          <div className="hidden sm:grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Run Club",
                desc: "Staying active keeps my creativity moving.",
                icon: <Activity className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform duration-300" />
              },
              {
                title: "Gym",
                desc: "Discipline inside and outside of work.",
                icon: <Dumbbell className="w-5 h-5 text-violet-400 group-hover:scale-110 transition-transform duration-300" />
              },
              {
                title: "Snorkeling",
                desc: "I'm happiest near water.",
                icon: <Waves className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform duration-300" />
              },
              {
                title: "Paddle Boarding",
                desc: "Exploring SoFlo one paddle at a time.",
                icon: <Anchor className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform duration-300" />
              },
              {
                title: "Foodie",
                desc: "Always looking for the next hidden gem.",
                icon: <Utensils className="w-5 h-5 text-rose-400 group-hover:scale-110 transition-transform duration-300" />
              },
              {
                title: "Comedy Clubs",
                desc: "Good design & good jokes both rely on timing.",
                icon: <Smile className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform duration-300" />
              },
              {
                title: "Comics & Anime",
                desc: "A source of inspiration, storytelling & art.",
                icon: <BookOpen className="w-5 h-5 text-purple-400 group-hover:scale-110 transition-transform duration-300" />
              },
              {
                title: "Exploring New Places",
                desc: "From local events to weekend getaways.",
                icon: <MapPin className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform duration-300" />
              }
            ].map((activity, idx) => (
              <div
                key={idx}
                className="reveal group flex flex-col p-6 rounded-2xl border border-white/5 bg-white/[0.01] backdrop-blur-sm hover:border-[#8b5cf6]/20 hover:bg-white/[0.02] transition-all duration-300 text-left"
              >
                {/* Decorative Icon Wrapper with ambient glow */}
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-4 group-hover:border-violet-500/30 transition-colors duration-300">
                  {activity.icon}
                </div>
                
                <h3 className="font-display text-sm md:text-base font-bold text-white mb-2 uppercase tracking-wide">
                  {activity.title}
                </h3>
                
                <p className="text-white/50 text-[13px] sm:text-[14px] font-sans font-light leading-relaxed">
                  {activity.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Activities Mobile Slider */}
          <div className="block sm:hidden relative">
            {[
              {
                title: "Run Club",
                desc: "Staying active keeps my creativity moving.",
                icon: <Activity className="w-5 h-5 text-cyan-400" />
              },
              {
                title: "Gym",
                desc: "Discipline inside and outside of work.",
                icon: <Dumbbell className="w-5 h-5 text-violet-400" />
              },
              {
                title: "Snorkeling",
                desc: "I'm happiest near water.",
                icon: <Waves className="w-5 h-5 text-blue-400" />
              },
              {
                title: "Paddle Boarding",
                desc: "Exploring SoFlo one paddle at a time.",
                icon: <Anchor className="w-5 h-5 text-cyan-400" />
              },
              {
                title: "Foodie",
                desc: "Always looking for the next hidden gem.",
                icon: <Utensils className="w-5 h-5 text-rose-400" />
              },
              {
                title: "Comedy Clubs",
                desc: "Good design & good jokes both rely on timing.",
                icon: <Smile className="w-5 h-5 text-amber-400" />
              },
              {
                title: "Comics & Anime",
                desc: "A source of inspiration, storytelling & art.",
                icon: <BookOpen className="w-5 h-5 text-purple-400" />
              },
              {
                title: "Exploring New Places",
                desc: "From local events to weekend getaways.",
                icon: <MapPin className="w-5 h-5 text-emerald-400" />
              }
            ].map((activity, idx) => {
              if (idx !== lifeIndex) return null;
              return (
                <div key={idx} className="relative min-h-[200px]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      className="w-full p-8 rounded-2xl border border-white/5 bg-white/[0.01] backdrop-blur-sm relative flex flex-col justify-start text-left h-full"
                    >
                      {/* Decorative Icon Wrapper with ambient glow */}
                      <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                        {activity.icon}
                      </div>

                      <h3 className="font-display text-sm font-bold text-white mb-2 uppercase tracking-wide">
                        {activity.title}
                      </h3>

                      <p className="text-white/50 text-[13px] font-sans font-light leading-relaxed">
                        {activity.desc}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </div>
              );
            })}

            {/* Slider dots */}
            <div className="flex justify-center gap-2 mt-6">
              {[0, 1, 2, 3, 4, 5, 6, 7].map((idx) => (
                <button
                  key={idx}
                  onClick={() => setLifeIndex(idx)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    idx === lifeIndex ? "bg-gradient-to-r from-[#8B5CF6] to-[#06B6D4] w-5" : "bg-white/20"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
