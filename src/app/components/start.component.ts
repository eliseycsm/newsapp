import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NewsDB } from './db.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {
  form: FormGroup
  countries: [] = []
  codes = ['ae','ar', 'ca', 'ch', 'cn', 'co', 'cu', 'cz', 'gb', 'gr', 'hk']
  endpoint = "https://restcountries.eu/rest/v2/alpha"

  constructor(private http:HttpClient, private router: Router, private countrydb: NewsDB) { }

  ngOnInit(): void {

    this.countrydb.getCountryList()
      .then(res => {
        this.countries = res

        if (this.countries.length == 0){
          console.info("countrydb empty")
          this.makeHttpCall() //get array of countries
          
        } 
          // else nothing just use this.countries
        
      })
      
    
  }
  makeHttpCall() {
    const queryString = this.codes.join(";")
    let params = new HttpParams()
      .set("codes", queryString)
    this.http.get<any>(this.endpoint, {params: params}).toPromise()
      .then(res => {
        console.log("received:", res)
        this.countries = res.map( d => {
          return { name: d.name, flag: d.flag, code: d.alpha2Code.toLowerCase()}
        })

        //add each country into countrydb
        for (let cty of this.countries){
          console.log("country:", cty)
          this.countrydb.addCountry(cty)
        }
      })
    console.info("made Http call")
  }

  goSettings() {
    this.router.navigate(["/login"])
  }
}
