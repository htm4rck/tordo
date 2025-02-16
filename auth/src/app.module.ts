import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {AuthModule} from "./module/auth/auth.module";
import {EntitiesModule} from "./entity/entities.module";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432', 10),
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'yourpassword',
      database: process.env.DB_NAME || 'general',
      schema: process.env.DB_SCHEMA || 'auth',
      autoLoadEntities: true,
      synchronize: true,
      dropSchema: false,
      logging: true,
    }),
      EntitiesModule, AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}