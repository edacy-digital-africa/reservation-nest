import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { reservationModelName } from './reservation.model-name';
import { reservationSchema } from './reservation.schema';
import { ReservationsService } from './reservations.service';

describe('ReservationsService', () => {
  let service: ReservationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [MongooseModule.forFeature([{ name: reservationModelName, schema: reservationSchema }])],
      providers: [ReservationsService],
    }).compile();

    service = module.get<ReservationsService>(ReservationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
