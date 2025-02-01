import { CANVAS } from '../../constants';
import { PORTAL } from './constants';

interface VineSegment {
  x: number;
  y: number;
  angle: number;
}

export const drawVines = (ctx: CanvasRenderingContext2D, x: number, time: number) => {
  const { COUNT, MAX_LENGTH, COLORS } = PORTAL.VINES;
  const y = CANVAS.GROUND_Y;
  
  ctx.save();
  
  for (let i = 0; i < COUNT; i++) {
    const segments: VineSegment[] = [];
    let currentX = x - PORTAL.GATE.WIDTH/2 + (i * PORTAL.GATE.WIDTH/(COUNT-1));
    let currentY = y;
    let currentAngle = -Math.PI/2 + Math.sin(time + i) * 0.2;
    
    // Generate vine segments
    for (let j = 0; j < MAX_LENGTH; j += 5) {
      segments.push({
        x: currentX,
        y: currentY,
        angle: currentAngle
      });
      
      currentX += Math.cos(currentAngle) * 5;
      currentY += Math.sin(currentAngle) * 5;
      currentAngle += Math.sin(time * 2 + i + j * 0.1) * 0.1;
    }
    
    // Draw vine
    ctx.beginPath();
    ctx.moveTo(segments[0].x, segments[0].y);
    segments.forEach(segment => {
      ctx.lineTo(segment.x, segment.y);
    });
    
    // Create gradient for vine
    const gradient = ctx.createLinearGradient(x, y, x, y - MAX_LENGTH);
    gradient.addColorStop(0, COLORS.PRIMARY);
    gradient.addColorStop(0.5, COLORS.HIGHLIGHT);
    gradient.addColorStop(1, COLORS.SECONDARY);
    
    ctx.strokeStyle = gradient;
    ctx.lineWidth = 3;
    ctx.stroke();
    
    // Add leaves
    segments.forEach((segment, index) => {
      if (index % 15 === 0) {
        ctx.beginPath();
        ctx.ellipse(
          segment.x, 
          segment.y,
          8,
          4,
          segment.angle + Math.PI/4,
          0,
          Math.PI * 2
        );
        ctx.fillStyle = COLORS.PRIMARY;
        ctx.fill();
      }
    });
  }
  
  ctx.restore();
};