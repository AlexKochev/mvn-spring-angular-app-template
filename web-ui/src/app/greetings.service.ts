import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

interface Message {
  message: string;
}

@Injectable({providedIn: 'root'})
export class GreetingsService {

  private httpClient = inject(HttpClient);

  constructor() {
  }

  public getGreetings(): Observable<Message> {
    return this.httpClient.get<Message>('http://localhost:8080/greetings');
  }
}
