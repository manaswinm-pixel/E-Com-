import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Search, Edit3, Plus, ChevronLeft, ChevronRight, X, Calendar, ChevronDown, Play } from 'lucide-react';
import './EcommerceReconciliation.css';

const LOGO_URL = "https://customer-assets.emergentagent.com/job_data-convo-poc/artifacts/rmuu7ljf_OneCap%20logo%20Blue.svg";

const EcommerceReconciliation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Parties');
  const [selectedParty, setSelectedParty] = useState(null);
  const [selectedReconDate, setSelectedReconDate] = useState(null); // DD/MM/YYYY
  const [searchQuery, setSearchQuery] = useState('');
  const [showNewReconModal, setShowNewReconModal] = useState(false);
  const [newReconStep, setNewReconStep] = useState(1);
  const [gatewayType, setGatewayType] = useState('');
  const [reconName, setReconName] = useState('');
  const [reconDate, setReconDate] = useState('');
  const [newReconRows, setNewReconRows] = useState([]);
  const [entitiesByName, setEntitiesByName] = useState({});
  const [editingEntitiesRow, setEditingEntitiesRow] = useState(null);
  const [entityNamesByRow, setEntityNamesByRow] = useState({});
  const [editingEntityNamesRow, setEditingEntityNamesRow] = useState(null);
  const [editingEntityNamesValue, setEditingEntityNamesValue] = useState('');
  const [attachments, setAttachments] = useState({
    unicomn: null,
    amazon: null,
    razorpay: null,
    bluedart: null
  });
  const unicomnInputRef = useRef(null);
  const amazonInputRef = useRef(null);
  const razorpayInputRef = useRef(null);
  const bluedartInputRef = useRef(null);

  const gatewayOptions = ['Amazon', 'Flipkart', 'Shopify', 'Shopify COD', 'Amazon COD'];

  const mockData = [
    { name: 'Amazon', run: '17-03-2026 • 03:25 PM', entities: 8, completed: 8, processing: 0 },
    { name: 'Flipkart', run: '30-01-2026 • 11:22 AM', entities: 7, completed: 7, processing: 0 },
    { name: 'Myntra', run: '08-01-2026 • 03:06 PM', entities: 4, completed: 4, processing: 0 },
    { name: 'Meesho', run: '08-01-2026 • 01:17 PM', entities: 5, completed: 5, processing: 0 },
    { name: 'Shopify', run: '06-01-2026 • 10:38 AM', entities: 3, completed: 3, processing: 0 }
  ];

  const allRows = [...newReconRows, ...mockData];
  const filteredData = allRows.filter(d => d.name.toLowerCase().includes(searchQuery.toLowerCase()));
  const selectedPartyRow = selectedParty ? allRows.find((r) => r.name === selectedParty) : null;

  const formatDateDdMmYyyy = (date) => {
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const yyyy = date.getFullYear();
    return `${dd}/${mm}/${yyyy}`;
  };

  const formatTime = (date) =>
    date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

  const buildPartyDates = (partyRow) => {
    if (!partyRow) return [];
    const baseCompleted = Number(partyRow.completed ?? 0);
    const baseProcessing = Number(partyRow.processing ?? 0);
    const entities = Number(getEntitiesValue(partyRow) ?? partyRow.entities ?? 0);

    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const label = i === 0 ? 'Today' : i === 1 ? 'Yesterday' : `${i} days ago`;

      const completed = Math.max(0, baseCompleted - i);
      const processing = i === 0 ? baseProcessing : 0;
      const status = processing > 0 ? 'Processing' : completed > 0 ? 'Completed' : 'Queued';

      return {
        key: `${partyRow.name}_${formatDateDdMmYyyy(d)}`,
        dateLabel: label,
        reconDate: formatDateDdMmYyyy(d),
        reconTime: formatTime(d),
        entities,
        completed,
        processing,
        status,
      };
    });
  };

  const partyDates = activeTab === 'Dates' ? buildPartyDates(selectedPartyRow) : [];

  const creators = ['Manaswin', 'Sandeep', 'Sarath'];

  const hashString = (s) => {
    let h = 2166136261;
    for (let i = 0; i < s.length; i++) {
      h ^= s.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return h >>> 0;
  };

  const idFromSeed = (seed) => {
    const chars = 'abcdefghijklmnopqrstuvwxyz';
    const rand = (n) => {
      const out = [];
      let x = n >>> 0;
      for (let i = 0; i < 4; i++) {
        x = (Math.imul(1103515245, x) + 12345) >>> 0;
        out.push(chars[x % chars.length]);
      }
      return out.join('');
    };
    const a = rand(seed);
    const b = rand(seed ^ 0x9e3779b9);
    const c = rand(seed ^ 0x85ebca6b);
    return `${a}-${b}-${c}`;
  };

  const buildPartyRecons = (partyName, reconDate) => {
    if (!partyName || !reconDate) return [];
    const seedBase = hashString(`${partyName}|${reconDate}`);
    const dateTime = `${reconDate} • ${formatTime(new Date())}`;
    const reconPeriod = '01/04/2024 - 31/12/2025';

    return Array.from({ length: 3 }, (_, i) => {
      const seed = (seedBase + i * 1013) >>> 0;
      return {
        id: idFromSeed(seed),
        type: 'Vendor',
        dateTime,
        reconPeriod,
        createdBy: creators[seed % creators.length],
        status: 'Completed',
      };
    });
  };

  const partyRecons =
    activeTab === 'Recons' && selectedParty && selectedReconDate
      ? buildPartyRecons(selectedParty, selectedReconDate)
      : [];

  const openNewReconModal = useCallback(() => {
    setShowNewReconModal(true);
    setNewReconStep(1);
    setGatewayType('');
    setReconName('');
    setReconDate('');
    setAttachments({
      unicomn: null,
      amazon: null,
      razorpay: null,
      bluedart: null
    });
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('newRecon') !== '1') return;

    openNewReconModal();
    params.delete('newRecon');

    const search = params.toString();
    navigate(
      { pathname: location.pathname, search: search ? `?${search}` : '' },
      { replace: true }
    );
  }, [location.pathname, location.search, navigate, openNewReconModal]);

  const closeNewReconModal = () => {
    setShowNewReconModal(false);
    setNewReconStep(1);
  };

  const handleNext = () => {
    if (!gatewayType || !reconName || !reconDate) return;
    setNewReconStep(2);
  };

  const handleCreateRecon = () => {
    if (!attachments.unicomn || !attachments.amazon || !attachments.razorpay || !attachments.bluedart) return;
    const formattedDate = new Date().toLocaleDateString('en-GB').replace(/\//g, '-');
    const formattedTime = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    const createdRow = {
      name: reconName,
      run: `${formattedDate} • ${formattedTime}`,
      entities: 4,
      completed: 0,
      processing: 1,
      filesAttached: 4
    };

    setNewReconRows((prev) => [createdRow, ...prev]);
    setShowNewReconModal(false);
    setNewReconStep(1);
  };

  const handleFileChange = (key, event) => {
    const file = event.target.files?.[0] || null;
    setAttachments((prev) => ({ ...prev, [key]: file }));
  };

  const handleRunAction = (rowName) => {
    setNewReconRows((prev) =>
      prev.map((row) => {
        if (row.name !== rowName || row.processing === 0) return row;
        const formattedDate = new Date().toLocaleDateString('en-GB').replace(/\//g, '-');
        const formattedTime = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
        return {
          ...row,
          run: `${formattedDate} • ${formattedTime}`,
          completed: row.completed + 1,
          processing: 0
        };
      })
    );
  };

  const handlePartySelect = (partyName) => {
    setSelectedParty(partyName);
    setSelectedReconDate(null);
    setActiveTab('Dates');
  };

  const handleDateSelect = (reconDate) => {
    setSelectedReconDate(reconDate);
    setActiveTab('Recons');
  };

  function getEntitiesValue(row) {
    if (Object.prototype.hasOwnProperty.call(entitiesByName, row.name)) {
      return entitiesByName[row.name];
    }
    return row.entities;
  }

  const handleEntitiesChange = (rowName, value) => {
    const sanitized = value === '' ? '' : Math.max(0, Number(value));
    setEntitiesByName((prev) => ({ ...prev, [rowName]: sanitized }));
  };

  const getEntityNamesPreview = (row) => {
    if (entityNamesByRow[row.name]) return entityNamesByRow[row.name];
    const count = Number(getEntitiesValue(row)) || 0;
    if (count <= 0) return 'No entities mapped';
    const names = Array.from({ length: count }, (_, i) => String.fromCharCode(97 + (i % 26)));
    return names.join(', ');
  };

  const commitEntityNames = (rowName) => {
    const normalized = editingEntityNamesValue
      .split(',')
      .map((n) => n.trim())
      .filter(Boolean)
      .join(', ');

    if (normalized) {
      setEntityNamesByRow((prev) => ({ ...prev, [rowName]: normalized }));
      const entitiesCount = normalized.split(',').map((n) => n.trim()).filter(Boolean).length;
      setEntitiesByName((prev) => ({ ...prev, [rowName]: entitiesCount }));
    }

    setEditingEntityNamesRow(null);
    setEditingEntityNamesValue('');
  };

  return (
    <div className="recon-v2-container">
      {/* Top Bar matching screenshot */}
      <div className="recon-v2-topbar">
        <div className="recon-v2-toptext">
          <img src={LOGO_URL} alt="OneCap Logo" className="recon-v2-logo-image" />
          <span className="recon-v2-subtitle">E-Commerce Reconciliation</span>
          <ChevronDown size={16} className="recon-v2-subtitle-icon" />
        </div>
      </div>

        <div className="recon-v2-main">
          {/* Toolbar */}
          <div className="recon-v2-toolbar">
            <div className="recon-v2-toolbar-left">
              <h2 className="recon-v2-heading">
                {activeTab === 'Parties' ? 'Parties' : activeTab === 'Dates' ? 'Dates' : 'Recons'}
                {(activeTab === 'Dates' || activeTab === 'Recons') && selectedParty ? ` • ${selectedParty}` : ''}
                {activeTab === 'Recons' && selectedReconDate ? ` • ${selectedReconDate}` : ''}
              </h2>
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
                className={`recon-v2-seg-btn ${activeTab === 'Dates' ? 'active' : ''}`}
                onClick={() => setActiveTab('Dates')}
              >
                Dates
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
          {activeTab === 'Dates' ? (
            selectedPartyRow ? (
              <>
                <table className="recon-v2-table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Recon Run</th>
                      <th>Used Entities</th>
                      <th>Completed</th>
                      <th>Processing</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {partyDates.map((d) => (
                      <tr key={d.key} className="recon-v2-clickable-row" onClick={() => handleDateSelect(d.reconDate)}>
                        <td className="brand-col">{d.dateLabel}</td>
                        <td>
                          {d.reconDate} • {d.reconTime}
                        </td>
                        <td>{d.entities}</td>
                        <td className="completed-col">{d.completed}</td>
                        <td>{d.processing}</td>
                        <td>{d.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="recon-v2-pagination">
                  <span>Page 1 of 1</span>
                  <div className="recon-v2-pagination-right">
                    <span>1-{partyDates.length} of {partyDates.length}</span>
                  </div>
                </div>
              </>
            ) : (
              <div style={{ padding: '24px', color: '#64748b' }}>
                Select a party from the Parties tab to see date-wise recon runs.
              </div>
            )
          ) : activeTab === 'Recons' ? (
            selectedParty && selectedReconDate ? (
              <>
                <table className="recon-v2-table recon-v2-recons-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Type</th>
                      <th>Date &amp; Time</th>
                      <th>Recon Period</th>
                      <th>Created By</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {partyRecons.map((r) => (
                      <tr key={r.id} className="recon-v2-recon-row">
                        <td
                          className="brand-col recon-v2-jobid-link"
                          onClick={() =>
                            navigate(`/reconciliation/ecommerce/${encodeURIComponent(selectedParty)}/${encodeURIComponent(r.id)}`)
                          }
                          title="Open job details"
                        >
                          {r.id}
                        </td>
                        <td>{r.type}</td>
                        <td>{r.dateTime}</td>
                        <td>{r.reconPeriod}</td>
                        <td>{r.createdBy}</td>
                        <td className="recon-v2-status-cell">
                          <span className="recon-v2-status-badge">
                            <span className="recon-v2-status-dot" />
                            {r.status}
                          </span>
                          <button className="recon-v2-retry-btn" type="button">
                            Retry
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="recon-v2-pagination">
                  <span>Page 1 of 1</span>
                  <div className="recon-v2-pagination-right">
                    <span>1-{partyRecons.length} of {partyRecons.length}</span>
                  </div>
                </div>
              </>
            ) : (
              <div style={{ padding: '24px', color: '#64748b' }}>
                Select a party and a date from the Dates tab to see recon jobs.
              </div>
            )
          ) : (
            <>
              <table className="recon-v2-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Latest Recon Date</th>
                    <th>Used Entities</th>
                    <th>Completed</th>
                    <th>Processing</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((row, i) => (
                    <tr key={i}>
                      <td className="brand-col" onClick={() => handlePartySelect(row.name)} style={{ cursor: 'pointer' }} title="Click to view dates">
                        {row.name}
                      </td>
                      <td>{row.run}</td>
                      <td
                        className="used-entities-cell"
                        onClick={(e) => {
                          if (e.detail >= 3) {
                            setEditingEntitiesRow(row.name);
                          }
                        }}
                        title="Triple click to edit entities"
                      >
                        {editingEntitiesRow === row.name ? (
                          <input
                            type="number"
                            className="used-entities-input"
                            value={getEntitiesValue(row)}
                            onChange={(e) => handleEntitiesChange(row.name, e.target.value)}
                            onBlur={() => setEditingEntitiesRow(null)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') setEditingEntitiesRow(null);
                            }}
                            autoFocus
                          />
                        ) : (
                          <span className="used-entities-value">{getEntitiesValue(row)}</span>
                        )}
                        <span className="entities-hover-link">view entities</span>
                        <div
                          className="entities-hover-message"
                          onClick={(e) => {
                            if (e.detail >= 3) {
                              setEditingEntityNamesRow(row.name);
                              setEditingEntityNamesValue(getEntityNamesPreview(row));
                            }
                          }}
                          title="Triple click to edit entity names"
                        >
                          {editingEntityNamesRow === row.name ? (
                            <input
                              className="entities-hover-editor"
                              value={editingEntityNamesValue}
                              onChange={(e) => setEditingEntityNamesValue(e.target.value)}
                              onBlur={() => commitEntityNames(row.name)}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') commitEntityNames(row.name);
                              }}
                              autoFocus
                            />
                          ) : (
                            getEntityNamesPreview(row)
                          )}
                        </div>
                      </td>
                      <td className="completed-col">{row.completed}</td>
                      <td>{row.processing}</td>
                      <td>
                        {row.processing > 0 ? (
                          <button className="recon-v2-run-btn" onClick={() => handleRunAction(row.name)}>
                            <Play size={14} /> Run
                          </button>
                        ) : null}
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
            </>
          )}
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
                  <div className="recon-v2-attach-header">
                    <h4>Attachments</h4>
                    <p>Upload the required files for reconciliation</p>
                  </div>

                  <div className="recon-v2-upload-grid">
                    {[
                      { key: 'unicomn', title: 'Unicomn', inputRef: unicomnInputRef },
                      { key: 'amazon', title: 'Amazon', inputRef: amazonInputRef },
                      { key: 'razorpay', title: 'Razorpay', inputRef: razorpayInputRef },
                      { key: 'bluedart', title: 'Bluedart', inputRef: bluedartInputRef }
                    ].map((source) => (
                      <div key={source.key} className="recon-v2-upload-panel">
                        <div className="recon-v2-upload-title">{source.title}</div>
                        <div className="recon-v2-upload-box">
                          <div className="recon-v2-upload-icon">↥</div>
                          <span>
                            Click to upload <strong>or</strong> drag and drop
                          </span>
                          <button
                            className="recon-v2-upload-link-btn"
                            type="button"
                            onClick={() => source.inputRef.current?.click()}
                          >
                            {attachments[source.key] ? 'Replace File' : 'Browse Files'}
                          </button>
                          <input
                            ref={source.inputRef}
                            className="recon-v2-file-input-hidden"
                            type="file"
                            accept=".csv,.xlsx,.xls,.xml,.ods,.tsv,.txt,.pdf,.png,.jpg,.jpeg"
                            onChange={(e) => handleFileChange(source.key, e)}
                          />
                          <small>
                            Limit 10 MB - csv, xlsx, xls, ods, xml, txt, zip, pdf, png, jpg
                          </small>
                          <small>Maximum 1 file per party</small>
                          {attachments[source.key] && (
                            <div className="recon-v2-file-chip">{attachments[source.key].name}</div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="recon-v2-modal-footer">
                  <button className="recon-v2-btn-secondary" onClick={() => setNewReconStep(1)}>
                    Back
                  </button>
                  <button
                    className="recon-v2-btn-primary"
                    onClick={handleCreateRecon}
                    disabled={!attachments.unicomn || !attachments.amazon || !attachments.razorpay || !attachments.bluedart}
                  >
                    Initiate
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
