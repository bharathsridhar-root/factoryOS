import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Factory, Search, Cpu, Zap, Cloud, Building2, CheckCircle, Shield, Leaf,
  Network, GitMerge, Map, type LucideIcon,
} from 'lucide-react';
import { SectionHeader } from '../components/SectionHeader';

// ─── Data ─────────────────────────────────────────────────────────────────────

interface EcoNode {
  id: string;
  label: string;
  short: string;
  Icon: LucideIcon;
  color: string;
  bg: string;
  cx: number;   // % of SVG width  (0-100)
  cy: number;   // % of SVG height (0-100)
  isHub?: boolean;
  journeyStep?: number;
  badge: string;
  items: string[];
  tools: string[];
  desc: string;
  dataIn: string;
  dataOut: string;
}

const nodes: EcoNode[] = [
  {
    id: 'production',
    label: 'Production Floor',
    short: 'Production',
    Icon: Factory,
    color: '#F5A623',
    bg: '#FFFBEB',
    cx: 7, cy: 50,
    journeyStep: 1,
    badge: 'Source',
    items: ['Bioreactors & Fermenters', 'Filling & Packaging Lines', 'Assembly Cells', 'CNC Machines', 'Cleanroom Assets'],
    tools: ['PLCs (Siemens, Rockwell, ABB)', 'Sensors & Actuators', 'HMI / SCADA', 'DCS Systems'],
    desc: 'The physical manufacturing estate - hundreds of OT assets across all Purdue levels generating continuous operational telemetry. In life sciences: cleanrooms, bioreactors, filling lines, and precision assembly cells.',
    dataIn: 'Production schedules, maintenance plans, quality specs',
    dataOut: 'Raw telemetry, alarms, process parameters, energy readings, operational events',
  },
  {
    id: 'ot-visibility',
    label: 'OT Visibility & CMDB',
    short: 'OT CMDB',
    Icon: Search,
    color: '#005EB8',
    bg: '#EAF4FF',
    cx: 26, cy: 50,
    journeyStep: 2,
    badge: 'Foundation',
    items: ['Passive Asset Discovery', 'Device Fingerprinting', 'CMDB Auto-Population', 'Network Topology', 'Firmware & CVE Tracking'],
    tools: ['Claroty / Nozomi Networks', 'OT Asset CMDB', 'Protocol Analyser', 'Vulnerability Engine'],
    desc: 'The non-negotiable first step. Passive, zero-impact discovery and classification of every OT asset - making the invisible factory visible. No twins, no AI, no autonomy without this foundation.',
    dataIn: 'Network traffic (passive), CMDB feeds, AD sync',
    dataOut: 'Asset inventory, vulnerability data, topology map, compliance state, GxP asset register',
  },
  {
    id: 'digital-core',
    label: 'Digital Core Platform',
    short: 'Digital Core',
    Icon: Cpu,
    color: '#003B73',
    bg: '#EAF4FF',
    cx: 50, cy: 50,
    isHub: true,
    journeyStep: 3,
    badge: 'Hub',
    items: ['Digital Twin Engine', 'OT Data Platform', 'Operational Knowledge Graph', 'AI / ML Pipeline', 'LLM Reasoning Layer', 'Event Orchestration'],
    tools: ['Azure Digital Twins', 'Azure Data Explorer (ADX)', 'Graph DB', 'ML Platform', 'Factory Copilot', 'Event Bus'],
    desc: 'The central intelligence platform where raw asset data becomes operational knowledge, predictions, and autonomous decisions. Every other node either feeds into it or receives intelligence from it.',
    dataIn: 'Asset inventory, telemetry streams, business context, cloud services',
    dataOut: 'Twin state, failure predictions, autonomous actions, carbon data, recommendations, audit trail',
  },
  {
    id: 'use-cases',
    label: 'Use Cases & Outcomes',
    short: 'Use Cases',
    Icon: Zap,
    color: '#12B3A8',
    bg: '#E6FAF8',
    cx: 74, cy: 50,
    journeyStep: 4,
    badge: 'Value',
    items: ['Predictive Maintenance', 'AI Quality Inspection', 'Carbon & Energy Twin', 'Digital Product Passport', 'Worker Safety Twin', 'Autonomous Operations', 'Factory Copilot'],
    tools: ['PdM Platform', 'Vision AI', 'Carbon Lens™', 'DPP Registry', 'Safety Twin', 'Orchestration Engine'],
    desc: 'Where digital intelligence translates into measurable operational and financial outcomes. Each use case is impossible without the foundation layers beneath it.',
    dataIn: 'Twin state, predictions, operational graph, process parameters',
    dataOut: 'Work orders, quality holds, carbon reports, audit packs, autonomous actions, operator alerts',
  },
  {
    id: 'central-it',
    label: 'Central IT & Cloud',
    short: 'Cloud & IT',
    Icon: Cloud,
    color: '#6366F1',
    bg: '#F0F0FF',
    cx: 50, cy: 11,
    badge: 'Infrastructure',
    items: ['Azure Cloud', 'Data Lake & Warehouse', 'API Gateway', 'Identity & Access', 'SD-WAN / OT Network', 'CI/CD & DevOps'],
    tools: ['Azure', 'Azure', 'ServiceNow', 'Active Directory', 'Palo Alto Networks'],
    desc: 'Enterprise IT backbone providing cloud compute, secure data storage, and the network infrastructure for OT/IT convergence. The "highway" on which OT data travels.',
    dataIn: 'OT telemetry, identity requests, application data',
    dataOut: 'Cloud services, data persistence, IAM, network policy enforcement',
  },
  {
    id: 'business-systems',
    label: 'Business Systems',
    short: 'ERP / MES / PLM',
    Icon: Building2,
    color: '#003B73',
    bg: '#EAF4FF',
    cx: 77, cy: 16,
    badge: 'Enterprise',
    items: ['SAP S/4HANA (ERP)', 'MES / Opcenter', 'PLM (Teamcenter)', 'LIMS (LabWare)', 'EAM / SAP PM', 'Supply Chain'],
    tools: ['SAP', 'Siemens Opcenter', 'Teamcenter', 'LabWare LIMS', 'SAP PM / Maximo'],
    desc: 'Enterprise systems that both consume operational intelligence from the Digital Core and provide business context back into it - closing the loop between shop floor and top floor.',
    dataIn: 'Operational insights, twin state, quality events, maintenance predictions',
    dataOut: 'Work orders, production schedules, quality specs, maintenance plans, BOM data',
  },
  {
    id: 'quality-gxp',
    label: 'Quality & GxP Compliance',
    short: 'Quality & GxP',
    Icon: CheckCircle,
    color: '#10B981',
    bg: '#F0FDF4',
    cx: 77, cy: 84,
    badge: 'Compliance',
    items: ['GxP Digital Thread', 'FDA 21 CFR Part 11', 'Electronic Batch Records', 'Audit Trail Engine', 'CAPA Management', 'Annex 11 Compliance'],
    tools: ['eQMS', 'Electronic Batch Records', 'Audit Trail Engine', 'Validation Suite (IQ/OQ/PQ)'],
    desc: 'Life sciences regulatory compliance continuously automated through the Digital Core - turning weeks-long audit preparation into a 2-hour exercise. Full traceability from raw material to batch release.',
    dataIn: 'Process parameters, asset events, twin state, operational graph data',
    dataOut: 'Compliance certificates, electronic batch records, audit packs, CAPA reports, deviation records',
  },
  {
    id: 'ot-security',
    label: 'OT Security & Governance',
    short: 'OT Security',
    Icon: Shield,
    color: '#D64545',
    bg: '#FFF1F1',
    cx: 23, cy: 84,
    badge: 'Security',
    items: ['IEC 62443 Compliance', 'Zero Trust OT Access', 'Patch Management', 'Incident Response', 'PAM / Session Recording', 'Policy Drift Detection'],
    tools: ['Firewall / DMZ', 'Privileged Access Mgmt', 'SIEM / OT SOC', 'Vulnerability Manager', 'Zero Trust Engine'],
    desc: 'Security posture and governance built directly on operational truth. You can only protect what you can see - which is why OT Visibility is the prerequisite for everything, including security.',
    dataIn: 'Asset inventory from OT CMDB, network topology, vulnerability data',
    dataOut: 'Security alerts, compliance scores, incident logs, patch status, threat intelligence',
  },
  {
    id: 'sustainability',
    label: 'Sustainability & ESG',
    short: 'Sustainability',
    Icon: Leaf,
    color: '#34D399',
    bg: '#F0FDF4',
    cx: 50, cy: 89,
    badge: 'ESG',
    items: ['Carbon Twin', 'Scope 1/2/3 Tracking', 'Energy Optimisation', 'ESG Reporting', 'EU Taxonomy', 'Carbon Credit Management'],
    tools: ['Carbon Lens™', 'Energy Metering Grid', 'Grid API', 'CDP / GHG Protocol', 'EU Taxonomy Engine'],
    desc: 'Carbon and energy intelligence driven by real-time operational data - sustainability as an engineering discipline, not a reporting obligation. The carbon twin knows exactly where every gram of CO₂ originates.',
    dataIn: 'Energy readings, production data, asset states, process parameters from Digital Core',
    dataOut: 'Carbon reports, energy savings actions, ESG dashboard, regulatory submissions, offset calculations',
  },
];

