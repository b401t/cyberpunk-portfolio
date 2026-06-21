import { useState, useCallback } from 'react';
import Navbar from './components/Navbar';
import MatrixRain from './components/MatrixRain';
import Home from './pages/Home';
import Companies from './pages/Companies';
import CVEBugs from './pages/CVEBugs';
import './App.css';

/**
 * TAB SYSTEM — Mỗi tab render riêng nội dung của nó.
 * KHÔNG render tất cả nội dung cùng lúc.
 * Sử dụng React state để chuyển tab với hiệu ứng fade transition.
 */
export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [transitioning, setTransitioning] = useState(false);

  const handleTabChange = useCallback((tabId) => {
    if (tabId === activeTab) return;
    setTransitioning(true);
    setTimeout(() => {
      setActiveTab(tabId);
      setTransitioning(false);
    }, 200);
  }, [activeTab]);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'home':
        return <Home />;
      case 'companies':
        return <Companies />;
      case 'cve':
        return <CVEBugs />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="app">
      <MatrixRain />
      <Navbar activeTab={activeTab} onTabChange={handleTabChange} />

      <main
        className={`app__content ${transitioning ? 'app__content--fade-out' : 'app__content--fade-in'}`}
        key={activeTab}
      >
        {renderTabContent()}
      </main>

      <footer className="app__footer">
        <div className="app__footer-line" />
        <p>
          <span className="app__footer-char">{'>'}</span> Built by{' '}
          <span className="app__footer-neon">b401t</span>{' '}
          <span className="app__footer-year">© {new Date().getFullYear()}</span>
        </p>
      </footer>
    </div>
  );
}
