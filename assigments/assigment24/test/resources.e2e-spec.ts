/* eslint-disable @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access */
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../src/app.module';

describe('Users and expenses (e2e)', () => {
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

  describe('users', () => {
    it('returns the first 30 users by default', async () => {
      const response = await request(app.getHttpServer())
        .get('/users')
        .expect(200);

      expect(response.body.users).toHaveLength(30);
      expect(response.body.total).toBe(50);
      expect(response.body.page).toBe(1);
      expect(response.body.limit).toBe(30);
      expect(response.body.users[0].id).toBe(1);
      expect(response.body.users[29].id).toBe(30);
    });

    it('paginates users with page and take', async () => {
      const response = await request(app.getHttpServer())
        .get('/users?page=2&take=10')
        .expect(200);

      expect(response.body.users).toHaveLength(10);
      expect(response.body.page).toBe(2);
      expect(response.body.limit).toBe(10);
      expect(response.body.users[0].id).toBe(11);
      expect(response.body.users[9].id).toBe(20);
    });

    it('combines gender and email-prefix filters', async () => {
      const response = await request(app.getHttpServer())
        .get('/users?gender=m&email=g')
        .expect(200);

      expect(response.body.total).toBe(5);
      expect(
        response.body.users.every(
          (user: { gender: string; email: string }) =>
            user.gender === 'Male' && user.email.startsWith('g'),
        ),
      ).toBe(true);
    });

    it.each([
      '/users?gender=x',
      '/users?page=0',
      '/users?page=1.5',
      '/users?take=31',
      '/users?unknown=value',
    ])('rejects invalid query %s', async (url) => {
      await request(app.getHttpServer()).get(url).expect(400);
    });

    it('creates, reads, updates and deletes a validated user', async () => {
      const createResponse = await request(app.getHttpServer())
        .post('/users')
        .send({
          firstName: 'Test',
          lastName: 'User',
          email: 'test.user@gmail.com',
          phoneNumber: 555111222,
          gender: 'Male',
        })
        .expect(201);

      const userId = createResponse.body.id as number;

      expect(createResponse.body).toMatchObject({
        firstName: 'Test',
        lastName: 'User',
        email: 'test.user@gmail.com',
        phoneNumber: 555111222,
        gender: 'Male',
      });

      await request(app.getHttpServer())
        .get(`/users/${userId}`)
        .expect(200)
        .expect(({ body }) => {
          expect(body.id).toBe(userId);
        });

      await request(app.getHttpServer())
        .patch(`/users/${userId}`)
        .send({ firstName: 'Updated' })
        .expect(200)
        .expect(({ body }) => {
          expect(body.firstName).toBe('Updated');
          expect(body.email).toBe('test.user@gmail.com');
        });

      await request(app.getHttpServer()).delete(`/users/${userId}`).expect(200);

      await request(app.getHttpServer()).get(`/users/${userId}`).expect(404);
    });

    it.each([
      {
        firstName: 'T',
        lastName: 'User',
        email: 'invalid-email',
        phoneNumber: 12,
        gender: 'Other',
      },
      {
        firstName: 'Test',
        lastName: 'User',
        email: 'test@gmail.com',
        phoneNumber: 555111222,
        gender: 'Male',
        unexpected: true,
      },
    ])('rejects invalid user body', async (body) => {
      await request(app.getHttpServer()).post('/users').send(body).expect(400);
    });

    it('rejects a non-numeric user id', async () => {
      await request(app.getHttpServer()).get('/users/abc').expect(400);
    });
  });

  describe('expenses', () => {
    it('returns the first 30 expenses by default', async () => {
      const response = await request(app.getHttpServer())
        .get('/expenses')
        .expect(200);

      expect(response.body.expenses).toHaveLength(30);
      expect(response.body.total).toBe(50);
      expect(response.body.page).toBe(1);
      expect(response.body.limit).toBe(30);
      expect(response.body.expenses[0].id).toBe(1);
      expect(response.body.expenses[29].id).toBe(30);
    });

    it('paginates expenses with page and take', async () => {
      const response = await request(app.getHttpServer())
        .get('/expenses?page=2&take=10')
        .expect(200);

      expect(response.body.expenses).toHaveLength(10);
      expect(response.body.page).toBe(2);
      expect(response.body.limit).toBe(10);
      expect(response.body.expenses[0].id).toBe(11);
      expect(response.body.expenses[9].id).toBe(20);
    });

    it('combines category and price filters', async () => {
      const response = await request(app.getHttpServer())
        .get('/expenses?category=food&priceFrom=10&priceTo=40')
        .expect(200);

      expect(response.body.total).toBe(4);
      expect(
        response.body.expenses.every(
          (expense: { category: string; price: number }) =>
            expense.category === 'Food' &&
            expense.price >= 10 &&
            expense.price <= 40,
        ),
      ).toBe(true);
    });

    it.each([
      '/expenses?category=unknown',
      '/expenses?priceFrom=abc',
      '/expenses?page=0',
      '/expenses?take=31',
      '/expenses?unknown=value',
    ])('rejects invalid query %s', async (url) => {
      await request(app.getHttpServer()).get(url).expect(400);
    });

    it('rejects an inverted price range', async () => {
      await request(app.getHttpServer())
        .get('/expenses?priceFrom=100&priceTo=10')
        .expect(400);
    });

    it('creates, reads, updates and deletes a validated expense', async () => {
      const createResponse = await request(app.getHttpServer())
        .post('/expenses')
        .send({
          category: 'food',
          productName: 'Test Product',
          quantity: 2,
          price: 12,
        })
        .expect(201);

      const expenseId = createResponse.body.id as number;

      expect(createResponse.body).toMatchObject({
        category: 'food',
        productName: 'Test Product',
        quantity: 2,
        price: 12,
        totalPrice: 24,
      });

      await request(app.getHttpServer())
        .get(`/expenses/${expenseId}`)
        .expect(200)
        .expect(({ body }) => {
          expect(body.id).toBe(expenseId);
        });

      await request(app.getHttpServer())
        .patch(`/expenses/${expenseId}`)
        .send({ price: 20 })
        .expect(200)
        .expect(({ body }) => {
          expect(body.price).toBe(20);
          expect(body.totalPrice).toBe(40);
        });

      await request(app.getHttpServer())
        .delete(`/expenses/${expenseId}`)
        .expect(200);

      await request(app.getHttpServer())
        .get(`/expenses/${expenseId}`)
        .expect(404);
    });

    it.each([
      {
        category: 'unknown',
        productName: 'Test',
        quantity: 1,
        price: 10,
      },
      {
        category: 'food',
        productName: '',
        quantity: 0,
        price: 0,
      },
      {
        category: 'food',
        productName: 'Test',
        quantity: 1.5,
        price: 10,
      },
      {
        category: 'food',
        productName: 'Test',
        quantity: 1,
        price: 10,
        unexpected: true,
      },
    ])('rejects invalid expense body', async (body) => {
      await request(app.getHttpServer())
        .post('/expenses')
        .send(body)
        .expect(400);
    });

    it('rejects a non-numeric expense id', async () => {
      await request(app.getHttpServer()).get('/expenses/abc').expect(400);
    });
  });
});
