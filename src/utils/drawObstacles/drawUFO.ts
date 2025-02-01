import { UFO } from '../constants';
import { Obstacle } from '../../types/game';
import { drawBeam } from './drawBeam';
import { drawUFOGrid } from './drawUFOGrid';
import { drawCrack } from './drawCrack';
import { drawUFOLight, getUFOLights } from '../lighting/ufoLighting';

export const drawUFO = (ctx: CanvasRenderingContext2D, obstacle: Obstacle) => {
  const { x, height, isFalling, rotation = 0, isBeaming, beamTimer = 0 } = obstacle;
  const roundedX = Math.floor(x);
  const roundedY = Math.floor(height);

  ctx.save();
  ctx.imageSmoothingEnabled = false;

  // Apply rotation for falling UFOs
  if (isFalling) {
    ctx.translate(roundedX + UFO.WIDTH/2, roundedY + UFO.HEIGHT/2);
    ctx.rotate(rotation);
    ctx.translate(-(roundedX + UFO.WIDTH/2), -(roundedY + UFO.HEIGHT/2));
  }

  // Draw beam if active
  if (isBeaming && !isFalling && beamTimer > 0) {
    drawBeam(ctx, {
      x: roundedX + UFO.WIDTH/2,
      y: roundedY + UFO.HEIGHT,
      width: UFO.BEAM_WIDTH,
      progress: beamTimer / UFO.BEAM_DURATION
    });
  }

  // Draw UFO base with metallic effect
  ctx.save();
  const baseX = Math.round(roundedX + UFO.WIDTH/2);
  const baseY = Math.round(roundedY + UFO.HEIGHT - 10);
  
  // Create single metallic gradient
  const baseGradient = ctx.createLinearGradient(
    baseX - UFO.WIDTH/2, baseY - UFO.HEIGHT/3,
    baseX + UFO.WIDTH/2, baseY + UFO.HEIGHT/3
  );
  baseGradient.addColorStop(0, '#888888');
  baseGradient.addColorStop(0.2, '#EEEEEE');
  baseGradient.addColorStop(0.5, '#FFFFFF');
  baseGradient.addColorStop(0.8, '#EEEEEE');
  baseGradient.addColorStop(1, '#888888');

  // Draw base shape
  ctx.beginPath();
  ctx.ellipse(
    baseX,
    baseY,
    UFO.WIDTH/2,
    UFO.HEIGHT/3,
    0, 0, Math.PI * 2
  );
  ctx.fillStyle = baseGradient;
  ctx.fill();
  ctx.restore();

  // Draw dome with retro grid
  ctx.globalCompositeOperation = 'source-over';
  ctx.shadowBlur = 0;
  
  const domeX = Math.round(roundedX + UFO.WIDTH/2);
  const domeY = Math.round(roundedY + UFO.HEIGHT - 15);
  const domeWidth = UFO.WIDTH/3;
  const domeHeight = UFO.HEIGHT/2;

  // Draw base dome color
  const gradient = ctx.createLinearGradient(
    domeX,
    roundedY,
    domeX,
    roundedY + UFO.HEIGHT - 5
  );
  gradient.addColorStop(0, '#39ff14');
  gradient.addColorStop(1, '#266b0d');

  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.ellipse(
    domeX,
    domeY,
    domeWidth,
    domeHeight,
    0, Math.PI, 0
  );
  ctx.fill();

  // Draw retro grid on dome
  if (!isFalling) {
    const time = Date.now() / 1000;
    drawUFOGrid(ctx, {
      x: domeX,
      y: domeY,
      width: domeWidth,
      height: domeHeight,
      time
    });
  }

  // Draw crack if falling
  if (isFalling) {
    drawCrack(ctx, {
      x: domeX,
      y: domeY,
      width: domeWidth * 2,
      height: domeHeight,
      rotation
    });
  }

  // Draw lights with enhanced effects
  if (!isFalling) {
    const time = Date.now() / 200;
    ctx.globalCompositeOperation = 'screen';
    
    const lights = getUFOLights(roundedX, roundedY);
    lights.forEach(light => drawUFOLight(ctx, light, time));
  }

  ctx.restore();
};