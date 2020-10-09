import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  @ViewChild('frog') private frog: ElementRef;
  public progressVal: number = 0;

  public holdHandler(ev: number) {
    console.log(ev);
    this.progressVal = ev / 10;
    if (this.progressVal > 100) {
      console.log('deleted');
      this.frog.nativeElement.remove();
    }
  }
}
