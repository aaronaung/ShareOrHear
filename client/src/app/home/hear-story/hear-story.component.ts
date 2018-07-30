import { Component, OnInit } from "@angular/core";
import { StoryService } from "../../services/story.service";

@Component({
  selector: "app-hear-story",
  templateUrl: "./hear-story.component.html",
  styleUrls: ["./hear-story.component.scss"]
})
export class HearStoryComponent implements OnInit {
  formObject = {
    tags: ""
  };

  showStoryView = false;
  storyDNE = false;
  story = [];
  constructor(private storyService: StoryService) {}

  onFormSubmit() {
    this.storyService.hearStory(this.formObject).subscribe(resp => {
      if (resp.status == "error" || resp.payload.length == 0) {
        this.storyDNE = true;
        this.formObject.tags = " ";
      }
      if (resp.status == "success" && resp.payload.length !== 0) {
        this.showStoryView = true;
        this.story = resp.payload;
        this.storyDNE = false;
      }
    });
  }

  hearMore() {
    this.showStoryView = false;
    this.formObject.tags = "";
  }

  ngOnInit() {}
}
