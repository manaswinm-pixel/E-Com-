import { useState, useRef, useEffect } from 'react';
import { Search, Sparkles, Table as TableIcon, BarChart3 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const ConversationalInsights = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeResponse, setActiveResponse] = useState(null);
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'chart'
  const [showQuestions, setShowQuestions] = useState(false);

  const preBuiltQuestions = [
    'Cash Flow Forecast',
    'Revenue Growth',
    'Overdue Invoices',
    'Profitability',
    'Burn Rate/Runway'
  ];

  const arQuestions = [
    'Show me overdue invoices',
    'What is my DSO?',
    'Customer payment trends',
    'Collections forecast',
    'AR aging analysis'
  ];

  const mockResponses = {
    'Cash Flow Forecast': {
      title: 'Cash Flow Forecast for Next 30 Days',
      description: 'Based on current receivables, payables, and historical patterns, here\'s your projected cash flow:',
      tableData: [
        { date: 'Week 1', inflow: '₹125.5 Cr', outflow: '₹98.2 Cr', net: '₹27.3 Cr' },
        { date: 'Week 2', inflow: '₹142.8 Cr', outflow: '₹105.6 Cr', net: '₹37.2 Cr' },
        { date: 'Week 3', inflow: '₹138.4 Cr', outflow: '₹112.3 Cr', net: '₹26.1 Cr' },
        { date: 'Week 4', inflow: '₹156.2 Cr', outflow: '₹108.9 Cr', net: '₹47.3 Cr' },
      ],
      chartData: [
        { week: 'W1', value: 27.3 },
        { week: 'W2', value: 37.2 },
        { week: 'W3', value: 26.1 },
        { week: 'W4', value: 47.3 },
      ],
      insights: [
        'Net cash flow expected to remain positive throughout the period',
        'Week 4 shows the strongest inflow at ₹156.2 Cr',
        'Average weekly net cash flow: ₹34.5 Cr'
      ],
      followUps: [
        'What if payment delays increase by 10%?',
        'Show me cash flow by customer segment',
        'Compare with last quarter'
      ]
    },
    'Revenue Growth': {
      title: 'Revenue Growth Analysis',
      description: 'Comprehensive revenue growth trends across all channels and segments:',
      tableData: [
        { month: 'Jan', revenue: '₹245.5 Cr', growth: '+15.3%', target: '92%' },
        { month: 'Feb', revenue: '₹268.2 Cr', growth: '+18.7%', target: '98%' },
        { month: 'Mar', revenue: '₹289.4 Cr', growth: '+22.1%', target: '105%' },
        { month: 'Apr', revenue: '₹312.8 Cr', growth: '+25.5%', target: '112%' },
      ],
      chartData: [
        { month: 'Jan', value: 245.5 },
        { month: 'Feb', value: 268.2 },
        { month: 'Mar', value: 289.4 },
        { month: 'Apr', value: 312.8 },
      ],
      insights: [
        'Consistent month-over-month growth averaging 20.4%',
        'Exceeding quarterly targets by 7%',
        'Digital channels contributing 68% of growth'
      ],
      followUps: [
        'Break down by product category',
        'Show customer acquisition vs retention revenue',
        'Forecast next quarter'
      ]
    },
    'Overdue Invoices': {
      title: 'Overdue Invoices Summary',
      description: 'Current status of overdue accounts receivable with aging breakdown:',
      tableData: [
        { aging: '0-30 days', count: '45', amount: '₹25.3 Cr', percent: '35%' },
        { aging: '31-60 days', count: '28', amount: '₹18.7 Cr', percent: '26%' },
        { aging: '61-90 days', count: '15', amount: '₹12.4 Cr', percent: '17%' },
        { aging: '90+ days', count: '22', amount: '₹15.8 Cr', percent: '22%' },
      ],
      chartData: [
        { aging: '0-30', value: 25.3 },
        { aging: '31-60', value: 18.7 },
        { aging: '61-90', value: 12.4 },
        { aging: '90+', value: 15.8 },
      ],
      insights: [
        'Total overdue: ₹72.2 Cr across 110 invoices',
        'Top 3 customers account for 42% of overdue amount',
        'Collection efficiency decreased by 5% this month'
      ],
      followUps: [
        'Which customers have the most overdue?',
        'Generate collection priority list',
        'Show payment commitment status'
      ]
    }
  };

  const handleQuestionClick = (question) => {
    setSearchQuery(question);
    const response = mockResponses[question];
    if (response) {
      setActiveResponse(response);
      setViewMode('table');
    }
  };

  const handleSearch = () => {
    const response = mockResponses[searchQuery] || mockResponses['Cash Flow Forecast'];
    setActiveResponse(response);
    setViewMode('table');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="conversational-insights-redesign" data-testid="conversational-insights-page">
      {!activeResponse ? (
        <>
          {/* Landing Page */}
          <div className="insights-landing">
            <div className="insights-hero">
              <div className="alpha-symbol">α</div>
              <h1 className="insights-title">Business Intelligence</h1>
              <p className="insights-subtitle">Instant Insights</p>
            </div>

            {/* Search Bar */}
            <div className="insights-search-container">
              <div className="insights-search-box">
                <Sparkles className="search-icon" size={20} />
                <input
                  type="text"
                  className="insights-search-input"
                  placeholder="Ask about cash flow, revenue, invoices..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  onFocus={() => setShowQuestions(true)}
                />
              </div>
              
              {/* Pre-built Questions */}
              <div className="prebuilt-questions">
                {preBuiltQuestions.map((question, index) => (
                  <button
                    key={index}
                    className="question-chip"
                    onClick={() => handleQuestionClick(question)}
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Response View */}
          <div className="insights-response">
            {/* Header */}
            <div className="response-header">
              <h2 className="response-title">{activeResponse.title}</h2>
              <button 
                className="new-query-btn"
                onClick={() => setActiveResponse(null)}
              >
                New Query
              </button>
            </div>

            <p className="response-description">{activeResponse.description}</p>

            {/* Table/Chart Toggle */}
            <div className="view-toggle">
              <button
                className={`toggle-btn ${viewMode === 'table' ? 'active' : ''}`}
                onClick={() => setViewMode('table')}
              >
                <TableIcon size={16} />
                Table
              </button>
              <button
                className={`toggle-btn ${viewMode === 'chart' ? 'active' : ''}`}
                onClick={() => setViewMode('chart')}
              >
                <BarChart3 size={16} />
                Chart
              </button>
            </div>

            {/* Data Display */}
            {viewMode === 'table' ? (
              <div className="response-table-container">
                <table className="response-table">
                  <thead>
                    <tr>
                      {Object.keys(activeResponse.tableData[0]).map((key) => (
                        <th key={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {activeResponse.tableData.map((row, index) => (
                      <tr key={index}>
                        {Object.values(row).map((value, i) => (
                          <td key={i}>{value}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="response-chart-container">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={activeResponse.chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey={Object.keys(activeResponse.chartData[0])[0]} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#66B3FF" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}

            {/* Key Insights */}
            <div className="insights-section">
              <h3 className="section-title">Key Insights</h3>
              <ul className="insights-list">
                {activeResponse.insights.map((insight, index) => (
                  <li key={index}>{insight}</li>
                ))}
              </ul>
            </div>

            {/* Suggested Follow-ups */}
            <div className="followups-section">
              <h4 className="section-subtitle">Suggested Follow-ups</h4>
              <div className="followup-chips">
                {activeResponse.followUps.map((followup, index) => (
                  <button key={index} className="followup-chip">
                    {followup}
                  </button>
                ))}
              </div>
            </div>

            {/* AR Questions Box */}
            <div className="ar-questions-box">
              <h4 className="ar-title">AR Questions</h4>
              <div className="ar-questions-grid">
                {arQuestions.map((question, index) => (
                  <button 
                    key={index} 
                    className="ar-question-btn"
                    onClick={() => handleQuestionClick(question)}
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Search Bar */}
          <div className="bottom-search-bar">
            <Sparkles className="search-icon-small" size={18} />
            <input
              type="text"
              className="bottom-search-input"
              placeholder="Ask anything about your financial data..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default ConversationalInsights;
