import { useState, useEffect } from 'react';

/**
 * Terminal-style typing animation.
 *
 * Props:
 *   texts      - Mảng các chuỗi để gõ lần lượt
 *   speed      - Tốc độ gõ (ms mỗi ký tự), mặc định 80
 *   deleteSpeed- Tốc độ xóa, mặc định 40
 *   pause      - Thời gian dừng sau khi gõ xong, mặc định 2000
 *   className  - CSS class
 */
export default function TypeWriter({
  texts = [],
  speed = 80,
  deleteSpeed = 40,
  pause = 2000,
  className = '',
}) {
  const [displayText, setDisplayText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!texts.length) return;

    const currentText = texts[textIndex];

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          // Đang gõ
          if (charIndex < currentText.length) {
            setDisplayText(currentText.slice(0, charIndex + 1));
            setCharIndex(charIndex + 1);
          } else {
            // Gõ xong, đợi rồi xóa
            setTimeout(() => setIsDeleting(true), pause);
          }
        } else {
          // Đang xóa
          if (charIndex > 0) {
            setDisplayText(currentText.slice(0, charIndex - 1));
            setCharIndex(charIndex - 1);
          } else {
            // Xóa xong, qua text tiếp theo
            setIsDeleting(false);
            setTextIndex((textIndex + 1) % texts.length);
          }
        }
      },
      isDeleting ? deleteSpeed : speed
    );

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, textIndex, texts, speed, deleteSpeed, pause]);

  if (!texts.length) return null;

  return (
    <span className={className} style={{ fontFamily: 'var(--font-mono)' }}>
      {displayText}
      <span
        style={{
          display: 'inline-block',
          width: '2px',
          height: '1em',
          backgroundColor: 'var(--neon-cyan)',
          marginLeft: '2px',
          verticalAlign: 'text-bottom',
          animation: 'pulse 1s infinite',
        }}
      />
    </span>
  );
}
