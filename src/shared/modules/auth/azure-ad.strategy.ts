/* eslint-disable template-curly-spacing */
/* eslint-disable camelcase */
import 'dotenv/config';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { BearerStrategy } from 'passport-azure-ad';

const clientID = process.env.AAD_CLIENT_ID;
const tenantID = process.env.AAD_TENANT_ID;

@Injectable()
export class AzureADStrategy extends PassportStrategy(BearerStrategy, 'oauth-bearer') {
  public constructor() {
    super({
      identityMetadata: `https://login.microsoftonline.com/${ tenantID }/v2.0/.well-known/openid-configuration`,
      clientID,
      audience: `api://${ clientID }`,
      loggingLevel: 'error',
      loggingNoPII: false,
      validateIssuer: false,
      passReqToCallback: false
    });
  }

  public async validate(data: any) {
    return data;
  }
}
