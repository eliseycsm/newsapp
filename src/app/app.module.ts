import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule }from '@angular/common/http';
import { StartComponent } from './components/start.component';
import { LoginComponent } from './components/login.component'

const ROUTES: Routes = [
  {path: '', component: MainComponent},
  {path: 'searchList', component: SearchListComponent},
  {path: 'search', component: SearchComponent},
  {path: 'search/:type/:q', component: ResultComponent},
  {path: '**', redirectTo: "/", pathMatch:'full'},
]

@NgModule({
  declarations: [
    AppComponent,
    StartComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
