import React, { useState, useEffect } from 'react';
import { ChevronDown, Plus, Star } from 'lucide-react';
import { ModuleOverview } from './dashboard/ModuleOverview';
import { DrillDownDashboard } from './dashboard/DrillDownDashboard';
import { DashboardBuilder } from './dashboard/DashboardBuilder';
import { CustomDashboardView } from './dashboard/CustomDashboardView';

const LOGO_URL = "https://customer-assets.emergentagent.com/job_data-convo-poc/artifacts/rmuu7ljf_OneCap%20logo%20Blue.svg";

const Dashboard = () => {
  // Try to load custom dashboards and primary from localStorage
  const loadCustomDashboards = () => {
    try {
      const saved = localStorage.getItem('onecap_custom_dashboards');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  };

  const loadPrimary = () => {
    try {
      return localStorage.getItem('onecap_primary_dashboard') || 'overview';
    } catch {
      return 'overview';
    }
  };

  const [currentView, setCurrentView] = useState(loadPrimary()); // 'overview', module ID, or custom db id
  const [currentModuleTitle, setCurrentModuleTitle] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [showBuilder, setShowBuilder] = useState(false);
  
  const [customDashboards, setCustomDashboards] = useState(loadCustomDashboards());
  const [primaryDashboard, setPrimaryDashboard] = useState(loadPrimary());

  useEffect(() => {
    localStorage.setItem('onecap_custom_dashboards', JSON.stringify(customDashboards));
  }, [customDashboards]);

  useEffect(() => {
    localStorage.setItem('onecap_primary_dashboard', primaryDashboard);
  }, [primaryDashboard]);

  const allDashboardOptions = [
    { id: 'overview', title: 'Default Overview', isCustom: false },
    ...customDashboards.map(db => ({ id: db.id, title: db.name, isCustom: true, config: db }))
  ];

  const handleModuleSelect = (moduleId, title) => {
    setCurrentView(moduleId);
    setCurrentModuleTitle(title);
  };

  const currentOptionInfo = allDashboardOptions.find(opt => opt.id === currentView) || { title: currentModuleTitle || 'Dashboard' };

  const handleSetPrimary = () => {
    setPrimaryDashboard(currentView);
  };

  const renderCurrentView = () => {
    if (currentView === 'overview') {
      return <ModuleOverview onModuleSelect={handleModuleSelect} />;
    }
    
    const customConfig = customDashboards.find(db => db.id === currentView);
    if (customConfig) {
      return <CustomDashboardView config={customConfig} onBack={() => setCurrentView('overview')} />;
    }

    // Otherwise, it's a built-in module drilldown
    return <DrillDownDashboard moduleId={currentView} moduleTitle={currentModuleTitle} onBack={() => setCurrentView('overview')} />;
  };

  return (
    <div className="dashboard-content" data-testid="dashboard-page">
      {/* Dynamic Header */}
      <header className="dashboard-header-with-dropdown">
        <div className="header-logo-and-title">
          <img src={LOGO_URL} alt="OneCap Logo" className="dashboard-header-logo" />
          
          <div className="recon-type-dropdown">
            <button className="dropdown-trigger" onClick={() => setShowDropdown(!showDropdown)}>
              <h1 className="dashboard-title">{currentOptionInfo.title}</h1>
              <ChevronDown size={24} className={showDropdown ? 'rotated' : ''} />
            </button>
            
            {showDropdown && (
              <div className="dropdown-menu">
                <div className="dropdown-section-title">Built-in Views</div>
                <div
                  className={`dropdown-item ${currentView === 'overview' ? 'active' : ''}`}
                  onClick={() => { setCurrentView('overview'); setShowDropdown(false); }}
                >
                  Default Overview
                </div>
                
                {customDashboards.length > 0 && (
                  <>
                    <div className="dropdown-divider"></div>
                    <div className="dropdown-section-title">Custom Dashboards</div>
                    {customDashboards.map(db => (
                      <div
                        key={db.id}
                        className={`dropdown-item ${currentView === db.id ? 'active' : ''}`}
                        onClick={() => { setCurrentView(db.id); setShowDropdown(false); }}
                      >
                        {db.name}
                      </div>
                    ))}
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="header-actions">
          {(currentView === 'overview' || customDashboards.some(d => d.id === currentView)) && (
            <button 
              className={`primary-toggle-btn ${primaryDashboard === currentView ? 'is-primary' : ''}`}
              onClick={handleSetPrimary}
              title="Set as Default Landing Screen"
            >
              <Star size={18} fill={primaryDashboard === currentView ? "currentColor" : "none"} />
              <span>{primaryDashboard === currentView ? 'Primary View' : 'Set as Primary'}</span>
            </button>
          )}

          <button className="create-dashboard-btn" onClick={() => setShowBuilder(true)}>
            <Plus size={18} />
            <span>Create Dashboard</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="dashboard-view-wrapper">
        {renderCurrentView()}
      </div>

      {/* Custom Builder Modal */}
      {showBuilder && (
        <DashboardBuilder 
          onClose={() => setShowBuilder(false)}
          onSave={(config) => {
            setCustomDashboards([...customDashboards, config]);
            setShowBuilder(false);
            setCurrentView(config.id);
          }}
        />
      )}
    </div>
  );
};

export default Dashboard;
