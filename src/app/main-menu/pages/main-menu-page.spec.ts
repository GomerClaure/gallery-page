import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { vi } from 'vitest';

import { MainMenuPage } from './main-menu-page';

describe('MainMenuPage', () => {
  const navigateByUrl = vi.fn().mockResolvedValue(true);

  beforeEach(async () => {
    navigateByUrl.mockClear();
    vi.useFakeTimers();

    await TestBed.configureTestingModule({
      imports: [MainMenuPage],
      providers: [
        {
          provide: Router,
          useValue: { navigateByUrl },
        },
      ],
    }).compileComponents();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should return to the screen saver after 30 seconds of inactivity', async () => {
    const fixture = TestBed.createComponent(MainMenuPage);
    fixture.detectChanges();

    await vi.advanceTimersByTimeAsync(30001);

    expect(navigateByUrl).toHaveBeenCalledWith('/');
  });

  it('should reset the inactivity timer after user activity', async () => {
    const fixture = TestBed.createComponent(MainMenuPage);
    fixture.detectChanges();

    await vi.advanceTimersByTimeAsync(20000);
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab' }));
    await vi.advanceTimersByTimeAsync(15000);

    expect(navigateByUrl).not.toHaveBeenCalled();

    await vi.advanceTimersByTimeAsync(15001);

    expect(navigateByUrl).toHaveBeenCalledWith('/');
  });
});
