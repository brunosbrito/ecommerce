import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ['http://localhost:4200'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });
  const config = new DocumentBuilder()
    .setTitle('Ecommerce')
    .setDescription(
      '!!!!! ATENCAO: AQUI ESTA ALGUNS NUMERO PARA COLOCAR NO CAMPO CITY DE PRODUTOS, COMBOS E SERVICOS: Betim, Contagem, Belo Horizonte, Campo Belo',
    )
    .setVersion('1.0')
    .addTag('eccomerce')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
