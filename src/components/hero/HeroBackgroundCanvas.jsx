import { useEffect, useRef } from 'react';

export default function HeroBackgroundCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const isTouch = typeof window !== 'undefined' && window.matchMedia("(pointer: coarse)").matches;
    const maxParticles = isTouch ? 25 : 60; // Moins de particules sur mobile pour économiser du CPU
    const particles = [];
    const mouse = { x: null, y: null, radius: 110 };

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.45;
        this.vy = (Math.random() - 0.5) * 0.45;
        this.radius = Math.random() * 2 + 1;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Rebondissement sur les bords
        if (this.x < 0 || this.x > width) this.vx = -this.vx;
        if (this.y < 0 || this.y > height) this.vy = -this.vy;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(120, 190, 195, 0.45)'; // Couleur #78bec3 en opacité
        ctx.fill();
      }
    }

    // Initialisation
    for (let i = 0; i < maxParticles; i++) {
      particles.push(new Particle());
    }

    // Gestion de la souris
    const handleMouseMove = (e) => {
      if (isTouch) return;
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    // Redimensionnement
    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    // Boucle d'animation
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Mise à jour et dessin des particules
      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      // Tracé des lignes de connexion
      if (!isTouch) {
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 80) {
              const alpha = (1 - dist / 80) * 0.15;
              ctx.strokeStyle = `rgba(222, 63, 107, ${alpha})`; // Couleur #de3f6b
              ctx.lineWidth = 0.8;
              ctx.beginPath();
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.stroke();
            }
          }

          // Connexion avec la souris
          if (mouse.x !== null && mouse.y !== null) {
            const dx = particles[i].x - mouse.x;
            const dy = particles[i].y - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < mouse.radius) {
              const alpha = (1 - dist / mouse.radius) * 0.22;
              ctx.strokeStyle = `rgba(120, 190, 195, ${alpha})`;
              ctx.lineWidth = 1.0;
              ctx.beginPath();
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(mouse.x, mouse.y);
              ctx.stroke();
            }
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none -z-10"
      style={{ opacity: 0.8 }}
    />
  );
}
