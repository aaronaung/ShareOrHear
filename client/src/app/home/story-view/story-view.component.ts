import { Component, OnInit, Input } from "@angular/core";
import { EmbedVideoService } from "../../../../node_modules/ngx-embed-video/dist";

@Component({
  selector: "app-story-view",
  templateUrl: "./story-view.component.html",
  styleUrls: ["./story-view.component.scss"]
})
export class StoryViewComponent implements OnInit {
  @Input() story;
  storyVideo = null;
  constructor(private embedService: EmbedVideoService) {}

  ngOnInit() {}

  ngOnChanges() {
    if (this.story[0].videoLink != "") {
      this.storyVideo = this.embedService.embed(this.story[0].videoLink, { attr: { width: 600, height: 300 } });
    }
  }
}
