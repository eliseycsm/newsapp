import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewsDB } from './db.service';
import { Country, Result } from './models';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  code: string
  country: Country
  ENDPOINT: string = 'https://newsapi.org/v2/top-headlines?'
  articles = []
  apiKey: string

  constructor(private http:HttpClient, private apidb: NewsDB, 
    private resultsdb: NewsDB, private countryDB: NewsDB, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.code = this.activatedRoute.snapshot.params['code']
    console.info("get code", this.code)

    //get country name from countryDB
    console.log(this.country)
    
    this.apidb.getApi()
      .then(res => {
        console.log(res[0])
        this.apiKey = res[0].apikey
        console.log("apikey", this.apiKey)

        if (this.apiKey) {
          this.getCountry(this.code)
          this.getNewsResults()
        }
        
      }) 

    

    //this.getNewsResults()

  }

  async getCountry(code) {
    return await this.countryDB.getCountry(code)
    .then(res => {
      res = res.map( i => {return {name: i.name, code: i.code, flag: i.flag}})
      this.country = res[0]
      console.log("country name", this.country)
      return this.country
    })
  }
  
  getNewsResults(){

    this.resultsdb.getResults().then(
      res => {
        if (res.length != 0) {
          let timeNow = Date.now()

          for (let cache of res) {
            let timeDiff = timeNow - parseInt(cache.timestamp)
            if(Boolean(cache.saved) == false && timeDiff > 5 * 1000 * 60)
            {
              this.resultsdb.deleteResults(cache)
            }
          }
        } 

      let params = new HttpParams()
        .set("country", this.code)
        .set("category", "general")
        .set("pageSize", '30')

      const headers = (new HttpHeaders())
        .set('x-api-key', this.apiKey)

      this.http.get<any>(this.ENDPOINT, {params: params, headers: headers}).toPromise()
        .then(res => {
          res = res['articles']
          console.log("news results:", res)
          this.articles = res.map( d => {
            return { 
              src: d.source,
              author: d.author,
              title: d.title,
              description: d.description,
              url: d.url,
              image: d.urlToImage,
              publishedAt: d.publishedAt,
              content: d.content
            }
          })
        console.info("made news call")
        
        for (let article of this.articles) {
          let result = article
          result.saved = false
          result.code = this.code
          result.timestamp = Date.now()

          this.resultsdb.addResults(result as Result)

        }
      }
      ) 
    
    
    }
    )
    
  }

}
