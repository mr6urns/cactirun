import { CANVAS, UFO } from '../constants';

interface BeamProps {
  x: number;
  y: number;
  width: number;
  progress: number;
}

export const drawBeam = (ctx: CanvasRenderingContext2D, beam: BeamProps) => {
  const { x, y, width, progress } = beam;
  const totalDuration = UFO.BEAM_DURATION;
  const warningPhase = UFO.BEAM_PHASES.WARNING * totalDuration;
  const activePhase = UFO.BEAM_PHASES.ACTIVE * totalDuration;
  
  ctx.save();
  ctx.globalCompositeOperation = 'screen';
  
  // Warning phase
  if (progress > (warningPhase + activePhase) / totalDuration) {
    const warningProgress = (progress * totalDuration - (warningPhase + activePhase)) / warningPhase;
    const blinkState = Math.sin(warningProgress * Math.PI * 6) > 0;
    
    if (blinkState) {
      ctx.beginPath();
      ctx.arc(x, y, width/2, 0, Math.PI * 2);
      ctx.fillStyle = '#ff0000';
      ctx.shadowColor = '#ff0000';
      ctx.shadowBlur = 20;
      ctx.fill();
    }
  } 
  // Active beam phase
  else if (progress > 0.1) {
    const beamOpacity = 0.9; // Increased opacity
    
    // Base glow
    const baseGlow = ctx.createRadialGradient(x, y, 0, x, y, width);
    baseGlow.addColorStop(0, `rgba(255, 0, 0, ${beamOpacity})`);
    baseGlow.addColorStop(1, 'rgba(255, 0, 0, 0)');
    
    ctx.beginPath();
    ctx.arc(x, y, width/2, 0, Math.PI * 2);
    ctx.fillStyle = baseGlow;
    ctx.shadowColor = '#ff0000';
    ctx.shadowBlur = 20;
    ctx.fill();

    // Main beam
    const beamHeight = CANVAS.GROUND_Y - y;
    const expansionWidth = width * (1 + UFO.BEAM.EXPANSION_RATE);
    
    // Draw beam gradient with more intense red
    const beamGradient = ctx.createLinearGradient(x, y, x, CANVAS.GROUND_Y);
    beamGradient.addColorStop(0, `rgba(255, 0, 0, ${beamOpacity})`);
    beamGradient.addColorStop(0.5, `rgba(255, 50, 50, ${beamOpacity * 0.8})`);
    beamGradient.addColorStop(1, 'rgba(255, 0, 0, 0)');
    
    // Draw expanding beam
    ctx.beginPath();
    ctx.moveTo(x - width/2, y);
    ctx.lineTo(x + width/2, y);
    ctx.lineTo(x + expansionWidth, CANVAS.GROUND_Y);
    ctx.lineTo(x - expansionWidth, CANVAS.GROUND_Y);
    ctx.closePath();
    ctx.fillStyle = beamGradient;
    ctx.shadowBlur = 30;
    ctx.fill();
    
    // Add beam particles with enhanced glow
    const time = Date.now() / 200;
    for (let i = 0; i < UFO.BEAM.PARTICLE_COUNT; i++) {
      const particleProgress = (time + i / UFO.BEAM.PARTICLE_COUNT) % 1;
      const particleY = y + beamHeight * particleProgress;
      const spread = particleProgress * expansionWidth;
      const wobble = Math.sin(time * 20 + i * 2) * spread * 0.2;
      
      ctx.beginPath();
      ctx.arc(
        x + wobble,
        particleY,
        1.5 + Math.random() * 2.5,
        0,
        Math.PI * 2
      );
      ctx.fillStyle = `rgba(255, 50, 50, ${beamOpacity * (1 - particleProgress)})`;
      ctx.shadowBlur = 15;
      ctx.fill();
    }
  }
  
  ctx.restore();
};