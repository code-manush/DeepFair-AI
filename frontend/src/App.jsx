import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import { Shield, BarChart3, Upload, Home as HomeIcon } from 'lucide-react';
import Home from './pages/Home';
import Detection from './pages/Detection';
import FairnessDashboard from './pages/FairnessDashboard';

function App() {
  return (
    <Router>
      <div className="app-container">
        <nav className="navbar glass-panel" style={{ borderRadius: 0, borderTop: 0, borderLeft: 0, borderRight: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Shield color="var(--primary-color)" size={28} />
            <h2 className="outfit-font gradient-text" style={{ fontSize: '1.5rem', margin: 0 }}>
              DeepFair AI
            </h2>
          </div>
          <div className="nav-links">
            <NavLink to="/" className={({isActive}) => isActive ? "nav-link active" : "nav-link"} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <HomeIcon size={18} /> Home
            </NavLink>
            <NavLink to="/detect" className={({isActive}) => isActive ? "nav-link active" : "nav-link"} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Upload size={18} /> Detection
            </NavLink>
            <NavLink to="/fairness" className={({isActive}) => isActive ? "nav-link active" : "nav-link"} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <BarChart3 size={18} /> Fairness Analysis
            </NavLink>
          </div>
        </nav>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/detect" element={<Detection />} />
            <Route path="/fairness" element={<FairnessDashboard />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
