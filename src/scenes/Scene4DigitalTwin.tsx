import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHeader } from '../components/SectionHeader';
import { SceneLens } from '../components/SceneLens';
import { OTIcon } from '../components/OTIcon';
import { Cpu, Radio, Database, GitBranch, Zap, Activity, Server } from 'lucide-react';
import { twinTypes } from '../content';

const flowLayers = [
  {
    id: 'input',
    label: 'Sensor / Input',
    color: '#003B73',
    items: ['Vibration Sensors', 'Thermal Arrays', 'Flow Meters', 'PLCs/RTUs', 'SCADA Tags', 'Worker Wearables'],
    Icon: Activity,
  },
  {
    id: 'edge',
    label: 'Edge Processing',
    color: '#005EB8',
    items: ['Edge Gateway', 'Azure IoT Edge', 'Local Inferencing', 'Event Filtering', 'Data Buffering', 'Protocol Normalization'],
    Icon: Radio,
  },
  {
    id: 'cloud',
    label: 'Manufacturing Data Platform',
    color: '#00A3E0',
    items: ['Azure Data Explorer', 'OT Data Lake', 'Semantic Layer', 'Data Governance', 'AI/ML Pipelines', 'Digital Twin Feed'],
    Icon: Database,
  },
  {
    id: 'decision',
    label: 'Decision Logic',
    color: '#12B3A8',
    items: ['Rules Engine', 'Event Orchestration', 'Autonomous Workflows', 'Threshold Intelligence', 'Predictive Triggers', 'LLM Reasoning'],
    Icon: GitBranch,
  },
  {
    id: 'outcome',
    label: 'Action / Outcome',
    color: '#F5A623',
    items: ['Maintenance Ticket', 'Shutdown Rec.', 'Runtime Optimization', 'Operator Alert', 'Self-Healing Action', 'Twin State Update'],
    Icon: Zap,
  },
];

const twinGrowthSources = [
  { label: 'OT Asset Data',        Icon: Server,     delay: 0 },
  { label: 'Operational Topology', Icon: GitBranch,  delay: 0.1 },
  { label: 'Live Telemetry',       Icon: Activity,   delay: 0.2 },
  { label: 'Maintenance Records',  Icon: Database,   delay: 0.3 },
  { label: 'Process Workflows',    Icon: Cpu,        delay: 0.4 },
  { label: 'Energy Signals',       Icon: Zap,        delay: 0.5 },
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
          subtitle="A digital twin is not a 3D visualization. It is an operational decision system - grown from real asset data, topology, and behavior. Not from CAD files alone."
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
              <OTIcon name={twin.icon} size={15} />
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
                    <OTIcon name={twinTypes[activeTwinType].icon} size={28} color={twinActivated ? 'white' : '#9CA3AF'} />
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
                    <source.Icon size={14} color={twinActivated ? twinTypes[activeTwinType].color : '#9CA3AF'} strokeWidth={2} />
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
                Click the twin to activate - data sources come alive
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
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `${twinTypes[activeTwinType].color}15` }}>
                      <OTIcon name={twinTypes[activeTwinType].icon} size={20} color={twinTypes[activeTwinType].color} />
                    </div>
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
                          className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                          style={{ background: `${layer.color}15` }}
                        >
                          <layer.Icon size={18} color={layer.color} strokeWidth={1.8} />
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

        {/* Manufacturing Data Platform - precursor to Digital Twin and AI */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="text-center mb-8">
            <div className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3" style={{ background: '#005EB820', color: '#005EB8' }}>
              The Foundation Layer
            </div>
            <h3 className="text-xl font-bold text-[#003B73]">Manufacturing Data Platform - the step before Digital Twin and AI</h3>
            <p className="text-sm text-[#6B7E9E] mt-2 max-w-2xl mx-auto">
              Before a Digital Twin can be meaningful - and before any AI model can be trusted - there needs to be a structured, unified, and governed layer for manufacturing data. This is the Manufacturing Data Platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-6">
            {[
              {
                step: '1',
                label: 'OT Asset Data',
                desc: 'Raw data from sensors, PLCs, HMIs, and SCADA systems. Fragmented, multi-protocol, varying quality.',
                color: '#F5A623',
                note: 'Starting point',
              },
              {
                step: '2',
                label: 'Manufacturing Data Platform',
                desc: 'Unified layer that ingests, cleanses, contextualises, and governs operational data. Includes OT CMDB, data lineage, and a semantic model.',
                color: '#005EB8',
                note: 'The critical enabler',
              },
              {
                step: '3',
                label: 'Digital Twin',
                desc: 'Fed by the MDP, the twin reflects real operational state and can simulate outcomes. Only as good as the data beneath it.',
                color: '#12B3A8',
                note: 'Requires MDP',
              },
              {
                step: '4',
                label: 'AI and Autonomous Operations',
                desc: 'Models trained and served against clean, contextualised MDP data. Without MDP governance, AI outputs are unreliable.',
                color: '#6366F1',
                note: 'Requires Digital Twin + MDP',
              },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative glass rounded-2xl p-5"
                style={{ borderTop: `3px solid ${item.color}` }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ background: item.color }}>
                    {item.step}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wide" style={{ color: item.color }}>{item.note}</span>
                </div>
                <div className="text-sm font-bold text-[#003B73] mb-2">{item.label}</div>
                <p className="text-xs text-[#6B7E9E] leading-relaxed">{item.desc}</p>
                {i < 3 && (
                  <div className="hidden md:block absolute -right-1.5 top-1/2 -translate-y-1/2 text-[#9CA3AF] text-lg font-bold z-10">
                    ›
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          <div className="glass rounded-2xl p-5 max-w-3xl mx-auto" style={{ border: '1px solid rgba(0,94,184,0.15)', background: 'rgba(0,94,184,0.03)' }}>
            <div className="text-xs font-bold uppercase tracking-widest text-[#005EB8] mb-2">What the Manufacturing Data Platform does</div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { label: 'Ingest and normalise', desc: 'Pulls from PLCs, SCADA, MES, ERP - normalised to a common schema regardless of protocol or vendor.' },
                { label: 'Contextualise and govern', desc: 'Applies the OT CMDB context - location, criticality, maintenance history, compliance status - to every data point.' },
                { label: 'Expose and serve', desc: 'Provides a clean, governed, API-accessible data layer that Digital Twins and AI models can consume reliably.' },
              ].map(item => (
                <div key={item.label}>
                  <div className="text-xs font-semibold text-[#003B73] mb-1">{item.label}</div>
                  <div className="text-xs text-[#6B7E9E] leading-relaxed">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Twin insight */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center p-8 rounded-3xl max-w-3xl mx-auto"
          style={{ background: 'linear-gradient(135deg, rgba(0,59,115,0.04), rgba(0,163,224,0.06))', border: '1px solid rgba(0,94,184,0.12)' }}
        >
          <p className="text-xl font-bold text-[#003B73] mb-3">"Digital twins are not dashboards."</p>
          <p className="text-lg text-[#4A6B8A]">"They are operational decision systems - alive with context, capable of simulation, and wired for autonomous action."</p>
        </motion.div>
      </div>
    </section>
  );
}
