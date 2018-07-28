import { Component, OnInit } from "@angular/core";
import { StoryService } from "../../services/story.service";
import { EventEmitter } from "@angular/common/src/facade/async";
import { Story, ResponseStatus } from "../../interfaces";

@Component({
  selector: "app-share-story",
  templateUrl: "./share-story.component.html",
  styleUrls: ["./share-story.component.scss"]
})
export class ShareStoryComponent implements OnInit {
  formObject: Story = {
    title: "",
    story: "",
    imageLink: "",
    siteLink: "",
    videoLink: "",
    tags: "",
    code: ""
  };

  constructor(private storyService: StoryService) {}

  ngOnInit() {}

  removeImage() {
    this.formObject.imageLink = "";
  }

  onFormSubmit(e) {
    this.storyService
      .postStory(this.formObject)
      .subscribe(resp => console.log(resp));
  }
}
