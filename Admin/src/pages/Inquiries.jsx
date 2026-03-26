import React, { useState, useMemo } from 'react';
import Icon from '../components/Icon';
import InquiryDetailModal from './InquiryDetailModal';
import '../CSS/Inquiries.css'; // Import the new CSS

const Inquiries = ({ data, setData }) => {
  const [selected, setSelected] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('all'); // all, high, medium, low
  const [readFilter, setReadFilter] = useState('all'); // all, unread, read
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Derive stats
  const totalUnread = data.inquiries.filter(i => !i.read).length;
  const totalHigh = data.inquiries.filter(i => i.priority === 'high').length;
  const totalMedium = data.inquiries.filter(i => i.priority === 'medium').length;
  const totalLow = data.inquiries.filter(i => i.priority === 'low').length;

  // Filtering logic
  const filtered = useMemo(() => {
    let result = [...data.inquiries];
    // Search by name, subject, or message
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(i =>
        i.name.toLowerCase().includes(term) ||
        i.subject.toLowerCase().includes(term) ||
        i.message.toLowerCase().includes(term)
      );
    }
    // Priority filter
    if (priorityFilter !== 'all') {
      result = result.filter(i => i.priority === priorityFilter);
    }
    // Read status filter
    if (readFilter === 'unread') {
      result = result.filter(i => !i.read);
    } else if (readFilter === 'read') {
      result = result.filter(i => i.read);
    }
    return result;
  }, [data.inquiries, searchTerm, priorityFilter, readFilter]);

  // Pagination
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Handlers
  const markRead = (id) => {
    setData(d => ({
      ...d,
      inquiries: d.inquiries.map(i => i.id === id ? { ...i, read: true } : i)
    }));
  };

  const markAllRead = () => {
    setData(d => ({
      ...d,
      inquiries: d.inquiries.map(i => ({ ...i, read: true }))
    }));
  };

  const deleteInquiry = (id, e) => {
    e.stopPropagation();
    if (window.confirm('Delete this inquiry?')) {
      setData(d => ({
        ...d,
        inquiries: d.inquiries.filter(i => i.id !== id)
      }));
      if (selected?.id === id) setSelected(null);
    }
  };

  const resetFilters = () => {
    setSearchTerm('');
    setPriorityFilter('all');
    setReadFilter('all');
    setCurrentPage(1);
  };

  // Helper to get avatar initials
  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  // Priority colors for avatar background
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#f87171';
      case 'medium': return '#fbbf24';
      case 'low': return '#34d399';
      default: return '#233dfe';
    }
  };

  return (
    <div className="inquiries-module">
      <div className="page-header inquiries-header">
        <div>
          <div className="breadcrumb">
            <span>Home</span>
            <span className="sep">›</span>
            <span className="current">Inquiries</span>
          </div>
          <div className="page-title">Contact Inquiries</div>
          <div className="page-subtitle">{totalUnread} unread messages</div>
        </div>
        <button className="btn btn-ghost" onClick={markAllRead}>
          <Icon name="check" size={13} /> Mark all read
        </button>
      </div>

      {/* Stats */}
      <div className="inquiries-stats">
        <div className="stat-badge">
          <div className="count">{totalUnread}</div>
          <div className="label">Unread</div>
        </div>
        <div className="stat-badge">
          <div className="count">{totalHigh}</div>
          <div className="label">High priority</div>
        </div>
        <div className="stat-badge">
          <div className="count">{totalMedium}</div>
          <div className="label">Medium priority</div>
        </div>
        <div className="stat-badge">
          <div className="count">{totalLow}</div>
          <div className="label">Low priority</div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="inquiries-toolbar">
        <div className="search-box">
          <span className="search-icon"><Icon name="search" size={14} /></span>
          <input
            type="text"
            placeholder="Search by name, subject, or message..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-group">
          <span className="text-muted text-sm">Priority:</span>
          <button
            className={`filter-btn ${priorityFilter === 'all' ? 'active' : ''}`}
            onClick={() => setPriorityFilter('all')}
          >
            All
          </button>
          <button
            className={`filter-btn ${priorityFilter === 'high' ? 'active' : ''}`}
            onClick={() => setPriorityFilter('high')}
          >
            High
          </button>
          <button
            className={`filter-btn ${priorityFilter === 'medium' ? 'active' : ''}`}
            onClick={() => setPriorityFilter('medium')}
          >
            Medium
          </button>
          <button
            className={`filter-btn ${priorityFilter === 'low' ? 'active' : ''}`}
            onClick={() => setPriorityFilter('low')}
          >
            Low
          </button>
        </div>
        <div className="filter-group">
          <span className="text-muted text-sm">Status:</span>
          <button
            className={`filter-btn ${readFilter === 'all' ? 'active' : ''}`}
            onClick={() => setReadFilter('all')}
          >
            All
          </button>
          <button
            className={`filter-btn ${readFilter === 'unread' ? 'active' : ''}`}
            onClick={() => setReadFilter('unread')}
          >
            Unread
          </button>
          <button
            className={`filter-btn ${readFilter === 'read' ? 'active' : ''}`}
            onClick={() => setReadFilter('read')}
          >
            Read
          </button>
        </div>
        {(searchTerm || priorityFilter !== 'all' || readFilter !== 'all') && (
          <button className="btn btn-ghost btn-sm" onClick={resetFilters}>
            Clear filters
          </button>
        )}
      </div>

      {/* Inbox list */}
      <div className="inbox-list">
        {paginated.length > 0 ? (
          paginated.map(inq => (
            <div
              key={inq.id}
              className={`inbox-item ${!inq.read ? 'unread' : ''}`}
              onClick={() => { setSelected(inq); markRead(inq.id); }}
            >
              <div
                className="avatar"
                style={{ background: `${getPriorityColor(inq.priority)}22`, color: getPriorityColor(inq.priority) }}
              >
                {getInitials(inq.name)}
              </div>
              <div className="inbox-content">
                <div className="inbox-header">
                  <span className="inbox-name">{inq.name}</span>
                  <span className="inbox-date">{inq.date}</span>
                </div>
                <div className="inbox-subject">{inq.subject}</div>
                <div className="inbox-message">{inq.message}</div>
              </div>
              <div className="priority-dot" style={{ background: getPriorityColor(inq.priority) }} />
              <div className="inbox-actions">
                <button
                  className="action-btn delete"
                  onClick={(e) => deleteInquiry(inq.id, e)}
                  title="Delete"
                >
                  <Icon name="trash" size={14} />
                </button>
                <button
                  className="action-btn"
                  onClick={(e) => { e.stopPropagation(); setSelected(inq); markRead(inq.id); }}
                  title="View details"
                >
                  <Icon name="eye" size={14} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-state">
            <Icon name="inquiries" size={48} />
            <p>No inquiries match your filters.</p>
            <button className="btn btn-ghost btn-sm" onClick={resetFilters}>Clear filters</button>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination">
          <button
            className="page-btn"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(p => p - 1)}
          >
            <Icon name="chevron_right" size={12} style={{ transform: 'rotate(180deg)' }} />
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(num => (
            <button
              key={num}
              className={`page-btn ${currentPage === num ? 'active' : ''}`}
              onClick={() => setCurrentPage(num)}
            >
              {num}
            </button>
          ))}
          <button
            className="page-btn"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(p => p + 1)}
          >
            <Icon name="chevron_right" size={12} />
          </button>
        </div>
      )}

      {/* Modal */}
      <InquiryDetailModal
        show={!!selected}
        inquiry={selected}
        onClose={() => setSelected(null)}
      />
    </div>
  );
};

export default Inquiries;