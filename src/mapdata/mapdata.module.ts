import { Module } from '@nestjs/common';
import { MapdataService } from './mapdata.service';
import { MapdataController } from './mapdata.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mapdatum } from './entities/mapdatum.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Mapdatum])],
  controllers: [MapdataController],
  providers: [MapdataService],
})
export class MapdataModule {}
