import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReportsService } from '../../Services/reports.service';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css',
})
export class ReportsComponent implements OnInit {
  studentCount = 0;
  recentAttendance: any[] = [];
  performanceSummary: any[] = [];
  financials: any[] = [];
  allStudents: any[] = [];
  grades: string[] = [];
  selectedStudentId = '';
  selectedGrade = '';

  constructor(private reports: ReportsService) {}

  ngOnInit(): void {
    this.reports.students.subscribe((s) => {
      this.studentCount = s.length;
      this.allStudents = s || [];
      this.grades = Array.from(new Set((s || []).map((st: any) => st.grade))).sort((a: any, b: any) => Number(a) - Number(b));
    });
    this.reports.attendance.subscribe((a) => (this.recentAttendance = a.slice(0, 10)));
    this.reports.results.subscribe(() => (this.performanceSummary = this.reports.getStudentPerformanceSummary()));
    this.reports.financials.subscribe((f) => (this.financials = f.slice(0, 20)));
  }

  downloadReport(kind: 'students' | 'attendance' | 'performance' | 'financial') {
    let content = '';
    if (kind === 'students') {
      content = `Student count: ${this.studentCount}`;
    } else if (kind === 'attendance') {
      content = JSON.stringify(this.recentAttendance, null, 2);
    } else if (kind === 'performance') {
      content = JSON.stringify(this.performanceSummary, null, 2);
    } else if (kind === 'financial') {
      content = JSON.stringify(this.financials, null, 2);
    }
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `report-${kind}-${new Date().toISOString().slice(0,10)}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }

  downloadIndividualReport(studentId: string) {
    const student = this.reports.getStudentByIdOrAdmission(studentId) || this.allStudents.find((s) => s.id === studentId || s.admissionNumber === studentId);
    if (!student) {
      alert('Student not found');
      return;
    }

    const results = this.reports.getResultsByStudentId(studentId);
    let content = `Student Report - ${student.firstName || ''} ${student.lastName || ''}\n`;
    content += `Admission: ${student.admissionNumber || student.id || ''}\nGrade: ${student.grade || ''}\nStream: ${student.stream || ''}\nEnrollment: ${student.enrollmentDate || ''}\n\n`;
    content += 'Results:\n';
    if (!results.length) content += 'No results found\n';
    for (const r of results) {
      content += `Grade ${r.grade} - ${Object.entries(r.results).map(([k, v]) => `${k}: ${v}`).join(', ')}\n`;
    }

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `student-report-${student.admissionNumber || student.id || 'student'}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }

  downloadGradeReport(grade: string) {
    if (!grade) {
      alert('Select a grade first');
      return;
    }
    const gradeSummary = this.reports.getGradePerformanceSummary(grade);
    const students = this.reports.getStudentsByGrade(grade);
    let content = `Grade ${grade} Performance Summary\nAverage: ${gradeSummary.average}%\nCount: ${gradeSummary.count}\n\nStudents in grade (${students.length}):\n`;
    for (const s of students) {
      const sid = (s as any).admissionNumber || (s as any).id || '';
      content += `${sid} - ${s.firstName} ${s.lastName}\n`;
    }

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `grade-report-${grade}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }
}
