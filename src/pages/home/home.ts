import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { Vibration } from '@ionic-native/vibration';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  // test data json 
  data_num:number;
  data_pastDueTasks:number;
  data = [
    {"sortNum": 506,
    "dueDate": "05.06",
    "taskLabel": "Interview Applicant - Reese",
    "complete": false,
    "pastDue": false,
    "complete_url": "/assets/imgs/box.svg",
    "notes": null
    },
    {"sortNum": 501,
    "dueDate": "05.01",
    "taskLabel": "Design GUI",
    "complete": false,
    "pastDue": true,
    "complete_url": "/assets/imgs/box.svg",
    "notes": "finish layout design"
    },
    {"sortNum": 502,
    "dueDate": "05.02",
    "taskLabel": "Work on Task mgmt",
    "complete": false,
    "pastDue": true,
    "complete_url": "/assets/imgs/box.svg",
    "notes": null
    },
    {
      "sortNum": 504,
      "dueDate": "05.04",
      "taskLabel": "Conference Call",
      "complete": true,
      "pastDue": false,
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

  constructor(private vibration: Vibration, public navCtrl: NavController, private modal: ModalController) {
    // this.nativeAudio.preloadSimple('click', 'assets/sound/click.mp3');
    // this.click = new Audio('assets/sound/click.mp3');

    let currentDate = new Date();
    currentDate.setDate(currentDate.getDate());
    this.day_name = this.weekdays[currentDate.getDay()];

    let month = this.AddZeroFormat((currentDate.getMonth() + 1));
    let day = this.AddZeroFormat((currentDate.getDate()));
    let year = (currentDate.getFullYear()).toString();
    this.day_date = month+'.'+day+'.'+year;

    this.day_sortNum = (currentDate.getMonth() + 1) * 100 + (currentDate.getDate()); // used to sort by date
    this.updateTaskCounter();

    // assigning temp values
    this.numTasks = 2;
    this.SortData();
  }

  AddTask(){
    console.log("add task clicked");
    this.vibration.vibrate(500); // vibrate on press
  }

  // mark task as complete
  CheckBox(index){
    // this.click.play(); // play click on press
    this.vibration.vibrate(500); // vibrate on press
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
    this.SortData();
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
    }
    if (this.data_pastDueTasks == 1)
      this.numTasksPD = '{'+this.data_pastDueTasks.toString() +' Task Past Due}';
    else if (this.data_pastDueTasks > 1)
      this.numTasksPD = '{'+this.data_pastDueTasks.toString() +' Tasks Past Due}';
    else
      this.numTasksPD = null;
  }

  InfoClick(){
    console.log("info clicked");
    const infoModal = this.modal.create('InfoPage');
    infoModal.present();
    
  }


  //function sorts data by not complete / complete (using BubbleSort())
  SortData(){
    let completed = [];
    let notComplete = [];
    for(var i=0;i<this.data.length;i++){
      if(this.data[i].complete)
        completed.push(this.data[i]);
      else
        notComplete.push(this.data[i]);
    }
    completed = this.BubbleSort(completed);
    notComplete = this.BubbleSort(notComplete);
    this.data = []; // clear data container
    this.data = notComplete.concat(completed); // merge lists
  }

  BubbleSort(data){
    let temp:any;
    let length = data.length;
    for(var i=0;i<length-1;i++){
      for(var j=0;j<length-i-1;j++){
        if(data[j].sortNum > data[j+1].sortNum){
          temp = data[j];
          data[j] = data[j+1];
          data[j+1] = temp;
        }
      }
    }
    return data;
  }

}
