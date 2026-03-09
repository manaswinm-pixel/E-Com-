import { useState, useRef, useEffect } from 'react';
import { Send, Star, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const ConversationalInsights = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [viewMode, setViewMode] = useState({});
  const messagesEndRef = useRef(null);

  const arQuestions = [
    'Top 10 due invoices that can be collected?',
    'Top 10 customers who owe us money?'
  ];

  const mockResponses = {
    'Top 10 due invoices that can be collected?': {
      title: 'Top 10 Overdue Invoices (Most Collectible)',
      description: 'Here are the top 10 overdue invoices that can be targeted for collection, sorted by the highest number of overdue days:',
      tableData: [
        { rank: 1, partyShortName: 'BUDGET SIGNS UNIT 1', partyName: 'BUDGET SIGNS UNIT 1', docNo: '639', docDate: '2018-10-30' },
        { rank: 2, partyShortName: 'SINEX SYSTEMS PVT LTD', partyName: 'SINEX SYSTEMS PVT LTD', docNo: '736', docDate: '2018-11-26' },
        { rank: 3, partyShortName: 'CLASSIC SIGNAGES PVT LTD', partyName: 'CLASSIC SIGNAGES PVT LTD', docNo: '837', docDate: '2018-12-21' },
      ],
      chartData: [
        { name: 'BUDGET SIGNS', value: 639 },
        { name: 'SINEX SYSTEMS', value: 736 },
        { name: 'CLASSIC SIGNAGES', value: 837 },
      ],
      keyInsights: [
        'The receivables highlighted above are extremely overdue (ranging from ~5 to 7 years past due). Immediate attention is advised for follow-up.',
        'Several high-value invoices (up to ₹19 lakh+) are collectible – especially for \'SINEX SYSTEMS PVT LTD\' and \'CLASSIC SIGNAGES PVT LTD\'.',
        'Action on these could result in substantial AR recovery.'
      ],
      explanation: {
        title: 'What does "due" mean here?',
        points: [
          'Invoice is considered \'due\' if the number of days since issue (\'Age\') is greater than the allowed credit days.',
          'Only positive amount invoices are shown (debit/receivable, not credits or adjustments).'
        ]
      },
      followUp: 'Want to see more details for a specific party, or summarize all old due invoices by customer?',
      suggestedFollowUps: [
        'Show party-wise total oldest AR due for collection'
      ]
    },
    'Top 10 customers who owe us money?': {
      title: 'Top 10 Customers by Outstanding AR',
      description: 'Here are the customers with the highest outstanding accounts receivable:',
      tableData: [
        { rank: 1, customerName: 'ABC RETAIL PVT LTD', outstanding: '₹25.8 lakh', avgDelay: '45 days', lastPayment: '2024-11-15' },
        { rank: 2, customerName: 'XYZ TRADERS', outstanding: '₹19.2 lakh', avgDelay: '32 days', lastPayment: '2024-11-28' },
        { rank: 3, customerName: 'MODERN STORES', outstanding: '₹18.5 lakh', avgDelay: '28 days', lastPayment: '2024-12-05' },
      ],
      chartData: [
        { name: 'ABC RETAIL', value: 25.8 },
        { name: 'XYZ TRADERS', value: 19.2 },
        { name: 'MODERN STORES', value: 18.5 },
      ],
      keyInsights: [
        'Top 3 customers account for ₹63.5 lakh in outstanding AR',
        'Average payment delay across these customers is 35 days',
        'ABC RETAIL PVT LTD requires immediate follow-up'
      ],
      explanation: {
        title: 'Understanding AR Aging',
        points: [
          'Outstanding amounts include all unpaid invoices beyond due date',
          'Average delay calculated from original invoice due dates'
        ]
      },
      followUp: 'Would you like to see detailed payment history for any specific customer?',
      suggestedFollowUps: [
        'Show payment trends for ABC RETAIL',
        'Compare AR aging across all customers'
      ]
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleQuestionClick = (question) => {
    const userMessage = {
      type: 'user',
      content: question
    };

    const response = mockResponses[question] || mockResponses['Top 10 due invoices that can be collected?'];
    
    const botMessage = {
      type: 'bot',
      ...response,
      id: Date.now()
    };

    setMessages([...messages, userMessage, botMessage]);
    setViewMode({ ...viewMode, [botMessage.id]: 'table' });
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;
    
    const response = mockResponses[inputValue] || mockResponses['Top 10 due invoices that can be collected?'];
    
    const userMessage = {
      type: 'user',
      content: inputValue
    };

    const botMessage = {
      type: 'bot',
      ...response,
      id: Date.now()
    };

    setMessages([...messages, userMessage, botMessage]);
    setViewMode({ ...viewMode, [botMessage.id]: 'table' });
    setInputValue('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const toggleViewMode = (messageId, mode) => {
    setViewMode({ ...viewMode, [messageId]: mode });
  };

  return (
    <div className="chat-interface-main" data-testid="conversational-insights-page">
      <div className="chat-header-bar">
        <div className="chat-header-buttons">
          <button className="chat-tab-btn">Dashboard</button>
          <button className="chat-tab-btn active">Chat</button>
        </div>
      </div>

      <div className="chat-messages-area">
        {messages.length === 0 && (
          <div className="chat-empty-state">
            <p className="empty-state-text">Start a conversation by asking a question below</p>
          </div>
        )}
        
        {messages.map((message, index) => (
          <div key={index} className={`chat-message-wrapper ${message.type}`}>
            {message.type === 'user' ? (
              <div className="user-message-card">
                {message.content}
              </div>
            ) : (
              <div className="bot-response-container">
                <div className="bot-response-title">
                  {message.title}
                </div>
                
                <div className="bot-response-content">
                  <p className="bot-description">{message.description}</p>
                  
                  <div className="toggle-buttons-container">
                    <button 
                      className={`toggle-mode-btn ${viewMode[message.id] === 'table' ? 'active' : ''}`}
                      onClick={() => toggleViewMode(message.id, 'table')}
                    >
                      <span className="toggle-icon">▦</span> Table
                    </button>
                    <button 
                      className={`toggle-mode-btn ${viewMode[message.id] === 'chart' ? 'active' : ''}`}
                      onClick={() => toggleViewMode(message.id, 'chart')}
                    >
                      <span className="toggle-icon">📊</span> Chart
                    </button>
                  </div>

                  {viewMode[message.id] === 'table' ? (
                    <div className="response-table-wrapper">
                      <table className="response-data-table">
                        <thead>
                          <tr>
                            {Object.keys(message.tableData[0]).map((key) => (
                              <th key={key}>
                                {key.replace(/([A-Z])/g, ' $1').trim().replace(/^./, str => str.toUpperCase())}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {message.tableData.map((row, i) => (
                            <tr key={i}>
                              {Object.values(row).map((val, j) => (
                                <td key={j}>{val}</td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="response-chart-wrapper">
                      <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={message.chartData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey={Object.keys(message.chartData[0])[0]} />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="value" fill="#003DA5" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  )}

                  {message.keyInsights && (
                    <div className="insights-block">
                      <h4 className="insights-heading">Key Insights:</h4>
                      <ul className="insights-bullet-list">
                        {message.keyInsights.map((insight, i) => (
                          <li key={i}>{insight}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {message.explanation && (
                    <div className="explanation-block">
                      <h4 className="explanation-heading">{message.explanation.title}</h4>
                      <ul className="explanation-bullet-list">
                        {message.explanation.points.map((point, i) => (
                          <li key={i}>{point}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {message.followUp && (
                    <p className="followup-question">{message.followUp}</p>
                  )}

                  {message.suggestedFollowUps && (
                    <div className="suggested-followups-block">
                      <h5 className="followups-label">Suggested follow-ups:</h5>
                      {message.suggestedFollowUps.map((followup, i) => (
                        <div key={i} className="followup-link-item" onClick={() => setInputValue(followup)}>
                          {followup} ↗
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="ar-questions-card">
                    <h4 className="ar-card-title">AR Questions</h4>
                    <div className="ar-questions-items">
                      {arQuestions.map((q, i) => (
                        <div key={i} className="ar-question-row" onClick={() => handleQuestionClick(q)}>
                          <TrendingUp size={16} className="ar-icon" /> {q}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input-fixed-container">
        <div className="chat-input-box">
          <Star className="input-icon-star" size={20} />
          <input
            type="text"
            placeholder="Ask anything about your financial data"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            className="chat-text-input"
          />
          <button className="send-icon-button" onClick={handleSend}>
            <Send size={18} />
          </button>
        </div>
        <button className="ar-main-button">☆ AR</button>
        <p className="bottom-disclaimer">OneCap AI Analyst can make mistakes. Check important information</p>
      </div>
    </div>
  );
};

export default ConversationalInsights;
