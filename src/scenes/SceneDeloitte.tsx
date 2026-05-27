import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHeader } from '../components/SectionHeader';
import { deloitteData } from '../content';

const ACCENT   = '#005EB8';
const ACCENT2  = '#12B3A8';

const phaseColors = ['#F5A623', '#005EB8', '#12B3A8'];
const phaseLabels = ['Foundation', 'Intelligence', 'Autonomy'];

export function SceneDeloitte() {
  const [activePhaseIdx, setActivePhaseIdx] = useState(0);
  const [hoveredAccel, setHoveredAccel] = useState<string | null>(null);

  const activePhase = deloitteData.phaseServices[activePhaseIdx];

  return (
    <section id="deloitte" className="relative py-32 overflow-hidden" style={{ background: 'linear-gradient(180deg, #F7FAFC 0%, #EAF4FF 60%, #F7FAFC 100%)' }}>
      <div className="absolute inset-0 grid-lines opacity-15 pointer-events-none" />

      <div className="max-w-screen-xl mx-auto px-6">

        <SectionHeader
          scene={13}
          tag="Programme Structure"
          title="How the transformation programme is organised."
          subtitle="The programme is structured around three phases, each with clearly defined workstreams, deliverables, and integration milestones. Services are matched to the maturity level required at each stage."
          accent={ACCENT}
        />

        {/* Phase workstreams */}
        <div className="mb-16">
          <h3 className="text-xl font-bold text-[#003B73] text-center mb-2">What gets delivered in each phase</h3>
          <p className="text-sm text-[#6B7E9E] text-center mb-8">Select a phase to see the workstreams and deliverables</p>

          {/* Phase tabs */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6 max-w-2xl mx-auto">
            {phaseLabels.map((label, i) => (
              <button
                key={label}
                onClick={() => setActivePhaseIdx(i)}
                className="flex-1 py-3 px-4 rounded-xl font-medium text-sm transition-all"
                style={{
                  background: activePhaseIdx === i ? phaseColors[i] : 'white',
                  color: activePhaseIdx === i ? 'white' : '#6B7E9E',
                  border: `2px solid ${activePhaseIdx === i ? phaseColors[i] : 'rgba(0,94,184,0.1)'}`,
                  boxShadow: activePhaseIdx === i ? `0 4px 16px ${phaseColors[i]}40` : 'none',
                }}
              >
                Phase {i + 1} - {label}
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
                  <div className="mb-3">
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

        {/* Programme differentiators */}
        <div className="mb-16">
          <h3 className="text-xl font-bold text-[#003B73] text-center mb-8">What makes this programme work</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {deloitteData.differentiators.map((diff, i) => (
              <motion.div
                key={diff.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-2xl p-6 card-lift"
                style={{ borderBottom: `3px solid ${ACCENT}` }}
              >
                <div className="text-sm font-bold text-[#003B73] mb-2">{diff.title}</div>
                <div className="text-xs text-[#6B7E9E] leading-relaxed">{diff.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Pre-built accelerators */}
        <div className="mb-12">
          <h3 className="text-xl font-bold text-[#003B73] text-center mb-2">Pre-built programme accelerators</h3>
          <p className="text-sm text-[#6B7E9E] text-center mb-8">Validated tools that reduce delivery time compared to building from scratch</p>
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
                  background: hoveredAccel === acc.name ? `${ACCENT}08` : 'white',
                  border: `2px solid ${hoveredAccel === acc.name ? ACCENT : `${ACCENT}25`}`,
                  boxShadow: hoveredAccel === acc.name ? `0 8px 24px ${ACCENT}15` : 'none',
                }}
              >
                <div className="text-sm font-bold text-[#003B73] mb-2">{acc.name}</div>
                <p className="text-xs text-[#6B7E9E] leading-relaxed">{acc.desc}</p>
                {hoveredAccel === acc.name && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute top-3 right-3 text-xs font-bold px-2 py-0.5 rounded-full text-white"
                    style={{ background: ACCENT }}
                  >
                    Available
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Engagement starting point */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-3xl p-8 md:p-10"
          style={{ border: `2px solid ${ACCENT}20` }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="text-sm font-bold uppercase tracking-widest mb-2 text-[#9CA3AF]">Starting Point</div>
              <h3 className="text-2xl font-bold text-[#003B73] mb-4">
                OT Maturity Assessment
              </h3>
              <p className="text-sm text-[#4A6B8A] mb-6 leading-relaxed">
                The programme begins with a structured assessment of the current OT environment. This benchmarks the current state against industry peers, quantifies the risk and value gap, and produces a business case and recommended starting sequence - presented to leadership within a few weeks of engagement start.
              </p>
              <div className="flex flex-col gap-2">
                {[
                  'Gap analysis benchmarked against life sciences manufacturing peers',
                  'Quantified business case covering risk reduction and compliance gaps',
                  'Prioritised transformation sequence with integration prerequisites',
                  'Stakeholder-ready summary package',
                ].map(item => (
                  <div key={item} className="flex items-start gap-2 text-xs text-[#4A6B8A]">
                    <div className="w-1.5 h-1.5 rounded-full shrink-0 mt-1" style={{ background: ACCENT }} />
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="glass rounded-2xl p-5" style={{ border: `1px solid ${ACCENT}20` }}>
                <div className="text-xs font-bold uppercase tracking-wide mb-3 text-[#9CA3AF]">Assessment scope</div>
                {[
                  { label: 'Format',   value: 'On-site workshops + remote analysis' },
                  { label: 'Team',     value: 'OT architect, security lead, strategy' },
                  { label: 'Output',   value: 'Business case, gap analysis, roadmap' },
                  { label: 'Coverage', value: 'Asset visibility, security, compliance, processes' },
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
                style={{ background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT2})` }}
              >
                View Executive Summary
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
