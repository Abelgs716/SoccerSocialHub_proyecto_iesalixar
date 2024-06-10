import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetallesEventoPage } from './detalles-evento.page';

const routes: Routes = [
  {
    path: '',
    component: DetallesEventoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetallesEventoPageRoutingModule {}
