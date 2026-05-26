import { useState, useEffect, useRef } from 'react';
import FadeIn from './FadeIn';
import CinematicLayer from './CinematicLayer';

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [showSoundHint, setShowSoundHint] = useState(true);
  const [avatarLoaded, setAvatarLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShowSoundHint(false), 6000);
    return () => clearTimeout(t);
  }, []);

  // Snap-scroll on first wheel down
  useEffect(() => {
    let fired = false;
    const goToAbout = () => {
      if (fired) return;
      fired = true;
      document.getElementById('about')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };
    const onWheel = (e: WheelEvent) => {
      if (fired || e.deltaY <= 0 || window.scrollY > 50) return;
      e.preventDefault();
      goToAbout();
    };
    const onKey = (e: KeyboardEvent) => {
      if (fired || window.scrollY > 50) return;
      if (['ArrowDown', 'PageDown', ' '].includes(e.key)) {
        e.preventDefault();
        goToAbout();
      }
    };
    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('keydown', onKey);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-[#080810] flex flex-col"
    >
      {/* Deep cinematic radial glow background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse 80% 60% at 65% 55%, rgba(255,140,40,0.07) 0%, rgba(8,8,16,1) 70%)',
        }} />
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse 50% 70% at 20% 50%, rgba(100,60,255,0.05) 0%, transparent 70%)',
        }} />
        <div className="absolute bottom-0 left-0 right-0 h-40" style={{
          background: 'linear-gradient(to top, #080810 0%, transparent 100%)',
        }} />
      </div>

      {/* Three.js floating bokeh particles */}
      <CinematicLayer />

      {/* ─── NAV ─── */}
      <div className="relative z-20 flex-shrink-0">
        <FadeIn delay={0} y={-24}>
          <nav className="flex items-center justify-between px-6 sm:px-10 md:px-14 pt-6 md:pt-8 max-w-screen-2xl mx-auto w-full">
            <ul className="flex items-center gap-6 sm:gap-10">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.28em] text-white/60 transition-all duration-300 hover:text-white hover:tracking-[0.32em]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href="#contact"
              className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.22em] text-white rounded-full border border-white/20 bg-white/8 px-4 py-2 sm:px-5 sm:py-2.5 backdrop-blur-md transition-all duration-300 hover:bg-white/15 hover:border-white/40 hover:scale-105"
            >
              Get In Touch
            </a>
          </nav>
        </FadeIn>
      </div>

      {/* ─── MAIN CONTENT ─── */}
      <div className="relative z-10 flex-1 flex items-center px-6 sm:px-10 md:px-14 max-w-screen-2xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-0 w-full items-center">

          {/* LEFT: Typography stack */}
          <div className="lg:col-span-6 flex flex-col justify-center order-2 lg:order-1">
            <FadeIn delay={0.15} y={20}>
              <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.55em] text-orange-400/80 mb-5">
                AI/ML Portfolio · 2026
              </p>
            </FadeIn>

            <FadeIn delay={0.3} y={50}>
              <h1
                className="font-black uppercase leading-[0.83] tracking-tighter text-white"
                style={{ fontSize: 'clamp(3rem, 8.5vw, 8.5rem)' }}
              >
                Dhruv<br />
                <span className="text-transparent" style={{
                  WebkitTextStroke: '1px rgba(255,255,255,0.35)',
                }}>Gannaram</span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.55} y={20}>
              <div className="mt-6 flex items-center gap-3">
                <span className="h-px w-10 bg-orange-400/60" />
                <p className="text-[9px] sm:text-xs font-semibold uppercase tracking-[0.3em] text-white/70">
                  AI/ML Engineer · NLP Systems · Full-Stack AI
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.75} y={20}>
              <div className="mt-8 flex flex-wrap gap-2">
                {['SIH 2025 Finalist', 'IIIT-H Tech Lead', 'Telugu NLP Pioneer'].map((badge) => (
                  <span
                    key={badge}
                    className="text-[9px] font-bold uppercase tracking-widest text-white/80 border border-white/15 bg-white/5 rounded-full px-3 py-1.5 backdrop-blur-sm"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </FadeIn>

            <FadeIn delay={0.9} y={20}>
              <div className="mt-8 flex gap-4">
                <a
                  href="#projects"
                  className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#080810] bg-white rounded-full px-5 py-2.5 transition-all duration-300 hover:scale-105 hover:bg-orange-50"
                >
                  View Projects
                </a>
                <a
                  href="https://github.com/Dhruv-git-tech"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-white border border-white/25 rounded-full px-5 py-2.5 backdrop-blur-md transition-all duration-300 hover:bg-white/10 hover:border-white/50"
                >
                  GitHub ↗
                </a>
              </div>
            </FadeIn>
          </div>

          {/* RIGHT: Cinematic Animated Avatar */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end items-center order-1 lg:order-2">
            <FadeIn delay={0.4} y={40}>
              <div className="relative" style={{ animation: 'heroFloat 7s ease-in-out infinite' }}>

                {/* Glow rings behind avatar */}
                <div className="absolute inset-0 rounded-full blur-3xl opacity-30 pointer-events-none"
                  style={{ background: 'radial-gradient(circle, rgba(255,140,40,0.6) 0%, transparent 70%)', transform: 'scale(1.3)' }}
                />
                <div className="absolute inset-0 rounded-full blur-xl opacity-20 pointer-events-none"
                  style={{ background: 'radial-gradient(circle, rgba(180,100,255,0.5) 0%, transparent 60%)', transform: 'scale(1.1)', animation: 'pulsePurple 4s ease-in-out infinite' }}
                />

                {/* Main avatar container */}
                <div
                  className="relative overflow-hidden rounded-[40px] group cursor-pointer"
                  style={{
                    width: 'clamp(280px, 30vw, 460px)',
                    height: 'clamp(320px, 34vw, 520px)',
                    border: '1.5px solid rgba(255,255,255,0.12)',
                    background: 'linear-gradient(145deg, rgba(255,255,255,0.06) 0%, rgba(255,140,40,0.04) 100%)',
                    backdropFilter: 'blur(16px)',
                    boxShadow: '0 40px 120px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.1)',
                  }}
                >
                  {/* Avatar image */}
                  <img
                    src="/dhruv_avatar.png"
                    alt="Dhruv Gannaram - AI/ML Engineer Avatar"
                    className="w-full h-full object-cover object-top transition-all duration-1000 ease-out"
                    style={{
                      filter: avatarLoaded ? 'none' : 'blur(12px)',
                      transform: 'scale(1.04)',
                      transition: 'filter 0.8s ease, transform 8s ease-in-out',
                    }}
                    onLoad={() => setAvatarLoaded(true)}
                  />

                  {/* Overlay gradient for cinematic depth */}
                  <div className="absolute inset-0 pointer-events-none" style={{
                    background: 'linear-gradient(to top, rgba(8,8,16,0.7) 0%, rgba(8,8,16,0.1) 40%, transparent 70%)',
                  }} />

                  {/* Bottom name badge inside the avatar */}
                  <div className="absolute bottom-0 left-0 right-0 px-5 pb-5 pt-8">
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/50 mb-1">AI/ML Engineer</p>
                        <p className="text-sm font-bold text-white tracking-tight">Gannaram Dhruv</p>
                      </div>
                      {/* Animated speaking indicator */}
                      <div className="flex items-end gap-[3px] mb-1">
                        {[1, 2, 3, 4, 3].map((h, i) => (
                          <div
                            key={i}
                            className="w-[3px] rounded-full bg-orange-400"
                            style={{
                              height: `${h * 4}px`,
                              animation: `soundBar 1.4s ease-in-out ${i * 0.15}s infinite`,
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Top-right floating tech badge */}
                  <div className="absolute top-4 right-4">
                    <div className="flex items-center gap-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/15 px-3 py-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400" style={{ animation: 'pulse 2s infinite' }} />
                      <span className="text-[8px] font-bold uppercase tracking-widest text-white/80">Live Portfolio</span>
                    </div>
                  </div>
                </div>

                {/* Floating stat cards around avatar */}
                <div
                  className="absolute -left-10 top-1/3 hidden lg:block"
                  style={{ animation: 'floatCard 5s ease-in-out 0.5s infinite' }}
                >
                  <div className="rounded-2xl bg-black/60 backdrop-blur-xl border border-white/10 px-4 py-3 text-left shadow-2xl">
                    <p className="text-[8px] font-bold uppercase tracking-widest text-white/40 mb-1">Hackathon</p>
                    <p className="text-sm font-black text-white">Top 50</p>
                    <p className="text-[9px] text-orange-400 font-semibold">SIH 2025 🏆</p>
                  </div>
                </div>

                <div
                  className="absolute -right-8 top-1/4 hidden lg:block"
                  style={{ animation: 'floatCard 6s ease-in-out 1s infinite' }}
                >
                  <div className="rounded-2xl bg-black/60 backdrop-blur-xl border border-white/10 px-4 py-3 text-left shadow-2xl">
                    <p className="text-[8px] font-bold uppercase tracking-widest text-white/40 mb-1">Repos</p>
                    <p className="text-sm font-black text-white">41+</p>
                    <p className="text-[9px] text-orange-400 font-semibold">GitHub Projects</p>
                  </div>
                </div>

                <div
                  className="absolute -right-6 bottom-1/4 hidden lg:block"
                  style={{ animation: 'floatCard 4.5s ease-in-out 0.3s infinite' }}
                >
                  <div className="rounded-2xl bg-black/60 backdrop-blur-xl border border-white/10 px-4 py-3 text-left shadow-2xl">
                    <p className="text-[8px] font-bold uppercase tracking-widest text-white/40 mb-1">Speciality</p>
                    <p className="text-sm font-black text-white">Telugu</p>
                    <p className="text-[9px] text-orange-400 font-semibold">NLP + RAG 🤖</p>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>

        </div>
      </div>

      {/* ─── BOTTOM BAR ─── */}
      <div className="relative z-20 flex-shrink-0 flex items-end justify-between px-6 sm:px-10 md:px-14 pb-8 sm:pb-10 max-w-screen-2xl mx-auto w-full">
        <FadeIn delay={1.1} y={20}>
          <a href="#about" aria-label="Scroll to About" className="group flex flex-col items-center gap-2.5 cursor-pointer">
            <span className="text-[8px] font-bold uppercase tracking-[0.4em] text-white/40 transition group-hover:text-white/80">Explore</span>
            <div className="relative h-10 w-px overflow-hidden bg-white/15">
              <span className="absolute inset-x-0 top-0 h-1/2 bg-white" style={{ animation: 'scrollLine 2s ease-in-out infinite' }} />
            </div>
          </a>
        </FadeIn>

        <FadeIn delay={1.2} y={20}>
          <div className="flex items-center gap-3">
            {showSoundHint && (
              <span className="hidden sm:block text-[9px] font-bold uppercase tracking-[0.28em] text-white/40" style={{ animation: 'pulseFade 2.5s ease-in-out infinite' }}>
                Move mouse to interact
              </span>
            )}
            <div className="flex items-center gap-1.5 text-white/40 text-[9px] font-bold uppercase tracking-widest">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="12" cy="12" r="10" /><path d="M12 8v4l3 3" />
              </svg>
              <span>Hyderabad, IN</span>
            </div>
          </div>
        </FadeIn>
      </div>

      <style>{`
        @keyframes heroFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-14px); }
        }
        @keyframes floatCard {
          0%, 100% { transform: translateY(0px) rotate(-1deg); }
          50% { transform: translateY(-10px) rotate(1deg); }
        }
        @keyframes soundBar {
          0%, 100% { transform: scaleY(0.4); opacity: 0.5; }
          50% { transform: scaleY(1.6); opacity: 1; }
        }
        @keyframes pulsePurple {
          0%, 100% { opacity: 0.15; transform: scale(1.1); }
          50% { opacity: 0.35; transform: scale(1.25); }
        }
        @keyframes scrollLine {
          0% { transform: translateY(-100%); }
          80%, 100% { transform: translateY(220%); }
        }
        @keyframes pulseFade {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.9; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
