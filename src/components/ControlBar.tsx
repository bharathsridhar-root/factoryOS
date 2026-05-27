import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '../store';
import type { Stakeholder, TechDepth } from '../types';

const stakeholders: Stakeholder[] = [
  'CIO', 'CTO', 'PlantManager', 'ManufacturingIT',
  'OTArchitect', 'CISO', 'ReliabilityEngineer',
  'SustainabilityOfficer', 'OperationsLead', 'PlatformEngineeringLead',
];

const stakeholderMeta: Record<Stakeholder, { label: string; icon: string; color: string; focus: string }> = {
  CIO:                   { label: 'CIO',           icon: '💼', color: '#005EB8', focus: 'Business & Governance' },
  CTO:                   { label: 'CTO',           icon: '🔬', color: '#003B73', focus: 'Technical Architecture' },
  PlantManager:          { label: 'Plant Manager', icon: '🏭', color: '#D97706', focus: 'Operational Efficiency' },
  ManufacturingIT:       { label: 'Mfg IT',        icon: '🔌', color: '#12B3A8', focus: 'IT/OT Integration' },
  OTArchitect:           { label: 'OT Architect',  icon: '🏗', color: '#00A3E0', focus: 'Architecture & Zoning' },
  CISO:                  { label: 'CISO',          icon: '🛡', color: '#D64545', focus: 'Security Posture' },
  ReliabilityEngineer:   { label: 'Reliability',   icon: '🔧', color: '#10B981', focus: 'Asset Reliability' },
  SustainabilityOfficer: { label: 'Sustainability', icon: '🌱', color: '#34D399', focus: 'Carbon & ESG' },
  OperationsLead:        { label: 'Operations',    icon: '📊', color: '#F5A623', focus: 'Operational Performance' },
  PlatformEngineeringLead:{ label: 'Platform Eng', icon: '🚀', color: '#6366F1', focus: 'Platform & Reusability' },
};

const depthOptions: TechDepth[] = ['Executive', 'Architecture', 'Engineering'];

const depthMeta: Record<TechDepth, { desc: string }> = {
  Executive:    { desc: 'Business outcomes, KPIs and strategic value — no technical detail.' },
  Architecture: { desc: 'System architecture, zones, integration patterns and data flows.' },
  Engineering:  { desc: 'Protocol-level detail, firmware, port maps and implementation specs.' },
};

const modeMeta = {
  Governance:  { icon: '🏛', desc: 'Highlights compliance status, policy drift and regulatory coverage across every scene.' },
  Simulation:  { icon: '⚡', desc: 'Activates scenario simulators and "what-if" controls in autonomous operations and twin views.' },
  ROI:         { icon: '💰', desc: 'Overlays financial impact metrics — cost avoidance, efficiency gains, payback timelines.' },
};

function ModeTooltip({ text }: { text: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 6 }}
      transition={{ duration: 0.15 }}
      className="absolute top-full mt-2 left-1/2 -translate-x-1/2 z-[70] w-52 glass rounded-xl p-3 shadow-xl pointer-events-none"
      style={{ border: '1px solid rgba(0,94,184,0.15)' }}
    >
      <p className="text-[11px] text-[#4A6B8A] leading-relaxed">{text}</p>
      <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 bg-white border-t border-l border-[rgba(0,94,184,0.15)]" />
    </motion.div>
  );
}

