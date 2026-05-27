import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Cpu, Monitor, Server, Users, Cloud, Radio, Database,
  Network, Package, Shield, GitBranch, Zap, Clock, AlertTriangle,
  type LucideIcon,
} from 'lucide-react';
import { SectionHeader } from '../components/SectionHeader';
import { SceneLens } from '../components/SceneLens';

const graphNodes: { id: string; label: string; type: string; x: number; y: number; Icon: LucideIcon; status: string; color: string }[] = [
  { id: 'motor',       label: 'Motor B-7',     type: 'asset',  x: 50, y: 45, Icon: Cpu,      status: 'online',   color: '#005EB8' },
  { id: 'plc',         label: 'PLC Line 3',    type: 'plc',    x: 25, y: 25, Icon: Cpu,      status: 'online',   color: '#00A3E0' },
  { id: 'hmi',         label: 'HMI Station',   type: 'hmi',    x: 75, y: 25, Icon: Monitor,  status: 'warning',  color: '#F5A623' },
  { id: 'historian',   label: 'PI Historian',  type: 'server', x: 20, y: 70, Icon: Server,   status: 'online',   color: '#12B3A8' },
  { id: 'mes',         label: 'MES SAP',       type: 'server', x: 80, y: 70, Icon: Server,   status: 'online',   color: '#003B73' },
  { id: 'operator',    label: 'Operator-J12',  type: 'worker', x: 50, y: 80, Icon: Users,    status: 'online',   color: '#F5A623' },
  { id: 'erp',         label: 'ERP Oracle',    type: 'cloud',  x: 50, y: 10, Icon: Cloud,    status: 'online',   color: '#6B7E9E' },
  { id: 'energy',      label: 'Energy Meter',  type: 'sensor', x: 10, y: 45, Icon: Radio,    status: 'online',   color: '#12B3A8' },
  { id: 'maintenance', label: 'Maint Records', type: 'data',   x: 90, y: 45, Icon: Database, status: 'online',   color: '#9CA3AF' },
];

const edges = [
  { from: 'plc', to: 'motor', label: 'controls', protocol: 'EtherNet/IP' },
  { from: 'hmi', to: 'plc', label: 'supervises', protocol: 'OPC-UA' },
  { from: 'motor', to: 'historian', label: 'telemetry', protocol: 'OPC-DA' },
  { from: 'historian', to: 'mes', label: 'production data', protocol: 'REST API' },
  { from: 'mes', to: 'erp', label: 'order sync', protocol: 'IDocs' },
  { from: 'operator', to: 'hmi', label: 'operates', protocol: 'Human' },
  { from: 'energy', to: 'motor', label: 'monitors', protocol: 'Modbus' },
  { from: 'maintenance', to: 'motor', label: 'history', protocol: 'REST' },
  { from: 'mes', to: 'operator', label: 'work orders', protocol: 'REST' },
];

const nodeDetails: Record<string, {
  telemetry: string[];
  vulnerabilities: number;
  energyKW: string;
  lastMaint: string;
  twinState: string;
  dependencies: string[];
}> = {
  motor: {
    telemetry: ['Vibration: 2.1g ↑', 'Temperature: 68°C', 'Current: 14.2A', 'Speed: 1480 RPM'],
    vulnerabilities: 0,
    energyKW: '18.4 kW',
    lastMaint: '32 days ago',
    twinState: 'Active - Health 82%',
    dependencies: ['PLC Line 3', 'Energy Meter', 'PI Historian'],
  },
  plc: {
    telemetry: ['CPU Load: 34%', 'Scan Time: 12ms', 'I/O Points: 248/256', 'Errors: 0'],
    vulnerabilities: 2,
    energyKW: '0.4 kW',
    lastMaint: '90 days ago',
    twinState: 'Active - Fully synced',
    dependencies: ['Motor B-7', 'HMI Station', 'Safety System'],
  },
};

