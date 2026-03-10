import React, { useState } from 'react';
import {
    Users,
    AlertCircle,
    Briefcase,
    Building2,
    TrendingUp,
    ChevronDown,
    ArrowRight
} from 'lucide-react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend
} from 'recharts';

const adminJobCountData = [
    { date: 'Oct 13, 25', 'Sila Group': 8, 'KreditBee': 5, 'Malabar Gold': 0, 'Me and Moms': 2, 'Greenpark': 1, 'V-Bazaar': 0, 'Acetech': 0 },
    { date: 'Oct 20, 25', 'Sila Group': 14, 'KreditBee': 4, 'Malabar Gold': 0, 'Me and Moms': 3, 'Greenpark': 2, 'V-Bazaar': 1, 'Acetech': 0 },
    { date: 'Oct 27, 25', 'Sila Group': 10, 'KreditBee': 6, 'Malabar Gold': 0, 'Me and Moms': 2, 'Greenpark': 4, 'V-Bazaar': 2, 'Acetech': 1 },
    { date: 'Nov 3, 25', 'Sila Group': 7, 'KreditBee': 3, 'Malabar Gold': 0, 'Me and Moms': 4, 'Greenpark': 5, 'V-Bazaar': 3, 'Acetech': 2 },
    { date: 'Nov 10, 25', 'Sila Group': 9, 'KreditBee': 8, 'Malabar Gold': 0, 'Me and Moms': 6, 'Greenpark': 2, 'V-Bazaar': 4, 'Acetech': 1 },
    { date: 'Nov 17, 25', 'Sila Group': 12, 'KreditBee': 10, 'Malabar Gold': 0, 'Me and Moms': 8, 'Greenpark': 6, 'V-Bazaar': 5, 'Acetech': 0 },
    { date: 'Nov 24, 25', 'Sila Group': 15, 'KreditBee': 12, 'Malabar Gold': 0, 'Me and Moms': 10, 'Greenpark': 4, 'V-Bazaar': 3, 'Acetech': 2 },
    { date: 'Dec 1, 25', 'Sila Group': 20, 'KreditBee': 14, 'Malabar Gold': 0, 'Me and Moms': 12, 'Greenpark': 8, 'V-Bazaar': 2, 'Acetech': 1 },
    { date: 'Jan 1, 26', 'Sila Group': 32, 'KreditBee': 23, 'Malabar Gold': 14, 'Me and Moms': 18, 'Greenpark': 15, 'V-Bazaar': 12, 'Acetech': 8 },
    { date: 'Feb 1, 26', 'Sila Group': 25, 'KreditBee': 18, 'Malabar Gold': 10, 'Me and Moms': 15, 'Greenpark': 12, 'V-Bazaar': 8, 'Acetech': 4 },
    { date: 'Mar 1, 26', 'Sila Group': 45, 'KreditBee': 30, 'Malabar Gold': 20, 'Me and Moms': 25, 'Greenpark': 18, 'V-Bazaar': 15, 'Acetech': 10 },
    { date: 'Mar 9, 26', 'Sila Group': 38, 'KreditBee': 25, 'Malabar Gold': 18, 'Me and Moms': 22, 'Greenpark': 14, 'V-Bazaar': 10, 'Acetech': 6 },
];

