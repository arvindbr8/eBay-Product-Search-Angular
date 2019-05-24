import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductResultsService } from '../services/product-results.service';
import { ProgressBarService } from '../services/progress-bar.service';

@Component({
  selector: 'app-photos-page',
  templateUrl: './photos-page.component.html',
  styleUrls: ['./photos-page.component.css']
})
export class PhotosPageComponent implements OnInit {


  imageUrl = [];
  constructor(
    private httpClient: HttpClient,
    public productResultService: ProductResultsService,
    public progressBarService: ProgressBarService
  ) { }

  openImageTab = (url) => {
    window.open(url, '_blank');
    return false;
  }

  ngOnInit() {
    this.httpClient.get<any>('http://localhost:3000/api/google', { params: { title: this.productResultService.productResults.Title } })
      .subscribe(
        (results) => {
          this.progressBarService.updateProgress(0);
          if (results.error) {

          } else {
            this.progressBarService.updateProgress(50);
            this.imageUrl = results;
            this.progressBarService.updateProgress(100);
            this.progressBarService.updateProgress(0);
          }
        },
        (error) => {
        });
    this.progressBarService.updateProgress(100);
    this.progressBarService.updateProgress(0);
  }

}
