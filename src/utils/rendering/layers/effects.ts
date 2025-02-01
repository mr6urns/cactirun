import { GameState } from '../../../types/game';
import { updateCollisionParticles, drawCollisionParticles } from '../../effects/collisionParticles';

export const drawEffects = (
  ctx: CanvasRenderingContext2D, 
  gameState: GameState,
  deltaTime: number
) => {
  ctx.save();
  
  // Use screen blend mode for glow effects
  ctx.globalCompositeOperation = 'screen';
  
  // Update and draw particles
  updateCollisionParticles(deltaTime);
  drawCollisionParticles(ctx);
  
  ctx.restore();
};