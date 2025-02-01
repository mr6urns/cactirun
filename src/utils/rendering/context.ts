export const setupContext = (ctx: CanvasRenderingContext2D) => {
  // Enable image smoothing only when needed
  ctx.imageSmoothingEnabled = false;
  
  // Reset transform matrix
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  
  // Align to pixel grid for sharp rendering
  ctx.translate(0.5, 0.5);
};