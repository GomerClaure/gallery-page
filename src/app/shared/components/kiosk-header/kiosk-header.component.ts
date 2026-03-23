import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackButtonComponent } from '../../../kiosk-demo/components/back-button/back-button.component';

@Component({
  selector: 'app-kiosk-header',
  standalone: true,
  imports: [CommonModule, BackButtonComponent],
  templateUrl: './kiosk-header.component.html',
  styleUrl: './kiosk-header.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KioskHeaderComponent {
  readonly title = input.required<string>();
  readonly subtitle = input<string>('');
  readonly titleAccent = input<string>('');
  
  readonly pillLabel = input<string>('');
  readonly pillValue = input<string>('');
  
  readonly logoSrc = input<string>('assets/logo-bafott.png');
  readonly showBackButton = input<boolean>(true);
  
  readonly backPressed = output<void>();

  onBackPress(): void {
    this.backPressed.emit();
  }
}
