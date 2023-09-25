import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfig } from '../../config/typeorm.config';

export const dbConnection = [ TypeOrmModule.forRoot(TypeOrmConfig()) ];
