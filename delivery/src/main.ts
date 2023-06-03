import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DataSeedService } from './dataseed/dataseed.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  const dataSeedService = app.get(DataSeedService);

  await dataSeedService.seedDatabase();

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  await app.listen(3000);
}
bootstrap();
