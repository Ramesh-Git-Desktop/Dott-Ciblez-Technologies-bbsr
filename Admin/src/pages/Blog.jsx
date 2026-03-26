import React, { useState, useRef } from 'react';
import Icon from '../components/Icon';
import '../CSS/Blog.css';

const Blog = ({ data, setData }) => {
  const [showModal, setShowModal] = useState(false);
  const [editPost, setEditPost] = useState(null);
  const [form, setForm] = useState({
    title: '',
    category: 'Tech',
    cardCategory: 'WEB DEVELOPMENT',
    status: 'draft',
    featured: false,
    content: '',
    description: '',
    image: null,
  });
  const [filterCategory, setFilterCategory] = useState('All');
  const fileInputRef = useRef(null);

  const statusBadge = { published: 'badge-green', draft: 'badge-yellow' };
  const categories = ['All', 'Tech', 'Design', 'News', 'Tutorial', 'Business'];
  const cardCategories = ['WEB DEVELOPMENT', 'SOFTWARE DESIGN', 'CYBER AUDIT', 'IT INFRASTRUCTURE', 'CLOUD SERVICES'];

  const open = (post) => {
    setEditPost(post || null);
    setForm(
      post || {
        title: '',
        category: 'Tech',
        cardCategory: 'WEB DEVELOPMENT',
        status: 'draft',
        featured: false,
        content: '',
        description: '',
        image: null,
      },
    );
    setShowModal(true);
  };

  const save = () => {
    const p = {
      ...form,
      id: editPost?.id || Date.now(),
      views: editPost?.views || 0,
      date: editPost?.date || new Date().toISOString().slice(0, 10),
    };
    setData((d) => ({
      ...d,
      blogPosts: editPost
        ? d.blogPosts.map((b) => (b.id === editPost.id ? p : b))
        : [...d.blogPosts, p],
    }));
    setShowModal(false);
  };

  const del = (id) =>
    setData((d) => ({
      ...d,
      blogPosts: d.blogPosts.filter((b) => b.id !== id),
    }));

  const filteredPosts = data.blogPosts.filter(
    (p) => filterCategory === 'All' || p.category === filterCategory,
  );

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setForm({ ...form, image: URL.createObjectURL(file) });
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setForm({ ...form, image: URL.createObjectURL(file) });
    }
  };

  // Helper to insert formatting
  const insertFormat = (prefix, suffix = '') => {
    const textarea = document.querySelector('.editor-textarea');
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = form.content.substring(start, end);
    const newText =
      form.content.substring(0, start) +
      prefix +
      selectedText +
      suffix +
      form.content.substring(end);
    setForm({ ...form, content: newText });
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, end + prefix.length);
    }, 0);
  };

  return (
    <div className="blog-module">
      {/* Header */}
      <div className="page-header d-flex justify-content-between align-items-start mb-4">
        <div>
          <div className="breadcrumb">
            <span>Home</span>
            <span className="sep">›</span>
            <span className="current">Blog</span>
          </div>
          <h1 className="page-title">Blog Management</h1>
          <p className="page-subtitle">
            {data.blogPosts.filter((b) => b.status === 'published').length}{' '}
            published · {data.blogPosts.filter((b) => b.status === 'draft').length} drafts
          </p>
        </div>
        <button className="btn btn-primary btn-lg" onClick={() => open(null)}>
          <Icon name="plus" size={16} /> New Post
        </button>
      </div>

      {/* Filter bar */}
      <div className="blog-filter-bar">
        <div className="d-flex gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`btn btn-sm ${filterCategory === cat ? 'btn-primary' : 'btn-outline-secondary'}`}
              onClick={() => setFilterCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="text-muted small">
          Showing {filteredPosts.length} post{filteredPosts.length !== 1 && 's'}
        </div>
      </div>

      {/* Posts grid */}
      <div className="blog-grid">
        {filteredPosts.map((post) => (
          <div className="blog-card" key={post.id}>
            <div className="blog-card-image">
              {post.image ? (
                <img src={post.image} alt={post.title} />
              ) : (
                <div className="blog-card-image-placeholder">
                  <Icon name="image" size={32} />
                </div>
              )}
              {post.featured && (
                <span className="featured-badge">
                  <Icon name="star" size={12} /> Featured
                </span>
              )}
            </div>
            <div className="blog-card-content">
              <h3 className="blog-card-title">{post.title}</h3>
              {/* Card Category */}
              <div className="blog-card-card-category">
                <span className="card-category-tag">{post.cardCategory}</span>
              </div>
              {/* Short description */}
              {post.description && (
                <p className="blog-card-description">{post.description}</p>
              )}
              <div className="blog-card-meta">
                <span className={`badge ${statusBadge[post.status]}`}>{post.status}</span>
                <span className="badge badge-blue">{post.category}</span>
                <span className="text-muted">
                  <Icon name="eye" size={12} /> {post.views.toLocaleString()}
                </span>
                <span className="text-muted">{post.date}</span>
              </div>
              <div className="blog-card-actions">
                <button className="btn btn-outline-primary btn-sm" onClick={() => open(post)}>
                  <Icon name="edit" size={14} /> Edit
                </button>
                <button className="btn btn-outline-danger btn-sm" onClick={() => del(post.id)}>
                  <Icon name="trash" size={14} /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
        {filteredPosts.length === 0 && (
          <div className="empty-state">
            <Icon name="blog" size={48} />
            <p>No posts found in this category.</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal modal-lg" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <span className="modal-title">
                {editPost ? 'Edit Post' : 'Create New Post'}
              </span>
              <button className="modal-close" onClick={() => setShowModal(false)}>
                <Icon name="close" size={16} />
              </button>
            </div>

            <div className="modal-body split-view">
              {/* Left: editor */}
              <div className="editor-area">
                <input
                  type="text"
                  className="form-control editor-title"
                  placeholder="Post title"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                />
                <div className="editor-toolbar">
                  <button type="button" className="btn btn-sm" onClick={() => insertFormat('**', '**')}>
                    <Icon name="bold" size={14} />
                  </button>
                  <button type="button" className="btn btn-sm" onClick={() => insertFormat('*', '*')}>
                    <Icon name="italic" size={14} />
                  </button>
                  <button type="button" className="btn btn-sm" onClick={() => insertFormat('__', '__')}>
                    <Icon name="underline" size={14} />
                  </button>
                  <button type="button" className="btn btn-sm" onClick={() => insertFormat('[', '](url)')}>
                    <Icon name="link" size={14} />
                  </button>
                  <button type="button" className="btn btn-sm" onClick={() => insertFormat('\n- ')}>
                    <Icon name="list" size={14} />
                  </button>
                  <button type="button" className="btn btn-sm" onClick={() => insertFormat('`', '`')}>
                    <Icon name="code" size={14} />
                  </button>
                </div>
                <textarea
                  className="form-control editor-textarea"
                  placeholder="Write your content here... (markdown supported)"
                  value={form.content}
                  onChange={(e) => setForm({ ...form, content: e.target.value })}
                />
              </div>

              {/* Right: settings */}
              <div className="settings-area">
                <div className="settings-card">
                  <h4>Featured Image</h4>
                  <div
                    className="image-upload"
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    {form.image ? (
                      <div className="image-preview">
                        <img src={form.image} alt="preview" />
                        <button
                          className="remove-image"
                          onClick={(e) => {
                            e.stopPropagation();
                            setForm({ ...form, image: null });
                          }}
                        >
                          <Icon name="close" size={12} />
                        </button>
                      </div>
                    ) : (
                      <div className="upload-placeholder">
                        <Icon name="image" size={32} />
                        <p>Click or drag image</p>
                        <span className="text-muted small">JPG, PNG, GIF up to 5MB</span>
                      </div>
                    )}
                    <input
                      type="file"
                      ref={fileInputRef}
                      accept="image/*"
                      style={{ display: 'none' }}
                      onChange={handleImageUpload}
                    />
                  </div>
                </div>

                <div className="settings-card">
                  <h4>Publish Settings</h4>
                  <div className="form-group">
                    <label>Category</label>
                    <select
                      className="form-control"
                      value={form.category}
                      onChange={(e) => setForm({ ...form, category: e.target.value })}
                    >
                      {categories.filter((c) => c !== 'All').map((c) => (
                        <option key={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Card Category</label>
                    <select
                      className="form-control"
                      value={form.cardCategory}
                      onChange={(e) => setForm({ ...form, cardCategory: e.target.value })}
                    >
                      {cardCategories.map((c) => (
                        <option key={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Short Description</label>
                    <textarea
                      className="form-control"
                      rows="3"
                      placeholder="Brief summary for card preview..."
                      value={form.description}
                      onChange={(e) => setForm({ ...form, description: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Status</label>
                    <select
                      className="form-control"
                      value={form.status}
                      onChange={(e) => setForm({ ...form, status: e.target.value })}
                    >
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                    </select>
                  </div>
                  <div className="featured-toggle">
                    <label className="toggle">
                      <input
                        type="checkbox"
                        checked={!!form.featured}
                        onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                      />
                      <span className="toggle-slider" />
                    </label>
                    <div>
                      <span>Featured Post</span>
                      <small>Pin to top of blog</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn btn-ghost" onClick={() => setShowModal(false)}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={save}>
                <Icon name="check" size={14} /> {editPost ? 'Save Changes' : 'Publish Post'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Blog;