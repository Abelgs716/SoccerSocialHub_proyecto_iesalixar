import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule, 
    HttpClientModule,
    NgxPaginationModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: creacionTraduccion,
        deps: [HttpClient]
      }
    }),
    NgxPaginationModule
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    TranslateService, // Agregar TranslateService como un proveedor
    HttpClient // Agregar HttpClient como un proveedor
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

export function creacionTraduccion(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
