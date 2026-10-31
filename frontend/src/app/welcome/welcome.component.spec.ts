import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

import { WelcomeComponent } from './welcome.component';

describe('WelcomeComponent', () => {
  let fixture: ComponentFixture<WelcomeComponent>;
  let http: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WelcomeComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    }).compileComponents();

    http = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(WelcomeComponent);
    fixture.detectChanges();
  });

  it('shows the backend as connected when the API responds', () => {
    http.expectOne('/api/hello').flush({
      message: 'Hello from Spring Boot!',
      javaVersion: '25',
      springBootVersion: '4.1.2',
      timestamp: '2026-01-01T12:00:00Z'
    });
    fixture.detectChanges();

    const text: string = fixture.nativeElement.textContent;
    expect(text).toContain('Backend connected');
    expect(text).toContain('Hello from Spring Boot!');
    expect(text).toContain('4.1.2');
  });

  it('shows the backend as unreachable when the API fails', () => {
    http.expectOne('/api/hello').error(new ProgressEvent('error'));
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Backend not reachable');
  });
});
