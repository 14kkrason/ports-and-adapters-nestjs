import { Config, ConfigData } from '@app/ports';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigDataImplementation } from '@infrastructure/config';

@Injectable()
export class InMemoryConfig implements Config {
  constructor(
    @Inject(ConfigDataImplementation) private readonly data: ConfigData,
  ) {}

  public get(
    key: keyof ConfigData,
  ): string | number | boolean | Record<string, any> {
    const value = this.data[key];

    if (!value) {
      throw new TypeError(`Incorrect type ${key}`);
    }

    return value;
  }
}
