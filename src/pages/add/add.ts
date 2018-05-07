import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';
import { Keyboard } from '@ionic-native/keyboard';


@IonicPage()
@Component({
  selector: 'page-add',
  templateUrl: 'add.html',
})
export class AddPage {
  @ViewChild('focusInput') myInput ;

  constructor(private view: ViewController, public navParams: NavParams, private keyboard: Keyboard) {
  }

  ionViewLoaded() {

    setTimeout(() => {
      this.keyboard.show() // for android
      this.myInput.setFocus();
    },150); //a least 150ms.

 }

  goBack(){
    this.view.dismiss();
  }

}