const partyDiscrepancies = [
    { customer: 'Malabar Gold and Diamonds Limit...', party: 'MGPL - EMERALD', amount: '70.1cr' },
    { customer: 'Malabar Gold and Diamonds Limit...', party: 'IMC ADVERTISING - Calicut', amount: '12.7cr' },
    { customer: 'Malabar Gold and Diamonds Limit...', party: 'MGPL - SOLARIS ORNAMENTS', amount: '12.2cr' },
    { customer: 'KreditBee', party: 'MOBAVENUE MEDIA PRIVATE L...', amount: '7.9cr' },
    { customer: 'Greenpark Hotels & Resorts Ltd', party: 'Avasa', amount: '6.7cr' },
    { customer: 'Acetech Machinery Components I...', party: 'SANCO ENTERPRISES', amount: '6.2cr' },
    { customer: 'Me and Moms Pvt Ltd', party: 'Hands On Trade-Blinkit', amount: '5.0cr' },
    { customer: 'Malabar Gold and Diamonds Limit...', party: 'MGPL - ISHANI JEWELS', amount: '4.9cr' },
    { customer: 'KreditBee', party: 'Crowteh', amount: '4.7cr' },
    { customer: 'Malabar Gold and Diamonds Limit...', party: 'MGPL MODERN JEWELS_1', amount: '4.2cr' },
];

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('Ledger Recon');

    return (
        <div className="dashboard-content admin-dashboard" style={{ padding: '24px' }}>
            <header className="dashboard-header" style={{ marginBottom: '32px' }}>
                <div>
                    <h1 className="dashboard-title" style={{ fontSize: '24px', fontWeight: '700', color: '#001768' }}>Admin Dashboard</h1>
                    <p style={{ color: '#64748b', fontSize: '14px', marginTop: '4px' }}>Switch recon type to view key metrics and trends.</p>
                </div>

                <div className="recon-tabs" style={{
                    display: 'flex',
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    padding: '4px',
                    border: '1px solid #e2e8f0'
                }}>
                    {['PG Recon', 'Bank Recon', 'Ledger Recon'].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            style={{
                                padding: '8px 24px',
                                borderRadius: '6px',
                                fontSize: '13px',
                                fontWeight: '600',
                                transition: 'all 0.2s',
                                backgroundColor: activeTab === tab ? '#001768' : 'transparent',
                                color: activeTab === tab ? 'white' : '#64748b',
                                border: 'none',
                                cursor: 'pointer'
                            }}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </header>

            {/* KPI Cards */}
            <div className="metrics-grid" style={{ marginBottom: '32px' }}>
                <div className="metric-card" style={{ border: '1px solid #e2e8f0', borderRadius: '12px', padding: '24px' }}>
                    <p className="metric-title" style={{ fontWeight: '600', fontSize: '15px' }}>Total number of customers</p>
                    <h2 className="metric-value" style={{ fontSize: '32px', fontWeight: '700', color: '#001768', margin: '12px 0' }}>9</h2>
                </div>
                <div className="metric-card" style={{ border: '1px solid #e2e8f0', borderRadius: '12px', padding: '24px' }}>
                    <p className="metric-title" style={{ fontWeight: '600', fontSize: '15px' }}>Total discrepancy</p>
                    <h2 className="metric-value" style={{ fontSize: '32px', fontWeight: '700', color: '#001768', margin: '12px 0' }}>196.0cr</h2>
                </div>
                <div className="metric-card" style={{ border: '1px solid #e2e8f0', borderRadius: '12px', padding: '24px' }}>
                    <p className="metric-title" style={{ fontWeight: '600', fontSize: '15px' }}>Total number of jobs</p>
                    <h2 className="metric-value" style={{ fontSize: '32px', fontWeight: '700', color: '#001768', margin: '12px 0' }}>457</h2>
                </div>
                <div className="metric-card" style={{ border: '1px solid #e2e8f0', borderRadius: '12px', padding: '24px' }}>
                    <p className="metric-title" style={{ fontWeight: '600', fontSize: '15px' }}>Total number of parties</p>
                    <h2 className="metric-value" style={{ fontSize: '32px', fontWeight: '700', color: '#001768', margin: '12px 0' }}>307</h2>
                </div>
            </div>

            <div className="dashboard-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                {/* Line Chart Section */}
                <div className="chart-card" style={{ border: '1px solid #e2e8f0', borderRadius: '12px', padding: '24px', background: 'white' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '24px', color: '#1e293b' }}>Weekly job count by customer</h3>
                    <div style={{ height: '350px' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={adminJobCountData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis
                                    dataKey="date"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 10, fill: '#64748b' }}
                                    dy={10}
                                    angle={-45}
                                    textAnchor="end"
                                    height={60}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 11, fill: '#64748b' }}
                                    label={{ value: 'No of Recons', angle: -90, position: 'insideLeft', fontSize: 12, fill: '#64748b' }}
                                />
                                <Tooltip
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                                />
                                <Line type="monotone" dataKey="Sila Group" stroke="#3b82f6" strokeWidth={2} dot={false} activeDot={{ r: 6 }} />
                                <Line type="monotone" dataKey="KreditBee" stroke="#001768" strokeWidth={2} dot={false} activeDot={{ r: 6 }} />
                                <Line type="monotone" dataKey="Malabar Gold" stroke="#10b981" strokeWidth={2} dot={false} />
                                <Line type="monotone" dataKey="Me and Moms" stroke="#f59e0b" strokeWidth={2} dot={false} />
                                <Line type="monotone" dataKey="Greenpark" stroke="#8b5cf6" strokeWidth={2} dot={false} />
                                <Line type="monotone" dataKey="V-Bazaar" stroke="#ef4444" strokeWidth={2} dot={false} />
                                <Line type="monotone" dataKey="Acetech" stroke="#64748b" strokeWidth={2} dot={false} />
                                <Legend
                                    iconType="square"
                                    wrapperStyle={{ paddingTop: '20px', fontSize: '11px' }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Top Party Table Section */}
                <div className="table-card" style={{ border: '1px solid #e2e8f0', borderRadius: '12px', padding: '24px', background: 'white' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '24px', color: '#1e293b' }}>Top party level discrepancies</h3>
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                                    <th style={{ textAlign: 'left', padding: '12px 16px', fontSize: '13px', fontWeight: '600', color: '#64748b' }}>Customer Name</th>
                                    <th style={{ textAlign: 'left', padding: '12px 16px', fontSize: '13px', fontWeight: '600', color: '#64748b' }}>Party Name</th>
                                    <th style={{ textAlign: 'left', padding: '12px 16px', fontSize: '13px', fontWeight: '600', color: '#64748b' }}>Discrepancy Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {partyDiscrepancies.map((item, idx) => (
                                    <tr key={idx} style={{ borderBottom: idx === partyDiscrepancies.length - 1 ? 'none' : '1px solid #f1f5f9' }}>
                                        <td style={{ padding: '12px 16px', fontSize: '13px', color: '#475569' }}>{item.customer}</td>
                                        <td style={{ padding: '12px 16px', fontSize: '13px', color: '#475569' }}>{item.party}</td>
                                        <td style={{ padding: '12px 16px', fontSize: '13px', color: '#475569', fontWeight: '500' }}>{item.amount}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
