import { useState, useRef, useEffect } from 'react';
import { Send, Star, TrendingUp, ThumbsUp, ThumbsDown, Copy, ChevronLeft, ChevronRight } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Real data from Excel (in rupees, not lakhs)
const salesData = [
  { date: '02.02.2026', totalSales: 336575.60, cod: 53529.10, razorpayCommission: 3344.75, razorpaySettlement: 3024.19, directCollection: null, giftCard: null, rto: 18996.50, exchange: 6594.00, balance: 0.00 },
  { date: '03.02.2026', totalSales: 250645.90, cod: 74295.50, razorpayCommission: 1909.25, razorpaySettlement: 1682.75, directCollection: null, giftCard: null, rto: 19812.00, exchange: 7126.00, balance: 0.00 },
  { date: '04.02.2026', totalSales: 171281.80, cod: 29218.00, razorpayCommission: 1633.50, razorpaySettlement: 1207.79, directCollection: null, giftCard: null, rto: 15184.00, exchange: 2977.00, balance: 1408.00 },
  { date: '05.02.2026', totalSales: 206385.20, cod: 45662.00, razorpayCommission: 1501.50, razorpaySettlement: 1356.20, directCollection: null, giftCard: null, rto: 17084.00, exchange: 2196.00, balance: 9951.00 },
  { date: '06.02.2026', totalSales: 179363.60, cod: 23756.00, razorpayCommission: 754.50, razorpaySettlement: 1074.20, directCollection: null, giftCard: null, rto: 23711.80, exchange: 7088.00, balance: 15237.00 },
  { date: '07.02.2026', totalSales: 232152.40, cod: 57809.60, razorpayCommission: 1195.50, razorpaySettlement: 1474.70, directCollection: 980.00, giftCard: null, rto: 16501.80, exchange: 7457.00, balance: 28351.60 },
  { date: '09.02.2026', totalSales: 445388.70, cod: 93559.60, razorpayCommission: 4409.25, razorpaySettlement: 3243.35, directCollection: null, giftCard: null, rto: 4394.00, exchange: 4598.00, balance: 10404.00 },
  { date: '10.02.2026', totalSales: 151241.80, cod: 40854.99, razorpayCommission: 935.07, razorpaySettlement: 873.06, directCollection: null, giftCard: null, rto: 15939.00, exchange: 1795.00, balance: 4994.10 },
  { date: '11.02.2026', totalSales: 249254.60, cod: 50282.00, razorpayCommission: 1591.10, razorpaySettlement: 1683.40, directCollection: 800.00, giftCard: 2588.00, rto: 10493.00, exchange: 6485.00, balance: 8686.90 },
  { date: '12.02.2026', totalSales: 393021.70, cod: 78683.40, razorpayCommission: 3235.75, razorpaySettlement: 2654.90, directCollection: null, giftCard: null, rto: 15931.80, exchange: 8502.00, balance: 21626.10 },
  { date: '13.02.2026', totalSales: 262450.00, cod: 58943.40, razorpayCommission: 2028.75, razorpaySettlement: 1855.70, directCollection: null, giftCard: 3999.00, rto: 8407.00, exchange: 2398.00, balance: 1148.00 },
  { date: '14.02.2026', totalSales: 312185.70, cod: 95078.00, razorpayCommission: 2835.75, razorpaySettlement: 2497.50, directCollection: null, giftCard: null, rto: 9642.00, exchange: 14094.00, balance: 50564.10 },
  { date: '16.02.2026', totalSales: 706162.00, cod: 3187.00, razorpayCommission: 7016.50, razorpaySettlement: 6285.30, directCollection: null, giftCard: null, rto: null, exchange: null, balance: 69598.00 },
  { date: '17.02.2026', totalSales: 428785.00, cod: 12535.00, razorpayCommission: 2187.50, razorpaySettlement: 1864.10, directCollection: null, giftCard: null, rto: null, exchange: 10692.00, balance: 11774.60 },
  { date: '18.02.2026', totalSales: 245190.00, cod: null, razorpayCommission: 1547.50, razorpaySettlement: 1533.30, directCollection: null, giftCard: null, rto: null, exchange: 1495.00, balance: 89337.30 },
  { date: '19.02.2026', totalSales: 204810.00, cod: null, razorpayCommission: 1543.50, razorpaySettlement: 1397.80, directCollection: null, giftCard: null, rto: null, exchange: 7275.00, balance: 55812.00 },
  { date: '20.02.2026', totalSales: 247498.00, cod: null, razorpayCommission: 1526.00, razorpaySettlement: 1790.40, directCollection: null, giftCard: null, rto: null, exchange: 7395.00, balance: 60328.00 },
  { date: '21.02.2026', totalSales: 277704.70, cod: null, razorpayCommission: 1597.40, razorpaySettlement: 1910.60, directCollection: null, giftCard: null, rto: null, exchange: null, balance: 83846.40 },
  { date: '23.02.2026', totalSales: 528383.50, cod: null, razorpayCommission: 2878.50, razorpaySettlement: 2353.60, directCollection: null, giftCard: null, rto: null, exchange: 2598.00, balance: 199519.00 },
  { date: '24.02.2026', totalSales: 268605.00, cod: null, razorpayCommission: 613.00, razorpaySettlement: 613.10, directCollection: null, giftCard: null, rto: null, exchange: 2744.00, balance: 198642.50 },
];

