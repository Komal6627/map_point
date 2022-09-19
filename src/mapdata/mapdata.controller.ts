import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Res,
} from '@nestjs/common';
import { MapdataService } from './mapdata.service';
import { CreateMapdatumDto } from './dto/create-mapdatum.dto';
import { UpdateMapdatumDto } from './dto/update-mapdatum.dto';
import { FileInterceptor } from '@nestjs/platform-express/multer/interceptors';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { readFileSync } from 'fs';
import { parse } from 'papaparse';

@Controller('mapdata')
export class MapdataController {
  filepath: any;
  constructor(private readonly mapdataService: MapdataService) {}

  @Post()
  create(@Body() createMapdatumDto: CreateMapdatumDto) {
    return this.mapdataService.create(createMapdatumDto);
  }

  // @Post('data')
  // @UseInterceptors(
  //   FileInterceptor('file', {
  //     storage: diskStorage({
  //       destination: './src/filedata',
  //       filename: (req, file, callback) => {
  //         const uniqueSuffix =
  //           Date.now() + '-' + Math.round(Math.random() * 1e9);
  //         const ext = extname(file.originalname);
  //         // const filename = `${image.originalname}-${uniqueSuffix}${ext}`;
  //         const filename = `${uniqueSuffix}${ext}`;
  //         callback(null, filename);
  //       },
  //     }),
  //   }),
  // )
  // handleupload(@UploadedFile() file: Express.Multer.File) {
  //   this.filepath = file.path;
  //   console.log('file', file);
  //   console.log('path', file.path);
  //   return 'file upload API';
  // }
  // @Get('/file/:filepath')
  // seeUploadedFile(@Param('filepath') file, @Res() res) {
  //   return res.sendFile(file, { root: './src/filedata' });
  // }

  @Post('data')
  @UseInterceptors(
    FileInterceptor('file_asset', {
      storage: diskStorage({
        destination: 'filedata',
      }),
    }),
  )
  async uploadFile() {
    const csvFile = readFileSync('filedata/1.csv');
    const csvData = csvFile.toString();
    const parsedCsv = await parse(csvData, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (header) => header.toLowerCase().replace('#', '').trim(),
      complete: (results) => results.data,
    });
    console.log(parsedCsv);
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
