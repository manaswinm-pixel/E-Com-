import { useState } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route, Link, useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, Database, MessageSquare, Shield, ChevronDown, Settings as SettingsIcon, LogOut } from 'lucide-react';
import Dashboard from './components/Dashboard';
import DataPage from './components/DataPage';
import ConversationalInsights from './components/ConversationalInsights';
import Settings from './components/Settings';
import NotificationContainer from './components/Notifications';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// OneCap Logo URL - Complete logo with α symbol
const LOGO_URL = "https://customer-assets.emergentagent.com/job_data-convo-poc/artifacts/jyutwofh_Screenshot%202026-03-07%20233634.png";

function AppContent() {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [adminPortalOpen, setAdminPortalOpen] = useState(false);
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
