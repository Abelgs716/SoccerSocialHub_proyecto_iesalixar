import { TestBed } from '@angular/core/testing';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { AppComponent } from './app.component';

describe('AppComponent', () => {

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [
        TranslateModule.forRoot(), // Importa TranslateModule y configúralo para las pruebas
        HttpClientTestingModule // Importa HttpClientTestingModule para simular solicitudes HTTP en pruebas
      ],
      providers: [TranslateService], // Proporciona TranslateService como un proveedor
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

});