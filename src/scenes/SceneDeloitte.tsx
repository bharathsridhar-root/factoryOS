import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { deloitteData } from '../content';

const DELOITTE_GREEN = '#86BC25';
const DELOITTE_DARK  = '#012169';

export function SceneDeloitte() {
  const [activePhaseIdx, setActivePhaseIdx] = useState(0);
  const [hoveredAccel, setHoveredAccel] = useState<string | null>(null);

  const activePhase = deloitteData.phaseServices[activePhaseIdx];

  const phaseColors = ['#F5A623', '#005EB8', '#12B3A8'];
  const phaseIcons  = ['👁', '🧠', '⚡'];

  return (
    <section id="deloitte" className="relative py-32 overflow-hidden" style={{ background: 'linear-gradient(180deg, #F0F8E8 0%, #F7FAFC 60%, #EAF4FF 100%)' }}>
      <div className="absolute inset-0 grid-lines opacity-15 pointer-events-none" />

      {/* Deloitte green accent line at top */}
      <div className="absolute top-0 left-0 right-0 h-1" style={{ background: `linear-gradient(90deg, transparent 0%, ${DELOITTE_GREEN} 30%, ${DELOITTE_GREEN} 70%, transparent 100%)` }} />

      <div className="max-w-screen-xl mx-auto px-6">

        {/* Header — Deloitte branded */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="h-px flex-1 max-w-16" style={{ background: `linear-gradient(90deg, transparent, ${DELOITTE_GREEN})` }} />
            <span
              className="text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full"
              style={{ color: DELOITTE_GREEN, background: `${DELOITTE_GREEN}18`, border: `1px solid ${DELOITTE_GREEN}30` }}
            >
              Scene 12 · Deloitte Partnership
            </span>
            <div className="h-px flex-1 max-w-16" style={{ background: `linear-gradient(90deg, ${DELOITTE_GREEN}, transparent)` }} />
          </div>

          {/* Deloitte wordmark */}
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="flex items-center gap-1">
              <span className="text-3xl font-black tracking-tight" style={{ color: DELOITTE_DARK }}>Deloitte</span>
              <div className="w-2 h-2 rounded-full" style={{ background: DELOITTE_GREEN }} />
            </div>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-5 leading-tight" style={{ color: '#003B73' }}>
            Your transformation partner.<br />
            <span style={{ color: DELOITTE_GREEN }}>From strategy to autonomous operations.</span>
          </h2>
          <p className="text-lg text-[#4A6B8A] leading-relaxed">{deloitteData.description}</p>
        </motion.div>

        {/* Phase services */}
        <div className="mb-16">
          <h3 className="text-xl font-bold text-[#003B73] text-center mb-3">How Deloitte supports every phase</h3>
          <p className="text-sm text-[#6B7E9E] text-center mb-8">Select a phase to see the specific services we deliver</p>

          {/* Phase tabs */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6 max-w-2xl mx-auto">
            {deloitteData.phaseServices.map((p, i) => (
              <button
                key={p.phase}
                onClick={() => setActivePhaseIdx(i)}
                className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium text-sm transition-all"
                style={{
                  background: activePhaseIdx === i ? phaseColors[i] : 'white',
                  color: activePhaseIdx === i ? 'white' : '#6B7E9E',
                  border: `2px solid ${activePhaseIdx === i ? phaseColors[i] : 'rgba(0,94,184,0.1)'}`,
                  boxShadow: activePhaseIdx === i ? `0 4px 16px ${phaseColors[i]}40` : 'none',
                }}
              >
                <span>{phaseIcons[i]}</span>
                <span>{p.phase.split(' ')[0]}</span>
              </button>
            ))}
          </div>

          {/* Services grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activePhaseIdx}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
            >
              {activePhase.services.map((svc, i) => (
                <motion.div
                  key={svc.name}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                  className="glass rounded-2xl p-5 card-lift"
                  style={{ borderTop: `3px solid ${phaseColors[activePhaseIdx]}` }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-2xl">{svc.icon}</span>
                    <span
                      className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                      style={{ background: `${phaseColors[activePhaseIdx]}12`, color: phaseColors[activePhaseIdx] }}
                    >
                      {svc.duration}
                    </span>
                  </div>
                  <div className="text-sm font-bold text-[#003B73] mb-2">{svc.name}</div>
                  <div className="text-xs text-[#6B7E9E] leading-relaxed">{svc.desc}</div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Why Deloitte */}
        <div className="mb-16">
          <h3 className="text-xl font-bold text-[#003B73] text-center mb-8">Why Deloitte for OT transformation</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {deloitteData.differentiators.map((diff, i) => (
              <motion.div
                key={diff.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-2xl p-6 card-lift"
                style={{ borderBottom: `3px solid ${DELOITTE_GREEN}` }}
              >
                <div className="text-3xl mb-4">{diff.icon}</div>
                <div className="text-sm font-bold text-[#003B73] mb-2">{diff.title}</div>
                <div className="text-xs text-[#6B7E9E] leading-relaxed">{diff.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Accelerators */}
        <div className="mb-12">
          <h3 className="text-xl font-bold text-[#003B73] text-center mb-3">Deloitte Accelerators — pre-built, pre-validated</h3>
          <p className="text-sm text-[#6B7E9E] text-center mb-8">Proprietary tools that cut 40% off delivery time vs. build-from-scratch</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {deloitteData.accelerators.map((acc, i) => (
              <motion.div
                key={acc.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                onMouseEnter={() => setHoveredAccel(acc.name)}
                onMouseLeave={() => setHoveredAccel(null)}
                className="relative rounded-2xl p-5 cursor-default transition-all"
                style={{
                  background: hoveredAccel === acc.name ? `${DELOITTE_GREEN}10` : 'white',
                  border: `2px solid ${hoveredAccel === acc.name ? DELOITTE_GREEN : `${DELOITTE_GREEN}30`}`,
                  boxShadow: hoveredAccel === acc.name ? `0 8px 24px ${DELOITTE_GREEN}20` : 'none',
                }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">{acc.icon}</span>
                  <span className="text-sm font-bold" style={{ color: DELOITTE_DARK }}>{acc.name}</span>
                </div>
                <p className="text-xs text-[#6B7E9E] leading-relaxed">{acc.desc}</p>
                {hoveredAccel === acc.name && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute top-3 right-3 text-xs font-bold px-2 py-0.5 rounded-full"
                    style={{ background: DELOITTE_GREEN, color: 'white' }}
                  >
                    Ready
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Engagement CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-3xl p-8 md:p-10"
          style={{ background: `linear-gradient(135deg, ${DELOITTE_DARK}06, ${DELOITTE_GREEN}06)`, border: `2px solid ${DELOITTE_GREEN}25` }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="text-sm font-bold uppercase tracking-widest mb-2" style={{ color: DELOITTE_GREEN }}>Next Step</div>
              <h3 className="text-2xl font-bold text-[#003B73] mb-4">
                Start with a 4-week OT Maturity Assessment
              </h3>
              <p className="text-sm text-[#4A6B8A] mb-6 leading-relaxed">
                Deloitte's OT Maturity Assessment benchmarks your current state against life sciences industry peers, quantifies the risk and value gap, and produces a detailed business case and roadmap — ready to present to leadership in 4 weeks.
              </p>
              <div className="flex flex-col gap-2">
                {[
                  'Benchmarked gap analysis vs. pharma / life sciences peers',
                  'Quantified business case (ROI, risk reduction, compliance gaps)',
                  'Prioritised 36-month transformation roadmap',
                  'Board-ready presentation package',
                ].map(item => (
                  <div key={item} className="flex items-center gap-2 text-xs text-[#4A6B8A]">
                    <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: DELOITTE_GREEN }} />
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="glass rounded-2xl p-5" style={{ border: `1px solid ${DELOITTE_GREEN}20` }}>
                <div className="text-xs font-bold uppercase tracking-wide mb-3" style={{ color: DELOITTE_GREEN }}>Engagement details</div>
                {[
                  { label: 'Duration', value: '4 weeks' },
                  { label: 'Delivery', value: 'On-site + remote' },
                  { label: 'Team',     value: 'OT architect + security + strategy' },
                  { label: 'Output',   value: 'Business case + roadmap' },
                ].map(item => (
                  <div key={item.label} className="flex justify-between py-1.5 border-b border-[rgba(0,59,115,0.06)] last:border-0">
                    <span className="text-xs text-[#9CA3AF]">{item.label}</span>
                    <span className="text-xs font-semibold text-[#003B73]">{item.value}</span>
                  </div>
                ))}
              </div>
              <button
                onClick={() => document.getElementById('cio')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full py-4 rounded-2xl text-sm font-bold text-white transition-all hover:opacity-90 active:scale-95"
                style={{ background: `linear-gradient(135deg, ${DELOITTE_GREEN}, #5A8A1A)`, boxShadow: `0 8px 24px ${DELOITTE_GREEN}40` }}
              >
                View Executive Summary ↓
              </button>
              <p className="text-[10px] text-center text-[#9CA3AF]">
                Deloitte Touche Tohmatsu Limited · Smart Manufacturing Practice
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
