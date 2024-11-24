import { Component, inject, input, output } from '@angular/core';
import { MyEvent } from '../interfaces/my-event';
import { DatePipe } from '@angular/common';
import { intlCurrency } from '../shared/pipes/intl-currency.pipe';
import { EventsService } from '../services/events.service';

@Component({
  selector: 'event-card',
  standalone: true,
  imports: [DatePipe, intlCurrency],
  templateUrl: './event-card.component.html',
  styleUrl: './event-card.component.css',
})
export class EventCardComponent {
  event = input.required<MyEvent>();
  deleted = output<number>();
  #eventService = inject(EventsService);

  deleteEvent(id: number) {
    this.#eventService.deleteEvent(id).subscribe({
      next: () => {
        this.deleted.emit(id);
      },
      error: (e) => {
        console.error('Error deleting event:', e);
      },
    });
  }
}
