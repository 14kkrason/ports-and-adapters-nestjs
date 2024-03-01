import {
  PlayerStateEntity,
  PlayerStateProps,
} from '../entities/player-state.entity';

const idleStateProps = {
  playerId: '1',
  state: 'idle',
} as PlayerStateProps;

const matchmakingStateProps = {
  playerId: '1',
  state: 'matchmaking',
} as PlayerStateProps;

const inGameStateProps = {
  playerId: '1',
  state: 'in-game',
} as PlayerStateProps;

const prepare = () => {
  const idleState = new PlayerStateEntity(idleStateProps);
  const matchmakingState = new PlayerStateEntity(matchmakingStateProps);
  const inGameState = new PlayerStateEntity(inGameStateProps);

  return { idleState, matchmakingState, inGameState };
};

describe('PlayerStateEntity', () => {
  it('should start matchmaking only when in idle state', () => {
    const { idleState, matchmakingState, inGameState } = prepare();

    idleState.startMatchmaking();

    expect(idleState.getSnapshot().state).toBe('matchmaking');
    expect(() => {
      matchmakingState.startMatchmaking();
    }).toThrow();
    expect(() => {
      inGameState.startMatchmaking();
    }).toThrow();
  });

  it('should join game only when in matchmaking', () => {
    const { idleState, matchmakingState, inGameState } = prepare();

    matchmakingState.joinGame();

    expect(matchmakingState.getSnapshot().state).toBe('in-game');
    expect(() => {
      idleState.joinGame();
    }).toThrow();
    expect(() => {
      inGameState.joinGame();
    }).toThrow();
  });

  it('should exit matchmaking only when in matchmaking', () => {
    const { idleState, matchmakingState, inGameState } = prepare();

    matchmakingState.exitMatchmaking();

    expect(matchmakingState.getSnapshot().state).toBe('idle');
    expect(() => {
      idleState.exitMatchmaking();
    }).toThrow();
    expect(() => {
      inGameState.exitMatchmaking();
    }).toThrow();
  });

  it('should end game only when in game', () => {
    const { idleState, matchmakingState, inGameState } = prepare();

    inGameState.endGame();

    expect(inGameState.getSnapshot().state).toBe('idle');
    expect(() => {
      idleState.endGame();
    }).toThrow();
    expect(() => {
      matchmakingState.endGame();
    }).toThrow();
  });

  it('should corectly asess if the player can join game', () => {
    const { idleState, matchmakingState, inGameState } = prepare();

    expect(idleState.canStartGame()).toBe(false);
    expect(inGameState.canStartGame()).toBe(false);
    expect(matchmakingState.canStartGame()).toBe(true);
  });

  it('should corectly asess if the player can start matchmaking', () => {
    const { idleState, matchmakingState, inGameState } = prepare();

    expect(idleState.canStartMatchmaking()).toBe(true);
    expect(inGameState.canStartMatchmaking()).toBe(false);
    expect(matchmakingState.canStartMatchmaking()).toBe(false);
  });
});
