import { useEffect, useRef, useState } from "react";
import "./paperPortfolio.css";

const greetings = [
  "Hello",
  "Bonjour",
  "Hola",
  "Ciao",
  "Ola",
  "Namaste",
  "Konnichiwa",
  "Ni Hao",
  "Guten Tag",
  "Hallo",
  "Privet",
  "Salut",
  "Vanakkam",
  "Anyoung",
  "Merhaba",
];

const projectPanels = [
  {
    title: "VNYL",
    badge: "HTML5",
    year: "2024",
    tag: "AGENCY SITE",
    desc: "A minimalist, digital-analogue portfolio featuring a bespoke bento-grid showcase and custom booking system. Built with Vanilla JS and Tailwind for high-performance, human-centered tactile interaction.",
    img: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=1000&auto=format&fit=crop",
    siteUrl: "https://www.vnyl.in/",
  },
  {
    title: "AURA",
    badge: "PYTHON",
    year: "2024",
    tag: "PCOS RISK API",
    desc: "Machine learning service predicting infertility risk via clinical biomarkers. Features an XGBoost model, FastAPI inference, and SHAP explanations. Includes automated data acquisition and a high-performance prediction pipeline.",
    img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop",
    showMedia: false,
  },
  {
    title: "PANEL PRO",
    badge: "NEXT.JS",
    year: "2026",
    tag: "NEXT.JS FRAMEWORK",
    desc: "A specialized Next.js environment for building modular, panel-based UI experiences. Features a TypeScript-first architecture, Tailwind styling, and a pnpm-optimized workflow for rapid, scalable frontend development and Vercel deployment.",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop",
    siteUrl: "https://pannel-pro-kappa.vercel.app/",
  },
  {
    title: "ZYPHORIA",
    badge: "REACT",
    year: "2025",
    tag: "REACT + VITE CORE",
    desc: "A high-performance React foundation built on Vite. Leverages HMR and SWC/Oxc for lightning-fast development, providing a streamlined, scalable architecture for modern web applications and rapid interface prototyping.",
    img: "https://images.unsplash.com/photo-1503220317375-aaad61436b1b?q=80&w=1000&auto=format&fit=crop",
    siteUrl: "https://zyphoria26.vercel.app/",
  },
  {
    title: "SWOT ML",
    badge: "ML / AI",
    year: "2023",
    tag: "MACHINE LEARNING",
    desc: "Data-driven machine learning model engineered in Python to evaluate core business metrics.",
    img: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=1000&auto=format&fit=crop",
    showMedia: false,
  },
];

const noiseBg = {
  backgroundImage:
    "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
};

