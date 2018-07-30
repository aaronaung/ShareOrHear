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
    code: "",
    storyId: ""
  };

  successId = "";
  successCode = "";

  showCredentials = false;
  constructor(private storyService: StoryService) {}

  handleShareResponse(e) {
    if (e.status == "success") {
      this.successId = e.payload[0].id;
      this.successCode = e.payload[0].code;
      this.showCredentials = true;
    }
  }

  shareMore() {
    this.formObject = {
      title: "",
      story: "",
      imageLink: "",
      siteLink: "",
      videoLink: "",
      tags: "",
      code: "",
      storyId: ""
    };
    this.showCredentials = false;
  }

  ngOnInit() {}
}
