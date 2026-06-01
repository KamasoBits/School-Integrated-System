import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Student {
  id: string;
  firstName: string;
  lastName: string;
  grade: string;
}

interface StudentResult {
  studentId: string;
  grade: string;
  results: Record<string, number>;
}

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './results.component.html',
  styleUrl: './results.component.css',
})
export class ResultsComponent {
  grades = Array.from({ length: 12 }, (_, index) => index + 1);
  selectedGrade: number | null = null;
  selectedStudent: string = '';
  studentResults: StudentResult[] = [];
  currentResults: Record<string, number> = {};

  // Edit modal state
  isEditModalOpen: boolean = false;
  editingIndex: number | null = null;
  editingResults: Record<string, number> = {};
  editingResultData: StudentResult | null = null;

  // Sample students data - in production, this would come from a service
  students: Student[] = [
    { id: 'S001', firstName: 'John', lastName: 'Doe', grade: '1' },
    { id: 'S002', firstName: 'Jane', lastName: 'Smith', grade: '1' },
    { id: 'S003', firstName: 'Mike', lastName: 'Johnson', grade: '2' },
    { id: 'S004', firstName: 'Sarah', lastName: 'Williams', grade: '2' },
    { id: 'S005', firstName: 'Alex', lastName: 'Brown', grade: '3' },
    { id: 'S006', firstName: 'Emma', lastName: 'Davis', grade: '3' },
    { id: 'S007', firstName: 'Oliver', lastName: 'Martinez', grade: '4' },
    { id: 'S008', firstName: 'Sophia', lastName: 'Garcia', grade: '4' },
    { id: 'S009', firstName: 'Liam', lastName: 'Rodriguez', grade: '5' },
    { id: 'S010', firstName: 'Ava', lastName: 'Wilson', grade: '5' },
    { id: 'S011', firstName: 'Noah', lastName: 'Moore', grade: '6' },
    { id: 'S012', firstName: 'Isabella', lastName: 'Taylor', grade: '6' },
    { id: 'S013', firstName: 'Elijah', lastName: 'Anderson', grade: '7' },
    { id: 'S014', firstName: 'Mia', lastName: 'Thomas', grade: '7' },
    { id: 'S015', firstName: 'Benjamin', lastName: 'Jackson', grade: '8' },
    { id: 'S016', firstName: 'Charlotte', lastName: 'White', grade: '8' },
    { id: 'S017', firstName: 'Lucas', lastName: 'Harris', grade: '9' },
    { id: 'S018', firstName: 'Amelia', lastName: 'Martin', grade: '9' },
    { id: 'S019', firstName: 'Mason', lastName: 'Thompson', grade: '10' },
    { id: 'S020', firstName: 'Harper', lastName: 'Garcia', grade: '10' },
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
    this.selectedStudent = '';
    this.currentResults = {};
  }

  get studentsInSelectedGrade(): Student[] {
    if (!this.selectedGrade) return [];
    return this.students.filter(s => s.grade === this.selectedGrade!.toString());
  }

  get selectedSubjects(): string[] {
    if (!this.selectedGrade) return [];
    return this.gradeSubjects[this.selectedGrade] || [];
  }

  get selectedStudentData(): Student | undefined {
    if (!this.selectedStudent) return undefined;
    return this.students.find(s => s.id === this.selectedStudent);
  }

  onStudentChange(): void {
    this.currentResults = {};
    this.selectedSubjects.forEach(subject => {
      this.currentResults[subject] = 0;
    });
  }

  submitResults(): void {
    if (!this.selectedGrade || !this.selectedStudent) {
      alert('Please select both a grade and a student.');
      return;
    }

    // Check if any marks are entered
    const hasMarks = Object.values(this.currentResults).some(mark => mark > 0);
    if (!hasMarks) {
      alert('Please enter at least one mark before submitting.');
      return;
    }

    const result: StudentResult = {
      studentId: this.selectedStudent,
      grade: this.selectedGrade.toString(),
      results: { ...this.currentResults },
    };

    this.studentResults.push(result);
    alert(`Results saved successfully for ${this.selectedStudentData?.firstName} ${this.selectedStudentData?.lastName}`);
    this.selectedStudent = '';
    this.currentResults = {};
  }

