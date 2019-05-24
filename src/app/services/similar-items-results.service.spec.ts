import { TestBed } from '@angular/core/testing';

import { SimilarItemsResultsService } from './similar-items-results.service';

describe('SimilarItemsResultsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SimilarItemsResultsService = TestBed.get(SimilarItemsResultsService);
    expect(service).toBeTruthy();
  });
});
