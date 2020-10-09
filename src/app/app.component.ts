import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  public progress: number = 0;

  public holdHandler(ev: number) {
    console.log(ev);
    this.progress = ev / 10;
    if (ev === 1000) {
      console.log('deleted');
      
    }
  }
}
