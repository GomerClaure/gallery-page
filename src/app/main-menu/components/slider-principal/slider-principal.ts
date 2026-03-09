import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-slider-principal',
  imports: [],
  template: `<p>slider-principal works!</p>`,
  styleUrl: './slider-principal.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SliderPrincipal { }
