interface BeamParticles {
  x: number;
  y: number;
  width: number;
  height: number;
  opacity: number;
}

export const drawBeamParticles = (ctx: CanvasRenderingContext2D, beam: BeamParticles) => {
  const particleCount = Math.floor(beam.height / 20);
  const time = Date.now() / 1000;

  for (let i = 0; i < particleCount; i++) {
    const yOffset = (i * 20 + time * 100) % beam.height;
    const xOffset = Math.sin((time + i) * 2) * (beam.width / 4);
    const size = 2 + Math.sin((time + i) * 3) * 1;
    
    ctx.fillStyle = `rgba(255, 255, 255, ${beam.opacity * 0.8})`;
    ctx.beginPath();
    ctx.arc(
      beam.x + xOffset,
      beam.y + yOffset,
      size,
      0,
      Math.PI * 2
    );
    ctx.fill();
  }
};