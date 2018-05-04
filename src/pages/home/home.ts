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
  data_num:number;
  data_pastDueTasks:number;
  data = [
    {"sortNum": 501,
    "dueDate": "05.01",
    "taskLabel": "Design GUI",
    "complete": false,
    "complete_url": "/assets/imgs/box.svg",
    "notes": "finish layout design"
    },
    {"sortNum": 502,
    "dueDate": "05.02",
    "taskLabel": "Work on Task mgmt",
    "complete": false,
    "complete_url": "/assets/imgs/box.svg",
    "notes": null
    },
    {
      "sortNum": 504,
      "dueDate": "05.04",
      "taskLabel": "Conference Call",
      "complete": true,
      "complete_url": "/assets/imgs/check.svg",
      "notes": null
    }
  ]

  day_name:string; //name of current day of week
  day_date:string; //MM.DD.YYYY
  day_sortNum:number; 

  numTasks:number; // count of open tasks
  numTasksPD:string; // string count of past due open tasks (wont appear if not set)

  click:any; // audio click.mp3

  // array to assign day name
  weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]; 

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

    this.day_sortNum = 503;
    this.updateTaskCounter();

    // assigning temp values
    this.numTasks = 2;
    // this.numTasksPD = '{'+this.data_pastDueTasks.toString() +' Task Past Due}';
  }

  AddTask(){
    console.log("clicked");
  }

  // mark task as complete
  CheckBox(index){
    this.click.play(); // play click on press
    if(this.data[index].complete_url.includes("box")){
      this.data[index].complete_url = "assets/imgs/check.svg";
      this.data[index].complete = true;
      // this.data_num -= 1;
    }else{
      this.data[index].complete_url = "assets/imgs/box.svg";
      this.data[index].complete = false;
      // this.data_num += 1;//
    }
    this.updateTaskCounter();
  }

  AddZeroFormat(num){
    return (num < 10 ? '0'+num.toString() : num.toString());
  }

  updateTaskCounter(){
    this.data_num = 0;
    this.data_pastDueTasks = 0;
    for(let i=0;i<this.data.length;i++){
      if(!this.data[i].complete)
        this.data_num += 1;
      if(this.data[i].sortNum < this.day_sortNum && !this.data[i].complete)
      this.data_pastDueTasks += 1;
      if (this.data_pastDueTasks > 0)
        this.numTasksPD = '{'+this.data_pastDueTasks.toString() +' Task Past Due}';
      else
        this.numTasksPD = null;
    }
  }

}
