import { Component, ViewChild, OnInit } from "@angular/core";
import {
  CalendarOptions,
  DateSelectArg,
  EventClickArg,
  EventApi,
} from "@fullcalendar/angular";
import { EventInput } from "@fullcalendar/angular";
import { MatDialog } from "@angular/material/dialog";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Calendar } from "../../calendar/calendar.model";
import { FormDialogComponent } from "./dialogs/form-dialog/form-dialog.component";
import { MenstruelcalenderService } from "./menstruelcalender.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { INITIAL_EVENTS } from "./events-util";
import { MatCheckboxChange } from "@angular/material/checkbox";
import { UnsubscribeOnDestroyAdapter } from "../../shared/UnsubscribeOnDestroyAdapter";
import { PatientdataService } from "src/app/services/patientdata.service";
import { AuthService } from "src/app/core/service/auth.service";
//import { EventInput } from "@fullcalendar/angular";
import Swal from 'sweetalert2';
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";



@Component({
  selector: 'app-menstruelcalender',
  templateUrl: './menstruelcalender.component.html',
  styleUrls: ['./menstruelcalender.component.sass']
})
export class MenstruelcalenderComponent extends UnsubscribeOnDestroyAdapter implements OnInit {

 
  @ViewChild("calendar", { static: false })
  calendar: Calendar | null;
  public addCusForm: FormGroup;
  dialogTitle: string;
  filterOptions = "All";
  calendarData: any;
  filterItems: string[] = [
    "work",
    "personal",
    "important",
    "travel",
    "friends",
  ];

  calendarEvents: EventInput[];
  tempEvents: EventInput[];
  showHTMlcal= false;