  deleteResult(index: number): void {
    this.studentResults.splice(index, 1);
  }

  openEditModal(index: number): void {
    this.editingIndex = index;
    this.editingResultData = this.studentResults[index];
    this.editingResults = { ...this.editingResultData.results };
    this.isEditModalOpen = true;
  }

  closeEditModal(): void {
    this.isEditModalOpen = false;
    this.editingIndex = null;
    this.editingResults = {};
    this.editingResultData = null;
  }

  saveEditedResults(): void {
    if (this.editingIndex !== null && this.editingIndex >= 0) {
      this.studentResults[this.editingIndex].results = { ...this.editingResults };
      alert(`Results updated successfully for ${this.getStudentName(this.studentResults[this.editingIndex].studentId)}`);
      this.closeEditModal();
    }
  }

  printResults(index: number): void {
    const result = this.studentResults[index];
    const student = this.students.find(s => s.id === result.studentId);
    
    if (!student) return;

    const subjectsForGrade = this.gradeSubjects[parseInt(result.grade)] || [];
    let printContent = `
      <html>
        <head>
          <title>Student Results - ${student.firstName} ${student.lastName}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .header { text-align: center; margin-bottom: 30px; }
            .student-info { margin-bottom: 20px; border-bottom: 2px solid #333; padding-bottom: 10px; }
            .student-info p { margin: 5px 0; font-size: 14px; }
            .marks-table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            .marks-table th, .marks-table td { border: 1px solid #ddd; padding: 12px; text-align: left; }
            .marks-table th { background-color: #f0f0f0; font-weight: bold; }
            .marks-table tr:nth-child(even) { background-color: #f9f9f9; }
            .total-section { margin-top: 20px; font-weight: bold; padding-top: 10px; border-top: 2px solid #333; }
            .footer { margin-top: 40px; text-align: center; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Student Results Report</h1>
          </div>
          <div class="student-info">
            <p><strong>Student Name:</strong> ${student.firstName} ${student.lastName}</p>
            <p><strong>Student ID:</strong> ${student.id}</p>
            <p><strong>Grade:</strong> ${result.grade}</p>
            <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
          </div>
          <table class="marks-table">
            <thead>
              <tr>
                <th>Subject</th>
                <th>Marks Obtained</th>
                <th>Out of</th>
              </tr>
            </thead>
            <tbody>
              ${subjectsForGrade.map(subject => `
                <tr>
                  <td>${subject}</td>
                  <td>${result.results[subject] || 0}</td>
                  <td>100</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
          <div class="total-section">
            <p>Total Marks: ${Object.values(result.results).reduce((a, b) => a + b, 0)} out of ${subjectsForGrade.length * 100}</p>
            <p>Average: ${(Object.values(result.results).reduce((a, b) => a + b, 0) / subjectsForGrade.length).toFixed(2)}%</p>
          </div>
          <div class="footer">
            <p>This is an official school document. Printed on ${new Date().toLocaleString()}</p>
          </div>
        </body>
      </html>
    `;

    const printWindow = window.open('', '', 'height=600,width=800');
    if (printWindow) {
      printWindow.document.write(printContent);
      printWindow.document.close();
      printWindow.focus();
      setTimeout(() => printWindow.print(), 250);
    }
  }

  getGradeSubjectsForResult(grade: string): string[] {
    return this.gradeSubjects[parseInt(grade)] || [];
  }

  getStudentName(studentId: string): string {
    const student = this.students.find(s => s.id === studentId);
    return student ? `${student.firstName} ${student.lastName}` : 'Unknown';
  }
}
