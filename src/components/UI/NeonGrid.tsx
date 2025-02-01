import React, { useEffect, useRef } from 'react';

const drawGrid = (ctx: CanvasRenderingContext2D, width: number, height: number, time: number) => {
  ctx.clearRect(0, 0, width, height);
  
  // Grid settings
  const GRID_SIZE = 40;
  const GRID_ROWS = 15;
  const PERSPECTIVE = 2;
  const SCROLL_SPEED = time * 60;
  
  // Draw vertical lines
  ctx.strokeStyle = '#31bc11';
  ctx.lineWidth = 1;
  
  for (let x = 0; x <= width + GRID_SIZE; x += GRID_SIZE) {
    const offset = (SCROLL_SPEED + x) % (GRID_SIZE * 2);
    ctx.beginPath();
    ctx.moveTo(x - offset, 0);
    ctx.lineTo(x - offset - width / PERSPECTIVE, height);
    ctx.strokeStyle = `rgba(49, 188, 17, ${0.3 - (x / width) * 0.2})`;
    ctx.stroke();
  }
  
  // Draw horizontal lines
  for (let i = 0; i <= GRID_ROWS; i++) {
    const y = (i / GRID_ROWS) * height;
    const xOffset = (y / height) * (width / PERSPECTIVE);
    
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width - xOffset * 2, y);
    ctx.strokeStyle = `rgba(49, 188, 17, ${0.3 - (i / GRID_ROWS) * 0.2})`;
    ctx.stroke();
  }
  
  // Add glow effect
  ctx.globalCompositeOperation = 'screen';
  const gradient = ctx.createLinearGradient(0, 0, 0, height);
  gradient.addColorStop(0, 'rgba(49, 188, 17, 0.1)');
  gradient.addColorStop(0.5, 'rgba(49, 188, 17, 0.05)');
  gradient.addColorStop(1, 'rgba(49, 188, 17, 0)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
};

export const NeonGrid: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const animate = (time: number) => {
      drawGrid(ctx, canvas.width, canvas.height, time / 1000);
      animationRef.current = requestAnimationFrame(animate);
    };

    const resizeCanvas = () => {
      const container = canvas.parentElement;
      if (!container) return;
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 0.5 }}
    />
  );
};