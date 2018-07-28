import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import {RouterModule, Routes} from '@angular/router';
import { ShareStoryComponent } from './home/share-story/share-story.component';
import { EditStoryComponent } from './home/edit-story/edit-story.component';
import { HearStoryComponent } from './home/hear-story/hear-story.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { StoryService } from './services/story.service';


const appRoutes: Routes = [
  {path: 'share', component: ShareStoryComponent},
  {path: 'edit', component: EditStoryComponent},
  {path: 'hear', component: HearStoryComponent},
  {path: '', component: ShareStoryComponent},
  {path: '**', component: PageNotFoundComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ShareStoryComponent,
    EditStoryComponent,
    HearStoryComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(
      appRoutes
    )
  ],
  providers: [StoryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
