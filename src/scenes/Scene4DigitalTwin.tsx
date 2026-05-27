import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHeader } from '../components/SectionHeader';
import { SceneLens } from '../components/SceneLens';
import { twinTypes } from '../content';

const flowLayers = [
  {
    id: 'input',
    label: 'Sensor / Input',
    color: '#003B73',
    items: ['Vibration Sensors', 'Thermal Arrays', 'Flow Meters', 'PLCs/RTUs', 'SCADA Tags', 'Worker Wearables'],
    icon: '📡',
  },
  {
    id: 'edge',
    label: 'Edge Processing',
    color: '#005EB8',
    items: ['Edge Gateway', 'AWS Greengrass', 'Local Inferencing', 'Event Filtering', 'Data Buffering', 'Protocol Normalization'],
    icon: '🖥',
  },
  {
    id: 'cloud',
    label: 'Cloud Analytics',
    color: '#00A3E0',
    items: ['AWS TwinMaker', 'SiteWise', 'Lookout for Equip.', 'Digital Thread', 'AI/ML Pipelines', 'Carbon Twin'],
    icon: '☁',
  },
  {
    id: 'decision',
    label: 'Decision Logic',
    color: '#12B3A8',
    items: ['Rules Engine', 'Event Orchestration', 'Autonomous Workflows', 'Threshold Intelligence', 'Predictive Triggers', 'LLM Reasoning'],
    icon: '🧠',
  },
  {
    id: 'outcome',
    label: 'Action / Outcome',
    color: '#F5A623',
    items: ['Maintenance Ticket', 'Shutdown Rec.', 'Runtime Optimization', 'Operator Alert', 'Self-Healing Action', 'Twin State Update'],
    icon: '⚡',
  },
];

const twinGrowthSources = [
  { label: 'OT Asset Data', icon: '⚙', delay: 0 },
  { label: 'Operational Topology', icon: '🔗', delay: 0.1 },
  { label: 'Live Telemetry', icon: '📡', delay: 0.2 },
  { label: 'Maintenance Records', icon: '🔧', delay: 0.3 },
  { label: 'Process Workflows', icon: '🔄', delay: 0.4 },
  { label: 'Energy Signals', icon: '⚡', delay: 0.5 },
];

