import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { vi } from 'vitest';

import { ScreenSaverPage } from './screen-saver-page';

describe('ScreenSaverPage', () => {
  const navigateByUrl = vi.fn().mockResolvedValue(true);

  beforeEach(async () => {
    navigateByUrl.mockClear();

    await TestBed.configureTestingModule({
      imports: [ScreenSaverPage],
      providers: [
        {
          provide: Router,
          useValue: { navigateByUrl },
        },
      ],
    }).compileComponents();
  });

  it('should navigate to the menu when the CTA is clicked', () => {
    const fixture = TestBed.createComponent(ScreenSaverPage);
    fixture.detectChanges();

    const continueButton = fixture.nativeElement.querySelector(
      '.screen-saver__cta',
    ) as HTMLButtonElement;

    continueButton.click();

    expect(navigateByUrl).toHaveBeenCalledWith('/menu');
  });
});
