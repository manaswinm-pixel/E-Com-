import { useState } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route, Link, useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, Database, MessageSquare, Shield, ChevronDown, Settings as SettingsIcon, LogOut, RefreshCw } from 'lucide-react';
import Dashboard from './components/Dashboard';
import DataPage from './components/DataPage';
import ConversationalInsights from './components/ConversationalInsights';
import Settings from './components/Settings';
import EcommerceReconciliation from './components/EcommerceReconciliation';
import NotificationContainer from './components/Notifications';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// OneCap Logo URL - High-quality SVG
const LOGO_URL = "https://customer-assets.emergentagent.com/job_data-convo-poc/artifacts/rmuu7ljf_OneCap%20logo%20Blue.svg";

function AppContent() {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [adminPortalOpen, setAdminPortalOpen] = useState(false);
  const [reconciliationsOpen, setReconciliationsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => location.pathname === path;

  const addNotification = (notification) => {
    const id = Date.now();
    setNotifications((prev) => [...prev, { ...notification, id }]);
  };

  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const handleLogout = () => {
    addNotification({
      type: 'info',
      title: 'Logged Out',
      message: 'You have been successfully logged out.',
    });
    // Simulate logout
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  };

  return (
    <div className="dashboard-container" data-testid="app-container">
      {/* Notification Container */}
      <NotificationContainer notifications={notifications} onClose={removeNotification} />

      {/* Collapsible Sidebar */}
      <aside 
        className={`sidebar ${sidebarExpanded ? 'expanded' : 'collapsed'}`}
        onMouseEnter={() => setSidebarExpanded(true)}
        onMouseLeave={() => setSidebarExpanded(false)}
        data-testid="sidebar"
      >
        {/* Logo - Complete OneCap logo with α symbol */}
        <Link to="/" className="logo-container-new" data-testid="logo-container">
          <img 
            src={LOGO_URL} 
            alt="OneCap Logo" 
            className="logo-full-image"
          />
        </Link>

        {/* Navigation */}
        <nav className="nav-menu" data-testid="nav-menu">
          <Link 
            to="/" 
            className={`nav-item ${isActive('/') ? 'active' : ''}`}
            data-testid="nav-dashboard"
          >
            <LayoutDashboard size={20} />
            {sidebarExpanded && <span>Dashboard</span>}
          </Link>
          
          <Link 
            to="/data" 
            className={`nav-item ${isActive('/data') ? 'active' : ''}`}
            data-testid="nav-data"
          >
            <Database size={20} />
            {sidebarExpanded && <span>Data</span>}
          </Link>
          
          <Link 
            to="/conversational-insights" 
            className={`nav-item ${isActive('/conversational-insights') ? 'active' : ''}`}
            data-testid="nav-conversational-insights"
          >
            <MessageSquare size={20} />
            {sidebarExpanded && <span>Conversational Insights</span>}
          </Link>
          
          <div 
            className="nav-item with-dropdown" 
            onClick={(e) => {
              e.stopPropagation();
              setReconciliationsOpen(!reconciliationsOpen);
            }}
            data-testid="nav-reconciliations"
          >
            <div className="nav-item-content">
              <RefreshCw size={20} />
              {sidebarExpanded && <span>Reconciliations</span>}
            </div>
            {sidebarExpanded && (
              <ChevronDown 
                size={16} 
                className={`dropdown-icon ${reconciliationsOpen ? 'open' : ''}`}
              />
            )}
          </div>
          
          {sidebarExpanded && reconciliationsOpen && (
            <div className="dropdown-menu" data-testid="reconciliations-dropdown">
              <Link 
                to="/reconciliation/ecommerce" 
                className={`dropdown-item ${isActive('/reconciliation/ecommerce') ? 'active' : ''}`}
                onClick={() => setReconciliationsOpen(false)}
              >
                E-Commerce Reconciliation
              </Link>
              <Link 
                to="/reconciliation/revenue" 
                className={`dropdown-item ${isActive('/reconciliation/revenue') ? 'active' : ''}`}
                onClick={() => setReconciliationsOpen(false)}
              >
                Revenue Reconciliation
              </Link>
              <Link 
                to="/reconciliation/ledger" 
                className={`dropdown-item ${isActive('/reconciliation/ledger') ? 'active' : ''}`}
                onClick={() => setReconciliationsOpen(false)}
              >
                Ledger Reconciliation
              </Link>
              <Link 
                to="/reconciliation/bank" 
                className={`dropdown-item ${isActive('/reconciliation/bank') ? 'active' : ''}`}
                onClick={() => setReconciliationsOpen(false)}
              >
                Bank Reconciliation
              </Link>
            </div>
          )}
          
          <div 
            className="nav-item with-dropdown" 
            onClick={() => setAdminPortalOpen(!adminPortalOpen)}
            data-testid="nav-admin-portal"
          >
            <div className="nav-item-content">
              <Shield size={20} />
              {sidebarExpanded && <span>Admin Portal</span>}
            </div>
            {sidebarExpanded && (
              <ChevronDown 
                size={16} 
                className={`dropdown-icon ${adminPortalOpen ? 'open' : ''}`}
              />
            )}
          </div>
        </nav>

        {/* Bottom Navigation - Settings & Logout */}
        <div className="nav-bottom">
          <Link 
            to="/settings" 
            className={`nav-item ${isActive('/settings') ? 'active' : ''}`}
            data-testid="nav-settings"
          >
            <SettingsIcon size={20} />
            {sidebarExpanded && <span>Settings</span>}
          </Link>
          
          <div 
            className="nav-item logout" 
            onClick={handleLogout}
            data-testid="nav-logout"
          >
            <LogOut size={20} />
            {sidebarExpanded && <span>Logout</span>}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`main-content ${sidebarExpanded ? 'sidebar-expanded' : 'sidebar-collapsed'}`} data-testid="main-content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/data" element={<DataPage addNotification={addNotification} />} />
          <Route path="/conversational-insights" element={<ConversationalInsights />} />
          <Route path="/reconciliation/ecommerce" element={<EcommerceReconciliation addNotification={addNotification} />} />
          <Route path="/reconciliation/revenue" element={<EcommerceReconciliation addNotification={addNotification} reconType="Revenue" />} />
          <Route path="/reconciliation/ledger" element={<EcommerceReconciliation addNotification={addNotification} reconType="Ledger" />} />
          <Route path="/reconciliation/bank" element={<EcommerceReconciliation addNotification={addNotification} reconType="Bank" />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </div>
  );
}

export default App;
