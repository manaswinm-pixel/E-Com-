import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, BarChart3, MessageSquare } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ConversationalInsights = () => {
  const [mode, setMode] = useState('chat');
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hello! I'm your Recon AI Assistant. I can provide detailed analytics with charts and insights. Try asking:\n\n• Show me settlement trends\n• What are the payment mode breakdowns?\n• Analyze exceptions\n• Revenue distribution analysis",
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

    if (lowerMsg.includes('settlement') || lowerMsg.includes('trend')) {
      return {
        text: "**Settlement Trend Analysis**\n\nHere's the detailed settlement trend for the last 10 weeks:\n\n📊 **Key Insights:**\n• Average weekly settlement: ₹25.3 Cr\n• Growth rate: +18.5% week-over-week\n• Highest settlement: ₹38.2 Cr (Week 10)\n• Lowest settlement: ₹12.5 Cr (Week 1)\n\nThe upward trend indicates strong business growth and improving collection efficiency.",
        chart: {
          type: 'line',
          data: [
            { week: 'W1', amount: 12.5 },
            { week: 'W2', amount: 15.8 },
            { week: 'W3', amount: 18.2 },
            { week: 'W4', amount: 22.4 },
            { week: 'W5', amount: 19.6 },
            { week: 'W6', amount: 25.3 },
            { week: 'W7', amount: 28.9 },
            { week: 'W8', amount: 32.5 },
            { week: 'W9', amount: 35.8 },
            { week: 'W10', amount: 38.2 },
          ],
        },
        analytics: {
          'Avg Settlement': '₹25.3 Cr',
          'Growth Rate': '+18.5%',
          'Peak Week': 'Week 10',
        },
      };
    }

    if (lowerMsg.includes('payment') && (lowerMsg.includes('mode') || lowerMsg.includes('method') || lowerMsg.includes('breakdown'))) {
      return {
        text: "**Payment Mode Distribution Analysis**\n\n💳 **Payment Method Breakdown:**\n\nRazorpay leads with 60% of transactions, showing strong digital payment adoption. COD has decreased to 22%, indicating customer preference shift towards prepaid options.\n\n**Recommendations:**\n• Continue promoting Razorpay\n• Incentivize Gift Card usage\n• Monitor Direct Bank transfer trends",
        chart: {
          type: 'stacked-bar',
          data: [
            { month: 'Jan', razorpay: 45, cod: 30, giftCard: 15, directBank: 10 },
            { month: 'Feb', razorpay: 50, cod: 28, giftCard: 12, directBank: 10 },
            { month: 'Mar', razorpay: 55, cod: 25, giftCard: 10, directBank: 10 },
            { month: 'Apr', razorpay: 60, cod: 22, giftCard: 10, directBank: 8 },
          ],
        },
        analytics: {
          'Razorpay': '60%',
          'COD': '22%',
          'Gift Card': '10%',
          'Direct Bank': '8%',
        },
      };
    }

    if (lowerMsg.includes('exception') || lowerMsg.includes('error') || lowerMsg.includes('issue')) {
      return {
        text: "**Exception Analytics Report**\n\n⚠️ **Critical Issues:**\n\n1. **Missing Razorpay Payments** (45 cases)\n   - High severity, requires immediate attention\n   - Average amount: ₹2.3L per case\n\n2. **COD Not Deposited** (32 cases)\n   - High severity\n   - Total value: ₹8.5 Cr\n\n3. **Settlement Pending** (128 cases)\n   - Medium severity\n   - Within normal T+2 cycle\n\n**Action Items:**\n• Escalate Razorpay payment issues to finance team\n• Follow up on pending COD deposits\n• Monitor settlement cycles",
        analytics: {
          'Total Exceptions': '231',
          'High Severity': '77',
          'Resolution Rate': '92.3%',
        },
      };
    }

    if (lowerMsg.includes('revenue') || lowerMsg.includes('source') || lowerMsg.includes('distribution')) {
      return {
        text: "**Revenue Source Distribution**\n\n💰 **Revenue Breakdown:**\n\nPrepaid orders dominate with 48.5% of total revenue (₹4,850 Cr), followed by COD at 24.5%. This healthy mix indicates diverse customer payment preferences.\n\n**Insights:**\n• Prepaid: 48.5% - Strong digital payment adoption\n• COD: 24.5% - Significant but declining\n• Gift Card: 9.8% - Growth opportunity\n• Direct Bank: 7.2% - Niche segment",
        chart: {
          type: 'pie',
          data: [
            { name: 'Prepaid Orders', value: 4850, color: '#3b82f6' },
            { name: 'COD Orders', value: 2450, color: '#10b981' },
            { name: 'Gift Card', value: 980, color: '#f59e0b' },
            { name: 'Direct Bank', value: 720, color: '#8b5cf6' },
          ],
        },
        analytics: {
          'Prepaid': '₹485 Cr (48.5%)',
          'COD': '₹245 Cr (24.5%)',
          'Total Revenue': '₹1,000 Cr',
        },
      };
    }

    if (lowerMsg.includes('order') || lowerMsg.includes('reconciliation coverage')) {
      return {
        text: "**Order Reconciliation Coverage**\n\n📈 **Monthly Progress:**\n\nReconciliation coverage has improved significantly from 450 orders in January to 1,620 orders in October, representing a 260% growth.\n\n**Key Metrics:**\n• Average monthly growth: 130 orders\n• Current reconciliation rate: 97.8%\n• Target achievement: 108%\n\nThe system is handling increased volume efficiently with maintained accuracy.",
        chart: {
          type: 'bar',
          data: [
            { month: 'Jan', orders: 450 },
            { month: 'Feb', orders: 520 },
            { month: 'Mar', orders: 680 },
            { month: 'Apr', orders: 750 },
            { month: 'May', orders: 890 },
            { month: 'Jun', orders: 1020 },
            { month: 'Jul', orders: 1150 },
            { month: 'Aug', orders: 1280 },
            { month: 'Sep', orders: 1450 },
            { month: 'Oct', orders: 1620 },
          ],
        },
        analytics: {
          'Total Orders': '10,760',
          'Growth': '+260%',
          'Accuracy': '97.8%',
        },
      };
    }

    if (lowerMsg.includes('help') || lowerMsg.includes('what can you')) {
      return {
        text: "**What I Can Help You With:**\n\n📊 **Analytics & Insights:**\n• Settlement trend analysis\n• Payment mode breakdowns\n• Revenue source distribution\n• Order reconciliation coverage\n\n⚠️ **Exception Management:**\n• Exception analytics\n• Issue identification\n• Resolution tracking\n\n📈 **Custom Queries:**\n• Performance metrics\n• Comparative analysis\n• Trend predictions\n\nJust ask in natural language and I'll provide detailed insights with charts!",
      };
    }

    return {
      text: "I understand you're asking about reconciliation data. Here's a quick overview:\n\n📊 **Current Status:**\n• Total Orders: 12,456\n• Settlement Rate: 84.6%\n• Accuracy: 97.8%\n\nFor detailed analysis with charts, try asking:\n• 'Show me settlement trends'\n• 'Payment mode breakdown'\n• 'Analyze exceptions'\n• 'Revenue distribution'\n\nHow can I help you further?",
    };
  };

  const renderChart = (chartConfig) => {
    if (!chartConfig) return null;

    const { type, data } = chartConfig;

    if (type === 'line') {
      return (
        <div className="message-chart">
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Line type="monotone" dataKey="amount" stroke="#3b82f6" strokeWidth={2} dot={{ fill: '#3b82f6' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      );
    }

    if (type === 'bar') {
      return (
        <div className="message-chart">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="orders" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      );
    }

    if (type === 'stacked-bar') {
      return (
        <div className="message-chart">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="razorpay" stackId="a" fill="#3b82f6" name="Razorpay" />
              <Bar dataKey="cod" stackId="a" fill="#10b981" name="COD" />
              <Bar dataKey="giftCard" stackId="a" fill="#f59e0b" name="Gift Card" />
              <Bar dataKey="directBank" stackId="a" fill="#8b5cf6" name="Direct Bank" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      );
    }

    if (type === 'pie') {
      return (
        <div className="message-chart">
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      );
    }

    return null;
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

    setTimeout(() => {
      const response = getMockResponse(input);
      const assistantMessage = {
        role: 'assistant',
        content: response.text,
        chart: response.chart,
        analytics: response.analytics,
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1200);
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
        
        <div className="mode-toggle" data-testid="mode-toggle">
          <button
            className={`toggle-btn ${mode === 'chat' ? 'active' : ''}`}
            onClick={() => setMode('chat')}
          >
            <MessageSquare size={18} />
            Chat
          </button>
          <button
            className={`toggle-btn ${mode === 'analytics' ? 'active' : ''}`}
            onClick={() => setMode('analytics')}
          >
            <BarChart3 size={18} />
            Analytics
          </button>
        </div>
      </header>

      {mode === 'chat' ? (
        <div className="chat-container">
          <div className="chat-messages" data-testid="chat-messages">
            {messages.map((message, index) => (
              <div key={index} className={`message ${message.role}`}>
                <div className="message-icon">
                  {message.role === 'user' ? <User size={20} /> : <Bot size={20} />}
                </div>
                <div className="message-content">
                  <div className="message-text">{message.content}</div>
                  {message.chart && renderChart(message.chart)}
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
              placeholder="Ask about settlements, exceptions, payment modes, revenue..."
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
      ) : (
        <div className="analytics-mode">
          <div className="analytics-placeholder">
            <BarChart3 size={64} className="placeholder-icon" />
            <h2>Analytics Dashboard</h2>
            <p>Pre-built analytics dashboard coming soon! For now, use Chat mode to get analytics with charts.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConversationalInsights;
