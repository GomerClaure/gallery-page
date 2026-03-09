import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';

import { App } from './app';
import { routes } from './app.routes';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter(routes)],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render the screen saver on initial navigation', async () => {
    const fixture = TestBed.createComponent(App);
    const router = TestBed.inject(Router);

    await router.navigateByUrl('/');
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    expect(router.url).toBe('/');
    expect(compiled.querySelector('.screen-saver')).toBeTruthy();
    expect(compiled.querySelectorAll('.event-carousel__slide').length).toBe(6);
    expect(compiled.textContent).toContain('Haz clic para continuar');
  });
});
