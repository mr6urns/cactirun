import React from 'react';

interface RetroTitleProps {
  small?: boolean;
}

export const RetroTitle: React.FC<RetroTitleProps> = ({ small }) => (
  <div className={`text-center ${small ? 'py-1' : 'py-1 sm:py-2 md:py-3'}`}>
    <h1 className={`relative font-['Press_Start_2P'] ${
      small ? 'text-lg' : 'text-2xl sm:text-3xl md:text-3xl lg:text-4xl'
    } tracking-wider mx-auto`}>
      {/* Solid 3D shadow layers with consistent thickness */}
      {Array.from({ length: small ? 6 : 12 }, (_, i) => i + 1).map((depth) => (
        <span
          key={depth}
          className="absolute inset-0 select-none pointer-events-none"
          style={{
            transform: `translate(${depth * (small ? 0.3 : 0.6)}px, ${depth * (small ? 0.3 : 0.6)}px)`,
            color: 'rgba(255, 255, 255, 0.08)',
            transition: 'all 0.3s ease-out'
          }}
        >
          PACA.RUN
        </span>
      ))}

      {/* Main title */}
      <span 
        className="relative block select-none"
        style={{
          color: '#ffffff',
          transition: 'all 0.3s ease-out'
        }}
      >
        PACA.RUN
      </span>
    </h1>
  </div>
);