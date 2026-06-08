import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReportsService } from '../../Services/reports.service';

interface StudentAttendance {
  name: string;
  admissionNumber: string;
  grade: string;
  status: 'Present' | 'Absent';
}

interface StaffAttendance {
  name: string;
  role: string;
  status: 'Present' | 'Absent';
}

interface AttendanceRecord {
  date: string;
  type: 'Student' | 'Staff';
  group: string;
  presentCount: number;
  absentCount: number;
  details: string;
}

@Component({
  selector: 'app-attendance',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './attendance.component.html',
  styleUrl: './attendance.component.css',
})
export class AttendanceComponent {
  constructor(private reports: ReportsService) {}
  activeTab: 'students' | 'staff' | 'reports' = 'students';
  selectedGrade = 'Grade 1';
  selectedDate = this.today;

  gradeOptions = ['Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5'];

  students: StudentAttendance[] = [
    { name: 'Alice Johnson', admissionNumber: 'S001', grade: 'Grade 1', status: 'Present' },
    { name: 'Brian Mwangi', admissionNumber: 'S002', grade: 'Grade 1', status: 'Present' },
    { name: 'Chloe Kimani', admissionNumber: 'S003', grade: 'Grade 2', status: 'Present' },
    { name: 'David Omondi', admissionNumber: 'S004', grade: 'Grade 2', status: 'Present' },
    { name: 'Esther Wanjiru', admissionNumber: 'S005', grade: 'Grade 3', status: 'Present' },
    { name: 'Felix Njoroge', admissionNumber: 'S006', grade: 'Grade 3', status: 'Present' },
    { name: 'Grace Achieng', admissionNumber: 'S007', grade: 'Grade 4', status: 'Present' },
    { name: 'Hassan Ali', admissionNumber: 'S008', grade: 'Grade 4', status: 'Present' },
    { name: 'Irene Ouma', admissionNumber: 'S009', grade: 'Grade 5', status: 'Present' },
    { name: 'James Otieno', admissionNumber: 'S010', grade: 'Grade 5', status: 'Present' },
  ];

  staffMembers: StaffAttendance[] = [
    { name: 'Mr. David Njoroge', role: 'Math Teacher', status: 'Present' },
    { name: 'Ms. Lydia Kamau', role: 'English Teacher', status: 'Present' },
    { name: 'Mrs. Sarah Wambui', role: 'Science Teacher', status: 'Present' },
    { name: 'Mr. Peter Maina', role: 'Principal', status: 'Present' },
    { name: 'Ms. Faith Mutua', role: 'Office Administrator', status: 'Present' },
  ];

  attendanceLogs: AttendanceRecord[] = [];

  get today(): string {
    return new Date().toISOString().split('T')[0];
  }

  get filteredStudents(): StudentAttendance[] {
    return this.students.filter((student) => student.grade === this.selectedGrade);
  }

  get studentPresentCount(): number {
    return this.filteredStudents.filter((student) => student.status === 'Present').length;
  }

  get studentAbsentCount(): number {
    return this.filteredStudents.filter((student) => student.status === 'Absent').length;
  }

  get staffPresentCount(): number {
    return this.staffMembers.filter((staff) => staff.status === 'Present').length;
  }

  get staffAbsentCount(): number {
    return this.staffMembers.filter((staff) => staff.status === 'Absent').length;
  }

  get overallAttendanceRate(): number {
    const total = this.studentPresentCount + this.studentAbsentCount + this.staffPresentCount + this.staffAbsentCount;
    return total === 0 ? 0 : Math.round(((this.studentPresentCount + this.staffPresentCount) / total) * 100);
  }

  setTab(tab: 'students' | 'staff' | 'reports'): void {
    this.activeTab = tab;
  }

  saveStudentAttendance(): void {
    if (this.filteredStudents.length === 0) {
      alert('No students found for the selected grade.');
      return;
    }

    this.saveAttendanceRecord({
      date: this.selectedDate,
      type: 'Student',
      group: this.selectedGrade,
      presentCount: this.studentPresentCount,
      absentCount: this.studentAbsentCount,
      details: `${this.filteredStudents.length} students recorded for ${this.selectedGrade}`,
    });
    this.reports.updateAttendance(this.attendanceLogs);
    alert('Student attendance recorded successfully.');
  }

  saveStaffAttendance(): void {
    this.saveAttendanceRecord({
      date: this.selectedDate,
      type: 'Staff',
      group: 'Staff Team',
      presentCount: this.staffPresentCount,
      absentCount: this.staffAbsentCount,
      details: `${this.staffMembers.length} staff attendance records saved.`,
    });
    this.reports.updateAttendance(this.attendanceLogs);
    
    alert('Staff attendance recorded successfully.');
  }

  private saveAttendanceRecord(record: AttendanceRecord): void {
    this.attendanceLogs.unshift(record);
    if (this.attendanceLogs.length > 10) {
      this.attendanceLogs.pop();
    }
    
  }
}
