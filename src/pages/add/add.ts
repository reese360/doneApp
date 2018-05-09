import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';
import moment from 'moment';


@IonicPage()
@Component({
  selector: 'page-add',
  templateUrl: 'add.html',
})
export class AddPage {
  // todayTime: String;
  todayDate: String;

  taskName: String;
  taskNotes: String;

  constructor(private view: ViewController, public navParams: NavParams) {
    this.taskName = ""; 
    // this.todayTime = moment().format();
    this.todayDate = moment().format();
    this.taskNotes = "";
  }


  goBack(){
    this.view.dismiss();
  }

  saveTask(){
    let newTask = {
      sortNum: null,
      taskLabel: this.taskName,
      dueDate: this.todayDate,
      // dueTime: this.todayTime,
      taskNotes: this.taskNotes,
      completed: false,
      complete_url: "/assets/imgs/box.svg",
    }
    // console.log(newTask);
    this.view.dismiss(newTask);


  }

}
