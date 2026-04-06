import React, { useState } from 'react';
import { Search, Edit3, Plus, Settings2, ChevronLeft, ChevronRight, X, Calendar } from 'lucide-react';
import './EcommerceReconciliation.css';

const EcommerceReconciliation = () => {
  const [activeTab, setActiveTab] = useState('Parties');
  const [searchQuery, setSearchQuery] = useState('');
  const [showNewReconModal, setShowNewReconModal] = useState(false);
  const [newReconStep, setNewReconStep] = useState(1);
  const [gatewayType, setGatewayType] = useState('');
  const [reconName, setReconName] = useState('');
  const [reconDate, setReconDate] = useState('');

  const gatewayOptions = ['Amazon', 'Flipkart', 'Shopify', 'Shopify COD', 'Amazon COD'];

  const mockData = [
    { name: 'Axis GP', run: '17-03-2026 • 03:25 PM', period: '01-11-2025 - 06-01-2026', completed: 8, processing: 0 },
    { name: 'GP Test', run: '30-01-2026 • 11:22 AM', period: '03-01-2026 - 06-01-2026', completed: 7, processing: 0 },
    { name: 'Axis (GP Nov 1-4)', run: '08-01-2026 • 03:06 PM', period: '01-11-2025 - 04-11-2025', completed: 4, processing: 0 },
    { name: 'Axis Bank', run: '08-01-2026 • 01:17 PM', period: '01-11-2025 - 08-01-2026', completed: 5, processing: 0 },
    { name: 'Axis', run: '06-01-2026 • 10:38 AM', period: '01-10-2025 - 03-10-2025', completed: 1, processing: 0 },
    { name: 'Axis (GP Chennai)', run: '08-01-2026 • 09:50 AM', period: '03-01-2026 - 06-01-2026', completed: 3, processing: 0 }
  ];

  const filteredData = mockData.filter(d => d.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const openNewReconModal = () => {
    setShowNewReconModal(true);
    setNewReconStep(1);
    setGatewayType('');
    setReconName('');
    setReconDate('');
  };

  const closeNewReconModal = () => {
    setShowNewReconModal(false);
    setNewReconStep(1);
  };

  const handleNext = () => {
    if (!gatewayType || !reconName || !reconDate) return;
    setNewReconStep(2);
  };

  const handleCreateRecon = () => {
    setShowNewReconModal(false);
    setNewReconStep(1);
  };

  return (
    <div className="recon-v2-container">
      {/* Top Bar matching screenshot */}
      <div className="recon-v2-topbar">
        <div className="recon-v2-logo-icon">α</div>
        <div className="recon-v2-toptext">
          <span className="recon-v2-brand">OneCap</span>
          <span className="recon-v2-subtitle">E-Commerce Reconciliations</span>
        </div>
      </div>

      <div className="recon-v2-main">
        {/* Toolbar */}
        <div className="recon-v2-toolbar">
          <div className="recon-v2-toolbar-left">
            <h2 className="recon-v2-heading">Parties</h2>
            <button className="recon-v2-edit-btn">
              <Edit3 size={14} /> Edit Instructions
            </button>
          </div>
          
          <div className="recon-v2-toolbar-right">
            <div className="recon-v2-search">
              <Search size={14} className="recon-v2-search-icon" />
              <input 
                type="text" 
                placeholder="Search Parties..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="recon-v2-segmented">
              <button 
                className={`recon-v2-seg-btn ${activeTab === 'Parties' ? 'active' : ''}`}
                onClick={() => setActiveTab('Parties')}
              >
                Parties
              </button>
              <button 
                className={`recon-v2-seg-btn ${activeTab === 'Recons' ? 'active' : ''}`}
                onClick={() => setActiveTab('Recons')}
              >
                Recons
              </button>
            </div>
            
            <button className="recon-v2-create-btn" onClick={openNewReconModal}>
              <Plus size={16} /> New Recon
            </button>
          </div>
        </div>

        {/* Table Card */}
        <div className="recon-v2-card">
          <table className="recon-v2-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Latest Recon Run</th>
                <th>Latest Recon Period</th>
                <th>Completed</th>
                <th>Processing</th>
                <th>Instructions</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((row, i) => (
                <tr key={i}>
                  <td className="brand-col">{row.name}</td>
                  <td>{row.run}</td>
                  <td>{row.period}</td>
                  <td className="completed-col">{row.completed}</td>
                  <td>{row.processing}</td>
                  <td>
                    <Settings2 size={16} className="icon-td" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          <div className="recon-v2-pagination">
            <span>Page 1 of 1</span>
            <div className="recon-v2-pagination-right">
              <div>
                Rows per page{' '}
                <select>
                  <option>10</option>
                  <option>20</option>
                </select>
              </div>
              <span>1-{filteredData.length} of {filteredData.length}</span>
              <div>
                <button className="recon-v2-arrow-btn"><ChevronLeft size={16}/></button>
                <button className="recon-v2-arrow-btn"><ChevronRight size={16}/></button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showNewReconModal && (
        <div className="recon-v2-modal-overlay" onClick={closeNewReconModal}>
          <div className="recon-v2-modal" onClick={(e) => e.stopPropagation()}>
            <div className="recon-v2-modal-header">
              <div className="recon-v2-stepper">
                <div className={`recon-v2-step ${newReconStep >= 1 ? 'active' : ''}`}>
                  <span className="recon-v2-step-number">1</span>
                  <span>Enter details</span>
                </div>
                <div className="recon-v2-step-divider" />
                <div className={`recon-v2-step ${newReconStep >= 2 ? 'active' : ''}`}>
                  <span className="recon-v2-step-number">2</span>
                  <span>Attach files</span>
                </div>
              </div>
              <button className="recon-v2-modal-close" onClick={closeNewReconModal}>
                <X size={14} />
              </button>
            </div>

            {newReconStep === 1 ? (
              <>
                <div className="recon-v2-form-group">
                  <label htmlFor="gatewayType">E-commerce Config Type*</label>
                  <select
                    id="gatewayType"
                    value={gatewayType}
                    onChange={(e) => setGatewayType(e.target.value)}
                  >
                    <option value="">Select payment gateway...</option>
                    {gatewayOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="recon-v2-form-row">
                  <div className="recon-v2-form-group">
                    <label htmlFor="reconName">Name*</label>
                    <input
                      id="reconName"
                      type="text"
                      placeholder="Enter Recon Name..."
                      value={reconName}
                      onChange={(e) => setReconName(e.target.value)}
                    />
                  </div>
                  <div className="recon-v2-form-group recon-v2-date-group">
                    <label htmlFor="reconDate">Date*</label>
                    <div className="recon-v2-date-input-wrap">
                      <input
                        id="reconDate"
                        type="date"
                        value={reconDate}
                        onChange={(e) => setReconDate(e.target.value)}
                      />
                      <Calendar size={14} className="recon-v2-date-icon" />
                    </div>
                  </div>
                </div>

                <div className="recon-v2-modal-footer">
                  <button className="recon-v2-btn-secondary" onClick={closeNewReconModal}>
                    Cancel
                  </button>
                  <button
                    className="recon-v2-btn-primary"
                    onClick={handleNext}
                    disabled={!gatewayType || !reconName || !reconDate}
                  >
                    Next
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="recon-v2-attach-content">
                  <p>Upload the input files for this reconciliation run.</p>
                  <div className="recon-v2-upload-box">
                    <span>Drop files here or click to browse</span>
                    <button className="recon-v2-btn-secondary" type="button">
                      Choose Files
                    </button>
                  </div>
                </div>

                <div className="recon-v2-modal-footer">
                  <button className="recon-v2-btn-secondary" onClick={() => setNewReconStep(1)}>
                    Back
                  </button>
                  <button className="recon-v2-btn-primary" onClick={handleCreateRecon}>
                    Create Recon
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default EcommerceReconciliation;
