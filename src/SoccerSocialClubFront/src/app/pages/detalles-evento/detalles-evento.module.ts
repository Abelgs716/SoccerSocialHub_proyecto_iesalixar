import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetallesEventoPageRoutingModule } from './detalles-evento-routing.module';

import { DetallesEventoPage } from './detalles-evento.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    DetallesEventoPageRoutingModule,
  ],
  declarations: [DetallesEventoPage]
})
export class DetallesEventoPageModule {}
