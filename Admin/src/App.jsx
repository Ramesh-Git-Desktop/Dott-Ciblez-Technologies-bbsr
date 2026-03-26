import React, { useState } from 'react';
import './styles/admin.css';
import mockData from './utils/mockData';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Jobs from './pages/Jobs';
import Applications from './pages/Applications';
import Team from './pages/Team';
import Bookings from './pages/Bookings';
import Inquiries from './pages/Inquiries';
import Blog from './pages/Blog';
import Newsletter from './pages/Newsletter';
import Settings from './pages/Settings';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [page, setPage] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showNotif, setShowNotif] = useState(false);
  const [data, setData] = useState(mockData);

  const notifications = [
    { text: 'Casey Williams applied for Senior React Developer', time: '2m ago' },
    { text: 'New inquiry from Chris Evans: Partnership Opportunity', time: '18m ago' },
    { text: 'GlobalFirm booking confirmed for Mar 28', time: '1h ago' },
    { text: 'Blog post reached 6,000 views', time: '3h ago' },
  ];

  const navItems = [
    { id: 'dashboard', icon: 'dashboard', label: 'Dashboard', section: 'main' },
    { id: 'jobs', icon: 'jobs', label: 'Jobs', badge: data.jobs.filter(j => j.status === 'active').length, section: 'main' },
    { id: 'applications', icon: 'applications', label: 'Applications', badge: data.applications.filter(a => a.status === 'pending').length, section: 'main' },
    { id: 'team', icon: 'team', label: 'Team', section: 'main' },
    { id: 'bookings', icon: 'bookings', label: 'Bookings', badge: data.bookings.filter(b => b.status === 'pending').length, section: 'manage' },
    { id: 'inquiries', icon: 'inquiries', label: 'Inquiries', badge: data.inquiries.filter(i => !i.read).length, section: 'manage' },
    { id: 'blog', icon: 'blog', label: 'Blog', section: 'content' },
    { id: 'newsletter', icon: 'newsletter', label: 'Newsletter', section: 'content' },
    { id: 'settings', icon: 'settings', label: 'Settings', section: 'account' },
  ];

  const sections = [
    { id: 'main', label: 'Main' },
    { id: 'manage', label: 'Manage' },
    { id: 'content', label: 'Content' },
    { id: 'account', label: 'Account' },
  ];

  const renderPage = () => {
    switch (page) {
      case 'dashboard': return <Dashboard data={data} />;
      case 'jobs': return <Jobs data={data} setData={setData} />;
      case 'applications': return <Applications data={data} setData={setData} />;
      case 'team': return <Team data={data} setData={setData} />;
      case 'bookings': return <Bookings data={data} setData={setData} />;
      case 'inquiries': return <Inquiries data={data} setData={setData} />;
      case 'blog': return <Blog data={data} setData={setData} />;
      case 'newsletter': return <Newsletter data={data} />;
      case 'settings': return <Settings onLogout={() => setLoggedIn(false)} />;
      default: return <Dashboard data={data} />;
    }
  };

  if (!loggedIn) {
    return (
      <>
        <div className="bg-mesh" />
        <Login onLogin={() => setLoggedIn(true)} />
      </>
    );
  }

  return (
    <>
      <div className="bg-mesh" />
      <Layout
        page={page}
        setPage={setPage}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        sidebarCollapsed={sidebarCollapsed}
        setSidebarCollapsed={setSidebarCollapsed}
        showNotif={showNotif}
        setShowNotif={setShowNotif}
        navItems={navItems}
        sections={sections}
        data={data}
        notifications={notifications}
      >
        {renderPage()}
      </Layout>
    </>
  );
}

export default App;