export function Scene4DigitalTwin() {
  const [activeLayer, setActiveLayer] = useState<string | null>(null);
  const [activeTwinType, setActiveTwinType] = useState(0);
  const [twinActivated, setTwinActivated] = useState(false);

  return (
    <section id="scene4" className="relative py-32 overflow-hidden" style={{ background: 'linear-gradient(180deg, #EAF4FF 0%, #F7FAFC 100%)' }}>
      <div className="absolute inset-0 grid-lines opacity-20 pointer-events-none" />

      <div className="max-w-screen-xl mx-auto px-6">
        <SectionHeader
          scene={4}
          tag="Digital Twin Activation"
          title="Digital twins emerge from operational truth."
          subtitle="A digital twin is not a 3D visualization. It is an operational decision system — grown from real asset data, topology, and behavior. Not from CAD files alone."
          accent="#12B3A8"
        />

        <SceneLens sceneId={4} />

        {/* Twin type selector */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {twinTypes.map((twin, i) => (
            <motion.button
              key={twin.id}
              onClick={() => setActiveTwinType(i)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-all text-sm font-medium"
              style={{
                background: activeTwinType === i ? twin.color : 'white',
                borderColor: activeTwinType === i ? twin.color : 'rgba(0,94,184,0.15)',
                color: activeTwinType === i ? 'white' : '#4A6B8A',
                boxShadow: activeTwinType === i ? `0 4px 16px ${twin.color}40` : 'none',
              }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <span>{twin.icon}</span>
              <span>{twin.label}</span>
            </motion.button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Twin growth visualization */}
          <div>
            <h3 className="text-lg font-semibold text-[#003B73] mb-6">How Twins Grow from Operational Context</h3>
            <div className="relative rounded-2xl overflow-hidden p-8"
              style={{ background: 'white', border: '1px solid rgba(0,94,184,0.1)', minHeight: 300 }}>

              {/* Center twin core */}
              <div className="flex justify-center mb-8">
                <motion.button
                  onClick={() => setTwinActivated(!twinActivated)}
                  className="relative"
                  whileHover={{ scale: 1.05 }}
                >
                  {twinActivated && (
                    <>
                      <motion.div
                        className="absolute inset-0 rounded-full"
                        style={{ background: `${twinTypes[activeTwinType].color}20` }}
                        animate={{ scale: [1, 1.6], opacity: [0.6, 0] }}
                        transition={{ duration: 1.8, repeat: Infinity }}
                      />
                      <motion.div
                        className="absolute inset-0 rounded-full"
                        style={{ background: `${twinTypes[activeTwinType].color}15` }}
                        animate={{ scale: [1, 2.2], opacity: [0.4, 0] }}
                        transition={{ duration: 1.8, delay: 0.3, repeat: Infinity }}
                      />
                    </>
                  )}
                  <div
                    className="relative w-24 h-24 rounded-2xl flex flex-col items-center justify-center text-white font-bold text-sm shadow-lg"
                    style={{
                      background: twinActivated
                        ? `linear-gradient(135deg, ${twinTypes[activeTwinType].color}, ${twinTypes[activeTwinType].color}CC)`
                        : 'linear-gradient(135deg, #EAF4FF, #D8ECFF)',
                      color: twinActivated ? 'white' : '#9CA3AF',
                      border: `2px solid ${twinActivated ? twinTypes[activeTwinType].color : 'rgba(0,94,184,0.15)'}`,
                    }}
                  >
                    <span className="text-3xl mb-1">{twinTypes[activeTwinType].icon}</span>
                    <span className="text-[11px]">{twinActivated ? 'ACTIVE' : 'ACTIVATE'}</span>
                  </div>
                </motion.button>
              </div>

              {/* Data sources orbiting */}
              <div className="grid grid-cols-3 gap-3">
                {twinGrowthSources.map((source, i) => (
                  <motion.div
                    key={source.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: twinActivated ? 1 : 0.4, scale: twinActivated ? 1 : 0.9 }}
                    transition={{ delay: source.delay, duration: 0.4 }}
                    className="flex items-center gap-2 p-3 rounded-xl"
                    style={{
                      background: twinActivated ? `${twinTypes[activeTwinType].color}10` : 'rgba(234,244,255,0.5)',
                      border: `1px solid ${twinActivated ? twinTypes[activeTwinType].color : 'rgba(0,94,184,0.1)'}30`,
                    }}
                  >
                    <span className="text-lg">{source.icon}</span>
                    <span className="text-xs font-medium text-[#4A6B8A]">{source.label}</span>
                    {twinActivated && (
                      <motion.div
                        className="w-1.5 h-1.5 rounded-full ml-auto"
                        style={{ background: twinTypes[activeTwinType].color }}
                        animate={{ opacity: [1, 0.3, 1] }}
                        transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                      />
                    )}
                  </motion.div>
                ))}
              </div>

              <div className="text-center mt-4 text-xs text-[#9AAFBE]">
                Click the twin to activate — data sources come alive
              </div>
            </div>

            {/* Active twin detail */}
            <AnimatePresence>
              {twinActivated && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12 }}
                  className="mt-4 p-5 rounded-2xl"
                  style={{
                    background: `${twinTypes[activeTwinType].color}08`,
                    border: `1px solid ${twinTypes[activeTwinType].color}25`,
                  }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">{twinTypes[activeTwinType].icon}</span>
                    <div>
                      <div className="font-semibold text-[#003B73]">{twinTypes[activeTwinType].label}</div>
                      <div className="text-xs" style={{ color: twinTypes[activeTwinType].color }}>Active · Syncing</div>
                    </div>
                  </div>
                  <p className="text-sm text-[#4A6B8A]">{twinTypes[activeTwinType].desc}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Simulation flow */}
          <div>
            <h3 className="text-lg font-semibold text-[#003B73] mb-6">Operational Flow Architecture</h3>
            <div className="space-y-3">
              {flowLayers.map((layer, i) => (
                <motion.div
                  key={layer.id}
                  initial={{ opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <button
                    onClick={() => setActiveLayer(activeLayer === layer.id ? null : layer.id)}
                    className="w-full text-left"
                  >
                    <div
                      className="rounded-xl overflow-hidden"
                      style={{ border: `1px solid ${layer.color}30` }}
                    >
                      <div
                        className="flex items-center gap-4 p-4"
                        style={{ background: activeLayer === layer.id ? `${layer.color}10` : 'white' }}
                      >
                        <div
                          className="w-9 h-9 rounded-lg flex items-center justify-center text-xl"
                          style={{ background: `${layer.color}15` }}
                        >
                          {layer.icon}
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-bold" style={{ color: layer.color }}>
                            Layer {i + 1}
                          </div>
                          <div className="text-sm font-semibold text-[#003B73]">{layer.label}</div>
                        </div>
                        <svg
                          className={`w-4 h-4 transition-transform ${activeLayer === layer.id ? 'rotate-90' : ''}`}
                          fill="none" viewBox="0 0 24 24" stroke={layer.color}
                          strokeWidth={2}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                      <AnimatePresence>
                        {activeLayer === layer.id && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="px-4 pb-4 pt-2 flex flex-wrap gap-2">
                              {layer.items.map(item => (
                                <span
                                  key={item}
                                  className="text-xs px-2.5 py-1 rounded-full font-medium"
                                  style={{ background: `${layer.color}12`, color: layer.color, border: `1px solid ${layer.color}25` }}
                                >
                                  {item}
                                </span>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </button>
                  {i < flowLayers.length - 1 && (
                    <div className="flex justify-center my-1">
                      <motion.div
                        animate={{ y: [0, 4, 0] }}
                        transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
                        className="text-[#005EB8] opacity-40"
                      >
                        ↓
                      </motion.div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Twin insight */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center p-8 rounded-3xl max-w-3xl mx-auto"
          style={{ background: 'linear-gradient(135deg, rgba(0,59,115,0.04), rgba(0,163,224,0.06))', border: '1px solid rgba(0,94,184,0.12)' }}
        >
          <div className="text-4xl mb-4">🧬</div>
          <p className="text-xl font-bold text-[#003B73] mb-3">"Digital twins are not dashboards."</p>
          <p className="text-lg text-[#4A6B8A]">"They are operational decision systems — alive with context, capable of simulation, and wired for autonomous action."</p>
        </motion.div>
      </div>
    </section>
  );
}
