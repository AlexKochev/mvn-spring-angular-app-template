import { Component, ChangeDetectionStrategy, VERSION, afterNextRender, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Hello, HelloService } from '../hello.service';

type Status = 'loading' | 'connected' | 'offline';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './welcome.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './welcome.component.scss'
})
export class WelcomeComponent {
  private readonly helloService = inject(HelloService);

  readonly angularVersion = VERSION.full;
  readonly status = signal<Status>('loading');
  readonly hello = signal<Hello | null>(null);

  constructor() {
    // Only call the API in the browser: there is no backend while prerendering.
    afterNextRender(() => this.check());
  }

  check(): void {
    this.status.set('loading');
    this.helloService.hello().subscribe({
      next: (hello) => {
        this.hello.set(hello);
        this.status.set('connected');
      },
      error: () => this.status.set('offline'),
    });
  }
}
