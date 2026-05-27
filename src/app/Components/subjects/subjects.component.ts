import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface SubjectStage {
  title: string;
  description: string;
  coreSubjects: string[];
  optionalSubjects?: string[];
  note?: string;
}

interface SeniorPathway {
  name: string;
  focus: string;
  subjects: string[];
}

@Component({
  selector: 'app-subjects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './subjects.component.html',
  styleUrl: './subjects.component.css',
})
export class SubjectsComponent {
  stages: SubjectStage[] = [
    {
      title: 'Pre-Primary (PP1–PP2)',
      description: 'Pre-Primary is organized around seven integrated learning areas that foster early literacy, numeracy, environmental awareness, psychomotor growth, creativity, and character formation.',
      coreSubjects: [
        'Language Activities',
        'Mathematical Activities',
        'Environmental Activities',
        'Psychomotor and Creative Activities',
        'Religious Education Activities',
        'Pastoral/Religious Instruction',
      ],
    },
    {
      title: 'Lower Primary (Grades 1–3)',
      description: 'Lower Primary builds a strong foundation across language, numeracy, environmental awareness, health, and creativity while encouraging a balanced, learner-centered curriculum.',
      coreSubjects: [
        'Literacy',
        'English Language Activities',
        'Kiswahili Language Activities or Kenya Sign Language',
        'Indigenous Language Activities',
        'Mathematical Activities',
        'Environmental Activities',
        'Hygiene and Nutrition Activities',
        'Religious Education Activities',
        'Movement and Creative Activities',
      ],
    },
    {
      title: 'Upper Primary (Grades 4–6)',
      description: 'Upper Primary broadens learners’ skills through a more formal subject structure while retaining creativity, practical learning, and language development.',
      coreSubjects: [
        'English',
        'Kiswahili or Kenya Sign Language',
        'Mathematics',
        'Science and Technology',
        'Agriculture',
        'Home Science',
        'Social Studies',
        'Creative Arts',
        'Physical and Health Education',
        'Religious Education',
      ],
      optionalSubjects: ['Arabic', 'French', 'German', 'Mandarin'],
      note: 'Learners may select one foreign language as an optional subject.',
    },
    {
      title: 'Junior Secondary (Grades 7–9)',
      description: 'Junior Secondary expands subject breadth to prepare learners for higher-order thinking, technical exposure, health literacy, and life skills.',
      coreSubjects: [
        'English',
        'Kiswahili or Kenya Sign Language',
        'Mathematics',
        'Integrated Science',
        'Health Education',
        'Pre-Technical and Pre-Career Education',
        'Social Studies',
        'Religious Education (CRE/IRE/HRE)',
        'Business Studies',
        'Agriculture and Nutrition',
        'Creative Arts and Sports',
        'Life Skills Education',
      ],
      optionalSubjects: [
        'Visual Arts',
        'Performing Arts',
        'Home Science',
        'Computer Science',
        'Foreign and Indigenous Languages',
      ],
      note: 'Optional subjects support learners who wish to deepen creative, technical, or language pathways.',
    },
  ];

  seniorSchoolRequired = [
    'English',
    'Kiswahili or Kenya Sign Language',
    'Community Service Learning',
    'Physical Education',
  ];

  seniorPathways: SeniorPathway[] = [
    {
      name: 'STEM Pathway',
      focus: 'Designed for learners with interests in science, engineering, technology, and practical problem solving.',
      subjects: [
        'Mathematics',
        'Biology',
        'Chemistry',
        'Physics',
        'Computer Studies',
        'Agriculture',
        'Engineering',
        'Technology (Aviation, Electrical Technology, etc.)',
      ],
    },
    {
      name: 'Social Sciences Pathway',
      focus: 'Focused on human systems, history, geography, languages, and business disciplines.',
      subjects: [
        'History',
        'Geography',
        'Languages (English, Kiswahili, Indigenous, Foreign)',
        'Business Studies',
      ],
    },
    {
      name: 'Arts and Sports Science Pathway',
      focus: 'A pathway for learners drawn to creative expression, performance, music, dance, and sports science.',
      subjects: [
        'Performing Arts',
        'Visual Arts',
        'Music',
        'Dance',
        'Sports Science',
        'Physical Education',
      ],
    },
  ];
}
