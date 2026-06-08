import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface RStudent {
  firstName: string;
  middleName?: string;
  lastName: string;
  gender?: string;
  grade: string;
  stream?: string;
  admissionNumber: string;
  dateOfBirth?: string;
  enrollmentDate?: string;
}

export interface RStudentResult {
  studentId: string;
  grade: string;
  results: Record<string, number>;
}

export interface RAttendanceRecord {
  date: string;
  type: 'Student' | 'Staff';
  group: string;
  presentCount: number;
  absentCount: number;
  details?: string;
}

@Injectable({ providedIn: 'root' })
export class ReportsService {
  private students$ = new BehaviorSubject<RStudent[]>([]);
  private results$ = new BehaviorSubject<RStudentResult[]>([]);
  private attendance$ = new BehaviorSubject<RAttendanceRecord[]>([]);
  private financials$ = new BehaviorSubject<any[]>([]);

  students = this.students$.asObservable();
  results = this.results$.asObservable();
  attendance = this.attendance$.asObservable();
  financials = this.financials$.asObservable();

  updateStudents(list: RStudent[]) {
    this.students$.next([...list]);
  }

  updateResults(list: RStudentResult[]) {
    this.results$.next([...list]);
  }

  updateAttendance(list: RAttendanceRecord[]) {
    this.attendance$.next([...list]);
  }

  addFinancialRecord(record: any) {
    const current = this.financials$.getValue();
    this.financials$.next([record, ...current]);
  }

  // Simple aggregations used by the reports component
  getStudentPerformanceSummary() {
    const results = this.results$.getValue();
    // aggregate average per grade
    const byGrade: Record<string, { total: number; count: number }> = {};
    for (const r of results) {
      const grades = Object.values(r.results).filter((v) => typeof v === 'number') as number[];
      const sum = grades.reduce((a, b) => a + b, 0);
      const avg = grades.length ? sum / grades.length : 0;
      if (!byGrade[r.grade]) byGrade[r.grade] = { total: 0, count: 0 };
      byGrade[r.grade].total += avg;
      byGrade[r.grade].count += 1;
    }
    const summary = Object.keys(byGrade).map((grade) => ({
      grade,
      average: Math.round(byGrade[grade].total / Math.max(1, byGrade[grade].count)),
    }));
    return summary;
  }

  getAttendanceSummary() {
    const logs = this.attendance$.getValue();
    const summaryByDate: Record<string, { present: number; absent: number }> = {};
    for (const l of logs) {
      if (!summaryByDate[l.date]) summaryByDate[l.date] = { present: 0, absent: 0 };
      summaryByDate[l.date].present += l.presentCount;
      summaryByDate[l.date].absent += l.absentCount;
    }
    return Object.keys(summaryByDate).map((date) => ({ date, ...summaryByDate[date] }));
  }

  // Per-student and per-grade helpers
  getStudentsList() {
    return this.students$.getValue();
  }

  getStudentByIdOrAdmission(idOrAdmission: string) {
    const list: any[] = this.students$.getValue();
    return list.find((s) => s.admissionNumber === idOrAdmission || (s.id && s.id === idOrAdmission));
  }

  getStudentsByGrade(grade: string) {
    return this.students$.getValue().filter((s) => s.grade === grade);
  }

  getResultsByStudentId(studentId: string) {
    return this.results$.getValue().filter((r) => r.studentId === studentId);
  }

  getGradePerformanceSummary(grade: string) {
    const results = this.results$.getValue().filter((r) => r.grade === grade);
    if (!results.length) return { grade, average: 0, count: 0 };
    const averages = results.map((r) => {
      const vals = Object.values(r.results).filter((v) => typeof v === 'number') as number[];
      const sum = vals.reduce((a, b) => a + b, 0);
      return vals.length ? sum / vals.length : 0;
    });
    const gradeAvg = Math.round(averages.reduce((a, b) => a + b, 0) / Math.max(1, averages.length));
    return { grade, average: gradeAvg, count: averages.length };
  }
}
