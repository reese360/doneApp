import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  day_name:string; //name of current day of week
  day_date:string; //MM.DD.YYYY

  numTasks:number; // count of open tasks
  numTasksPD:string; // string count of past due open tasks (wont appear if not set)

  cb:string="assets/imgs/box.svg";

  // array to assign day name
  weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]; 

  gray = 'color: #b6b6b6';

  constructor(public navCtrl: NavController) {
    let currentDate = new Date();
    currentDate.setDate(currentDate.getDate());
    this.day_name = this.weekdays[currentDate.getDay()];

    let month = this.AddZeroFormat((currentDate.getMonth() + 1));
    let day = this.AddZeroFormat((currentDate.getDate()));
    let year = (currentDate.getFullYear()).toString();
    this.day_date = month+'.'+day+'.'+year;

    // assigning temp values
    this.numTasks = 3;
    this.numTasksPD = "{1 Task Past Due}";
  }

  AddTask(){
    console.log("clicked");
  }

  CheckBox(){
    if(this.cb.includes("box"))
      this.cb="assets/imgs/check.svg";
    else
      this.cb="assets/imgs/box.svg";
  }

  AddZeroFormat(num){
    return (num < 10 ? '0'+num.toString() : num.toString());
  }

}
