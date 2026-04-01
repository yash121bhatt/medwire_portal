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
  myEventData: any;
  todayDate: Date;
  startDatePick: any;

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    public calendarService: MenstruelcalenderService,
    private snackBar: MatSnackBar,
    private patientdataService : PatientdataService,
    private authService: AuthService,
  ) {
    super();  
    
     this.dialogTitle = "Add New Event";
     this.calendar = new Calendar({});
     this.addCusForm = this.createCalendarForm(this.calendar);
    
  }

  public ngOnInit(): void     {  
    
      this.myEventData = this.getDataEvent();
      this.minDatetoBlock();
  //const INITIAL_EVENTSsss = this.getDataEvent();
  const INITIAL_EVENTSsss = [
    {
        "id": "event2",
        "title": "The Event is adding This Time Raj",
        "start": "2022-09-10T00:00:00.000Z",
        "end": "2022-09-11T18:30:00.000Z",
        "className": "fc-event-info"
    },
    {
        "id": "event3",
        "title": "The events is in",
        "start": "2022-09-10T18:30:00.000Z",
        "end": "2022-09-19T18:30:00.000Z",
        "className": "fc-event-primary"
    },
    {
        "id": "event4",
        "title": "Title My Dreama D",
        "start": "2022-08-31T18:30:00.000Z",
        "end": "2022-09-07T18:30:00.000Z",
        "className": "fc-event-danger"
    },
    {
        "id": "event5",
        "title": "The dream DDD",
        "start": "2022-09-10T00:00:00.000Z",
        "end": "2022-09-10T00:00:00.000Z",
        "className": "fc-event-warning"
    },
    {
        "id": "event6",
        "title": "",
        "start": "2022-09-10T00:00:00.000Z",
        "end": "2022-09-10T00:00:00.000Z",
        "className": null
    },
    {
        "id": "event7",
        "title": "",
        "start": "2022-09-10T00:00:00.000Z",
        "end": "2022-09-10T00:00:00.000Z",
        "className": null
    },
    {
        "id": "event8",
        "title": "test",
        "start": "2022-09-12T00:00:00.000Z",
        "end": "2022-09-12T00:00:00.000Z",
        "className": "fc-event-danger"
    }
]
  console.log('check',this.myEventData); 
 
  
  setTimeout(() => {
  const d = new Date();
  const day = d.getDate();
  const month = d.getMonth();
  const year = d.getFullYear();
  this.showHTMlcal = true;
  this.calendarEvents = this.myEventData;
  this.tempEvents = this.myEventData;
  this.calendarOptions.initialEvents = this.myEventData;
    
  }, 900);
  }
  
  getDataEvent(){
    
    var EventsData = new Array; 
    const userID = {
      "user_id":this.authService.currentUserValue.userid
    };
    this.patientdataService.mensurationList(userID).subscribe(
      (result)=>{
      this.calendarDataevents = result.data;
      
      for(let i= 0 ; i<this.calendarDataevents.length;i++){
        console.log('end Date = ',this.calendarDataevents[i].end_date);
        const calEvents = {
          id    : 'event'+this.calendarDataevents[i].m_id,
          title : this.calendarDataevents[i].title,
          start :this.calendarDataevents[i].start_date,
          end   :this.calendarDataevents[i].end_date,
          className : this.calendarDataevents[i].bg_color_class
        }
        EventsData.push(calEvents);
      }
    });  
    return EventsData;
  }
  // apiResponse(){
  //   const userID = {
  //     "user_id":this.authService.currentUserValue.userid
  //   };
    
  //   this.patientdataService.mensurationList(userID).subscribe(
  //     (result)=>{
  //     this.calendarEvents = result.data;
  //     var EventsData = new Array(); 
  //     for(let i= 0 ; i<this.calendarEvents.length;i++){
  //       const calEvents = {
  //         id    : 'event'+this.calendarEvents[i].m_id,
  //         title : this.calendarEvents[i].title,
  //         start :this.calendarEvents[i].start_date,
  //         end   :this.calendarEvents[i].end_date,
  //         className : this.calendarEvents[i].bg_color_class
  //       }
  //       EventsData.push(calEvents);
  //     }
  //     return EventsData;
  //   })
  // }

  

  calendarOptions: CalendarOptions = {
    headerToolbar: {
      left: "prev,next today",
      center: "title",
      right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
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
    //alert('date click! ' + arg.dateStr)
  }

  handleDateSelect(selectInfo: DateSelectArg) {

   // this.addNewEvent();
  }

  addNewEvent() {
   
    let tempDirection;
    if (localStorage.getItem("isRtl") === "true") {
      tempDirection = "rtl";
    } else {
      tempDirection = "ltr";
    }
    
    const dialogRef = this.dialog.open(FormDialogComponent, {
      data: {
        calendar: this.calendar,
        action: "add",
        start_datePick:this.startDatePick
      },
      direction: tempDirection,
    });
   

    // this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
    //   if (result === "submit") {
    //     this.calendarData = this.calendarService.getDialogData();
    //     console.log(this.calendarData.startDate);
    //     this.calendarEvents = this.calendarEvents.concat({
    //       // add new event data. must create new array
    //       id: this.calendarData.id,
    //       title: this.calendarData.title,
    //       start: this.calendarData.startDate,
    //       end: this.calendarData.endDate,
    //       className: this.getClassNameValue(this.calendarData.category),
    //       groupId: this.calendarData.category,
    //       details: this.calendarData.details,
    //     });
    //     this.calendarOptions.events = this.calendarEvents;
    //     this.addCusForm.reset();
    //     this.showNotification(
    //       "snackbar-success",
    //       "Add Record Successfully...!!!",
    //       "bottom",
    //       "center"
    //     );
    //   }
    // });
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
    
    const calendarData: any = {
      id: row.event.id,
      title: row.event.title,
      category: row.event.groupId,
      startDate: row.event.start,
      endDate: row.event.end,
      colorpick:row.event._def.ui.classNames[0],
      details: row.event.extendedProps.details,

    };
    let tempDirection;


    if (localStorage.getItem("isRtl") === "true") {
      tempDirection = "rtl";
    } else {
      tempDirection = "ltr";
    }
    const dialogRef = this.dialog.open(FormDialogComponent, {
      data: {
        calendar: calendarData,
        action: "edit",
      },
      direction: tempDirection,
    });

    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      if (result === "submit") {
        this.calendarData = this.calendarService.getDialogData();
        this.calendarEvents.forEach(function (element, index) {
          if (this.calendarData.id === element.id) {
            this.editEvent(index, this.calendarData);
          }
        }, this);
        this.showNotification(
          "black",
          "Edit Record Successfully...!!!",
          "bottom",
          "center"
        );
        this.addCusForm.reset();
      } else if (result === "delete") {
        this.calendarData = this.calendarService.getDialogData();
        this.calendarEvents.forEach(function (element, index) {
          if (this.calendarData.id === element.id) {
            row.event.remove();
          }
        }, this);

        this.showNotification(
          "snackbar-danger",
          "Delete Record Successfully...!!!",
          "bottom",
          "center"
        );
      }
    });
  }

  editEvent(eventIndex, calendarData) {
  
    const calendarEvents = this.calendarEvents.slice();
    const singleEvent = Object.assign({}, calendarEvents[eventIndex]);
    singleEvent.id = calendarData.id;
    singleEvent.title = calendarData.title;
    singleEvent.start = calendarData.startDate;
    singleEvent.end = calendarData.endDate;
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
      endDate: [calendar.endDate, [Validators.required]],
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
    console.log('Delete');
    setTimeout(() => {
      this.ngOnInit();
    }, 1000);
  }

  

  minDatetoBlock(){
    var today = new Date();
    this.todayDate = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();

   var todayD = yyyy + '-' + mm + '-' + dd;
   console.log('today',today);
   console.log('today DD',todayD);
   //$('#date_picker').attr('min',todayD);
  }

  
}
