import { useState } from 'react';
import { Send, Star } from 'lucide-react';

const ConversationalInsights = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const preBuiltQuestions = [
    '★ Cash Flow Forecast',
    '★ Revenue Growth',
    '★ Overdue Invoices',
    '★ Profitability',
    '★ Burn Rate / Runway'
  ];

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      console.log('Search:', searchQuery);
    }
  };

  return (
    <div className="conversational-insights-redesign-v2" data-testid="conversational-insights-page">
      {/* Curved Background */}
      <div className="curved-background"></div>
      
      {/* Content */}
      <div className="insights-content-v2">
        {/* Alpha Symbol */}
        <div className="alpha-symbol-v2">α</div>
        
        {/* Title */}
        <h1 className="insights-title-v2">Business Intelligence, Instant Insights.</h1>
        
        {/* Search Bar */}
        <div className="insights-search-bar-v2">
          <div className="search-icon-circle">
            <Star size={16} fill="currentColor" />
          </div>
          <input
            type="text"
            className="search-input-v2"
            placeholder="Ask me anything about your financial data...(try typing @ to mention a specific report type)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button className="send-button-v2">
            <Send size={18} />
          </button>
        </div>
        
        {/* Pre-built Questions Carousel */}
        <div className="questions-carousel">
          <button className="carousel-arrow left">&lt;</button>
          <div className="questions-scroll">
            {preBuiltQuestions.map((question, index) => (
              <button key={index} className="question-chip-v2">
                {question}
              </button>
            ))}
          </div>
          <button className="carousel-arrow right">&gt;</button>
        </div>
        
        {/* Disclaimer */}
        <p className="disclaimer-text">OneCap AI Analyst can make mistakes. Check important information</p>
      </div>
    </div>
  );
};

export default ConversationalInsights;
