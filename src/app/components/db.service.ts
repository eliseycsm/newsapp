import Dexie from 'dexie';
import {Injectable} from '@angular/core'
import { Country, LoginDetails, Result } from './models';


@Injectable() //to make it into a service
export class NewsDB extends Dexie{
    //create tables
    private apiDB: Dexie.Table<LoginDetails, string> 
    private countryDB: Dexie.Table<Country, string> 
    private resultsDB: Dexie.Table<Result, Result> 
    i
    constructor() {
        //database name must be first line
        super('newsdb')

        //setup schema for v1
        this.version(1).stores({  
            apidb: "apikey",
            countrydb: "code",
            resultdb: "code,timestamp"
        })

        //get reference to the collections
        this.apiDB = this.table('apidb')
        this.countryDB = this.table('countrydb')
        this.resultsDB = this.table('resultdb')
    }

    // apidb functions
    async addApi(t: LoginDetails): Promise<any>{
        return await this.apiDB.put(t)
    }

    async getApi(): Promise<any>{
        return await this.apiDB.toArray()
    }

    async deleteApi(apikey: string): Promise<any> {
        console.log("deleteApi triggered")
        return (await this.apiDB.where("apikey").anyOf(apikey)
            .delete())
    }

    //countrydb functions
    async getCountryList(): Promise<any>{
        return await this.countryDB.toArray()
    }

    async addCountry(cty: Country) {
        return await this.countryDB.put(cty)
    }

    async getCountry(code: string) {
        return await this.countryDB.where("code").equals(code).toArray()
    }


    //resultsdb functions
    async addResults(result: Result): Promise<any>{
        return await this.resultsDB.put(result)
        //or also can use this.todo.add(t)  <- but add is an insert vs put which is a upsert    
    }

    async getResults(): Promise<Result[]> {
        return (await this.resultsDB.toArray())
    }
    async deleteResults(result: Result): Promise<any> {
        return (await this.resultsDB.where("timestamp").anyOf(result.timestamp)
            .delete())
    }
}
