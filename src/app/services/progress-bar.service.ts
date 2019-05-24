import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProgressBarService {
  progress = 0;
  private ProgressBarUpdated = new Subject<any>();

  getProgressBarUpdateListener = () => {
    return this.ProgressBarUpdated.asObservable();
  }

  updateProgress = (value) => {
    this.progress = value;
    this.ProgressBarUpdated.next(this.progress);
  }

}
