import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";



@Injectable({
  providedIn: 'root'
})
export class ServerEndPoint {


  constructor(private http: HttpClient) {
    this.loadPaths();

  }
  readonly ServerURLs: string = "../assets/ServerPath.json";
  static paths: ServerPath;
  async loadPaths(): Promise<ServerPath | undefined> {
    return  await this.http.get<ServerPath>(this.ServerURLs).toPromise();
    
  }

  
  
}

export class ServerPath {
  BasePath: string = "";
  Modules?: Array<Modules>;
}

export class Modules {
  Name?: string;
  Endpoints?: Array<Endponts>;
}
export class Endponts {
  path?: string;
  name?: string;
}



