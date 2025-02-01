interface GridProps {
  x: number;
  y: number;
  width: number;
  height: number;
  time: number;
}

export const drawUFOGrid = (ctx: CanvasRenderingContext2D, props: GridProps) => {
  const { x, y, width, height, time } = props;
  
  ctx.save();
  
  // Create clip path for the dome
  ctx.beginPath();
  ctx.ellipse(x, y, width, height, 0, Math.PI, 0);
  ctx.clip();

  // Grid settings
  const GRID_SIZE = 10;
  const SCROLL_SPEED = time * 30;
  
  ctx.globalCompositeOperation = 'screen';
  ctx.strokeStyle = 'rgba(57, 255, 20, 0.3)';
  ctx.lineWidth = 1;

  // Draw vertical lines
  for (let i = -width; i <= width; i += GRID_SIZE) {
    const offset = (SCROLL_SPEED + i) % (GRID_SIZE * 2);
    const lineX = x + i - offset;
    
    ctx.beginPath();
    ctx.moveTo(lineX, y - height);
    ctx.lineTo(lineX - width/2, y);
    ctx.stroke();
  }

  // Draw horizontal lines
  const ROWS = 8;
  for (let i = 0; i <= ROWS; i++) {
    const progress = i / ROWS;
    const lineY = y - height + height * progress;
    const xOffset = progress * width/2;
    
    ctx.beginPath();
    ctx.moveTo(x - width + xOffset, lineY);
    ctx.lineTo(x + width - xOffset, lineY);
    ctx.stroke();
  }

  // Add subtle glow effect
  const gradient = ctx.createLinearGradient(x, y - height, x, y);
  gradient.addColorStop(0, 'rgba(57, 255, 20, 0.1)');
  gradient.addColorStop(1, 'rgba(57, 255, 20, 0)');
  
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.ellipse(x, y, width, height, 0, Math.PI, 0);
  ctx.fill();

  ctx.restore();
};