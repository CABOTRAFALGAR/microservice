import * as path from 'path';
import * as dotenv from 'dotenv';

dotenv.config();

export function TypeOrmConfig(): any {
  return {
    type: 'mysql',
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT) || 3306,
    database: process.env.DATABASE_NAME || '',
    username: process.env.DATABASE_USERNAME || '',
    password: process.env.DATABASE_PASSWORD || '',
    entities: [ path.join(__dirname, '..', '..', './**/*.entity{.ts,.js}') ],
    synchronize: process.env.DATABASE_SYNCHRONIZE === 'true' || false,

    // this field will be used to create the table by name of migrations.
    // You can name it whatever you want. But make sure to use the sensible name
    migrationsTableName: 'migrations',

    // This is the path to the migration files created by typeorm cli.
    // You don't have to create dist folder.
    // When you save file, compiled files will be stored in dist folder
    migrations: [ 'dist/src/migrations/*{.ts,.js}' ]
  };
}
