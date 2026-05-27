import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { cioKPIs, maturityJourney } from '../content';

function AnimatedCounter({ target, suffix = '' }: { target: string; suffix?: string }) {
  const numericPart = parseFloat(target);
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const triggered = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !triggered.current) {
        triggered.current = true;
        const start = Date.now();
        const duration = 1800;
        const tick = () => {
          const elapsed = Date.now() - start;
          const progress = Math.min(elapsed / duration, 1);
          const ease = 1 - Math.pow(1 - progress, 4);
          setValue(Number((ease * numericPart).toFixed(1)));
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.4 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [numericPart]);

  const displayValue = Number.isInteger(numericPart) ? Math.round(value) : value.toFixed(1);
  return <div ref={ref}>{displayValue}{suffix}</div>;
}

const maturityMilestones = [
  { label: 'Visibility', current: 94, prev: 23, unit: '%', color: '#F5A623' },
  { label: 'Context', current: 87, prev: 12, unit: '%', color: '#00A3E0' },
  { label: 'Intelligence', current: 71, prev: 0, unit: '%', color: '#005EB8' },
  { label: 'Autonomy', current: 34, prev: 0, unit: '%', color: '#12B3A8' },
];

const recentEvents = [
  { time: '2s ago', msg: 'Motor B-7 anomaly resolved - autonomous maintenance triggered', type: 'success' },
  { time: '4m ago', msg: 'Stuttgart Werk patch compliance reached 99% - IEC 62443 compliant', type: 'success' },
  { time: '12m ago', msg: 'Unauthorized device isolated in Singapore Plant Zone 2', type: 'warning' },
  { time: '1h ago', msg: 'Carbon Twin: Scope 1 emissions -14% this shift vs. target', type: 'success' },
  { time: '2h ago', msg: 'Digital Product Passport #DPP-44129 issued for Line 3', type: 'info' },
  { time: '3h ago', msg: 'Worker Safety Twin: Zone 4 ergonomic risk elevated - intervention sent', type: 'warning' },
];

export function CIOCommandCenter() {
  const [activeKPI, setActiveKPI] = useState<number | null>(null);

  return (
    <section
      id="cio"
      className="relative py-32 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #EAF4FF 0%, #F7FAFC 50%, #EAF4FF 100%)' }}
    >
      <div className="absolute inset-0 grid-lines opacity-20 pointer-events-none" />

      {/* Decorative top element */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#005EB8] to-transparent opacity-30" />

      <div className="max-w-screen-xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full glass border border-[rgba(0,94,184,0.15)]">
            <span className="w-2 h-2 rounded-full status-online" />
            <span className="text-xs font-semibold text-[#005EB8]">CIO Command Center · Live Industrial Intelligence</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-[#003B73] mb-5 leading-tight">
            The <span className="gradient-text">Operational Cockpit</span>
          </h2>
          <p className="text-lg text-[#4A6B8A] max-w-2xl mx-auto">
            Every KPI. Every plant. Every twin. Governed from a single executive intelligence surface.
          </p>
        </motion.div>

        {/* Primary KPI grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {cioKPIs.map((kpi, i) => (
            <motion.button
              key={kpi.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              onClick={() => setActiveKPI(activeKPI === i ? null : i)}
              className="glass rounded-2xl p-5 text-left card-lift"
              style={{
                border: activeKPI === i ? '1px solid rgba(0,94,184,0.3)' : '1px solid rgba(0,94,184,0.1)',
              }}
            >
              <div className="text-xs font-medium text-[#6B7E9E] mb-2 uppercase tracking-wide">{kpi.label}</div>
              <div className="flex items-end gap-1 mb-2">
                <span className="text-2xl font-bold text-[#003B73]">
                  <AnimatedCounter target={kpi.value} />
                </span>
                {kpi.unit && <span className="text-sm text-[#9CA3AF] mb-0.5">{kpi.unit}</span>}
              </div>
              {kpi.delta && (
                <div className={`flex items-center gap-1 text-xs font-semibold ${
                  kpi.trend === 'down' ? 'text-[#12B3A8]' : 'text-[#12B3A8]'
                }`}>
                  <span>{kpi.trend === 'up' ? '↑' : '↓'}</span>
                  <span>{kpi.delta} vs. pre-transformation</span>
                </div>
              )}
            </motion.button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Maturity progression */}
          <div className="lg:col-span-2 glass rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-[#003B73] mb-6">OT Maturity Progression</h3>
            <div className="space-y-5">
              {maturityMilestones.map((milestone, i) => (
                <motion.div
                  key={milestone.label}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-[#003B73]">{milestone.label}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-[#9CA3AF]">Before: {milestone.prev}%</span>
                      <span className="text-sm font-bold" style={{ color: milestone.color }}>
                        {milestone.current}{milestone.unit}
                      </span>
                    </div>
                  </div>
                  <div className="relative h-3 bg-[rgba(0,59,115,0.06)] rounded-full overflow-hidden">
                    {/* Before bar */}
                    <div
                      className="absolute h-full rounded-full"
                      style={{ width: `${milestone.prev}%`, background: 'rgba(0,59,115,0.1)' }}
                    />
                    {/* After bar */}
                    <motion.div
                      className="absolute h-full rounded-full"
                      style={{ background: milestone.color }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${milestone.current}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Maturity journey pills */}
            <div className="flex items-center gap-2 mt-8 overflow-x-auto pb-1">
              {maturityJourney.map((step, i) => (
                <div key={step.id} className="flex items-center gap-2 shrink-0">
                  <div
                    className="px-3 py-1.5 rounded-full text-xs font-bold text-white"
                    style={{ background: step.color, opacity: i <= 3 ? 1 : 0.4 }}
                  >
                    {step.icon} {step.label}
                  </div>
                  {i < maturityJourney.length - 1 && (
                    <span className="text-[#9CA3AF] text-sm">→</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Live event stream */}
          <div className="glass rounded-2xl p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-sm font-bold text-[#003B73]">Live Operational Feed</h3>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full status-online animate-pulse" />
                <span className="text-xs text-[#12B3A8] font-medium">Live</span>
              </div>
            </div>
            <div className="space-y-3">
              {recentEvents.map((event, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-3 p-3 rounded-xl"
                  style={{
                    background: event.type === 'success' ? 'rgba(18,179,168,0.06)'
                      : event.type === 'warning' ? 'rgba(245,166,35,0.06)'
                      : 'rgba(0,163,224,0.06)',
                  }}
                >
                  <div
                    className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                    style={{
                      background: event.type === 'success' ? '#12B3A8'
                        : event.type === 'warning' ? '#F5A623'
                        : '#00A3E0',
                    }}
                  />
                  <div>
                    <p className="text-xs text-[#4A6B8A] leading-relaxed">{event.msg}</p>
                    <p className="text-[10px] text-[#9CA3AF] mt-0.5">{event.time}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Final manifesto */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8 }}
          className="relative rounded-3xl overflow-hidden p-12 md:p-16 text-center"
          style={{
            background: 'linear-gradient(135deg, #003B73 0%, #005EB8 60%, #00A3E0 100%)',
          }}
        >
          {/* Background grid */}
          <div className="absolute inset-0 grid-lines opacity-10" />

          {/* Animated particles */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-white opacity-30"
              style={{ left: `${12 + i * 11}%`, top: `${20 + (i % 3) * 20}%` }}
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 3 + i * 0.4, repeat: Infinity, delay: i * 0.3 }}
            />
          ))}

          <div className="relative z-10 max-w-3xl mx-auto">
            <div className="text-5xl mb-8"></div>

            <blockquote className="text-2xl md:text-3xl font-bold text-white leading-snug mb-8">
              "Factories do not become autonomous merely by deploying AI."
            </blockquote>
            <p className="text-lg md:text-xl text-[rgba(255,255,255,0.85)] leading-relaxed mb-12">
              "They become autonomous when visibility, operational context, governance, intelligence, and orchestration converge into a living industrial system."
            </p>

            <div className="h-px bg-white opacity-20 mb-12" />

            <blockquote className="text-xl md:text-2xl font-bold text-white mb-4">
              "Digital twins are not dashboards."
            </blockquote>
            <p className="text-lg text-[rgba(255,255,255,0.85)]">
              "They are operational decision systems."
            </p>

            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => document.getElementById('scene1')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 rounded-2xl font-semibold text-sm transition-all hover:scale-105 hover:shadow-xl active:scale-95"
                style={{ background: 'white', color: '#003B73' }}
              >
                ↑ Review the Journey
              </button>
              <button
                onClick={() => document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 rounded-2xl font-semibold text-sm border-2 border-white text-white transition-all hover:bg-white/10 active:scale-95"
              >
                ← Back to Start
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
