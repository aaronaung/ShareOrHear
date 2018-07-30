import { Component, OnInit } from "@angular/core";
import { StoryService } from "../../services/story.service";
import { Story, ResponseStatus } from "../../interfaces";
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

  validCred = true;
  hideCredForm = false;
  hideStoryForm = true;
  editSuccess = false;
  constructor(private storyService: StoryService) {}

  onSubmit() {
    this.storyService.validateStoryCred(this.creds).subscribe(resp => {
      if (resp.status == "error" || resp.payload == undefined) {
        this.validCred = false;
        this.creds.storyId = "";
        this.creds.storyCode = "";
        return;
      }
      this.validCred = true;
      this.hideCredForm = true;
      this.hideStoryForm = false;
      this.formObject = resp.payload;
    });
  }

  handleEditResponse(e) {
    if (e.status == "success") {
      this.editSuccess = true;
    } else {
      this.editSuccess = false;
    }
  }

  ngOnInit() {}
}
