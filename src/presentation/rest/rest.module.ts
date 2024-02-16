import { DynamicModule, ModuleMetadata } from '@nestjs/common';

export class RestModule {
  public static forRoot(imports?: ModuleMetadata['imports']): DynamicModule {
    return {
      global: true,
      module: RestModule,
      imports: imports ?? [],
      exports: [],
      providers: [],
      controllers: [],
    };
  }
}
