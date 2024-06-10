import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { AuthServiceService } from 'src/app/services/auth-service.service';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let authService: AuthServiceService;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthServiceService', ['logout']);

    await TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      providers: [
        { provide: AuthServiceService, useValue: authServiceSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthServiceService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call logout method from AuthServiceService when logout is called', () => {
    component.logout();
    expect(authService.logout).toHaveBeenCalled();
  });

  it('cambioBool1 should toggle showAdditionalButtons and activateFab correctly', () => {
    expect(component.activateFab).toBeTrue();
    expect(component.showAdditionalButtons).toBeFalse();

    component.cambioBool1();

    expect(component.showAdditionalButtons).toBeTrue();
    expect(component.activateFab).toBeFalse();

    component.cambioBool1();

    expect(component.showAdditionalButtons).toBeFalse();
    expect(component.activateFab).toBeTrue();
  });

  it('cambioBool2 should toggle showAdditionalButtons2 and activateFab correctly', () => {
    expect(component.activateFab).toBeTrue();
    expect(component.showAdditionalButtons2).toBeFalse();

    component.cambioBool2();

    expect(component.showAdditionalButtons2).toBeTrue();
    expect(component.activateFab).toBeFalse();

    component.cambioBool2();

    expect(component.showAdditionalButtons2).toBeFalse();
    expect(component.activateFab).toBeTrue();
  });
});

