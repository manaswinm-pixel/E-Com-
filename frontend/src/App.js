import { useState } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Database, MessageSquare, Shield, ChevronDown } from 'lucide-react';
import Dashboard from './components/Dashboard';
import DataPage from './components/DataPage';
import ConversationalInsights from './components/ConversationalInsights';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Logo URL from uploaded image
const LOGO_URL = "https://customer-assets.emergentagent.com/job_data-convo-poc/artifacts/zs9efu6h_image.png";

function AppContent() {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [adminPortalOpen, setAdminPortalOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="dashboard-container" data-testid="app-container">
      {/* Collapsible Sidebar */}
      <aside 
        className={`sidebar ${sidebarExpanded ? 'expanded' : 'collapsed'}`}
        onMouseEnter={() => setSidebarExpanded(true)}
        onMouseLeave={() => setSidebarExpanded(false)}
        data-testid="sidebar"
      >
        {/* Logo */}
        <Link to="/" className="logo-container" data-testid="logo-container">
          <img 
            src={LOGO_URL} 
            alt="OneCap Logo" 
            className="logo-image"
          />
          {sidebarExpanded && <span className="logo-text">OneCap</span>}
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
      </aside>

      {/* Main Content */}
      <main className={`main-content ${sidebarExpanded ? 'sidebar-expanded' : 'sidebar-collapsed'}`} data-testid="main-content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/data" element={<DataPage />} />
          <Route path="/conversational-insights" element={<ConversationalInsights />} />
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
