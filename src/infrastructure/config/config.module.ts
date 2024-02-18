import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { ConfigData } from '@app/ports';
import { EnvConfig } from '@infrastructure/config';
import { InMemoryConfig } from '@infrastructure/config';

export const ConfigImplementation = 'ConfigImplementation';
export const ConfigDataImplementation = 'ConfigData';

export type ConfigModuleConfig = {
  type: 'env' | 'in-memory';
  data?: ConfigData;
};

@Module({ exports: [ConfigImplementation] })
export class ConfigModule {
  public static forRoot(config: ConfigModuleConfig): DynamicModule {
    if (config.type === 'in-memory' && config.data) {
      const providers = [
        { provide: ConfigImplementation, useClass: InMemoryConfig },
        { provide: ConfigDataImplementation, useValue: config.data },
      ];

      return {
        global: true,
        module: ConfigModule,
        providers,
      };
    }

    if (config.type === 'env') {
      const providers = [
        {
          provide: ConfigImplementation,
          useClass: EnvConfig,
        },
      ];

      return {
        global: true,
        module: ConfigModule,
        imports: [NestConfigModule.forRoot()],
        providers,
      };
    }

    throw new Error('Incorrect adapter configuration: config.');
  }
}
