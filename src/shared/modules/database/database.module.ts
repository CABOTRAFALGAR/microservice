import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbConnection } from './database.connection';

@Module({
  imports: [ ...dbConnection ],
  exports: [ TypeOrmModule ]
})
export class DBModule {}
