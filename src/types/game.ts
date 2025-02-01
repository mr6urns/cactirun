export interface GameState {
  alpaca: {
    x: number;
    y: number;
    velocity: number;
    isJumping: boolean;
    jumpsRemaining: number;
    powerState: {
      level: number;
      maxLevel: number;
      glowIntensity: number;
    };
  };
  obstacles: Obstacle[];
  score: number;
  speed: number;
  highScore: number;
  camera: Camera;
  streak: number;
}