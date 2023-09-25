import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt-strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET
    })
  ],
  providers: [ JwtStrategy ],
  exports: [ JwtModule, JwtStrategy, PassportModule ]
})

export class AuthModule {}