export function ControlBar() {
  const {
    stakeholder, setStakeholder,
    techDepth, setTechDepth,
    governanceMode, toggleGovernance,
    simulationMode, toggleSimulation,
    roiMode, toggleROI,
  } = useAppStore();

  const [stakeholderOpen, setStakeholderOpen] = useState(false);
  const [tooltip, setTooltip] = useState<string | null>(null);
  const tooltipTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const meta = stakeholderMeta[stakeholder];

  const showTooltip = (key: string) => {
    clearTimeout(tooltipTimer.current);
    setTooltip(key);
  };
  const hideTooltip = () => {
    tooltipTimer.current = setTimeout(() => setTooltip(null), 120);
  };

  return (
    <motion.div
      initial={{ y: -64, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 glass border-b border-[rgba(0,94,184,0.1)]"
      style={{ height: 56 }}
    >
      {/* Stakeholder color accent bar */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-0.5"
        style={{ background: `linear-gradient(90deg, transparent 0%, ${meta.color} 30%, ${meta.color} 70%, transparent 100%)` }}
        layoutId="accent-bar"
        transition={{ duration: 0.4 }}
      />

      <div className="max-w-screen-xl mx-auto h-full flex items-center justify-between px-6 gap-4">
        {/* Logo */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #005EB8, #00A3E0)' }}>
            <span className="text-white text-xs font-bold">OT</span>
          </div>
          <span className="text-sm font-semibold text-[#003B73] hidden sm:block">Digital Twin Platform</span>
        </div>

        {/* Stakeholder selector */}
        <div className="relative">
          <motion.button
            onClick={() => setStakeholderOpen(!stakeholderOpen)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors"
            style={{
              background: `${meta.color}10`,
              borderColor: `${meta.color}40`,
              color: meta.color,
            }}
            layout
          >
            <span className="text-sm">{meta.icon}</span>
            <span>{meta.label}</span>
            <span className="text-[10px] text-[#9CA3AF] hidden sm:block">· {meta.focus}</span>
            <svg className={`w-3 h-3 transition-transform ${stakeholderOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
          </motion.button>

          <AnimatePresence>
            {stakeholderOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.97 }}
                transition={{ duration: 0.15 }}
                className="absolute top-full mt-2 left-0 glass rounded-2xl overflow-hidden shadow-2xl z-[60] min-w-[220px]"
              >
                <div className="p-2">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-[#9CA3AF] px-3 py-2">Select your role</div>
                  {stakeholders.map((s) => {
                    const m = stakeholderMeta[s];
                    return (
                      <button
                        key={s}
                        onClick={() => { setStakeholder(s); setStakeholderOpen(false); }}
                        className="w-full text-left px-3 py-2.5 rounded-xl transition-all flex items-center gap-3 hover:bg-[#EAF4FF]"
                        style={{ background: stakeholder === s ? `${m.color}10` : undefined }}
                      >
                        <span className="text-lg w-7 text-center">{m.icon}</span>
                        <div>
                          <div className="text-xs font-semibold" style={{ color: stakeholder === s ? m.color : '#003B73' }}>
                            {m.label}
                          </div>
                          <div className="text-[10px] text-[#9CA3AF]">{m.focus}</div>
                        </div>
                        {stakeholder === s && (
                          <span className="ml-auto text-xs" style={{ color: m.color }}>✓</span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Depth toggle */}
        <div className="hidden md:flex items-center gap-1 bg-[#EAF4FF] rounded-lg p-1">
          {depthOptions.map((d) => (
            <div key={d} className="relative">
              <button
                onClick={() => setTechDepth(d)}
                onMouseEnter={() => showTooltip(`depth-${d}`)}
                onMouseLeave={hideTooltip}
                className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                  techDepth === d ? 'bg-white text-[#005EB8] shadow-sm' : 'text-[#6B7E9E] hover:text-[#003B73]'
                }`}
              >
                {d}
              </button>
              <AnimatePresence>
                {tooltip === `depth-${d}` && <ModeTooltip text={depthMeta[d].desc} />}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* Mode toggles */}
        <div className="hidden lg:flex items-center gap-2">
          {[
            { label: 'Governance', key: 'Governance', active: governanceMode, toggle: toggleGovernance, color: '#005EB8' },
            { label: 'Simulation', key: 'Simulation', active: simulationMode, toggle: toggleSimulation, color: '#00A3E0' },
            { label: 'ROI',        key: 'ROI',        active: roiMode,        toggle: toggleROI,        color: '#12B3A8' },
          ].map(({ label, key, active, toggle, color }) => (
            <div key={label} className="relative">
              <button
                onClick={toggle}
                onMouseEnter={() => showTooltip(`mode-${key}`)}
                onMouseLeave={hideTooltip}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${
                  active ? 'text-white border-transparent' : 'bg-white text-[#6B7E9E] border-[rgba(0,94,184,0.15)] hover:text-[#005EB8]'
                }`}
                style={active ? { background: color, borderColor: color } : {}}
              >
                {modeMeta[key as keyof typeof modeMeta].icon} {active ? '✓ ' : ''}{label}
              </button>
              <AnimatePresence>
                {tooltip === `mode-${key}` && <ModeTooltip text={modeMeta[key as keyof typeof modeMeta].desc} />}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* Maturity indicator */}
        <div className="hidden xl:flex items-center gap-1.5 shrink-0">
          <span className="text-[10px] text-[#9CA3AF] uppercase tracking-wide">Maturity</span>
          <div className="flex gap-0.5">
            {[1,2,3,4,5].map((i) => (
              <div key={i} className="w-2 h-2 rounded-full transition-all" style={{ background: i <= 3 ? '#005EB8' : 'rgba(0,94,184,0.15)' }} />
            ))}
          </div>
          <span className="text-xs font-bold text-[#005EB8]">3/5</span>
        </div>
      </div>
    </motion.div>
  );
}