  public filters = [
    { name: "work", value: "Work", checked: true },
    { name: "personal", value: "Personal", checked: true },
    { name: "important", value: "Important", checked: true },
    { name: "travel", value: "Travel", checked: true },
    { name: "friends", value: "Friends", checked: true },
  ];
  Input: any;
  calendarDataevents: any;
  myEventData: any[] = [];
  todayDate: Date;
  startDatePick: any;
  startingDate: any;
  startingDateFirst: any;
  startingDateMonth: any;
  oluvationDaysSecond: number;
  oluvationDaysFirst: number;
  oluvationDaysThird: number;
 // allStartingDate: any;
  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    public calendarService: MenstruelcalenderService,
    private snackBar: MatSnackBar,
    private patientdataService : PatientdataService,
    private authService: AuthService,
    private router : Router
  ) {
    super();  
    
     this.dialogTitle = "Add New Event";
     this.calendar = new Calendar({});
     this.addCusForm = this.createCalendarForm(this.calendar);
    
  }

  public ngOnInit(): void     {  

    if((this.authService.currentUserValue.address==null || this.authService.currentUserValue.address=='') || (this.authService.currentUserValue.pin_code==null || this.authService.currentUserValue.pin_code=='')){
    
      Swal.fire(
        '',
        `${environment.profileCompleteMessage}`,
        'info'
      )
        this.router.navigate(["/patient/editprofile"]);

    }
    else{
      setTimeout(() => { 

        const d   = new Date();
        const day = d.getDate();
        const month = d.getMonth();
        const year  = d.getFullYear();
        this.showHTMlcal = true;
        this.calendarEvents = this.myEventData;
        this.tempEvents = this.myEventData;
        this.calendarOptions.initialEvents = this.myEventData;
        if(this.myEventData.length===0){
          this.addFirstEvent();
        }
        
        }, 1000);

    }
   this.myEventData = this.getDataEvent();
  //const INITIAL_EVENTSsss = this.getDataEvent();
  const INITIAL_EVENTSsss = [
    
]
 
  
  
  }
  
  getDataEvent(){
    var EventsData = new Array; 
    var allStartingDate = new Array();
    const userID = {
      "user_id":this.authService.currentUserValue.userid
    };
    this.patientdataService.mensurationList(userID).subscribe(
      (result)=>{
      this.calendarDataevents = result.data;
      this.startingDateFirst  = this.calendarDataevents[0].start_date.slice(0,10);
      this.startingDateMonth  = this.calendarDataevents[0].start_date.slice(0,10);
      this.oluvationDaysSecond = this.calendarDataevents[0].nextDateCount - 14;
      this.oluvationDaysFirst = this.oluvationDaysSecond - 1;
      
      this.oluvationDaysThird = this.oluvationDaysSecond + 1;

// FIRST LOOP Logic
      for(let i= 0 ; i < 6 ; i++){
        this.startingDate =this.addDays(this.calendarDataevents[0].nextDateCount*i, new Date(this.startingDateFirst));
        allStartingDate.push(this.startingDate);
        
        for(let j = 0 ;j<this.calendarDataevents[0].period_length;j++){
          const result1 = this.addDays(j, new Date(this.startingDate));
          const calEvents = {
            id    : 'event'+this.calendarDataevents[0].m_id,
            title : 'Day is period day',
            start :result1,
            // end   :this.calendarDataevents[i].end_date,
            className : this.calendarDataevents[0].bg_color_class
          }
          EventsData.push(calEvents);
          
        }
        
      }
    
    

      //SECOND LOOP Logic

      for(let i= 0; i < 6; i++){
        for(let j=0; j<9 ; j++){
          var result1 = this.addDays((this.calendarDataevents[0].nextDateCount*i) + ((this.oluvationDaysFirst +j)-4), new Date(this.startingDateFirst));
          
          if(j==0){
            var calEvents = {
              id    : 'event'+this.calendarDataevents[0].m_id,
              title : 'HIGH - Chance of Getting Pregnant',
              start :result1,
              // end   :this.calendarDataevents[i].end_date,
              className : 'fc-event-warning'
            }
           }else if(j==1){
            var calEvents = {
              id    : 'event'+this.calendarDataevents[0].m_id,
              title : ' HIGH - Chance of Getting Pregnant',
              start :result1,
              // end   :this.calendarDataevents[i].end_date,
              className : 'fc-event-warning'
            }
           }
           else if(j == 2){
            var calEvents = {
              id    : 'event'+this.calendarDataevents[0].m_id,
              title : ' HIGH - Chance of Getting Pregnant',
              start :result1,
              // end   :this.calendarDataevents[i].end_date,
              className : 'fc-event-warning'
            }
           }
           else if(j == 3){
            var calEvents = {
              id    : 'event'+this.calendarDataevents[0].m_id,
              title : 'HIGH - Chance of Getting Pregnant',
              start :result1,
              // end   :this.calendarDataevents[i].end_date,
              className : 'fc-event-warning'
            }
           }
           else if( j == 4){
            var calEvents = {
              id    : 'event'+this.calendarDataevents[0].m_id,
              title : ' HIGH - Chance of Getting Pregnant',
              start :result1,
              // end   :this.calendarDataevents[i].end_date,
              className : 'fc-event-primary'
            }
           }
           else{
            var calEvents = {
              id    : 'event'+this.calendarDataevents[0].m_id,
              title : ' HIGH - Chance of Getting Pregnant',
              start :result1,
              // end   :this.calendarDataevents[i].end_date,
              className : 'fc-event-warning'
            }
           }
           
          
          EventsData.push(calEvents);
        }
        
      }

      
    });  
    
    return EventsData;
  }

   addDays(numOfDays: number, date = new Date()) {
    date.setDate(date.getDate() + numOfDays);
  
    return date;
  }
  
  
  calendarOptions: CalendarOptions = {
    timeZone:'Asia/Calcutta',
    headerToolbar: {
      left: "prev,next today",
      center: "title",
      right: "",
    },
     validRange: {
      start: '2023-01-01',
      // end: '2022-06-01'
     },
    initialView: "dayGridMonth",
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    dateClick: this.handleDateClick.bind(this),
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this),
  };
  handleDateClick(arg) {
    this.startDatePick = arg.dateStr;
    this.addNewEvent();
  }

  handleDateSelect(selectInfo: DateSelectArg) {

  }

  addNewEvent() {
    let tempDirection;
    if (localStorage.getItem("isRtl") === "true") {
      tempDirection = "rtl";
    } else {
      tempDirection = "ltr";
    }
    Swal.fire(
      '',
      '<h4><i>Low - Chance of getting pregnant</i></h4>',
      
    )
    // const dialogRef = this.dialog.open(FormDialogComponent, {
    //   data: {
    //     calendar: this.calendar,
    //     action: "add",
    //     start_datePick:this.startDatePick
    //   },
    //   direction: tempDirection,
    // }); 
  }

  addFirstEvent() {
    let tempDirection;
    if (localStorage.getItem("isRtl") === "true") {
      tempDirection = "rtl";
    } else {
      tempDirection = "ltr";
    }
    const dialogRef = this.dialog.open(FormDialogComponent, {
      data: {
        calendar: this.calendar,
        action: "addFirst",
        start_datePick:this.startDatePick
      },
      direction: tempDirection,
    }); 
  }

  changeCategory(event: MatCheckboxChange, filter) {
    if (event.checked) {
      this.filterItems.push(filter.name);
    } else {
      this.filterItems.splice(this.filterItems.indexOf(filter.name), 1);
    }
    this.filterEvent(this.filterItems);
  }

  filterEvent(element) {
    const list = this.calendarEvents.filter((x) =>
      element.map((y) => y).includes(x.groupId)
    );

    this.calendarOptions.events = list;
  }

  handleEventClick(clickInfo: EventClickArg) {
    this.eventClick(clickInfo);
  }

  eventClick(row) {
    Swal.fire(
      '',
      '<h4><i>'+row.event.title+'</i></h4>',
     
    )
    const calendarData: any = {
      id: row.event.id,
       title: row.event.title,
      category: row.event.groupId,
      startDate: row.event.start,
      // endDate: row.event.end,
      colorpick:row.event._def.ui.classNames[0],
      details: row.event.extendedProps.details,

    };
    let tempDirection;

    if (localStorage.getItem("isRtl") === "true") {
      tempDirection = "rtl";
    } else {
      tempDirection = "ltr";
    }
    // const dialogRef = this.dialog.open(FormDialogComponent, {
    //   data: {
    //     calendar: calendarData,
    //     action: "edit",
    //     start_datePick:calendarData.startDate
    //   },
    //   direction: tempDirection,
    // });

    // this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
    //   if (result === "submit") {
    //     this.calendarData = this.calendarService.getDialogData();
    //     this.calendarEvents.forEach(function (element, index) {
    //       if (this.calendarData.id === element.id) {
    //         this.editEvent(index, this.calendarData);
    //       }
    //     }, this);
    //     this.showNotification(
    //       "black",
    //       "Edit Record Successfully...!!!",
    //       "bottom",
    //       "center"
    //     );
    //     this.addCusForm.reset();
    //   } else if (result === "delete") {
    //     this.calendarData = this.calendarService.getDialogData();
    //     this.calendarEvents.forEach(function (element, index) {
    //       if (this.calendarData.id === element.id) {
    //         row.event.remove();
    //       }
    //     }, this);

    //     this.showNotification(
    //       "snackbar-danger",
    //       "Delete Record Successfully...!!!",
    //       "bottom",
    //       "center"
    //     );
    //   }
    // });
  }

  editEvent(eventIndex, calendarData) {
    const calendarEvents = this.calendarEvents.slice();
    const singleEvent = Object.assign({}, calendarEvents[eventIndex]);
    singleEvent.id = calendarData.id;
     singleEvent.title = calendarData.title;
    singleEvent.start = calendarData.startDate;
    // singleEvent.end = calendarData.endDate;
    singleEvent.className = this.getClassNameValue(calendarData.category);
    singleEvent.groupId = calendarData.category;
    singleEvent.details = calendarData.details;
    calendarEvents[eventIndex] = singleEvent;
    this.calendarEvents = calendarEvents; // reassign the array

    this.calendarOptions.events = calendarEvents;
  }

  handleEvents(events: EventApi[]) {
    // this.currentEvents = events;
  }

  createCalendarForm(calendar): FormGroup {
    return this.fb.group({
      id: [calendar.id],
       title: [
         calendar.title,
         [Validators.required, Validators.pattern("[a-zA-Z]+([a-zA-Z ]+)*")],
       ],
      // category: [calendar.category],
      startDate: [calendar.startDate, [Validators.required]],
      // endDate: [calendar.endDate, [Validators.required]],
      // details: [
      //   calendar.details,
      //   [Validators.required, Validators.pattern("[a-zA-Z]+([a-zA-Z ]+)*")],
      // ],
    });
  }

  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, "", {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }

  getClassNameValue(category) {
    let className: string;

    if (category === "work") className = "fc-event-success";
    else if (category === "personal") className = "fc-event-warning";
    else if (category === "important") className = "fc-event-primary";
    else if (category === "travel") className = "fc-event-danger";
    else if (category === "friends") className = "fc-event-info";

    return className;
  }

  deleteEventsreload(){
    setTimeout(() => {
      this.ngOnInit();
    }, 1000);
  }
}
