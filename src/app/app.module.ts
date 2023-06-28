import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { CollectionsComponent } from './collections/collections.component';
import { CreateComponent } from './create/create.component';
import { UpdateComponent } from './update/update.component';

const routes: Routes = [
  { path: 'collections/:category', component: CollectionsComponent },
  { path: 'collection/create', component: CreateComponent },
  { path: 'collection/update/:id', component: UpdateComponent },
  { path: '**', redirectTo: 'collections/all' } 

];

@NgModule({
  declarations: [
    AppComponent,
    CollectionsComponent,
    CreateComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