// SVG viewBox: 0 0 1000 720
// Convert % → SVG coordinate
const sx = (pct: number) => (pct / 100) * 1000;
const sy = (pct: number) => (pct / 100) * 720;

const nodeMap = Object.fromEntries(nodes.map(n => [n.id, n]));

interface Conn { from: string; to: string; type: 'journey' | 'support'; label: string; bidirectional?: boolean }

const connections: Conn[] = [
  // ── Main Journey (left → right, horizontal) ──────────────────────────────
  { from: 'production',    to: 'ot-visibility', type: 'journey', label: 'OT telemetry stream' },
  { from: 'ot-visibility', to: 'digital-core',  type: 'journey', label: 'Asset inventory + topology' },
  { from: 'digital-core',  to: 'use-cases',     type: 'journey', label: 'Predictions + decisions' },
  // ── Support ───────────────────────────────────────────────────────────────
  { from: 'central-it',       to: 'digital-core',    type: 'support', label: 'Cloud infra + connectivity', bidirectional: true },
  { from: 'business-systems', to: 'digital-core',    type: 'support', label: 'Business context ↔ insights', bidirectional: true },
  { from: 'use-cases',        to: 'quality-gxp',     type: 'support', label: 'Quality events + audit trail' },
  { from: 'ot-security',      to: 'ot-visibility',   type: 'support', label: 'Security posture ← inventory' },
  { from: 'digital-core',     to: 'sustainability',  type: 'support', label: 'Energy + carbon data' },
  { from: 'digital-core',     to: 'ot-security',     type: 'support', label: 'Topology + policy' },
  { from: 'business-systems', to: 'central-it',      type: 'support', label: 'API + identity' },
  { from: 'quality-gxp',      to: 'business-systems',type: 'support', label: 'Batch records + compliance' },
];

