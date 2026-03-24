import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact-modal.component.html',
  styleUrl: './contact-modal.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactModalComponent {
  protected readonly whatsappUrl = 'https://wa.me/59174837175';
  protected readonly qrImageSrc = 'assets/qr-wp.png';

  readonly onClose = output<void>();

  protected closeModal(): void {
    this.onClose.emit();
  }
}
