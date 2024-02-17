import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Config, ConfigData } from '@app/ports';

@Injectable()
export class EnvConfig implements Config {
    constructor(
        private readonly configService: ConfigService<ConfigData>
    ) {}

    public get(key: keyof ConfigData): string | number | boolean | Record<string, any> {
        return this.configService.getOrThrow(key);
    }
}