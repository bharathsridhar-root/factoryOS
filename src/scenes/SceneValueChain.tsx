import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHeader } from '../components/SectionHeader';
import { OTIcon } from '../components/OTIcon';
import { otMaturitySteps, otValuePillars, digitalTwinPrereqs, techStack } from '../content';

// ─── Sub-components ───────────────────────────────────────────────────────────

function StepTab({ step, active, onClick }: { step: typeof otMaturitySteps[0]; active: boolean; onClick: () => void }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ y: -2 }}
      className="flex-1 min-w-0 flex flex-col items-center gap-2 py-4 px-3 rounded-2xl text-center transition-all"
      style={{
        background: active ? step.color : 'white',
        border: `2px solid ${active ? step.color : `${step.color}30`}`,
        boxShadow: active ? `0 6px 20px ${step.color}35` : '0 1px 4px rgba(0,0,0,0.06)',
      }}
    >
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-black shrink-0"
        style={{ background: active ? 'rgba(255,255,255,0.25)' : `${step.color}15`, color: active ? 'white' : step.color }}
      >
        {step.number}
      </div>
      <div className="w-8 h-8 flex items-center justify-center">
        <OTIcon name={step.icon} size={20} color={active ? 'rgba(255,255,255,0.9)' : step.color} />
      </div>
      <div className="text-[11px] font-bold leading-tight" style={{ color: active ? 'white' : '#003B73' }}>
        {step.title}
      </div>
      <div className="text-[9px] leading-tight" style={{ color: active ? 'rgba(255,255,255,0.75)' : '#9CA3AF' }}>
        {step.tagline}
      </div>
    </motion.button>
  );
}