const technologies: { label: string; desc: string; Icon: LucideIcon; color: string }[] = [
  { label: 'Unified Namespace',          desc: 'Single semantic topic hierarchy for all OT data',  Icon: Network,    color: '#005EB8' },
  { label: 'Asset Administration Shell', desc: 'IEC 63278 digital identity for every asset',        Icon: Package,    color: '#00A3E0' },
  { label: 'OPC UA',                     desc: 'Secure, platform-independent data exchange',        Icon: Shield,     color: '#12B3A8' },
  { label: 'MQTT Sparkplug B',           desc: 'Lightweight, stateful industrial messaging',        Icon: Radio,      color: '#F5A623' },
  { label: 'Digital Thread',             desc: 'Continuous data lineage from design to disposal',   Icon: GitBranch,  color: '#003B73' },
  { label: 'Knowledge Graph',            desc: 'Semantic relationship model of your operations',    Icon: Database,   color: '#9CA3AF' },
];

export function Scene3OperationalGraph() {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const details = selectedNode ? nodeDetails[selectedNode] : null;

  // Calculate edge coordinates from node positions
  function getEdgeCoords(fromId: string, toId: string) {
    const from = graphNodes.find(n => n.id === fromId);
    const to = graphNodes.find(n => n.id === toId);
    if (!from || !to) return null;
    return { x1: from.x, y1: from.y, x2: to.x, y2: to.y };
  }

  return (
    <section id="scene3" className="relative py-32 overflow-hidden" style={{ background: '#F7FAFC' }}>
      <div className="absolute inset-0 grid-lines opacity-30 pointer-events-none" />

      <div className="max-w-screen-xl mx-auto px-6">
        <SectionHeader
          scene={3}
          tag="Living Operational Graph"
          title="The factory evolves into a living knowledge graph."
          subtitle="Operational context is the semantic layer that turns raw telemetry into industrial intelligence. Every asset, every relationship, every workflow - connected and queryable."
          accent="#00A3E0"
        />

        <SceneLens sceneId={3} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Graph visualization */}
          <div className="lg:col-span-2">
            <div
              className="relative rounded-2xl overflow-hidden"
              style={{ height: 440, background: 'linear-gradient(135deg, #EAF4FF 0%, #F0F8FF 100%)', border: '1px solid rgba(0,94,184,0.1)' }}
            >
              {/* SVG edges */}
              <svg className="absolute inset-0 w-full h-full" style={{ pointerEvents: 'none' }}>
                <defs>
                  <marker id="arrowhead" markerWidth="6" markerHeight="4" refX="6" refY="2" orient="auto">
                    <polygon points="0 0, 6 2, 0 4" fill="rgba(0,94,184,0.25)" />
                  </marker>
                </defs>
                {edges.map((edge) => {
                  const coords = getEdgeCoords(edge.from, edge.to);
                  if (!coords) return null;
                  return (
                    <motion.line
                      key={`${edge.from}-${edge.to}`}
                      x1={`${coords.x1}%`} y1={`${coords.y1}%`}
                      x2={`${coords.x2}%`} y2={`${coords.y2}%`}
                      stroke="rgba(0,94,184,0.18)"
                      strokeWidth="1.5"
                      strokeDasharray="5 3"
                      markerEnd="url(#arrowhead)"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    />
                  );
                })}
                {/* Animated flow particles */}
                {edges.slice(0, 4).map((edge, i) => {
                  const coords = getEdgeCoords(edge.from, edge.to);
                  if (!coords) return null;
                  return (
                    <motion.circle
                      key={`particle-${i}`}
                      r="3"
                      fill="#00A3E0"
                      opacity={0.6}
                      animate={{
                        cx: [`${coords.x1}%`, `${coords.x2}%`],
                        cy: [`${coords.y1}%`, `${coords.y2}%`],
                        opacity: [0, 0.8, 0],
                      }}
                      transition={{
                        duration: 2,
                        delay: i * 0.5,
                        repeat: Infinity,
                        ease: 'linear',
                      }}
                    />
                  );
                })}
              </svg>

              {/* Nodes */}
              {graphNodes.map((node) => (
                <motion.button
                  key={node.id}
                  className="absolute flex flex-col items-center group"
                  style={{
                    left: `${node.x}%`,
                    top: `${node.y}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                  onClick={() => setSelectedNode(selectedNode === node.id ? null : node.id)}
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shadow-sm"
                    style={{
                      background: selectedNode === node.id ? node.color : 'white',
                      border: `2px solid ${node.color}40`,
                      boxShadow: selectedNode === node.id ? `0 0 20px ${node.color}40` : '0 2px 8px rgba(0,59,115,0.1)',
                    }}
                    animate={selectedNode === node.id ? { scale: [1, 1.05, 1] } : {}}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <node.Icon size={16} color={selectedNode === node.id ? 'white' : node.color} strokeWidth={1.8} />
                  </motion.div>
                  <span className="text-[10px] font-semibold text-[#003B73] mt-1 whitespace-nowrap bg-white/80 px-1 rounded">
                    {node.label}
                  </span>
                </motion.button>
              ))}

              {/* Instructions */}
              <div className="absolute bottom-3 left-3 text-[11px] text-[#9AAFBE] font-medium">
                Click any asset to explore its operational context
              </div>
            </div>
          </div>

          {/* Detail panel */}
          <div>
            <AnimatePresence mode="wait">
              {details ? (
                <motion.div
                  key={selectedNode}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="glass rounded-2xl p-6 h-full"
                >
                  <div className="flex items-center gap-3 mb-5">
                    {(() => { const n = graphNodes.find(n => n.id === selectedNode); return n ? <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${n.color}15` }}><n.Icon size={20} color={n.color} strokeWidth={1.8} /></div> : null; })()}
                    <div>
                      <div className="font-bold text-[#003B73]">{graphNodes.find(n => n.id === selectedNode)?.label}</div>
                      <div className="text-xs text-[#6B7E9E]">{graphNodes.find(n => n.id === selectedNode)?.type}</div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="text-xs font-bold text-[#005EB8] uppercase tracking-wide mb-2">Live Telemetry</div>
                      {details.telemetry.map(t => (
                        <div key={t} className="flex items-center gap-2 py-1">
                          <div className="w-1.5 h-1.5 rounded-full status-online" />
                          <span className="text-xs text-[#4A6B8A]">{t}</span>
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      {([
                        { label: 'Energy',      value: details.energyKW,                       Icon: Zap,           color: '#F5A623' },
                        { label: 'Last Maint.', value: details.lastMaint,                      Icon: Clock,         color: '#00A3E0' },
                        { label: 'Twin State',  value: details.twinState,                      Icon: Cpu,           color: '#005EB8' },
                        { label: 'CVEs',        value: details.vulnerabilities.toString(),      Icon: AlertTriangle, color: '#D64545' },
                      ] as const).map(item => (
                        <div key={item.label} className="bg-[#EAF4FF] rounded-xl p-3">
                          <div className="mb-1">
                            <item.Icon size={16} color={item.color} strokeWidth={1.8} />
                          </div>
                          <div className="text-xs text-[#6B7E9E]">{item.label}</div>
                          <div className="text-xs font-bold text-[#003B73] mt-0.5">{item.value}</div>
                        </div>
                      ))}
                    </div>

                    <div>
                      <div className="text-xs font-bold text-[#005EB8] uppercase tracking-wide mb-2">Dependencies</div>
                      {details.dependencies.map(dep => (
                        <div key={dep} className="flex items-center gap-2 py-1 border-b border-[rgba(0,94,184,0.06)]">
                          <span className="text-[#00A3E0]">→</span>
                          <span className="text-xs text-[#4A6B8A]">{dep}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="glass rounded-2xl p-6 h-full flex flex-col"
                >
                  <h3 className="text-lg font-semibold text-[#003B73] mb-4">Enabling Technologies</h3>
                  <div className="space-y-3">
                    {technologies.map((tech, i) => (
                      <motion.div
                        key={tech.label}
                        initial={{ opacity: 0, x: 16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.08 }}
                        className="flex items-start gap-3 p-3 rounded-xl"
                        style={{ background: `${tech.color}08`, border: `1px solid ${tech.color}20` }}
                      >
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${tech.color}15` }}>
                          <tech.Icon size={16} color={tech.color} strokeWidth={1.8} />
                        </div>
                        <div>
                          <div className="text-sm font-semibold" style={{ color: tech.color }}>{tech.label}</div>
                          <div className="text-xs text-[#6B7E9E] mt-0.5">{tech.desc}</div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
