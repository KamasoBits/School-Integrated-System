import { Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { SignupComponent } from './Components/signup/signup.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { StudentsComponent } from './Components/students/students.component';
import { TeachersComponent } from './Components/teachers/teachers.component';
import { SubjectsComponent } from './Components/subjects/subjects.component';
import { TimetableComponent } from './Components/timetable/timetable.component';
import { ResultsComponent } from './Components/results/results.component';
import { ReportsComponent } from './Components/reports/reports.component';
import { AttendanceComponent } from './Components/attendance/attendance.component';
import { FinanceComponent } from './Components/finance/finance.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'timetable', component: TimetableComponent },
  { path: 'results', component: ResultsComponent },
  { path: 'reports', component: ReportsComponent },
  { path: 'attendance', component: AttendanceComponent },
  { path: 'students', component: StudentsComponent },
  { path: 'teachers', component: TeachersComponent },
  { path: 'subjects', component: SubjectsComponent },
  { path: 'finance', component: FinanceComponent }
];
