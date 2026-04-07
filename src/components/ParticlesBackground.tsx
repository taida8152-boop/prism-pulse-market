import { useEffect, useRef } from "react";

const ParticlesBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const particles: HTMLDivElement[] = [];
    const count = 25;

    for (let i = 0; i < count; i++) {
      const p = document.createElement("div");
      p.className = "particle";
      const size = Math.random() * 4 + 1;
      p.style.width = `${size}px`;
      p.style.height = `${size}px`;
      p.style.left = `${Math.random() * 100}%`;
      p.style.animationDuration = `${Math.random() * 15 + 10}s`;
      p.style.animationDelay = `${Math.random() * 10}s`;
      container.appendChild(p);
      particles.push(p);
    }

    return () => {
      particles.forEach((p) => p.remove());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none overflow-hidden z-0"
      aria-hidden="true"
    />
  );
};

export default ParticlesBackground;
