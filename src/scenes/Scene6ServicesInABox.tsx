import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHeader } from '../components/SectionHeader';
import { serviceCards } from '../content';
import type { ServiceCard } from '../types';

const categories = ['All', 'Connectivity', 'Security', 'Asset Visibility', 'Predictive Maintenance', 'AI Quality Inspection', 'Sustainability', 'Factory Copilot', 'Worker Safety Twin', 'PAM', 'Remote Access', 'Monitoring', 'Backup & Recovery', 'Patch Management', 'OT Active Directory', 'DPP', 'Carbon Optimization', 'Root Cause Intelligence'];

const maturityColors = {
  Fragmented: '#D64545',
  Visible: '#F5A623',
  Contextual: '#00A3E0',
  Intelligent: '#005EB8',
  Autonomous: '#12B3A8',
};

function ServiceDetailModal({ service, onClose }: { service: ServiceCard; onClose: () => void }) {
  const [actionState, setActionState] = useState<'idle' | 'installing' | 'done'>('idle');

  const handleAction = (_type: 'install' | 'deploy') => {
    setActionState('installing');
    setTimeout(() => {
      setActionState('done');
      setTimeout(() => { setActionState('idle'); onClose(); }, 1200);
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,59,115,0.4)', backdropFilter: 'blur(8px)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 32, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 32, scale: 0.95 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="glass rounded-3xl p-8 max-w-lg w-full shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="text-5xl">{service.icon}</div>
            <div>
              <h3 className="text-xl font-bold text-[#003B73]">{service.name}</h3>
              <span className="text-xs font-semibold px-2 py-1 rounded-full" style={{ background: 'rgba(0,94,184,0.1)', color: '#005EB8' }}>
                {service.category}
              </span>
            </div>
          </div>
          <button onClick={onClose} className="text-[#9CA3AF] hover:text-[#003B73] text-2xl leading-none">×</button>
        </div>

        <p className="text-sm text-[#4A6B8A] mb-6 leading-relaxed">{service.description}</p>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-[#EAF4FF] rounded-xl p-4">
            <div className="text-xs text-[#6B7E9E] mb-1">Edge / Cloud Split</div>
            <div className="h-2 bg-white rounded-full overflow-hidden">
              <div className="h-full rounded-full" style={{ width: `${service.edgeSplit}%`, background: '#005EB8' }} />
            </div>
            <div className="flex justify-between text-xs font-semibold mt-1">
              <span style={{ color: '#005EB8' }}>Edge {service.edgeSplit}%</span>
              <span style={{ color: '#00A3E0' }}>Cloud {service.cloudSplit}%</span>
            </div>
          </div>
          <div className="bg-[#EAF4FF] rounded-xl p-4">
            <div className="text-xs text-[#6B7E9E] mb-1">Deployment</div>
            <div className={`text-sm font-bold ${
              service.deploymentComplexity === 'Low' ? 'text-[#12B3A8]' :
              service.deploymentComplexity === 'Medium' ? 'text-[#F5A623]' : 'text-[#D64545]'
            }`}>
              {service.deploymentComplexity} Complexity
            </div>
            <div className="text-xs text-[#6B7E9E] mt-1">
              Twin: {service.twinIntegration ? '✓ Integrated' : '— Not Required'}
            </div>
          </div>
        </div>

        <div className="mb-6">
          <div className="text-xs font-bold text-[#005EB8] uppercase tracking-wide mb-2">KPI Impact</div>
          <div className="flex flex-wrap gap-2">
            {service.kpiImpact.map(kpi => (
              <span key={kpi} className="text-xs px-3 py-1 rounded-full bg-white border border-[rgba(0,94,184,0.15)] text-[#4A6B8A]">
                {kpi}
              </span>
            ))}
          </div>
        </div>

        <div className="flex gap-3">
          {actionState === 'done' ? (
            <div className="flex-1 py-3 rounded-xl text-sm font-semibold text-center text-white" style={{ background: '#12B3A8' }}>
              ✓ Deployment queued!
            </div>
          ) : actionState === 'installing' ? (
            <div className="flex-1 py-3 rounded-xl text-sm font-semibold text-center text-white" style={{ background: '#005EB8' }}>
              <span className="animate-pulse">⟳ Configuring…</span>
            </div>
          ) : (
            <>
              <button
                onClick={() => handleAction('install')}
                className="flex-1 py-3 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90 active:scale-95"
                style={{ background: 'linear-gradient(135deg, #005EB8, #00A3E0)' }}
              >
                ⚡ Install Service
              </button>
              <button
                onClick={() => handleAction('deploy')}
                className="flex-1 py-3 rounded-xl text-sm font-semibold border border-[rgba(0,94,184,0.2)] text-[#005EB8] hover:bg-[#EAF4FF] transition-all active:scale-95"
              >
                📦 Deploy Blueprint
              </button>
            </>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Scene6ServicesInABox() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedService, setSelectedService] = useState<ServiceCard | null>(null);

  const filtered = activeCategory === 'All'
    ? serviceCards
    : serviceCards.filter(s => s.category === activeCategory);

  return (
    <section id="scene6" className="relative py-32 overflow-hidden" style={{ background: 'linear-gradient(180deg, #EAF4FF 0%, #F7FAFC 100%)' }}>
      <div className="absolute inset-0 grid-lines opacity-20 pointer-events-none" />

      <div className="max-w-screen-xl mx-auto px-6">
        <SectionHeader
          scene={6}
          tag="OT Services in a Box"
          title="Industrial capabilities marketplace."
          subtitle="Modular, composable OT services that accelerate every transformation use case. Install. Subscribe. Deploy. Each service knows its architecture footprint, KPI contribution, and twin integration."
          accent="#F5A623"
        />

        {/* Stats bar */}
        <div className="flex flex-wrap justify-center gap-6 mb-12">
          {[
            { label: 'Available Services', value: serviceCards.length, color: '#005EB8' },
            { label: 'With Twin Integration', value: serviceCards.filter(s => s.twinIntegration).length, color: '#12B3A8' },
            { label: 'Edge-First', value: serviceCards.filter(s => s.edgeSplit >= 50).length, color: '#00A3E0' },
            { label: 'Autonomous-Ready', value: serviceCards.filter(s => s.maturityRequired === 'Autonomous').length, color: '#F5A623' },
          ].map(stat => (
            <div key={stat.label} className="glass rounded-2xl px-6 py-4 text-center">
              <div className="text-2xl font-bold" style={{ color: stat.color }}>{stat.value}</div>
              <div className="text-xs text-[#6B7E9E] mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {categories.slice(0, 10).map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="text-xs font-medium px-3 py-1.5 rounded-lg border transition-all"
              style={{
                background: activeCategory === cat ? '#005EB8' : 'white',
                borderColor: activeCategory === cat ? '#005EB8' : 'rgba(0,94,184,0.15)',
                color: activeCategory === cat ? 'white' : '#4A6B8A',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Service grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
        >
          <AnimatePresence>
            {filtered.map((service, i) => (
              <motion.div
                key={service.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
              >
                <button
                  onClick={() => setSelectedService(service)}
                  className="w-full h-full glass rounded-2xl p-5 text-left card-lift flex flex-col"
                >
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-4xl">{service.icon}</span>
                    <span
                      className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                      style={{
                        background: `${maturityColors[service.maturityRequired]}18`,
                        color: maturityColors[service.maturityRequired],
                      }}
                    >
                      {service.maturityRequired}
                    </span>
                  </div>
                  <div className="font-semibold text-[#003B73] text-sm mb-1">{service.name}</div>
                  <div className="text-xs text-[#6B7E9E] mb-3 flex-1 line-clamp-2">{service.description}</div>

                  {/* Edge/cloud bar */}
                  <div className="mt-auto">
                    <div className="h-1.5 bg-[rgba(0,59,115,0.08)] rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${service.edgeSplit}%`, background: '#005EB8' }} />
                    </div>
                    <div className="flex justify-between text-[10px] font-medium mt-1">
                      <span style={{ color: '#005EB8' }}>Edge {service.edgeSplit}%</span>
                      <span style={{ color: '#00A3E0' }}>Cloud {service.cloudSplit}%</span>
                    </div>
                  </div>

                  {service.twinIntegration && (
                    <div className="flex items-center gap-1 mt-2">
                      <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#12B3A8' }} />
                      <span className="text-[10px] font-medium text-[#12B3A8]">Twin Integrated</span>
                    </div>
                  )}
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedService && (
          <ServiceDetailModal service={selectedService} onClose={() => setSelectedService(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
