import React, { useState, useRef } from 'react';
import Icon from '../components/Icon';
import '../CSS/Team.css';

const Team = ({ data, setData }) => {
  const [catFilter, setCatFilter] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [form, setForm] = useState({
    name: '',
    role: '',
    dept: 'Engineering',
    status: 'active',
    image: null,
    description: '',
    social: { linkedin: '', twitter: '', email: '' }
  });
  const [avatarFile, setAvatarFile] = useState(null);
  const fileInputRef = useRef(null);

  const cats = ['All', 'Engineering', 'Design', 'Marketing', 'Sales'];
  const filtered = catFilter === 'All' ? data.team : data.team.filter(m => m.dept === catFilter);

  // Stats
  const activeCount = data.team.filter(m => m.status === 'active').length;
  const totalCount = data.team.length;

  // Status colors for badges
  const statusColors = {
    active: '#34d399',
    away: '#fbbf24',
    offline: 'var(--text-muted)'
  };

  // Helper to generate random color for new members
  const colors = ['#3b82f6', '#8b5cf6', '#ec4899', '#10b981', '#f59e0b'];

  // Open modal for adding
  const openAdd = () => {
    setEditingMember(null);
    setForm({ name: '', role: '', dept: 'Engineering', status: 'active', avatarUrl: null });
    setAvatarFile(null);
    setShowModal(true);
  };

  // Open modal for editing
  const openEdit = (member) => {
    setEditingMember(member);
    setForm({
      name: member.name,
      role: member.role,
      dept: member.dept,
      status: member.status,
      image: member.image || null,
      description: member.description || '',
      social: member.social || { linkedin: '', twitter: '', email: '' }
    });
    setAvatarFile(null);
    setShowModal(true);
  };

  // Handle avatar file selection
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        setForm({ ...form, image: event.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  // Save member (add or edit)
  const saveMember = () => {
    if (!form.name.trim()) return;

    const newMember = {
      id: editingMember ? editingMember.id : Date.now(),
      name: form.name.trim(),
      role: form.role.trim(),
      dept: form.dept,
      status: form.status,
      image: form.image,
      description: form.description,
      social: form.social,
      // If no avatar, generate initials and random color
      avatar: form.image ? null : form.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2),
      color: form.image ? null : colors[Math.floor(Math.random() * colors.length)]
    };

    if (editingMember) {
      setData(d => ({
        ...d,
        team: d.team.map(m => m.id === editingMember.id ? newMember : m)
      }));
    } else {
      setData(d => ({ ...d, team: [...d.team, newMember] }));
    }

    setShowModal(false);
  };

  // Delete member
  const deleteMember = (id, e) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to remove this team member?')) {
      setData(d => ({ ...d, team: d.team.filter(m => m.id !== id) }));
    }
  };

  // Toggle active/offline status
  const toggleStatus = (id) => {
    setData(d => ({
      ...d,
      team: d.team.map(m =>
        m.id === id ? { ...m, status: m.status === 'active' ? 'offline' : 'active' } : m
      )
    }));
  };

  // Get avatar display (image or initials)
  const getAvatarDisplay = (member) => {
    if (member.avatarUrl) {
      return <img src={member.avatarUrl} alt={member.name} />;
    }
    return <span style={{ fontSize: 24, fontWeight: 'bold', color: 'white' }}>{member.avatar}</span>;
  };

  return (
    <div className="team-module">
      {/* Header */}
      <div className="page-header team-header">
        <div>
          <div className="breadcrumb">
            <span>Home</span>
            <span className="sep">›</span>
            <span className="current">Team</span>
          </div>
          <div className="page-title">Team Members</div>
          <div className="page-subtitle">{activeCount} active of {totalCount} total</div>
        </div>
        <button className="btn btn-primary" onClick={openAdd}>
          <Icon name="plus" size={14} /> Add Member
        </button>
      </div>

      {/* Stats */}
      <div className="team-stats">
        <div className="stat-badge">
          <div className="count">{activeCount}</div>
          <div className="label">Active</div>
        </div>
        <div className="stat-badge">
          <div className="count">{data.team.filter(m => m.status === 'offline').length}</div>
          <div className="label">Offline</div>
        </div>
        <div className="stat-badge">
          <div className="count">{data.team.filter(m => m.dept === 'Engineering').length}</div>
          <div className="label">Engineering</div>
        </div>
        <div className="stat-badge">
          <div className="count">{data.team.filter(m => m.dept === 'Design').length}</div>
          <div className="label">Design</div>
        </div>
      </div>

      {/* Category tabs */}
      <div className="category-tabs">
        {cats.map(c => (
          <div
            key={c}
            className={`category-tab ${catFilter === c ? 'active' : ''}`}
            onClick={() => setCatFilter(c)}
          >
            {c}
          </div>
        ))}
      </div>

      {/* Team grid */}
      <div className="team-grid">
        {filtered.map(member => (
          <div key={member.id} className="team-card">
            <div className="team-card-image">
              {member.image ? (
                <img src={member.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <div style={{ background: member.color || 'var(--surface2)', width: '100%', height: '100%' }} />
              )}
            </div>
            <div
              className="team-card-avatar"
              style={{
                background: member.image ? `url(${member.image}) center/cover` : member.color,
                boxShadow: `0 4px 12px ${member.color}40`
              }}
            >
              {!member.image && member.avatar}
            </div>
            <div className="team-card-content">
              <div className="team-card-name">{member.name}</div>
              <div className="team-card-role">{member.role}</div>
              {member.description && (
                <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 16, lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {member.description}
                </div>
              )}
              {member.social && (
                <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
                   {member.social.linkedin && <a href={member.social.linkedin} target="_blank" rel="noreferrer" style={{ color: 'var(--blue)' }}><Icon name="linkedin" size={14} /></a>}
                   {member.social.twitter && <a href={member.social.twitter} target="_blank" rel="noreferrer" style={{ color: '#1da1f2' }}><Icon name="twitter" size={14} /></a>}
                   {member.social.email && <a href={`mailto:${member.social.email}`} style={{ color: 'var(--text-dim)' }}><Icon name="mail" size={14} /></a>}
                </div>
              )}
              <div className="team-card-meta">
                <div className="team-card-status">
                  <div className={`status-dot ${member.status}`} />
                  <span className="text-sm">{member.status.charAt(0).toUpperCase() + member.status.slice(1)}</span>
                </div>
                <div className="team-card-actions">
                  <button className="action-btn edit" onClick={() => openEdit(member)} title="Edit">
                    <Icon name="edit" size={14} />
                  </button>
                  <button className="action-btn delete" onClick={(e) => deleteMember(member.id, e)} title="Delete">
                    <Icon name="trash" size={14} />
                  </button>
                  <label className="action-btn" title="Toggle status">
                    <input
                      type="checkbox"
                      checked={member.status === 'active'}
                      onChange={() => toggleStatus(member.id)}
                      style={{ display: 'none' }}
                    />
                    <Icon name="toggle" size={14} />
                  </label>
                </div>
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="empty-state">
            <Icon name="team" size={48} />
            <p>No team members found in this category.</p>
          </div>
        )}
      </div>

      {/* Modal for Add/Edit */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()} style={{ maxWidth: 500 }}>
            <div className="modal-header">
              <span className="modal-title">{editingMember ? 'Edit Member' : 'Add Team Member'}</span>
              <button className="modal-close" onClick={() => setShowModal(false)}>
                <Icon name="close" size={14} />
              </button>
            </div>
            <div className="modal-body">
              {/* Avatar upload */}
              <div className="avatar-upload">
                <div
                  className="avatar-preview"
                  style={{
                    background: form.image ? `url(${form.image}) center/cover` : 'var(--surface2)'
                  }}
                >
                  {!form.image && (
                    <div className="avatar-placeholder">
                      {form.name ? form.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : '??'}
                    </div>
                  )}
                </div>
                <button
                  type="button"
                  className="upload-btn"
                  onClick={() => fileInputRef.current.click()}
                >
                  <Icon name="image" size={12} /> Upload Photo
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={handleAvatarChange}
                />
                {form.image && (
                  <button
                    type="button"
                    className="upload-btn"
                    style={{ marginTop: 8, background: 'rgba(239,68,68,0.1)', color: '#f87171' }}
                    onClick={() => setForm({ ...form, image: null })}
                  >
                    Remove
                  </button>
                )}
              </div>

              <div className="form-group mb-3">
                <input
                  className="form-control"
                  style={{ fontSize: 18, fontWeight: 700, padding: '10px 14px' }}
                  placeholder="Full Name *"
                  value={form.name}
                  autoFocus
                  onChange={e => setForm({ ...form, name: e.target.value })}
                />
              </div>
              <div className="form-group mb-3">
                <input
                  className="form-control"
                  placeholder="Role Title (e.g. Senior Frontend Engineer)"
                  value={form.role}
                  onChange={e => setForm({ ...form, role: e.target.value })}
                />
              </div>
              <div className="form-group mb-3">
                <textarea
                  className="form-control"
                  placeholder="Short Description..."
                  value={form.description}
                  onChange={e => setForm({ ...form, description: e.target.value })}
                  style={{ minHeight: 80 }}
                />
              </div>
              <div className="grid grid-2" style={{ gap: 14 }}>
                <div className="form-group mb-0">
                  <label className="form-label">Department</label>
                  <select
                    className="form-control"
                    value={form.dept}
                    onChange={e => setForm({ ...form, dept: e.target.value })}
                  >
                    {cats.filter(c => c !== 'All').map(c => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group mb-0">
                  <label className="form-label">Status</label>
                  <select
                    className="form-control"
                    value={form.status}
                    onChange={e => setForm({ ...form, status: e.target.value })}
                  >
                    <option value="active">Active</option>
                    <option value="offline">Offline</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-ghost" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={saveMember} disabled={!form.name.trim()}>
                <Icon name="check" size={13} /> {editingMember ? 'Save Changes' : 'Add Member'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Team;