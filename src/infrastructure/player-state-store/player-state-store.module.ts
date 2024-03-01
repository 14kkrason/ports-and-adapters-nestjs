import { Module } from '@nestjs/common';
import { InMemoryPlayerStateStore } from './in-memory-player-state-store.service';

export const PlayerStateStoreImplementation = 'PlayerStateStoreImplementation';
export type PlayerStateStoreConfig = {
  type: 'in-memory';
};

@Module({ exports: [PlayerStateStoreImplementation] })
export class PlayerStateStoreModule {
  public static forRoot(config: PlayerStateStoreConfig) {
    if (config.type === 'in-memory') {
      const providers = [
        {
          provide: PlayerStateStoreImplementation,
          useClass: InMemoryPlayerStateStore,
        },
      ];

      return {
        global: true,
        module: PlayerStateStoreModule,
        providers,
      };
    }
  }
}
