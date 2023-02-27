import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import * as fs from 'fs';

async function bootstrap() {
  //
  const httpsOptions = {
    key: fs.readFileSync('./private-key.pem'),
    cert: fs.readFileSync('./public-certificate.pem'),
  };

  const app = await NestFactory.create(AppModule, { httpsOptions });

  //#region
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    optionsSuccessStatus: 204,
    credentials: true,
  });
  //#endregion

  //
  app.use(cookieParser(process.env.CK_SECRET));
  //
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  //
  await app.listen(process.env.PORT || 3333);
}
bootstrap();
