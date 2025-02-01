export interface Hitbox {
  left: number;
  right: number;
  top: number;
  bottom: number;
}

export type ZoneType = 'bounce' | 'beam';

export interface CollisionZone {
  hitbox: Hitbox;
  type: ZoneType;
}