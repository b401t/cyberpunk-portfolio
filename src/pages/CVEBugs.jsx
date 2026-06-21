import { useState, useEffect, useMemo } from 'react';
import CVECard from '../components/CVECard';
import { parseFindings, filterByImpact, searchFindings } from '../utils/markdownParser';
import './CVEBugs.css';

/**
 * CVE/Bugs page — HOÀN TOÀN data-driven từ findings.md.
 * KHÔNG có hardcoded CVE data nào trong component này.
 */
export default function CVEBugs() {
  const [findings, setFindings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [impactFilter, setImpactFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Load & parse findings.md
  useEffect(() => {
    async function loadFindings() {
      try {
        // Import trực tiếp file markdown dưới dạng raw string (Vite hỗ trợ)
        const md = await import('../data/findings.md?raw');
        const parsed = parseFindings(md.default);
        setFindings(parsed);
        setLoading(false);
      } catch (err) {
        console.error('Failed to load findings:', err);
        setError('Failed to load CVE data. Check findings.md file.');
        setLoading(false);
      }
    }
    loadFindings();
  }, []);

  // Áp dụng filter + search
  const filteredFindings = useMemo(() => {
    let result = filterByImpact(findings, impactFilter);
    result = searchFindings(result, searchQuery);
    return result;
  }, [findings, impactFilter, searchQuery]);

  // Stats
  const stats = useMemo(() => {
    const total = findings.length;
    const high = findings.filter((f) => f.impact?.toLowerCase() === 'high').length;
    const medium = findings.filter((f) => f.impact?.toLowerCase() === 'medium').length;
    const low = findings.filter((f) => f.impact?.toLowerCase() === 'low').length;
    return { total, high, medium, low };
  }, [findings]);

  return (
    <div className="cve-page">
      <div className="cve-page__header">
        <h2 className="section-title">{'>'} CVE / Bug Findings</h2>
      </div>

      {/* Stats bar */}
      <div className="cve-page__stats">
        <div className="cve-stat">
          <span className="cve-stat__num">{stats.total}</span>
          <span className="cve-stat__label">Total</span>
        </div>
        <div className="cve-stat cve-stat--high">
          <span className="cve-stat__num">{stats.high}</span>
          <span className="cve-stat__label">High</span>
        </div>
        <div className="cve-stat cve-stat--medium">
          <span className="cve-stat__num">{stats.medium}</span>
          <span className="cve-stat__label">Medium</span>
        </div>
        <div className="cve-stat cve-stat--low">
          <span className="cve-stat__num">{stats.low}</span>
          <span className="cve-stat__label">Low</span>
        </div>
      </div>

      {/* Controls: Filter + Search */}
      <div className="cve-page__controls">
        {/* Impact filter */}
        <div className="cve-filter">
          <span className="cve-filter__label">Impact:</span>
          <div className="cve-filter__buttons">
            {['All', 'High', 'Medium', 'Low'].map((level) => (
              <button
                key={level}
                className={`cve-filter__btn ${impactFilter === level ? 'cve-filter__btn--active' : ''}`}
                data-level={level.toLowerCase()}
                onClick={() => setImpactFilter(level)}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        {/* Search */}
        <div className="cve-search">
          <span className="cve-search__icon">🔍</span>
          <input
            type="text"
            className="cve-search__input"
            placeholder="Search CVEs by keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Content */}
      <div className="cve-page__content">
        {loading && (
          <div className="cve-page__loading">
            <span className="cve-page__spinner" />
            <p>Loading findings from findings.md...</p>
          </div>
        )}

        {error && (
          <div className="cve-page__error">
            <p>⚠ {error}</p>
          </div>
        )}

        {!loading && !error && filteredFindings.length === 0 && (
          <div className="cve-page__empty">
            <p>No findings match your criteria.</p>
            <button
              className="cve-filter__btn cve-filter__btn--active"
              onClick={() => {
                setImpactFilter('All');
                setSearchQuery('');
              }}
            >
              Reset Filters
            </button>
          </div>
        )}

        {!loading && !error && filteredFindings.length > 0 && (
          <div className="cve-grid">
            {filteredFindings.map((finding, i) => (
              <CVECard
                key={finding.id}
                finding={finding}
                style={{ animationDelay: `${i * 60}ms` }}
              />
            ))}
          </div>
        )}

        {!loading && !error && (
          <p className="cve-page__count">
            Showing {filteredFindings.length} of {findings.length} findings
          </p>
        )}
      </div>
    </div>
  );
}
