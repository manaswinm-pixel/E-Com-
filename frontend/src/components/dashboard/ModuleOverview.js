import React from 'react';
import { Shield, Package, DollarSign, RefreshCw, BarChart2, Activity } from 'lucide-react';

const ModuleCard = ({ title, icon: Icon, color, kpis, onClick }) => {
  return (
    <div className="module-card-interactive" onClick={onClick} style={{ borderColor: color }}>
      <div className="module-card-header" style={{ backgroundColor: `${color}15` }}>
        <div className="module-icon-wrapper" style={{ backgroundColor: color }}>
          <Icon size={24} color="#ffffff" />
        </div>
        <h3 className="module-title" style={{ color: color }}>{title}</h3>
      </div>
      <div className="module-kpi-grid">
        {kpis.map((kpi, idx) => (
          <div key={idx} className="module-kpi-item">
            <span className="module-kpi-label">{kpi.label}</span>
            <span className={`module-kpi-value ${kpi.status || ''}`}>{kpi.value}</span>
          </div>
        ))}
      </div>
      <div className="module-footer">
        <span className="view-details-btn">View Details →</span>
      </div>
    </div>
  );
};

export const ModuleOverview = ({ onModuleSelect }) => {
  const modules = [
    {
      id: 'recon_health',
      title: 'Reconciliation Health',
      icon: Activity,
      color: '#0288d1',
      kpis: [
        { label: 'Overall Accuracy', value: '98.5%', status: 'success' },
        { label: 'Unreconciled Amt', value: '₹14.2L', status: 'warning' },
        { label: 'Open Exceptions', value: '143', status: 'error' }
      ]
    },
    {
      id: 'order_recon',
      title: 'Order Reconciliation',
      icon: Package,
      color: '#388e3c',
      kpis: [
        { label: 'Total Orders', value: '124.5K' },
        { label: 'Mismatched', value: '1.2K', status: 'error' },
        { label: 'Auto-Matched', value: '94%' }
      ]
    },
    {
      id: 'fee_audit',
      title: 'Fee Audit',
      icon: Shield,
      color: '#f57c00',
      kpis: [
        { label: 'Overcharged Fees', value: '₹2.1L', status: 'error' },
        { label: 'Platform Fees', value: '₹45L' },
        { label: 'Claims Raised', value: '89' }
      ]
    },
    {
      id: 'returns_rto',
      title: 'Returns & RTO Intelligence',
      icon: RefreshCw,
      color: '#c2185b',
      kpis: [
        { label: 'RTO %', value: '18%', status: 'warning' },
        { label: 'Return Leakage', value: '₹4.5L', status: 'error' },
        { label: 'Avg processing', value: '2.4 days' }
      ]
    },
    {
      id: 'inventory_recon',
      title: 'Inventory Reconciliation',
      icon: BarChart2,
      color: '#7b1fa2',
      kpis: [
        { label: 'Stock Gap', value: '450 units', status: 'error' },
        { label: 'Virtual Mismatch', value: '120 units' },
        { label: 'Inventory Value', value: '₹1.2Cr' }
      ]
    },
    {
      id: 'settlement_engine',
      title: 'Settlement Engine',
      icon: DollarSign,
      color: '#001768',
      kpis: [
        { label: 'Settlement Gap', value: '₹8.4L', status: 'error' },
        { label: 'Payment Received', value: '₹84.5L', status: 'success' },
        { label: 'Pending Settlement', value: '₹12.1L' }
      ]
    }
  ];

  return (
    <div className="module-overview-container">
      <div className="module-overview-header">
        <h2>Primary Reconciliation Modules</h2>
        <p>Select a module to dive deep into performance metrics, audits, and settlement data.</p>
      </div>
      <div className="modules-grid-six">
        {modules.map((mod) => (
          <ModuleCard
            key={mod.id}
            title={mod.title}
            icon={mod.icon}
            color={mod.color}
            kpis={mod.kpis}
            onClick={() => onModuleSelect(mod.id, mod.title)}
          />
        ))}
      </div>
    </div>
  );
};
