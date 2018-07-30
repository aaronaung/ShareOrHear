export interface Story {
  title: String;
  story: String;
  imageLink: String;
  siteLink: String;
  videoLink: String;
  tags: String;
  code: String;
  storyId: String;
}

export interface ResponseStatus {
  status: String;
  payload: any;
}
