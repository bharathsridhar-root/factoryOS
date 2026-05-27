import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '../store';
import { stakeholderProfiles } from '../content';

const journeySteps = [
  { label: 'Fragmentation', sub: 'Unknown. Invisible. Unmanaged.', color: '#D64545' },
  { label: 'Visibility', sub: 'Discovered. Mapped. Monitored.', color: '#F5A623' },
  { label: 'Context', sub: 'Connected. Semantic. Trusted.', color: '#00A3E0' },
  { label: 'Intelligence', sub: 'Predicted. Optimized. Twinned.', color: '#005EB8' },
  { label: 'Autonomy', sub: 'Self-aware. Self-healing. Self-optimizing.', color: '#12B3A8' },
];

export function HeroScene() {
  const { stakeholder } = useAppStore();
  const profile = stakeholderProfiles[stakeholder];
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep(s => (s + 1) % journeySteps.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden grid-lines pt-14">
      {/* Animated background radial */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(0,94,184,0.06) 0%, transparent 70%)',
        }}
      />

      {/* Floating industrial nodes background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(18)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border"
            style={{
              width: 6 + (i % 3) * 4,
              height: 6 + (i % 3) * 4,
              left: `${5 + (i * 17) % 90}%`,
              top: `${10 + (i * 13) % 80}%`,
              borderColor: `${journeySteps[i % 5].color}40`,
              background: `${journeySteps[i % 5].color}15`,
            }}
            animate={{
              y: [0, -12, 0],
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{
              duration: 3 + (i % 3),
              delay: i * 0.3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
        {/* Connection lines SVG */}
        <svg className="absolute inset-0 w-full h-full opacity-10" style={{ pointerEvents: 'none' }}>
          <defs>
            <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#005EB8" stopOpacity="0" />
              <stop offset="50%" stopColor="#00A3E0" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#005EB8" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[...Array(6)].map((_, i) => (
            <motion.line
              key={i}
              x1={`${10 + i * 15}%`} y1={`${20 + i * 10}%`}
              x2={`${40 + i * 12}%`} y2={`${50 + i * 8}%`}
              stroke="url(#lineGrad)"
              strokeWidth="1"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: [0, 1, 0] }}
              transition={{ duration: 3, delay: i * 0.5, repeat: Infinity }}
            />
          ))}
        </svg>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Stakeholder-adaptive headline */}
        <AnimatePresence mode="wait">
          <motion.div
            key={stakeholder}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full glass border border-[rgba(0,94,184,0.15)]">
              <span className="w-2 h-2 rounded-full status-online" />
              <span className="text-xs font-semibold text-[#005EB8]">FactoryOS · {stakeholder.replace(/([A-Z])/g, ' $1').trim()}</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold leading-[1.08] mb-6 tracking-tight">
              <span className="gradient-text-deep">{profile.headline}</span>
            </h1>

            <p className="text-xl md:text-2xl text-[#4A6B8A] max-w-2xl mx-auto mb-12 leading-relaxed font-light">
              {profile.subhead}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Journey progression */}
        <div className="flex items-center justify-center gap-0 mb-16 overflow-x-auto pb-2">
          {journeySteps.map((step, i) => (
            <div key={step.label} className="flex items-center">
              <motion.button
                onClick={() => setActiveStep(i)}
                className="relative flex flex-col items-center px-4 py-3 rounded-xl transition-all"
                animate={{
                  background: activeStep === i ? `${step.color}12` : 'transparent',
                }}
              >
                <div
                  className="w-3 h-3 rounded-full mb-2 transition-all duration-500"
                  style={{
                    background: i <= activeStep ? step.color : 'rgba(0,59,115,0.15)',
                    boxShadow: activeStep === i ? `0 0 12px ${step.color}60` : 'none',
                  }}
                />
                <span
                  className="text-xs font-semibold whitespace-nowrap transition-colors"
                  style={{ color: activeStep === i ? step.color : '#9CA3AF' }}
                >
                  {step.label}
                </span>
                {activeStep === i && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-[10px] text-center mt-1 max-w-[90px]"
                    style={{ color: step.color }}
                  >
                    {step.sub}
                  </motion.span>
                )}
              </motion.button>
              {i < journeySteps.length - 1 && (
                <div
                  className="w-8 h-0.5 transition-all duration-700"
                  style={{
                    background: i < activeStep
                      ? `linear-gradient(90deg, ${journeySteps[i].color}, ${journeySteps[i+1].color})`
                      : 'rgba(0,59,115,0.1)',
                  }}
                />
              )}
            </div>
          ))}
        </div>

        {/* Core message cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
          {[
            { icon: '', label: 'OT Visibility', sub: 'Foundation of everything' },
            { icon: '', label: 'Operational Context', sub: 'The missing semantic layer' },
            { icon: '', label: 'Digital Twin Intelligence', sub: 'Decision systems, not dashboards' },
          ].map((card, i) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.15 }}
              className="glass rounded-2xl p-5 card-lift text-left"
            >
              <div className="text-3xl mb-3">{card.icon}</div>
              <div className="font-semibold text-[#003B73] mb-1">{card.label}</div>
              <div className="text-sm text-[#6B7E9E]">{card.sub}</div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col items-center gap-4"
        >
          <p className="text-sm text-[#9AAFBE] font-medium tracking-wide">
            SCROLL TO EXPLORE THE FACTORYOS JOURNEY
          </p>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-[rgba(0,94,184,0.3)] flex items-start justify-center pt-2"
          >
            <div className="w-1 h-2.5 bg-[#005EB8] rounded-full opacity-60" />
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: 'linear-gradient(transparent, #F7FAFC)' }} />
    </section>
  );
}
