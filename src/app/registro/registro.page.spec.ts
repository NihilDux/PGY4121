import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistroPage } from './registro.page';

describe('RegistroPage', () => {
  let component: RegistroPage;
  let fixture: ComponentFixture<RegistroPage>;

  beforeEach(async(() => { // Importa 'async' correctamente
    TestBed.configureTestingModule({
      declarations: [RegistroPage],
    }).compileComponents().then(() => { // Utiliza 'then' después de 'compileComponents'
      fixture = TestBed.createComponent(RegistroPage);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
function async(arg0: () => void): jasmine.ImplementationCallback {
  throw new Error('Function not implemented.');
}

