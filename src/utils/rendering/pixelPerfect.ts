export const setupPixelPerfectRendering = (ctx: CanvasRenderingContext2D) => {
  // Clear any existing transforms
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  
  // Disable image smoothing across all vendor prefixes
  ctx.imageSmoothingEnabled = false;
  (ctx as any).webkitImageSmoothingEnabled = false;
  (ctx as any).mozImageSmoothingEnabled = false;
  (ctx as any).msImageSmoothingEnabled = false;
  (ctx as any).oImageSmoothingEnabled = false;
  
  // Align to pixel grid
  ctx.translate(
    Math.round(ctx.canvas.width / 2) - (ctx.canvas.width / 2),
    Math.round(ctx.canvas.height / 2) - (ctx.canvas.height / 2)
  );
};

export const alignToPixelGrid = (ctx: CanvasRenderingContext2D) => {
  ctx.translate(0.5, 0.5);
};

export const resetTransform = (ctx: CanvasRenderingContext2D) => {
  ctx.setTransform(1, 0, 0, 1, 0, 0);
};