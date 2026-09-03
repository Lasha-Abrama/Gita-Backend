import { ExpensesService } from './expenses.service';
import { TopSpendersQueryDto } from './dtos/top-spenders-query.dto';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

describe('ExpensesService statistics', () => {
  it('groups expenses by category with totals, counts, and expense documents', async () => {
    const aggregate = jest.fn().mockResolvedValue([
      {
        category: 'food',
        total: 150,
        count: 3,
        expenses: [{ productName: 'Lunch' }],
      },
    ]);
    const service = new ExpensesService({ aggregate } as never, {} as never);

    await expect(service.getStatistics()).resolves.toEqual([
      {
        category: 'food',
        total: 150,
        count: 3,
        expenses: [{ productName: 'Lunch' }],
      },
    ]);
    expect(aggregate).toHaveBeenCalledWith([
      {
        $group: {
          _id: '$category',
          total: { $sum: '$totalPrice' },
          count: { $sum: 1 },
          expenses: { $push: '$$ROOT' },
        },
      },
      {
        $project: {
          _id: 0,
          category: '$_id',
          total: 1,
          count: 1,
          expenses: 1,
        },
      },
      { $sort: { category: 1 } },
    ]);
  });

  it('groups owners, sorts them by spending, and applies the requested limit', async () => {
    const aggregate = jest.fn().mockResolvedValue([
      { userId: 'user-5', totalSpent: 1250 },
      { userId: 'user-2', totalSpent: 980 },
    ]);
    const service = new ExpensesService({ aggregate } as never, {} as never);

    await expect(service.getTopSpenders(2)).resolves.toEqual([
      { userId: 'user-5', totalSpent: 1250 },
      { userId: 'user-2', totalSpent: 980 },
    ]);
    expect(aggregate).toHaveBeenCalledWith([
      {
        $group: {
          _id: '$owner',
          totalSpent: { $sum: '$totalPrice' },
        },
      },
      { $sort: { totalSpent: -1 } },
      { $limit: 2 },
      {
        $project: {
          _id: 0,
          userId: '$_id',
          totalSpent: 1,
        },
      },
    ]);
  });

  it('uses a default limit of 10 and validates custom limits', async () => {
    expect(new TopSpendersQueryDto().limit).toBe(10);

    const customLimit = plainToInstance(TopSpendersQueryDto, { limit: '3' });
    const invalidLimit = plainToInstance(TopSpendersQueryDto, { limit: '0' });

    expect(customLimit.limit).toBe(3);
    await expect(validate(customLimit)).resolves.toHaveLength(0);
    await expect(validate(invalidLimit)).resolves.toHaveLength(1);
  });
});
