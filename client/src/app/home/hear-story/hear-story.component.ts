import { Component, OnInit } from '@angular/core';
import { StoryService } from '../../services/story.service';

@Component({
  selector: 'app-hear-story',
  templateUrl: './hear-story.component.html',
  styleUrls: ['./hear-story.component.scss']
})
export class HearStoryComponent implements OnInit {

  constructor(private storyService: StoryService) { }

  ngOnInit() {
  }

}
