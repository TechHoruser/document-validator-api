import { Test, TestingModule } from '@nestjs/testing';
import { DocumentsService } from './documents.service';

describe('DocumentsService', () => {
  let service: DocumentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DocumentsService],
    }).compile();

    service = module.get<DocumentsService>(DocumentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should validate a document', () => {
    const valid = service.validateDocument('DNI', '12345678Z', 'ES');
    expect(valid).toBe(true);
  });

  it('should throw an error if no validator is found for the country code', () => {
    expect(() => service.validateDocument('DNI', '12345678Z', 'XX')).toThrowError('No validator found for country code: XX');
  });

  it('should throw an error if no validate method is found for the document type', () => {
    expect(() => service.validateDocument('XX', '12345678Z', 'ES')).toThrowError('No validate method found for document type: XX');
  });

  it('should validate a document', () => {
    const valid = service.validateDocument('SSN', '123456789', 'USA');
    expect(valid).toBe(true);
  });
});
