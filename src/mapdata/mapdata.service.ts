import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { Repository } from 'typeorm';
import { CreateMapdatumDto } from './dto/create-mapdatum.dto';
import { UpdateMapdatumDto } from './dto/update-mapdatum.dto';
import { Mapdatum } from './entities/mapdatum.entity';

@Injectable()
export class MapdataService {
  constructor(
    @InjectRepository(Mapdatum)
    private readonly mapRepository: Repository<Mapdatum>,
  ) {}
  create(createMapdatumDto: CreateMapdatumDto): Observable<CreateMapdatumDto> {
    return from(this.mapRepository.save(createMapdatumDto));
  }

  findAll() {
    return from(this.mapRepository.find());
  }

  findOne(id: number) {
    return `This action returns a #${id} mapdatum`;
  }

  update(id: number, updateMapdatumDto: UpdateMapdatumDto) {
    return `This action updates a #${id} mapdatum`;
  }

  remove(id: number) {
    return `This action removes a #${id} mapdatum`;
  }
}
