import { ScoreEffect } from '../../types/game';

export const createScoreEffect = (x: number, y: number, value: number): ScoreEffect => ({
  x,
  y,
  value,
  age: 0,
  opacity: 1
});

export const updateScoreEffect = (effect: ScoreEffect, deltaTime: number): ScoreEffect => ({
  ...effect,
  age: effect.age + deltaTime,
  y: effect.y - deltaTime * 150, // Slower upward movement for better readability
  opacity: Math.max(0, 1 - effect.age * 2) // Fade out over 0.5 seconds
});

export const drawScoreEffect = (ctx: CanvasRenderingContext2D, effect: ScoreEffect) => {
  if (effect.opacity <= 0) return;

  ctx.save();
  ctx.globalAlpha = effect.opacity;
  ctx.font = "bold 24px 'Press Start 2P'";
  ctx.fillStyle = '#39ff14'; // Changed to bright green for better visibility
  ctx.shadowColor = '#39ff14';
  ctx.shadowBlur = 10;
  
  const text = `+${Math.floor(effect.value)}`;
  const x = Math.round(effect.x - ctx.measureText(text).width / 2);
  const y = Math.round(effect.y);
  
  ctx.fillText(text, x, y);
  ctx.restore();
};