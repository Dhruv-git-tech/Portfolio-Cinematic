import FadeIn from './FadeIn';
import ContactButton from './ContactButton';
import AnimatedText from './AnimatedText';

const ABOUT_TEXT =
  "I'm a final-year Computer Science student at MECS with a strong foundation in AI/ML, NLP pipelines, and LLM integration. As a former Tech Lead for a IIIT Hyderabad-backed regional AI corpus initiative, I specialize in building robust, production-grade AI systems, RAG architectures, and responsive full-stack applications. Let's build the future of AI together!";

const AboutSection = () => {
  return (
    <section
      id="about"
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden px-5 sm:px-8 md:px-10 py-20"
    >
      {/* Corner decorative 3D images */}
      <FadeIn
        delay={0.1}
        x={-80}
        y={0}
        duration={0.9}
          className="pointer-events-none absolute top-[4%] left-[1%] sm:left-[2%] md:left-[4%] w-[60px] sm:w-[160px] md:w-[210px] opacity-25 sm:opacity-50"
      >
        <img
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png"
          alt=""
          className="w-full h-auto"
          loading="lazy"
          draggable={false}
        />
      </FadeIn>

      <FadeIn
        delay={0.25}
        x={-80}
        y={0}
        duration={0.9}
          className="pointer-events-none absolute bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%] w-[55px] sm:w-[140px] md:w-[180px] opacity-25 sm:opacity-50"
      >
        <img
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png"
          alt=""
          className="w-full h-auto"
          loading="lazy"
          draggable={false}
        />
      </FadeIn>

      <FadeIn
        delay={0.15}
        x={80}
        y={0}
        duration={0.9}
          className="pointer-events-none absolute top-[4%] right-[1%] sm:right-[2%] md:right-[4%] w-[60px] sm:w-[160px] md:w-[210px] opacity-25 sm:opacity-50"
      >
        <img
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png"
          alt=""
          className="w-full h-auto"
          loading="lazy"
          draggable={false}
        />
      </FadeIn>

      <FadeIn
        delay={0.3}
        x={80}
        y={0}
        duration={0.9}
          className="pointer-events-none absolute bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%] w-[65px] sm:w-[170px] md:w-[220px] opacity-25 sm:opacity-50"
      >
        <img
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png"
          alt=""
          className="w-full h-auto"
          loading="lazy"
          draggable={false}
        />
      </FadeIn>

      {/* Center content */}
      <div className="relative z-10 flex flex-col items-center gap-10 sm:gap-14 md:gap-16 text-center w-full max-w-5xl">
        <FadeIn delay={0} y={40}>
          <h2
            className="hero-heading font-black uppercase leading-none tracking-tight"
            style={{ fontSize: 'clamp(3rem, 12vw, 120px)' }}
          >
            About me
          </h2>
        </FadeIn>

        <div className="flex flex-col items-center gap-12 sm:gap-16 md:gap-20 w-full">
          {/* Profile picture & Description Layout */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-14 max-w-4xl w-full text-left">
            <FadeIn delay={0.1} y={30} className="w-[180px] sm:w-[220px] md:w-[260px] shrink-0">
              <div className="relative aspect-square rounded-[32px] overflow-hidden border-2 border-[#D7E2EA]/20 bg-[#141418] p-2 hover:border-[#D7E2EA]/50 transition-all duration-500 group shadow-2xl">
                <img
                  src="/dhruv.jpeg"
                  alt="Gannaram Dhruv Profile"
                  className="w-full h-full object-cover rounded-[24px] grayscale group-hover:grayscale-0 transition-all duration-700 ease-out scale-105 group-hover:scale-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none opacity-60 group-hover:opacity-20 transition-opacity duration-500" />
              </div>
            </FadeIn>

            <div className="flex-1 flex flex-col gap-6">
              <AnimatedText
                text={ABOUT_TEXT}
                className="font-medium leading-relaxed text-[#D7E2EA] w-full text-center md:text-left"
                style={{ fontSize: 'clamp(1rem, 1.8vw, 1.25rem)' }}
              />
              
              <FadeIn delay={0.2} y={20} className="text-center md:text-left">
                <p className="text-sm font-light text-[#D7E2EA]/70 tracking-wide">
                  📍 Hyderabad, India  •  🏆 SIH 2025 Finalist  •  💻 IIIT-H Summer of AI Tech Lead
                </p>
              </FadeIn>
            </div>
          </div>

          {/* Skills */}
          <FadeIn delay={0.15} className="w-full max-w-4xl">
            <div className="flex flex-col gap-5 sm:gap-6 bg-[#141418]/40 border border-[#D7E2EA]/10 p-6 sm:p-8 rounded-[40px] backdrop-blur-md">
              {[
                {
                  label: 'Languages',
                  items: ['Python', 'JavaScript', 'Java', 'C++', 'C', 'SQL'],
                },
                {
                  label: 'AI & ML Tools',
                  items: ['NLP', 'LLM Integration', 'RAG', 'Prompt Engineering', 'TensorFlow', 'Scikit-learn', 'XGBoost', 'Hugging Face', 'OpenCV', 'MediaPipe'],
                },
                {
                  label: 'Web / Full-Stack',
                  items: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Firebase', 'REST APIs', 'Tailwind CSS'],
                },
                {
                  label: 'Specializations',
                  items: ['Hallucination Control', 'Token Optimization', 'Linguistic Filtering', 'Metadata Extraction', 'Low-Resource LLM Training (Telugu)'],
                },
                {
                  label: 'Platforms & Tools',
                  items: ['Git', 'Docker', 'Dify', 'Streamlit', 'Postman'],
                },
              ].map((group) => (
                <div
                  key={group.label}
                  className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-5 text-left"
                >
                  <span className="text-xs uppercase tracking-widest text-[#D7E2EA]/40 sm:w-44 sm:shrink-0 sm:text-right font-medium">
                    {group.label}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-[#D7E2EA]/10 bg-[#D7E2EA]/[0.02] px-3.5 py-1.5 text-xs sm:text-sm text-[#D7E2EA]/85 hover:border-[#D7E2EA]/40 hover:bg-[#D7E2EA]/5 hover:text-[#D7E2EA] transition-all duration-300"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.25}>
            <ContactButton />
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

