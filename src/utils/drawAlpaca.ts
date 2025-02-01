import { ALPACA } from './constants';

// Create and configure image with loading handler
const playerImage = new Image();
playerImage.src = 'https://i.ibb.co/60RzNMd/chupalogorun.png';

// Pre-render image to offscreen canvas for better quality
const offscreenCanvas = new OffscreenCanvas(ALPACA.WIDTH, ALPACA.HEIGHT);
const offscreenCtx = offscreenCanvas.getContext('2d', { 
  alpha: true,
  willReadFrequently: false
})!;

// Once image loads, pre-render it
playerImage.onload = () => {
  if (offscreenCtx) {
    offscreenCtx.imageSmoothingEnabled = false;
    offscreenCtx.clearRect(0, 0, ALPACA.WIDTH, ALPACA.HEIGHT);
    offscreenCtx.drawImage(
      playerImage,
      0, 0,
      ALPACA.WIDTH, ALPACA.HEIGHT
    );
  }
};

export const drawAlpaca = (
  ctx: CanvasRenderingContext2D, 
  x: number, 
  y: number
) => {
  if (!playerImage.complete) return;

  ctx.save();
  
  // Ensure crisp pixel rendering
  ctx.imageSmoothingEnabled = false;
  ctx.imageSmoothingQuality = 'high';
  
  // Use integer coordinates for sharp rendering
  const drawX = Math.round(x);
  const drawY = Math.round(y);
  
  // Draw from pre-rendered canvas
  ctx.drawImage(
    offscreenCanvas,
    drawX, drawY,
    ALPACA.WIDTH, ALPACA.HEIGHT
  );
  
  ctx.restore();
};