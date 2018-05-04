import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CommonModule } from "@angular/common";
import { NativeAudio } from '@ionic-native/native-audio';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  // test data json 
  data = [
    {"sortNum": "501",
    "dueDate": "05.01",
    "taskLabel": "Design GUI",
    "complete": false,
    "complete_url": "/assets/imgs/box.svg",
    "notes": "finish layout design"
    },
    {
      "sortNum": "504",
      "dueDate": "05.04",
      "taskLabel": "Conference Call",
      "complete": true,
      "complete_url": "/assets/imgs/check.svg",
      "notes": null
    }
  ]

  day_name:string; //name of current day of week
  day_date:string; //MM.DD.YYYY

  numTasks:number; // count of open tasks
  numTasksPD:string; // string count of past due open tasks (wont appear if not set)

  click:any;

  // array to assign day name
  weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]; 

  completed = true;

  constructor(public navCtrl: NavController, private nativeAudio: NativeAudio) {
    // this.nativeAudio.preloadSimple('click', 'assets/sound/click.mp3');
    this.click = new Audio('assets/sound/click.mp3');

    let currentDate = new Date();
    currentDate.setDate(currentDate.getDate());
    this.day_name = this.weekdays[currentDate.getDay()];

    let month = this.AddZeroFormat((currentDate.getMonth() + 1));
    let day = this.AddZeroFormat((currentDate.getDate()));
    let year = (currentDate.getFullYear()).toString();
    this.day_date = month+'.'+day+'.'+year;

    // assigning temp values
    this.numTasks = 2;
    this.numTasksPD = "{1 Task Past Due}";
  }

  AddTask(){
    console.log("clicked");
  }

  // mark task as complete
  CheckBox(index){
    // this.nativeAudio.play('click', () => console.log('click'));
    this.click.play();
    if(this.data[index].complete_url.includes("box")){
      this.data[index].complete_url = "assets/imgs/check.svg";
      this.data[index].complete = true;
      // mark task as complete
    }else{
      this.data[index].complete_url = "assets/imgs/box.svg";
      this.data[index].complete = false;
      // mark task as incomplete
    }
  }

  AddZeroFormat(num){
    return (num < 10 ? '0'+num.toString() : num.toString());
  }

  ChooseClass(){
    console.log('here');
    return "completed"
  }

}
