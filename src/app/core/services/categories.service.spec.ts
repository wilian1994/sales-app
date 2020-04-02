import { TestBed } from '@angular/core/testing';
import { CategoriesService } from 'src/app/controllers/categories/add-categories/categories.service';


describe('CategoriesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CategoriesService = TestBed.get(CategoriesService);
    expect(service).toBeTruthy();
  });
});
