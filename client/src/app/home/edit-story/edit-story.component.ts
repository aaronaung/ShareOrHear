import { Component, OnInit } from "@angular/core";
import { StoryService } from "../../services/story.service";

@Component({
  selector: "app-edit-story",
  templateUrl: "./edit-story.component.html",
  styleUrls: ["./edit-story.component.scss"]
})
export class EditStoryComponent implements OnInit {
  creds = {
    storyId: "",
    storyCode: ""
  };
  constructor(private storyService: StoryService) {}

  onSubmit() {
    this.storyService.editStory(this.creds).subscribe(resp => {
      console.log(resp);
    });
  }

  ngOnInit() {}
}
