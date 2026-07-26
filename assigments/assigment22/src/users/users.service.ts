import { Injectable, NotFoundException } from '@nestjs/common';
import { IUser } from './interface/user.interface';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersQueryDto } from './dtos/user-query.dto';

@Injectable()
export class UsersService {
  private users = [
    {
      id: 1,
      firstName: 'Giorgi',
      lastName: 'Abramishvili',
      email: 'giorgi@gmail.com',
      phoneNumber: 591104147,
      gender: 'Male',
    },
    {
      id: 2,
      firstName: 'Lasha',
      lastName: 'Gamkhitashvili',
      email: 'lasha@gmail.com',
      phoneNumber: 568121390,
      gender: 'Male',
    },
    {
      id: 3,
      firstName: 'Nino',
      lastName: 'Beridze',
      email: 'nino@gmail.com',
      phoneNumber: 577123456,
      gender: 'Female',
    },
    {
      id: 4,
      firstName: 'Ana',
      lastName: 'Kapanadze',
      email: 'ana@gmail.com',
      phoneNumber: 599654321,
      gender: 'Female',
    },
    {
      id: 5,
      firstName: 'Saba',
      lastName: 'Japaridze',
      email: 'saba@gmail.com',
      phoneNumber: 555987654,
      gender: 'Male',
    },
    {
      id: 6,
      firstName: 'Mariam',
      lastName: 'Gelashvili',
      email: 'mariam@gmail.com',
      phoneNumber: 595321478,
      gender: 'Female',
    },
    {
      id: 7,
      firstName: 'Luka',
      lastName: 'Mikadze',
      email: 'luka@gmail.com',
      phoneNumber: 577456123,
      gender: 'Male',
    },
    {
      id: 8,
      firstName: 'Elene',
      lastName: 'Chkheidze',
      email: 'elene@gmail.com',
      phoneNumber: 598147258,
      gender: 'Female',
    },
    {
      id: 9,
      firstName: 'Dato',
      lastName: 'Kiknadze',
      email: 'dato@gmail.com',
      phoneNumber: 579258369,
      gender: 'Male',
    },
    {
      id: 10,
      firstName: 'Tako',
      lastName: 'Mchedlishvili',
      email: 'tako@gmail.com',
      phoneNumber: 593654987,
      gender: 'Female',
    },
    {
      id: 11,
      firstName: 'Irakli',
      lastName: 'Kharadze',
      email: 'irakli@gmail.com',
      phoneNumber: 577888111,
      gender: 'Male',
    },
    {
      id: 12,
      firstName: 'Salome',
      lastName: 'Kvaratskhelia',
      email: 'salome@gmail.com',
      phoneNumber: 598777222,
      gender: 'Female',
    },
    {
      id: 13,
      firstName: 'Levan',
      lastName: 'Dolidze',
      email: 'levan@gmail.com',
      phoneNumber: 595666333,
      gender: 'Male',
    },
    {
      id: 14,
      firstName: 'Nia',
      lastName: 'Khutsishvili',
      email: 'nia@gmail.com',
      phoneNumber: 591555444,
      gender: 'Female',
    },
    {
      id: 15,
      firstName: 'Beka',
      lastName: 'Tsiklauri',
      email: 'beka@gmail.com',
      phoneNumber: 592444555,
      gender: 'Male',
    },
    {
      id: 16,
      firstName: 'Ketevan',
      lastName: 'Shengelia',
      email: 'ketevan@gmail.com',
      phoneNumber: 593333666,
      gender: 'Female',
    },
    {
      id: 17,
      firstName: 'Nikoloz',
      lastName: 'Maisuradze',
      email: 'nikoloz@gmail.com',
      phoneNumber: 594222777,
      gender: 'Male',
    },
    {
      id: 18,
      firstName: 'Barbare',
      lastName: 'Tsereteli',
      email: 'barbare@gmail.com',
      phoneNumber: 595111888,
      gender: 'Female',
    },
    {
      id: 19,
      firstName: 'Tornike',
      lastName: 'Gogoladze',
      email: 'tornike@gmail.com',
      phoneNumber: 596999111,
      gender: 'Male',
    },
    {
      id: 20,
      firstName: 'Sopio',
      lastName: 'Lomidze',
      email: 'sopio@gmail.com',
      phoneNumber: 597888222,
      gender: 'Female',
    },
    {
      id: 21,
      firstName: 'Giga',
      lastName: 'Nozadze',
      email: 'giga@gmail.com',
      phoneNumber: 598777333,
      gender: 'Male',
    },
    {
      id: 22,
      firstName: 'Maka',
      lastName: 'Pirtskhalava',
      email: 'maka@gmail.com',
      phoneNumber: 599666444,
      gender: 'Female',
    },
    {
      id: 23,
      firstName: 'Zurab',
      lastName: 'Papashvili',
      email: 'zurab@gmail.com',
      phoneNumber: 577555555,
      gender: 'Male',
    },
    {
      id: 24,
      firstName: 'Tamta',
      lastName: 'Kobakhidze',
      email: 'tamta@gmail.com',
      phoneNumber: 578444666,
      gender: 'Female',
    },
    {
      id: 25,
      firstName: 'Shota',
      lastName: 'Basilashvili',
      email: 'shota@gmail.com',
      phoneNumber: 579333777,
      gender: 'Male',
    },
    {
      id: 26,
      firstName: 'Kristine',
      lastName: 'Abashidze',
      email: 'kristine@gmail.com',
      phoneNumber: 591222888,
      gender: 'Female',
    },
    {
      id: 27,
      firstName: 'Vakho',
      lastName: 'Kapanadze',
      email: 'vakho@gmail.com',
      phoneNumber: 592111999,
      gender: 'Male',
    },
    {
      id: 28,
      firstName: 'Lizi',
      lastName: 'Chelidze',
      email: 'lizi@gmail.com',
      phoneNumber: 593999000,
      gender: 'Female',
    },
    {
      id: 29,
      firstName: 'Guram',
      lastName: 'Metreveli',
      email: 'guram@gmail.com',
      phoneNumber: 594888123,
      gender: 'Male',
    },
    {
      id: 30,
      firstName: 'Megi',
      lastName: 'Kalandadze',
      email: 'megi@gmail.com',
      phoneNumber: 595777234,
      gender: 'Female',
    },
    {
      id: 31,
      firstName: 'Otar',
      lastName: 'Kobulashvili',
      email: 'otar@gmail.com',
      phoneNumber: 596666345,
      gender: 'Male',
    },
    {
      id: 32,
      firstName: 'Tea',
      lastName: 'Mumladze',
      email: 'tea@gmail.com',
      phoneNumber: 597555456,
      gender: 'Female',
    },
    {
      id: 33,
      firstName: 'Revaz',
      lastName: 'Khmaladze',
      email: 'revaz@gmail.com',
      phoneNumber: 598444567,
      gender: 'Male',
    },
    {
      id: 34,
      firstName: 'Nana',
      lastName: 'Jibladze',
      email: 'nana@gmail.com',
      phoneNumber: 599333678,
      gender: 'Female',
    },
    {
      id: 35,
      firstName: 'Zura',
      lastName: 'Kvirikashvili',
      email: 'zura@gmail.com',
      phoneNumber: 577222789,
      gender: 'Male',
    },
    {
      id: 36,
      firstName: 'Manana',
      lastName: 'Sikharulidze',
      email: 'manana@gmail.com',
      phoneNumber: 578111890,
      gender: 'Female',
    },
    {
      id: 37,
      firstName: 'Demetre',
      lastName: 'Janelidze',
      email: 'demetre@gmail.com',
      phoneNumber: 579999901,
      gender: 'Male',
    },
    {
      id: 38,
      firstName: 'Mariam',
      lastName: 'Gachechiladze',
      email: 'mariam2@gmail.com',
      phoneNumber: 591888012,
      gender: 'Female',
    },
    {
      id: 39,
      firstName: 'Alexander',
      lastName: 'Tabatadze',
      email: 'alex@gmail.com',
      phoneNumber: 592777123,
      gender: 'Male',
    },
    {
      id: 40,
      firstName: 'Natia',
      lastName: 'Latsabidze',
      email: 'natia@gmail.com',
      phoneNumber: 593666234,
      gender: 'Female',
    },
    {
      id: 41,
      firstName: 'Ilia',
      lastName: 'Khutsidze',
      email: 'ilia@gmail.com',
      phoneNumber: 594555345,
      gender: 'Male',
    },
    {
      id: 42,
      firstName: 'Ani',
      lastName: 'Bregvadze',
      email: 'ani@gmail.com',
      phoneNumber: 595444456,
      gender: 'Female',
    },
    {
      id: 43,
      firstName: 'Gela',
      lastName: 'Tsintsadze',
      email: 'gela@gmail.com',
      phoneNumber: 596333567,
      gender: 'Male',
    },
    {
      id: 44,
      firstName: 'Mzia',
      lastName: 'Mamulashvili',
      email: 'mzia@gmail.com',
      phoneNumber: 597222678,
      gender: 'Female',
    },
    {
      id: 45,
      firstName: 'Paata',
      lastName: 'Odisharia',
      email: 'paata@gmail.com',
      phoneNumber: 598111789,
      gender: 'Male',
    },
    {
      id: 46,
      firstName: 'Lia',
      lastName: 'Chikovani',
      email: 'lia@gmail.com',
      phoneNumber: 599000890,
      gender: 'Female',
    },
    {
      id: 47,
      firstName: 'George',
      lastName: 'Khetsuriani',
      email: 'george@gmail.com',
      phoneNumber: 577123901,
      gender: 'Male',
    },
    {
      id: 48,
      firstName: 'Salome',
      lastName: 'Dgebuadze',
      email: 'salome2@gmail.com',
      phoneNumber: 578234012,
      gender: 'Female',
    },
    {
      id: 49,
      firstName: 'Archil',
      lastName: 'Mamuladze',
      email: 'archil@gmail.com',
      phoneNumber: 579345123,
      gender: 'Male',
    },
    {
      id: 50,
      firstName: 'Nini',
      lastName: 'Tsertsvadze',
      email: 'nini@gmail.com',
      phoneNumber: 591456234,
      gender: 'Female',
    },
  ];

