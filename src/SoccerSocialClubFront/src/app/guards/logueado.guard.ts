import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthServiceService } from '../services/auth-service.service';
import { Router } from '@angular/router';

export const logueadoGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthServiceService);
  const router = inject(Router);

  if (!authService.isLoggedIn()) {
    return true;
  } else {
    // Redirige a la página de inicio de sesión si el usuario no está autenticado
    router.navigate(['/home']);
    return false;
  }
};
