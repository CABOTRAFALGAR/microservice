import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { decode } from 'jsonwebtoken';
import { UserTokenDecoded } from '../../types/jwt.types';

export type Payload = {
  subject: string;
  domain: string;
  exp: string;
};

export class JwtStrategy extends PassportStrategy(Strategy) {
  public constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromHeader('x-access-token'),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET
    });
  }

  public async validate(payload: Payload) {
    return { sub: payload.subject, domain: payload.domain, exp: payload.exp };
  }
}

function getHeader(request: any, name: string): string {
  // express
  if (typeof request.header === 'function') {
    return request.header(name);
  }

  // fastify
  if (typeof request.headers === 'object') {
    return request.headers[name];
  }

  throw new Error('Invalid platform');
}

export const User = createParamDecorator<never, unknown, string>(
  (data, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    const token = getHeader(request, 'x-access-token');
    const payload = decode(token) as UserTokenDecoded;

    return payload.subject;
  }
);
