import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NewsDB } from './db.service';
import { v4 as uuidv4 } from 'uuid'
import { LoginDetails } from './models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup
  apikey: string

  constructor(private fb:FormBuilder, private router: Router, private apiDB: NewsDB) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      apikey: this.fb.control('', [Validators.required])
    })
  }


  onBack() {
    this.form.reset()
    this.router.navigate(["/start"])
  }

  async onAdd() {
    //const id = uuidv4().toString().substring(0,8)
    this.apikey = this.form.get('apikey').value
    const logindata: LoginDetails = {
      //id: id,
      apikey: this.apikey
    }
    await this.apiDB.addApi(logindata)
  }
  async onDelete(){
    this.apikey = this.form.get('apikey').value
    console.log("delete", this.apikey)
    return await this.apiDB.deleteApi(this.apikey)
  }

  showVals(){
    console.log(this.form.value)
  }

}
