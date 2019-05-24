import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ProgressBarService } from './progress-bar.service';

@Injectable({
  providedIn: 'root'
})
export class SimilarItemsResultsService {

  public similarItemsResults = [];
  private similarItemsUpdated = new Subject<any>();
  constructor(
    private httpClient: HttpClient,
    public progressBarService: ProgressBarService) { }

  getSimilarItemUpdateListener() {
    return this.similarItemsUpdated.asObservable();
  }

  getSimilarItems(id) {
    this.progressBarService.updateProgress(15);
    this.httpClient.get<any>('http://localhost:3000/api/similarItems', { params: { id: id } })
      .subscribe(
        (results) => {
          // console.log(results);
          this.progressBarService.updateProgress(50);

          if (results.error) {
            this.similarItemsUpdated.next([]);
            this.progressBarService.updateProgress(0);

          } else {
            this.similarItemsResults = results;
            this.similarItemsUpdated.next(this.similarItemsResults);
            setTimeout(() => { }, 700);
            this.progressBarService.updateProgress(0);
          }
        },
        (error) => {
        });

  }
}


