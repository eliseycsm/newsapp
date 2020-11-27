import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NewsDB } from './db.service';

@Component({
  selector: 'app-check-api',
  templateUrl: './check-api.component.html',
  styleUrls: ['./check-api.component.css']
})
export class CheckApiComponent implements OnInit {

  constructor(private router:Router, private apiDB: NewsDB) { }
  api: string

  ngOnInit(): void {

    //const NEWS_API_KEY = 'db1b2301dbe54a779f1579bb4e54cf57' || ''
    this.apiDB.getApi()
    .then(res => {
      this.api = res
      if (this.api.length != 0) {
        this.router.navigate(["/start"])
      } else {
        this.router.navigate(["/login"])
      }
    })
  }

}
