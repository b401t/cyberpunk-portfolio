import { useEffect, useRef } from 'react';

/**
 * Matrix Rain canvas background effect.
 * Renders falling green/cyan characters a la The Matrix.
 */
export default function MatrixRain() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId;
    let drops = [];

    const chars =
      'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF<>/\\{}[]|:;';

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const fontSize = 12;
      const columns = Math.floor(canvas.width / fontSize);
      drops = Array(columns).fill(1);
    }

    function draw() {
      ctx.fillStyle = 'rgba(10, 10, 15, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const fontSize = 12;
      ctx.font = `${fontSize}px "Share Tech Mono", monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Màu gradient cho chữ: cyan ở trên, xanh ở dưới, mờ dần
        const alpha = Math.random() * 0.3 + 0.1;

        // Highlight đầu cột (chữ mới rơi xuống)
        if (Math.random() > 0.95) {
          ctx.fillStyle = `rgba(0, 255, 102, 0.8)`;
        } else {
          ctx.fillStyle = `rgba(0, 240, 255, ${alpha})`;
        }

        ctx.fillText(char, x, y);

        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }

    resize();
    window.addEventListener('resize', resize);

    function animate() {
      draw();
      animationId = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
        opacity: 0.5,
      }}
    />
  );
}
