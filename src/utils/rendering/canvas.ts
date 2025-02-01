import { VIEWPORT } from '../constants/viewport';

export const resizeCanvas = (canvas: HTMLCanvasElement) => {
  const container = canvas.parentElement;
  if (!container) return;

  // Get container dimensions
  const containerWidth = container.clientWidth;
  const containerHeight = container.clientHeight;

  // Set canvas dimensions to match container exactly
  canvas.width = containerWidth;
  canvas.height = containerHeight;

  // Apply crisp rendering styles
  Object.assign(canvas.style, {
    width: '100%',
    height: '100%',
    imageRendering: 'pixelated',
    transform: 'translateZ(0)',
    backfaceVisibility: 'hidden'
  });
};