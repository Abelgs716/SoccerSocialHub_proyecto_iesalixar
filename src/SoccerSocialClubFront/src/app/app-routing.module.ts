import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { logueadoGuard } from './guards/logueado.guard';
import { adminGuard } from './guards/admin.guard';  // Importa el guard de administrador

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule),
    //canActivate: [logueadoGuard]  // Solo permite el acceso a usuarios logueados
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule),
    canActivate: [logueadoGuard]  // Solo permite el acceso a usuarios no logueados
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterPageModule),
    canActivate: [logueadoGuard]  // Solo permite el acceso a usuarios no logueados
  },
  {
    path: 'admin',
    loadChildren: () => import('./pages/admin/admin.module').then(m => m.AdminPageModule),
    canActivate: [adminGuard]  // Solo permite el acceso a administradores
  },
  {
    path: 'event',
    loadChildren: () => import('./pages/event/event.module').then( m => m.EventPageModule)
  },
  {
    path: 'detalles-evento/:id',
    loadChildren: () => import('./pages/detalles-evento/detalles-evento.module').then( m => m.DetallesEventoPageModule)
  },
  {
    path: 'admin-control-eventos',
    loadChildren: () => import('./pages/admin-control-eventos/admin-control-eventos.module').then( m => m.AdminControlEventosPageModule),
    canActivate: [adminGuard]  // Solo permite el acceso a administradores
  },




];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
