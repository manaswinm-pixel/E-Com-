import React, { useState } from 'react';
import { X, Check } from 'lucide-react';

export const DashboardBuilder = ({ onSave, onClose }) => {
  const [step, setStep] = useState(1);
  const [dbName, setDbName] = useState('');
  const [dbDesc, setDbDesc] = useState('');
  
  const [selectedMetrics, setSelectedMetrics] = useState([]);
  const [selectedComponents, setSelectedComponents] = useState([]);
  const [layout, setLayout] = useState('2-column');

  const metricsList = [
    { id: 'totalSales', label: 'Total Sales', category: 'Financial' },
    { id: 'settlementGap', label: 'Settlement Gap', category: 'Financial' },
    { id: 'codCollection', label: 'COD Collection', category: 'Financial' },
    { id: 'mismatchOrders', label: 'Mismatch Orders', category: 'Reconciliation' },
    { id: 'rtoPercent', label: 'RTO %', category: 'Returns' },
    { id: 'returnLeakage', label: 'Return Leakage', category: 'Returns' },
    { id: 'inventoryMismatch', label: 'Inventory Mismatch', category: 'Inventory' },
    { id: 'overchargedFees', label: 'Overcharged Fees', category: 'Fees' },
  ];

  const componentsList = [
    { id: 'kpi_cards', label: 'KPI Cards' },
    { id: 'tables', label: 'Data Tables' },
    { id: 'charts_pie', label: 'Pie Charts (Distribution)' },
    { id: 'charts_bar', label: 'Bar Charts (Trends)' },
  ];

  const toggleSelection = (item, list, setList) => {
    if (list.includes(item)) {
      setList(list.filter(i => i !== item));
    } else {
      setList([...list, item]);
    }
  };

  const handleSave = () => {
    if (!dbName) {
      alert("Please enter a Dashboard Name");
      return;
    }
    const newDashboard = {
      id: `custom_${Date.now()}`,
      name: dbName,
      description: dbDesc,
      metrics: selectedMetrics,
      components: selectedComponents,
      layout,
      isCustom: true
    };
    onSave(newDashboard);
  };

  return (
    <div className="builder-modal-overlay">
      <div className="builder-modal">
        <div className="builder-header">
          <h2>Create Custom Dashboard</h2>
          <button className="close-btn" onClick={onClose}><X size={20} /></button>
        </div>
        
        <div className="builder-stepper">
          <div className={`step ${step >= 1 ? 'active' : ''}`}>1. Setup</div>
          <div className={`step ${step >= 2 ? 'active' : ''}`}>2. Metrics</div>
          <div className={`step ${step >= 3 ? 'active' : ''}`}>3. Components</div>
          <div className={`step ${step >= 4 ? 'active' : ''}`}>4. Layout</div>
        </div>

        <div className="builder-body">
          {step === 1 && (
            <div className="step-content form-step">
              <label>Dashboard Name *</label>
              <input 
                type="text" 
                value={dbName} 
                onChange={(e) => setDbName(e.target.value)} 
                placeholder="e.g., Executive Financial Overview"
                required
              />
              <label>Description (Optional)</label>
              <textarea 
                value={dbDesc} 
                onChange={(e) => setDbDesc(e.target.value)}
                placeholder="Describe what this dashboard tracks"
              />
            </div>
          )}

          {step === 2 && (
            <div className="step-content grid-step">
              <p>Select metrics to include in this dashboard:</p>
              <div className="selection-grid">
                {metricsList.map(m => (
                  <div 
                    key={m.id} 
                    className={`selectable-item ${selectedMetrics.includes(m.id) ? 'selected' : ''}`}
                    onClick={() => toggleSelection(m.id, selectedMetrics, setSelectedMetrics)}
                  >
                    <div className="select-check">{selectedMetrics.includes(m.id) && <Check size={16} />}</div>
                    <div>
                      <div className="item-label">{m.label}</div>
                      <div className="item-category">{m.category}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="step-content grid-step">
              <p>Select visual components:</p>
              <div className="selection-grid">
                {componentsList.map(c => (
                  <div 
                    key={c.id} 
                    className={`selectable-item ${selectedComponents.includes(c.id) ? 'selected' : ''}`}
                    onClick={() => toggleSelection(c.id, selectedComponents, setSelectedComponents)}
                  >
                    <div className="select-check">{selectedComponents.includes(c.id) && <Check size={16} />}</div>
                    <div>
                      <div className="item-label">{c.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="step-content layout-step">
              <p>Choose grid layout:</p>
              <div className="layout-options">
                <div 
                  className={`layout-option ${layout === '2-column' ? 'selected' : ''}`}
                  onClick={() => setLayout('2-column')}
                >
                  <div className="layout-preview two-col">
                    <div></div><div></div><div></div><div></div>
                  </div>
                  <span>2-Column Grid</span>
                </div>
                <div 
                  className={`layout-option ${layout === '3-column' ? 'selected' : ''}`}
                  onClick={() => setLayout('3-column')}
                >
                  <div className="layout-preview three-col">
                    <div></div><div></div><div></div><div></div><div></div><div></div>
                  </div>
                  <span>3-Column Grid</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="builder-footer">
          {step > 1 ? (
            <button className="btn-secondary" onClick={() => setStep(step - 1)}>Back</button>
          ) : <div></div>}
          
          {step < 4 ? (
            <button className="btn-primary" onClick={() => setStep(step + 1)}>Next</button>
          ) : (
            <button className="btn-success" onClick={handleSave}>Save Dashboard</button>
          )}
        </div>
      </div>
    </div>
  );
};
