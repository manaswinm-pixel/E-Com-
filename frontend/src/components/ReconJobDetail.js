import { useState } from 'react';
import { Search, Download, MoreVertical, MessageSquare, Edit2, X } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';

const ReconJobDetail = ({ addNotification }) => {
  const { partyName, jobId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('financial');
  const [activeReportTab, setActiveReportTab] = useState('recon');
  const [showQuickRetryModal, setShowQuickRetryModal] = useState(false);
  const [showRetryModal, setShowRetryModal] = useState(false);
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);
  const [quickRetryInstructions, setQuickRetryInstructions] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');

  // Mock financial summary data
  const financialData = [
    { particular: 'Opening Balance', inYours: '1,60,048.59', inCounterparty: '0.00', difference: '1,60,048.59' },
    { particular: 'Credit Note', inYours: '1,03,226.85', inCounterparty: '88,811.00', difference: '13,415.85' },
    { particular: 'Invoice', inYours: '31,36,694.43', inCounterparty: '27,99,541.60', difference: '3,37,152.83' },
    { particular: 'Payment', inYours: '24,98,019.00', inCounterparty: '24,19,519.00', difference: '78,500.00' },
    { particular: 'TDS', inYours: '2,16,457.00', inCounterparty: '2,37,251.00', difference: '-20,794.00' },
    { particular: 'Closing Balance', inYours: '4,69,040.17', inCounterparty: '52,960.60', difference: '4,16,079.57' },
  ];

  // Mock detailed transaction data
  const transactionData = [
    { date: '18-04-2024', type: 'Invoice', refNum: 'WY/23-24/M3716, M3716', amount: '55640.54', counter: '0' },
    { date: '18-04-2024', type: 'Invoice', refNum: 'WY/23-24/M3779, M3779', amount: '292388.87', counter: '292389' },
    { date: '30-04-2024', type: 'TDS', refNum: '', amount: '0', counter: '24779' },
    { date: '08-05-2024', type: 'Payment', refNum: 'WY/23-24/M3405, M3405, WY/23-24/M3475, M3475, WY/23-24/M3...', amount: '267610', counter: '267610' },
    { date: '17-05-2024', type: 'Invoice', refNum: 'WY/24-25/M0166, M0166', amount: '61384.19', counter: '0' },
    { date: '17-05-2024', type: 'Invoice', refNum: 'WY/24-25/M0243, M0243', amount: '297130.25', counter: '297130' },
    { date: '22-05-2024', type: 'TDS', refNum: '', amount: '0', counter: '25181' },
    { date: '29-05-2024', type: 'Payment', refNum: 'WY/23-24/M3716, M3716, WY/23-24/M3779, M3779, WY/(24-25)M0...', amount: '271949', counter: '271949' },
    { date: '22-06-2024', type: 'Invoice', refNum: 'WY/24-25/M0444, M0444', amount: '62968.34', counter: '62968' },
    { date: '22-06-2024', type: 'Invoice', refNum: 'WY/24-25/M0385, M0385', amount: '336776.87', counter: '336777' },
  ];

  const handleQuickRetry = () => {
    setShowQuickRetryModal(true);
  };

  const handleRetry = () => {
    setShowRetryModal(true);
  };

  const handleDownloadReport = () => {
    addNotification({
      type: 'info',
      title: 'Downloading Report',
      message: 'Preparing CSV file...',
    });
    
    setTimeout(() => {
      // Mock CSV download
      const csvContent = "data:text/csv;charset=utf-8," + 
        "Date,Transaction Type,Reference Number,Amount,Counter\n" +
        transactionData.map(row => `${row.date},${row.type},${row.refNum},${row.amount},${row.counter}`).join("\n");
      
      const link = document.createElement('a');
      link.setAttribute('href', encodeURI(csvContent));
      link.setAttribute('download', `recon_${partyName}_${jobId}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      addNotification({
        type: 'success',
        title: 'Download Complete',
        message: `Reconciliation report for ${partyName} downloaded successfully.`,
      });
    }, 1500);
  };

  const handleInvestigate = () => {
    navigate(`/conversational-insights?from=${partyName}&jobId=${jobId}`);
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete reconciliation job ${jobId} for ${partyName}?`)) {
      addNotification({
        type: 'success',
        title: 'Job Deleted',
        message: `Reconciliation job ${jobId} has been deleted.`,
      });
      navigate(-1);
    }
  };

  const handleSendChat = () => {
    if (!chatInput.trim()) return;
    
    const userMessage = { type: 'user', text: chatInput };
    const botResponse = {
      type: 'bot',
      text: `Based on the reconciliation data for ${partyName}, I can help you with that. The main discrepancies are in invoices and payments. Would you like me to provide more details?`
    };
    
    setChatMessages([...chatMessages, userMessage, botResponse]);
    setChatInput('');
  };

  return (
    <div className="recon-job-detail-page">
      {/* Header */}
      <div className="recon-job-header">
        <div className="recon-job-title-section">
          <div className="recon-alpha-logo">α</div>
          <div className="recon-onecap-text">OneCap</div>
          <div className="recon-breadcrumb">
            Ledger Reconciliations / <span>{partyName}</span> / <span className="job-id">{jobId}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="recon-job-content">
        {/* Left Section */}
        <div className="recon-job-left">
          {/* Party Name & Actions */}
          <div className="recon-job-top">
            <h1 className="party-name-title">{partyName}</h1>
            <div className="recon-job-actions">
              <span className="date-range">Date Range: 01-02-2026 - 05-02-2026</span>
              <button className="quick-retry-btn" onClick={handleQuickRetry}>Quick Retry</button>
              <button className="retry-btn" onClick={handleRetry}>Retry</button>
              <button className="download-report-btn" onClick={handleDownloadReport}>
                <Download size={16} />
                Download Report
              </button>
              <div className="settings-menu-container">
                <button className="settings-icon-btn" onClick={() => setShowSettingsMenu(!showSettingsMenu)}>
                  <MoreVertical size={20} />
                </button>
                {showSettingsMenu && (
                  <div className="settings-dropdown">
                    <button onClick={handleInvestigate}>
                      <MessageSquare size={16} />
                      Investigate
                    </button>
                    <button onClick={handleDelete} className="delete-option">
                      <X size={16} />
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Financial Summary Tabs */}
          <div className="summary-tabs">
            <button 
              className={`summary-tab ${activeTab === 'financial' ? 'active' : ''}`}
              onClick={() => setActiveTab('financial')}
            >
              Financial Summary
            </button>
            <button 
              className={`summary-tab ${activeTab === 'source' ? 'active' : ''}`}
              onClick={() => setActiveTab('source')}
            >
              Source Data
            </button>
          </div>

          {/* Financial Summary Table */}
          <div className="financial-summary-table">
            <table className="summary-table">
              <thead>
                <tr>
                  <th>Particulars</th>
                  <th>In Yours</th>
                  <th>In Counterparty</th>
                  <th>Difference</th>
                </tr>
              </thead>
              <tbody>
                {financialData.map((row, index) => (
                  <tr key={index} className={row.particular.includes('Balance') ? 'balance-row' : ''}>
                    <td className="particular-cell">{row.particular}</td>
                    <td>{row.inYours}</td>
                    <td>{row.inCounterparty}</td>
                    <td className={parseFloat(row.difference.replace(/,/g, '')) !== 0 ? 'difference-highlight' : ''}>
                      {row.difference}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Detailed Report Section */}
          <div className="detailed-report-section">
            <div className="report-search-bar">
              <Search size={18} className="search-icon" />
              <input type="text" placeholder="Search..." className="report-search-input" />
              <button className="modify-btn">Modify</button>
              <button className="expand-btn">⤢</button>
            </div>

            <div className="report-tabs">
              <button 
                className={`report-tab ${activeReportTab === 'your' ? 'active' : ''}`}
                onClick={() => setActiveReportTab('your')}
              >
                Your Ledger
              </button>
              <button 
                className={`report-tab ${activeReportTab === 'counterparty' ? 'active' : ''}`}
                onClick={() => setActiveReportTab('counterparty')}
              >
                Counterparty Ledger
              </button>
              <button 
                className={`report-tab ${activeReportTab === 'recon' ? 'active' : ''}`}
                onClick={() => setActiveReportTab('recon')}
              >
                Reconciliation Report
              </button>
            </div>

            <div className="report-table-container">
              <table className="report-table">
                <thead>
                  <tr>
                    <th>Date ⇅</th>
                    <th>Transaction Type ⇅</th>
                    <th>Reference Number ⇅</th>
                    <th>Amount ⇅</th>
                    <th>Counter ⇅</th>
                  </tr>
                </thead>
                <tbody>
                  {transactionData.map((row, index) => (
                    <tr key={index}>
                      <td>{row.date}</td>
                      <td>{row.type}</td>
                      <td className="ref-num-cell">{row.refNum}</td>
                      <td>{row.amount}</td>
                      <td>{row.counter}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Sidebar - Recon Agent */}
        <div className="recon-agent-sidebar">
          <div className="recon-agent-header">
            <div className="agent-logo">α</div>
            <div className="agent-title">
              <span className="agent-brand">OneCap</span>
              <span className="agent-name">Recon Agent</span>
            </div>
          </div>

          <div className="agent-content">
            <div className="key-issues-section">
              <h3 className="section-title">🔍 Key Issues</h3>
              <ul className="issues-list">
                <li><strong>7 unmatched invoices</strong> on your side — Oswaal has not recorded these; share invoice copies</li>
                <li><strong>TDS mismatch</strong>: Your consolidated TDS vs Oswaal's per-invoice TDS — reconcile payment-wise</li>
                <li><strong>1 unmatched payment</strong> (₹78,500) — no reference number; confirm receipt with Oswaal</li>
                <li><strong>5 transactions</strong> in Oswaal's records have no match on your side — review and verify</li>
              </ul>
            </div>

            <div className="next-steps-section">
              <h3 className="section-title">💡 Next Steps</h3>
              <ul className="steps-list">
                <li>Share the <strong>7 missing invoices</strong> with Oswaal for acknowledgment</li>
                <li>Reconcile <strong>TDS entries</strong> payment-by-payment to bridge the gap</li>
                <li>Confirm the <strong>₹78,500 payment</strong> reference with Oswaal</li>
              </ul>
            </div>

            {/* Chat Section */}
            <div className="agent-chat-section">
              <div className="chat-messages">
                {chatMessages.map((msg, index) => (
                  <div key={index} className={`chat-message ${msg.type}`}>
                    {msg.text}
                  </div>
                ))}
              </div>
              <div className="chat-input-container">
                <input 
                  type="text" 
                  placeholder="Ask anything..." 
                  className="chat-input"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendChat()}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Retry Modal */}
      {showQuickRetryModal && (
        <div className="modal-overlay">
          <div className="modal-container instructions-modal">
            <button className="modal-close" onClick={() => setShowQuickRetryModal(false)}>
              <X size={20} />
            </button>
            
            <div className="instructions-modal-header">
              <h2 className="instructions-modal-title">Quick Retry Instructions</h2>
            </div>

            <div className="instructions-modal-content">
              <textarea 
                className="instructions-textarea"
                value={quickRetryInstructions}
                onChange={(e) => setQuickRetryInstructions(e.target.value)}
                placeholder="Enter specific instructions for this retry..."
                rows={15}
              />
            </div>

            <div className="modal-footer">
              <button className="modal-cancel-btn" onClick={() => setShowQuickRetryModal(false)}>Cancel</button>
              <button className="modal-save-btn" onClick={() => {
                addNotification({
                  type: 'success',
                  title: 'Retry Initiated',
                  message: 'Reconciliation retry has been queued with your instructions.',
                });
                setShowQuickRetryModal(false);
              }}>
                Submit Retry
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReconJobDetail;
