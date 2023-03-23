import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './features/users/users.module';
import { AuthModule } from './features/auth/auth.module';
import * as redisStore from 'cache-manager-redis-store';
import { APP_GUARD } from '@nestjs/core';
import { ProxyGuard } from './features/auth/guards/proxy.guard';
import { MoneyModule } from './features/Note/note.module';

@Module({
  // providers: [
  //   {
  //     provide: APP_GUARD,
  //     useClass: ProxyGuard,
  //   },
  // ],
  imports: [
    UsersModule,
    AuthModule,
    MoneyModule,
    //
    CacheModule.registerAsync({
      inject: [ConfigService],
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      useFactory: async (config: ConfigService) => {
        console.log(config.get('REDIS_PWD'));
        console.log(config.get('REDIS_HOST'));
        console.log(config.get('REDIS_PORT'));
        return {
          store: redisStore,
          host: config.get('REDIS_HOST'),
          port: Number(config.get('REDIS_PORT')),
          password: config.get('REDIS_PWD'),
          ttl: null,
        };
      },
      isGlobal: true,
    }),
    //
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        uri: config.get<string>('MONGODB_URI'), // Loaded from .ENV
      }),
    }),
    //
    ConfigModule.forRoot({ isGlobal: true }),
  ],
})
export class AppModule {}
