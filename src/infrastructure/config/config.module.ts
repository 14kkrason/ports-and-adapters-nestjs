import { DynamicModule, Module } from "@nestjs/common";
import { ConfigModule as NestConfigModule } from "@nestjs/config";
import { EnvConfig } from "@infrastructure/config"

export const ConfigImplementation = 'ConfigImplementation';

export type ConfigModuleConfig = {
    type: 'env'
}

@Module({ exports: [ConfigImplementation]})
export class ConfigModule {
    public static forRoot(config: ConfigModuleConfig): DynamicModule {
        if (config.type === 'env') {
            const configProvider = {
                provide: ConfigImplementation,
                useClass: EnvConfig
            };

            return {
                global: true,
                module: ConfigModule,
                imports: [
                    NestConfigModule.forRoot()
                ],
                providers: [configProvider]
            }
        }
    }
}