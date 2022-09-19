import { Point } from 'geojson';
import { Column, PrimaryGeneratedColumn, Entity, Index } from 'typeorm';

@Entity('map_data')
export class Mapdatum {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  latitude: string;

  @Column()
  longitude: string;

  @Column()
  city_name: string;

  @Index({ spatial: true })
  @Column({
    type: 'geography',
    spatialFeatureType: 'Point',
    srid: 4326,
    nullable: true,
  })
  location: Point;

}
