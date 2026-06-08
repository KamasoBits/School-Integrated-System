import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReportsService } from '../../Services/reports.service';

interface FeeStructure {
  grade: string;
  amount: number;
}

interface StudentPayment {
  studentId: string;
  studentName: string;
  grade: string;
  feeAmount: number;
  amountPaid: number;
  outstanding: number;
}

interface FinancialRecord {
  date: string;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
}

@Component({
  selector: 'app-finance',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './finance.component.html',
  styleUrl: './finance.component.css',
})
export class FinanceComponent implements OnInit {
  schoolBalance = 250000;
  totalExpenditure = 150000;
  totalIncome = 400000;

  feeStructures: FeeStructure[] = [
    { grade: '1', amount: 15000 },
    { grade: '2', amount: 15000 },
    { grade: '3', amount: 18000 },
    { grade: '4', amount: 18000 },
    { grade: '5', amount: 20000 },
    { grade: '6', amount: 20000 },
    { grade: '7', amount: 25000 },
    { grade: '8', amount: 25000 },
    { grade: '9', amount: 30000 },
    { grade: '10', amount: 30000 },
  ];

  studentPayments: StudentPayment[] = [
    { studentId: 'S001', studentName: 'Alice Kamau', grade: '1', feeAmount: 15000, amountPaid: 15000, outstanding: 0 },
    { studentId: 'S002', studentName: 'Brian Otieno', grade: '2', feeAmount: 15000, amountPaid: 10000, outstanding: 5000 },
    { studentId: 'S003', studentName: 'Chloe Kimani', grade: '2', feeAmount: 15000, amountPaid: 15000, outstanding: 0 },
    { studentId: 'S004', studentName: 'David Omondi', grade: '3', feeAmount: 18000, amountPaid: 18000, outstanding: 0 },
    { studentId: 'S005', studentName: 'Esther Wanjiru', grade: '3', feeAmount: 18000, amountPaid: 9000, outstanding: 9000 },
    { studentId: 'S006', studentName: 'Felix Njoroge', grade: '4', feeAmount: 18000, amountPaid: 18000, outstanding: 0 },
  ];

  financialRecords: FinancialRecord[] = [
    { date: '2024-06-01', description: 'Student Fees - June', amount: 95000, type: 'income', category: 'Tuition' },
    { date: '2024-06-02', description: 'Staff Salaries', amount: 80000, type: 'expense', category: 'Payroll' },
    { date: '2024-06-03', description: 'School Supplies', amount: 12000, type: 'expense', category: 'Operations' },
    { date: '2024-06-04', description: 'Electricity & Water', amount: 8000, type: 'expense', category: 'Utilities' },
    { date: '2024-06-05', description: 'Student Fees - Additional', amount: 45000, type: 'income', category: 'Tuition' },
  ];

  activeTab: 'overview' | 'feeStructure' | 'payments' | 'records' | 'reports' = 'overview';
  selectedGradeFilter = '';
  newExpense = '';
  newExpenseAmount = '';
  newExpenseCategory = 'Operations';
  receiptStudent = '';
  receiptAmount = '';

  constructor(private reports: ReportsService) {}

  ngOnInit(): void {
    // Initialize with any data from reports service if available
    this.reports.financials.subscribe((f) => {
      this.financialRecords = [...f, ...this.financialRecords].slice(0, 50);
    });
  }

  setTab(tab: 'overview' | 'feeStructure' | 'payments' | 'records' | 'reports') {
    this.activeTab = tab;
    this.selectedGradeFilter = '';
  }

  get filteredPayments(): StudentPayment[] {
    if (!this.selectedGradeFilter) return this.studentPayments;
    return this.studentPayments.filter((p) => p.grade === this.selectedGradeFilter);
  }

  get totalFeesExpected(): number {
    return this.studentPayments.reduce((sum, p) => sum + p.feeAmount, 0);
  }

  get totalFeesPaid(): number {
    return this.studentPayments.reduce((sum, p) => sum + p.amountPaid, 0);
  }

  get totalOutstanding(): number {
    return this.studentPayments.reduce((sum, p) => sum + p.outstanding, 0);
  }

  get incomeTotal(): number {
    return this.financialRecords.filter((r) => r.type === 'income').reduce((sum, r) => sum + r.amount, 0);
  }

  get expenseTotal(): number {
    return this.financialRecords.filter((r) => r.type === 'expense').reduce((sum, r) => sum + r.amount, 0);
  }

  recordPayment() {
    if (!this.receiptStudent || !this.receiptAmount) {
      alert('Please select a student and enter amount.');
      return;
    }

    const payment = this.studentPayments.find((p) => p.studentId === this.receiptStudent);
    if (!payment) return;

    const amount = Number(this.receiptAmount);
    payment.amountPaid += amount;
    payment.outstanding = Math.max(0, payment.outstanding - amount);

    this.financialRecords.unshift({
      date: new Date().toISOString().slice(0, 10),
      description: `Payment from ${payment.studentName}`,
      amount: amount,
      type: 'income',
      category: 'Tuition',
    });

    this.schoolBalance += amount;
    this.totalIncome += amount;
    alert(`Receipt generated for ${payment.studentName} - Amount: KES ${amount}`);
    this.receiptStudent = '';
    this.receiptAmount = '';
  }

  recordExpense() {
    if (!this.newExpense || !this.newExpenseAmount) {
      alert('Please enter expense details.');
      return;
    }

    const amount = Number(this.newExpenseAmount);
    this.financialRecords.unshift({
      date: new Date().toISOString().slice(0, 10),
      description: this.newExpense,
      amount: amount,
      type: 'expense',
      category: this.newExpenseCategory,
    });

    this.schoolBalance -= amount;
    this.totalExpenditure += amount;
    alert(`Expense recorded: ${this.newExpense}`);
    this.newExpense = '';
    this.newExpenseAmount = '';
    this.newExpenseCategory = 'Operations';
  }

  downloadFinancialReport() {
    let content = `School Financial Report\n`;
    content += `Generated: ${new Date().toLocaleDateString()}\n\n`;
    content += `BALANCE SUMMARY\n`;
    content += `Current School Balance: KES ${this.schoolBalance}\n`;
    content += `Total Income: KES ${this.totalIncome}\n`;
    content += `Total Expenditure: KES ${this.totalExpenditure}\n\n`;
    content += `FEE COLLECTION\n`;
    content += `Total Expected: KES ${this.totalFeesExpected}\n`;
    content += `Total Paid: KES ${this.totalFeesPaid}\n`;
    content += `Outstanding: KES ${this.totalOutstanding}\n\n`;
    content += `RECENT TRANSACTIONS\n`;
    for (const r of this.financialRecords.slice(0, 20)) {
      content += `${r.date} - ${r.description} (${r.type}): KES ${r.amount}\n`;
    }

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `financial-report-${new Date().toISOString().slice(0, 10)}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }
}
