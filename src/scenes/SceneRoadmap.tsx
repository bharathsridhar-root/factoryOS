import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHeader } from '../components/SectionHeader';
import { roadmapPhases } from '../content';

export function SceneRoadmap() {
  const [activePhase, setActivePhase] = useState<string>('foundation');
  const [activeTab, setActiveTab] = useState<'milestones' | 'quickwins' | 'prerequisites'>('milestones');

  const phase = roadmapPhases.find(p => p.id === activePhase)!;

  return (
    <section id="roadmap" className="relative py-32 overflow-hidden" style={{ background: 'linear-gradient(180deg, #F7FAFC 0%, #EAF4FF 100%)' }}>
      <div className="absolute inset-0 grid-lines opacity-20 pointer-events-none" />

      <div className="max-w-screen-xl mx-auto px-6">
        <SectionHeader
          scene={11}
          tag="Transformation Roadmap"
          title="From today to the Autonomous Plant — a concrete path."
          subtitle="Three structured phases with clear milestones, integration prerequisites, quick wins, and governance gates. A programme you can start in 30 days."
          accent="#005EB8"
        />

        {/* Timeline bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="relative flex items-center justify-between max-w-2xl mx-auto mb-2">
            <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-[rgba(0,94,184,0.1)]" />
            {['Today', '6 Months', '18 Months', '36 Months'].map((label, i) => (
              <div key={label} className="relative flex flex-col items-center gap-1 z-10">
                <div className="w-3 h-3 rounded-full border-2 border-white" style={{
                  background: i === 0 ? '#D64545' : i === 1 ? '#F5A623' : i === 2 ? '#005EB8' : '#12B3A8'
                }} />
                <span className="text-[10px] font-semibold text-[#6B7E9E] whitespace-nowrap">{label}</span>
              </div>
            ))}
          </div>
          {/* Phase bands */}
          <div className="flex gap-1 max-w-2xl mx-auto mt-2 rounded-xl overflow-hidden">
            {roadmapPhases.map(p => (
              <div
                key={p.id}
                className="flex-1 py-1.5 text-center text-[10px] font-bold"
                style={{ background: `${p.color}20`, color: p.color }}
              >
                {p.title}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Phase selector cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {roadmapPhases.map((p, i) => (
            <motion.button
              key={p.id}
              onClick={() => { setActivePhase(p.id); setActiveTab('milestones'); }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-left rounded-2xl p-5 transition-all card-lift"
              style={{
                background: activePhase === p.id ? p.bg : 'white',
                border: `2px solid ${activePhase === p.id ? p.color : 'rgba(0,94,184,0.1)'}`,
              }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0"
                  style={{ background: `${p.color}15` }}
                >
                  {p.icon}
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wide" style={{ color: p.color }}>Phase {p.number} · {p.duration}</div>
                  <div className="text-sm font-bold text-[#003B73]">{p.title}</div>
                </div>
              </div>
              <div className="text-lg font-bold mb-2" style={{ color: p.color }}>"{p.subtitle}"</div>
              <p className="text-xs text-[#6B7E9E] leading-relaxed">{p.summary}</p>
              <div className="mt-3 flex flex-wrap gap-1">
                {p.deliverables.slice(0, 2).map(d => (
                  <span key={d} className="text-[10px] px-2 py-0.5 rounded-full font-medium" style={{ background: `${p.color}10`, color: p.color }}>
                    {d}
                  </span>
                ))}
              </div>
            </motion.button>
          ))}
        </div>

        {/* Phase detail panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activePhase}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="glass rounded-3xl overflow-hidden"
            style={{ border: `2px solid ${phase.color}30` }}
          >
            {/* Panel header */}
            <div className="px-8 pt-6 pb-4 flex flex-wrap items-center justify-between gap-4" style={{ background: `${phase.color}08` }}>
              <div className="flex items-center gap-3">
                <span className="text-3xl">{phase.icon}</span>
                <div>
                  <div className="text-sm font-bold text-[#003B73]">Phase {phase.number}: {phase.title} — {phase.duration}</div>
                  <div className="text-xs text-[#6B7E9E]">{phase.deliverables.length} key deliverables</div>
                </div>
              </div>
              {/* Tabs */}
              <div className="flex gap-1 bg-[rgba(0,59,115,0.06)] rounded-xl p-1">
                {([
                  { key: 'milestones',    label: '📅 Milestones' },
                  { key: 'quickwins',     label: '⚡ Quick Wins' },
                  { key: 'prerequisites', label: '🔑 Prerequisites' },
                ] as const).map(tab => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className="text-xs font-medium px-3 py-1.5 rounded-lg transition-all"
                    style={{
                      background: activeTab === tab.key ? phase.color : 'transparent',
                      color: activeTab === tab.key ? 'white' : '#6B7E9E',
                    }}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-8">
              <AnimatePresence mode="wait">
                {/* MILESTONES */}
                {activeTab === 'milestones' && (
                  <motion.div
                    key="milestones"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-3"
                  >
                    {phase.milestones.map((m, i) => (
                      <motion.div
                        key={m.label}
                        initial={{ opacity: 0, x: -16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.07 }}
                        className="flex items-start gap-4 p-4 rounded-xl"
                        style={{ background: m.label.includes('✓') ? `${phase.color}08` : 'rgba(0,59,115,0.03)', border: m.label.includes('✓') ? `1px solid ${phase.color}30` : '1px solid transparent' }}
                      >
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold shrink-0"
                          style={{ background: m.label.includes('✓') ? phase.color : `${phase.color}15`, color: m.label.includes('✓') ? 'white' : phase.color }}
                        >
                          {m.label.includes('✓') ? '✓' : `W${m.week}`}
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-[#003B73]">{m.label}</div>
                          <div className="text-xs text-[#6B7E9E] mt-0.5 leading-relaxed">{m.detail}</div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}

                {/* QUICK WINS */}
                {activeTab === 'quickwins' && (
                  <motion.div
                    key="quickwins"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <p className="text-sm text-[#6B7E9E] mb-6">Tangible results visible to stakeholders within the first 90 days of each phase</p>
                    <div className="space-y-4">
                      {phase.quickWins.map((qw, i) => {
                        const relDay = phase.number === 1 ? qw.day : phase.number === 2 ? qw.day - 180 : qw.day - 540;
                        return (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="flex items-start gap-4 p-5 rounded-2xl"
                            style={{ background: phase.bg, border: `1px solid ${phase.color}30` }}
                          >
                            <div
                              className="w-12 h-12 rounded-xl flex flex-col items-center justify-center shrink-0"
                              style={{ background: phase.color }}
                            >
                              <span className="text-white text-xs font-bold">Day</span>
                              <span className="text-white text-sm font-black">{relDay}</span>
                            </div>
                            <div>
                              <div className="text-sm font-semibold text-[#003B73] leading-relaxed">{qw.win}</div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}

                {/* PREREQUISITES */}
                {activeTab === 'prerequisites' && (
                  <motion.div
                    key="prerequisites"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                  >
                    <div>
                      <h4 className="text-sm font-bold text-[#003B73] mb-3 flex items-center gap-2">
                        <span>🔑</span> Phase Prerequisites
                      </h4>
                      <div className="space-y-2">
                        {phase.prerequisites.map((p, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.08 }}
                            className="flex items-start gap-3 p-3 rounded-xl"
                            style={{ background: 'rgba(0,59,115,0.04)', border: '1px solid rgba(0,59,115,0.08)' }}
                          >
                            <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5" style={{ borderColor: phase.color }}>
                              <div className="w-2 h-2 rounded-full" style={{ background: phase.color }} />
                            </div>
                            <span className="text-xs text-[#4A6B8A] leading-relaxed">{p}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#003B73] mb-3 flex items-center gap-2">
                        <span>🔌</span> System Integrations Required
                      </h4>
                      <div className="space-y-2">
                        {phase.integrations.map((intg, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: 8 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.08 }}
                            className="flex items-center gap-3 p-3 rounded-xl"
                            style={{ background: `${phase.color}08`, border: `1px solid ${phase.color}20` }}
                          >
                            <span className="text-sm">🔌</span>
                            <span className="text-xs font-medium text-[#003B73]">{intg}</span>
                          </motion.div>
                        ))}
                      </div>

                      <h4 className="text-sm font-bold text-[#003B73] mt-5 mb-3 flex items-center gap-2">
                        <span>📦</span> Phase Deliverables
                      </h4>
                      <div className="space-y-1.5">
                        {phase.deliverables.map((d, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs text-[#4A6B8A]">
                            <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: phase.color }} />
                            {d}
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Start CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 glass rounded-3xl p-8 text-center"
          style={{ background: 'linear-gradient(135deg, rgba(0,94,184,0.06), rgba(18,179,168,0.04))' }}
        >
          <div className="text-3xl mb-3">🚀</div>
          <h3 className="text-xl font-bold text-[#003B73] mb-2">You can start Phase 1 in 30 days</h3>
          <p className="text-sm text-[#4A6B8A] max-w-xl mx-auto mb-6">
            OT asset discovery requires only network read access — no production changes, no downtime risk, no architecture decisions before you start. Within 30 days you will have a complete picture of your OT estate for the first time.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { icon: '✅', label: 'Zero production risk', sub: 'Passive discovery — no traffic injection' },
              { icon: '📅', label: '30-day first insight', sub: 'Complete asset inventory in one month' },
              { icon: '💰', label: 'ROI from week 4', sub: 'Unknown risks quantified immediately' },
            ].map(item => (
              <div key={item.label} className="glass rounded-xl px-4 py-3 text-center min-w-[140px]">
                <div className="text-lg mb-1">{item.icon}</div>
                <div className="text-xs font-bold text-[#003B73]">{item.label}</div>
                <div className="text-[10px] text-[#9CA3AF]">{item.sub}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
