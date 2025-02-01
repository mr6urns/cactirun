// Rank color utilities
export const getRankColor = (index: number): string => {
  switch (index) {
    case 0: return 'text-[#ffd700]'; // Gold
    case 1: return 'text-[#c0c0c0]'; // Silver
    case 2: return 'text-[#cd7f32]'; // Bronze
    default: return 'text-white';
  }
};

// Rank text utilities
export const getRankText = (index: number): string => {
  switch (index) {
    case 0: return '1ST';
    case 1: return '2ND';
    case 2: return '3RD';
    default: return `${index + 1}TH`;
  }
};