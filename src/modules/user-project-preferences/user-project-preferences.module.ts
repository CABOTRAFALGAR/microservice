import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserProjectPreferencesEntity } from './entities/user-project-preferences.entity';
import { UserProjectPreferencesController } from './user-project-preferences.controller';
import { UserProjectPreferencesService } from './user-project-preferences.service';

@Module({
  imports: [ TypeOrmModule.forFeature([ UserProjectPreferencesEntity ]) ],
  controllers: [ UserProjectPreferencesController ],
  providers: [ UserProjectPreferencesService ]
})
export class UserProjectPreferencesModule {}
