import { Component, OnInit, Input, Output } from "@angular/core";
import { StoryService } from "../../services/story.service";
import { EventEmitter } from "@angular/common/src/facade/async";
import { Story, ResponseStatus } from "../../interfaces";

@Component({
  selector: "app-story-form",
  templateUrl: "./story-form.component.html",
  styleUrls: ["./story-form.component.scss"]
})
export class StoryFormComponent implements OnInit {
  @Input() formObject: Story;
  @Input() formType: String;
  @Output() shareResponse: EventEmitter<any> = new EventEmitter();
  @Output() editResponse: EventEmitter<any> = new EventEmitter();
  constructor(private storyService: StoryService) {}

  ngOnInit() {}

  onFormSubmit(e) {
    switch (this.formType) {
      case "share":
        this.storyService.postStory(this.formObject).subscribe(resp => this.shareResponse.emit(resp));
        break;
      case "edit":
        this.storyService.editStory(this.formObject).subscribe(resp => this.editResponse.emit(resp));
        break;
    }
  }
}
