import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController} from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-info',
  templateUrl: 'info.html',
})
export class InfoPage {

  constructor(private view: ViewController, private navParams: NavParams) {
  }

  goBack(){
    this.view.dismiss();
  }

}
