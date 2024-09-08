import { Module } from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { DocumentsController } from './documents.controller';
import { SpanishDocumentValidatorService } from './validatorByCountry/SpanishDocumentValidatorService';
import { UsaDocumentValidatorService } from './validatorByCountry/UsaDocumentValidatorService';

@Module({
  providers: [
    SpanishDocumentValidatorService,
    UsaDocumentValidatorService,
    DocumentsService,
  ],
  controllers: [DocumentsController],
})
export class DocumentsModule { }
