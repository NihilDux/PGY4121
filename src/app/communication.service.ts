import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommunicationService {
  private userDataSubject = new Subject<any>();

  userData$ = this.userDataSubject.asObservable();

  sendUserData(userData: any) {
    this.userDataSubject.next(userData);
  }
}
