import { PlayerStateEntity } from '@domain/entities';

export interface PlayerStateStore {
  get(userId: string): PlayerStateEntity | null;
  set(playerState: PlayerStateEntity): string;
  remove(userId: string): boolean;
}
