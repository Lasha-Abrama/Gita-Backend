import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDirectorDto } from './dto/create-director.dto';
import { QueryDirectorsDto } from './dto/query-directors.dto';
import { UpdateDirectorDto } from './dto/update-director.dto';
import { Director } from './entities/director.entity';

@Injectable()
export class DirectorsService {
  constructor(
    @InjectRepository(Director)
    private readonly directorsRepository: Repository<Director>,
  ) {}

  async create(createDirectorDto: CreateDirectorDto) {
    const director = this.directorsRepository.create(createDirectorDto);
    return this.directorsRepository.save(director);
  }

  async findAll(query: QueryDirectorsDto) {
    const queryBuilder = this.directorsRepository
      .createQueryBuilder('director')
      .leftJoinAndSelect('director.films', 'film');

    if (query.name) {
      queryBuilder.andWhere('LOWER(director.name) LIKE LOWER(:name)', {
        name: `%${query.name}%`,
      });
    }
    if (query.nationality) {
      queryBuilder.andWhere('LOWER(director.nationality) LIKE LOWER(:nationality)', {
        nationality: `%${query.nationality}%`,
      });
    }
    if (query.birthYearFrom) {
      queryBuilder.andWhere('director.birthYear >= :birthYearFrom', query);
    }
    if (query.birthYearTo) {
      queryBuilder.andWhere('director.birthYear <= :birthYearTo', query);
    }

    const [data, total] = await queryBuilder
      .orderBy('director.name', 'ASC')
      .skip((query.page - 1) * query.limit)
      .take(query.limit)
      .getManyAndCount();

    return { data, total, page: query.page, limit: query.limit };
  }

  async findOne(id: string) {
    const director = await this.directorsRepository.findOne({
      where: { id },
      relations: { films: true },
    });
    if (!director) {
      throw new NotFoundException('Director not found');
    }
    return director;
  }

  async update(id: string, updateDirectorDto: UpdateDirectorDto) {
    const director = await this.findOne(id);
    Object.assign(director, updateDirectorDto);
    return this.directorsRepository.save(director);
  }

  async remove(id: string) {
    const director = await this.findOne(id);
    await this.directorsRepository.remove(director);
    return director;
  }
}
