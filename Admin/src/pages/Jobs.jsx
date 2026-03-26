import React, { useState } from 'react';
import Icon from '../components/Icon';
import JobFormModal from '../components/JobFormModal';

const Jobs = ({ data, setData }) => {
  const [showModal, setShowModal] = useState(false);
  const [editJob, setEditJob] = useState(null);
  const [form, setForm] = useState({ title: '', department: '', location: '', type: 'Full-time' });
  const [filter, setFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const filtered = filter === 'all' ? data.jobs : data.jobs.filter(j => j.status === filter);
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginatedJobs = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleFilterChange = (f) => {
    setFilter(f);
    setCurrentPage(1);
  };

  const openAdd = () => { setEditJob(null); setForm({ title: '', department: '', location: '', type: 'Full-time', salary: '', description: '' }); setShowModal(true); };
  const openEdit = (j) => { setEditJob(j); setForm(j); setShowModal(true); };
  const save = () => {
    const newJob = { ...form, id: editJob?.id || Date.now(), applicants: editJob?.applicants || 0, posted: editJob?.posted || new Date().toISOString().slice(0, 10), status: editJob?.status || 'active' };
    setData(d => ({ ...d, jobs: editJob ? d.jobs.map(j => j.id === editJob.id ? newJob : j) : [...d.jobs, newJob] }));
    setShowModal(false);
  };
  const del = (id) => setData(d => ({ ...d, jobs: d.jobs.filter(j => j.id !== id) }));
  const toggle = (id) => setData(d => ({ ...d, jobs: d.jobs.map(j => j.id === id ? { ...j, status: j.status === 'active' ? 'inactive' : 'active' } : j) }));

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="breadcrumb"><span>Home</span><span className="sep">›</span><span className="current">Jobs</span></div>
          <div className="page-title">Job Listings</div>
          <div className="page-subtitle">{data.jobs.length} positions across {[...new Set(data.jobs.map(j => j.department))].length} departments</div>
        </div>
        <button className="btn btn-primary" onClick={openAdd}><Icon name="plus" size={14} /> Add Job</button>
      </div>
      <div className="flex items-center gap-3 mb-4" style={{ flexWrap: 'wrap' }}>
        <div className="tabs">
          {['all', 'active', 'inactive'].map(f => <div key={f} className={`tab${filter === f ? ' active' : ''}`} onClick={() => handleFilterChange(f)}>{f.charAt(0).toUpperCase() + f.slice(1)}</div>)}
        </div>
        <span className="text-muted text-sm ml-auto">{filtered.length} results</span>
      </div>
      <div className="card">
        <div className="table-wrap">
          <table>
            <thead><tr><th>Job Title</th><th>Department</th><th>Location</th><th>Type</th><th>Applicants</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>
              {paginatedJobs.map(j => (
                <tr key={j.id}>
                  <td>
                    <div style={{ fontWeight: 600 }}>{j.title}</div>
                    {j.description && <div className="text-muted text-xs" style={{ maxWidth: 260, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginTop: 4 }}>{j.description}</div>}
                  </td>
                  <td><span className="badge badge-blue">{j.department}</span></td>
                  <td><span className="text-dim">{j.location}</span></td>
                  <td>
                    <div className="text-sm text-dim">{j.type}</div>
                    {j.salary && <div className="text-xs" style={{ fontWeight: 600, color: '#059669', marginTop: 4 }}>{j.salary}</div>}
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div className="progress" style={{ width: 50 }}><div className="progress-bar" style={{ width: `${Math.min((j.applicants / 40) * 100, 100)}%` }} /></div>
                      <span className="text-sm text-dim">{j.applicants}</span>
                    </div>
                  </td>
                  <td><span className={`badge ${j.status === 'active' ? 'badge-green' : 'badge-gray'}`}>{j.status}</span></td>
                  <td>
                    <div className="flex gap-2">
                      <button className="btn btn-ghost btn-icon btn-sm " onClick={() => openEdit(j)}><Icon name="edit" size={13} /></button>
                      <button className="btn btn-danger btn-icon btn-sm" onClick={() => del(j.id)}><Icon name="trash" size={13} /></button>
                      <button className="btn btn-ghost btn-icon btn-sm" onClick={() => toggle(j.id)} title="Toggle status"><Icon name={j.status === 'active' ? 'check' : 'close'} size={13} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {totalPages > 1 && (
        <div className="pagination" style={{ display: 'flex', justifyContent: 'flex-end', gap: 6, marginTop: 24, paddingRight: 4 }}>
          <button 
            className="btn btn-ghost btn-sm" 
            disabled={currentPage === 1} 
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            style={{ padding: '6px 12px' }}
          >
            Prev
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              className={`btn btn-sm ${currentPage === i + 1 ? 'btn-primary' : 'btn-ghost'}`}
              onClick={() => setCurrentPage(i + 1)}
              style={{ minWidth: 32, padding: "5px" }}
            >
              {i + 1}
            </button>
          ))}
          <button 
            className="btn btn-ghost btn-sm" 
            disabled={currentPage === totalPages} 
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            style={{ padding: '6px 12px' }}
          >
            Next
          </button>
        </div>
      )}
      <JobFormModal
        show={showModal}
        onClose={() => setShowModal(false)}
        editJob={editJob}
        form={form}
        setForm={setForm}
        onSave={save}
      />
    </div>
  );
};

export default Jobs;
