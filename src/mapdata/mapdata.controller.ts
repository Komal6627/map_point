import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MapdataService } from './mapdata.service';
import { CreateMapdatumDto } from './dto/create-mapdatum.dto';
import { UpdateMapdatumDto } from './dto/update-mapdatum.dto';

@Controller('mapdata')
export class MapdataController {
  constructor(private readonly mapdataService: MapdataService) {}

  @Post()
  create(@Body() createMapdatumDto: CreateMapdatumDto) {
    return this.mapdataService.create(createMapdatumDto);
  }

  @Get()
  findAll() {
    return this.mapdataService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mapdataService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMapdatumDto: UpdateMapdatumDto,
  ) {
    return this.mapdataService.update(+id, updateMapdatumDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mapdataService.remove(+id);
  }
}
