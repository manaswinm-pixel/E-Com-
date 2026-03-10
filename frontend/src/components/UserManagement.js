import React, { useState } from 'react';
import {
    Search,
    Plus,
    MoreHorizontal,
    ChevronLeft,
    ChevronRight,
    Filter,
    CheckCircle2,
    XCircle,
    RotateCcw,
    Edit2
} from 'lucide-react';

const usersData = [
    { id: 1, email: 'eshwar@crpcrystal.in', name: 'Eshwar', phone: '—', status: 'CONFIRMED', enabled: true, created: '14/08/2025' },
    { id: 2, email: 'manaswin@example.com', name: 'Manaswin', phone: '+91 9876543210', status: 'PENDING', enabled: true, created: '10/03/2026' },
    { id: 3, email: 'admin@onecap.in', name: 'System Admin', phone: '—', status: 'CONFIRMED', enabled: true, created: '01/01/2025' },
];

const UserManagement = () => {
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <div className="user-management-page" style={{ padding: '32px' }}>
            <header style={{ marginBottom: '32px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#64748b', marginBottom: '12px' }}>
                    <span>Admin Portal</span>
                    <span style={{ color: '#cbd5e1' }}>/</span>
                    <span style={{ color: '#001768', fontWeight: '500' }}>Users</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                        <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#001768', marginBottom: '8px' }}>User Management</h1>
                        <p style={{ color: '#64748b', fontSize: '14px' }}>Create users, reset passwords, and update user details for your organization.</p>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
                        <span style={{ fontSize: '12px', color: '#94a3b8' }}>Customer</span>
                        <div style={{
                            padding: '8px 16px',
                            background: 'white',
                            border: '1px solid #e2e8f0',
                            borderRadius: '8px',
                            fontSize: '14px',
                            fontWeight: '600',
                            color: '#334155'
                        }}>
                            CRYSTAL INFORMATION TECHNOLOGY PVT LTD
                        </div>
                    </div>
                </div>
            </header>

            <div style={{
                background: 'white',
                border: '1px solid #e2e8f0',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
            }}>
                {/* Table Controls */}
                <div style={{ padding: '24px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#1e293b' }}>Users</h3>

                    <div style={{ display: 'flex', gap: '16px' }}>
                        <div style={{ position: 'relative' }}>
                            <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                            <input
                                type="text"
                                placeholder="Search users..."
                                style={{
                                    padding: '10px 16px 10px 40px',
                                    border: '1px solid #e2e8f0',
                                    borderRadius: '10px',
                                    fontSize: '14px',
                                    width: '300px',
                                    outline: 'none',
                                    transition: 'all 0.2s'
                                }}
                                className="search-input"
                            />
                        </div>
                        <button style={{
                            backgroundColor: '#001768',
                            color: 'white',
                            border: 'none',
                            borderRadius: '10px',
                            padding: '10px 24px',
                            fontSize: '14px',
                            fontWeight: '600',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            cursor: 'pointer'
                        }}>
                            <Plus size={18} />
                            Create user
                        </button>
                    </div>
                </div>

                {/* Table */}
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ backgroundColor: '#fafbfc' }}>
                                {['Email', 'Name', 'Phone', 'Status', 'Enabled', 'Created', 'Actions'].map(header => (
                                    <th key={header} style={{
                                        textAlign: 'left',
                                        padding: '16px 24px',
                                        fontSize: '13px',
                                        fontWeight: '600',
                                        color: '#64748b',
                                        borderBottom: '1px solid #f1f5f9'
                                    }}>
                                        {header}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {usersData.map((user) => (
                                <tr key={user.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                    <td style={{ padding: '16px 24px', fontSize: '14px', color: '#001768', fontWeight: '500' }}>{user.email}</td>
                                    <td style={{ padding: '16px 24px', fontSize: '14px', color: '#334155' }}>{user.name}</td>
                                    <td style={{ padding: '16px 24px', fontSize: '14px', color: '#64748b' }}>{user.phone}</td>
                                    <td style={{ padding: '16px 24px', fontSize: '14px' }}>
                                        <span style={{
                                            color: user.status === 'CONFIRMED' ? '#001768' : '#6b7280',
                                            fontWeight: '600',
                                            fontSize: '12px'
                                        }}>
                                            {user.status}
                                        </span>
                                    </td>
                                    <td style={{ padding: '16px 24px', fontSize: '14px' }}>
                                        <span style={{
                                            backgroundColor: user.enabled ? '#ecfdf5' : '#fef2f2',
                                            color: user.enabled ? '#059669' : '#ef4444',
                                            padding: '4px 12px',
                                            borderRadius: '12px',
                                            fontSize: '12px',
                                            fontWeight: '600'
                                        }}>
                                            {user.enabled ? 'Yes' : 'No'}
                                        </span>
                                    </td>
                                    <td style={{ padding: '16px 24px', fontSize: '14px', color: '#64748b' }}>{user.created}</td>
                                    <td style={{ padding: '16px 24px' }}>
                                        <div style={{ display: 'flex', gap: '8px' }}>
                                            <button style={{
                                                padding: '6px 16px',
                                                border: '1px solid #e2e8f0',
                                                borderRadius: '6px',
                                                fontSize: '13px',
                                                fontWeight: '600',
                                                color: '#64748b',
                                                backgroundColor: 'white',
                                                cursor: 'pointer'
                                            }}>
                                                Edit
                                            </button>
                                            <button style={{
                                                padding: '6px 16px',
                                                border: 'none',
                                                borderRadius: '6px',
                                                fontSize: '13px',
                                                fontWeight: '600',
                                                color: 'white',
                                                backgroundColor: '#001768',
                                                cursor: 'pointer'
                                            }}>
                                                Reset
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div style={{ padding: '16px 24px', borderTop: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '14px', color: '#64748b' }}>Page 1 of 1</span>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontSize: '14px', color: '#64748b' }}>Rows per page:</span>
                            <select style={{
                                padding: '4px 8px',
                                border: '1px solid #e2e8f0',
                                borderRadius: '6px',
                                fontSize: '14px',
                                outline: 'none'
                            }}>
                                <option>10</option>
                                <option>20</option>
                                <option>50</option>
                            </select>
                        </div>

                        <span style={{ fontSize: '14px', color: '#64748b' }}>1-1 of 1</span>

                        <div style={{ display: 'flex', gap: '8px' }}>
                            <button disabled style={{ padding: '4px', color: '#cbd5e1', cursor: 'not-allowed', background: 'none', border: 'none' }}>
                                <ChevronLeft size={20} />
                            </button>
                            <button disabled style={{ padding: '4px', color: '#cbd5e1', cursor: 'not-allowed', background: 'none', border: 'none' }}>
                                <ChevronRight size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserManagement;
