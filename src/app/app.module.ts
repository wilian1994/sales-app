import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CategoriesModule } from './controllers/categories/categories.module';
import { AppRoutingModule } from './app.routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.example.module';
import { HeaderMaterialComponent } from './shared/components/header-material/header-material.component';
import { CategoriesMaterialComponent } from './controllers/categories-material/categories-material.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HeaderMaterialComponent,
    CategoriesMaterialComponent,
  ],
  imports: [
    CategoriesModule,
    BrowserModule,
    AppRoutingModule,
    ModalModule.forRoot(),
    HttpClientModule,
    MaterialModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
