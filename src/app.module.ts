import { Module } from '@nestjs/common';
import { getHealthController } from 'http-health-nestjs';
import { getMetricsController } from 'http-metrics-nestjs';
import { AuthModule } from './shared/modules/auth/auth.module';
import { DBModule } from './shared/modules/database/database.module';
import { UserPreferencesModule } from './modules/user-preferences/user-preferences.module';
import { UserProjectPreferencesModule } from './modules/user-project-preferences/user-project-preferences.module';

@Module({
  controllers: [
    getHealthController({ path: '/status/health' }),
    getMetricsController({ path: '/status/metrics' })
  ],
  imports: [
    DBModule,
    AuthModule,
    UserPreferencesModule,
    UserProjectPreferencesModule
  ]
})
export class App {}
