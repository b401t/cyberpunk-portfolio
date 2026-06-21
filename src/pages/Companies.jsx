import CompanyCard from '../components/CompanyCard';
import './Companies.css';

const COMPANIES = [
  {
    name: 'TechNova Corp',
    role: 'Senior Security Researcher — Vulnerability Assessment Lead',
    duration: 'Jan 2025 — Present',
    description:
      'Leading vulnerability research across the product suite including web applications, mobile APIs, and cloud infrastructure. Discovered 3 critical RCE vulnerabilities (CVE-2026-4521 among them) and built the internal bug bounty triage pipeline. Reduced mean-time-to-patch from 45 days to 7 days through automated reproduction and PoC generation tooling.',
  },
  {
    name: 'SkyGrid Systems',
    role: 'Security Engineer — Red Team',
    duration: 'Mar 2023 — Dec 2024',
    description:
      'Full-scope red team operations against cloud-native infrastructure. Specialized in AWS IAM privilege escalation paths and Kubernetes cluster compromise. Discovered the blind SQL injection chain (CVE-2026-3891) that exposed 3.2M user records. Built internal tooling for automated cloud asset discovery and attack surface mapping.',
  },
  {
    name: 'CloudPulse Inc',
    role: 'Application Security Engineer',
    duration: 'Aug 2021 — Feb 2023',
    description:
      'Performed security design reviews and penetration testing for a SaaS monitoring platform with 500+ enterprise customers. Discovered the SSRF-to-IMDS chain (CVE-2026-2745) that could have exposed all customer cloud credentials. Implemented CSP, SRI, and hardened the OAuth 2.0 implementation against common attack patterns.',
  },
  {
    name: 'NetShield Security',
    role: 'Junior Penetration Tester',
    duration: 'Jan 2020 — Jul 2021',
    description:
      'Conducted web application and network penetration tests for Fortune 500 clients. Specialized in authentication and session management testing. Discovered the JWT algorithm confusion vulnerability (BUG-0192) that allowed privilege escalation across multiple client deployments using the same auth library.',
  },
  {
    name: 'Freelance Bug Bounty',
    role: 'Independent Researcher — HackerOne / Bugcrowd / Synack',
    duration: '2019 — Present',
    description:
      'Active participant in major bug bounty platforms with 200+ validated reports across 50+ programs. Top 50 worldwide on Bugcrowd leaderboard (2024-2025). Specialize in high-impact vulnerabilities: auth bypass, RCE, SSRF, and IDOR chains. Maintain 95%+ acceptance rate on submitted reports.',
  },
];

export default function Companies() {
  return (
    <div className="companies">
      <div className="companies__header">
        <h2 className="section-title">{'>'} Work History</h2>
      </div>

      <div className="companies__timeline">
        {COMPANIES.map((company, i) => (
          <CompanyCard
            key={company.name}
            company={company}
            style={{ animationDelay: `${i * 100}ms` }}
          />
        ))}
      </div>
    </div>
  );
}
