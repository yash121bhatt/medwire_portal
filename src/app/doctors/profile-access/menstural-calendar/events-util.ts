import { EventInput } from "@fullcalendar/angular";
import { PatientdataService } from "src/app/services/patientdata.service";
import { AuthService } from "src/app/core/service/auth.service";

const d = new Date();
const day = d.getDate();
const month = d.getMonth();
const year = d.getFullYear();


export const INITIAL_EVENTS: EventInput[] = [
 
];
