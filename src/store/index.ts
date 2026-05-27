import { create } from 'zustand';
import type { AppStore } from '../types';

export const useAppStore = create<AppStore>((set) => ({
  stakeholder: 'CIO',
  techDepth: 'Executive',
  maturityFilter: 'Fragmented',
  governanceMode: false,
  simulationMode: false,
  roiMode: false,
  activeScene: 0,
  visibilityProgress: 0,
  setStakeholder: (stakeholder) => set({ stakeholder }),
  setTechDepth: (techDepth) => set({ techDepth }),
  setMaturityFilter: (maturityFilter) => set({ maturityFilter }),
  toggleGovernance: () => set((s) => ({ governanceMode: !s.governanceMode })),
  toggleSimulation: () => set((s) => ({ simulationMode: !s.simulationMode })),
  toggleROI: () => set((s) => ({ roiMode: !s.roiMode })),
  setActiveScene: (activeScene) => set({ activeScene }),
  setVisibilityProgress: (visibilityProgress) => set({ visibilityProgress }),
}));
