import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Pin } from './pin';

@Injectable()
export class PinService {
  private pinsUrl = 'api/pins';  // URL to web api
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) { }

  getPins(): Promise<Pin[]> {
    return this.http.get(this.pinsUrl)
               .toPromise()
              //  .then(response => response.json().data as Pin[])
               .then(response => response.json().data.filter((obj : any) => obj.moderated) as Pin[])  
               .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  getPin(id: number): Promise<Pin> {
    const url = `${this.pinsUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().data as Pin)
      .catch(this.handleError);
  }

  // update(pin: Pin): Promise<Pin> {
  //   const url = `${this.pinsUrl}/${pin.id}`;
  //   return this.http
  //     .put(url, JSON.stringify(pin), {headers: this.headers})
  //     .toPromise()
  //     .then(() => pin)
  //     .catch(this.handleError);
  // }

  create(pin: Pin): Promise<Pin> {
    console.log(pin);
    return this.http
      .post(this.pinsUrl, JSON.stringify(pin), {headers: this.headers})
      .toPromise()
      .then((res) => {
        console.log(res);
        return res.json().data;
      })
      .catch(this.handleError);
  }

  // delete(id: number): Promise<void> {
  //   const url = `${this.pinsUrl}/${id}`;
  //   return this.http.delete(url, {headers: this.headers})
  //     .toPromise()
  //     .then(() => null)
  //     .catch(this.handleError);
  // }
}
