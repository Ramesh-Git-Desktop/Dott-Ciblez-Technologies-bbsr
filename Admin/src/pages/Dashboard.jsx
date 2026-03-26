import React from 'react';
import Icon from '../components/Icon';
import StatCard from '../components/StatCard';

const Dashboard = ({ data }) => {
  const stats = [
    { title: 'Total Jobs', value: data.jobs.length, icon: 'jobs', trend: '12%', trendUp: true, accent: true },
    { title: 'Applications', value: data.applications.length, icon: 'applications', trend: '8%', trendUp: true },
    { title: 'Open Inquiries', value: data.inquiries.filter(i => !i.read).length, icon: 'inquiries', trend: '3%', trendUp: false },
    { title: 'Team Members', value: data.team.length, icon: 'team', trend: '5%', trendUp: true },
    { title: 'Bookings', value: data.bookings.length, icon: 'bookings', trend: '18%', trendUp: true },
    { title: 'Blog Posts', value: data.blogPosts.length, icon: 'blog', trend: '2%', trendUp: true },
    { title: 'Subscribers', value: data.subscribers.length, icon: 'newsletter', trend: '22%', trendUp: true },
  ];
  return (
    <div>
      <div className="page-header">
        <div>
          <div className="breadcrumb"><span>Home</span><span className="sep">›</span><span className="current">Dashboard</span></div>
          <div className="page-title">Overview</div>
          <div className="page-subtitle">Welcome back! Here's what's happening today.</div>
        </div>
        <button className="btn btn-primary"><Icon name="download" size={13} /> Export Report</button>
      </div>
      <div className="stats-grid">
        {stats.map((s, i) => <StatCard key={i} {...s} />)}
      </div>
      <div className="grid grid-2" style={{ gap: 20 }}>
        <div className="card">
          <div className="card-header">
            <span className="card-title">Recent Bookings</span>
            <span className="badge badge-blue">{data.bookings.filter(b => b.status === 'confirmed').length} Confirmed</span>
          </div>
          <div className="card-body" style={{ padding: '16px 20px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {data.bookings.slice(0, 4).map((b, i) => (
                <div key={b.id} style={{ display: 'flex', alignItems: 'center', gap: 14, paddingBottom: i === Math.min(data.bookings.length, 4) - 1 ? 0 : 16, borderBottom: i === Math.min(data.bookings.length, 4) - 1 ? 'none' : '1px solid var(--border)' }}>
                  <div style={{ width: 48, height: 48, borderRadius: 12, background: 'var(--surface2)', border: '1px solid var(--border)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'var(--blue)' }}>
                    <span style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5 }}>{new Date(b.date).toLocaleString('en-US', { month: 'short' })}</span>
                    <span style={{ fontSize: 18, fontWeight: 800, lineHeight: 1, color: 'var(--black)', marginTop: 2 }}>{new Date(b.date).getDate()}</span>
                  </div>
                  <div style={{ flex: 1 }}>
                     <div style={{ fontWeight: 700, fontSize: 14.5, color: 'var(--black)' }}>{b.client}</div>
                     <div style={{ fontSize: 12.5, color: 'var(--text-muted)', marginTop: 2 }}>{b.service} • ${b.amount}</div>
                  </div>
                  <div>
                    <span className={`badge ${b.status === 'confirmed' ? 'badge-green' : 'badge-yellow'}`}>{b.status}</span>
                  </div>
                </div>
              ))}
              {data.bookings.length === 0 && (
                <div style={{ textAlign: 'center', padding: '20px 0', color: 'var(--text-muted)', fontSize: 13 }}>No recent bookings.</div>
              )}
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-header">
            <span className="card-title">Recent Activity</span>
            <button className="btn btn-ghost btn-sm">View all</button>
          </div>
          <div className="card-body" style={{ padding: '12px 20px' }}>
            {[
              { icon: 'applications', text: 'Alex Morgan applied for Senior React Developer', time: '2m ago', color: '#233dfe' },
              { icon: 'bookings', text: 'GlobalFirm confirmed Branding Package booking', time: '18m ago', color: '#059669' },
              { icon: 'inquiries', text: 'New inquiry from Chris Evans', time: '1h ago', color: '#d97706' },
              { icon: 'blog', text: 'AI Tools article reached 6k views', time: '3h ago', color: '#7c3aed' },
              { icon: 'team', text: 'Emma Davis joined the Sales team', time: '5h ago', color: '#0891b2' },
            ].map((a, i) => (
              <div key={i} className="activity-item">
                <div className="activity-icon" style={{ background: `${a.color}22` }}>
                  <span style={{ color: a.color }}><Icon name={a.icon} size={14} /></span>
                </div>
                <div>
                  <div className="activity-text">{a.text}</div>
                  <div className="activity-time">{a.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={{ marginTop: 20 }}>
        <div className="card">
          <div className="card-header">
            <span className="card-title">Recent Jobs</span>
            <span className="text-muted text-sm">{data.jobs.length} total</span>
          </div>
          <div className="table-wrap">
            <table>
              <thead><tr><th>Position</th><th>Department</th><th>Location</th><th>Applicants</th><th>Status</th></tr></thead>
              <tbody>
                {data.jobs.slice(0, 4).map(j => (
                  <tr key={j.id}>
                    <td><span style={{ fontWeight: 600 }}>{j.title}</span></td>
                    <td><span className="text-dim">{j.department}</span></td>
                    <td><span className="text-dim">{j.location}</span></td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div className="progress" style={{ width: 60 }}><div className="progress-bar" style={{ width: `${Math.min((j.applicants / 40) * 100, 100)}%` }} /></div>
                        <span className="text-sm text-dim">{j.applicants}</span>
                      </div>
                    </td>
                    <td><span className={`badge ${j.status === 'active' ? 'badge-green' : 'badge-gray'}`}>{j.status}</span></td>
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

export default Dashboard;