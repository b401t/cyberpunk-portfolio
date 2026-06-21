import { useState } from 'react';
import './CVECard.css';

/**
 * Card hiển thị một CVE/Bug finding.
 *
 * Props:
 *   finding - { id, title, impact, company, description, date }
 *
 * Glow color dựa trên severity:
 *   High   → Red
 *   Medium → Orange
 *   Low    → Green
 */
const IMPACT_CONFIG = {
  high: {
    color: 'var(--neon-red)',
    glow: 'var(--glow-red)',
    border: 'rgba(255, 23, 68, 0.4)',
    label: 'HIGH',
  },
  medium: {
    color: 'var(--neon-orange)',
    glow: 'var(--glow-orange)',
    border: 'rgba(255, 106, 0, 0.4)',
    label: 'MEDIUM',
  },
  low: {
    color: 'var(--neon-green)',
    glow: 'var(--glow-green)',
    border: 'rgba(0, 255, 102, 0.4)',
    label: 'LOW',
  },
};

export default function CVECard({ finding }) {
  const [expanded, setExpanded] = useState(false);

  const impactKey = finding.impact?.toLowerCase() || 'low';
  const config = IMPACT_CONFIG[impactKey] || IMPACT_CONFIG.low;
  const isCVE = finding.id?.toUpperCase().startsWith('CVE');

  return (
    <div
      className={`cve-card ${expanded ? 'cve-card--expanded' : ''}`}
      style={{
        '--impact-color': config.color,
        '--impact-glow': config.glow,
        '--impact-border': config.border,
      }}
      onClick={() => setExpanded(!expanded)}
    >
      <div className="cve-card__header">
        <div className="cve-card__id-row">
          <span className={`cve-card__id ${isCVE ? 'cve-card__id--cve' : 'cve-card__id--bug'}`}>
            {isCVE ? '⚠ ' : '🐛 '}
            {finding.id}
          </span>
          <span
            className="cve-card__impact"
            style={{
              color: config.color,
              textShadow: config.glow,
              borderColor: config.color,
            }}
          >
            {config.label}
          </span>
        </div>
        <h3 className="cve-card__title">{finding.title}</h3>
      </div>

      <div className="cve-card__meta">
        <span className="cve-card__company">
          <span className="cve-card__meta-icon">🏢</span>
          {finding.company}
        </span>
        <span className="cve-card__date">
          <span className="cve-card__meta-icon">📅</span>
          {finding.date}
        </span>
      </div>

      {expanded && (
        <div className="cve-card__body">
          <p className="cve-card__desc">{finding.description}</p>
        </div>
      )}

      <div className="cve-card__expand-hint">
        {expanded ? '[ Click to collapse ]' : '[ Click to expand ]'}
      </div>
    </div>
  );
}
