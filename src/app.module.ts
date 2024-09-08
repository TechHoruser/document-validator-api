import { Module } from '@nestjs/common';
import { DocumentsModule } from './documents/documents.module';

@Module({
  imports: [DocumentsModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
