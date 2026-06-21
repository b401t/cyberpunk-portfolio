import { useState } from 'react';
import './CompanyCard.css';

/**
 * Card hiển thị thông tin company.
 * Props: { name, role, duration, description }
 */
export default function CompanyCard({ company }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={`company-card ${expanded ? 'company-card--expanded' : ''}`}
      onClick={() => setExpanded(!expanded)}
    >
      {/* Timeline dot + line */}
      <div className="company-card__timeline">
        <div className="company-card__dot" />
        <div className="company-card__line" />
      </div>

      <div className="company-card__content">
        <div className="company-card__header">
          <h3 className="company-card__name">{company.name}</h3>
          <span className="company-card__duration">{company.duration}</span>
        </div>

        <div className="company-card__role">{company.role}</div>

        {expanded && (
          <p className="company-card__desc">
            {company.description}
          </p>
        )}

        <div className="company-card__hint">
          {expanded ? '▲ Collapse' : '▼ Expand'}
        </div>
      </div>
    </div>
  );
}