function svgPath(from: EcoNode, to: EcoNode): string {
  const ax = sx(from.cx), ay = sy(from.cy);
  const bx = sx(to.cx),   by = sy(to.cy);
  // For horizontal journey connections use a slight arc
  if (Math.abs(ay - by) < 30) {
    const cy = ay - 30;
    return `M ${ax} ${ay} Q ${(ax+bx)/2} ${cy} ${bx} ${by}`;
  }
  // For others use a smooth cubic bezier
  const dx = (bx - ax) * 0.4;
  return `M ${ax} ${ay} C ${ax+dx} ${ay} ${bx-dx} ${by} ${bx} ${by}`;
}

// Journey step numbers for badge rendering
const journeyNodes = nodes.filter(n => n.journeyStep).sort((a, b) => a.journeyStep! - b.journeyStep!);

// ─── Sub-components ───────────────────────────────────────────────────────────

function FlowPath({ conn, hovered, journeyMode }: {
  conn: Conn;
  hovered: string | null;
  journeyMode: boolean;
}) {
  const from = nodeMap[conn.from];
  const to   = nodeMap[conn.to];
  if (!from || !to) return null;

  const isJourney = conn.type === 'journey';
  const isActive = hovered === conn.from || hovered === conn.to;
  const dimmed = journeyMode && !isJourney;

  const pathD = svgPath(from, to);
  const color = isJourney ? '#005EB8' : (isActive ? from.color : 'rgba(0,94,184,0.2)');
  const strokeW = isJourney ? 2.5 : (isActive ? 2 : 1.2);
  const dash = isJourney ? '8 5' : '5 6';
  const opacity = dimmed ? 0.1 : isActive ? 1 : isJourney ? 0.8 : 0.5;

  return (
    <g>
      {/* Static path */}
      <path
        d={pathD}
        fill="none"
        stroke={color}
        strokeWidth={strokeW}
        strokeDasharray={dash}
        opacity={opacity}
        style={{ transition: 'all 0.3s ease' }}
      />
      {/* Animated flow particle */}
      {(isJourney || isActive) && !dimmed && (
        <motion.circle
          r={isJourney ? 4 : 3}
          fill={from.color}
          opacity={0.9}
        >
          <animateMotion
            dur={isJourney ? '2s' : '3s'}
            repeatCount="indefinite"
            path={pathD}
          />
        </motion.circle>
      )}
      {/* Connection label on hover */}
      {isActive && (
        <text
          x={(sx(from.cx) + sx(to.cx)) / 2}
          y={(sy(from.cy) + sy(to.cy)) / 2 - 10}
          textAnchor="middle"
          fontSize="9"
          fill={from.color}
          fontWeight="600"
          opacity={0.9}
        >
          {conn.label}
        </text>
      )}
    </g>
  );
}

function NodeCard({ node, hovered, onHover, journeyMode }: {
  node: EcoNode;
  hovered: string | null;
  onHover: (id: string | null) => void;
  journeyMode: boolean;
}) {
  const isHovered = hovered === node.id;
  const isDimmed  = journeyMode && !node.journeyStep;
  const cardW = 148;
  const cardH = node.isHub ? 130 : 110;

  return (
    <motion.div
      style={{
        position: 'absolute',
        left: `calc(${node.cx}% - ${cardW/2}px)`,
        top:  `calc(${node.cy}% - ${cardH/2}px)`,
        width: cardW,
        zIndex: isHovered ? 30 : 10,
        opacity: isDimmed ? 0.25 : 1,
        transition: 'opacity 0.3s ease',
      }}
      animate={node.isHub ? { boxShadow: [`0 0 0px ${node.color}00`, `0 0 30px ${node.color}50`, `0 0 0px ${node.color}00`] } : {}}
      transition={node.isHub ? { duration: 2.5, repeat: Infinity } : {}}
      onMouseEnter={() => onHover(node.id)}
      onMouseLeave={() => onHover(null)}
    >
      <motion.div
        whileHover={{ scale: 1.06 }}
        transition={{ duration: 0.2 }}
        className="rounded-2xl cursor-pointer select-none"
        style={{
          background: isHovered ? node.bg : node.isHub ? 'rgba(0,59,115,0.97)' : 'rgba(255,255,255,0.95)',
          border: `2px solid ${isHovered ? node.color : node.isHub ? node.color : `${node.color}40`}`,
          boxShadow: isHovered
            ? `0 8px 30px ${node.color}35, 0 0 0 3px ${node.color}20`
            : node.isHub
              ? `0 4px 20px ${node.color}50`
              : '0 2px 8px rgba(0,0,0,0.08)',
          padding: '10px 12px',
        }}
      >
        {/* Badge + step */}
        <div className="flex items-center justify-between mb-1.5">
          <span
            className="text-[8px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-full"
            style={{ background: `${node.color}20`, color: node.color }}
          >
            {node.badge}
          </span>
          {node.journeyStep && (
            <span
              className="w-4 h-4 rounded-full text-[8px] font-black flex items-center justify-center text-white"
              style={{ background: node.color }}
            >
              {node.journeyStep}
            </span>
          )}
        </div>

        {/* Icon + label */}
        <div className="flex items-center gap-1.5 mb-2">
          <node.Icon size={node.isHub ? 16 : 14} color={node.isHub ? 'white' : node.color} strokeWidth={1.8} />
          <span
            className="text-[11px] font-bold leading-tight"
            style={{ color: node.isHub ? 'white' : '#003B73' }}
          >
            {node.short}
          </span>
        </div>

        {/* Mini item list */}
        <div className="flex flex-col gap-0.5">
          {node.items.slice(0, node.isHub ? 4 : 3).map(item => (
            <div
              key={item}
              className="text-[9px] flex items-center gap-1"
              style={{ color: node.isHub ? 'rgba(255,255,255,0.7)' : '#6B7E9E' }}
            >
              <div className="w-1 h-1 rounded-full shrink-0" style={{ background: node.isHub ? node.color : `${node.color}80` }} />
              {item}
            </div>
          ))}
          {node.items.length > (node.isHub ? 4 : 3) && (
            <div className="text-[8px]" style={{ color: `${node.color}80` }}>
              +{node.items.length - (node.isHub ? 4 : 3)} more…
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Main scene ───────────────────────────────────────────────────────────────

export function SceneBigPicture() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>('digital-core');
  const [journeyMode, setJourneyMode] = useState(false);
  const [journeyStep, setJourneyStep] = useState(0);

  const activeDetail = selected ? nodeMap[selected] : null;

  const handleHover = (id: string | null) => {
    setHovered(id);
    if (id) setSelected(id);
  };

  return (
    <section
      id="bigpicture"
      className="relative py-20 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #EAF4FF 0%, #F7FAFC 100%)' }}
    >
      <div className="absolute inset-0 grid-lines opacity-15 pointer-events-none" />

      <div className="max-w-screen-2xl mx-auto px-6">
        <SectionHeader
          scene={6}
          tag="Ecosystem Map - Wimmelbild"
          title="The complete OT transformation landscape."
          subtitle="Every function, system, and data flow - from production floor to autonomous outcomes. Hover any node to explore its role, tools, and connections across the transformation."
          accent="#005EB8"
        />

        {/* Controls */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
          <button
            onClick={() => setJourneyMode(!journeyMode)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all"
            style={{
              background: journeyMode ? '#005EB8' : 'white',
              color: journeyMode ? 'white' : '#6B7E9E',
              border: `2px solid ${journeyMode ? '#005EB8' : 'rgba(0,94,184,0.2)'}`,
            }}
          >
            {journeyMode ? '' : ''} Journey Mode
          </button>
          {journeyMode && journeyNodes.map((n, i) => (
            <button
              key={n.id}
              onClick={() => { setJourneyStep(i); setSelected(n.id); }}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all"
              style={{
                background: journeyStep === i ? n.color : 'white',
                color: journeyStep === i ? 'white' : n.color,
                border: `2px solid ${n.color}40`,
              }}
            >
              <n.Icon size={12} color={journeyStep === i ? 'white' : n.color} strokeWidth={1.8} />
              {n.journeyStep}. {n.short}
            </button>
          ))}
          <span className="text-xs text-[#9CA3AF] ml-2">Hover any node to explore · Click to pin</span>
        </div>

        <div className="flex gap-6 items-start">
          {/* ── MAP ───────────────────────────────────────────────────────── */}
          <div
            className="flex-1 relative rounded-3xl overflow-hidden"
            style={{
              height: 720,
              background: 'linear-gradient(135deg, #F0F6FF 0%, #E8F0FA 50%, #EEF8FF 100%)',
              border: '1px solid rgba(0,94,184,0.12)',
              boxShadow: 'inset 0 2px 40px rgba(0,59,115,0.04)',
            }}
          >
            {/* Background radial glow at center-hub */}
            <div
              className="absolute pointer-events-none"
              style={{
                left: '42%', top: '38%',
                width: 200, height: 200,
                background: 'radial-gradient(circle, rgba(0,59,115,0.08) 0%, transparent 70%)',
                transform: 'translate(-50%, -50%)',
              }}
            />

            {/* SVG overlay for connections */}
            <svg
              viewBox="0 0 1000 720"
              className="absolute inset-0 w-full h-full pointer-events-none"
            >
              <defs>
                <marker id="arrowBlue" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                  <path d="M0,0 L0,6 L6,3 Z" fill="#005EB8" opacity="0.6" />
                </marker>
                <marker id="arrowGray" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto">
                  <path d="M0,0 L0,5 L5,2.5 Z" fill="rgba(0,94,184,0.3)" />
                </marker>
              </defs>

              {/* Zone labels */}
              {[
                { x: 500, y: 22, label: '─────── Enterprise IT & Business ───────', color: '#6366F1' },
                { x: 500, y: 700, label: '──────── Sustainability & ESG ────────', color: '#34D399' },
                { x: 68, y: 360, label: 'OT Floor', color: '#F5A623', rotate: -90 },
                { x: 935, y: 360, label: 'Business Value', color: '#12B3A8', rotate: 90 },
              ].map(z => (
                <text
                  key={z.label}
                  x={z.x} y={z.y}
                  textAnchor="middle"
                  fontSize="8"
                  fill={z.color}
                  opacity={0.5}
                  fontWeight="700"
                  letterSpacing="1"
                  transform={z.rotate ? `rotate(${z.rotate} ${z.x} ${z.y})` : undefined}
                >
                  {z.label}
                </text>
              ))}

              {/* Journey spine highlight */}
              {journeyMode && (
                <path
                  d={`M ${sx(7)} ${sy(50)} L ${sx(93)} ${sy(50)}`}
                  fill="none"
                  stroke="#005EB820"
                  strokeWidth="70"
                  strokeLinecap="round"
                />
              )}

              {/* All connection paths */}
              {connections.map((conn, i) => (
                <FlowPath key={i} conn={conn} hovered={hovered} journeyMode={journeyMode} />
              ))}
            </svg>

            {/* Cluster node cards */}
            {nodes.map(node => (
              <NodeCard
                key={node.id}
                node={node}
                hovered={hovered}
                onHover={handleHover}
                journeyMode={journeyMode && journeyStep < (node.journeyStep ?? 99)}
              />
            ))}

            {/* Legend */}
            <div className="absolute bottom-3 left-3 flex items-center gap-4 glass rounded-xl px-3 py-2">
              <div className="flex items-center gap-1.5">
                <svg width="28" height="8"><line x1="0" y1="4" x2="28" y2="4" stroke="#005EB8" strokeWidth="2.5" strokeDasharray="8 5" /></svg>
                <span className="text-[9px] font-bold text-[#005EB8]">Transformation Journey</span>
              </div>
              <div className="flex items-center gap-1.5">
                <svg width="28" height="8"><line x1="0" y1="4" x2="28" y2="4" stroke="rgba(0,94,184,0.35)" strokeWidth="1.5" strokeDasharray="5 6" /></svg>
                <span className="text-[9px] text-[#9CA3AF]">Support Flow</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#005EB8] animate-pulse" />
                <span className="text-[9px] text-[#9CA3AF]">Live data flow</span>
              </div>
            </div>
          </div>

          {/* ── DETAIL PANEL ──────────────────────────────────────────────── */}
          <div className="w-72 shrink-0">
            <AnimatePresence mode="wait">
              {activeDetail ? (
                <motion.div
                  key={activeDetail.id}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 16 }}
                  transition={{ duration: 0.25 }}
                  className="glass rounded-3xl overflow-hidden"
                  style={{ border: `2px solid ${activeDetail.color}30` }}
                >
                  {/* Header */}
                  <div
                    className="px-5 pt-5 pb-4"
                    style={{ background: `${activeDetail.color}08`, borderBottom: `1px solid ${activeDetail.color}15` }}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{ background: `${activeDetail.color}15` }}
                      >
                        <activeDetail.Icon size={20} color={activeDetail.color} strokeWidth={1.8} />
                      </div>
                      <div>
                        <div
                          className="text-[9px] font-black uppercase tracking-widest"
                          style={{ color: activeDetail.color }}
                        >
                          {activeDetail.badge}
                          {activeDetail.journeyStep ? ` · Step ${activeDetail.journeyStep}` : ''}
                        </div>
                        <div className="text-sm font-bold text-[#003B73] leading-tight">{activeDetail.label}</div>
                      </div>
                    </div>
                    <p className="text-[11px] text-[#4A6B8A] leading-relaxed">{activeDetail.desc}</p>
                  </div>

                  <div className="px-5 py-4 space-y-4">
                    {/* Capabilities */}
                    <div>
                      <div className="text-[9px] font-black uppercase tracking-widest text-[#9CA3AF] mb-2">Capabilities</div>
                      <div className="flex flex-col gap-1">
                        {activeDetail.items.map(item => (
                          <div key={item} className="flex items-center gap-2 text-[11px] text-[#4A6B8A]">
                            <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: activeDetail.color }} />
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Tools */}
                    <div>
                      <div className="text-[9px] font-black uppercase tracking-widest text-[#9CA3AF] mb-2">Tools & Systems</div>
                      <div className="flex flex-wrap gap-1.5">
                        {activeDetail.tools.map(t => (
                          <span
                            key={t}
                            className="text-[10px] px-2 py-0.5 rounded-full font-medium"
                            style={{ background: `${activeDetail.color}12`, color: activeDetail.color, border: `1px solid ${activeDetail.color}25` }}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Data flows */}
                    <div className="rounded-xl overflow-hidden" style={{ border: `1px solid ${activeDetail.color}15` }}>
                      <div
                        className="px-3 py-2 text-[9px] font-black uppercase tracking-widest"
                        style={{ background: `${activeDetail.color}08`, color: activeDetail.color }}
                      >
                        Data flows
                      </div>
                      <div className="px-3 py-2 space-y-2">
                        <div>
                          <div className="text-[8px] font-bold text-[#9CA3AF] uppercase mb-0.5">In ↓</div>
                          <div className="text-[10px] text-[#4A6B8A]">{activeDetail.dataIn}</div>
                        </div>
                        <div className="h-px bg-[rgba(0,94,184,0.08)]" />
                        <div>
                          <div className="text-[8px] font-bold text-[#9CA3AF] uppercase mb-0.5">Out ↑</div>
                          <div className="text-[10px] text-[#4A6B8A]">{activeDetail.dataOut}</div>
                        </div>
                      </div>
                    </div>

                    {/* Connected to */}
                    <div>
                      <div className="text-[9px] font-black uppercase tracking-widest text-[#9CA3AF] mb-2">Connected to</div>
                      <div className="flex flex-wrap gap-1.5">
                        {connections
                          .filter(c => c.from === activeDetail.id || c.to === activeDetail.id)
                          .map(c => {
                            const otherId = c.from === activeDetail.id ? c.to : c.from;
                            const other = nodeMap[otherId];
                            return other ? (
                              <button
                                key={otherId}
                                onClick={() => setSelected(otherId)}
                                className="flex items-center gap-1 text-[10px] px-2 py-1 rounded-lg font-medium transition-all hover:scale-105"
                                style={{ background: `${other.color}10`, color: other.color, border: `1px solid ${other.color}20` }}
                              >
                                <other.Icon size={10} color={other.color} strokeWidth={1.8} className="inline mr-1" />
                                {other.short}
                              </button>
                            ) : null;
                          })}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="glass rounded-3xl p-6 text-center"
                >
                  <div className="text-3xl mb-3"></div>
                  <div className="text-sm font-semibold text-[#003B73]">Hover any node</div>
                  <div className="text-xs text-[#9CA3AF] mt-1">to explore its role and data flows</div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Journey summary strip */}
            <div className="mt-4 glass rounded-2xl p-4">
              <div className="text-[9px] font-black uppercase tracking-widest text-[#9CA3AF] mb-3">Transformation Journey</div>
              {journeyNodes.map((n, i) => (
                <motion.button
                  key={n.id}
                  onClick={() => { setSelected(n.id); setJourneyMode(true); setJourneyStep(i); }}
                  className="w-full flex items-center gap-2 py-1.5 px-2 rounded-lg text-left transition-all hover:scale-[1.01]"
                  style={{
                    background: selected === n.id ? `${n.color}12` : 'transparent',
                    border: selected === n.id ? `1px solid ${n.color}25` : '1px solid transparent',
                    marginBottom: i < journeyNodes.length - 1 ? 4 : 0,
                  }}
                >
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-black text-white shrink-0"
                    style={{ background: n.color }}
                  >
                    {n.journeyStep}
                  </div>
                  <span className="text-[10px] font-semibold text-[#003B73]">{n.short}</span>
                  <n.Icon size={10} color={n.color} strokeWidth={1.8} className="ml-auto shrink-0" />
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {([
            { Icon: Network,    value: '9',  label: 'Ecosystem Clusters', sub: 'All interconnected',         color: '#005EB8' },
            { Icon: GitMerge,  value: '11', label: 'Data Flows',          sub: 'Bidirectional intelligence', color: '#00A3E0' },
            { Icon: Map,       value: '4',  label: 'Journey Steps',       sub: 'Floor → Outcomes',           color: '#12B3A8' },
            { Icon: Zap,       value: '7',  label: 'Use Cases Enabled',   sub: 'By the full platform',       color: '#F5A623' },
          ] as const).map(s => (
            <div key={s.label} className="glass rounded-2xl p-4 text-center card-lift">
              <div className="flex justify-center mb-2">
                <s.Icon size={20} color={s.color} strokeWidth={1.8} />
              </div>
              <div className="text-2xl font-bold" style={{ color: s.color }}>{s.value}</div>
              <div className="text-xs font-semibold text-[#003B73]">{s.label}</div>
              <div className="text-[10px] text-[#9CA3AF]">{s.sub}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
