import { DynamicModule, ModuleMetadata } from '@nestjs/common';

export class WsModule {
  public static forRoot(imports?: ModuleMetadata['imports']): DynamicModule {
    return {
      global: true,
      module: WsModule,
      imports: imports ?? [],
      exports: [],
      providers: [],
    };
  }
}
