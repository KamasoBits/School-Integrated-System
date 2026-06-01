import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface TimetableRow {
  period: number;
  time: string;
  lessons: string[];
}

@Component({
  standalone: true,
  selector: 'app-timetable',
  imports: [CommonModule],
  templateUrl: './timetable.component.html',
  styleUrl: './timetable.component.css',
})
export class TimetableComponent {
  grades = Array.from({ length: 12 }, (_, index) => index + 1);
  weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  selectedGrade: number | null = null;
  timetableRows: TimetableRow[] = [];

  timeSlots = [
    '08:00 - 08:40',
    '08:45 - 09:25',
    '09:30 - 10:10',
    '10:15 - 10:55',
    '11:15 - 11:55',
    '12:00 - 12:40',
    '13:20 - 14:00',
    '14:50 - 15:30',
  ];

  gradeSubjects: Record<number, string[]> = {
    1: ['English', 'Mathematics', 'Science', 'Kiswahili', 'Social Studies', 'Creative Arts', 'Physical Education', 'Music'],
    2: ['English', 'Mathematics', 'Science', 'Kiswahili', 'Social Studies', 'Creative Arts', 'Physical Education', 'Computer Studies'],
    3: ['English', 'Mathematics', 'Science', 'Kiswahili', 'Social Studies', 'ICT', 'Creative Arts', 'Physical Education'],
    4: ['English', 'Mathematics', 'Science', 'Kiswahili', 'Social Studies', 'Agriculture', 'ICT', 'Creative Arts'],
    5: ['English', 'Mathematics', 'Science', 'Kiswahili', 'Social Studies', 'History', 'Geography', 'ICT'],
    6: ['English', 'Mathematics', 'Science', 'Kiswahili', 'Social Studies', 'History', 'Geography', 'Business Studies'],
    7: ['English', 'Mathematics', 'Biology', 'Chemistry', 'Physics', 'History', 'Geography', 'CRE'],
    8: ['English', 'Mathematics', 'Biology', 'Chemistry', 'Physics', 'History', 'Geography', 'Business Studies'],
    9: ['English', 'Mathematics', 'Biology', 'Chemistry', 'Physics', 'Geography', 'History', 'Computer Studies'],
    10: ['English', 'Mathematics', 'Biology', 'Chemistry', 'Physics', 'Computer Studies', 'Business', 'CRE'],
    11: ['English', 'Mathematics', 'Biology', 'Chemistry', 'Physics', 'Computer Studies', 'Business', 'Agriculture'],
    12: ['English', 'Mathematics', 'Biology', 'Chemistry', 'Physics', 'Computer Studies', 'Accounting', 'Entrepreneurship'],
  };

  selectGrade(grade: number): void {
    this.selectedGrade = grade;
    this.generateTimetable();
  }

  get selectedSubjects(): string[] {
    if (!this.selectedGrade) {
      return [];
    }
    return this.gradeSubjects[this.selectedGrade] || [];
  }

  getGradeTitle(grade: number): string {
    return `Grade ${grade} class timetable`;
  }

  trackByIndex(index: number): number {
    return index;
  }

  private generateTimetable(): void {
    if (!this.selectedGrade) {
      this.timetableRows = [];
      return;
    }

    const subjects = this.selectedSubjects;
    this.timetableRows = this.timeSlots.map((slot, rowIndex) => ({
      period: rowIndex + 1,
      time: slot,
      lessons: this.weekDays.map((_, dayIndex) => subjects[(rowIndex + dayIndex) % subjects.length]),
    }));
  }
}
