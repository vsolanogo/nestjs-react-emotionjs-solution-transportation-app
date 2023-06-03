import { Test, TestingModule } from '@nestjs/testing';
import { DataSource } from 'typeorm';
import { AppModule } from '../src/app.module';

//purge database between e2e tests

global.beforeEach(async () => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  moduleFixture.get(DataSource).dropDatabase();
});

global.afterEach(async () => {});
