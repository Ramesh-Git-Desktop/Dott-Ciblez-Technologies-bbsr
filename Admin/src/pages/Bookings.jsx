import React, { useState } from 'react';
import Icon from '../components/Icon';

const Bookings = ({ data, setData }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const update = (id, status) => setData(d => ({ ...d, bookings: d.bookings.map(b => b.id === id ? { ...b, status } : b) }));
  const statusBadge = { confirmed: 'badge-green', pending: 'badge-yellow', completed: 'badge-blue', cancelled: 'badge-red' };

  const filteredBookings = data.bookings.filter(b => {
    const query = searchQuery.toLowerCase();
    return b.customer.toLowerCase().includes(query) || 
           b.service.toLowerCase().includes(query) || 
           b.date.includes(query);
  });

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="breadcrumb"><span>Home</span><span className="sep">›</span><span className="current">Bookings</span></div>
          <div className="page-title">Service Bookings</div>
          <div className="page-subtitle">{data.bookings.filter(b => b.status === 'confirmed').length} confirmed • {data.bookings.filter(b => b.status === 'pending').length} pending</div>
        </div>
        <div className="search-box" style={{ maxWidth: 300, width: '100%', position: 'relative' }}>
          <span style={{ position: 'absolute', left: 15, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', display: 'flex', pointerEvents: 'none' }}>
            <Icon name="search" size={14} />
          </span>
          <input 
            type="text" 
            placeholder="Search by name, service, or date..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ width: '100%', padding: '10px 12px 10px 36px', borderRadius: 8, border: '1px solid var(--border)', background: 'var(--surface2)', color: 'var(--black)', fontSize: 13 }}
          />
        </div>
      </div>
      <div className="card">
        <div className="table-wrap">
          <table>
            <thead><tr><th>Customer</th><th>Service</th><th>Date & Time</th><th>Value</th><th>Status</th><th>Action</th></tr></thead>
            <tbody>
              {filteredBookings.map(b => (
                <tr key={b.id}>
                  <td><span style={{ fontWeight: 600, color: 'var(--black)' }}>{b.customer}</span></td>
                  <td><span className="text-dim">{b.service}</span></td>
                  <td><div style={{ fontSize: 13, color: 'var(--text-dim)' }}>{b.date}<br/><span className="text-xs text-muted">{b.time}</span></div></td>
                  <td><span style={{ color: '#34d399', fontWeight: 600 }}>{b.value}</span></td>
                  <td><span className={`badge ${statusBadge[b.status]}`}>{b.status}</span></td>
                  <td>
                    <select className="form-control" style={{ width: 120, padding: '4px 8px', fontSize: 12 }} value={b.status} onChange={e => update(b.id, e.target.value)}>
                      {['pending', 'confirmed', 'completed', 'cancelled'].map(s => <option key={s}>{s}</option>)}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Bookings;