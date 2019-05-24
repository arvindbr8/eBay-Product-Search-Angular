import { Component, OnInit, OnDestroy } from '@angular/core';
import { Category } from '../models/category.model';
import { NgForm, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { SearchResultsService } from '../services/search-results.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { ProgressBarService } from '../services/progress-bar.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})

export class FormComponent implements OnInit, OnDestroy {
  categoryOptions: Category[] = [
    { id: 0, name: 'All Categories' },
    { id: 550, name: 'Art' },
    { id: 2984, name: 'Baby' },
    { id: 267, name: 'Books' },
    { id: 11450, name: 'Clothing, Shoes & Accessories' },
    { id: 58058, name: 'Computers/Tablets & Networking' },
    { id: 26395, name: 'Healthy & Beauty' },
    { id: 11233, name: 'Music' },
    { id: 1249, name: 'Video Games & Consoles' },
  ];

  // zipPattern = new RegExp('^\d{5}(?:\d{2})?$');

  defaultCategory: Number;
  radioSelected = false;
  zipcodeCtrl: FormControl;
  zipcodes = [];
  conditions = [
    { value: 'New', checked: false },
    { value: 'Used', checked: false },
    { value: 'Unspecified', checked: false }
  ]

  progressBarValue = 0;
  progressBarDisplay = false;
  progressBarSub: Subscription;

  freeShippingOnly = false;
  localPickupOnly = false;

  payload: any = {
  };

  mainTab = 'none';

  constructor(
    private httpClient: HttpClient,
    public searchResultsService: SearchResultsService,
    public router: Router,
    public route: ActivatedRoute,
    public  progressBarService: ProgressBarService,
  ) {
    this.defaultCategory = 0;
  }

  zipcode = '';
  // zipcode.valueChanges();

  ngOnInit() {
    this.httpClient.get<any>('http://ip-api.com/json')
      .subscribe((result) => {
        this.zipcode = result.zip;
      });
    this.progressBarSub = this.progressBarService.getProgressBarUpdateListener()
      .subscribe((progressBarValue) => {
        console.log(progressBarValue);
        if (progressBarValue === 0) {
          this.progressBarDisplay = false;
        } else {
          this.progressBarDisplay = true;
          this.progressBarValue = progressBarValue;
        }
      });
  }

  onSubmit(form: NgForm) {

    this.payload = {};
    this.payload = form.value;
    delete this.payload.New;
    delete this.payload.Used;
    delete this.payload.Unspecified;
    delete this.payload.from;
    if (this.payload.zipcode === undefined) {
      this.payload.zipcode = this.zipcode;
    }

    this.payload.condition = this.conditions.filter(condition => condition.checked).map(condition => condition.value)
    if (this.payload.maxDistance === null) {
      this.payload.maxDistance = '10';
    }
    this.payload.category = this.payload.category || 0;
    this.payload.localPickupOnly = this.payload.localPickupOnly || false;
    this.payload.freeShippingOnly = this.payload.freeShippingOnly || false;

    console.log(this.payload);

    this.searchResultsService.getSearchResults(this.payload);
    this.mainTab = 'results';
    this.router.navigate(['results']);

  }


  ngOnDestroy() {
    this.progressBarSub.unsubscribe();
  }

}
