import React from 'react';
import Icon from '../components/Icon';
import MiniChart from '../components/MiniChart';

const Newsletter = ({ data }) => {
  const bySource = data.subscribers.reduce((acc, s) => { acc[s.source] = (acc[s.source] || 0) + 1; return acc; }, {});
  const export_csv = () => {
    const csv = ['Email,Source,Date', ...data.subscribers.map(s => `${s.email},${s.source},${s.date}`)].join('\n');
    const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv' })); a.download = 'subscribers.csv'; a.click();
  };
  return (
    <div>
      <div className="page-header">
        <div>
          <div className="breadcrumb"><span>Home</span><span className="sep">›</span><span className="current">Newsletter</span></div>
          <div className="page-title">Subscribers</div>
          <div className="page-subtitle">{data.subscribers.length} total subscribers</div>
        </div>
        <button className="btn btn-primary" onClick={export_csv}><Icon name="download" size={13} /> Export CSV</button>
      </div>
      <div className="grid grid-2" style={{ gap: 20, marginBottom: 20 }}>
        <div className="card">
          <div className="card-header"><span className="card-title">By Source</span></div>
          <div className="card-body">
            {Object.entries(bySource).map(([src, count]) => (
              <div key={src} style={{ marginBottom: 12 }}>
                <div className="flex items-center justify-between mb-1">
                  <span style={{ fontSize: 13, fontWeight: 500 }}>{src}</span>
                  <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>{count} · {Math.round((count / data.subscribers.length) * 100)}%</span>
                </div>
                <div className="progress"><div className="progress-bar" style={{ width: `${(count / data.subscribers.length) * 100}%` }} /></div>
              </div>
            ))}
          </div>
        </div>
        <div className="card">
          <div className="card-header"><span className="card-title">Growth (This Week)</span></div>
          <div className="card-body">
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 800, letterSpacing: -2 }}>+{data.subscribers.length}</div>
            <div className="text-muted text-sm mb-4">new subscribers this week</div>
            <MiniChart data={[3, 5, 2, 7, 4, 8, 6]} active={6} />
            <div className="flex justify-between mt-2">
              {['M','T','W','T','F','S','S'].map((d, i) => <span key={i} className="text-xs text-muted">{d}</span>)}
            </div>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="card-header"><span className="card-title">All Subscribers</span></div>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Email</th><th>Source</th><th>Subscribed Date</th></tr></thead>
            <tbody>
              {data.subscribers.map(s => (
                <tr key={s.id}>
                  <td><span style={{ fontWeight: 500 }}>{s.email}</span></td>
                  <td><span className="badge badge-blue">{s.source}</span></td>
                  <td><span className="text-muted text-sm">{s.date}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;