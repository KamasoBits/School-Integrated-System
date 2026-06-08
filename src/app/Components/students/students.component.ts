import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReportsService } from '../../Services/reports.service';

interface AcademicHistory {
  year: string;
  term: string;
  remarks: string;
  averageScore: string;
}

interface Student {
  firstName: string;
  middleName: string;
  lastName: string;
  gender: string;
  grade: string;
  stream: string;
  admissionNumber: string;
  dateOfBirth: string;
  enrollmentDate: string;
  academicHistory: AcademicHistory[];
}

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './students.component.html',
  styleUrl: './students.component.css',
})
export class StudentsComponent {
  constructor(private reports: ReportsService) {}
  activeSection: 'create' | 'delete' = 'create';
  gradeTabs: string[] = ['1','2','3','4','5','6','7','8','9','10'];
  streamOptions: string[] = ['A', 'B', 'C'];
  selectedGradeTab = '1';
  selectedStreamFilter = '';
  firstName = '';
  middleName = '';
  lastName = '';
  gender = '';
  grade = '1';
  stream = 'A';
  admissionNumber = '';
  dateOfBirth = '';
  enrollmentDate = this.today;
  gradeToDelete = '';
  selectedStudent: Student | null = null;
  editing = false;
  historyYear = this.todayYear;
  historyTerm = 'Term 1';
  historyRemarks = '';
  historyAverageScore = '';

  students: Student[] = [
    {
      firstName: 'Alice',
      middleName: 'Joy',
      lastName: 'Kamau',
      gender: 'Female',
      grade: '1',
      stream: 'A',
      admissionNumber: 'S001',
      dateOfBirth: '2015-05-01',
      enrollmentDate: '2024-01-10',
      academicHistory: [
        { year: '2024', term: 'Term 1', remarks: 'Strong attendance, excellent participation.', averageScore: '85%' },
        { year: '2024', term: 'Term 2', remarks: 'Improved literacy skills.', averageScore: '88%' },
      ],
    },
    {
      firstName: 'Brian',
      middleName: 'Mwangi',
      lastName: 'Otieno',
      gender: 'Male',
      grade: '2',
      stream: 'B',
      admissionNumber: 'S002',
      dateOfBirth: '2014-08-12',
      enrollmentDate: '2023-09-05',
      academicHistory: [
        { year: '2024', term: 'Term 1', remarks: 'Good performance in numeracy.', averageScore: '82%' },
      ],
    },
  ];

  get today(): string {
    return new Date().toISOString().split('T')[0];
  }

  get todayYear(): string {
    return new Date().getFullYear().toString();
  }

  get grades(): string[] {
    const uniqueGrades = Array.from(new Set(this.students.map((student) => student.grade)));
    return uniqueGrades.sort((a, b) => Number(a) - Number(b));
  }

  get filteredStudents(): Student[] {
    return this.students.filter((student) => {
      const gradeMatch = student.grade === this.selectedGradeTab;
      const streamMatch = this.selectedStreamFilter ? student.stream === this.selectedStreamFilter : true;
      return gradeMatch && streamMatch;
    });
  }

  selectSection(section: 'create' | 'delete') {
    this.activeSection = section;
    this.selectedStudent = null;
    this.editing = false;
    this.resetHistoryFields();
  }

  selectGradeTab(grade: string) {
    this.selectedGradeTab = grade;
    this.selectedStreamFilter = '';
  }

  selectStudent(student: Student) {
    this.selectedStudent = student;
    this.activeSection = 'create';
    this.editing = true;
    this.populateForm(student);
  }

  populateForm(student: Student) {
    this.firstName = student.firstName;
    this.middleName = student.middleName;
    this.lastName = student.lastName;
    this.gender = student.gender;
    this.grade = student.grade;
    this.stream = student.stream;
    this.admissionNumber = student.admissionNumber;
    this.dateOfBirth = student.dateOfBirth;
    this.enrollmentDate = student.enrollmentDate;
  }

  addStudent() {
    if (!this.firstName.trim() || !this.lastName.trim() || !this.gender || !this.grade || !this.stream || !this.admissionNumber.trim() || !this.dateOfBirth) {
      alert('Please fill all required student fields before saving.');
      return;
    }

    if (this.editing && this.selectedStudent) {
      Object.assign(this.selectedStudent, {
        firstName: this.firstName.trim(),
        middleName: this.middleName.trim(),
        lastName: this.lastName.trim(),
        gender: this.gender,
        grade: this.grade,
        stream: this.stream,
        admissionNumber: this.admissionNumber.trim(),
        dateOfBirth: this.dateOfBirth,
        enrollmentDate: this.enrollmentDate,
      });
      alert('Student profile updated successfully.');
      this.reports.updateStudents(this.students);
    } else {
      const newStudent: Student = {
        firstName: this.firstName.trim(),
        middleName: this.middleName.trim(),
        lastName: this.lastName.trim(),
        gender: this.gender,
        grade: this.grade,
        stream: this.stream,
        admissionNumber: this.admissionNumber.trim(),
        dateOfBirth: this.dateOfBirth,
        enrollmentDate: this.enrollmentDate,
        academicHistory: [],
      };
      this.students.push(newStudent);
      alert('Student registered and enrolled successfully.');
      this.reports.updateStudents(this.students);
    }

    this.resetForm();
    this.activeSection = 'create';
    this.editing = false;
    this.selectedStudent = null;
  }

  addAcademicHistory() {
    if (!this.selectedStudent) {
      return;
    }
    if (!this.historyYear || !this.historyTerm || !this.historyRemarks.trim() || !this.historyAverageScore.trim()) {
      alert('Please fill all academic history fields before adding.');
      return;
    }

    this.selectedStudent.academicHistory.unshift({
      year: this.historyYear,
      term: this.historyTerm,
      remarks: this.historyRemarks.trim(),
      averageScore: this.historyAverageScore.trim(),
    });
    this.resetHistoryFields();
    this.reports.updateStudents(this.students);
  }

  removeStudent(student: Student) {
    this.students = this.students.filter((current) => current !== student);
    if (this.selectedStudent === student) {
      this.selectedStudent = null;
      this.editing = false;
      this.resetForm();
    }
    this.reports.updateStudents(this.students);
  }

  resetForm() {
    this.firstName = '';
    this.middleName = '';
    this.lastName = '';
    this.gender = '';
    this.grade = this.selectedGradeTab;
    this.stream = 'A';
    this.admissionNumber = '';
    this.dateOfBirth = '';
    this.enrollmentDate = this.today;
  }

  resetHistoryFields() {
    this.historyYear = this.todayYear;
    this.historyTerm = 'Term 1';
    this.historyRemarks = '';
    this.historyAverageScore = '';
  }

  deleteByGrade() {
    if (!this.gradeToDelete) {
      alert('Please choose a grade to delete.');
      return;
    }

    const initialCount = this.students.length;
    this.students = this.students.filter((student) => student.grade !== this.gradeToDelete);
    const deletedCount = initialCount - this.students.length;
    alert(`${deletedCount} student(s) deleted from grade ${this.gradeToDelete}.`);
    this.gradeToDelete = '';
    if (this.selectedStudent && this.selectedStudent.grade === this.gradeToDelete) {
      this.selectedStudent = null;
      this.editing = false;
    }
    this.reports.updateStudents(this.students);
  }
}
