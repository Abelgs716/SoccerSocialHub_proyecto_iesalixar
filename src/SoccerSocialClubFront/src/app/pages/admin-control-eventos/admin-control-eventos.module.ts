import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminControlEventosPageRoutingModule } from './admin-control-eventos-routing.module';

import { AdminControlEventosPage } from './admin-control-eventos.page';
import { NgxPaginationModule } from 'ngx-pagination';
import { ComponentsModule } from "../../components/components.module";

@NgModule({
    declarations: [AdminControlEventosPage],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        AdminControlEventosPageRoutingModule,
        NgxPaginationModule,
        ComponentsModule
    ]
})
export class AdminControlEventosPageModule {}
