import { Component, HostListener, OnInit, inject } from '@angular/core';
import { Project } from '../models/project.model';
import { TranslationService } from '../services/translation.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  translation = inject(TranslationService);

  projects: Project[] = [
    {
      title: 'Gestion intelligente de l\'éclairage',
      titleEn: 'Smart Lighting Management',
      description: 'Application web full-stack pour la gestion des équipements, des utilisateurs et des configurations d\'éclairage : API sécurisées (Spring Security, JWT, 2FA, rate limiting), conteneurisation Docker et pipelines CI/CD de déploiement automatisé.',
      descriptionEn: 'Full-stack web application for managing equipment, users, and lighting configurations: secured APIs (Spring Security, JWT, 2FA, rate limiting), Docker containerization, and automated CI/CD deployment pipelines.',
      image: 'assets/images/Bouygues_img2.jpg',
      tech: ['Spring Boot', 'Angular 21', 'MongoDB', 'Docker', 'Spring Security'],
      period: 'Bouygues E&S — Novembre 2025 - Présent',
      periodEn: 'Bouygues E&S — November 2025 - Present'
    },
    {
      title: 'Supervision LoRaWAN & calendriers d\'éclairage',
      titleEn: 'LoRaWAN Supervision & Lighting Schedules',
      description: 'Microservices Spring Boot pour la gestion des trames Uplink/Downlink LoRa via un LNS avec Apache Kafka, bibliothèque Java d\'encodage/décodage LoRaWAN, persistance temps réel dans InfluxDB et supervision des calendriers d\'éclairage pour nœuds Zhaga.',
      descriptionEn: 'Spring Boot microservices for handling LoRa Uplink/Downlink frames via an LNS with Apache Kafka, a Java library for LoRaWAN encoding/decoding, real-time persistence in InfluxDB, and lighting schedule supervision for Zhaga nodes.',
      image: 'assets/images/Bouygues_img2.jpg',
      tech: ['Spring Boot', 'Apache Kafka', 'InfluxDB', 'MongoDB', 'Java'],
      period: 'Bouygues E&S — Avril 2025 - Novembre 2025',
      periodEn: 'Bouygues E&S — April 2025 - November 2025'
    },
    {
      title: 'Migration Atlas — AngularJS vers Angular 15',
      titleEn: 'Atlas Migration — AngularJS to Angular 15',
      description: 'Migration du Front Office de l\'application Atlas d\'AngularJS 1.1 vers Angular 15 : architecture modulaire, design entièrement responsive, mode clair/sombre et internationalisation (i18n) FR/EN.',
      descriptionEn: 'Migration of the Atlas application\'s Front Office from AngularJS 1.1 to Angular 15: modular architecture, fully responsive design, light/dark mode, and FR/EN internationalization (i18n).',
      image: 'assets/images/amundi_imgg.jpg',
      tech: ['Angular 15', 'TypeScript', 'i18n'],
      period: 'Amundi — Août 2024 - Janvier 2025',
      periodEn: 'Amundi — August 2024 - January 2025'
    },
    {
      title: 'Suivi d\'entraînement sportif assisté par IA',
      titleEn: 'AI-Assisted Fitness Tracking',
      description: 'Projet personnel : application de suivi d\'entraînement sportif intégrant des recommandations générées par IA pour proposer des plans d\'entraînement adaptatifs.',
      descriptionEn: 'Personal project: a fitness tracking application integrating AI-generated recommendations to suggest adaptive training plans.',
      image: 'assets/images/python.webp',
      tech: ['IA générative', 'API IA (OpenAI/Claude)'],
      techEn: ['Generative AI', 'AI API (OpenAI/Claude)'],
      period: 'Projet personnel',
      periodEn: 'Personal project'
    },
    {
      title: 'Projet (React)',
      titleEn: 'Project (React)',
      description: 'réalisation d’une application web de gestion d’une bibliothèque.',
      descriptionEn: 'development of a web application for managing a library.',
      image: 'assets/images/reactPic.png'
    },
    {
      title: 'Projet (Angular)',
      titleEn: 'Project (Angular)',
      description: 'développement d’une application web de gestion des tâches.',
      descriptionEn: 'development of a web application for task management.',
      image: 'assets/images/angularPic.png'
    },
    {
      title: 'Projet (Angular)',
      titleEn: 'Project (Angular)',
      description: 'application web pour la gestion des demandes administratif pour les employés d\'ALSTOM.',
      descriptionEn: 'web application for managing administrative requests for ALSTOM employees.',
      image: 'assets/images/angularPic.png'
    },
    {
      title: 'Projet (.Net Core)',
      titleEn: 'Project (.NET Core)',
      description: ' application web qui permet la gestion d’un établissement.',
      descriptionEn: 'web application for managing an establishment.',
      image: 'assets/images/CSharpLogo.png'
    },
    {
      title: 'Projet (ASP.Net MVC)',
      titleEn: 'Project (ASP.NET MVC)',
      description: 'application web qui permet la gestion des films.',
      descriptionEn: 'web application for managing movies.',
      image: 'assets/images/CSharpLogo.png'
    },
    {
      title: 'Projet POO en (C#)',
      titleEn: 'OOP Project in (C#)',
      description: 'projet POO permettant de réaliser un système de gestion de base de données relationnelle (SGBD).',
      descriptionEn: 'OOP project implementing a relational database management system (RDBMS).',
      image: 'assets/images/CSharpLogo.png'
    },
    {
      title: 'Project (c++) et (c#)',
      titleEn: 'Project (C++) and (C#)',
      description: 'projet Jeu d’échec avec (C++) et avec (C#/Unity).',
      descriptionEn: 'chess game project built with (C++) and with (C#/Unity).',
      image: 'assets/images/CSharpLogo.png'
    },
    {
      title: 'Projet (Flutter)',
      titleEn: 'Project (Flutter)',
      description: 'réalisation d’une application mobile e-commerce (Amazon App clone).',
      descriptionEn: 'development of an e-commerce mobile application (Amazon App clone).',
      image: 'assets/images/flutterPic.png'
    },
    {
      title: 'Projet (Spring Boot)',
      titleEn: 'Project (Spring Boot)',
      description: 'application de la gestion d’établissment.',
      descriptionEn: 'establishment management application.',
      image: 'assets/images/springPic1.png'
    },
  ];

  isScrollButtonVisible = false;
  isVisible: boolean = false;

  isModalOpen = false;
  selectedProject: Project | null = null;

  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      this.isVisible = true;
    }, 100);
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.isScrollButtonVisible = window.pageYOffset > 100;
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  openDetails(project: Project): void {
    this.selectedProject = project;
    this.isModalOpen = true;
  }

  closeDetails(): void {
    this.isModalOpen = false;
  }
}
