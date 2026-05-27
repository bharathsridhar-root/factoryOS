import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '../store';
import { stakeholderProfiles } from '../content';

const stakeholderColors: Record<string, { bg: string; border: string; accent: string }> = {
  CIO:                   { bg: '#EAF4FF', border: '#005EB8', accent: '#005EB8' },
  CTO:                   { bg: '#EAF4FF', border: '#003B73', accent: '#003B73' },
  PlantManager:          { bg: '#FFF7ED', border: '#F5A623', accent: '#D97706' },
  ManufacturingIT:       { bg: '#F0FDF4', border: '#12B3A8', accent: '#12B3A8' },
  OTArchitect:           { bg: '#EAF4FF', border: '#00A3E0', accent: '#00A3E0' },
  CISO:                  { bg: '#FFF1F1', border: '#D64545', accent: '#D64545' },
  ReliabilityEngineer:   { bg: '#F0FDF4', border: '#10B981', accent: '#10B981' },
  SustainabilityOfficer: { bg: '#F0FDF4', border: '#10B981', accent: '#34D399' },
  OperationsLead:        { bg: '#FFFBEB', border: '#F5A623', accent: '#F5A623' },
  PlatformEngineeringLead:{ bg: '#EAF4FF', border: '#005EB8', accent: '#6366F1' },
};

const stakeholderIcons: Record<string, string> = {
  CIO: '', CTO: '', PlantManager: '', ManufacturingIT: '',
  OTArchitect: '', CISO: '', ReliabilityEngineer: '',
  SustainabilityOfficer: '', OperationsLead: '', PlatformEngineeringLead: '',
};

export function StakeholderBanner() {
  const { stakeholder } = useAppStore();
  const [visible, setVisible] = useState(false);
  const prevRef = useRef(stakeholder);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    if (prevRef.current !== stakeholder) {
      prevRef.current = stakeholder;
      setVisible(true);
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setVisible(false), 4000);
    }
    return () => clearTimeout(timerRef.current);
  }, [stakeholder]);

  const profile = stakeholderProfiles[stakeholder];
  const cfg = stakeholderColors[stakeholder] ?? stakeholderColors.CIO;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key={stakeholder}
          initial={{ opacity: 0, y: -8, scaleY: 0.9 }}
          animate={{ opacity: 1, y: 0, scaleY: 1 }}
          exit={{ opacity: 0, y: -8, scaleY: 0.9 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed top-14 left-0 right-0 z-40 px-6 pointer-events-none"
          style={{ transformOrigin: 'top' }}
        >
          <div
            className="max-w-screen-xl mx-auto rounded-2xl px-5 py-3 flex items-center gap-4 shadow-lg"
            style={{
              background: cfg.bg,
              border: `1px solid ${cfg.border}30`,
              boxShadow: `0 4px 24px ${cfg.accent}20`,
            }}
          >
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center text-xl shrink-0"
              style={{ background: `${cfg.accent}15` }}
            >
              {stakeholderIcons[stakeholder]}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-xs font-bold uppercase tracking-wide" style={{ color: cfg.accent }}>
                  Now viewing as {stakeholder.replace(/([A-Z])/g, ' $1').trim()}
                </span>
                <span
                  className="text-[10px] px-2 py-0.5 rounded-full font-medium"
                  style={{ background: `${cfg.accent}12`, color: cfg.accent }}
                >
                  {profile.focus}
                </span>
              </div>
              <p className="text-xs text-[#4A6B8A] truncate">{profile.subhead}</p>
            </div>
            <div className="hidden md:flex items-center gap-2 shrink-0">
              {profile.kpis.slice(0, 3).map(kpi => (
                <span
                  key={kpi}
                  className="text-[10px] px-2 py-1 rounded-lg font-medium whitespace-nowrap"
                  style={{ background: `${cfg.accent}10`, color: cfg.accent, border: `1px solid ${cfg.accent}20` }}
                >
                  {kpi}
                </span>
              ))}
            </div>
            <button
              className="text-[#9CA3AF] hover:text-[#4A6B8A] text-lg leading-none shrink-0 pointer-events-auto"
              onClick={() => setVisible(false)}
            >
              ×
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
