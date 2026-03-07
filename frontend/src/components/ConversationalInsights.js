import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, TrendingUp, DollarSign, AlertCircle } from 'lucide-react';

const ConversationalInsights = () => {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hello! I'm your Recon AI Assistant. I can help you analyze reconciliation data, track discrepancies, and provide insights. Ask me anything about your recon reports!",
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getMockResponse = (userMessage) => {
    const lowerMsg = userMessage.toLowerCase();

    if (lowerMsg.includes('total') && (lowerMsg.includes('transaction') || lowerMsg.includes('recon'))) {
      return {
        text: "Based on the latest reconciliation data, here's the summary:\n\n📊 **Total Transactions:** 6,000\n💰 **Total Amount Reconciled:** ₹657.0 Cr\n✅ **Matched Transactions:** 4,850 (80.8%)\n⚠️ **Pending:** 718 (12.0%)\n❌ **Unmatched:** 432 (7.2%)\n\nThe reconciliation rate has improved by 12.5% compared to last month.",
        analytics: {
          matched: 4850,
          pending: 718,
          unmatched: 432,
          amount: '₹657.0 Cr',
        },
      };
    }

    if (lowerMsg.includes('discrepanc')) {
      return {
        text: "Here's the discrepancy analysis:\n\n🔍 **Total Discrepancies:** ₹657.0 Cr\n📈 **Trend:** -3.2% from last week\n\n**Top Sources of Discrepancies:**\n1. UNICOM Reports - 35%\n2. Shopify Orders - 28%\n3. Payment Gateway Mismatch - 22%\n4. Logistics Issues - 15%\n\n**Recommendation:** Focus on UNICOM invoice reconciliation first.",
        analytics: {
          total: '₹657.0 Cr',
          trend: '-3.2%',
          topSource: 'UNICOM Reports',
        },
      };
    }

    if (lowerMsg.includes('vendor') || lowerMsg.includes('shopify') || lowerMsg.includes('razorpay')) {
      return {
        text: "**Vendor Performance Analysis:**\n\n🏆 **Top Performing Vendors:**\n\n1. **Shopify** - 2,450 transactions (₹245.5 Cr) - 35% contribution\n2. **Razorpay** - 1,890 transactions (₹189.2 Cr) - 27% contribution\n3. **Bluedart** - 1,250 transactions (₹98.5 Cr) - 18% contribution\n\nShopify leads with the highest transaction volume and amount reconciled.",
        analytics: {
          topVendor: 'Shopify',
          transactions: 2450,
          amount: '₹245.5 Cr',
        },
      };
    }

    if (lowerMsg.includes('today') || lowerMsg.includes('recent')) {
      return {
        text: "**Today's Reconciliation Status:**\n\n📅 Date: March 7, 2026\n\n✅ **Completed:** 156 transactions\n⏳ **In Progress:** 45 transactions\n❌ **Failed:** 12 transactions\n\n**Recent Activity:**\n- ORD-2456: ₹12,450 - Matched ✓\n- ORD-2457: ₹8,900 - Matched ✓\n- ORD-2455: ₹15,600 - Unmatched (₹450 discrepancy)\n\nOverall completion rate: 73%",
      };
    }

    if (lowerMsg.includes('help') || lowerMsg.includes('what can you do')) {
      return {
        text: "I can help you with:\n\n💡 **Analytics & Reports:**\n- Total reconciliation summaries\n- Discrepancy analysis\n- Vendor performance metrics\n\n📊 **Data Insights:**\n- Transaction trends\n- Status breakdowns\n- Daily/weekly comparisons\n\n🔍 **Specific Queries:**\n- Order status checks\n- Vendor-specific data\n- Payment gateway analysis\n\nJust ask me in natural language!",
      };
    }

    // Default response
    return {
      text: "I understand you're asking about reconciliation data. Here's what I found:\n\n📊 Current reconciliation status shows steady progress with 80.8% match rate. \n\nFor more specific insights, you can ask me about:\n- Total transactions and amounts\n- Discrepancy analysis\n- Vendor performance\n- Recent activity\n\nHow can I help you further?",
    };
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = {
      role: 'user',
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const response = getMockResponse(input);
      const assistantMessage = {
        role: 'assistant',
        content: response.text,
        analytics: response.analytics,
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="conversational-insights-page" data-testid="conversational-insights-page">
      <header className="dashboard-header">
        <h1 className="dashboard-title">Conversational Insights</h1>
        <p className="subtitle">AI-powered reconciliation analytics and insights</p>
      </header>

      <div className="chat-container">
        <div className="chat-messages" data-testid="chat-messages">
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.role}`}>
              <div className="message-icon">
                {message.role === 'user' ? <User size={20} /> : <Bot size={20} />}
              </div>
              <div className="message-content">
                <div className="message-text">{message.content}</div>
                {message.analytics && (
                  <div className="analytics-cards">
                    {Object.entries(message.analytics).map(([key, value]) => (
                      <div key={key} className="analytics-card">
                        <span className="analytics-label">{key}</span>
                        <span className="analytics-value">{value}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="message assistant typing">
              <div className="message-icon">
                <Bot size={20} />
              </div>
              <div className="message-content">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="chat-input-container">
          <input
            type="text"
            className="chat-input"
            placeholder="Ask about reconciliation data, discrepancies, vendors..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            data-testid="chat-input"
          />
          <button className="send-button" onClick={handleSend} disabled={!input.trim()} data-testid="send-button">
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConversationalInsights;