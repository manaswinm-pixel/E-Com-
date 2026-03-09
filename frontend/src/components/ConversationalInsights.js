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
    '★ Total Sales Analysis',
    '★ COD vs Razorpay',
    '★ RTO Trends',
    '★ Outstanding Balance',
    '★ Payment Distribution'
  ];

  const faqSuggestions = [
    'What was total sales for February 2026?',
    'Show COD vs Razorpay settlement breakdown',
    'Analyze RTO trends for February',
    'Which days had highest sales?',
    'What is the outstanding balance status?'
  ];

  const mockResponses = {
    'What was total sales for February 2026?': {
      title: 'Total Sales Analysis - February 2026',
      description: 'Here is a comprehensive breakdown of daily sales for May-bell Data in February 2026:',
      tableData: [
        { date: '02.02.2026', totalSales: 3.85, cod: 53.52, razorpaySett: 3.02, rto: 18.99, exchange: 6.30, balance: 0 },
        { date: '03.02.2026', totalSales: 2.50, cod: 74.30, razorpaySett: 1.46, rto: 19.81, exchange: 7.20, balance: 0 },
        { date: '04.02.2026', totalSales: 1.71, cod: 29.22, razorpaySett: 1.21, rto: 15.18, exchange: 2.98, balance: 1.50 },
        { date: '05.02.2026', totalSales: 2.06, cod: 45.66, razorpaySett: 1.34, rto: 17.08, exchange: 2.20, balance: 5.40 },
        { date: '06.02.2026', totalSales: 1.79, cod: 23.76, razorpaySett: 1.08, rto: 23.71, exchange: 7.10, balance: 15.24 },
        { date: '07.02.2026', totalSales: 2.32, cod: 57.81, razorpaySett: 1.19, rto: 16.50, exchange: 7.46, balance: 28.82 },
        { date: '09.02.2026', totalSales: 4.45, cod: 93.59, razorpaySett: 3.24, rto: 4.39, exchange: 4.60, balance: 14.04 },
        { date: '10.02.2026', totalSales: 1.52, cod: 40.85, razorpaySett: 0.87, rto: 15.94, exchange: 1.80, balance: 4.99 },
        { date: '11.02.2026', totalSales: 2.49, cod: 50.28, razorpaySett: 1.68, rto: 10.49, exchange: 6.50, balance: 8.69 },
        { date: '12.02.2026', totalSales: 3.93, cod: 78.68, razorpaySett: 2.65, rto: 15.93, exchange: 8.50, balance: 21.63 },
      ],
      chartData: [
        { date: '02.02', value: 3.85 },
        { date: '03.02', value: 2.50 },
        { date: '04.02', value: 1.71 },
        { date: '05.02', value: 2.06 },
        { date: '06.02', value: 1.79 },
        { date: '07.02', value: 2.32 },
        { date: '09.02', value: 4.45 },
        { date: '10.02', value: 1.52 },
        { date: '11.02', value: 2.49 },
        { date: '12.02', value: 3.93 },
      ],
      keyInsights: [
        'Total sales for February 2026 amounted to ₹60.85L across 17 business days.',
        'Highest sales day was February 16th with ₹7.06L in sales.',
        'Average daily sales: ₹2.97L, showing consistent business performance.',
        'Week 2 (Feb 9-14) showed strongest performance with peak sales activity.'
      ],
      explanation: {
        title: 'Sales Calculation Methodology',
        points: [
          'Total Sales represents the gross revenue generated from all orders placed on that date.',
          'Excludes weekends (Feb 1, 8, 15) where no business operations occurred.',
          'Includes all payment modes: COD, Razorpay, Direct Collection, and Gift Cards.'
        ]
      },
      followUp: 'Would you like to see a breakdown by payment mode or analyze specific days in detail?',
      suggestedFollowUps: [
        'Show COD vs Razorpay settlement breakdown',
        'Which days had highest sales?'
      ]
    },
    '★ Total Sales Analysis': {
      title: 'Total Sales Analysis - February 2026',
      description: 'Here is a comprehensive breakdown of daily sales for May-bell Data in February 2026:',
      tableData: [
        { date: '02.02.2026', totalSales: 3.85, cod: 53.52, razorpaySett: 3.02, rto: 18.99, exchange: 6.30, balance: 0 },
        { date: '03.02.2026', totalSales: 2.50, cod: 74.30, razorpaySett: 1.46, rto: 19.81, exchange: 7.20, balance: 0 },
        { date: '04.02.2026', totalSales: 1.71, cod: 29.22, razorpaySett: 1.21, rto: 15.18, exchange: 2.98, balance: 1.50 },
        { date: '05.02.2026', totalSales: 2.06, cod: 45.66, razorpaySett: 1.34, rto: 17.08, exchange: 2.20, balance: 5.40 },
        { date: '06.02.2026', totalSales: 1.79, cod: 23.76, razorpaySett: 1.08, rto: 23.71, exchange: 7.10, balance: 15.24 },
        { date: '07.02.2026', totalSales: 2.32, cod: 57.81, razorpaySett: 1.19, rto: 16.50, exchange: 7.46, balance: 28.82 },
        { date: '09.02.2026', totalSales: 4.45, cod: 93.59, razorpaySett: 3.24, rto: 4.39, exchange: 4.60, balance: 14.04 },
        { date: '10.02.2026', totalSales: 1.52, cod: 40.85, razorpaySett: 0.87, rto: 15.94, exchange: 1.80, balance: 4.99 },
        { date: '11.02.2026', totalSales: 2.49, cod: 50.28, razorpaySett: 1.68, rto: 10.49, exchange: 6.50, balance: 8.69 },
        { date: '12.02.2026', totalSales: 3.93, cod: 78.68, razorpaySett: 2.65, rto: 15.93, exchange: 8.50, balance: 21.63 },
      ],
      chartData: [
        { date: '02.02', value: 3.85 },
        { date: '03.02', value: 2.50 },
        { date: '04.02', value: 1.71 },
        { date: '05.02', value: 2.06 },
        { date: '06.02', value: 1.79 },
        { date: '07.02', value: 2.32 },
        { date: '09.02', value: 4.45 },
        { date: '10.02', value: 1.52 },
        { date: '11.02', value: 2.49 },
        { date: '12.02', value: 3.93 },
      ],
      keyInsights: [
        'Total sales for February 2026 amounted to ₹60.85L across 17 business days.',
        'Highest sales day was February 16th with ₹7.06L in sales.',
        'Average daily sales: ₹2.97L, showing consistent business performance.'
      ],
      explanation: {
        title: 'Sales Calculation Methodology',
        points: [
          'Total Sales represents the gross revenue generated from all orders placed on that date.',
          'Excludes weekends (Feb 1, 8, 15) where no business operations occurred.'
        ]
      },
      followUp: 'Would you like to see a breakdown by payment mode or analyze specific days in detail?',
      suggestedFollowUps: [
        'Show COD vs Razorpay settlement breakdown'
      ]
    },
    'Show COD vs Razorpay settlement breakdown': {
      title: 'COD vs Razorpay Settlement Breakdown',
      description: 'Comparison of Cash on Delivery collections versus Razorpay settlement amounts for February 2026:',
      tableData: [
        { date: '02.02.2026', cod: 53.52, razorpaySett: 3.02, difference: 50.50, codPercent: '94.7%' },
        { date: '03.02.2026', cod: 74.30, razorpaySett: 1.46, difference: 72.84, codPercent: '98.1%' },
        { date: '04.02.2026', cod: 29.22, razorpaySett: 1.21, difference: 28.01, codPercent: '96.0%' },
        { date: '05.02.2026', cod: 45.66, razorpaySett: 1.34, difference: 44.32, codPercent: '97.1%' },
        { date: '06.02.2026', cod: 23.76, razorpaySett: 1.08, difference: 22.68, codPercent: '95.7%' },
        { date: '07.02.2026', cod: 57.81, razorpaySett: 1.19, difference: 56.62, codPercent: '98.0%' },
        { date: '09.02.2026', cod: 93.59, razorpaySett: 3.24, difference: 90.35, codPercent: '96.7%' },
        { date: '10.02.2026', cod: 40.85, razorpaySett: 0.87, difference: 39.98, codPercent: '97.9%' },
      ],
      chartData: [
        { date: '02.02', COD: 53.52, Razorpay: 3.02 },
        { date: '03.02', COD: 74.30, Razorpay: 1.46 },
        { date: '04.02', COD: 29.22, Razorpay: 1.21 },
        { date: '05.02', COD: 45.66, Razorpay: 1.34 },
        { date: '06.02', COD: 23.76, Razorpay: 1.08 },
        { date: '07.02', COD: 57.81, Razorpay: 1.19 },
        { date: '09.02', COD: 93.59, Razorpay: 3.24 },
        { date: '10.02', COD: 40.85, Razorpay: 0.87 },
      ],
      keyInsights: [
        'COD is the dominant payment method, representing ₹684L (93.7%) of total collections.',
        'Razorpay settlements totaled ₹38.76L, accounting for only 5.3% of payments.',
        'February 3rd showed the highest COD collection at ₹74.30L.',
        'Average COD collection per day: ₹40.23L vs Razorpay: ₹2.28L.'
      ],
      explanation: {
        title: 'Understanding Payment Modes',
        points: [
          'COD represents cash collected at delivery, typically higher due to customer preference.',
          'Razorpay Settlement is the net amount received after deducting commission charges.',
          'High COD percentage indicates strong traditional payment preference among customers.'
        ]
      },
      followUp: 'Would you like to see Razorpay commission breakdown or analyze payment trends?',
      suggestedFollowUps: [
        'Analyze RTO trends for February',
        'What is the outstanding balance status?'
      ]
    },
    '★ COD vs Razorpay': {
      title: 'COD vs Razorpay Settlement Breakdown',
      description: 'Comparison of Cash on Delivery collections versus Razorpay settlement amounts for February 2026:',
      tableData: [
        { date: '02.02.2026', cod: 53.52, razorpaySett: 3.02, difference: 50.50, codPercent: '94.7%' },
        { date: '03.02.2026', cod: 74.30, razorpaySett: 1.46, difference: 72.84, codPercent: '98.1%' },
        { date: '04.02.2026', cod: 29.22, razorpaySett: 1.21, difference: 28.01, codPercent: '96.0%' },
        { date: '05.02.2026', cod: 45.66, razorpaySett: 1.34, difference: 44.32, codPercent: '97.1%' },
      ],
      chartData: [
        { date: '02.02', COD: 53.52, Razorpay: 3.02 },
        { date: '03.02', COD: 74.30, Razorpay: 1.46 },
        { date: '04.02', COD: 29.22, Razorpay: 1.21 },
        { date: '05.02', COD: 45.66, Razorpay: 1.34 },
      ],
      keyInsights: [
        'COD is the dominant payment method, representing 93.7% of total collections.',
        'Razorpay settlements totaled ₹38.76L for the entire month.',
        'High COD percentage indicates strong traditional payment preference.'
      ],
      explanation: {
        title: 'Understanding Payment Modes',
        points: [
          'COD represents cash collected at delivery.',
          'Razorpay Settlement is net amount after commission.'
        ]
      },
      followUp: 'Would you like to see Razorpay commission breakdown?',
      suggestedFollowUps: [
        'Analyze RTO trends for February'
      ]
    },
    'Analyze RTO trends for February': {
      title: 'RTO (Return to Origin) Analysis - February 2026',
      description: 'Detailed analysis of Return to Origin amounts and trends for the month:',
      tableData: [
        { date: '02.02.2026', rto: 18.99, totalSales: 3.85, rtoPercent: '493%', status: 'High' },
        { date: '03.02.2026', rto: 19.81, totalSales: 2.50, rtoPercent: '792%', status: 'Very High' },
        { date: '04.02.2026', rto: 15.18, totalSales: 1.71, rtoPercent: '888%', status: 'Critical' },
        { date: '05.02.2026', rto: 17.08, totalSales: 2.06, rtoPercent: '829%', status: 'Critical' },
        { date: '06.02.2026', rto: 23.71, totalSales: 1.79, rtoPercent: '1325%', status: 'Critical' },
        { date: '07.02.2026', rto: 16.50, totalSales: 2.32, rtoPercent: '711%', status: 'Very High' },
        { date: '09.02.2026', rto: 4.39, totalSales: 4.45, rtoPercent: '99%', status: 'Normal' },
        { date: '10.02.2026', rto: 15.94, totalSales: 1.52, rtoPercent: '1049%', status: 'Critical' },
      ],
      chartData: [
        { date: '02.02', value: 18.99 },
        { date: '03.02', value: 19.81 },
        { date: '04.02', value: 15.18 },
        { date: '05.02', value: 17.08 },
        { date: '06.02', value: 23.71 },
        { date: '07.02', value: 16.50 },
        { date: '09.02', value: 4.39 },
        { date: '10.02', value: 15.94 },
      ],
      keyInsights: [
        'Total RTO amount for February: ₹175.42L - significantly high compared to sales.',
        'RTO percentages are critically high (avg 843%), indicating major delivery/quality issues.',
        'Week 1 showed highest RTO concentration with ₹72.56L in returns.',
        'February 6th had the worst RTO day at ₹23.71L (1325% of sales).',
        'Only Feb 9th showed normal RTO levels at 99% of sales.'
      ],
      explanation: {
        title: 'Understanding RTO Impact',
        points: [
          'RTO (Return to Origin) occurs when customers refuse delivery or orders are undeliverable.',
          'High RTO percentages indicate product quality issues, wrong deliveries, or customer dissatisfaction.',
          'Each RTO incurs additional logistics costs and impacts profitability.',
          'Normal RTO rate should be under 10-15% of sales; current rates are 8-10x higher.'
        ]
      },
      followUp: 'Critical attention needed! Would you like to see root cause analysis or mitigation strategies?',
      suggestedFollowUps: [
        'Show exchange amount trends',
        'What is the outstanding balance status?'
      ]
    },
    '★ RTO Trends': {
      title: 'RTO (Return to Origin) Analysis',
      description: 'Detailed analysis of Return to Origin amounts and trends:',
      tableData: [
        { date: '02.02.2026', rto: 18.99, totalSales: 3.85, rtoPercent: '493%' },
        { date: '03.02.2026', rto: 19.81, totalSales: 2.50, rtoPercent: '792%' },
        { date: '04.02.2026', rto: 15.18, totalSales: 1.71, rtoPercent: '888%' },
      ],
      chartData: [
        { date: '02.02', value: 18.99 },
        { date: '03.02', value: 19.81 },
        { date: '04.02', value: 15.18 },
      ],
      keyInsights: [
        'Total RTO for February: ₹175.42L',
        'RTO percentages are critically high, indicating delivery issues.'
      ],
      explanation: {
        title: 'Understanding RTO',
        points: [
          'RTO occurs when customers refuse delivery.',
          'High RTO impacts profitability significantly.'
        ]
      },
      followUp: 'Critical attention needed!',
      suggestedFollowUps: [
        'What is the outstanding balance status?'
      ]
    },
    'What is the outstanding balance status?': {
      title: 'Outstanding Balance Status - February 2026',
      description: 'Analysis of accumulated outstanding balances across the month:',
      tableData: [
        { date: '04.02.2026', balance: 1.50, status: 'Low' },
        { date: '05.02.2026', balance: 5.40, status: 'Low' },
        { date: '06.02.2026', balance: 15.24, status: 'Moderate' },
        { date: '07.02.2026', balance: 28.82, status: 'Moderate' },
        { date: '09.02.2026', balance: 14.04, status: 'Moderate' },
        { date: '10.02.2026', balance: 4.99, status: 'Low' },
        { date: '11.02.2026', balance: 8.69, status: 'Low' },
        { date: '12.02.2026', balance: 21.63, status: 'Moderate' },
        { date: '13.02.2026', balance: 1.20, status: 'Low' },
        { date: '14.02.2026', balance: 50.56, status: 'High' },
        { date: '16.02.2026', balance: 69.60, status: 'High' },
        { date: '17.02.2026', balance: 2.18, status: 'Low' },
        { date: '18.02.2026', balance: 89.34, status: 'Very High' },
        { date: '19.02.2026', balance: 55.81, status: 'High' },
        { date: '20.02.2026', balance: 60.36, status: 'High' },
        { date: '21.02.2026', balance: 83.85, status: 'Very High' },
      ],
      chartData: [
        { date: '04.02', value: 1.50 },
        { date: '05.02', value: 5.40 },
        { date: '06.02', value: 15.24 },
        { date: '07.02', value: 28.82 },
        { date: '09.02', value: 14.04 },
        { date: '10.02', value: 4.99 },
        { date: '11.02', value: 8.69 },
        { date: '12.02', value: 21.63 },
        { date: '13.02', value: 1.20 },
        { date: '14.02', value: 50.56 },
        { date: '16.02', value: 69.60 },
        { date: '17.02', value: 2.18 },
        { date: '18.02', value: 89.34 },
        { date: '19.02', value: 55.81 },
        { date: '20.02', value: 60.36 },
        { date: '21.02', value: 83.85 },
      ],
      keyInsights: [
        'Total outstanding balance accumulated: ₹513.21L by end of February.',
        'Sharp increase from mid-February onwards, with Feb 18th showing highest balance at ₹89.34L.',
        'Week 1 showed manageable balances (avg ₹10.83L), but Week 3 escalated dramatically (avg ₹73.42L).',
        'Balance trend is upward, indicating growing reconciliation gaps or payment delays.'
      ],
      explanation: {
        title: 'What is Outstanding Balance?',
        points: [
          'Outstanding Balance represents unreconciled amounts between sales, collections, and settlements.',
          'Can occur due to: pending settlements, discrepancies in payments, or timing differences.',
          'High balances indicate cashflow issues and require immediate reconciliation.',
          'Ideal balance should trend towards zero as transactions get reconciled.'
        ]
      },
      followUp: 'Critical issue! Would you like a detailed reconciliation breakdown or payment follow-up list?',
      suggestedFollowUps: [
        'Show payment mode distribution',
        'Show COD vs Razorpay settlement breakdown'
      ]
    },
    '★ Outstanding Balance': {
      title: 'Outstanding Balance Status',
      description: 'Analysis of accumulated outstanding balances:',
      tableData: [
        { date: '04.02.2026', balance: 1.50 },
        { date: '05.02.2026', balance: 5.40 },
        { date: '06.02.2026', balance: 15.24 },
      ],
      chartData: [
        { date: '04.02', value: 1.50 },
        { date: '05.02', value: 5.40 },
        { date: '06.02', value: 15.24 },
      ],
      keyInsights: [
        'Total outstanding: ₹513.21L by end of February.',
        'Balance trend is upward, indicating reconciliation gaps.'
      ],
      explanation: {
        title: 'Understanding Outstanding Balance',
        points: [
          'Represents unreconciled amounts.',
          'High balances indicate cashflow issues.'
        ]
      },
      followUp: 'Critical issue! Need reconciliation.',
      suggestedFollowUps: [
        'Show payment mode distribution'
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
