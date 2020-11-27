import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule }from '@angular/common/http';
import { StartComponent } from './components/start.component';
import { LoginComponent } from './components/login.component'
import { NewsDB } from './components/db.service';
import { CheckApiComponent } from './components/check-api.component';
import { ResultComponent } from './components/result.component';


const ROUTES: Routes = [
  {path: '', component: CheckApiComponent},
  {path: 'start', component: StartComponent},
  {path: 'login', component: LoginComponent},
  // {path: 'search', component: SearchComponent},
  {path: 'results/:code', component: ResultComponent},
  {path: '**', redirectTo: "/", pathMatch:'full'},
]

@NgModule({
  declarations: [
    AppComponent,
    StartComponent,
    LoginComponent,
    CheckApiComponent,
    ResultComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
    
  ],
  providers: [NewsDB],
  bootstrap: [AppComponent]
})
export class AppModule { }
