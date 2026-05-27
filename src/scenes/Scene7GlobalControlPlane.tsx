import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHeader } from '../components/SectionHeader';
import { plantSites, globalKPIs } from '../content';
import { useAppStore } from '../store';
import type { PlantSite } from '../types';

const maturityConfig = {
  Fragmented: { color: '#D64545', label: 'Fragmented', order: 1 },
  Visible: { color: '#F5A623', label: 'Visible', order: 2 },
  Contextual: { color: '#00A3E0', label: 'Contextual', order: 3 },
  Intelligent: { color: '#005EB8', label: 'Intelligent', order: 4 },
  Autonomous: { color: '#12B3A8', label: 'Autonomous', order: 5 },
};

function PlantMarker({ plant, selected, onClick }: { plant: PlantSite; selected: boolean; onClick: () => void }) {
  const cfg = maturityConfig[plant.maturity];
  // Map lat/lng to % position on our simplified world map
  const x = ((plant.lng + 180) / 360) * 100;
  const y = ((90 - plant.lat) / 180) * 100;

  return (
    <motion.button
      className="absolute"
      style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)' }}
      onClick={onClick}
      whileHover={{ scale: 1.3 }}
    >
      {selected && (
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{ background: `${cfg.color}30` }}
          animate={{ scale: [1, 2.2], opacity: [0.7, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      )}
      <div
        className="w-3 h-3 rounded-full border-2 border-white"
        style={{
          background: cfg.color,
          boxShadow: selected ? `0 0 16px ${cfg.color}80` : `0 2px 4px ${cfg.color}60`,
        }}
      />
    </motion.button>
  );
}

const policyItems = [
  { label: 'IEC 62443 Compliance', status: 'enforced', coverage: 94 },
  { label: 'Network Segmentation', status: 'enforced', coverage: 99 },
  { label: 'Zero Trust OT Access', status: 'partial', coverage: 71 },
  { label: 'Firmware Standards', status: 'partial', coverage: 68 },
  { label: 'Backup & Recovery', status: 'enforced', coverage: 96 },
  { label: 'Patch Compliance', status: 'at-risk', coverage: 54 },
];

export function Scene7GlobalControlPlane() {
  const [selectedPlant, setSelectedPlant] = useState<PlantSite | null>(null);
  const { governanceMode, roiMode } = useAppStore();

  return (
    <section id="scene7" className="relative py-32 overflow-hidden" style={{ background: '#F7FAFC' }}>
      <div className="absolute inset-0 grid-lines opacity-30 pointer-events-none" />

      <div className="max-w-screen-xl mx-auto px-6">
        <SectionHeader
          scene={7}
          tag="Global Industrial Control Plane"
          title="Enterprise-scale governance. One platform."
          subtitle="Every plant. Every deployment. Every policy. Governed from a single operational control plane that sees across your entire industrial estate in real time."
          accent="#003B73"
        />

        {/* Governance mode banner */}
        <AnimatePresence>
          {governanceMode && (
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="mb-8 rounded-2xl p-4 flex items-center gap-4"
              style={{ background: 'rgba(0,94,184,0.06)', border: '2px solid rgba(0,94,184,0.2)' }}
            >
              <span className="text-2xl">🏛</span>
              <div>
                <div className="text-sm font-bold text-[#005EB8]">Governance Enforcement View</div>
                <div className="text-xs text-[#4A6B8A] mt-0.5">Policy status, compliance drift and remediation priorities are highlighted. Red = immediate action required.</div>
              </div>
              <div className="ml-auto flex gap-3 text-center">
                <div><div className="text-lg font-bold text-[#12B3A8]">4</div><div className="text-[10px] text-[#6B7E9E]">Enforced</div></div>
                <div><div className="text-lg font-bold text-[#F5A623]">2</div><div className="text-[10px] text-[#6B7E9E]">Partial</div></div>
                <div><div className="text-lg font-bold text-[#D64545]">1</div><div className="text-[10px] text-[#6B7E9E]">At Risk</div></div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Global KPIs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { label: 'Total Assets', value: globalKPIs.totalAssets.toLocaleString(), icon: '⚙', color: '#005EB8', roi: '$18.4M value under management' },
            { label: 'Managed Assets', value: `${globalKPIs.visibilityScore}%`, icon: '✓', color: '#12B3A8', roi: '$2.1M/yr saved vs unmanaged baseline' },
            { label: 'Active Twins', value: globalKPIs.activeTwins, icon: '🧬', color: '#00A3E0', roi: '34% faster root cause identification' },
            { label: 'Active Incidents', value: globalKPIs.activeIncidents, icon: '⚠', color: '#F5A623', roi: '$420K avg incident cost exposure' },
          ].map((kpi) => (
            <motion.div
              key={kpi.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass rounded-2xl p-5 card-lift"
            >
              <div className="text-2xl mb-2">{kpi.icon}</div>
              <div className="text-2xl font-bold mb-1" style={{ color: kpi.color }}>{kpi.value}</div>
              <div className="text-xs text-[#6B7E9E]">{kpi.label}</div>
              <AnimatePresence>
                {roiMode && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-2 text-[10px] font-medium overflow-hidden"
                    style={{ color: '#12B3A8' }}
                  >
                    💰 {kpi.roi}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* World map */}
          <div className="lg:col-span-2">
            <h3 className="text-lg font-semibold text-[#003B73] mb-4">Global Plant Network</h3>
            <div
              className="relative rounded-2xl overflow-hidden"
              style={{ height: 380, background: 'linear-gradient(135deg, #EAF4FF 0%, #E0F0FF 100%)', border: '1px solid rgba(0,94,184,0.1)' }}
            >
              {/* Accurate simplified world map — equirectangular 1000×500 */}
              {/* x=(lng+180)/360*1000  y=(90-lat)/180*500 */}
              <svg viewBox="0 0 1000 500" className="absolute inset-0 w-full h-full" style={{ opacity: 0.18 }}>
                {/* North America */}
                <path fill="#005EB8" d="M 47,53 L 33,67 L 50,92 L 100,103 L 156,114 L 167,153 L 192,181 L 250,208 L 263,197 L 280,181 L 292,153 L 308,131 L 325,125 L 353,119 L 342,103 L 322,86 L 281,75 L 239,89 L 183,83 L 156,83 L 119,58 Z"/>
                {/* Greenland */}
                <path fill="#005EB8" d="M 342,67 L 369,53 L 428,44 L 461,25 L 453,44 L 431,56 L 408,72 L 381,83 L 356,78 Z"/>
                {/* South America */}
                <path fill="#005EB8" d="M 230,208 L 286,205 L 333,222 L 360,242 L 369,253 L 403,272 L 394,300 L 381,317 L 358,336 L 342,344 L 322,369 L 308,392 L 297,406 L 281,414 L 267,397 L 264,369 L 275,342 L 272,308 L 258,283 L 253,256 L 242,236 L 230,222 Z"/>
                {/* Europe */}
                <path fill="#005EB8" d="M 475,150 L 472,133 L 475,128 L 483,111 L 483,100 L 486,89 L 492,86 L 500,80 L 514,75 L 531,67 L 553,61 L 569,53 L 583,58 L 578,69 L 567,83 L 567,89 L 558,97 L 561,111 L 567,119 L 578,125 L 578,133 L 567,144 L 553,150 L 542,144 L 533,150 L 519,150 L 511,139 L 506,133 L 494,136 L 483,131 L 475,136 Z"/>
                {/* Africa */}
                <path fill="#005EB8" d="M 483,150 L 464,172 L 453,197 L 450,208 L 461,222 L 472,236 L 483,236 L 508,233 L 522,239 L 525,250 L 525,256 L 531,267 L 531,283 L 528,300 L 531,317 L 547,344 L 553,347 L 567,344 L 578,336 L 589,319 L 594,300 L 608,272 L 617,256 L 625,244 L 628,236 L 639,219 L 628,214 L 619,217 L 611,208 L 603,189 L 597,175 L 589,167 L 572,161 L 558,158 L 539,158 L 528,147 L 511,144 Z"/>
                {/* Asia (mainland + Arabian peninsula + Indian subcontinent + SE Asia) */}
                <path fill="#005EB8" d="M 578,133 L 592,122 L 606,108 L 614,97 L 628,108 L 644,97 L 656,89 L 667,72 L 681,64 L 706,53 L 722,47 L 756,42 L 800,36 L 856,44 L 889,50 L 928,42 L 958,47 L 972,56 L 961,72 L 950,83 L 928,89 L 917,97 L 919,108 L 936,114 L 953,108 L 950,119 L 939,125 L 908,131 L 883,153 L 872,156 L 861,156 L 847,161 L 836,164 L 825,175 L 814,181 L 806,194 L 797,208 L 800,222 L 794,233 L 783,244 L 775,247 L 764,244 L 753,233 L 756,222 L 756,208 L 756,194 L 742,197 L 728,222 L 717,228 L 706,225 L 700,211 L 694,200 L 686,186 L 678,183 L 667,189 L 661,192 L 653,183 L 647,189 L 639,208 L 625,217 L 625,208 L 619,217 L 617,208 L 614,194 L 608,183 L 600,167 L 597,150 L 592,147 L 578,147 Z"/>
                {/* Australia */}
                <path fill="#005EB8" d="M 719,308 L 736,300 L 753,297 L 783,297 L 808,300 L 836,311 L 856,317 L 869,322 L 872,333 L 869,347 L 864,358 L 856,375 L 847,392 L 836,403 L 822,414 L 806,417 L 786,417 L 764,411 L 750,403 L 736,389 L 722,375 L 711,361 L 706,344 L 706,328 Z"/>
                {/* New Zealand */}
                <path fill="#005EB8" d="M 925,394 L 931,381 L 939,381 L 942,394 L 936,406 L 928,406 Z"/>
                {/* Japan */}
                <path fill="#005EB8" d="M 878,136 L 883,128 L 889,128 L 894,136 L 892,147 L 886,150 L 881,144 Z"/>
                {/* UK */}
                <path fill="#005EB8" d="M 481,100 L 484,92 L 489,89 L 492,94 L 489,103 L 484,106 Z"/>
              </svg>

              {/* Grid lines on map */}
              <svg className="absolute inset-0 w-full h-full opacity-10">
                {[20, 40, 60, 80].map(y => (
                  <line key={y} x1="0" y1={`${y}%`} x2="100%" y2={`${y}%`} stroke="#005EB8" strokeWidth="0.5" />
                ))}
                {[20, 40, 60, 80].map(x => (
                  <line key={x} x1={`${x}%`} y1="0" x2={`${x}%`} y2="100%" stroke="#005EB8" strokeWidth="0.5" />
                ))}
              </svg>

              {/* Plant markers */}
              {plantSites.map(plant => (
                <PlantMarker
                  key={plant.id}
                  plant={plant}
                  selected={selectedPlant?.id === plant.id}
                  onClick={() => setSelectedPlant(selectedPlant?.id === plant.id ? null : plant)}
                />
              ))}

              {/* Plant detail tooltip */}
              <AnimatePresence>
                {selectedPlant && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="absolute top-3 right-3 glass rounded-xl p-4 min-w-[200px] z-10"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <div
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ background: maturityConfig[selectedPlant.maturity].color }}
                      />
                      <span className="font-semibold text-sm text-[#003B73]">{selectedPlant.name}</span>
                    </div>
                    <div className="space-y-1.5">
                      {[
                        { label: 'Location', value: `${selectedPlant.location}, ${selectedPlant.country}` },
                        { label: 'Assets', value: selectedPlant.assets.toLocaleString() },
                        { label: 'Active Twins', value: selectedPlant.activeTwins },
                        { label: 'Compliance', value: `${selectedPlant.compliance}%` },
                        { label: 'Incidents', value: selectedPlant.incidents, alert: selectedPlant.incidents > 5 },
                      ].map(item => (
                        <div key={item.label} className="flex items-center justify-between gap-4">
                          <span className="text-xs text-[#6B7E9E]">{item.label}</span>
                          <span
                            className="text-xs font-semibold"
                            style={{ color: 'alert' in item && item.alert ? '#D64545' : '#003B73' }}
                          >
                            {item.value}
                          </span>
                        </div>
                      ))}
                      <div className="pt-1">
                        <span
                          className="text-xs font-bold px-2 py-0.5 rounded-full"
                          style={{
                            background: `${maturityConfig[selectedPlant.maturity].color}18`,
                            color: maturityConfig[selectedPlant.maturity].color,
                          }}
                        >
                          {selectedPlant.maturity}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="absolute bottom-3 left-3 text-[11px] text-[#9AAFBE]">Click any plant for details</div>
            </div>

            {/* Maturity legend */}
            <div className="flex flex-wrap gap-3 mt-4">
              {Object.entries(maturityConfig).map(([key, cfg]) => (
                <div key={key} className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: cfg.color }} />
                  <span className="text-xs text-[#6B7E9E]">{cfg.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Policy & governance */}
          <div>
            <h3 className="text-lg font-semibold text-[#003B73] mb-4">Industrial Policy Compliance</h3>
            <div className="glass rounded-2xl p-5 mb-5">
              <div className="space-y-4">
                {policyItems.map((policy, i) => (
                  <motion.div
                    key={policy.label}
                    initial={{ opacity: 0, x: 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className={governanceMode && policy.status === 'at-risk' ? 'rounded-xl ring-2 ring-[#D64545] ring-offset-2' : ''}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-semibold text-[#003B73]">{policy.label}</span>
                      <span
                        className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                        style={{
                          background: policy.status === 'enforced' ? 'rgba(18,179,168,0.12)' : policy.status === 'partial' ? 'rgba(245,166,35,0.12)' : 'rgba(214,69,69,0.12)',
                          color: policy.status === 'enforced' ? '#12B3A8' : policy.status === 'partial' ? '#F5A623' : '#D64545',
                        }}
                      >
                        {policy.status}
                      </span>
                    </div>
                    <div className="h-1.5 bg-[rgba(0,59,115,0.08)] rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{
                          background: policy.status === 'enforced' ? '#12B3A8' : policy.status === 'partial' ? '#F5A623' : '#D64545',
                        }}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${policy.coverage}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, delay: i * 0.1 }}
                      />
                    </div>
                    <div className="text-right text-[10px] font-semibold mt-0.5" style={{
                      color: policy.status === 'enforced' ? '#12B3A8' : policy.status === 'partial' ? '#F5A623' : '#D64545',
                    }}>
                      {policy.coverage}%
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <h3 className="text-sm font-bold text-[#003B73] mb-3">Governance Capabilities</h3>
            <div className="space-y-2">
              {[
                { label: 'StackSets — Multi-site deployment', icon: '📦' },
                { label: 'Service Catalog — Approved services', icon: '📚' },
                { label: 'Fleet Operations — Centralized ops', icon: '🌐' },
                { label: 'Zero Trust OT — Identity-first', icon: '🔐' },
                { label: 'Policy Drift Detection', icon: '📏' },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-3 p-3 rounded-xl glass"
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="text-xs font-medium text-[#4A6B8A]">{item.label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
