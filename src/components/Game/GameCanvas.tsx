import React, { useEffect, useCallback } from 'react';
import { resizeCanvas } from '../../utils/rendering/canvas';

interface GameCanvasProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
}

export const GameCanvas: React.FC<GameCanvasProps> = ({ canvasRef }) => {
  const handleResize = useCallback(() => {
    if (canvasRef.current) {
      resizeCanvas(canvasRef.current);
    }
  }, [canvasRef]);

  useEffect(() => {
    handleResize();
    
    const debouncedResize = () => {
      requestAnimationFrame(handleResize);
    };
    
    window.addEventListener('resize', debouncedResize, { passive: true });
    window.addEventListener('orientationchange', handleResize);
    
    setTimeout(handleResize, 100);
    
    return () => {
      window.removeEventListener('resize', debouncedResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, [handleResize]);

  return (
    <div className="absolute inset-0 bg-black flex items-center justify-center">
      <canvas
        ref={canvasRef}
        className="max-w-full max-h-full w-auto h-auto"
        style={{
          touchAction: 'none',
          WebkitTapHighlightColor: 'transparent'
        }}
      />
    </div>
  );
};