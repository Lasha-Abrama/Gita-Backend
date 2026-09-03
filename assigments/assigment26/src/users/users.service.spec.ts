import { UsersService } from './users.service';
import { UserGender } from './enums/user-gender.enum';
import { addIsActiveToUsers } from '../migrations/add-is-active-to-users';

describe('UsersService statistics and activation', () => {
  it('creates users as active', async () => {
    const create = jest.fn().mockResolvedValue({ _id: 'user-id' });
    const userModel = {
      findOne: jest.fn().mockResolvedValue(null),
      create,
    };
    const service = new UsersService(userModel as never);

    await service.createUser({
      password: 'password',
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'Jane@example.com',
      phoneNumber: '555111222',
      gender: UserGender.Female,
      age: 27,
    });

    expect(create).toHaveBeenCalledWith(
      expect.objectContaining({
        email: 'jane@example.com',
        age: 27,
        isActive: true,
      }),
    );
  });

  it('groups every gender and calculates its average age in MongoDB', async () => {
    const aggregate = jest.fn().mockResolvedValue([
      { gender: UserGender.Female, averageAge: 27.2 },
      { gender: UserGender.Male, averageAge: 25.5 },
    ]);
    const service = new UsersService({ aggregate } as never);

    await expect(service.getStatistics()).resolves.toEqual([
      { gender: UserGender.Female, averageAge: 27.2 },
      { gender: UserGender.Male, averageAge: 25.5 },
    ]);
    expect(aggregate).toHaveBeenCalledWith([
      {
        $group: {
          _id: '$gender',
          averageAge: { $avg: '$age' },
        },
      },
      {
        $project: {
          _id: 0,
          gender: '$_id',
          averageAge: { $ifNull: ['$averageAge', null] },
        },
      },
      { $sort: { gender: 1 } },
    ]);
  });

  it('backfills only users without an isActive value', async () => {
    const updateMany = jest.fn().mockResolvedValue({ modifiedCount: 4 });

    await expect(addIsActiveToUsers({ updateMany })).resolves.toEqual({
      modifiedCount: 4,
    });
    expect(updateMany).toHaveBeenCalledWith(
      { isActive: { $exists: false } },
      { $set: { isActive: true } },
    );
  });
});
