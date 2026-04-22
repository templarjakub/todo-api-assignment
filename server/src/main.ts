import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
  );

  const config = new DocumentBuilder()
      .setTitle('Todo Api Assignment')
      .setDescription('The uuCmd endpoints, profiles, and I/O data documentation.')
      .setVersion('1.0')
      .addTag('todo')
      .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  app.enableCors();

  // Start the server on port 3000
  await app.listen(3000);
  console.log(`🚀 Application is running on: http://localhost:3000`);
  console.log(`📄 Swagger Docs available at: http://localhost:3000/api/docs`);
}
bootstrap();