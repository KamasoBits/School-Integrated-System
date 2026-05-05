import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Teacher {
  firstName: string;
  lastName: string;
  subject: string;
  grade: string;
  employeeId: string;
  email: string;
}

@Component({
  selector: 'app-teachers',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './teachers.component.html',
  styleUrl: './teachers.component.css',
})
export class TeachersComponent {
  firstName: string = '';
  lastName: string = '';
  subject: string = '';
  grade: string = '1';
  employeeId: string = '';
  email: string = '';
  deleteId: string = '';

  teachers: Teacher[] = [];
  grades: string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

  addTeacher() {
    const teacher: Teacher = {
      firstName: this.firstName.trim(),
      lastName: this.lastName.trim(),
      subject: this.subject.trim(),
      grade: this.grade,
      employeeId: this.employeeId.trim(),
      email: this.email.trim(),
    };

    if (!teacher.firstName || !teacher.lastName || !teacher.subject || !teacher.grade || !teacher.employeeId || !teacher.email) {
      alert('Please fill all required teacher fields before adding.');
      return;
    }

    this.teachers.push(teacher);
    this.resetForm();
  }

  resetForm() {
    this.firstName = '';
    this.lastName = '';
    this.subject = '';
    this.grade = '1';
    this.employeeId = '';
    this.email = '';
  }

  deleteTeacher(index: number) {
    this.teachers.splice(index, 1);
  }

  deleteTeacherById() {
    if (!this.deleteId.trim()) {
      alert('Please enter a teacher ID to delete.');
      return;
    }

    const originalLength = this.teachers.length;
    this.teachers = this.teachers.filter((teacher) => teacher.employeeId !== this.deleteId.trim());
    const removed = originalLength - this.teachers.length;

    if (removed > 0) {
      alert(`Deleted ${removed} teacher(s) with ID ${this.deleteId.trim()}.`);
      this.deleteId = '';
    } else {
      alert(`No teacher found with ID ${this.deleteId.trim()}.`);
    }
  }
}
