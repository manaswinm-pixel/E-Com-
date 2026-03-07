import { useState } from 'react';
import { Download, Play, RefreshCw } from 'lucide-react';

const DataPage = () => {
  const [syncing, setSyncing] = useState(false);

  // Generate dates for the last 7 days
  const generateDates = () => {
    const dates = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      dates.push(date.toISOString().split('T')[0]);
    }
    return dates;
  };

  const dates = generateDates();

  const dataSourcesConfig = [
    { name: 'UNICOM - Invoice Report', key: 'unicom-invoice' },
    { name: 'UNICOM - Report', key: 'unicom-report' },
    { name: 'Shopify - Order Report', key: 'shopify-order' },
    { name: 'Shopify - Gift Card Report', key: 'shopify-giftcard' },
    { name: 'Razorpay Report', key: 'razorpay' },
    { name: 'Bluedart Logistics', key: 'bluedart' },
    { name: 'Delhivery Logistics', key: 'delhivery' },
  ];

  // Generate random status for demo
  const getRandomStatus = () => {
    const statuses = ['success', 'queued', 'failed'];
    return statuses[Math.floor(Math.random() * statuses.length)];
  };

  // Generate mock data
  const generateMockData = () => {
    const data = {};
    dataSourcesConfig.forEach((source) => {
      data[source.key] = {};
      dates.forEach((date) => {
        data[source.key][date] = getRandomStatus();
      });
    });
    return data;
  };

  const [syncData, setSyncData] = useState(generateMockData());

  const handleDailySync = () => {
    setSyncing(true);
    setTimeout(() => {
      setSyncData(generateMockData());
      setSyncing(false);
    }, 1500);
  };

  const handleDownload = (date) => {
    // Create a simple CSV content
    let csvContent = 'Data Source,Status\n';
    dataSourcesConfig.forEach((source) => {
      const status = syncData[source.key][date];
      csvContent += `${source.name},${status}\n`;
    });

    // Create blob and download
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `recon-data-${date}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const handleQuickRecon = (date) => {
    alert(`Initiating quick reconciliation for ${date}...`);
  };

  const getStatusDisplay = (status) => {
    const config = {
      success: { text: 'Success', color: '#d1fae5', textColor: '#065f46' },
      queued: { text: 'Queued', color: '#fef3c7', textColor: '#92400e' },
      failed: { text: 'Failed', color: '#fee2e2', textColor: '#991b1b' },
    };
    return config[status] || config.queued;
  };

  return (
    <div className="data-page-content" data-testid="data-page">
      <header className="dashboard-header">
        <h1 className="dashboard-title">Data Sync Management</h1>
        <button
          className="sync-button"
          onClick={handleDailySync}
          disabled={syncing}
          data-testid="daily-sync-button"
        >
          <RefreshCw size={18} className={syncing ? 'spinning' : ''} />
          {syncing ? 'Syncing...' : 'Daily Sync'}
        </button>
      </header>

      <div className="data-sync-table-container">
        <div className="table-wrapper data-sync-wrapper">
          <table className="data-sync-table">
            <thead>
              <tr>
                <th className="sticky-col">Data Source</th>
                {dates.map((date) => (
                  <th key={date} className="date-col">
                    <div className="date-header">
                      {new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {dataSourcesConfig.map((source) => (
                <tr key={source.key}>
                  <td className="sticky-col source-name">{source.name}</td>
                  {dates.map((date) => {
                    const status = syncData[source.key][date];
                    const statusConfig = getStatusDisplay(status);
                    return (
                      <td key={date} className="status-cell">
                        <div
                          className="status-indicator"
                          style={{
                            backgroundColor: statusConfig.color,
                            color: statusConfig.textColor,
                          }}
                        >
                          {statusConfig.text}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
              {/* Action Row */}
              <tr className="action-row">
                <td className="sticky-col">Actions</td>
                {dates.map((date) => (
                  <td key={date} className="action-cell">
                    <div className="action-buttons">
                      <button
                        className="icon-button download-btn"
                        onClick={() => handleDownload(date)}
                        title="Download data"
                        data-testid={`download-${date}`}
                      >
                        <Download size={16} />
                      </button>
                      <button
                        className="icon-button recon-btn"
                        onClick={() => handleQuickRecon(date)}
                        title="Quick Recon"
                        data-testid={`quick-recon-${date}`}
                      >
                        <Play size={16} />
                      </button>
                    </div>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DataPage;