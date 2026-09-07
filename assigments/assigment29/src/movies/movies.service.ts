import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Director } from '../directors/entities/director.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { QueryMoviesDto } from './dto/query-movies.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private readonly moviesRepository: Repository<Movie>,
    @InjectRepository(Director)
    private readonly directorsRepository: Repository<Director>,
  ) {}

  async create(createMovieDto: CreateMovieDto) {
    const director = await this.getDirector(createMovieDto.directorId);
    const movie = this.moviesRepository.create({
      title: createMovieDto.title,
      genre: createMovieDto.genre,
      releaseYear: createMovieDto.releaseYear,
      director,
    });
    return this.moviesRepository.save(movie);
  }

  async findAll(query: QueryMoviesDto) {
    const queryBuilder = this.moviesRepository
      .createQueryBuilder('movie')
      .leftJoinAndSelect('movie.director', 'director');

    if (query.name) {
      queryBuilder.andWhere('LOWER(movie.title) LIKE LOWER(:name)', {
        name: `%${query.name}%`,
      });
    }
    if (query.genre) {
      queryBuilder.andWhere('LOWER(movie.genre) LIKE LOWER(:genre)', {
        genre: `%${query.genre}%`,
      });
    }
    if (query.yearFrom) {
      queryBuilder.andWhere('movie.releaseYear >= :yearFrom', query);
    }
    if (query.yearTo) {
      queryBuilder.andWhere('movie.releaseYear <= :yearTo', query);
    }

    const [data, total] = await queryBuilder
      .orderBy('movie.releaseYear', 'DESC')
      .skip((query.page - 1) * query.limit)
      .take(query.limit)
      .getManyAndCount();

    return { data, total, page: query.page, limit: query.limit };
  }

  async findOne(id: string) {
    const movie = await this.moviesRepository.findOne({
      where: { id },
      relations: { director: true },
    });
    if (!movie) {
      throw new NotFoundException('Movie not found');
    }
    return movie;
  }

  async update(id: string, updateMovieDto: UpdateMovieDto) {
    const movie = await this.findOne(id);
    const { directorId, ...movieFields } = updateMovieDto;
    if (directorId) {
      movie.director = await this.getDirector(directorId);
    }
    Object.assign(movie, movieFields);
    return this.moviesRepository.save(movie);
  }

  async remove(id: string) {
    const movie = await this.findOne(id);
    await this.moviesRepository.remove(movie);
    return movie;
  }

  private async getDirector(id: string) {
    const director = await this.directorsRepository.findOneBy({ id });
    if (!director) {
      throw new BadRequestException('Director not found');
    }
    return director;
  }
}
