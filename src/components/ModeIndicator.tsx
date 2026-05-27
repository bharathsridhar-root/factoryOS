import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '../store';

const modeConfig = {
  governance: {
    label: 'Governance Lens Active',
    detail: 'Compliance status and policy drift highlighted throughout',
    icon: '🏛',
    color: '#005EB8',
    bg: '#EAF4FF',
    border: 'rgba(0,94,184,0.25)',
  },
  simulation: {
    label: 'Simulation Mode Active',
    detail: 'Scenario controls and what-if simulators enabled',
    icon: '⚡',
    color: '#00A3E0',
    bg: '#E0F4FF',
    border: 'rgba(0,163,224,0.25)',
  },
  roi: {
    label: 'ROI Overlay Active',
    detail: 'Financial impact, cost avoidance and payback metrics visible',
    icon: '💰',
    color: '#12B3A8',
    bg: '#E6FAF8',
    border: 'rgba(18,179,168,0.25)',
  },
};

const depthConfig = {
  Executive:    { icon: '📈', desc: 'Business outcomes & KPI view' },
  Architecture: { icon: '🏗',  desc: 'Architecture & integration view' },
  Engineering:  { icon: '🔩', desc: 'Protocol & implementation detail' },
};

export function ModeIndicator() {
  const { governanceMode, simulationMode, roiMode, techDepth } = useAppStore();

  const activeModes = [
    governanceMode && modeConfig.governance,
    simulationMode && modeConfig.simulation,
    roiMode        && modeConfig.roi,
  ].filter(Boolean) as typeof modeConfig.governance[];

  const showDepth = techDepth !== 'Executive';
  const isAnyActive = activeModes.length > 0 || showDepth;

  return (
    <AnimatePresence>
      {isAnyActive && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="fixed top-[57px] left-0 right-0 z-30 overflow-hidden"
        >
          <div
            className="flex items-center gap-3 px-6 py-2 flex-wrap"
            style={{ background: 'rgba(234,244,255,0.95)', borderBottom: '1px solid rgba(0,94,184,0.08)', backdropFilter: 'blur(8px)' }}
          >
            {activeModes.map(mode => (
              <motion.div
                key={mode.label}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                className="flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium"
                style={{ background: mode.bg, border: `1px solid ${mode.border}`, color: mode.color }}
              >
                <span>{mode.icon}</span>
                <span className="font-semibold">{mode.label}</span>
                <span className="text-[10px] opacity-70 hidden sm:inline">— {mode.detail}</span>
              </motion.div>
            ))}

            {showDepth && (
              <motion.div
                key={techDepth}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                className="flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium"
                style={{ background: '#F0F4FF', border: '1px solid rgba(99,102,241,0.2)', color: '#4F46E5' }}
              >
                <span>{depthConfig[techDepth].icon}</span>
                <span className="font-semibold">{techDepth} Depth</span>
                <span className="text-[10px] opacity-70 hidden sm:inline">— {depthConfig[techDepth].desc}</span>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
