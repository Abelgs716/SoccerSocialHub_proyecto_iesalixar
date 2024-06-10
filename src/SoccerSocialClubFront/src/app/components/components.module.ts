import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from './header/header.component';

import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [HeaderComponent],
exports: [HeaderComponent],
  imports: [
    CommonModule,IonicModule,RouterModule
  ]
})
export class ComponentsModule { }
