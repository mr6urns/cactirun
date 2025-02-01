// Core jump state management
export interface JumpState {
  isJumping: boolean;
  jumpsRemaining: number;
  velocity: number;
  jumpStartY: number | null;
}

export const createInitialJumpState = (): JumpState => ({
  isJumping: false,
  jumpsRemaining: 2,
  velocity: 0,
  jumpStartY: null
});