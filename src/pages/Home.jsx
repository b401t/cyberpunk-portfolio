import GlitchText from '../components/GlitchText';
import TypeWriter from '../components/TypeWriter';
import './Home.css';

const SKILLS = [
  { name: 'Security Research', icon: '🔬', desc: 'Vulnerability discovery, threat modeling, attack surface analysis' },
  { name: 'Bug Bounty', icon: '🎯', desc: 'HackerOne, Bugcrowd, Synack — Top 1% researcher' },
  { name: 'Reverse Engineering', icon: '🔧', desc: 'x86/x64, ARM, Java bytecode, .NET IL, firmware reversing' },
  { name: 'Exploit Development', icon: '💣', desc: 'RCE chains, privilege escalation, browser exploits, kernel' },
  { name: 'Web Security', icon: '🌐', desc: 'XSS, CSRF, SSRF, SQLi, IDOR, auth bypass, deserialization' },
  { name: 'Cloud Security', icon: '☁️', desc: 'AWS, GCP, Azure — IAM, serverless, container escape' },
];

const TYPING_TEXTS = [
  'bug bounty hunter',
  'security researcher',
  'reverse engineer',
  'exploit developer',
  'red team operator',
];

export default function Home() {
  return (
    <div className="home">
      {/* Hero section */}
      <section className="hero">
        <div className="hero__terminal-bar">
          <span className="hero__terminal-dot hero__terminal-dot--red" />
          <span className="hero__terminal-dot hero__terminal-dot--yellow" />
          <span className="hero__terminal-dot hero__terminal-dot--green" />
          <span className="hero__terminal-title">b401t@cybersec</span>
        </div>

        <div className="hero__terminal">
          <p className="hero__line">
            <span className="hero__prompt">[root@ghost ~]$ </span>
            <span className="hero__cmd">whoami</span>
          </p>

          <p className="hero__output">
            <GlitchText
              text="TRƯƠNG CHÍ BẢO"
              tag="h1"
              className="hero__name"
            />
          </p>

          <p className="hero__line">
            <span className="hero__prompt">[root@ghost ~]$ </span>
            <span className="hero__cmd">cat /etc/motd</span>
          </p>

          <p className="hero__output hero__output--typewriter">
            <span className="hero__prefix">$ </span>
            <TypeWriter
              texts={TYPING_TEXTS}
              speed={60}
              deleteSpeed={30}
              pause={2000}
              className="hero__typewriter"
            />
          </p>
        </div>
      </section>

      {/* Bio section */}
      <section className="bio">
        <h2 className="section-title">{'>'} About</h2>
        <div className="bio__card">
          <p className="bio__text">
            Independent security researcher with{' '}
            <span className="highlight highlight--pink">5+ years</span> of experience
            breaking software. Discovered{' '}
            <span className="highlight highlight--cyan">10+ CVEs</span> across enterprise
            products including RCE chains, authentication bypasses, and cloud infrastructure
            vulnerabilities. Top 50 on Bugcrowd worldwide leaderboard.
          </p>
          <p className="bio__text">
            Current focus: <span className="highlight highlight--green">cloud-native security</span>,
            Kubernetes privilege escalation, and zero-day research on widely-deployed CI/CD platforms.
            I believe in responsible disclosure and have worked with{' '}
            <span className="highlight highlight--purple">20+ vendors</span> through coordinated
            vulnerability disclosure programs.
          </p>
        </div>
      </section>

      {/* Skills section */}
      <section className="skills">
        <h2 className="section-title">{'>'} Skills</h2>
        <div className="skills__grid">
          {SKILLS.map((skill, i) => (
            <div
              key={skill.name}
              className="skills__card"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="skills__card-icon">{skill.icon}</div>
              <h3 className="skills__card-name">{skill.name}</h3>
              <p className="skills__card-desc">{skill.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
