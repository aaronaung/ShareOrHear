import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { Headers } from "@angular/http";
import { Observable } from "../../../node_modules/rxjs/Observable";
import { environment } from "environments/environment";
import { Story, ResponseStatus } from "../interfaces";
import "rxjs/add/operator/map";

@Injectable()
export class StoryService {
  API_BASE = environment.API_BASE;
  headers = {
    headers: new Headers({
      "Content-Type": "application/json"
    })
  };

  constructor(private http: Http) {}

  makeRequest(url, type, body): Observable<ResponseStatus> {
    let observable: Observable<ResponseStatus>;
    switch (type) {
      case "post":
        observable = this.http.post(url, body, this.headers).map((res: Response) => res.json());
        break;
      //Possible implementations for get/put
    }
    return observable;
  }

  postStory(story): Observable<ResponseStatus> {
    return this.makeRequest(`${this.API_BASE}/share`, "post", story);
  }

  validateStoryCred(cred): Observable<ResponseStatus> {
    return this.makeRequest(`${this.API_BASE}/validate`, "post", cred);
  }

  hearStory(tags): Observable<ResponseStatus> {
    return this.makeRequest(`${this.API_BASE}/hear`, "post", tags);
  }

  editStory(story): Observable<ResponseStatus> {
    return this.makeRequest(`${this.API_BASE}/edit`, "post", story);
  }
}
