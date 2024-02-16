import { Module } from '@nestjs/common';
import { RestModule } from './presentation/rest/rest.module';
import { WsModule } from './presentation/ws/ws.module';

const applicationServices = [];
const domainServices = [];

@Module({
  imports: [RestModule.forRoot(), WsModule.forRoot()],
  controllers: [],
  providers: [...applicationServices, ...domainServices],
})
export class AppModule {}
