import { useState, useRef, useEffect } from 'react';
import { Send, Star, TrendingUp, ThumbsUp, ThumbsDown, Copy, ChevronLeft, ChevronRight } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ConversationalInsights = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [viewMode, setViewMode] = useState({});
  const [showFAQ, setShowFAQ] = useState(false);
  const messagesEndRef = useRef(null);

  const preBuiltQuestions = [
    '★ Cash Flow Forecast',
    '★ Revenue Growth',
    '★ Overdue Invoices',
    '★ Profitability',
    '★ Burn Rate / Runway'
  ];

  const faqSuggestions = [
    'Top 10 due invoices that can be collected?',
    'Top 10 customers who owe us money?',
    'What is my current DSO?',
    'Show revenue trends by month',
    'List all overdue invoices'
  ];

  const mockResponses = {
    'Top 10 due invoices that can be collected?': {
      title: 'Top 10 Overdue Invoices (Most Collectible)',
      description: 'Here are the top 10 overdue invoices that can be targeted for collection, sorted by the highest number of overdue days:',
      tableData: [
        { rank: 1, partyShortName: 'BUDGET SIGNS UNIT 1', partyName: 'BUDGET SIGNS UNIT 1', docNo: 639, docDate: '2018-10-30', amount: 8432.0, daysOverdue: 2450, creditDays: 30, dueDate: '2018-11-29', region: 'Not Applicable', status: 'NOT APPLIED/ABLE' },
        { rank: 2, partyShortName: 'SINEX SYSTEMS PVT LTD', partyName: 'SINEX SYSTEMS PVT LTD', docNo: 736, docDate: '2018-11-26', amount: 19218.0, daysOverdue: 2424, creditDays: 30, dueDate: '2018-12-26', region: 'Not Applicable', status: 'NOT APPLIED/ABLE' },
        { rank: 3, partyShortName: 'CLASSIC SIGNAGES PVT LTD', partyName: 'CLASSIC SIGNAGES PVT LTD', docNo: 837, docDate: '2018-12-21', amount: 1354.0, daysOverdue: 2399, creditDays: 30, dueDate: '2019-01-20', region: 'Not Applicable', status: 'NOT APPLIED/ABLE' },
        { rank: 4, partyShortName: 'CLASSIC SIGNAGES PVT LTD', partyName: 'CLASSIC SIGNAGES PVT LTD', docNo: 838, docDate: '2018-12-21', amount: 17186.0, daysOverdue: 2424, creditDays: 30, dueDate: '2018-01-20', region: 'Not Applicable', status: 'NOT APPLIED/ABLE' },
        { rank: 5, partyShortName: 'CLASSIC SIGNAGES PVT LTD', partyName: 'CLASSIC SIGNAGES PVT LTD', docNo: 407, docDate: '2019-11-11', amount: 3358, daysOverdue: 2103, creditDays: 30, dueDate: '2019-12-11', region: '', status: '' },
        { rank: 6, partyShortName: 'CLASSIC SIGNAGES PVT LTD', partyName: 'CLASSIC SIGNAGES PVT LTD', docNo: 486, docDate: '2019-11-11', amount: 1783.0, daysOverdue: 2162, creditDays: 30, dueDate: '2019-12-11', region: '', status: '' },
        { rank: 7, partyShortName: 'BUDGET SIGNS UNIT 1', partyName: 'BUDGET SIGNS UNIT 1', docNo: 488, docDate: '2019-11-12', amount: 8302, daysOverdue: 2162, creditDays: 30, dueDate: '2019-12-12', region: '', status: '' },
        { rank: 8, partyShortName: 'SINEX SYSTEMS PVT LTD', partyName: 'SINEX SYSTEMS PVT LTD', docNo: 468, docDate: '2020-01-14', amount: 6138.0, daysOverdue: 2138, creditDays: 30, dueDate: '2020-02-13', region: '', status: '' },
        { rank: 9, partyShortName: 'SINEX SYSTEMS PVT LTD', partyName: 'SINEX SYSTEMS PVT LTD', docNo: 467, docDate: '2020-01-14', amount: 10129.0, daysOverdue: 2138, creditDays: 30, dueDate: '2020-02-13', region: '', status: '' },
        { rank: 10, partyShortName: 'CLASSIC SIGNAGES PVT LTD', partyName: 'CLASSIC SIGNAGES PVT LTD', docNo: 357, docDate: '2020-03-17', amount: 104, daysOverdue: 1962, creditDays: 30, dueDate: '2020-04-16', region: '', status: '' }
      ],
      chartData: [
        { rank: 1, value: 8432 },
        { rank: 2, value: 19218 },
        { rank: 3, value: 1354 },
        { rank: 4, value: 17186 },
        { rank: 5, value: 3358 },
        { rank: 6, value: 1783 },
        { rank: 7, value: 8302 },
        { rank: 8, value: 6138 },
        { rank: 9, value: 10129 },
        { rank: 10, value: 104 }
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
        'Show party-wise total oldest AR due for collection',
        'List all invoices due above ₹1 lakh for follow-up'
      ]
    },
    '★ Overdue Invoices': {
      title: 'Top 10 Overdue Invoices (Most Collectible)',
      description: 'Here are the top 10 overdue invoices that can be targeted for collection, sorted by the highest number of overdue days:',
      tableData: [
        { rank: 1, partyShortName: 'BUDGET SIGNS UNIT 1', partyName: 'BUDGET SIGNS UNIT 1', docNo: 639, docDate: '2018-10-30', amount: 8432.0, daysOverdue: 2450, creditDays: 30, dueDate: '2018-11-29', region: 'Not Applicable', status: 'NOT APPLIED/ABLE' },
        { rank: 2, partyShortName: 'SINEX SYSTEMS PVT LTD', partyName: 'SINEX SYSTEMS PVT LTD', docNo: 736, docDate: '2018-11-26', amount: 19218.0, daysOverdue: 2424, creditDays: 30, dueDate: '2018-12-26', region: 'Not Applicable', status: 'NOT APPLIED/ABLE' },
        { rank: 3, partyShortName: 'CLASSIC SIGNAGES PVT LTD', partyName: 'CLASSIC SIGNAGES PVT LTD', docNo: 837, docDate: '2018-12-21', amount: 1354.0, daysOverdue: 2399, creditDays: 30, dueDate: '2019-01-20', region: 'Not Applicable', status: 'NOT APPLIED/ABLE' }
      ],
      chartData: [
        { rank: 1, value: 8432 },
        { rank: 2, value: 19218 },
        { rank: 3, value: 1354 }
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
        'Show party-wise total oldest AR due for collection',
        'List all invoices due above ₹1 lakh for follow-up'
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
    const cleanQuestion = question.replace('★ ', '');
    
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
    setViewMode({ ...viewMode, [botMessage.id]: 'chart' });
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
    setViewMode({ ...viewMode, [botMessage.id]: 'chart' });
    setInputValue('');
    setShowFAQ(false);
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
      {messages.length === 0 ? (
        <div className="conversational-insights-redesign-v2">
          <div className="curved-background"></div>
          
          <div className="insights-content-v2">
            <div className="alpha-symbol-v2">α</div>
            <h1 className="insights-title-v2">Business Intelligence, Instant Insights.</h1>
            
            <div className="insights-search-bar-v2">
              <div className="search-icon-circle">
                <Star size={16} />
              </div>
              <input
                type="text"
                className="search-input-v2"
                placeholder="Ask me anything about your financial data...(try typing @ to mention a specific report type)"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                onClick={() => setShowFAQ(true)}
                onBlur={() => setTimeout(() => setShowFAQ(false), 300)}
              />
              <button className="send-button-v2" onClick={handleSend}>
                <Send size={18} />
              </button>
              
              {showFAQ && (
                <div className="faq-popup">
                  {faqSuggestions.map((q, i) => (
                    <div 
                      key={i} 
                      className="faq-item" 
                      onMouseDown={(e) => {
                        e.preventDefault();
                        setInputValue(q);
                        setShowFAQ(false);
                      }}
                    >
                      {q}
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div className="questions-carousel">
              <button className="carousel-arrow left"><ChevronLeft size={20} /></button>
              <div className="questions-scroll">
                {preBuiltQuestions.map((question, index) => (
                  <button key={index} className="question-chip-v2" onClick={() => handleQuestionClick(question)}>
                    {question}
                  </button>
                ))}
              </div>
              <button className="carousel-arrow right"><ChevronRight size={20} /></button>
            </div>
            
            <p className="disclaimer-text">OneCap AI Analyst can make mistakes. Check important information</p>
          </div>
        </div>
      ) : (
        <div className="chat-messages-container-new">
          <div className="chat-messages-scroll-new">
            {messages.map((message, index) => (
              <div key={index} className="message-block">
                {message.type === 'user' && (
                  <div className="user-message-bubble-right">
                    {message.content}
                  </div>
                )}
                
                {message.type === 'bot' && (
                  <div className="bot-response-card-new">
                    <div className="response-title-bar">
                      {message.title}
                    </div>
                    
                    <div className="response-content-area">
                      <p className="response-desc-text">{message.description}</p>
                      
                      <div className="controls-row">
                        <button 
                          className={`view-toggle-btn ${viewMode[message.id] === 'table' ? 'active' : ''}`}
                          onClick={() => toggleViewMode(message.id, 'table')}
                        >
                          <span className="btn-icon-text">≡ Table</span>
                        </button>
                        <button 
                          className={`view-toggle-btn ${viewMode[message.id] === 'chart' ? 'active' : ''}`}
                          onClick={() => toggleViewMode(message.id, 'chart')}
                        >
                          <span className="btn-icon-text">📊 Chart</span>
                        </button>
                        <select className="dropdown-select">
                          <option>Bar</option>
                          <option>Line</option>
                          <option>Pie</option>
                        </select>
                        <select className="dropdown-select">
                          <option>X-Rank</option>
                          <option>Y-Amount</option>
                        </select>
                        <select className="dropdown-select">
                          <option>2 selected</option>
                          <option>All</option>
                        </select>
                      </div>

                      {viewMode[message.id] === 'table' ? (
                        <div className="data-table-scroll">
                          <table className="invoice-data-table">
                            <thead>
                              <tr>
                                <th>Rank</th>
                                <th>Party Short Name</th>
                                <th>Party Name</th>
                                <th>Doc No</th>
                                <th>Doc Date</th>
                                <th>Amount (₹)</th>
                                <th>Days Overdue</th>
                                <th>Credit Days</th>
                                <th>Due Date</th>
                                <th>Region</th>
                                <th>Status</th>
                                <th>Officer</th>
                              </tr>
                            </thead>
                            <tbody>
                              {message.tableData.map((row, i) => (
                                <tr key={i}>
                                  <td>{row.rank}</td>
                                  <td>{row.partyShortName}</td>
                                  <td>{row.partyName}</td>
                                  <td>{row.docNo}</td>
                                  <td>{row.docDate}</td>
                                  <td>{row.amount}</td>
                                  <td>{row.daysOverdue}</td>
                                  <td>{row.creditDays}</td>
                                  <td>{row.dueDate}</td>
                                  <td>{row.region}</td>
                                  <td>{row.status}</td>
                                  <td>-</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      ) : (
                        <div className="chart-display-area">
                          <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={message.chartData}>
                              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                              <XAxis dataKey="rank" />
                              <YAxis />
                              <Tooltip />
                              <Legend />
                              <Bar dataKey="value" fill="#0066CC" name="Amount (₹)" />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      )}

                      <div className="insights-section-block">
                        <h4 className="section-heading">Key Insights:</h4>
                        <ul className="bullet-list">
                          {message.keyInsights.map((insight, i) => (
                            <li key={i}>{insight}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="explanation-section-block">
                        <h4 className="section-heading">{message.explanation.title}</h4>
                        <ul className="bullet-list">
                          {message.explanation.points.map((point, i) => (
                            <li key={i}>{point}</li>
                          ))}
                        </ul>
                      </div>

                      <p className="followup-text">{message.followUp}</p>

                      <div className="suggested-section">
                        <h5 className="suggested-label">Suggested follow-ups:</h5>
                        {message.suggestedFollowUps.map((followup, i) => (
                          <div key={i} className="suggested-link" onClick={() => setInputValue(followup)}>
                            {followup} ↗
                          </div>
                        ))}
                      </div>

                      <div className="action-icons">
                        <button className="icon-btn" title="Thumbs up"><ThumbsUp size={16} /></button>
                        <button className="icon-btn" title="Thumbs down"><ThumbsDown size={16} /></button>
                        <button className="icon-btn" title="Copy"><Copy size={16} /></button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="chat-input-fixed-bottom">
            <div className="input-wrapper-bottom">
              <Star className="star-icon-input" size={18} />
              <input
                type="text"
                placeholder="Ask anything about your financial data..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                className="text-input-bottom"
              />
              <button className="send-btn-bottom" onClick={handleSend}>
                <Send size={18} />
              </button>
            </div>
            <p className="disclaimer-bottom">OneCap AI Analyst can make mistakes. Check important information</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConversationalInsights;
