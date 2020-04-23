import { Category } from 'src/app/shared/models/Category';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { CategoriesService } from '../add-categories/categories.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriesResolverGuard implements Resolve<Category> {

  constructor(
    private categoriesService: CategoriesService
  ){

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Category | Observable<Category> {
    if(route.params && route.params.id){
      return this.categoriesService.view(route.params.id)
    }

    return of({
      _id: null,
      name: null
    })
  }
}
