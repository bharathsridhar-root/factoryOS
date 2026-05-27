export type Stakeholder =
  | 'CIO' | 'CTO' | 'PlantManager' | 'ManufacturingIT'
  | 'OTArchitect' | 'CISO' | 'ReliabilityEngineer'
  | 'SustainabilityOfficer' | 'OperationsLead' | 'PlatformEngineeringLead';

export type TechDepth = 'Executive' | 'Architecture' | 'Engineering';

export type OTMaturity = 'Fragmented' | 'Visible' | 'Contextual' | 'Intelligent' | 'Autonomous';

export interface KPI {
  label: string;
  value: string;
  unit?: string;
  trend?: 'up' | 'down' | 'neutral';
  delta?: string;
}

export interface ServiceCard {
  id: string;
  name: string;
  category: string;
  description: string;
  icon: string;
  kpiImpact: string[];
  maturityRequired: OTMaturity;
  deploymentComplexity: 'Low' | 'Medium' | 'High';
  edgeSplit: number;
  cloudSplit: number;
  twinIntegration: boolean;
}

export interface UseCase {
  id: string;
  title: string;
  description: string;
  inputs: string[];
  edgeProcessing: string[];
  cloudAnalytics: string[];
  decisionLogic: string[];
  outcomes: string[];
  roi: string;
  complexity: 'Low' | 'Medium' | 'High';
  maturityRequired: OTMaturity;
  industries: string[];
}

export interface OTNode {
  id: string;
  label: string;
  type: 'PLC' | 'HMI' | 'Sensor' | 'Network' | 'Server' | 'Cloud' | 'Worker' | 'Asset';
  status: 'online' | 'warning' | 'critical' | 'offline' | 'unknown';
  zone: 'Level0' | 'Level1' | 'Level2' | 'Level3' | 'Level4' | 'DMZ';
  x: number;
  y: number;
  vendor?: string;
  protocol?: string;
  firmware?: string;
  lastSeen?: string;
  vulnerabilities?: number;
}

export interface PlantSite {
  id: string;
  name: string;
  location: string;
  country: string;
  lat: number;
  lng: number;
  maturity: OTMaturity;
  assets: number;
  incidents: number;
  compliance: number;
  activeTwins: number;
}

export interface AppStore {
  stakeholder: Stakeholder;
  techDepth: TechDepth;
  maturityFilter: OTMaturity;
  governanceMode: boolean;
  simulationMode: boolean;
  roiMode: boolean;
  activeScene: number;
  visibilityProgress: number;
  setStakeholder: (s: Stakeholder) => void;
  setTechDepth: (d: TechDepth) => void;
  setMaturityFilter: (m: OTMaturity) => void;
  toggleGovernance: () => void;
  toggleSimulation: () => void;
  toggleROI: () => void;
  setActiveScene: (n: number) => void;
  setVisibilityProgress: (p: number) => void;
}
