import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserPreferencesEntity } from './entities/user-preferences.entity';
import { UserPreferencesController } from './user-preferences.controller';
import { UserPreferencesService } from './user-preferences.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ UserPreferencesEntity ])
  ],
  controllers: [UserPreferencesController],
  providers: [UserPreferencesService]
})
export class UserPreferencesModule {}
