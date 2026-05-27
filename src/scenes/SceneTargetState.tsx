import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHeader } from '../components/SectionHeader';
import { targetStateKPIs, peerBenchmarks, lifeSciencesCapabilities, nis2Domains } from '../content';

// Maturity level labels + colours (0=Absent … 5=Optimised)
const MATURITY_LABELS = ['Absent', 'Initial', 'Repeatable', 'Defined', 'Managed', 'Optimised'];
const MATURITY_COLORS = ['#D64545', '#F5874B', '#FBBF24', '#6366F1', '#00A3E0', '#10B981'];
const maturityColor = (level: number) => MATURITY_COLORS[Math.min(level, 5)] ?? '#9CA3AF';
const maturityLabel = (level: number) => MATURITY_LABELS[Math.min(level, 5)] ?? '?';

const benchmarkDimensions = [
  { key: 'visibility', label: 'Asset Visibility %' },
  { key: 'twins',      label: 'Digital Twins Active' },
  { key: 'autonomy',   label: 'Autonomy Score %' },
] as const;

export function SceneTargetState() {
  const [activeBenchmark, setActiveBenchmark] = useState<typeof benchmarkDimensions[number]['key']>('visibility');
  const [activeKPI, setActiveKPI] = useState<number | null>(null);

  const maxValues = { visibility: 100, twins: 100, autonomy: 100 };

  return (
    <section id="target" className="relative py-32 overflow-hidden" style={{ background: 'linear-gradient(180deg, #EAF4FF 0%, #F7FAFC 100%)' }}>
      <div className="absolute inset-0 grid-lines opacity-20 pointer-events-none" />

      <div className="max-w-screen-xl mx-auto px-6">
        <SectionHeader
          scene={10}
          tag="Target State Blueprint"
          title="What Sartorius looks like in 36 months."
          subtitle="A life sciences manufacturing environment where every asset is known, every process is optimised, and every quality event is predicted before it occurs — GxP-compliant, carbon-measured, and autonomously maintained."
          accent="#003B73"
        />

        {/* Life sciences identity banner */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 rounded-2xl p-5 flex flex-wrap items-center gap-4"
          style={{ background: 'rgba(0,59,115,0.04)', border: '1px solid rgba(0,59,115,0.15)' }}
        >
          <div className="text-3xl">🧬</div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-bold text-[#003B73] mb-1">Sartorius-Specific Context: Life Sciences Manufacturing</div>
            <div className="text-xs text-[#4A6B8A]">
              This target state is designed for a precision life sciences equipment manufacturer operating under GxP, FDA 21 CFR Part 11, EU GMP Annex 11, and IEC 62443 — with cleanroom OT environments, batch manufacturing processes, and critical quality attributes that demand full digital traceability.
            </div>
          </div>
          <div className="flex flex-wrap gap-2 shrink-0">
            {['GxP', 'FDA 21 CFR Part 11', 'IEC 62443', 'EU GMP Annex 11', 'ISO 9001'].map(tag => (
              <span key={tag} className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#003B73] text-white">{tag}</span>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
          {/* KPI Targets */}
          <div>
            <h3 className="text-lg font-bold text-[#003B73] mb-6">KPI Targets — Current State vs 36-Month Target</h3>
            <div className="space-y-3">
              {targetStateKPIs.map((kpi, i) => (
                <motion.button
                  key={kpi.metric}
                  onClick={() => setActiveKPI(activeKPI === i ? null : i)}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="w-full text-left glass rounded-xl overflow-hidden transition-all card-lift"
                  style={{ border: activeKPI === i ? `2px solid ${kpi.color}` : '2px solid transparent' }}
                >
                  <div className="flex items-center gap-3 p-3">
                    <span className="text-xl shrink-0">{kpi.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-semibold text-[#003B73]">{kpi.metric}</span>
                        <span className="text-[10px] font-medium text-[#9CA3AF]">Month {kpi.months}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-[11px] text-[#9CA3AF] line-through">{kpi.current}</span>
                        <span className="text-xs font-bold" style={{ color: kpi.color }}>→ {kpi.target}</span>
                      </div>
                    </div>
                    <div
                      className="w-2 h-8 rounded-full shrink-0"
                      style={{ background: `linear-gradient(180deg, ${kpi.color}, ${kpi.color}40)` }}
                    />
                  </div>
                  <AnimatePresence>
                    {activeKPI === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden px-3 pb-3"
                      >
                        <div className="h-px bg-[rgba(0,94,184,0.1)] mb-2" />
                        <p className="text-[11px] text-[#6B7E9E]">
                          Target achievable by month {kpi.months} through the Phase {kpi.months <= 6 ? '1 Foundation' : kpi.months <= 18 ? '2 Intelligence' : '3 Autonomy'} programme.
                          Requires {kpi.months <= 6 ? 'OT asset discovery, CMDB population, and connectivity layer' : kpi.months <= 18 ? 'digital twin activation and intelligence layer deployment' : 'autonomous orchestration and multi-site governance rollout'}.
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Peer Benchmark */}
          <div>
            <h3 className="text-lg font-bold text-[#003B73] mb-2">Where Sartorius sits vs. industry peers</h3>
            <p className="text-xs text-[#6B7E9E] mb-4">Benchmarked against life sciences manufacturing maturity data</p>

            {/* Dimension tabs */}
            <div className="flex gap-2 mb-5">
              {benchmarkDimensions.map(dim => (
                <button
                  key={dim.key}
                  onClick={() => setActiveBenchmark(dim.key)}
                  className="text-xs font-medium px-3 py-1.5 rounded-lg border transition-all"
                  style={{
                    background: activeBenchmark === dim.key ? '#005EB8' : 'white',
                    color: activeBenchmark === dim.key ? 'white' : '#6B7E9E',
                    borderColor: activeBenchmark === dim.key ? '#005EB8' : 'rgba(0,94,184,0.15)',
                  }}
                >
                  {dim.label}
                </button>
              ))}
            </div>

            <div className="space-y-3">
              {peerBenchmarks.map((peer, i) => {
                const val = peer[activeBenchmark as keyof typeof peer] as number;
                const max = maxValues[activeBenchmark];
                const isSartorius = peer.org.includes('Sartorius');
                return (
                  <motion.div
                    key={peer.org}
                    initial={{ opacity: 0, x: 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="glass rounded-xl p-4"
                    style={isSartorius ? { boxShadow: `0 0 0 2px ${peer.color}`, outline: `2px solid ${peer.color}` } : {}}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <div className="text-xs font-semibold text-[#003B73]">{peer.org}</div>
                        <div className="text-[10px]" style={{ color: peer.color }}>{peer.maturity}</div>
                      </div>
                      <span className="text-sm font-bold" style={{ color: peer.color }}>
                        {activeBenchmark === 'twins' ? val : `${val}%`}
                      </span>
                    </div>
                    <div className="h-2 bg-[rgba(0,59,115,0.08)] rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: peer.color }}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${(val / max) * 100}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Gap callout */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mt-5 rounded-xl p-4"
              style={{ background: 'rgba(0,94,184,0.06)', border: '1px solid rgba(0,94,184,0.15)' }}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-base">📈</span>
                <span className="text-xs font-bold text-[#005EB8]">The opportunity gap</span>
              </div>
              <p className="text-[11px] text-[#4A6B8A] leading-relaxed">
                Sartorius currently operates below the life sciences industry average on most maturity dimensions. The 36-month programme closes this gap entirely and positions Sartorius in the top 5% of life sciences manufacturers globally.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Life sciences capabilities */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-lg font-bold text-[#003B73] text-center mb-6">Life Sciences-Specific Target Capabilities</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {lifeSciencesCapabilities.map((cap, i) => (
              <motion.div
                key={cap.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="glass rounded-2xl p-5 flex gap-4 card-lift"
              >
                <span className="text-2xl shrink-0">{cap.icon}</span>
                <div>
                  <div className="text-sm font-bold text-[#003B73] mb-1">{cap.title}</div>
                  <div className="text-xs text-[#6B7E9E] leading-relaxed">{cap.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Target state summary card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 glass rounded-3xl p-8"
          style={{ background: 'linear-gradient(135deg, rgba(0,59,115,0.04), rgba(0,94,184,0.04))' }}
        >
          <div className="text-center mb-6">
            <div className="text-sm font-bold uppercase tracking-widest text-[#9CA3AF] mb-2">The Autonomous Sartorius Plant — 36 Months</div>
            <h4 className="text-2xl font-bold text-[#003B73]">
              "A manufacturing environment where every asset is known, every process is optimised, and every quality event is predicted before it occurs."
            </h4>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: '👁',  label: 'Full Asset Visibility',     value: '98%',           color: '#005EB8' },
              { icon: '🧬', label: 'Digital Twins Active',       value: '80+',            color: '#00A3E0' },
              { icon: '⚡', label: 'Autonomous Event Resolution', value: '92%',           color: '#12B3A8' },
              { icon: '📋', label: 'Audit Readiness',             value: '< 2 hours',     color: '#003B73' },
            ].map(s => (
              <div key={s.label} className="glass rounded-2xl p-4 text-center">
                <div className="text-2xl mb-1">{s.icon}</div>
                <div className="text-xl font-bold mb-0.5" style={{ color: s.color }}>{s.value}</div>
                <div className="text-xs text-[#6B7E9E]">{s.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
        {/* NIS2 Compliance Gap Analysis */}
        <NIS2ComplianceSection />
      </div>
    </section>
  );
}

// ─── NIS2 Compliance Heatmap ───────────────────────────────────────────────────

function NIS2ComplianceSection() {
  const [activeDomain, setActiveDomain] = useState(0);
  const domain = nis2Domains[activeDomain];

  // Count critical gaps (OT maturity 0 or 1)
  const totalGaps = nis2Domains.flatMap(d => d.items).filter(it => it.ot <= 1).length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mt-16"
    >
      <div className="text-center mb-8">
        <h3 className="text-xl font-bold text-[#003B73] mb-2">
          Cybersecurity Compliance Gap — NIS2 / IEC 62443
        </h3>
        <p className="text-sm text-[#6B7E9E] max-w-2xl mx-auto">
          Current OT security maturity vs. NIS2 compliance target (Level 4 Managed). Red items represent critical gaps where OT is
          significantly behind IT — and behind regulatory requirements.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Domain selector */}
        <div className="lg:col-span-1 flex flex-col gap-3">
          {nis2Domains.map((dom, i) => (
            <button
              key={dom.domain}
              onClick={() => setActiveDomain(i)}
              className="text-left p-4 rounded-2xl transition-all card-lift"
              style={{
                background: activeDomain === i ? `${dom.color}10` : 'white',
                border: `2px solid ${activeDomain === i ? dom.color : `${dom.color}20`}`,
              }}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-base">{dom.icon}</span>
                <span className="text-sm font-bold text-[#003B73]">{dom.domain}</span>
              </div>
              <div className="flex items-center gap-2 text-[10px] text-[#6B7E9E]">
                <span>{dom.items.length} controls</span>
                <span>·</span>
                <span style={{ color: '#D64545' }}>
                  {dom.items.filter(it => it.ot <= 1).length} critical OT gaps
                </span>
              </div>
            </button>
          ))}

          {/* Overall gap summary */}
          <div
            className="rounded-2xl p-4 text-center"
            style={{ background: 'rgba(214,69,69,0.06)', border: '1px solid rgba(214,69,69,0.2)' }}
          >
            <div className="text-2xl font-bold text-[#D64545]">{totalGaps}</div>
            <div className="text-xs text-[#4A6B8A] font-semibold">Critical OT Gaps</div>
            <div className="text-[9px] text-[#9CA3AF] mt-0.5">(OT maturity ≤ 1 — Absent or Initial)</div>
          </div>
        </div>

        {/* Domain detail */}
        <AnimatePresence mode="wait">
          <motion.div
            key={domain.domain}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -8 }}
            transition={{ duration: 0.25 }}
            className="lg:col-span-2 glass rounded-3xl overflow-hidden"
            style={{ border: `2px solid ${domain.color}25` }}
          >
            {/* Domain header */}
            <div
              className="px-6 py-4 flex items-center gap-3"
              style={{ background: `${domain.color}08`, borderBottom: `1px solid ${domain.color}20` }}
            >
              <span className="text-2xl">{domain.icon}</span>
              <div>
                <div className="text-sm font-bold text-[#003B73]">{domain.domain}</div>
                <div className="text-xs text-[#6B7E9E]">IT vs OT maturity · Target: Level 4 (Managed)</div>
              </div>
            </div>

            <div className="p-6 space-y-4">
              {/* Legend */}
              <div className="flex flex-wrap gap-3 mb-2">
                {[0,1,2,3,4,5].map(l => (
                  <div key={l} className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-full" style={{ background: maturityColor(l) }} />
                    <span className="text-[9px] text-[#6B7E9E]">{l} – {maturityLabel(l)}</span>
                  </div>
                ))}
              </div>

              {/* Items */}
              {domain.items.map((item, i) => {
                const gap = item.target - item.ot;
                const isGap = item.ot <= 1;
                return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="rounded-xl p-3"
                    style={{
                      background: isGap ? 'rgba(214,69,69,0.04)' : 'rgba(0,59,115,0.03)',
                      border: isGap ? '1px solid rgba(214,69,69,0.2)' : '1px solid rgba(0,59,115,0.07)',
                    }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-semibold text-[#003B73]">{item.label}</span>
                      {isGap && (
                        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full text-white bg-[#D64545]">
                          ⚠ Gap
                        </span>
                      )}
                    </div>
                    <div className="flex gap-4 items-end">
                      {/* IT bar */}
                      <div className="flex-1">
                        <div className="text-[8px] font-bold text-[#9CA3AF] uppercase mb-1">IT</div>
                        <div className="h-2 bg-[rgba(0,59,115,0.07)] rounded-full overflow-hidden">
                          <motion.div
                            className="h-full rounded-full"
                            style={{ background: maturityColor(item.it) }}
                            initial={{ width: 0 }}
                            animate={{ width: `${(item.it / 5) * 100}%` }}
                            transition={{ duration: 1, delay: i * 0.05 }}
                          />
                        </div>
                        <div className="text-[8px] mt-0.5" style={{ color: maturityColor(item.it) }}>
                          {item.it} – {maturityLabel(item.it)}
                        </div>
                      </div>
                      {/* OT bar */}
                      <div className="flex-1">
                        <div className="text-[8px] font-bold text-[#9CA3AF] uppercase mb-1">OT</div>
                        <div className="h-2 bg-[rgba(0,59,115,0.07)] rounded-full overflow-hidden">
                          <motion.div
                            className="h-full rounded-full"
                            style={{ background: maturityColor(item.ot) }}
                            initial={{ width: 0 }}
                            animate={{ width: `${(item.ot / 5) * 100}%` }}
                            transition={{ duration: 1, delay: i * 0.05 + 0.1 }}
                          />
                        </div>
                        <div className="text-[8px] mt-0.5" style={{ color: maturityColor(item.ot) }}>
                          {item.ot} – {maturityLabel(item.ot)}
                        </div>
                      </div>
                      {/* Target */}
                      <div className="shrink-0 text-center">
                        <div className="text-[8px] font-bold text-[#9CA3AF] uppercase mb-1">Target</div>
                        <div
                          className="w-8 h-5 rounded flex items-center justify-center text-[9px] font-black text-white"
                          style={{ background: maturityColor(item.target) }}
                        >
                          {item.target}
                        </div>
                        <div className="text-[7px] text-[#9CA3AF] mt-0.5">+{gap} gap</div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Bottom callout */}
            <div
              className="px-6 py-4 text-[11px] text-[#4A6B8A] leading-relaxed"
              style={{ background: `${domain.color}06`, borderTop: `1px solid ${domain.color}15` }}
            >
              <strong>OT Visibility is the prerequisite for closing these gaps.</strong> You cannot assess, protect, or govern an asset you cannot see.
              The Foundation Phase (Months 0–6) directly addresses the OT maturity gaps shown here.
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