export default function PaperPortfolio() {
  const [activePage, setActivePage] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [transitionVisible, setTransitionVisible] = useState(false);
  const [transitionPhase, setTransitionPhase] = useState("idle");
  const [greetingIndex, setGreetingIndex] = useState(0);
  const [preloaderClosing, setPreloaderClosing] = useState(false);
  const [preloaderHidden, setPreloaderHidden] = useState(false);
  const [openPanel, setOpenPanel] = useState(0);

  const homeRef = useRef(null);
  const workRef = useRef(null);
  const aboutRef = useRef(null);
  const panelRefs = useRef([]);
  const transitionTimersRef = useRef([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setGreetingIndex((prev) => (prev + 1) % greetings.length);
    }, 180);

    const timer = setTimeout(() => {
      clearInterval(interval);
      setGreetingIndex(0);
      setPreloaderClosing(true);
      setTimeout(() => setPreloaderHidden(true), 1200);
    }, 2500);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    const workView = workRef.current;

    const onWheel = (e) => {
      if (activePage === "work" && e.deltaY !== 0 && workView) {
        e.preventDefault();
        workView.scrollLeft += e.deltaY;
      }
    };

    if (workView) workView.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      if (workView) workView.removeEventListener("wheel", onWheel);
    };
  }, [activePage]);

  useEffect(() => {
    return () => {
      transitionTimersRef.current.forEach((timer) => clearTimeout(timer));
    };
  }, []);

  useEffect(() => {
    if (activePage === "home" && homeRef.current) homeRef.current.scrollTo(0, 0);
    if (activePage === "work" && workRef.current) workRef.current.scrollTo(0, 0);
    if (activePage === "about" && aboutRef.current) aboutRef.current.scrollTo(0, 0);
  }, [activePage]);

  const navigate = (page) => {
    if (page === activePage) {
      setMenuOpen(false);
      return;
    }

    transitionTimersRef.current.forEach((timer) => clearTimeout(timer));
    transitionTimersRef.current = [];

    setMenuOpen(false);
    setTransitionVisible(true);
    setTransitionPhase("covering");

    transitionTimersRef.current.push(
      setTimeout(() => setActivePage(page), 320),
      setTimeout(() => setTransitionPhase("revealing"), 380),
      setTimeout(() => {
        setTransitionVisible(false);
        setTransitionPhase("idle");
      }, 820)
    );
  };

  const toggleAccordion = (idx) => {
    setOpenPanel(idx);
    setTimeout(() => {
      panelRefs.current[idx]?.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }, 150);
  };

  return (
    <div className="paper-portfolio antialiased font-sans">
      {!preloaderHidden && (
        <div
          className={`fixed inset-0 z-[100] bg-customBlack flex flex-col items-center justify-center transition-transform duration-[1200ms] ease-[cubic-bezier(0.77,0,0.175,1)] origin-top ${preloaderClosing ? "-translate-y-full" : ""}`}
        >
          <div className="absolute inset-0 opacity-[0.15] pointer-events-none" style={noiseBg} />
          <div className="flex items-center text-paperInfo font-serif text-5xl md:text-7xl overflow-hidden relative z-10">
            <span className="tracking-tighter">{greetings[greetingIndex]}</span>
          </div>
        </div>
      )}

      {transitionVisible && (
        <div className={`paper-transition-overlay ${transitionPhase}`}>
          <div className="paper-transition-sheet">
            <div className="paper-transition-crease" />
            <div className="paper-transition-crease second" />
          </div>
        </div>
      )}

      <div
        className={`fixed inset-0 z-[50] flex flex-col justify-center items-center paper-menu-shell ${menuOpen ? "is-open pointer-events-auto" : "is-closed pointer-events-none"}`}
      >
        <div className="paper-menu-sheet" />
        <div className="paper-menu-sheet second" />
        <div className="absolute inset-0 opacity-[0.25] pointer-events-none" style={noiseBg} />
        <button
          onClick={() => setMenuOpen((s) => !s)}
          className={`absolute top-6 right-6 md:top-12 md:right-12 flex flex-col gap-[5px] cursor-pointer hover-target w-8 h-6 justify-center z-[60] menu-trigger ${menuOpen ? "menu-active" : ""}`}
        >
          <div className="line-1 w-full h-[1.5px] bg-paperInfo transition-all duration-300 origin-center" />
          <div className="line-2 w-full h-[1.5px] bg-paperInfo transition-all duration-300 origin-center" />
        </button>

        <nav className="paper-menu-nav flex flex-col text-center gap-6 relative z-10">
          {["home", "work", "about"].map((p) => (
            <button
              key={p}
              onClick={() => navigate(p)}
              className={`paper-menu-link relative text-7xl md:text-8xl lg:text-[8rem] font-serif transition-colors hover-target uppercase tracking-tighter ${activePage === p ? "text-customBrown" : "text-paperInfo hover:text-customBrown"}`}
              style={{ transform: "scaleY(1.2)" }}
            >
              {p}
              {activePage === p && (
                <svg
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[145%] h-[80%] text-red-600 pointer-events-none rotate-[-5deg]"
                  viewBox="0 0 260 120"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M6 56 C 40 74, 86 42, 130 58 C 180 72, 220 44, 254 62"
                    stroke="currentColor"
                    strokeWidth="7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8 76 C 54 88, 96 64, 132 78 C 186 92, 216 66, 252 82"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    opacity="0.85"
                  />
                </svg>
              )}
            </button>
          ))}
        </nav>

        <div className="absolute bottom-10 text-paperInfo uppercase text-xs tracking-[0.3em] font-bold">
          Vol. 01 - The Paper
        </div>
      </div>

      <div
        ref={homeRef}
        className={`page-view w-screen h-screen overflow-y-auto overflow-x-hidden relative ${activePage === "home" ? "" : "hidden"}`}
      >
        <nav className="fixed top-0 w-full z-40 border-b editorial-border flex justify-between items-center px-6 md:px-10 py-5 paper-bg">
          <div className="absolute inset-0 opacity-[0.25] pointer-events-none" style={noiseBg} />
          <div className="text-sm font-serif text-customBlack relative z-10">13°04&apos;57&quot;N 80°16&apos;14&quot;E</div>
          <div className="text-3xl md:text-4xl font-blackletter text-customBlack tracking-wide relative z-10 select-none">
            Portfolio
          </div>
          <button onClick={() => setMenuOpen((s) => !s)} className="flex flex-col gap-[5px] cursor-pointer hover-target w-8 h-4 justify-center relative z-10">
            <div className="w-full h-[1.5px] bg-customBlack" />
            <div className="w-full h-[1.5px] bg-customBlack" />
          </button>
        </nav>

        <div className="pt-[76px] flex flex-col min-h-full">
          <header className="border-b editorial-border relative flex flex-col lg:flex-row flex-grow">
            <div className="flex-1 border-b lg:border-b-0 lg:border-r editorial-border p-6 md:px-10 md:py-16 flex flex-col hover-target group cursor-pointer" onClick={() => navigate("work")}>
              <img
                src="/ascii.gif"
                alt="ASCII art animation"
                className="w-full max-w-[230px] md:max-w-[270px] h-auto object-contain mix-blend-multiply opacity-90 transition-transform duration-700 ease-out group-hover:scale-[1.02]"
              />
            </div>

            <div className="flex-1 border-b lg:border-b-0 lg:border-r editorial-border p-6 md:px-10 md:py-16 flex flex-col items-center justify-center text-center relative">
              <button onClick={() => navigate("work")} className="group relative cursor-pointer hover-target mb-8 flex items-center justify-center outline-none">
                <svg className="absolute w-[130%] h-[140%] opacity-0 group-hover:opacity-100 transition-all duration-500 text-customBrown pointer-events-none z-0 rotate-[-3deg] scale-95 group-hover:scale-100" viewBox="0 0 200 100" fill="none" preserveAspectRatio="none">
                  <path d="M 20 50 C 15 20, 50 10, 100 10 C 150 10, 185 20, 180 50 C 175 80, 150 90, 100 90 C 50 90, 25 80, 20 55 C 18 40, 30 15, 80 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <h2 className="text-6xl md:text-[5rem] lg:text-[6.5rem] font-blackletter text-customBlack leading-none relative z-10 px-4 py-2">
                  All Work!
                </h2>
              </button>

              <p className="font-serif text-3xl md:text-4xl leading-tight mb-16 text-customBlack pointer-events-none">
                A Featured selection
                <br />
                the latest code -
                <br />
                of the last years.
              </p>
              <div className="mb-5 flex flex-wrap items-center justify-center gap-1.5 md:gap-2">
                <button
                  onClick={() => navigate("work")}
                  className="hero-sketch-btn hero-highlight-btn font-bold hover-target"
                >
                  <svg className="hero-sketch-ring" viewBox="0 0 200 100" fill="none" aria-hidden="true">
                    <path d="M 20 52 C 15 22, 52 10, 100 10 C 150 10, 185 22, 180 52 C 176 82, 150 92, 100 92 C 50 92, 22 80, 20 55" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  ML Engineer
                </button>
                <button
                  onClick={() => navigate("work")}
                  className="hero-sketch-btn hero-highlight-btn font-bold hover-target"
                >
                  <svg className="hero-sketch-ring" viewBox="0 0 200 100" fill="none" aria-hidden="true">
                    <path d="M 20 52 C 15 22, 52 10, 100 10 C 150 10, 185 22, 180 52 C 176 82, 150 92, 100 92 C 50 92, 22 80, 20 55" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  UI/UX Designer
                </button>
              </div>
              <button
                onClick={() => navigate("about")}
                className="hero-sketch-btn hero-sketch-btn-lg hero-highlight-btn font-bold hover-target"
              >
                <svg className="hero-sketch-ring" viewBox="0 0 260 100" fill="none" aria-hidden="true">
                  <path d="M 18 55 C 14 22, 62 10, 130 10 C 198 10, 246 22, 242 55 C 238 84, 198 94, 130 94 C 62 94, 22 82, 18 58" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                About Us
              </button>
            </div>

            <div className="flex-1 p-6 md:px-10 md:py-16 flex flex-col hover-target group cursor-pointer" onClick={() => navigate("work")}>
              <img
                src="/ascii.gif"
                alt="ASCII art animation"
                className="w-full max-w-[230px] md:max-w-[270px] h-auto object-contain mix-blend-multiply opacity-90 transition-transform duration-700 ease-out group-hover:scale-[1.02] ml-auto scale-x-[-1]"
              />
            </div>
          </header>

          <div className="bg-[#1a1a1a] w-full overflow-hidden border-b editorial-border pt-12 md:pt-16 flex justify-center hover-target flex-grow">
            <h1 className="text-paperInfo text-[22vw] md:text-[26vw] leading-[0.72] font-blackletter tracking-tighter text-center -mb-[4vw] md:-mb-[5vw] select-none" style={{ transform: "scaleY(1.1)" }}>
              Christopher
            </h1>
          </div>
        </div>
      </div>

      <div
        ref={workRef}
        className={`page-view w-screen h-screen overflow-x-auto overflow-y-hidden no-scrollbar relative ${activePage === "work" ? "flex" : "hidden"}`}
      >
        <div className="w-16 md:w-[5.5rem] border-r editorial-border flex flex-col justify-between items-center py-12 shrink-0 sticky left-0 z-30 paper-bg">
          <div className="absolute inset-0 opacity-[0.25] pointer-events-none" style={noiseBg} />
          <button onClick={() => setMenuOpen((s) => !s)} className="flex flex-col gap-[5px] cursor-pointer hover-target w-6 h-4 justify-center relative z-10">
            <div className="w-full h-[1.5px] bg-customBlack" />
            <div className="w-full h-[1.5px] bg-customBlack" />
          </button>
          <div className="text-vertical font-blackletter text-2xl tracking-widest relative z-10 select-none cursor-pointer hover-target" onClick={() => navigate("home")}>
            Portfolio
          </div>
          <div className="text-vertical-reverse text-[0.6rem] uppercase tracking-[0.2em] font-serif relative z-10 select-none">
            13°04&apos;57&quot;N 80°16&apos;14&quot;E
          </div>
        </div>

        <section className="min-w-[90vw] lg:min-w-[50vw] xl:min-w-[45vw] border-r editorial-border flex flex-col justify-center shrink-0 pl-12 pr-16 xl:pl-20 xl:pr-24 relative">
          <div className="flex flex-col items-start w-full max-w-[650px] mx-auto">
            <div className="bg-customBlack text-paperInfo font-serif text-[7.5rem] lg:text-[8.5rem] xl:text-[9.5rem] leading-[0.75] tracking-super-tight px-4 pt-5 pb-2 uppercase mb-4 w-fit select-none flex items-center justify-center">
              <span style={{ transform: "scaleY(1.15)", display: "inline-block" }}>FEATURED</span>
            </div>

            <div className="flex items-end gap-5 mb-14 w-full">
              <div className="bg-customBlack text-paperInfo font-serif text-[7.5rem] lg:text-[8.5rem] xl:text-[9.5rem] leading-[0.75] tracking-super-tight px-4 pt-5 pb-2 uppercase w-fit select-none flex items-center justify-center shrink-0">
                <span style={{ transform: "scaleY(1.15)", display: "inline-block" }}>WORK</span>
              </div>

              <div className="w-[6.5rem] xl:w-32 aspect-[4/5] border-[1.5px] border-dotted border-[#a39f92] p-1.5 flex flex-col items-center bg-transparent mb-1.5 shrink-0 select-none relative z-10">
                <svg viewBox="0 0 100 50" className="w-[85%] mt-1">
                  <path d="M50,50 L20,15 M50,50 L35,5 M50,50 L50,0 M50,50 L65,5 M50,50 L80,15 M50,50 L10,35 M50,50 L90,35" stroke="#cc4a14" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M5,42 Q25,25 45,45 T95,35" fill="none" stroke="black" strokeWidth="1.5" />
                </svg>
                <div className="text-[0.35rem] xl:text-[0.4rem] font-sans border-t border-customBlack text-center w-[90%] uppercase tracking-[0.1em] pt-[3px] leading-tight mt-auto text-customBlack font-bold">
                  NAME: Christopher
                  <br />
                  DATE: 2024
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4 xl:gap-5 w-full max-w-[550px]">
              <div className="bg-customBlack text-paperInfo w-[5.5rem] h-[6.5rem] xl:w-[6.5rem] xl:h-[7.5rem] shrink-0 flex items-center justify-center font-blackletter text-6xl xl:text-[5rem] pt-3 select-none">
                A
              </div>
              <p className="font-serif text-[1.65rem] xl:text-[1.85rem] leading-[1.05] tracking-tight text-customBlack pt-1">
                s a developer, I don't settle for bad UX or sloppy code. I build robust digital tools and experimental algorithms from the ground up, turning complex logic into accessible reality.
              </p>
            </div>
          </div>
        </section>

        {projectPanels.map((project, idx) => (
          <div
            key={project.title}
            ref={(el) => {
              panelRefs.current[idx] = el;
            }}
            className="project-panel flex flex-row h-full shrink-0 group cursor-pointer"
            onClick={() => toggleAccordion(idx)}
          >
            <div className="w-24 md:w-[7.5rem] border-r editorial-border flex flex-col justify-between items-center py-12 shrink-0 hover:bg-white/20 transition-colors hover-target relative">
              <div className="text-vertical text-5xl md:text-6xl font-serif uppercase tracking-tight text-customBlack select-none" style={{ transform: "scaleX(1.15)" }}>
                {project.title}
              </div>
              <div className="flex flex-col items-center gap-3 select-none">
                <span className="bg-badgeOrange text-white text-[0.65rem] font-sans font-bold px-1.5 py-1 rounded-[1px] tracking-widest leading-none">
                  {project.badge}
                </span>
                <span className="text-[0.95rem] font-serif text-customBlack">{project.year}</span>
              </div>
            </div>
            <div className={`panel-content overflow-hidden transition-all duration-[800ms] ease-[cubic-bezier(0.77,0,0.175,1)] flex flex-col shrink-0 relative bg-paperInfo cursor-default ${openPanel === idx ? "w-[85vw] md:w-[45vw] border-r opacity-100 editorial-border" : "w-0 border-r-0 opacity-0"}`}>
              <div className="absolute inset-0 opacity-[0.25] pointer-events-none" style={noiseBg} />
              <div className="w-[85vw] md:w-[45vw] h-full flex flex-col shrink-0 relative z-10">
                <div className="p-8 flex-1 flex flex-col items-center justify-center">
                  <span className="bg-customBlack text-paperInfo px-2 py-0.5 text-[0.65rem] font-bold tracking-[0.2em] uppercase mb-8">{project.tag}</span>
                  <h2 className="text-7xl md:text-[7rem] font-serif text-customBlack mb-6 text-center leading-none tracking-tighter" style={{ transform: "scaleY(1.3)" }}>{project.title}</h2>
                  <p className="font-serif text-xl md:text-2xl text-center max-w-sm text-customBlack leading-snug">{project.desc}</p>
                </div>
                {project.showMedia !== false && (
                  <div className="w-full h-[55%] border-t editorial-border overflow-hidden bg-black flex items-center justify-center">
                    {project.siteUrl ? (
                    <a
                      href={project.siteUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="group block w-[92%] h-[96%] bg-[#121212]"
                      onClick={(e) => e.stopPropagation()}
                      aria-label={`Open live site for ${project.title}`}
                    >
                      <div className="h-full w-full p-2 md:p-3">
                        <div className="h-full w-full rounded-lg overflow-hidden border border-[#2f2f2f] bg-[#111] shadow-[0_10px_24px_rgba(0,0,0,0.35)]">
                          <div className="h-8 bg-[#1e1e1e] border-b border-[#2f2f2f] flex items-center gap-2 px-3">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                            <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                            <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                            <div className="ml-3 text-[0.62rem] text-[#bcbcbc] bg-[#2a2a2a] rounded px-2 py-[2px] truncate">
                              {project.siteUrl}
                            </div>
                          </div>
                          <div className="relative h-[calc(100%-2rem)]">
                            <iframe
                              src={project.siteUrl}
                              title={`${project.title} live preview`}
                              loading="lazy"
                              className="w-full h-full border-0"
                              referrerPolicy="no-referrer-when-downgrade"
                            />
                            <div className="absolute inset-0 pointer-events-none ring-1 ring-white/5" />
                            <div className="absolute bottom-2 right-2 bg-black/70 text-white text-[0.62rem] px-2 py-1 rounded uppercase tracking-wider">
                              Open Live Site
                            </div>
                          </div>
                        </div>
                      </div>
                    </a>
                  ) : (
                      <img
                        src={project.img}
                        alt={project.title}
                        className="w-full h-full object-cover grayscale mix-blend-multiply hover:grayscale-0 hover:scale-105 transition-all duration-1000 opacity-80"
                      />
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        <div className="w-20 md:w-[30vw] shrink-0 pointer-events-none" />
      </div>

      <div
        ref={aboutRef}
        className={`page-view w-screen h-screen overflow-y-auto overflow-x-hidden relative ${activePage === "about" ? "" : "hidden"}`}
      >
        <nav className="fixed top-0 w-full z-40 border-b editorial-border flex justify-between items-center px-6 md:px-10 py-5 paper-bg">
          <div className="absolute inset-0 opacity-[0.25] pointer-events-none" style={noiseBg} />
          <div className="text-sm font-serif text-customBlack relative z-10">13°04&apos;57&quot;N 80°16&apos;14&quot;E</div>
          <div className="text-3xl md:text-4xl font-blackletter text-customBlack tracking-wide relative z-10 select-none cursor-pointer hover-target" onClick={() => navigate("home")}>
            Portfolio
          </div>
          <button onClick={() => setMenuOpen((s) => !s)} className="flex flex-col gap-[5px] cursor-pointer hover-target w-8 h-4 justify-center relative z-10">
            <div className="w-full h-[1.5px] bg-customBlack" />
            <div className="w-full h-[1.5px] bg-customBlack" />
          </button>
        </nav>

        <div className="pt-[90px] flex flex-col min-h-full pb-20">
          <div className="px-6 md:px-10 mt-6">
            <div className="bg-customBlack text-paperInfo w-full flex justify-center items-center py-4 md:py-8 overflow-hidden select-none">
              <h1 className="font-blackletter text-[21vw] leading-[0.75] tracking-tighter whitespace-nowrap" style={{ transform: "scaleY(1.2)" }}>
                About Me
              </h1>
            </div>
          </div>

          <div className="px-6 md:px-10 mt-10 md:mt-16 w-full">
            <p className="font-serif text-[2.5rem] md:text-6xl lg:text-[6.5rem] leading-[0.9] tracking-tight text-customBlack">
              <span className="inline-flex gap-1.5 md:gap-3 align-middle mr-2 md:mr-4 text-customBlack pb-2 md:pb-5">
                <svg className="w-[0.6em] h-[0.6em] md:w-[0.7em] md:h-[0.7em] rotate-45" viewBox="0 0 100 100" fill="currentColor">
                  <rect x="30" y="0" width="40" height="100" />
                  <rect x="0" y="30" width="100" height="40" />
                </svg>
                <svg className="w-[0.6em] h-[0.6em] md:w-[0.7em] md:h-[0.7em] rotate-45" viewBox="0 0 100 100" fill="currentColor">
                  <rect x="30" y="0" width="40" height="100" />
                  <rect x="0" y="30" width="100" height="40" />
                </svg>
                <svg className="w-[0.6em] h-[0.6em] md:w-[0.7em] md:h-[0.7em] rotate-45" viewBox="0 0 100 100" fill="currentColor">
                  <rect x="30" y="0" width="40" height="100" />
                  <rect x="0" y="30" width="100" height="40" />
                </svg>
              </span>
              Broke, young, and broke-an independent overthinker &amp; developer building something while surviving another day.
            </p>

            <div className="mt-12 md:mt-24 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 border-t editorial-border pt-12 md:pt-16">
              <div className="md:col-span-4 lg:col-span-3">
                <div className="font-blackletter text-4xl mb-4">The Reality</div>
                <div className="w-12 h-1 bg-customBrown mb-6" />
              </div>
              <div className="md:col-span-8 lg:col-span-9 max-w-4xl">
                <p className="font-serif text-2xl md:text-4xl leading-[1.2] text-customBlack mb-8 italic">
                  "Never settle - not for bugs, not for bad UX, and definitely not for code that crashes before coffee."
                </p>
                <p className="font-serif text-xl md:text-2xl leading-[1.4] text-customBlack opacity-90 mb-6">
                  I build high-end digital experiences, ML models, and backend systems because therapy is expensive and debugging is cheaper.
                </p>
                <p className="font-serif text-xl md:text-2xl leading-[1.4] text-customBlack opacity-90">
                  Surviving on instant ramen, cheap coffee, and questionable life choices - while shipping clean, scalable work like my rent depends on uptime.
                </p>

                <div className="mt-10 border-l-2 border-customBrown pl-5">
                  <div className="font-sans text-xs md:text-sm uppercase tracking-[0.2em] text-customBrown mb-3">
                    Connect With Us
                  </div>
                  <p className="font-serif text-lg md:text-xl text-customBlack mb-1.5">
                    PHN:{" "}
                    <a href="tel:+919025726185" className="underline decoration-black/40 hover:decoration-black transition-colors hover-target">
                      9025726185
                    </a>
                  </p>
                  <p className="font-serif text-lg md:text-xl text-customBlack">
                    EMAIL:{" "}
                    <a
                      href="mailto:christopherjesuraj678@gmail.com"
                      className="underline decoration-black/40 hover:decoration-black transition-colors break-all hover-target"
                    >
                      christopherjesuraj678@gmail.com
                    </a>
                  </p>
                </div>

                <div className="mt-12 pt-8 border-t border-black/20 flex gap-4 items-center">
                  <a
                    href="https://github.com/christhecreator56"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="GitHub Profile"
                    className="w-12 h-12 rounded-full border border-black flex items-center justify-center hover:bg-black hover:text-paperInfo transition-colors hover-target"
                  >
                    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor" aria-hidden="true">
                      <path d="M12 2C6.48 2 2 6.59 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49 0-.24-.01-1.04-.01-1.89-2.78.62-3.37-1.21-3.37-1.21-.45-1.19-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .08 1.53 1.06 1.53 1.06.9 1.59 2.35 1.13 2.92.86.09-.67.35-1.13.63-1.39-2.22-.26-4.56-1.15-4.56-5.09 0-1.12.39-2.04 1.03-2.76-.1-.26-.45-1.32.1-2.74 0 0 .84-.28 2.75 1.05a9.18 9.18 0 0 1 5 0c1.9-1.33 2.74-1.05 2.74-1.05.56 1.42.21 2.48.1 2.74.64.72 1.03 1.64 1.03 2.76 0 3.95-2.34 4.82-4.57 5.08.36.32.68.95.68 1.92 0 1.39-.01 2.5-.01 2.84 0 .27.18.6.69.49A10.24 10.24 0 0 0 22 12.25C22 6.59 17.52 2 12 2Z" />
                    </svg>
                  </a>
                  <a
                    href="https://www.instagram.com/ft.chrizzy?igsh=ajZkYjBmbHdmamp5"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Instagram"
                    className="w-12 h-12 rounded-full border border-black flex items-center justify-center hover:bg-black hover:text-paperInfo transition-colors hover-target"
                  >
                    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" aria-hidden="true">
                      <rect x="3.2" y="3.2" width="17.6" height="17.6" rx="5.2" stroke="currentColor" strokeWidth="1.9" />
                      <circle cx="12" cy="12" r="4.15" stroke="currentColor" strokeWidth="1.9" />
                      <circle cx="17.3" cy="6.8" r="1.25" fill="currentColor" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
