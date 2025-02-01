import { CANVAS } from '../constants';

interface Star {
  x: number;
  y: number;
  size: number;
  twinkleSpeed: number;
  twinklePhase: number;
  color: string;
  connections: number[];
}

// Create stars with connection info
const stars: Star[] = Array.from({ length: 75 }, (_, index) => ({
  x: Math.random() * window.innerWidth,
  y: Math.random() * window.innerHeight,
  size: 0.5 + Math.random() * 1.5,
  twinkleSpeed: 0.1 + Math.random() * 0.3,
  twinklePhase: Math.random() * Math.PI * 2,
  color: Math.random() > 0.7 ? '#8ec7ff' : '#ffffff',
  connections: []
}));

// Initialize star connections
const initializeConnections = () => {
  stars.forEach((star, index) => {
    star.connections = [];
    const distances = stars
      .map((otherStar, otherIndex) => ({
        index: otherIndex,
        distance: Math.hypot(star.x - otherStar.x, star.y - otherStar.y)
      }))
      .filter(({ index }) => index !== index)
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 2 + Math.floor(Math.random() * 2))
      .map(({ index }) => index);
    
    star.connections = distances;
  });
};

initializeConnections();

export const drawStarBackground = (ctx: CanvasRenderingContext2D, time: number) => {
  ctx.save();
  ctx.globalCompositeOperation = 'screen';
  
  // Draw lattice connections with enhanced glow
  ctx.lineWidth = 0.5;
  stars.forEach((star, index) => {
    star.connections.forEach(connectionIndex => {
      const connectedStar = stars[connectionIndex];
      const distance = Math.hypot(star.x - connectedStar.x, star.y - connectedStar.y);
      const maxDistance = 200;
      
      if (distance < maxDistance) {
        const pulseSpeed = 0.5;
        const baseAlpha = 0.08;
        const pulseAlpha = Math.sin(time * pulseSpeed) * 0.03;
        const alpha = (baseAlpha + pulseAlpha) * (1 - distance / maxDistance);
        
        const gradient = ctx.createLinearGradient(
          star.x, star.y,
          connectedStar.x, connectedStar.y
        );
        
        const color = star.color === connectedStar.color ? star.color : '#ffffff';
        gradient.addColorStop(0, color.replace('1)', `${alpha})`));
        gradient.addColorStop(0.5, color.replace('1)', `${alpha * 1.2})`));
        gradient.addColorStop(1, color.replace('1)', '0)'));
        
        // Enhanced connection glow
        ctx.shadowColor = color;
        ctx.shadowBlur = 3;
        ctx.strokeStyle = gradient;
        ctx.beginPath();
        ctx.moveTo(star.x, star.y);
        ctx.lineTo(connectedStar.x, connectedStar.y);
        ctx.stroke();
      }
    });
  });
  
  // Draw stars with enhanced glow effect
  stars.forEach(star => {
    const twinkle = Math.sin(time * star.twinkleSpeed + star.twinklePhase) * 0.3 + 0.7;
    const alpha = 0.2 + twinkle * 0.3;
    
    // Draw outer glow
    ctx.shadowColor = star.color;
    ctx.shadowBlur = 8;
    ctx.fillStyle = star.color.replace('1)', `${alpha * 0.3})`);
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.size * 2, 0, Math.PI * 2);
    ctx.fill();
    
    // Draw inner glow
    ctx.shadowBlur = 4;
    ctx.fillStyle = star.color.replace('1)', `${alpha})`);
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
    ctx.fill();
    
    // Draw core
    ctx.shadowBlur = 2;
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.size * 0.5, 0, Math.PI * 2);
    ctx.fill();
  });
  
  ctx.restore();
};

// Handle window resize
window.addEventListener('resize', () => {
  stars.forEach(star => {
    star.x = Math.random() * window.innerWidth;
    star.y = Math.random() * window.innerHeight;
  });
  initializeConnections();
});