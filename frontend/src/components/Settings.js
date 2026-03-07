import { useState } from 'react';
import { Save, User, Bell, Lock, Database, FileText, Globe } from 'lucide-react';

const Settings = () => {
  const [settings, setSettings] = useState({
    companyName: 'OneCap Solutions',
    email: 'admin@onecap.com',
    notifications: true,
    emailAlerts: true,
    autoSync: false,
    syncInterval: '30',
    dataRetention: '90',
    timezone: 'Asia/Kolkata',
    currency: 'INR',
    language: 'en',
  });

  const [saved, setSaved] = useState(false);

  const handleChange = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    // Simulate save
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="settings-page" data-testid="settings-page">
      <header className="dashboard-header">
        <h1 className="dashboard-title">Settings</h1>
        <button className="save-button" onClick={handleSave}>
          <Save size={18} />
          {saved ? 'Saved!' : 'Save Changes'}
        </button>
      </header>

      <div className="settings-container">
        {/* General Settings */}
        <div className="settings-card">
          <div className="settings-card-header">
            <User size={20} />
            <h3>General Settings</h3>
          </div>
          <div className="settings-form">
            <div className="form-group">
              <label>Company Name</label>
              <input
                type="text"
                value={settings.companyName}
                onChange={(e) => handleChange('companyName', e.target.value)}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                value={settings.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className="form-input"
              />
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="settings-card">
          <div className="settings-card-header">
            <Bell size={20} />
            <h3>Notification Settings</h3>
          </div>
          <div className="settings-form">
            <div className="form-group-toggle">
              <div>
                <label>Push Notifications</label>
                <p className="form-help">Receive notifications for important events</p>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={settings.notifications}
                  onChange={(e) => handleChange('notifications', e.target.checked)}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
            <div className="form-group-toggle">
              <div>
                <label>Email Alerts</label>
                <p className="form-help">Get email alerts for discrepancies</p>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={settings.emailAlerts}
                  onChange={(e) => handleChange('emailAlerts', e.target.checked)}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
          </div>
        </div>

        {/* Data Sync Settings */}
        <div className="settings-card">
          <div className="settings-card-header">
            <Database size={20} />
            <h3>Data Sync Settings</h3>
          </div>
          <div className="settings-form">
            <div className="form-group-toggle">
              <div>
                <label>Auto Sync</label>
                <p className="form-help">Automatically sync data at intervals</p>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={settings.autoSync}
                  onChange={(e) => handleChange('autoSync', e.target.checked)}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
            <div className="form-group">
              <label>Sync Interval (minutes)</label>
              <select
                value={settings.syncInterval}
                onChange={(e) => handleChange('syncInterval', e.target.value)}
                className="form-input"
              >
                <option value="15">15 minutes</option>
                <option value="30">30 minutes</option>
                <option value="60">1 hour</option>
                <option value="120">2 hours</option>
              </select>
            </div>
            <div className="form-group">
              <label>Data Retention (days)</label>
              <select
                value={settings.dataRetention}
                onChange={(e) => handleChange('dataRetention', e.target.value)}
                className="form-input"
              >
                <option value="30">30 days</option>
                <option value="60">60 days</option>
                <option value="90">90 days</option>
                <option value="180">180 days</option>
                <option value="365">1 year</option>
              </select>
            </div>
          </div>
        </div>

        {/* Regional Settings */}
        <div className="settings-card">
          <div className="settings-card-header">
            <Globe size={20} />
            <h3>Regional Settings</h3>
          </div>
          <div className="settings-form">
            <div className="form-group">
              <label>Timezone</label>
              <select
                value={settings.timezone}
                onChange={(e) => handleChange('timezone', e.target.value)}
                className="form-input"
              >
                <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
                <option value="America/New_York">America/New York (EST)</option>
                <option value="Europe/London">Europe/London (GMT)</option>
                <option value="Asia/Singapore">Asia/Singapore (SGT)</option>
              </select>
            </div>
            <div className="form-group">
              <label>Currency</label>
              <select
                value={settings.currency}
                onChange={(e) => handleChange('currency', e.target.value)}
                className="form-input"
              >
                <option value="INR">INR (₹)</option>
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
              </select>
            </div>
            <div className="form-group">
              <label>Language</label>
              <select
                value={settings.language}
                onChange={(e) => handleChange('language', e.target.value)}
                className="form-input"
              >
                <option value="en">English</option>
                <option value="hi">Hindi</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;