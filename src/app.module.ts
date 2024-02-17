import { Module } from '@nestjs/common';
import { ExampleService } from '@app/services';
import { ConfigModule } from '@infrastructure/config';
import { RestModule } from '@presentation/rest';
import { WsModule } from '@presentation/ws';

const applicationServices = [ExampleService];
const domainServices = [];

@Module({
  imports: [
    RestModule.forRoot(),
    WsModule.forRoot(),
    ConfigModule.forRoot({ type: 'env' })
  ],
  controllers: [],
  providers: [...applicationServices, ...domainServices],
})
export class AppModule {
  constructor(
    private readonly exampleService: ExampleService
  ) {}

  onModuleInit() {
    this.exampleService.handle();
  }
}
