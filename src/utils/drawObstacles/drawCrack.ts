interface CrackProps {
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
}

export const drawCrack = (ctx: CanvasRenderingContext2D, props: CrackProps) => {
  const { x, y, width, height } = props;
  const time = Date.now() / 1000;

  ctx.save();
  ctx.globalCompositeOperation = 'screen';
  
  // Position flame to start at dome surface
  const flameWidth = width * 0.8;    // Smaller width
  const flameHeight = width * 0.6;    // Shorter height
  const flameY = y;                   // Start exactly at dome surface
  
  // Create multiple flame layers
  const layers = 4;
  for (let i = 0; i < layers; i++) {
    const layerOffset = i * 0.2;
    const flickerSpeed = 5 + i * 2;
    const flicker = Math.sin(time * flickerSpeed) * 0.2;
    
    // Create gradient for each flame layer
    const gradient = ctx.createRadialGradient(
      x, flameY,
      0,
      x, flameY,
      flameHeight * (1 - layerOffset)
    );
    
    gradient.addColorStop(0, `rgba(255, 0, 0, ${0.8 - layerOffset})`);
    gradient.addColorStop(0.4, `rgba(255, 0, 0, ${0.5 - layerOffset})`);
    gradient.addColorStop(1, 'rgba(255, 0, 0, 0)');
    
    ctx.fillStyle = gradient;
    
    // Draw more compact flame shape
    ctx.beginPath();
    ctx.moveTo(x - flameWidth/2, flameY);
    
    // Create tighter flame shape
    for (let j = 0; j <= 8; j++) {
      const t = j / 8;
      const waveX = Math.sin(t * Math.PI * 2 + time * (2 + i)) * (flameWidth/4);
      const waveY = Math.cos(t * Math.PI + time * 2) * (flameHeight/8);
      
      ctx.lineTo(
        x - flameWidth/2 + flameWidth * t + waveX,
        flameY - flameHeight * t * (1 + flicker) + waveY
      );
    }
    
    ctx.lineTo(x + flameWidth/2, flameY);
    ctx.closePath();
    ctx.fill();
  }

  // Add fewer spark particles
  const sparkCount = 8;
  for (let i = 0; i < sparkCount; i++) {
    const sparkTime = (time * 3 + i * 1.2) % 1;
    const angle = Math.PI * 1.5 + (Math.random() - 0.5) * Math.PI * 0.3;
    const distance = flameHeight * (1 - sparkTime) * 0.6;
    
    const sparkX = x + Math.cos(angle) * distance * 0.3;
    const sparkY = flameY - Math.abs(Math.sin(angle)) * distance;
    const sparkSize = (1 - sparkTime) * 2;

    ctx.beginPath();
    ctx.arc(sparkX, sparkY, sparkSize, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 0, 0, ${1 - sparkTime})`;
    ctx.fill();
  }

  // Reduced glow effect
  ctx.shadowColor = '#ff0000';
  ctx.shadowBlur = 20;
  ctx.fill();

  // Add smaller central glow
  const centerGlow = ctx.createRadialGradient(
    x, flameY - flameHeight * 0.2,
    0,
    x, flameY - flameHeight * 0.2,
    flameHeight * 0.3
  );
  centerGlow.addColorStop(0, 'rgba(255, 0, 0, 0.4)');
  centerGlow.addColorStop(1, 'rgba(255, 0, 0, 0)');
  ctx.fillStyle = centerGlow;
  ctx.fill();

  ctx.restore();
};