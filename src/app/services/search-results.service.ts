import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { ProgressBarService } from './progress-bar.service';

@Injectable()
export class SearchResultsService {

  public searchResults;
  private resultUpdated = new Subject<any>();
  rowDetails: any = {};
  wishlistRowDetails: any = {};

  constructor(private httpClient: HttpClient, public progressBarService: ProgressBarService) { }

  getResultUpdateListener() {
    return this.resultUpdated.asObservable();
  }

  getSearchResults(payload) {
    this.progressBarService.updateProgress(15);
    this.rowDetails = {};
    this.httpClient
      .get<any>('http://localhost:3000/api/search', { params: payload })
      .subscribe(
        (results) => {
          results = results || [];
          if (results.error) {
            this.searchResults = [];
            const searchResultWrap = {
              searchResult: [],
              display: 'no-result'
            };
            this.progressBarService.updateProgress(0);

            this.resultUpdated.next(searchResultWrap);
          } else {
            this.resultUpdated.next({ searchResult: [], display: 'none' });

            setTimeout(() => {}, 700);
            this.progressBarService.updateProgress(100);
            this.progressBarService.updateProgress(0);
            this.searchResults = { searchResult: results, display: 'result-table' };
            this.resultUpdated.next({ searchResult: results, display: 'result-table' });
          }
        },
        (error) => {
          console.error(error);

        });


  }


}
