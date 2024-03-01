import { Entity } from './entity';

export interface PlayerStateProps {
  playerId: string;
  state: 'idle' | 'matchmaking' | 'in-game';
}

export class PlayerStateEntity extends Entity<PlayerStateProps> {
  constructor(props: PlayerStateProps) {
    super(props);
  }

  public canStartGame(): boolean {
    return this.props.state === 'matchmaking';
  }

  public canStartMatchmaking(): boolean {
    return this.props.state === 'idle';
  }

  public startMatchmaking(): void {
    if (this.props.state === 'idle') {
      this.props.state = 'matchmaking';

      return;
    }

    throw new Error('Cannot start matchmaking: player state is not "idle"');
  }

  public exitMatchmaking(): void {
    if (this.props.state === 'matchmaking') {
      this.props.state = 'idle';

      return;
    }

    throw new Error('Cannot end game: player is not in matchmaking');
  }

  public joinGame(): void {
    if (this.props.state === 'matchmaking') {
      this.props.state = 'in-game';

      return;
    }

    throw new Error('Cannot start game: player state is not "matchmaking"');
  }

  public endGame(): void {
    if (this.props.state === 'in-game') {
      this.props.state = 'idle';

      return;
    }

    throw new Error('Cannot end game: player is not in game');
  }
}
