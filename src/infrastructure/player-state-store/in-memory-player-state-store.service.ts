import { PlayerStateStore } from '@app/ports';
import { PlayerStateEntity, PlayerStateProps } from '@domain/entities';
import { Injectable } from '@nestjs/common';

@Injectable()
export class InMemoryPlayerStateStore implements PlayerStateStore {
  private playerStateStore = new Map<string, PlayerStateProps>();

  public get(playerId: string): PlayerStateEntity | null {
    const props = this.playerStateStore.get(playerId);

    if (props) {
      return new PlayerStateEntity(props);
    }

    return null;
  }

  public set(playerState: PlayerStateEntity): string {
    const props = playerState.getSnapshot();
    this.playerStateStore.set(props.playerId, props);

    return props.playerId;
  }

  public remove(playerId: string): boolean {
    return this.playerStateStore.delete(playerId);
  }
}
