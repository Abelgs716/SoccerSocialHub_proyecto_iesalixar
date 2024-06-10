import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { creacionTraduccion } from 'src/app/app.module';
import { HttpClient } from '@angular/common/http';
import { ComponentsModule } from 'src/app/components/components.module';
import { RouterModule } from '@angular/router';
import { MdbCarouselModule } from 'mdb-angular-ui-kit/carousel';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    RouterModule,
    MdbCarouselModule,
    HomePageRoutingModule,
    NgxPaginationModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: creacionTraduccion,
        deps: [HttpClient]
      }
    })
  ],
  declarations: [HomePage],
})
export class HomePageModule {}