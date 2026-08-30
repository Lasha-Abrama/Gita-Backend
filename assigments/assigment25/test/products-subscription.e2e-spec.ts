/* eslint-disable @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access */
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../src/app.module';

describe('Products and subscriptions (e2e)', () => {
  let app: INestApplication<App>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('validates products and applies the subscription discount only to active users', async () => {
    await request(app.getHttpServer())
      .post('/products')
      .send({
        name: 'Keyboard',
        category: 'Technic',
        description: 'Mechanical keyboard',
        price: '100',
        quantity: '3',
      })
      .expect(201)
      .expect(({ body }) => {
        expect(body.price).toBe(100);
        expect(body.quantity).toBe(3);
      });

    await request(app.getHttpServer())
      .post('/products')
      .send({
        name: 'Invalid',
        category: 'Technic',
        description: 'Invalid quantity',
        price: 100,
        quantity: 1.5,
      })
      .expect(400);

    const userResponse = await request(app.getHttpServer())
      .post('/users')
      .send({
        firstName: 'Active',
        lastName: 'Member',
        email: 'active.member@example.com',
        phoneNumber: 555111222,
        gender: 'Male',
      })
      .expect(201);

    expect(
      new Date(userResponse.body.subscriptionStartDate).getTime(),
    ).toBeLessThanOrEqual(Date.now());
    expect(
      new Date(userResponse.body.subscriptionEndDate).getTime(),
    ).toBeGreaterThan(Date.now());

    await request(app.getHttpServer())
      .get('/products')
      .expect(200)
      .expect(({ body }) => expect(body[0].price).toBe(100));

    await request(app.getHttpServer())
      .get('/products')
      .set('email', 'active.member@example.com')
      .expect(200)
      .expect(({ body }) => expect(body[0].price).toBe(90));
  });

  it('validates and extends a user subscription by one month', async () => {
    const beforeUpgrade = await request(app.getHttpServer())
      .get('/users/1')
      .expect(200);

    const response = await request(app.getHttpServer())
      .patch('/users/upgrade-subscription')
      .send({ email: 'active.member@example.com' })
      .expect(200);

    expect(
      new Date(response.body.user.subscriptionEndDate).getTime(),
    ).toBeGreaterThan(
      new Date(beforeUpgrade.body.subscriptionEndDate).getTime(),
    );

    await request(app.getHttpServer())
      .patch('/users/upgrade-subscription')
      .send({ email: 'not-an-email' })
      .expect(400);
  });
});
