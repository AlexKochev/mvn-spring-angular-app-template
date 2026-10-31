import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Hello {
  message: string;
  javaVersion: string;
  springBootVersion: string;
  timestamp: string;
}

@Injectable({ providedIn: 'root' })
export class HelloService {
  private readonly http = inject(HttpClient);

  hello(): Observable<Hello> {
    return this.http.get<Hello>('/api/hello');
  }
}
