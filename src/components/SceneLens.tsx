import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '../store';
import { sceneLens } from '../content';

interface Props {
  sceneId: number;
  scrollTarget?: string;
}

const stakeholderColors: Record<string, string> = {
  CIO: '#005EB8', CTO: '#003B73', PlantManager: '#D97706', ManufacturingIT: '#12B3A8',
  OTArchitect: '#00A3E0', CISO: '#D64545', ReliabilityEngineer: '#10B981',
  SustainabilityOfficer: '#34D399', OperationsLead: '#F5A623', PlatformEngineeringLead: '#6366F1',
};

export function SceneLens({ sceneId, scrollTarget }: Props) {
  const { stakeholder } = useAppStore();
  const scenes = sceneLens[sceneId];
  const lens = scenes?.[stakeholder];
  const color = stakeholderColors[stakeholder] ?? '#005EB8';

  if (!lens) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`${sceneId}-${stakeholder}`}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="rounded-2xl p-4 mb-10 flex items-start gap-4"
        style={{
          background: `${color}08`,
          border: `1px solid ${color}25`,
          borderLeft: `4px solid ${color}`,
        }}
      >
        <span className="text-2xl shrink-0 mt-0.5">{lens.icon}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wide" style={{ color }}>
              {stakeholder.replace(/([A-Z])/g, ' $1').trim()} Lens
            </span>
          </div>
          <p className="text-sm text-[#4A6B8A] leading-relaxed">{lens.insight}</p>
        </div>
        {scrollTarget && (
          <button
            onClick={() => document.getElementById(scrollTarget)?.scrollIntoView({ behavior: 'smooth' })}
            className="shrink-0 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all hover:opacity-80 whitespace-nowrap"
            style={{ background: `${color}15`, color, border: `1px solid ${color}25` }}
          >
            {lens.action} →
          </button>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
