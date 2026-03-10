import { useState } from 'react';
import { Search, Edit3, Plus, ArrowRight } from 'lucide-react';

const EcommerceReconciliation = ({ addNotification, reconType = 'E-Commerce' }) => {
  const [activeTab, setActiveTab] = useState('parties');
  const [searchQuery, setSearchQuery] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Mock data for parties
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

  const handleEditInstructions = () => {
    addNotification({
      type: 'info',
      title: 'Edit Instructions',
      message: 'Opening instruction editor...',
    });
  };

  const handleNewRecon = () => {
    addNotification({
      type: 'success',
      title: 'New Reconciliation',
      message: 'Creating new reconciliation job...',
    });
  };

  const handleInstructionClick = (partyName) => {
    addNotification({
      type: 'info',
      title: 'Instructions',
      message: `Viewing instructions for ${partyName}`,
    });
  };

  const filteredData = partiesData.filter(party => 
    party.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + rowsPerPage);

  return (
    <div className="recon-page-container">
      {/* Header */}
      <div className="recon-header">
        <div className="recon-logo-title">
          <div className="recon-alpha-logo">α</div>
          <div className="recon-onecap-text">OneCap</div>
          <div className="recon-page-title">{reconType} Reconciliations</div>
        </div>
      </div>

      {/* Content Area */}
      <div className="recon-content-area">
        {/* Tabs and Controls */}
        <div className="recon-controls-row">
          <div className="recon-tabs">
            <button 
              className={`recon-tab ${activeTab === 'parties' ? 'active' : ''}`}
              onClick={() => setActiveTab('parties')}
            >
              Parties
            </button>
            <button 
              className={`recon-tab ${activeTab === 'recons' ? 'active' : ''}`}
              onClick={() => setActiveTab('recons')}
            >
              Recons
            </button>
          </div>
          
          <button className="recon-edit-instructions-btn" onClick={handleEditInstructions}>
            <Edit3 size={16} />
            Edit Instructions
          </button>
        </div>

        {/* Search and Action Bar */}
        <div className="recon-action-bar">
          <div className="recon-search-container">
            <Search size={18} className="search-icon" />
            <input 
              type="text" 
              placeholder="Search entities..." 
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
              {paginatedData.map((party, index) => (
                <tr key={index}>
                  <td className="party-name">{party.name}</td>
                  <td className="recon-run">{party.latestRun}</td>
                  <td className="recon-period">{party.period}</td>
                  <td>
                    <span className={`status-number ${party.completed > 0 ? 'completed' : ''}`}>
                      {party.completed}
                    </span>
                  </td>
                  <td>
                    <span className={`status-number ${party.processing > 0 ? 'processing' : ''}`}>
                      {party.processing}
                    </span>
                  </td>
                  <td>
                    <button 
                      className="instruction-icon-btn"
                      onClick={() => handleInstructionClick(party.name)}
                    >
                      <ArrowRight size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="recon-pagination">
          <div className="pagination-info">
            Page {currentPage} of {totalPages}
          </div>
          <div className="pagination-controls">
            <span className="rows-label">Rows per page</span>
            <select 
              value={rowsPerPage} 
              onChange={(e) => setRowsPerPage(Number(e.target.value))}
              className="rows-select"
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
            <span className="pagination-range">
              {startIndex + 1}-{Math.min(startIndex + rowsPerPage, filteredData.length)} of {filteredData.length}
            </span>
            <div className="pagination-arrows">
              <button 
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="pagination-arrow"
              >
                ‹
              </button>
              <button 
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="pagination-arrow"
              >
                ›
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EcommerceReconciliation;
