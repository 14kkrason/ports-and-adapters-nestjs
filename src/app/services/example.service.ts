import { Inject, Injectable } from '@nestjs/common';
import { ConfigImplementation } from '@infrastructure/config';
import { Config } from '@app/ports';

@Injectable()
export class ExampleService {
  constructor(@Inject(ConfigImplementation) private readonly config: Config) {}

  public handle() {
    return this.config.get('example');
  }
}
