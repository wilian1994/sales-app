import { TestBed, async, inject } from '@angular/core/testing';

import { CategoriesResolverGuard } from './categories-resolver.guard';

describe('CategoriesResolverGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CategoriesResolverGuard]
    });
  });

  it('should ...', inject([CategoriesResolverGuard], (guard: CategoriesResolverGuard) => {
    expect(guard).toBeTruthy();
  }));
});