function ValuePillarCard({ pillar, i }: { pillar: typeof otValuePillars[0]; i: number }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.08 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="glass rounded-2xl overflow-hidden transition-all"
      style={{
        border: `2px solid ${hovered ? pillar.color : `${pillar.color}20`}`,
        boxShadow: hovered ? `0 8px 24px ${pillar.color}20` : 'none',
      }}
    >
      {/* Colour bar top */}
      <div className="h-1" style={{ background: pillar.color }} />

      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${pillar.color}15` }}>
              <OTIcon name={pillar.icon} size={16} color={pillar.color} />
            </div>
            <div>
              <div className="text-sm font-bold text-[#003B73]">{pillar.title}</div>
              <div className="text-[10px] font-medium" style={{ color: pillar.color }}>{pillar.subtitle}</div>
            </div>
          </div>
          <span
            className="text-[9px] font-black px-2 py-1 rounded-full whitespace-nowrap shrink-0"
            style={{ background: `${pillar.color}15`, color: pillar.color, border: `1px solid ${pillar.color}25` }}
          >
            {pillar.stat}
          </span>
        </div>

        <p className="text-[11px] text-[#4A6B8A] leading-relaxed mb-3">{pillar.example}</p>

        <div
          className="flex items-start gap-2 p-2.5 rounded-lg text-[10px] text-[#4A6B8A] leading-relaxed"
          style={{ background: `${pillar.color}07`, border: `1px solid ${pillar.color}15` }}
        >
          <span className="shrink-0 mt-0.5">→</span>
          <span><strong>Effect:</strong> {pillar.effect}</span>
        </div>

        <div className="mt-3 flex items-center gap-1.5">
          <div className="text-[8px] text-[#9CA3AF] uppercase font-bold tracking-wide">Enabled at Step</div>
          <div
            className="text-[8px] font-black px-1.5 py-0.5 rounded-full text-white"
            style={{ background: pillar.color }}
          >
            {pillar.enabledAtStep}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main scene ───────────────────────────────────────────────────────────────

export function SceneValueChain() {
  const [activeStep, setActiveStep] = useState(0);
  const [showTechStack, setShowTechStack] = useState(false);
  const step = otMaturitySteps[activeStep];

  return (
    <section
      id="value-chain"
      className="relative py-32 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #F7FAFC 0%, #EAF4FF 60%, #F0F8E8 100%)' }}
    >
      <div className="absolute inset-0 grid-lines opacity-15 pointer-events-none" />

      <div className="max-w-screen-xl mx-auto px-6">
        <SectionHeader
          scene={7}
          tag="From Asset Visibility to Autonomous Factory"
          title="How OT Visibility unlocks the Factory of the Future."
          subtitle="Five measurable maturity stages - each building on the previous, each delivering immediate and compounding business value. This is the proven path from invisible infrastructure to autonomous operations."
          accent="#005EB8"
        />

        {/* ── 5-STEP JOURNEY ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-6"
        >
          {/* Step tabs */}
          <div className="flex gap-2 mb-6 flex-wrap sm:flex-nowrap">
            {otMaturitySteps.map((s, i) => (
              <StepTab key={s.id} step={s} active={activeStep === i} onClick={() => setActiveStep(i)} />
            ))}
          </div>

          {/* Step detail panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="glass rounded-3xl overflow-hidden"
              style={{ border: `2px solid ${step.color}30` }}
            >
              {/* Panel header bar */}
              <div
                className="px-7 py-4 flex flex-wrap items-center gap-4"
                style={{ background: `${step.color}10`, borderBottom: `1px solid ${step.color}20` }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: `${step.color}20` }}
                  >
                    <OTIcon name={step.icon} size={22} color={step.color} />
                  </div>
                  <div>
                    <div className="text-[10px] font-black uppercase tracking-widest" style={{ color: step.color }}>
                      Step {step.number} · {step.tagline}
                    </div>
                    <div className="text-base font-bold text-[#003B73]">{step.title}</div>
                  </div>
                </div>
                <div
                  className="ml-auto text-sm font-black px-3 py-1.5 rounded-xl"
                  style={{ background: step.color, color: 'white' }}
                >
                  {step.metric}
                </div>
              </div>

              <div className="p-7 grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left: Goal + Activities */}
                <div>
                  <div className="mb-4">
                    <div className="text-[9px] font-black uppercase tracking-widest text-[#9CA3AF] mb-1">Goal</div>
                    <p className="text-sm text-[#003B73] font-semibold leading-relaxed">{step.goal}</p>
                  </div>

                  <div>
                    <div className="text-[9px] font-black uppercase tracking-widest text-[#9CA3AF] mb-2">What We Do</div>
                    <div className="space-y-2">
                      {step.activities.map((act, i) => (
                        <motion.div
                          key={act}
                          initial={{ opacity: 0, x: -12 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.07 }}
                          className="flex items-start gap-3 p-2.5 rounded-xl"
                          style={{ background: `${step.color}06`, border: `1px solid ${step.color}15` }}
                        >
                          <div
                            className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-black shrink-0 mt-0.5 text-white"
                            style={{ background: step.color }}
                          >
                            {i + 1}
                          </div>
                          <span className="text-[11px] text-[#4A6B8A] leading-relaxed">{act}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right: Tools + Business value + Example */}
                <div className="flex flex-col gap-4">
                  {/* Tools */}
                  <div>
                    <div className="text-[9px] font-black uppercase tracking-widest text-[#9CA3AF] mb-2">Enabling Tools</div>
                    <div className="flex flex-wrap gap-1.5">
                      {step.tools.map(t => (
                        <span
                          key={t}
                          className="text-[10px] font-semibold px-2.5 py-1 rounded-lg"
                          style={{ background: `${step.color}10`, color: step.color, border: `1px solid ${step.color}25` }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Business Value */}
                  <div
                    className="rounded-2xl p-4"
                    style={{ background: `${step.color}08`, border: `1px solid ${step.color}20` }}
                  >
                    <div className="text-[9px] font-black uppercase tracking-widest mb-1.5" style={{ color: step.color }}>
                      Business Value
                    </div>
                    <p className="text-sm font-semibold text-[#003B73] leading-relaxed">{step.businessValue}</p>
                  </div>

                  {/* Example */}
                  <div className="rounded-2xl overflow-hidden" style={{ border: `2px solid ${step.color}25` }}>
                    <div
                      className="px-4 py-2 text-[9px] font-black uppercase tracking-widest"
                      style={{ background: step.color, color: 'white' }}
                    >
                       {step.exampleTitle}
                    </div>
                    <div className="px-4 py-3 text-[11px] text-[#4A6B8A] leading-relaxed">
                      {step.example}
                    </div>
                  </div>
                </div>
              </div>

              {/* Step navigation footer */}
              <div
                className="px-7 py-3 flex items-center justify-between"
                style={{ background: 'rgba(0,59,115,0.03)', borderTop: '1px solid rgba(0,59,115,0.08)' }}
              >
                <button
                  onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
                  disabled={activeStep === 0}
                  className="text-xs font-semibold px-3 py-1.5 rounded-lg transition-all disabled:opacity-30"
                  style={{ color: step.color, border: `1px solid ${step.color}30` }}
                >
                  ← Previous
                </button>
                <div className="flex gap-1.5">
                  {otMaturitySteps.map((_, i) => (
                    <div
                      key={i}
                      className="w-2 h-2 rounded-full transition-all"
                      style={{ background: i === activeStep ? step.color : `${step.color}30` }}
                    />
                  ))}
                </div>
                <button
                  onClick={() => setActiveStep(Math.min(otMaturitySteps.length - 1, activeStep + 1))}
                  disabled={activeStep === otMaturitySteps.length - 1}
                  className="text-xs font-semibold px-3 py-1.5 rounded-lg transition-all disabled:opacity-30"
                  style={{ color: step.color, border: `1px solid ${step.color}30`, background: `${step.color}10` }}
                >
                  Next →
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Bottom value chain strip */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 glass rounded-2xl p-4 flex flex-wrap items-center justify-center gap-2"
        >
          {[
            { label: 'VISIBILITY',   color: '#F5A623' },
            { label: 'UNDERSTAND',   color: '#6366F1' },
            { label: 'DECIDE',       color: '#005EB8' },
            { label: 'AUTOMATE',     color: '#12B3A8' },
            { label: 'OPTIMISE',     color: '#10B981' },
            { label: 'AUTONOMOUS FACTORY', color: '#003B73' },
          ].map((item, i, arr) => (
            <div key={item.label} className="flex items-center gap-2">
              <span
                className="text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full"
                style={{ background: `${item.color}15`, color: item.color, border: `1px solid ${item.color}30` }}
              >
                {item.label}
              </span>
              {i < arr.length - 1 && (
                <span className="text-[#9CA3AF] text-xs">→</span>
              )}
            </div>
          ))}
        </motion.div>

        {/* ── 6 VALUE PILLARS ── */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h3 className="text-2xl font-bold text-[#003B73] mb-2">
              What OT Visibility Unlocks
            </h3>
            <p className="text-sm text-[#6B7E9E] max-w-2xl mx-auto">
              Security is only the starting point - OT Visibility creates measurable value across every dimension of manufacturing operations.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {otValuePillars.map((pillar, i) => (
              <ValuePillarCard key={pillar.id} pillar={pillar} i={i} />
            ))}
          </div>

          {/* Stats strip */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-8 glass rounded-2xl p-5"
            style={{ background: 'linear-gradient(135deg, rgba(0,59,115,0.04), rgba(0,94,184,0.02))' }}
          >
            <div className="text-[9px] font-black uppercase tracking-widest text-center text-[#9CA3AF] mb-4">
              Benchmarked Impact - Industry Average Across Life Sciences & Process Manufacturing
            </div>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
              {[
                { label: 'Security Incidents',     value: '-30–60%',  color: '#D64545' },
                { label: 'Unplanned Downtime',     value: '-20–40%',  color: '#F5A623' },
                { label: 'Maintenance Costs',      value: '-15–30%',  color: '#12B3A8' },
                { label: 'OEE Improvement',        value: '+10–20%',  color: '#005EB8' },
                { label: 'Tech Productivity',      value: '+20–30%',  color: '#6366F1' },
                { label: 'Compliance Auditability',value: '100%',     color: '#10B981' },
              ].map(s => (
                <div key={s.label} className="text-center">
                  <div className="text-lg font-bold" style={{ color: s.color }}>{s.value}</div>
                  <div className="text-[9px] text-[#9CA3AF] leading-tight mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── DIGITAL TWIN PREREQUISITES FORMULA ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-[#003B73] mb-2">
              What a Digital Twin Actually Requires
            </h3>
            <p className="text-sm text-[#6B7E9E] max-w-2xl mx-auto">
              Digital twins are not bought - they are earned. Every prerequisite must be satisfied before the twin delivers value.
            </p>
          </div>

          {/* Prerequisites grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
            {digitalTwinPrereqs.map((req, i) => (
              <motion.div
                key={req.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="glass rounded-2xl p-4 text-center card-lift"
                style={{ borderTop: `3px solid ${req.color}` }}
              >
                <div className="flex justify-center mb-2">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `${req.color}15` }}>
                    <OTIcon name={req.icon} size={18} color={req.color} />
                  </div>
                </div>
                <div className="text-[10px] font-bold text-[#003B73] mb-1 leading-tight">{req.label}</div>
                <div className="text-[9px] text-[#6B7E9E] leading-relaxed">{req.desc}</div>
              </motion.div>
            ))}
          </div>

          {/* Formula */}
          <div
            className="glass rounded-2xl p-5 text-center"
            style={{ border: '2px solid rgba(0,94,184,0.15)', background: 'linear-gradient(135deg, rgba(0,59,115,0.03), rgba(0,94,184,0.03))' }}
          >
            <div className="text-[9px] font-black uppercase tracking-widest text-[#9CA3AF] mb-3">
              The Digital Twin Equation
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2 text-sm font-bold">
              {digitalTwinPrereqs.map((req, i) => (
                <span key={req.id} className="flex items-center gap-2">
                  <span style={{ color: req.color }}>{req.label}</span>
                  {i < digitalTwinPrereqs.length - 1 && (
                    <span className="text-[#9CA3AF]">+</span>
                  )}
                </span>
              ))}
              <span className="text-[#9CA3AF] mx-2">=</span>
              <span className="text-lg font-black text-[#003B73] flex items-center gap-2">
                <span></span> Trusted Digital Twin
              </span>
            </div>
          </div>
        </motion.div>

        {/* ── TECHNOLOGY STACK (collapsible) ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <button
            onClick={() => setShowTechStack(!showTechStack)}
            className="w-full flex items-center justify-between p-5 glass rounded-2xl mb-3 hover:shadow-md transition-all"
            style={{ border: '1px solid rgba(0,94,184,0.12)' }}
          >
            <div className="flex items-center gap-3">
              <span className="text-xl"></span>
              <div className="text-left">
                <div className="text-sm font-bold text-[#003B73]">The Technology Platform That Makes It Possible</div>
                <div className="text-xs text-[#6B7E9E]">Three integrated platforms - one shared CMDB as the source of truth</div>
              </div>
            </div>
            <span className="text-[#9CA3AF] text-lg">{showTechStack ? '▲' : '▼'}</span>
          </button>

          <AnimatePresence>
            {showTechStack && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="overflow-hidden"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
                  {techStack.map((platform, i) => (
                    <motion.div
                      key={platform.id}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="glass rounded-2xl overflow-hidden card-lift"
                      style={{ borderTop: `3px solid ${platform.color}` }}
                    >
                      <div className="p-5">
                        <div className="flex items-center gap-3 mb-3">
                          <div
                            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                            style={{ background: `${platform.color}12` }}
                          >
                            <OTIcon name={platform.icon} size={20} color={platform.color} />
                          </div>
                          <div>
                            <div className="text-[9px] font-black uppercase tracking-wide" style={{ color: platform.color }}>
                              {platform.role}
                            </div>
                            <div className="text-sm font-bold text-[#003B73]">{platform.name}</div>
                            <div className="text-[10px] text-[#6B7E9E]">{platform.product}</div>
                          </div>
                        </div>
                        <div className="space-y-1.5 mb-3">
                          {platform.capabilities.map(cap => (
                            <div key={cap} className="flex items-start gap-2 text-[11px] text-[#4A6B8A]">
                              <div className="w-1.5 h-1.5 rounded-full shrink-0 mt-1" style={{ background: platform.color }} />
                              {cap}
                            </div>
                          ))}
                        </div>
                        <div
                          className="text-[10px] p-2.5 rounded-lg leading-relaxed"
                          style={{ background: `${platform.color}08`, color: '#4A6B8A', border: `1px solid ${platform.color}15` }}
                        >
                          <strong>Output:</strong> {platform.output}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Shared CMDB connector */}
                <div
                  className="glass rounded-2xl p-4 text-center"
                  style={{ border: '2px solid rgba(0,59,115,0.15)', background: 'rgba(0,59,115,0.03)' }}
                >
                  <div className="flex items-center justify-center gap-3">
                    <span className="text-xl"></span>
                    <div>
                      <div className="text-sm font-bold text-[#003B73]">Shared CMDB + Time Series Database</div>
                      <div className="text-xs text-[#6B7E9E]">
                        One source of truth - Asset hierarchy, standard operations, events history, relationships, maintenance status, performance data - shared across all three platforms in real-time.
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
