import { ALPACA } from '../../constants';
import { PlayerState } from '../../../types/game';

export const drawPlayer = (ctx: CanvasRenderingContext2D, player: PlayerState) => {
  ctx.save();
  
  // Use integer coordinates for sharp rendering
  const x = Math.floor(ALPACA.START_X);
  const y = Math.floor(player.y);

  // Draw player with optimized state changes
  ctx.translate(x + ALPACA.WIDTH, y);
  ctx.scale(-1, 1);
  
  // Draw player shape (placeholder for sprite)
  ctx.fillStyle = '#8ec7ff';
  ctx.fillRect(0, 0, ALPACA.WIDTH, ALPACA.HEIGHT);
  
  ctx.restore();
};