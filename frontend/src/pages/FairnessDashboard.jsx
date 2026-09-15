import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';
import { AlertTriangle, Info } from 'lucide-react';

export default function FairnessDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch metrics from API
    const fetchMetrics = async () => {
      try {
        const response = await fetch('http://localhost:8000/fairness/metrics');
        const metrics = await response.json();
        setData(metrics);
      } catch (error) {
        console.error("Error fetching metrics:", error);
        // Fallback for demonstration
        setData({
          overall_accuracy: 93.1,
          attributes: [
            { name: "Gender: Male", accuracy: 94.2, error: 5.8 },
            { name: "Gender: Female", accuracy: 89.7, error: 10.3 },
            { name: "Age: Young", accuracy: 93.5, error: 6.5 },
            { name: "Age: Older", accuracy: 87.8, error: 12.2 },
            { name: "Glasses: Yes", accuracy: 90.1, error: 9.9 },
            { name: "Glasses: No", accuracy: 94.0, error: 6.0 },
            { name: "Hat: Yes", accuracy: 84.7, error: 15.3 },
            { name: "Hat: No", accuracy: 93.2, error: 6.8 }
          ]
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchMetrics();
  }, []);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
        <div className="loading-spinner"></div>
      </div>
    );
  }

  // Identify groups with highest error rates for the warning section
  const disparities = data?.attributes.filter(a => a.error > 10).sort((a, b) => b.error - a.error) || [];

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h1 className="outfit-font" style={{ fontSize: '2.5rem', margin: '0 0 0.5rem 0' }}>Model Fairness</h1>
          <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Analysis of detection disparities across facial attributes.</p>
        </div>
        <div className="glass-panel" style={{ padding: '1rem 2rem', textAlign: 'right' }}>
          <p style={{ color: 'var(--text-secondary)', margin: '0 0 0.25rem 0' }}>Overall Accuracy</p>
          <h2 className="gradient-text" style={{ fontSize: '2.5rem', margin: 0 }}>{data.overall_accuracy}%</h2>
        </div>
      </div>

      {disparities.length > 0 && (
        <div className="glass-panel" style={{ padding: '1.5rem', borderLeft: '4px solid var(--warning-color)', display: 'flex', gap: '1rem', alignItems: 'flex-start', background: 'rgba(245, 158, 11, 0.05)' }}>
          <AlertTriangle color="var(--warning-color)" size={24} style={{ flexShrink: 0, marginTop: '0.2rem' }} />
          <div>
            <h3 style={{ margin: '0 0 0.5rem 0', color: 'var(--warning-color)' }}>Potential Performance Disparity Detected</h3>
            <p style={{ margin: 0, color: 'var(--text-secondary)' }}>
              The model shows significantly higher error rates ({'>10%'}) for the following groups: 
              <strong style={{ color: 'var(--text-primary)', marginLeft: '0.5rem' }}>
                {disparities.map(d => `${d.name} (${d.error}%)`).join(', ')}
              </strong>
            </p>
          </div>
        </div>
      )}

      <div className="glass-panel" style={{ padding: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
          <Info size={20} color="var(--primary-color)" />
          <h3 style={{ margin: 0 }}>Accuracy by Attribute</h3>
        </div>
        
        <div style={{ width: '100%', height: 400 }}>
          <ResponsiveContainer>
            <BarChart
              data={data.attributes}
              layout="vertical"
              margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="var(--glass-border)" horizontal={true} vertical={true} />
              <XAxis type="number" domain={[0, 100]} stroke="var(--text-secondary)" />
              <YAxis dataKey="name" type="category" stroke="var(--text-secondary)" width={120} />
              <Tooltip 
                contentStyle={{ backgroundColor: 'var(--surface-color)', border: '1px solid var(--glass-border)', borderRadius: '8px' }}
                itemStyle={{ color: 'var(--text-primary)' }}
              />
              <Legend />
              <ReferenceLine x={data.overall_accuracy} stroke="var(--primary-color)" strokeDasharray="3 3" label={{ position: 'top', value: 'Overall Avg', fill: 'var(--primary-color)' }} />
              <Bar dataKey="accuracy" name="Accuracy (%)" fill="var(--primary-color)" radius={[0, 4, 4, 0]} />
              <Bar dataKey="error" name="Error Rate (%)" fill="var(--danger-color)" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
    </div>
  );
}
