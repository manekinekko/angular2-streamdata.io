import { Injectable, EventEmitter } from '@angular/core';
import { Http } from '@angular/http';
import { Observable, Subscriber } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

declare var streamdataio;

@Injectable()
export class StreamDataService {

  private es: any;
  private obs$: Observable<any>;

  constructor(private http: Http) {
    this.es = streamdataio.createEventSource("http://stockmarket.streamdata.io/prices", "Y2Q3NDVmYjYtY2ZlZC00ZDIxLTgxMGUtZGFlZDI3YzI4NzM4");
    this.obs$ = new Observable<any>( (observer$: Subscriber<any>) => {

      this.es
              .onData((data) => observer$.next({type:'DATA',data}) )
              .onPatch((data) => observer$.next({type:'PATCH',data}) )
              .onError((error) => observer$.error(error));

    });
  }

  open() {
    this.es.open();
    return this.obs$;
  }

  close() {
    this.es.close();
    return this.obs$;
  }

}
