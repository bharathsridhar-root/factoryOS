import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHeader } from '../components/SectionHeader';
import { SceneLens } from '../components/SceneLens';
import { fragmentationProblems, otNodes } from '../content';

// Purdue Model: L4 Enterprise at TOP → L0 Field at BOTTOM (standard diagram orientation)
const zones = [
  { id: 'L4',  label: 'Level 4 — Enterprise',  color: '#003B73', y: 2  },
  { id: 'L3',  label: 'Level 3 — Operations',   color: '#005EB8', y: 18 },
  { id: 'DMZ', label: 'OT / IT DMZ',            color: '#12B3A8', y: 34 },
  { id: 'L2',  label: 'Level 2 — Supervisory',  color: '#00A3E0', y: 50 },
  { id: 'L1',  label: 'Level 1 — Control',      color: '#F5A623', y: 66 },
  { id: 'L0',  label: 'Level 0 — Field',        color: '#D64545', y: 82 },
];

function NodeDot({ node, revealed }: { node: typeof otNodes[0]; revealed: boolean }) {
  const colorMap = { online: '#12B3A8', warning: '#F5A623', critical: '#D64545', offline: '#9CA3AF', unknown: '#6B7E9E' };
  const color = revealed ? colorMap[node.status] : '#D64545';

  return (
    <motion.div
      className="absolute flex flex-col items-center"
      style={{ left: `${node.x}%`, top: `${node.y}%`, transform: 'translate(-50%, -50%)' }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: Math.random() * 0.5 }}
    >
      {/* Pulse ring for unknown/critical */}
      {(!revealed || node.status === 'critical') && (
        <motion.div
          className="absolute rounded-full"
          style={{ width: 20, height: 20, background: `${color}30`, top: -5, left: -5 }}
          animate={{ scale: [1, 1.8], opacity: [0.6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      )}
      <div
        className="w-2.5 h-2.5 rounded-full transition-all duration-700"
        style={{
          background: color,
          boxShadow: revealed ? `0 0 8px ${color}60` : 'none',
          animation: !revealed ? 'blink-node 1.8s ease-in-out infinite' : 'none',
        }}
      />
      {revealed && (
        <div className="text-[8px] font-medium text-[#6B7E9E] mt-0.5 whitespace-nowrap max-w-[60px] text-center leading-tight">
          {node.label}
        </div>
      )}
    </motion.div>
  );
}

export function Scene1InvisibleFactory() {
  const [revealed, setRevealed] = useState(false);
  const [selectedProblem, setSelectedProblem] = useState<string | null>(null);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    if (!revealed) {
      const interval = setInterval(() => {
        setCounter(c => c + Math.floor(Math.random() * 7));
      }, 400);
      return () => clearInterval(interval);
    }
  }, [revealed]);

  return (
    <section id="scene1" className="relative py-32 overflow-hidden" style={{ background: '#F7FAFC' }}>
      <div className="absolute inset-0 grid-lines opacity-50 pointer-events-none" />

      <div className="max-w-screen-xl mx-auto px-6">
        <SectionHeader
          scene={1}
          tag="The Invisible Factory"
          title="You cannot transform what you cannot see."
          subtitle="Most industrial organizations are operating in the dark. Thousands of assets exist in a state of permanent ambiguity — unmanaged, unmonitored, and unaccounted for."
          accent="#D64545"
        />

        <SceneLens sceneId={1} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left: Fragmentation problems */}
          <div>
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-[#003B73]">Fragmentation Signals</h3>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full status-critical animate-blink" />
                <span className="text-xs font-medium text-[#D64545]">
                  {counter.toLocaleString()} unresolved events
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {fragmentationProblems.map((prob, i) => (
                <motion.button
                  key={prob.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  onClick={() => setSelectedProblem(selectedProblem === prob.id ? null : prob.id)}
                  className={`glass rounded-xl p-4 text-left transition-all card-lift ${
                    selectedProblem === prob.id ? 'ring-2 ring-[#D64545]' : ''
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <span className="text-2xl">{prob.icon}</span>
                    <span
                      className="text-xs font-bold px-2 py-0.5 rounded-full"
                      style={{
                        background: prob.severity === 'critical' ? '#D6454520' : '#F5A62320',
                        color: prob.severity === 'critical' ? '#D64545' : '#F5A623',
                      }}
                    >
                      {prob.count}
                    </span>
                  </div>
                  <div className="text-sm font-semibold text-[#003B73]">{prob.label}</div>
                  <div
                    className="flex items-center gap-1 mt-1"
                  >
                    <div
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ background: prob.severity === 'critical' ? '#D64545' : '#F5A623' }}
                    />
                    <span className="text-xs text-[#9CA3AF] capitalize">{prob.severity}</span>
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Core insight */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mt-8 p-5 rounded-2xl industrial-border"
              style={{ background: 'rgba(214,69,69,0.04)' }}
            >
              <p className="text-sm font-semibold text-[#D64545] mb-2">The transformation failure pattern:</p>
              <p className="text-sm text-[#4A6B8A] leading-relaxed">
                Organizations invest in AI, predictive maintenance, and digital twins — before solving asset visibility, operational topology, and governance. These initiatives cannot succeed without a visible foundation.
              </p>
            </motion.div>
          </div>

          {/* Right: Factory topology visualization */}
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-[#003B73]">Purdue Level Map</h3>
              <button
                onClick={() => setRevealed(!revealed)}
                className="text-xs font-semibold px-4 py-2 rounded-lg transition-all"
                style={{
                  background: revealed ? '#12B3A8' : '#D64545',
                  color: 'white',
                  boxShadow: `0 4px 16px ${revealed ? '#12B3A880' : '#D6454580'}`,
                }}
              >
                {revealed ? '✓ Assets Discovered' : '⚡ Run Discovery'}
              </button>
            </div>

            {/* Zone key — vertical legend on left */}
            <div className="mb-3 flex items-center gap-2 flex-wrap">
              {zones.map(z => (
                <div key={z.id} className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-sm" style={{ background: z.color }} />
                  <span className="text-[10px] font-medium" style={{ color: z.color }}>{z.id === 'DMZ' ? 'DMZ' : z.id}</span>
                </div>
              ))}
              <span className="text-[10px] text-[#9CA3AF] ml-1">← Enterprise at top · Field at bottom</span>
            </div>

            <div className="relative rounded-2xl overflow-hidden border border-[rgba(0,94,184,0.1)]"
              style={{ height: 400, background: 'linear-gradient(180deg, #EAF4FF 0%, #F7FAFC 100%)' }}>

              {/* Zone bands — each covers ~16% height */}
              {zones.map((zone) => (
                <div
                  key={zone.id}
                  className="absolute left-0 right-0 flex items-center px-3"
                  style={{
                    top: `${zone.y}%`,
                    height: '16%',
                    borderBottom: `1px solid ${zone.color}15`,
                    background: `${zone.color}04`,
                  }}
                >
                  <div className="h-3/4 w-1 rounded-full mr-2 opacity-50" style={{ background: zone.color }} />
                  <span className="text-[9px] font-semibold opacity-60 uppercase tracking-wide" style={{ color: zone.color }}>
                    {zone.label}
                  </span>
                </div>
              ))}

              {/* Nodes */}
              {otNodes.map((node) => (
                <NodeDot key={node.id} node={node} revealed={revealed} />
              ))}

              {/* Overlay for dark zones — in L1 and L2 layers */}
              {!revealed && (
                <div className="absolute inset-0 pointer-events-none">
                  {[
                    { left: '22%', top: '48%', w: '22%', h: '18%' },
                    { left: '58%', top: '64%', w: '26%', h: '18%' },
                  ].map((zone, i) => (
                    <motion.div
                      key={i}
                      className="absolute rounded-xl"
                      style={{
                        left: zone.left, top: zone.top,
                        width: zone.w, height: zone.h,
                        background: 'rgba(0,0,0,0.06)',
                        border: '1px dashed rgba(214,69,69,0.3)',
                      }}
                      animate={{ opacity: [0.4, 0.8, 0.4] }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.7 }}
                    >
                      <span className="text-[9px] font-bold text-[#D64545] p-1 block">DARK ZONE</span>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Legend */}
            <div className="flex flex-wrap gap-3 mt-4">
              {[
                { label: 'Online', color: '#12B3A8' },
                { label: 'Warning', color: '#F5A623' },
                { label: 'Critical', color: '#D64545' },
                { label: 'Unknown', color: '#6B7E9E' },
                { label: 'Offline', color: '#9CA3AF' },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full" style={{ background: item.color }} />
                  <span className="text-xs text-[#6B7E9E]">{item.label}</span>
                </div>
              ))}
            </div>

            {/* Stats bar */}
            <AnimatePresence>
              {revealed && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12 }}
                  className="mt-4 grid grid-cols-3 gap-3"
                >
                  {[
                    { label: 'Assets Found', value: otNodes.length, color: '#12B3A8' },
                    { label: 'Critical', value: otNodes.filter(n => n.status === 'critical').length, color: '#D64545' },
                    { label: 'Protocols', value: '8', color: '#005EB8' },
                  ].map((stat) => (
                    <div key={stat.label} className="glass rounded-xl p-3 text-center">
                      <div className="text-xl font-bold" style={{ color: stat.color }}>{stat.value}</div>
                      <div className="text-xs text-[#6B7E9E] mt-0.5">{stat.label}</div>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
