import React from 'react';

interface ScoreProps {
  score: number;
}

export const Score: React.FC<ScoreProps> = ({ score }) => (
  <div className="mb-4 text-3xl font-bold text-[#D4AF37] bg-white px-6 py-2 rounded-lg shadow-lg border-2 border-[#D4AF37]">
    Score: {Math.floor(score)}
  </div>
);