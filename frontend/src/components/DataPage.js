import { useState } from 'react';
import { Download, Play, RefreshCw, Check, Hourglass } from 'lucide-react';

const DataPage = ({ addNotification }) => {
  const [syncing, setSyncing] = useState(false);

  // Generate dates for the last 7 days
  const generateDates = () => {
    const dates = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      dates.push({
        date: date.toISOString().split('T')[0],
        display: `${day}/${month}/${year}`,
      });
    }
    return dates;
  };

  const dates = generateDates();

  const dataSourcesConfig = [
    { name: 'UNICOM - Invoice Report', key: 'unicom-invoice', url: 'https://unicom.example.com/invoices' },
    { name: 'UNICOM - Report', key: 'unicom-report', url: 'https://unicom.example.com/reports' },
    { name: 'Shopify - Order Report', key: 'shopify-order', url: 'https://shopify.com/admin/orders' },
    { name: 'Shopify - Gift Card Report', key: 'shopify-giftcard', url: 'https://shopify.com/admin/gift_cards' },
    { name: 'Razorpay Report', key: 'razorpay', url: 'https://dashboard.razorpay.com/app/transactions' },
    { name: 'Bluedart Logistics', key: 'bluedart', url: 'https://www.bluedart.com/tracking' },
    { name: 'Delhivery Logistics', key: 'delhivery', url: 'https://www.delhivery.com/track' },
  ];

  // Track clicks for double-click detection
  const [clickTimers, setClickTimers] = useState({});

  // Generate status: only Success and Queued, 3-4 items queued
  const generateStatus = () => {
    const totalItems = dates.length * dataSourcesConfig.length;
    const queuedCount = 3 + Math.floor(Math.random() * 2); // 3 or 4 items queued
    const queuedIndices = new Set();

    while (queuedIndices.size < queuedCount) {
      queuedIndices.add(Math.floor(Math.random() * totalItems));
    }

    const data = {};
    dates.forEach((date, dateIdx) => {
      data[date.date] = {};
      dataSourcesConfig.forEach((source, sourceIdx) => {
        const idx = dateIdx * dataSourcesConfig.length + sourceIdx;
        data[date.date][source.key] = queuedIndices.has(idx) ? 'queued' : 'success';
      });
    });
    return data;
  };

  const [syncData, setSyncData] = useState(generateStatus());

  const handleStatusClick = (date, sourceKey, sourceName, url) => {
    const clickKey = `${date}-${sourceKey}`;

    // If there's already a timer, it's a double click
    if (clickTimers[clickKey]) {
      clearTimeout(clickTimers[clickKey]);
      setClickTimers((prev) => {
        const newTimers = { ...prev };
        delete newTimers[clickKey];
        return newTimers;
      });

      // Double click - open URL
      window.open(url, '_blank');
    } else {
      // Single click - show re-initiation notification
      addNotification({
        type: 'info',
        title: 'Agent Re-Initiated',
        message: `Re-initiating data fetch for ${sourceName} on ${date}`,
      });

      // After 2 seconds, show completion notification
      setTimeout(() => {
        addNotification({
          type: 'success',
          title: 'Process Completed',
          message: `Data fetch completed successfully for ${sourceName} on ${date}`,
        });
      }, 2000);

      const timer = setTimeout(() => {
        setClickTimers((prev) => {
          const newTimers = { ...prev };
          delete newTimers[clickKey];
          return newTimers;
        });
      }, 300); // 300ms window for double click

      setClickTimers((prev) => ({ ...prev, [clickKey]: timer }));
    }
  };

  const handleDailySync = () => {
    setSyncing(true);
    addNotification({
      type: 'info',
      title: 'Sync Started',
      message: 'Daily data sync is in progress...',
    });

    setTimeout(() => {
      setSyncData(generateStatus());
      setSyncing(false);
      addNotification({
        type: 'success',
        title: 'Sync Complete',
        message: 'All data sources have been synchronized successfully.',
      });
    }, 2000);
  };

  const handleDownload = (date) => {
    addNotification({
      type: 'info',
      title: 'Download Started',
      message: `Preparing data for ${date}...`,
    });

    setTimeout(() => {
      let csvContent = 'Data Source,Status\\n';
      dataSourcesConfig.forEach((source) => {
        const status = syncData[date][source.key];
        csvContent += `${source.name},${status}\\n`;
      });

      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `recon-data-${date}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);

      addNotification({
        type: 'success',
        title: 'Data Downloaded',
        message: `Successfully downloaded data for ${date}`,
      });
    }, 500);
  };

  const handleQuickRecon = (date) => {
    addNotification({
      type: 'info',
      title: 'Job Started',
      message: `Quick reconciliation initiated for ${date}`,
    });

    setTimeout(() => {
      addNotification({
        type: 'success',
        title: 'Job Done',
        message: `Reconciliation completed for ${date}. 156 records processed.`,
      });
    }, 3000);
  };

  const getStatusDisplay = (status) => {
    const config = {
      success: {
        icon: <Check size={18} strokeWidth={2.5} />,
        color: '#f9fafb',
        iconColor: '#374151',
        borderColor: '#e5e7eb'
      },
      queued: {
        icon: <Hourglass size={18} strokeWidth={2} />,
        color: '#f9fafb',
        iconColor: '#6b7280',
        borderColor: '#e5e7eb',
        isQueued: true
      },
    };
    return config[status];
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

      <div className="data-sync-table-container flipped-layout">
        <div className="table-wrapper data-sync-wrapper">
          <table className="data-sync-table flipped">
            <thead>
              <tr>
                <th className="sticky-col date-col-header">Date</th>
                {dataSourcesConfig.map((source) => (
                  <th key={source.key} className="source-col-header">
                    {source.name}
                  </th>
                ))}
                <th className="action-col-header">Actions</th>
              </tr>
            </thead>
            <tbody>
              {dates.map((dateObj) => (
                <tr key={dateObj.date}>
                  <td className="sticky-col date-cell">{dateObj.display}</td>
                  {dataSourcesConfig.map((source) => {
                    const status = syncData[dateObj.date][source.key];
                    const statusConfig = getStatusDisplay(status);
                    return (
                      <td key={source.key} className="status-cell">
                        <button
                          className="status-indicator-icon clickable"
                          style={{
                            backgroundColor: statusConfig.color,
                            color: statusConfig.iconColor,
                            border: `1px solid ${statusConfig.borderColor}`,
                            borderRadius: statusConfig.isQueued ? '50%' : '8px'
                          }}
                          onClick={() => handleStatusClick(dateObj.date, source.key, source.name, source.url)}
                          title="Single click: Re-initiate | Double click: Open website"
                        >
                          {statusConfig.icon}
                        </button>
                      </td>
                    );
                  })}
                  <td className="action-cell">
                    <div className="action-buttons">
                      <button
                        className="icon-button download-btn"
                        onClick={() => handleDownload(dateObj.date)}
                        title="Download data"
                        data-testid={`download-${dateObj.date}`}
                      >
                        <Download size={16} />
                      </button>
                      <button
                        className="icon-button recon-btn"
                        onClick={() => handleQuickRecon(dateObj.date)}
                        title="Quick Recon"
                        data-testid={`quick-recon-${dateObj.date}`}
                      >
                        <Play size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DataPage;
