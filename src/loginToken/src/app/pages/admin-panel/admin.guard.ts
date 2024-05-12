import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const token = localStorage.getItem('token');
    // Verifica si el usuario tiene permisos de administrador
    // Aquí puedes implementar la lógica necesaria para determinar si el usuario es administrador
    const isAdmin = true; // Cambia esto con la lógica real

    if (!token || !isAdmin) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