// Helper function to format currency in Indian style
const formatCurrency = (num) => {
  if (num === null || num === undefined) return '-';
  return `₹${new Intl.NumberFormat('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(num)}`;
};

const formatLakhs = (num) => {
  if (num === null || num === undefined) return '-';
  return `₹${(num / 100000).toFixed(2)}L`;
};

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

  // Calculate totals from real data
  const totalSales = salesData.reduce((sum, day) => sum + (day.totalSales || 0), 0);
  const totalCOD = salesData.reduce((sum, day) => sum + (day.cod || 0), 0);
  const totalRazorpaySettlement = salesData.reduce((sum, day) => sum + (day.razorpaySettlement || 0), 0);
  const totalRazorpayCommission = salesData.reduce((sum, day) => sum + (day.razorpayCommission || 0), 0);
  const totalRTO = salesData.reduce((sum, day) => sum + (day.rto || 0), 0);
  const totalExchange = salesData.reduce((sum, day) => sum + (day.exchange || 0), 0);
  const totalBalance = salesData.reduce((sum, day) => sum + (day.balance || 0), 0);
  const totalDirectCollection = salesData.reduce((sum, day) => sum + (day.directCollection || 0), 0);
  const totalGiftCard = salesData.reduce((sum, day) => sum + (day.giftCard || 0), 0);

  const avgDailySales = totalSales / salesData.length;
  const highestSalesDay = salesData.reduce((max, day) => day.totalSales > (max.totalSales || 0) ? day : max, salesData[0]);

  const mockResponses = {
    'What was total sales for February 2026?': {
      title: 'Total Sales Analysis - February 2026',
      description: 'Here is a comprehensive breakdown of daily sales for February 2026 with exact values:',
      tableData: salesData.map(day => ({
        date: day.date,
        totalSales: formatCurrency(day.totalSales),
        cod: formatCurrency(day.cod),
        razorpaySett: formatCurrency(day.razorpaySettlement),
        rto: formatCurrency(day.rto),
        exchange: formatCurrency(day.exchange),
        balance: formatCurrency(day.balance)
      })),
      chartData: salesData.map(day => ({
        date: day.date.substring(0, 5),
        value: (day.totalSales / 100000)
      })),
      keyInsights: [
        `Total sales for February 2026: ${formatLakhs(totalSales)} across ${salesData.length} business days.`,
        `Highest sales day was ${highestSalesDay.date} with ${formatLakhs(highestSalesDay.totalSales)} in sales.`,
        `Average daily sales: ${formatLakhs(avgDailySales)}, showing business performance.`,
        `Total COD collections: ${formatLakhs(totalCOD)} | Razorpay settlements: ${formatLakhs(totalRazorpaySettlement)}`
      ],
      explanation: {
        title: 'Sales Calculation Methodology',
        points: [
          'Total Sales represents the gross revenue generated from all orders placed on that date.',
          'Values shown are exact amounts from the reconciliation data in Indian Rupees.',
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
      description: 'Comprehensive breakdown of daily sales for February 2026 with exact values:',
      tableData: salesData.slice(0, 10).map(day => ({
        date: day.date,
        totalSales: formatCurrency(day.totalSales),
        cod: formatCurrency(day.cod),
        razorpaySett: formatCurrency(day.razorpaySettlement),
        rto: formatCurrency(day.rto),
        exchange: formatCurrency(day.exchange),
        balance: formatCurrency(day.balance)
      })),
      chartData: salesData.slice(0, 10).map(day => ({
        date: day.date.substring(0, 5),
        value: (day.totalSales / 100000)
      })),
      keyInsights: [
        `Total sales for February 2026: ${formatLakhs(totalSales)} across ${salesData.length} business days.`,
        `Highest sales day was ${highestSalesDay.date} with ${formatLakhs(highestSalesDay.totalSales)}.`,
        `Average daily sales: ${formatLakhs(avgDailySales)} showing business performance.`
      ],
      explanation: {
        title: 'Sales Calculation Methodology',
        points: [
          'Total Sales represents gross revenue from all orders on each date.',
          'Values are exact amounts from reconciliation data in Indian Rupees.'
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
      tableData: salesData.filter(d => d.cod).map(day => {
        const codVal = day.cod || 0;
        const razVal = day.razorpaySettlement || 0;
        const diff = codVal - razVal;
        const codPercent = codVal + razVal > 0 ? ((codVal / (codVal + razVal)) * 100).toFixed(1) + '%' : '-';
        return {
          date: day.date,
          cod: formatCurrency(codVal),
          razorpaySett: formatCurrency(razVal),
          difference: formatCurrency(diff),
          codPercent
        };
      }),
      chartData: salesData.filter(d => d.cod).map(day => ({
        date: day.date.substring(0, 5),
        COD: (day.cod / 100000),
        Razorpay: (day.razorpaySettlement / 100000)
      })),
      keyInsights: [
        `COD is the dominant payment method: ${formatLakhs(totalCOD)} (${((totalCOD / (totalCOD + totalRazorpaySettlement)) * 100).toFixed(1)}%)`,
        `Razorpay settlements totaled: ${formatLakhs(totalRazorpaySettlement)} (${((totalRazorpaySettlement / (totalCOD + totalRazorpaySettlement)) * 100).toFixed(1)}%)`,
        `Total Razorpay commission charged: ${formatLakhs(totalRazorpayCommission)}`,
        `Highest COD day: ${salesData.reduce((max, d) => (d.cod || 0) > (max.cod || 0) ? d : max, salesData[0]).date}`
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
      description: 'Comparison of Cash on Delivery collections versus Razorpay settlement for February 2026:',
      tableData: salesData.filter(d => d.cod).slice(0, 8).map(day => {
        const codVal = day.cod || 0;
        const razVal = day.razorpaySettlement || 0;
        const diff = codVal - razVal;
        const codPercent = codVal + razVal > 0 ? ((codVal / (codVal + razVal)) * 100).toFixed(1) + '%' : '-';
        return {
          date: day.date,
          cod: formatCurrency(codVal),
          razorpaySett: formatCurrency(razVal),
          difference: formatCurrency(diff),
          codPercent
        };
      }),
      chartData: salesData.filter(d => d.cod).slice(0, 8).map(day => ({
        date: day.date.substring(0, 5),
        COD: (day.cod / 100000),
        Razorpay: (day.razorpaySettlement / 100000)
      })),
      keyInsights: [
        `COD dominates payment collection: ${formatLakhs(totalCOD)} total.`,
        `Razorpay settlements: ${formatLakhs(totalRazorpaySettlement)} for the month.`,
        'High COD percentage indicates traditional payment preference.'
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
      tableData: salesData.filter(d => d.rto).slice(0, 10).map(day => {
        const rtoVal = day.rto || 0;
        const salesVal = day.totalSales || 1;
        const rtoPercent = ((rtoVal / salesVal) * 100).toFixed(0) + '%';
        const status = (rtoVal / salesVal) > 0.15 ? 'High' : 'Normal';
        return {
          date: day.date,
          rto: formatCurrency(rtoVal),
          totalSales: formatCurrency(salesVal),
          rtoPercent,
          status
        };
      }),
      chartData: salesData.filter(d => d.rto).slice(0, 10).map(day => ({
        date: day.date.substring(0, 5),
        value: (day.rto / 100000)
      })),
      keyInsights: [
        `Total RTO amount for February: ${formatLakhs(totalRTO)}`,
        `Average RTO per day: ${formatLakhs(totalRTO / salesData.filter(d => d.rto).length)}`,
        `RTO as % of total sales: ${((totalRTO / totalSales) * 100).toFixed(1)}%`,
        `Highest RTO day: ${salesData.reduce((max, d) => (d.rto || 0) > (max.rto || 0) ? d : max, salesData[0]).date}`
      ],
      explanation: {
        title: 'Understanding RTO Impact',
        points: [
          'RTO (Return to Origin) occurs when customers refuse delivery or orders are undeliverable.',
          'High RTO percentages indicate product quality issues, wrong deliveries, or customer dissatisfaction.',
          'Each RTO incurs additional logistics costs and impacts profitability.',
          'Normal RTO rate should be under 10-15% of sales.'
        ]
      },
      followUp: 'Would you like to see root cause analysis or mitigation strategies?',
      suggestedFollowUps: [
        'Show exchange amount trends',
        'What is the outstanding balance status?'
      ]
    },
    '★ RTO Trends': {
      title: 'RTO (Return to Origin) Analysis',
      description: 'Detailed analysis of Return to Origin amounts and trends:',
      tableData: salesData.filter(d => d.rto).slice(0, 5).map(day => {
        const rtoVal = day.rto || 0;
        const salesVal = day.totalSales || 1;
        const rtoPercent = ((rtoVal / salesVal) * 100).toFixed(0) + '%';
        return {
          date: day.date,
          rto: formatCurrency(rtoVal),
          totalSales: formatCurrency(salesVal),
          rtoPercent
        };
      }),
      chartData: salesData.filter(d => d.rto).slice(0, 5).map(day => ({
        date: day.date.substring(0, 5),
        value: (day.rto / 100000)
      })),
      keyInsights: [
        `Total RTO for February: ${formatLakhs(totalRTO)}`,
        `RTO as % of sales: ${((totalRTO / totalSales) * 100).toFixed(1)}%`
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
      tableData: salesData.map(day => {
        const balVal = day.balance || 0;
        const status = balVal > 50000 ? 'High' : balVal > 10000 ? 'Moderate' : 'Low';
        return {
          date: day.date,
          balance: formatCurrency(balVal),
          status
        };
      }),
      chartData: salesData.map(day => ({
        date: day.date.substring(0, 5),
        value: (day.balance / 100000)
      })),
      keyInsights: [
        `Total outstanding balance accumulated: ${formatLakhs(totalBalance)}`,
        `Highest balance day: ${salesData.reduce((max, d) => (d.balance || 0) > (max.balance || 0) ? d : max, salesData[0]).date}`,
        `Average balance: ${formatLakhs(totalBalance / salesData.length)}`,
        'Balance trend requires immediate reconciliation attention.'
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
      followUp: 'Would you like a detailed reconciliation breakdown or payment follow-up list?',
      suggestedFollowUps: [
        'Show payment mode distribution',
        'Show COD vs Razorpay settlement breakdown'
      ]
    },
    '★ Outstanding Balance': {
      title: 'Outstanding Balance Status',
      description: 'Analysis of accumulated outstanding balances:',
      tableData: salesData.slice(0, 10).map(day => {
        const balVal = day.balance || 0;
        return {
          date: day.date,
          balance: formatCurrency(balVal)
        };
      }),
      chartData: salesData.slice(0, 10).map(day => ({
        date: day.date.substring(0, 5),
        value: (day.balance / 100000)
      })),
      keyInsights: [
        `Total outstanding: ${formatLakhs(totalBalance)} by end of February.`,
        'Balance trend indicates reconciliation gaps.'
      ],
      explanation: {
        title: 'Understanding Outstanding Balance',
        points: [
          'Represents unreconciled amounts.',
          'High balances indicate cashflow issues.'
        ]
      },
      followUp: 'Need reconciliation assistance?',
      suggestedFollowUps: [
        'Show payment mode distribution'
      ]
    },
    '★ Payment Distribution': {
      title: 'Payment Mode Distribution - February 2026',
      description: 'Breakdown of all payment methods used during the month:',
      tableData: [
        { mode: 'COD', amount: formatCurrency(totalCOD), percentage: `${((totalCOD / totalSales) * 100).toFixed(1)}%` },
        { mode: 'Razorpay', amount: formatCurrency(totalRazorpaySettlement), percentage: `${((totalRazorpaySettlement / totalSales) * 100).toFixed(1)}%` },
        { mode: 'Direct Collection', amount: formatCurrency(totalDirectCollection), percentage: `${((totalDirectCollection / totalSales) * 100).toFixed(2)}%` },
        { mode: 'Gift Card', amount: formatCurrency(totalGiftCard), percentage: `${((totalGiftCard / totalSales) * 100).toFixed(2)}%` }
      ],
      chartData: [
        { name: 'COD', value: totalCOD / 100000 },
        { name: 'Razorpay', value: totalRazorpaySettlement / 100000 },
        { name: 'Direct Collection', value: totalDirectCollection / 100000 },
        { name: 'Gift Card', value: totalGiftCard / 100000 }
      ],
      keyInsights: [
        `COD dominates with ${formatLakhs(totalCOD)} (${((totalCOD / totalSales) * 100).toFixed(1)}%)`,
        `Razorpay: ${formatLakhs(totalRazorpaySettlement)} after ${formatLakhs(totalRazorpayCommission)} commission`,
        `Alternative payments (Direct + Gift Card): ${formatLakhs(totalDirectCollection + totalGiftCard)}`,
        'Customer preference heavily skewed towards COD payment method.'
      ],
      explanation: {
        title: 'Payment Mode Analysis',
        points: [
          'COD represents cash collected on delivery from customers.',
          'Razorpay is online payment gateway with commission charges applied.',
          'Direct Collection includes cash payments made directly at store/office.',
          'Gift Cards represent voucher redemptions.'
        ]
      },
      followUp: 'Would you like strategies to increase online payment adoption?',
      suggestedFollowUps: [
        'Show COD vs Razorpay settlement breakdown',
        'What was total sales for February 2026?'
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
    
    // Check if the question exists in mockResponses, otherwise provide a default response
    let response;
    if (mockResponses[inputValue]) {
      response = mockResponses[inputValue];
    } else {
      // Default response for any custom question
      response = {
        title: 'General Financial Query Response',
        description: 'Here\'s an analysis based on your February 2026 data:',
        tableData: salesData.slice(0, 10).map(day => ({
          date: day.date,
          totalSales: formatCurrency(day.totalSales),
          cod: formatCurrency(day.cod),
          razorpaySett: formatCurrency(day.razorpaySettlement),
          rto: formatCurrency(day.rto),
          balance: formatCurrency(day.balance)
        })),
        chartData: salesData.slice(0, 10).map(day => ({
          date: day.date.substring(0, 5),
          value: (day.totalSales / 100000)
        })),
        keyInsights: [
          `Based on your question about "${inputValue}", here are relevant insights:`,
          `Total sales for February: ${formatLakhs(totalSales)}`,
          `Total COD collections: ${formatLakhs(totalCOD)}`,
          `Total outstanding balance: ${formatLakhs(totalBalance)}`
        ],
        explanation: {
          title: 'Data Summary',
          points: [
            'This response shows your complete financial data for February 2026.',
            'For specific analysis, try one of the suggested questions below.'
          ]
        },
        followUp: 'Would you like more specific analysis?',
        suggestedFollowUps: [
          '★ Total Sales Analysis',
          '★ COD vs Razorpay',
          '★ Outstanding Balance'
        ]
      };
    }
    
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
                                {message.tableData && message.tableData.length > 0 && 
                                  Object.keys(message.tableData[0]).map((key, i) => (
                                    <th key={i}>{key.charAt(0).toUpperCase() + key.slice(1)}</th>
                                  ))
                                }
                              </tr>
                            </thead>
                            <tbody>
                              {message.tableData && message.tableData.map((row, i) => (
                                <tr key={i}>
                                  {Object.values(row).map((value, j) => (
                                    <td key={j}>{value}</td>
                                  ))}
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
                              <XAxis 
                                dataKey={message.chartData && message.chartData[0] ? Object.keys(message.chartData[0])[0] : 'date'} 
                                tick={{ fontSize: 12 }}
                              />
                              <YAxis />
                              <Tooltip />
                              <Legend />
                              {message.chartData && message.chartData.length > 0 && 
                                Object.keys(message.chartData[0])
                                  .filter(key => key !== 'date' && key !== 'name')
                                  .map((key, i) => (
                                    <Bar 
                                      key={i} 
                                      dataKey={key} 
                                      fill={i === 0 ? '#0066CC' : i === 1 ? '#10b981' : '#f59e0b'} 
                                      name={key.charAt(0).toUpperCase() + key.slice(1)} 
                                    />
                                  ))
                              }
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
