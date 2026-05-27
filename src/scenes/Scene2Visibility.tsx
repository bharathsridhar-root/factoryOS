import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHeader } from '../components/SectionHeader';
import { SceneLens } from '../components/SceneLens';
import { visibilityCapabilities } from '../content';
import { useAppStore } from '../store';

const kpiTargets = [
  { label: 'Asset Coverage', value: 0, target: 98, unit: '%', color: '#005EB8' },
  { label: 'Firmware Compliance', value: 0, target: 91, unit: '%', color: '#00A3E0' },
  { label: 'Protocol Coverage', value: 0, target: 150, unit: 'protocols', color: '#12B3A8' },
  { label: 'Visibility Score', value: 0, target: 94, unit: '/100', color: '#003B73' },
  { label: 'Unmanaged Devices', value: 847, target: 12, unit: '', color: '#F5A623' },
  { label: 'Mean Time to Identify', value: 0, target: 4, unit: 'min', color: '#D64545' },
];

function AnimatedCounter({ target, duration = 1500 }: { target: number; duration?: number }) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !inView.current) {
        inView.current = true;
        const start = Date.now();
        const tick = () => {
          const elapsed = Date.now() - start;
          const progress = Math.min(elapsed / duration, 1);
          const ease = 1 - Math.pow(1 - progress, 3);
          setValue(Math.round(ease * target));
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.4 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return <span ref={ref}>{value.toLocaleString()}</span>;
}

// Purdue Model top-to-bottom: L4 Enterprise → L0 Field (standard diagram orientation)
const purdueZones = [
  { level: 'Level 4', label: 'Enterprise',     items: ['ERP', 'PLM', 'Maintenance', 'Supply Chain'],           color: '#003B73', coverage: 100, note: 'Cloud & business systems' },
  { level: 'Level 3', label: 'Operations',     items: ['MES', 'Historians', 'APC', 'Batch Management'],        color: '#005EB8', coverage: 99,  note: 'Production management' },
  { level: 'DMZ',     label: 'Industrial DMZ', items: ['Data Diodes', 'Firewalls', 'Jump Servers', 'Proxies'], color: '#12B3A8', coverage: 100, note: 'IT/OT separation layer' },
  { level: 'Level 2', label: 'Supervisory',    items: ['SCADA', 'HMIs', 'DCS', 'Engineering Stations'],        color: '#00A3E0', coverage: 97,  note: 'Process visualization' },
  { level: 'Level 1', label: 'Control',        items: ['PLCs', 'RTUs', 'Safety Systems', 'Motion Control'],    color: '#F5A623', coverage: 94,  note: 'Real-time control' },
  { level: 'Level 0', label: 'Field Devices',  items: ['Sensors', 'Actuators', 'Motors', 'Drives'],            color: '#D64545', coverage: 89,  note: 'Physical process interface' },
];

const roiByZone: Record<string, { saving: string; detail: string }> = {
  'Level 4': { saving: '$1.2M/yr',  detail: 'ERP sync reduces reconciliation labour' },
  'Level 3': { saving: '$3.8M/yr',  detail: 'MES visibility cuts unplanned downtime 23%' },
  'DMZ':     { saving: '$0.9M/yr',  detail: 'DMZ automation reduces security ops overhead' },
  'Level 2': { saving: '$2.1M/yr',  detail: 'SCADA coverage eliminates blind-spot incidents' },
  'Level 1': { saving: '$4.4M/yr',  detail: 'Real-time PLC visibility cuts MTTR by 67%' },
  'Level 0': { saving: '$1.7M/yr',  detail: 'Sensor coverage prevents 12 failures/yr avg' },
};

const engineeringProtocols: Record<string, string[]> = {
  'Level 4': ['REST/JSON', 'OPC-UA', 'ISA-95'],
  'Level 3': ['OPC-UA', 'SQL', 'MQTT', 'SOAP'],
  'DMZ':     ['TLS 1.3', 'IPSec', 'Syslog-ng'],
  'Level 2': ['Modbus TCP', 'DNP3', 'OPC-DA', 'Profibus'],
  'Level 1': ['EtherNet/IP', 'Profinet', 'DeviceNet', 'HART'],
  'Level 0': ['4-20mA', 'WirelessHART', 'IO-Link', 'Foundation Fieldbus'],
};

export function Scene2Visibility() {
  const [activeCapability, setActiveCapability] = useState(0);
  const { roiMode, techDepth } = useAppStore();

  return (
    <section id="scene2" className="relative py-32 overflow-hidden" style={{ background: 'linear-gradient(180deg, #F7FAFC 0%, #EAF4FF 100%)' }}>
      <div className="absolute inset-0 grid-lines opacity-30 pointer-events-none" />

      <div className="max-w-screen-xl mx-auto px-6">
        <SectionHeader
          scene={2}
          tag="OT Visibility Foundation"
          title="The factory gradually illuminates."
          subtitle="OT visibility is not an IT project. It is the prerequisite for every digital transformation initiative — the operational foundation that makes everything else possible."
          accent="#005EB8"
        />

        <SceneLens sceneId={2} />

        {/* KPI counters */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-16">
          {kpiTargets.map((kpi, i) => (
            <motion.div
              key={kpi.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-2xl p-4 text-center card-lift"
            >
              <div
                className="text-2xl font-bold mb-1"
                style={{ color: kpi.color }}
              >
                <AnimatedCounter target={kpi.target} />
                <span className="text-sm ml-0.5">{kpi.unit}</span>
              </div>
              <div className="text-[11px] text-[#6B7E9E] font-medium leading-tight">{kpi.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Purdue architecture */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-[#003B73]">Purdue Architecture Coverage</h3>
              <span className="text-xs text-[#9CA3AF] flex items-center gap-1">
                <span>Enterprise</span><span>↓</span><span>Field</span>
              </span>
            </div>
            <div className="space-y-3">
              {purdueZones.map((zone, i) => (
                <motion.div
                  key={zone.level}
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glass rounded-xl overflow-hidden"
                >
                  <div className="flex items-center gap-4 p-4">
                    <div
                      className="w-1 h-12 rounded-full shrink-0"
                      style={{ background: zone.color }}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold px-1.5 py-0.5 rounded" style={{ background: `${zone.color}15`, color: zone.color }}>{zone.level}</span>
                          <span className="text-sm font-semibold text-[#003B73]">{zone.label}</span>
                        </div>
                        <span className="text-sm font-bold" style={{ color: zone.color }}>{zone.coverage}%</span>
                      </div>
                      {'note' in zone && (
                        <p className="text-[10px] text-[#9CA3AF] mb-1.5">{(zone as typeof zone & { note: string }).note}</p>
                      )}
                      <div className="flex flex-wrap gap-1.5 mb-2">
                        {(techDepth === 'Engineering' ? (engineeringProtocols[zone.level] ?? zone.items) : zone.items).map(item => (
                          <span key={item} className="text-[11px] px-2 py-0.5 rounded-full bg-white text-[#6B7E9E] border border-[rgba(0,94,184,0.1)]">
                            {item}
                          </span>
                        ))}
                      </div>
                      <AnimatePresence>
                        {roiMode && roiByZone[zone.level] && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="flex items-center gap-2 mt-1 overflow-hidden"
                          >
                            <span className="text-xs font-bold" style={{ color: '#12B3A8' }}>
                              💰 {roiByZone[zone.level].saving}
                            </span>
                            <span className="text-[10px] text-[#6B7E9E]">{roiByZone[zone.level].detail}</span>
                          </motion.div>
                        )}
                      </AnimatePresence>
                      <div className="h-1.5 bg-[rgba(0,59,115,0.08)] rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ background: zone.color }}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${zone.coverage}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.2, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* IEC 62443 compliance badge */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mt-6 p-4 rounded-2xl flex items-center gap-4"
              style={{ background: 'rgba(18,179,168,0.08)', border: '1px solid rgba(18,179,168,0.2)' }}
            >
              <div className="text-3xl">🏛</div>
              <div>
                <div className="text-sm font-semibold text-[#12B3A8]">IEC 62443 Zone Compliance</div>
                <div className="text-xs text-[#4A6B8A] mt-1">All zones mapped and enforced. DMZ architecture active. IT/OT convergence secured.</div>
              </div>
              <div className="ml-auto text-xl font-bold text-[#12B3A8]">99%</div>
            </motion.div>
          </div>

          {/* Capabilities panel */}
          <div>
            <h3 className="text-lg font-semibold text-[#003B73] mb-6">Visibility Capabilities</h3>
            <div className="space-y-2">
              {visibilityCapabilities.map((cap, i) => (
                <motion.button
                  key={cap.id}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  onClick={() => setActiveCapability(i)}
                  className={`w-full text-left glass rounded-xl p-4 transition-all card-lift ${
                    activeCapability === i ? 'ring-2 ring-[#005EB8]' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{cap.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-[#003B73]">{cap.label}</div>
                      {activeCapability === i && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="overflow-hidden"
                        >
                          <div className="text-xs text-[#6B7E9E] mt-1">{cap.desc}</div>
                          <div
                            className="text-xs font-semibold mt-2 px-2 py-1 rounded-lg inline-block"
                            style={{ background: 'rgba(0,94,184,0.08)', color: '#005EB8' }}
                          >
                            {cap.kpi}
                          </div>
                        </motion.div>
                      )}
                    </div>
                    <svg
                      className={`w-4 h-4 text-[#9CA3AF] transition-transform ${activeCapability === i ? 'rotate-90' : ''}`}
                      fill="none" viewBox="0 0 24 24" stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Visibility quote */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mt-6 p-5 rounded-2xl"
              style={{ background: 'rgba(0,94,184,0.06)', border: '1px solid rgba(0,94,184,0.15)' }}
            >
              <div className="text-3xl mb-3 font-bold text-[#005EB8] opacity-30">"</div>
              <p className="text-sm text-[#003B73] font-medium leading-relaxed">
                OT visibility is not optional infrastructure. It is the operational truth layer upon which all intelligence, governance, and automation must be built.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
