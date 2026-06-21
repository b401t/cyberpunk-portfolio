import { useState, useEffect, useCallback } from 'react';
import './GlitchText.css';

/**
 * Glitch text effect với các layer offset màu cyan/pink.
 * Kích hoạt ngẫu nhiên hoặc khi hover.
 *
 * Props:
 *   text      - Nội dung hiển thị
 *   tag       - HTML tag (mặc định: 'h1')
 *   className - CSS class bên ngoài
 *   active    - force glitch state
 */
export default function GlitchText({
  text,
  tag: Tag = 'h1',
  className = '',
  active = false,
}) {
  const [isGlitching, setIsGlitching] = useState(false);

  const triggerGlitch = useCallback(() => {
    if (active) return;
    setIsGlitching(true);
    const timeout = setTimeout(() => setIsGlitching(false), 150);
    return () => clearTimeout(timeout);
  }, [active]);

  useEffect(() => {
    if (active) {
      setIsGlitching(true);
      return;
    }
    setIsGlitching(false);
  }, [active]);

  const glitchClass = isGlitching ? 'glitch--active' : '';

  return (
    <Tag
      className={`glitch ${glitchClass} ${className}`}
      data-text={text}
      onMouseEnter={triggerGlitch}
    >
      <span className="glitch__layer glitch__layer--main">{text}</span>
      <span className="glitch__layer glitch__layer--cyan" aria-hidden="true">{text}</span>
      <span className="glitch__layer glitch__layer--pink" aria-hidden="true">{text}</span>
    </Tag>
  );
}
