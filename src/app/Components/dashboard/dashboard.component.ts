import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

interface SchoolActivity {
  date: string;
  title: string;
  description: string;
  status: 'Planned' | 'Confirmed' | 'In Progress';
}

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  constructor(private router: Router) {}

  username: string = '';

  upcomingActivities: SchoolActivity[] = [
    {
      date: 'June 12, 2026',
      title: 'Term 2 Opening Assembly',
      description: 'Welcome assembly for the new school term with teacher introductions and term expectations.',
      status: 'Confirmed',
    },
    {
      date: 'July 05, 2026',
      title: 'Sports Day Preparation',
      description: 'Inter-class practice sessions for athletics, team sports, and performance trials.',
      status: 'Planned',
    },
    {
      date: 'July 28, 2026',
      title: 'Career Guidance Workshop',
      description: 'A session for junior secondary learners to explore career pathways and subject choices.',
      status: 'Planned',
    },
    {
      date: 'August 14, 2026',
      title: 'Community Service Learning Project',
      description: 'A community cleanup and outreach project designed to support service learning goals.',
      status: 'Planned',
    },
  ];

  statusClass(status: string): string {
    return status.toLowerCase().replace(/ /g, '-');
  }

  logout() {
    this.router.navigate(['/login']);
  }
}
