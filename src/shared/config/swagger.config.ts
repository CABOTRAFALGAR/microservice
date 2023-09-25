import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerOptions = new DocumentBuilder()
  .setTitle('Colorway Service')
  .setVersion('1.0.1')
  .setExternalDoc('For more information', 'http://swagger.io')
  .addServer(process.env.SWAGGER_HOST || `${ process.env.API_HOST }:${ process.env.API_PORT }`)
  .addApiKey({ type: 'apiKey', name: 'x-access-token', in: 'header' }, 'x-access-token')
  .build();
