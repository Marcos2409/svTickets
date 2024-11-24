import { Component, signal, inject, computed, DestroyRef } from '@angular/core';
import { MyEvent } from '../interfaces/my-event';
import { FormsModule } from '@angular/forms';
import { EventFormComponent } from '../event-form/event-form.component';
import { EventCardComponent } from '../event-card/event-card.component';
import { EventsService } from '../services/events.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'events-page',
  standalone: true,
  imports: [FormsModule, EventFormComponent, EventCardComponent],
  templateUrl: './events-page.component.html',
  styleUrl: './events-page.component.css',
})
export class EventsPageComponent {
  events = signal<MyEvent[]>([]);
  searchValue = signal<string>('');
  sortedEvents = signal<'date' | 'price'>('date');
  #eventService = inject(EventsService);
  #destroyRef = inject(DestroyRef);

  constructor() {
    this.#eventService
      .getEvents()
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe({
        next: (events) => {
          this.events.set(events);
        },
        error: (error) => {
          console.error(error);
        },
      });
  }

  filteredEvents = computed(() =>
    this.events()
      .filter(
        (event) =>
          event.title
            .toLowerCase()
            .includes(this.searchValue().toLowerCase()) ||
          event.description
            .toLowerCase()
            .includes(this.searchValue().toLowerCase())
      )
      .toSorted((a, b) =>
        this.sortedEvents() === 'date'
          ? a.date.localeCompare(b.date)
          : a.price - b.price
      )
  );
  

  newEvent: MyEvent = {
    title: '',
    description: '',
    price: 0,
    image: '',
    date: '',
  };

  changeImage(fileInput: HTMLInputElement) {
    if (!fileInput.files || fileInput.files.length === 0) {
      return;
    }
    const reader: FileReader = new FileReader();
    reader.readAsDataURL(fileInput.files[0]);
    reader.addEventListener('loadend', () => {
      this.newEvent.image = reader.result as string;
    });
  }

  deleteEvent(id: number) {
    this.events.update((events) => events.filter((event) => event.id !== id));
  }

  searchEvents(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchValue.set(input.value || '');
  }

  orderByDate() {
    this.sortedEvents.set('date');
  }

  orderByPrice() {
    this.sortedEvents.set('price');
  }

  addEvent(newEvent: MyEvent) {
    this.events.update((currentEvents) => [...currentEvents, newEvent]);
  }
  

}
