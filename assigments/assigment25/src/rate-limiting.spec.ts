/* eslint-disable @typescript-eslint/no-unsafe-argument */
import {
  Controller,
  Get,
  INestApplication,
  Module,
  Post,
} from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { Test } from '@nestjs/testing';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import request from 'supertest';
import {
  GLOBAL_RATE_LIMIT,
  RATE_LIMIT_WINDOW,
  WRITE_RATE_LIMIT,
} from './common/constants/rate-limit.constants';
import { WriteThrottle } from './common/decorators/write-throttle.decorator';

@Controller('rate-limit-test')
class RateLimitTestController {
  @Get('read')
  read() {
    return { ok: true };
  }

  @Post('write')
  @WriteThrottle()
  write() {
    return { ok: true };
  }
}

@Module({
  imports: [
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: RATE_LIMIT_WINDOW,
          limit: GLOBAL_RATE_LIMIT,
        },
      ],
    }),
  ],
  controllers: [RateLimitTestController],
  providers: [{ provide: APP_GUARD, useClass: ThrottlerGuard }],
})
class RateLimitTestModule {}

describe('Rate limiting', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [RateLimitTestModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('blocks the 31st request to a regular endpoint within one minute', async () => {
    for (
      let requestNumber = 0;
      requestNumber < GLOBAL_RATE_LIMIT;
      requestNumber++
    ) {
      await request(app.getHttpServer())
        .get('/rate-limit-test/read')
        .expect(200);
    }

    await request(app.getHttpServer()).get('/rate-limit-test/read').expect(429);
  });

  it('blocks the 6th request to a database-write endpoint within one minute', async () => {
    for (
      let requestNumber = 0;
      requestNumber < WRITE_RATE_LIMIT;
      requestNumber++
    ) {
      await request(app.getHttpServer())
        .post('/rate-limit-test/write')
        .expect(201);
    }

    await request(app.getHttpServer())
      .post('/rate-limit-test/write')
      .expect(429);
  });
});
