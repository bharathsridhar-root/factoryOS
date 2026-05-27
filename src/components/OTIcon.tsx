/**
 * OTIcon — maps string icon names (stored in content/index.ts) to Lucide components.
 * Usage: <OTIcon name="eye" size={18} color="#005EB8" />
 */

import {
  Activity, AlertTriangle, BarChart2, Bot, Briefcase,
  Building2, CheckCircle, Clock, Cloud, Copy, Cpu,
  Database, Eye, EyeOff, Factory, FileCheck, FlaskConical,
  Gauge, GitBranch, GitMerge, Globe, HelpCircle, Home,
  Layers, LayoutDashboard, Leaf, LineChart, Lock, Map,
  MapPin, Monitor, Network, Package, Radio, Recycle,
  Scan, Search, Server, Settings, Shield, Target, Unplug,
  Users, Workflow, Wrench, Zap, type LucideProps,
} from 'lucide-react';

export const iconMap: Record<string, React.FC<LucideProps>> = {
  'activity':         Activity,
  'alert-triangle':   AlertTriangle,
  'bar-chart-2':      BarChart2,
  'bot':              Bot,
  'briefcase':        Briefcase,
  'building-2':       Building2,
  'check-circle':     CheckCircle,
  'clock':            Clock,
  'cloud':            Cloud,
  'copy':             Copy,
  'cpu':              Cpu,
  'database':         Database,
  'eye':              Eye,
  'eye-off':          EyeOff,
  'factory':          Factory,
  'file-check':       FileCheck,
  'flask-conical':    FlaskConical,
  'gauge':            Gauge,
  'git-branch':       GitBranch,
  'git-merge':        GitMerge,
  'globe':            Globe,
  'help-circle':      HelpCircle,
  'home':             Home,
  'layers':           Layers,
  'layout-dashboard': LayoutDashboard,
  'leaf':             Leaf,
  'line-chart':       LineChart,
  'lock':             Lock,
  'map':              Map,
  'map-pin':          MapPin,
  'monitor':          Monitor,
  'network':          Network,
  'package':          Package,
  'radio':            Radio,
  'recycle':          Recycle,
  'scan':             Scan,
  'search':           Search,
  'server':           Server,
  'settings':         Settings,
  'shield':           Shield,
  'target':           Target,
  'unplug':           Unplug,
  'users':            Users,
  'workflow':         Workflow,
  'wrench':           Wrench,
  'zap':              Zap,
};

interface OTIconProps {
  name: string;
  size?: number;
  color?: string;
  className?: string;
  strokeWidth?: number;
}

export function OTIcon({ name, size = 16, color, className, strokeWidth = 1.8 }: OTIconProps) {
  const Icon = iconMap[name];
  if (!Icon) return null;
  return <Icon size={size} color={color} className={className} strokeWidth={strokeWidth} />;
}
