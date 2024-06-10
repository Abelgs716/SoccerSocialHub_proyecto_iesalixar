import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminControlEventosPage } from './admin-control-eventos.page';

const routes: Routes = [
  {
    path: '',
    component: AdminControlEventosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminControlEventosPageRoutingModule {}
