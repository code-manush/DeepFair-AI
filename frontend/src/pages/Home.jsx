import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Activity, Users } from 'lucide-react';

export default function Home() {
  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '4rem', marginTop: '2rem' }}>
      <section style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
        <h1 className="gradient-text" style={{ fontSize: '4rem', marginBottom: '1.5rem', lineHeight: 1.1 }}>
          DeepFair AI: Detect Deepfakes with Fairness in Mind
        </h1>
        <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', marginBottom: '2.5rem', lineHeight: 1.6 }}>
          Our advanced system doesn't just detect manipulated media—it ensures robust, unbiased performance across diverse facial attributes, providing transparent and actionable insights.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <Link to="/detect" style={{ textDecoration: 'none' }}>
            <button className="btn btn-primary" style={{ fontSize: '1.1rem', padding: '1rem 2rem' }}>
              Try the Detector <ArrowRight size={20} />
            </button>
          </Link>
          <Link to="/fairness" style={{ textDecoration: 'none' }}>
            <button className="btn btn-outline" style={{ fontSize: '1.1rem', padding: '1rem 2rem' }}>
              View Fairness Research
            </button>
          </Link>
        </div>
      </section>

      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginTop: '2rem' }}>
        <div className="glass-panel" style={{ padding: '2rem' }}>
          <ShieldCheck size={40} color="var(--primary-color)" style={{ marginBottom: '1rem' }} />
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Robust Detection</h3>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            Powered by an improved Xception architecture, our system analyzes both images and videos frame-by-frame to identify subtle manipulation artifacts with high accuracy.
          </p>
        </div>
        
        <div className="glass-panel" style={{ padding: '2rem' }}>
          <Users size={40} color="var(--secondary-color)" style={{ marginBottom: '1rem' }} />
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Attribute Analysis</h3>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            Automatically extracts facial attributes (Age, Gender, Glasses, etc.) to understand the context of the face being analyzed, providing richer insights.
          </p>
        </div>
        
        <div className="glass-panel" style={{ padding: '2rem' }}>
          <Activity size={40} color="var(--success-color)" style={{ marginBottom: '1rem' }} />
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Fairness Metrics</h3>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            Evaluates model performance disparities across different demographic and physical attributes to ensure equitable detection capabilities for all users.
          </p>
        </div>
      </section>
    </div>
  );
}
