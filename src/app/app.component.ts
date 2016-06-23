import { Component } from '@angular/core';
import { StreamDataService } from './shared/';
import { BarGraph } from './graph.directive';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  providers: [StreamDataService],
  directives: [BarGraph]
})
export class AppComponent {
  private data;
  private patch;
  private graphData;

  constructor(sd: StreamDataService) {

    sd.open().subscribe( snapshot => {
      if(snapshot.type === 'DATA') {
        this.data = snapshot.data;
      }
      else if (snapshot.type === 'PATCH') {
        this.patch = snapshot.data;
        this.graphData = this.patch.map( price => price.value );
      }
    });

  }
}