  getUsers({ page, take, gender, email }: UsersQueryDto) {
    let data = [...this.users];

    if (gender) {
      data = data.filter((user) =>
        user.gender.toLowerCase().startsWith(gender.toLowerCase()),
      );
    }

    if (email) {
      data = data.filter((user) =>
        user.email.toLowerCase().startsWith(email.toLowerCase()),
      );
    }

    const total = data.length;

    const start = (page - 1) * take;
    const stop = page * take;

    data = data.slice(start, stop);

    return {
      users: data,
      total,
      page,
      limit: take,
    };
  }

  getUserById(userId: number) {
    const user = this.users.find((currentUser) => currentUser?.id === userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  createUser(createUserDto: CreateUserDto) {
    const lastId = Math.max(0, ...this.users.map((user) => user.id));

    const newUser = {
      id: lastId + 1,
      ...createUserDto,
    };

    this.users.push(newUser);
    return newUser;
  }

  deleteUserById(userId: number): IUser {
    const index = this.users.findIndex(
      (currentUser) => currentUser.id === userId,
    );

    if (index === -1) {
      throw new NotFoundException('User not found');
    }

    const [deletedUser] = this.users.splice(index, 1);
    return deletedUser;
  }

  updateUserById(userId: number, updateUserDto: UpdateUserDto): IUser {
    const index = this.users.findIndex(
      (currentUser) => currentUser.id === userId,
    );

    if (index === -1) {
      throw new NotFoundException('User not found');
    }

    this.users[index] = {
      ...this.users[index],
      ...updateUserDto,
      id: this.users[index].id,
    };

    return this.users[index];
  }
}
