import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHeader } from '../components/SectionHeader';
import { fofUseCases, marketProofPoints } from '../content';

const dependencySteps = [
  { icon: '👁',  label: 'Asset Visibility',    desc: 'See every asset, every connection, every state',        color: '#F5A623' },
  { icon: '🔗', label: 'Operational Context', desc: 'Understand relationships and semantic meaning',           color: '#00A3E0' },
  { icon: '🧬', label: 'Digital Twins',        desc: 'Activate living models grown from operational truth',    color: '#005EB8' },
  { icon: '🧠', label: 'AI Intelligence',      desc: 'Predict, optimise, and simulate before acting',         color: '#6366F1' },
  { icon: '⚡', label: 'Autonomy',             desc: 'Self-healing systems with zero operator intervention',  color: '#12B3A8' },
];

export function SceneFactoryFuture() {
  const [activeUC, setActiveUC] = useState<string | null>(null);

  return (
    <section id="fof" className="relative py-32 overflow-hidden" style={{ background: 'linear-gradient(180deg, #F7FAFC 0%, #EAF4FF 50%, #F7FAFC 100%)' }}>
      <div className="absolute inset-0 grid-lines opacity-20 pointer-events-none" />

      <div className="max-w-screen-xl mx-auto px-6">
        <SectionHeader
          scene={9}
          tag="Factory of the Future"
          title="Why everything starts with knowing what you have."
          subtitle="The Factory of the Future is not a technology purchase. It is a capability journey — and every capability on that journey is impossible without knowing what assets exist, how they behave, and how they connect."
          accent="#005EB8"
        />

        {/* Dependency chain */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <p className="text-center text-xs font-bold uppercase tracking-widest text-[#9CA3AF] mb-6">
            The capability dependency chain — each layer unlocks the next
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 flex-wrap">
            {dependencySteps.map((step, i) => (
              <div key={step.label} className="flex items-center gap-2">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12, duration: 0.4 }}
                  className="glass rounded-2xl px-4 py-3 flex flex-col items-center gap-1 min-w-[110px]"
                  style={{ border: `2px solid ${step.color}30` }}
                >
                  <span className="text-2xl">{step.icon}</span>
                  <span className="text-xs font-bold text-center" style={{ color: step.color }}>{step.label}</span>
                  <span className="text-[10px] text-[#9CA3AF] text-center leading-tight hidden md:block">{step.desc}</span>
                </motion.div>
                {i < dependencySteps.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.12 + 0.2 }}
                    className="text-[#9CA3AF] text-lg font-bold shrink-0"
                  >→</motion.div>
                )}
              </div>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            className="mt-4 text-center"
          >
            <span className="inline-block glass rounded-full px-4 py-1.5 text-xs font-semibold text-[#D64545] border border-[rgba(214,69,69,0.2)]">
              ⚠ Skipping visibility means every downstream capability is built on incomplete or wrong data
            </span>
          </motion.div>
        </motion.div>

        {/* Use case cards */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-[#003B73] text-center mb-2">5 Use Cases Visibility Unlocks</h3>
          <p className="text-sm text-[#6B7E9E] text-center mb-10">Click any use case to see business value, operational impact, and real-world proof</p>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {fofUseCases.map((uc, i) => {
              const isActive = activeUC === uc.id;
              return (
                <motion.div
                  key={uc.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <button
                    onClick={() => setActiveUC(isActive ? null : uc.id)}
                    className="w-full text-left rounded-2xl overflow-hidden card-lift transition-all"
                    style={{
                      border: `2px solid ${isActive ? uc.color : 'rgba(0,94,184,0.1)'}`,
                      background: isActive ? uc.bg : 'white',
                    }}
                  >
                    {/* Card header */}
                    <div className="p-5">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-2xl shrink-0" style={{ background: `${uc.color}15` }}>
                            {uc.icon}
                          </div>
                          <div>
                            <div className="text-[10px] font-bold uppercase tracking-wide" style={{ color: uc.color }}>Use Case {uc.number}</div>
                            <div className="text-sm font-bold text-[#003B73]">{uc.title}</div>
                          </div>
                        </div>
                        <span className="text-[#9CA3AF] text-lg transition-transform" style={{ transform: isActive ? 'rotate(90deg)' : 'none' }}>›</span>
                      </div>
                      <p className="text-xs text-[#6B7E9E] italic mb-3">"{uc.tagline}"</p>

                      {/* Value metrics strip */}
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { label: 'Business', value: uc.businessValue },
                          { label: 'Operations', value: uc.operationalValue },
                          { label: 'Efficiency', value: uc.efficiency },
                        ].map(m => (
                          <div key={m.label} className="rounded-lg p-2 text-center" style={{ background: `${uc.color}10` }}>
                            <div className="text-[10px] font-bold" style={{ color: uc.color }}>{m.value}</div>
                            <div className="text-[9px] text-[#9CA3AF]">{m.label}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Expanded detail */}
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="px-5 pb-5 space-y-4">
                            {/* Description */}
                            <p className="text-xs text-[#4A6B8A] leading-relaxed">{uc.description}</p>

                            {/* Visibility gate */}
                            <div className="rounded-xl p-3" style={{ background: 'rgba(214,69,69,0.06)', border: '1px solid rgba(214,69,69,0.15)' }}>
                              <div className="text-[10px] font-bold text-[#D64545] uppercase tracking-wide mb-1">⛔ Visibility Gate</div>
                              <p className="text-[11px] text-[#4A6B8A]">{uc.visibilityGate}</p>
                            </div>

                            {/* Second-order effects */}
                            <div>
                              <div className="text-[10px] font-bold uppercase tracking-wide text-[#6B7E9E] mb-2">Downstream Effects</div>
                              <div className="flex flex-col gap-1">
                                {uc.secondOrder.map(e => (
                                  <div key={e} className="flex items-center gap-2 text-[11px] text-[#4A6B8A]">
                                    <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: uc.color }} />
                                    {e}
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Market proof */}
                            <div className="rounded-xl p-3" style={{ background: `${uc.color}08`, border: `1px solid ${uc.color}20` }}>
                              <div className="text-[10px] font-bold uppercase tracking-wide mb-1" style={{ color: uc.color }}>Market Proof</div>
                              <div className="text-[10px] font-semibold text-[#003B73]">{uc.proof.org}</div>
                              <div className="text-[10px] text-[#6B7E9E] mt-0.5">{uc.proof.result}</div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Market proof strip */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h3 className="text-lg font-bold text-[#003B73] text-center mb-6">How industry leaders are doing it today</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {marketProofPoints.map((proof, i) => (
              <motion.div
                key={proof.sector}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-2xl p-5"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">{proof.icon}</span>
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-wide text-[#9CA3AF]">{proof.sector}</div>
                    <div className="text-xs font-semibold text-[#003B73]">{proof.company}</div>
                  </div>
                </div>
                <div className="text-sm font-bold text-[#005EB8] mb-3">{proof.headline}</div>
                <div className="flex flex-col gap-1 mb-4">
                  {proof.metrics.map(m => (
                    <div key={m} className="flex items-center gap-2 text-xs text-[#4A6B8A]">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#12B3A8] shrink-0" />
                      {m}
                    </div>
                  ))}
                </div>
                <blockquote
                  className="text-[11px] italic text-[#6B7E9E] leading-relaxed border-l-2 pl-3"
                  style={{ borderColor: '#005EB830' }}
                >
                  "{proof.quote}"
                </blockquote>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Total value summary */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-3xl p-8 text-center"
          style={{ background: 'linear-gradient(135deg, rgba(0,94,184,0.06), rgba(18,179,168,0.06))' }}
        >
          <h3 className="text-xl font-bold text-[#003B73] mb-2">Combined value potential across all 5 use cases</h3>
          <p className="text-sm text-[#6B7E9E] mb-6">Modelled for a Sartorius-scale life sciences manufacturing estate</p>
          <div className="flex flex-wrap justify-center gap-6">
            {[
              { label: 'Annual Value',        value: '$26M+',   sub: 'per fully deployed facility',  color: '#005EB8' },
              { label: 'Scope 1 Reduction',   value: '−28%',    sub: 'from carbon twin optimisation', color: '#12B3A8' },
              { label: 'Downtime Reduction',  value: '−65%',    sub: 'across all asset classes',      color: '#00A3E0' },
              { label: 'Quality Improvement', value: '−73%',    sub: 'defect escapes to customers',   color: '#F5A623' },
            ].map(v => (
              <div key={v.label} className="text-center px-4">
                <div className="text-3xl font-bold mb-1" style={{ color: v.color }}>{v.value}</div>
                <div className="text-sm font-semibold text-[#003B73]">{v.label}</div>
                <div className="text-xs text-[#9CA3AF]">{v.sub}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
