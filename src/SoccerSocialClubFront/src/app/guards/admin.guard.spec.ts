import { TestBed, inject } from '@angular/core/testing';
import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthServiceService } from '../services/auth-service.service';
import { adminGuard } from './admin.guard';
import { Injector, runInInjectionContext } from '@angular/core';
 
describe('adminGuard', () => {
  let authService: AuthServiceService;
  let router: Router;
  let injector: Injector;
 
  beforeEach(() => {
    // Configurar el módulo de pruebas
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthServiceService,
        {
          provide: Router,
          useValue: {
            navigate: jasmine.createSpy('navigate')  // Espía para el método navigate del Router
          }
        }
      ]
    });
 
    // Obtener las instancias del servicio de autenticación, el router y el injector
    authService = TestBed.inject(AuthServiceService);
    router = TestBed.inject(Router);
    injector = TestBed.inject(Injector);
  });
 
  // Prueba para verificar el comportamiento cuando el usuario es administrador
  it('debería permitir el acceso si el usuario es administrador', () => {
    // Espía el método isAdministrator y devuelve true
    spyOn(authService, 'isAdministrator').and.returnValue(true);
 
    // Ejecutar adminGuard en un contexto de inyección
    const result = runInInjectionContext(injector, () => adminGuard(null as any, null as any));
 
    // Verificar que devuelve true
    expect(result).toBeTrue();
  });
 
  // Prueba para verificar el comportamiento cuando el usuario no es administrador
  it('debería denegar el acceso y redirigir a /home si el usuario no es administrador', () => {
    // Espía el método isAdministrator y devuelve false
    spyOn(authService, 'isAdministrator').and.returnValue(false);
 
    // Ejecutar adminGuard en un contexto de inyección
    const result = runInInjectionContext(injector, () => adminGuard(null as any, null as any));
 
    // Verificar que devuelve false
    expect(result).toBeFalse();
 
    // Verificar que el método navigate del router se ha llamado con la ruta '/home'
    expect(router.navigate).toHaveBeenCalledWith(['/home']);
  });
});