import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Student {
  firstName: string;
  middleName: string;
  lastName: string;
  gender: string;
  grade: string;
  admissionNumber: string;
  dateOfBirth: string;
}

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './students.component.html',
  styleUrl: './students.component.css',
})
export class StudentsComponent {
  activeSection: 'create' | 'delete' | null = null;
  gradeTabs: string[] = ['1','2','3','4','5','6','7','8','9','10'];
  selectedGradeTab: string = '1';
  firstName: string = '';
  middleName: string = '';
  lastName: string = '';
  gender: string = '';
  grade: string = '1';
  admissionNumber: string = '';
  dateOfBirth: string = '';
  gradeToDelete: string = '';

  students: Student[] = [];

  get grades(): string[] {
    const uniqueGrades = Array.from(new Set(this.students.map((student) => student.grade)));
    return uniqueGrades.sort((a, b) => Number(a) - Number(b));
  }

  get filteredStudents(): Student[] {
    return this.students.filter((student) => student.grade === this.selectedGradeTab);
  }

  selectSection(section: 'create' | 'delete') {
    this.activeSection = section;
  }

  selectGradeTab(grade: string) {
    this.selectedGradeTab = grade;
  }

  addStudent() {
    const newStudent: Student = {
      firstName: this.firstName.trim(),
      middleName: this.middleName.trim(),
      lastName: this.lastName.trim(),
      gender: this.gender,
      grade: this.grade.trim(),
      admissionNumber: this.admissionNumber.trim(),
      dateOfBirth: this.dateOfBirth,
    };

    if (!newStudent.firstName || !newStudent.lastName || !newStudent.gender || !newStudent.grade || !newStudent.admissionNumber || !newStudent.dateOfBirth) {
      alert('Please fill all required student fields before creating a student.');
      return;
    }

    this.students.push(newStudent);
    this.resetForm();
    this.activeSection = 'create';
  }

  resetForm() {
    this.firstName = '';
    this.middleName = '';
    this.lastName = '';
    this.gender = '';
    this.grade = '';
    this.admissionNumber = '';
    this.dateOfBirth = '';
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
  }
}
