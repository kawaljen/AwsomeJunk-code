import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Comment } from './comment';

@Injectable()
export class CommentService {
  private commentsUrl = 'api/comments';  // URL to web api
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) { }

  getAllComments(): Promise<Comment[]> {
    return this.http.get(this.commentsUrl)
               .toPromise()
               .then(response => response.json().data as Comment[])
               .catch(this.handleError);
  }

  getComments(id: number): Promise<Comment[]> {
    return this.http.get(this.commentsUrl)
      .toPromise()
      // a little weird!!
      .then(response => response.json().data.filter(
           function (obj:any ) {
              if ( obj.idPin == id) { 
                // if (!obj.moderated)
                //     return new Comment (obj.idPin, "a comment waiting moderation", obj.timestamp);
                return obj as Comment[];} 
              return; 
            }))
      // .then(response => response.json().data.filter(
      //     (obj:any ) => obj.idPin == id && obj.moderated as Comment[]))       
      .catch(this.handleError);
  }

  // update(comment: Comment): Promise<Comment> {
  //   const url = `${this.commentsUrl}/${comment.id}`;
  //   return this.http
  //     .put(url, JSON.stringify(comment), {headers: this.headers})
  //     .toPromise()
  //     .then(() => comment)
  //     .catch(this.handleError);
  // }

  create(comment: Comment): Promise<Comment> {
    console.log(comment);
    return this.http
      .post(this.commentsUrl, JSON.stringify(comment), {headers: this.headers})
      .toPromise()
      .then((res) => {
        console.log(res);
        return res.json().data;
      })
      .catch((ex) => {
        console.error(ex);
        this.handleError;
      });
  }

  // delete(id: number): Promise<void> {
  //   const url = `${this.commentsUrl}/${id}`;
  //   return this.http.delete(url, {headers: this.headers})
  //     .toPromise()
  //     .then(() => null)
  //     .catch(this.handleError);
  // }

    private handleError(error: any): Promise<any> {
      console.error('An error occurred', error); // for demo purposes only
      return Promise.reject(error.message || error);
    }
}
