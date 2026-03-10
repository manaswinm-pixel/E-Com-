import { useState, useEffect } from 'react';
import { Search, Edit3, Plus, X, Edit2 } from 'lucide-react';
import { useNavigate, useParams, Link } from 'react-router-dom';

const EcommerceReconciliation = ({ addNotification, reconType = 'E-Commerce' }) => {
  const [activeView, setActiveView] = useState('parties'); // 'parties' or 'recons'
  const [searchQuery, setSearchQuery] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [showNewReconModal, setShowNewReconModal] = useState(false);
  const [showEditInstructionsModal, setShowEditInstructionsModal] = useState(false);
  const [modalStep, setModalStep] = useState(1);
  const [partyType, setPartyType] = useState('customer');
  const [instructionsText, setInstructionsText] = useState(`# Oswaal Client Ledger Reconciliation Instructions

## TRANSACTION CATEGORIES

**Supported Categories**: Invoice, Payment, TDS, Debit Note, Credit Note

**If OUR ledger is Receivables** (Vendor Perspective - asset owed to us):
- **Debit** (customer owes more): Invoice, Debit Note
- **Credit** (customer owes less): Payment, TDS, Credit Note

**If OUR ledger is Payables** (Customer Perspective - liability we owe):
- **Debit** (we owe less): Payment, TDS, Debit Note
- **Credit** (we owe more): Invoice, Credit Note

**Fallback Rule**: Unclassified transactions → **Other Debit** or **Other Credit** based on polarity

---

## OUR LEDGER KEY COLUMNS

| Column | Purpose |
|--------|---------|
| Date | Transaction date |
| Type | Transaction category |
| Ref No | Invoice/Payment reference |
| Amount | Absolute value |
| Debit/Credit | Polarity indicator |`);
  const [formData, setFormData] = useState({
    name: '',
    startDate: '',
    endDate: '',
    instructions: ''
  });
  
  const navigate = useNavigate();
  const { partyName: selectedParty } = useParams();
  
  // Reset to showing recons when party is selected
  useEffect(() => {
    if (selectedParty) {
      setActiveView('recons');
    }
  }, [selectedParty]);

  // Mock data
  const partiesData = [
    { name: 'Oswaal', latestRun: '10-03-2026 • 10:45 AM', period: '01-04-2024 - 05-03-2026', completed: 24, processing: 0 },
    { name: 'Uchimura (RMPL)', latestRun: '10-03-2026 • 10:14 AM', period: '01-04-2023 - 31-12-2025', completed: 2, processing: 0 },
    { name: 'Marsen (RMPL)', latestRun: '09-03-2026 • 06:06 PM', period: '01-06-2025 - 31-03-2026', completed: 1, processing: 0 },
    { name: 'Jindal (RMPL)', latestRun: '09-03-2026 • 05:30 PM', period: '01-04-2025 - 31-03-2026', completed: 1, processing: 0 },
    { name: 'IMC Ad - Calcul', latestRun: '09-03-2026 • 03:54 PM', period: '01-04-2025 - 31-01-2026', completed: 1, processing: 0 },
    { name: 'Homelane_Rockcoal', latestRun: '09-03-2026 • 12:18 PM', period: '01-04-2021 - 31-12-2026', completed: 8, processing: 0 },
    { name: 'Puma_JackJill', latestRun: '06-03-2026 • 02:17 PM', period: '01-04-2024 - 31-10-2025', completed: 7, processing: 0 },
    { name: 'Puma_JNC5', latestRun: '06-03-2026 • 12:56 PM', period: '01-04-2024 - 31-03-2025', completed: 9, processing: 1 },
    { name: 'INC5', latestRun: '06-03-2026 • 12:29 PM', period: '01-04-2024 - 31-03-2025', completed: 2, processing: 0 },
    { name: 'Zepto', latestRun: '06-03-2026 • 12:21 PM', period: '01-04-2023 - 30-11-2025', completed: 7, processing: 0 },
  ];

  const allReconsData = [
    { id: 'jumt-mkh-kjkw', party: 'Oswaal', type: 'Customer', dateTime: '10-03-2026 • 10:45 AM', period: '01/02/2026 - 05/03/2026', createdBy: 'Rohan Jamakhandi', status: 'Completed' },
    { id: 'llsf-sggc-uzix', party: 'Oswaal', type: 'Customer', dateTime: '10-03-2026 • 10:17 AM', period: '01/02/2026 - 05/03/2026', createdBy: 'Rohan Jamakhandi', status: 'Completed' },
    { id: 'kmvl-yfzx-tkox', party: 'Oswaal', type: 'Customer', dateTime: '07-03-2026 • 10:14 PM', period: '01/03/2026 - 05/03/2026', createdBy: 'Rohan Jamakhandi', status: 'Completed' },
    { id: 'npvw-efdj-dwpl', party: 'Uchimura (RMPL)', type: 'Customer', dateTime: '10-03-2026 • 10:14 AM', period: '01/03/2026 - 05/03/2026', createdBy: 'Sandeep Nambiar', status: 'Completed' },
    { id: 'pmv-dbe-syzl', party: 'Uchimura (RMPL)', type: 'Customer', dateTime: '09-03-2026 • 06:44 PM', period: '01/03/2026 - 05/03/2026', createdBy: 'Sandeep Nambiar', status: 'Completed' },
    { id: 'bclp-jayv-ucqq', party: 'Marsen (RMPL)', type: 'Vendor', dateTime: '09-03-2026 • 06:06 PM', period: '01/03/2026 - 05/03/2026', createdBy: 'Sandeep Nambiar', status: 'Completed' },
    { id: 'zcko-tgax-tylg', party: 'Jindal (RMPL)', type: 'Vendor', dateTime: '09-03-2026 • 05:30 PM', period: '01/03/2026 - 05/03/2026', createdBy: 'Sandeep Nambiar', status: 'Completed' },
    { id: 'ryey-ltgli-enrx', party: 'IMC Ad - Calcul', type: 'Vendor', dateTime: '09-03-2026 • 03:54 PM', period: '01/04/2024 - 31/03/2025', createdBy: 'Rohan Jamakhandi', status: 'Completed' },
    { id: 'cvxm-gpdm-rswh', party: 'Homelane_Rockcoal', type: 'Vendor', dateTime: '09-03-2026 • 12:18 PM', period: '01/02/2026 - 05/03/2026', createdBy: 'Sharath M', status: 'Completed' },
    { id: 'jffz-nyha-afpv', party: 'Homelane_Rockcoal', type: 'Vendor', dateTime: '09-03-2026 • 11:10 AM', period: '01/02/2026 - 05/03/2026', createdBy: 'Sharath M', status: 'Completed' },
  ];

  const getPartyRecons = (party) => allReconsData.filter(recon => recon.party === party);

  const handlePartyClick = (partyName) => {
    const reconTypeSlug = reconType.toLowerCase().replace(/\s+/g, ''); // Remove all spaces
    navigate(`/reconciliation/${reconTypeSlug}/${encodeURIComponent(partyName)}`);
  };

  const handleNewRecon = () => {
    setShowNewReconModal(true);
    setModalStep(1);
  };

  const handleEditInstructions = () => {
    setShowEditInstructionsModal(true);
  };

  const handleCloseEditInstructions = () => {
    setShowEditInstructionsModal(false);
  };

  const handleSaveInstructions = () => {
    addNotification({
      type: 'success',
      title: 'Instructions Saved',
      message: 'Party instructions have been updated successfully.',
    });
    setShowEditInstructionsModal(false);
  };

  const handleCloseModal = () => {
    setShowNewReconModal(false);
    setFormData({ name: '', startDate: '', endDate: '', instructions: '' });
    setModalStep(1);
  };

  const handleNextStep = () => {
    if (modalStep === 1) {
      setModalStep(2);
    } else {
      addNotification({
        type: 'success',
        title: 'Reconciliation Created',
        message: `New reconciliation for ${formData.name} has been created.`,
      });
      handleCloseModal();
    }
  };

  // Determine which data to show
  const isPartyDetailView = !!selectedParty;
  const decodedPartyName = selectedParty ? decodeURIComponent(selectedParty) : null;
  const currentReconsData = isPartyDetailView ? getPartyRecons(decodedPartyName) : allReconsData;
  
  // Filter and paginate
  const filteredParties = partiesData.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const filteredRecons = currentReconsData.filter(r => 
    r.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.party.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentData = activeView === 'parties' && !isPartyDetailView ? filteredParties : filteredRecons;
  const totalPages = Math.ceil((currentData.length || 1) / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedData = currentData.slice(startIndex, startIndex + rowsPerPage);

  return (
    <div className="recon-page-container">
      {/* Header */}
      <div className="recon-header">
        <div className="recon-logo-title">
          <div className="recon-alpha-logo">α</div>
          <div className="recon-onecap-text">OneCap</div>
          <div className="recon-page-title">
            {reconType} Reconciliations
            {isPartyDetailView && <span> / {selectedParty}</span>}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="recon-content-area">
        {/* Controls Row */}
        <div className="recon-controls-row">
          <div className="recon-left-controls">
            <div className="recon-heading">
              {isPartyDetailView ? `${reconType} Recons` : (activeView === 'parties' ? 'Parties' : `${reconType} Recons`)}
            </div>
            <button className="recon-edit-instructions-btn" onClick={handleEditInstructions}>
              <Edit3 size={16} />
              Edit {isPartyDetailView ? 'Parties' : ''} Instructions
            </button>
          </div>
          <div className="recon-right-controls">
            {!isPartyDetailView && (
              <div className="recon-view-tabs">
                <button 
                  className={`recon-view-tab ${activeView === 'parties' ? 'active' : ''}`}
                  onClick={() => setActiveView('parties')}
                >
                  Parties
                </button>
                <button 
                  className={`recon-view-tab ${activeView === 'recons' ? 'active' : ''}`}
                  onClick={() => setActiveView('recons')}
                >
                  Recons
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Search and Action Bar */}
        <div className="recon-action-bar">
          <div className="recon-search-container">
            <Search size={18} className="search-icon" />
            <input 
              type="text" 
              placeholder={activeView === 'parties' && !isPartyDetailView ? "Search entities..." : "Search recons..."}
              className="recon-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="recon-new-btn" onClick={handleNewRecon}>
            <Plus size={18} />
            New Recon
          </button>
        </div>

        {/* Table */}
        <div className="recon-table-container">
          {activeView === 'parties' && !isPartyDetailView ? (
            /* Parties List Table */
            <table className="recon-table">
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
                {paginatedData.map((party, index) => {
                  const reconTypeSlug = reconType.toLowerCase().replace(/\s+/g, '');
                  const partyLink = `/reconciliation/${reconTypeSlug}/${encodeURIComponent(party.name)}`;
                  
                  return (
                    <tr key={index} className="clickable-row">
                      <td className="party-name">
                        <Link to={partyLink} style={{color: 'inherit', textDecoration: 'none', display: 'block', width: '100%'}}>
                          {party.name}
                        </Link>
                      </td>
                      <td className="recon-run">
                        <Link to={partyLink} style={{color: 'inherit', textDecoration: 'none', display: 'block', width: '100%'}}>
                          {party.latestRun}
                        </Link>
                      </td>
                      <td className="recon-period">
                        <Link to={partyLink} style={{color: 'inherit', textDecoration: 'none', display: 'block', width: '100%'}}>
                          {party.period}
                        </Link>
                      </td>
                      <td>
                        <Link to={partyLink} style={{color: 'inherit', textDecoration: 'none', display: 'block', width: '100%'}}>
                          <span className={`status-number ${party.completed > 0 ? 'completed' : ''}`}>
                            {party.completed}
                          </span>
                        </Link>
                      </td>
                      <td>
                        <Link to={partyLink} style={{color: 'inherit', textDecoration: 'none', display: 'block', width: '100%'}}>
                          <span className={`status-number ${party.processing > 0 ? 'processing' : ''}`}>
                            {party.processing}
                          </span>
                        </Link>
                      </td>
                      <td>
                        <button 
                          className="instruction-icon-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            addNotification({ type: 'info', title: 'Instructions', message: `Viewing instructions for ${party.name}` });
                          }}
                        >
                          →
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            /* Recons Table (All or Party-specific) */
            <table className="recon-table">
              <thead>
                <tr>
                  <th>Recon ID</th>
                  {!isPartyDetailView && <th>Parties</th>}
                  <th>Type</th>
                  <th>Date & Time</th>
                  {!isPartyDetailView && <th>Recon Period</th>}
                  <th>Created By</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((recon, index) => (
                  <tr key={index}>
                    <td className="recon-id">{recon.id}</td>
                    {!isPartyDetailView && <td className="party-name">{recon.party}</td>}
                    <td className="recon-type">{recon.type}</td>
                    <td className="recon-datetime">{recon.dateTime}</td>
                    {!isPartyDetailView && <td className="recon-period">{recon.period}</td>}
                    <td className="created-by">{recon.createdBy}</td>
                    <td>
                      <span className="status-badge completed">
                        ● {recon.status}
                      </span>
                      {index === 0 && isPartyDetailView && (
                        <button className="retry-btn">Retry</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Pagination */}
        <div className="recon-pagination">
          <div className="pagination-info">Page {currentPage} of {totalPages || 1}</div>
          <div className="pagination-controls">
            <span className="rows-label">Rows per page</span>
            <select value={rowsPerPage} onChange={(e) => setRowsPerPage(Number(e.target.value))} className="rows-select">
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
            <span className="pagination-range">{startIndex + 1}-{Math.min(startIndex + rowsPerPage, currentData.length)} of {currentData.length}</span>
            <div className="pagination-arrows">
              <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="pagination-arrow">‹</button>
              <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="pagination-arrow">›</button>
            </div>
          </div>
        </div>
      </div>

      {/* New Recon Modal */}
      {showNewReconModal && (
        <div className="modal-overlay">
          <div className="modal-container">
            <button className="modal-close" onClick={handleCloseModal}>
              <X size={20} />
            </button>
            
            {/* Steps */}
            <div className="modal-steps">
              <div className={`modal-step ${modalStep === 1 ? 'active' : ''}`}>
                <div className="step-number">1</div>
                <span>Enter details</span>
              </div>
              <div className={`modal-step ${modalStep === 2 ? 'active' : ''}`}>
                <div className="step-number">2</div>
                <span>Attach files</span>
              </div>
            </div>

            {modalStep === 1 ? (
              <div className="modal-content">
                <div className="form-section">
                  <label className="form-label">Party Type <span className="required">*</span></label>
                  <div className="radio-group">
                    <label className="radio-label">
                      <input type="radio" name="partyType" value="customer" checked={partyType === 'customer'} onChange={(e) => setPartyType(e.target.value)} />
                      <span>Customer</span>
                    </label>
                    <label className="radio-label">
                      <input type="radio" name="partyType" value="vendor" checked={partyType === 'vendor'} onChange={(e) => setPartyType(e.target.value)} />
                      <span>Vendor</span>
                    </label>
                  </div>
                </div>

                <div className="form-section">
                  <label className="form-section-title">Party Details</label>
                  <div className="form-row">
                    <div className="form-field">
                      <label>Name <span className="required">*</span></label>
                      <input type="text" placeholder="Enter name..." value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                    </div>
                    <div className="form-field">
                      <label>Start Date <span className="required">*</span></label>
                      <input type="date" value={formData.startDate} onChange={(e) => setFormData({...formData, startDate: e.target.value})} />
                    </div>
                    <div className="form-field">
                      <label>End Date <span className="required">*</span></label>
                      <input type="date" value={formData.endDate} onChange={(e) => setFormData({...formData, endDate: e.target.value})} />
                    </div>
                  </div>
                </div>

                <div className="form-section">
                  <label className="form-label">
                    <Edit2 size={16} />
                    Edit
                  </label>
                  <textarea placeholder="Enter your instructions here" value={formData.instructions} onChange={(e) => setFormData({...formData, instructions: e.target.value})} rows={4}></textarea>
                </div>
              </div>
            ) : (
              <div className="modal-content">
                <p style={{textAlign: 'center', padding: '40px', color: '#6b7280'}}>Attach files functionality (Step 2)</p>
              </div>
            )}

            <div className="modal-footer">
              <button className="modal-cancel-btn" onClick={handleCloseModal}>Cancel</button>
              <button className="modal-next-btn" onClick={handleNextStep}>{modalStep === 1 ? 'Next' : 'Create'}</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Instructions Modal */}
      {showEditInstructionsModal && (
        <div className="modal-overlay">
          <div className="modal-container instructions-modal">
            <button className="modal-close" onClick={handleCloseEditInstructions}>
              <X size={20} />
            </button>
            
            <div className="instructions-modal-header">
              <h2 className="instructions-modal-title">Edit Parties Instructions</h2>
            </div>

            <div className="instructions-modal-content">
              <textarea 
                className="instructions-textarea"
                value={instructionsText}
                onChange={(e) => setInstructionsText(e.target.value)}
                rows={20}
              />
            </div>

            <div className="modal-footer">
              <button className="modal-cancel-btn" onClick={handleCloseEditInstructions}>Cancel</button>
              <button className="modal-save-btn" onClick={handleSaveInstructions}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EcommerceReconciliation;
