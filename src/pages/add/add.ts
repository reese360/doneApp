import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';
import moment from 'moment';


@IonicPage()
@Component({
  selector: 'page-add',
  templateUrl: 'add.html',
})
export class AddPage {
  todayTime: String;
  todayDate: String;

  constructor(private view: ViewController, public navParams: NavParams) {
     this.todayTime = moment().format();
     this.todayDate = moment().format();
  }


  goBack(){
    this.view.dismiss();
  }

}
