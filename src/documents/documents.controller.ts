import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { Response } from 'express';

@Controller('documents')
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) { }

  @Post('validate')
  validate(
    @Body() body: { type: string; document: string, countryCode: string },
    @Res() response: Response,
  ) {
    const valid = this.documentsService.validateDocument(
      body.type,
      body.document,
      body.countryCode,
    );

    return response
      .status(HttpStatus.OK)
      .json({ valid })
  }

  @Post('type')
  type(
    @Body() body: { document: string, countryCode: string },
    @Res() response: Response,
  ) {
    const type = this.documentsService.getDetectedDocumentType(
      body.document,
      body.countryCode,
    );

    return response
      .status(HttpStatus.OK)
      .json({ type })
  }
}
