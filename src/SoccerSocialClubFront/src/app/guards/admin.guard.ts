import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthServiceService } from '../services/auth-service.service';
import { Router } from '@angular/router';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthServiceService);
  const router = inject(Router);

  if (authService.isAdministrator()) {
    return true;
  } else {
    // Redirige a una página no autorizada si el usuario no es administrador
    router.navigate(['/home']);
    return false;
  }
};
