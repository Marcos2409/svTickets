import { Component, DestroyRef, inject, input, output } from '@angular/core';
import { MyEvent } from '../interfaces/my-event';
import { FormsModule } from '@angular/forms';
import { EncodeBase64Directive } from '../directives/encode-base64.directive';
import { EventsService } from '../services/events.service';
import { map } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'event-form',
  standalone: true,
  imports: [FormsModule, EncodeBase64Directive],
  templateUrl: './event-form.component.html',
  styleUrl: './event-form.component.css',
})

export class EventFormComponent {
  added = output<MyEvent>();
  events = input();
  #eventsService = inject(EventsService);
  #destroyRef = inject(DestroyRef);

  newEvent: MyEvent = {
    title: '',
    description: '',
    price: 0,
    image: '',
    date: '',
  };

  addEvent() {
    this.#eventsService
      .addEvent(this.newEvent)
      .pipe(
        map((event) => {
          this.added.emit(event);
          return event;
        }),
        takeUntilDestroyed(this.#destroyRef)
      )
      .subscribe((event) => {
        if (event) {
          (document.getElementById('newEvent') as HTMLFormElement).reset();
          this.newEvent = {
            title: '',
            description: '',
            price: 0,
            image: '',
            date: '',
          };
        }
      });
  }
}
