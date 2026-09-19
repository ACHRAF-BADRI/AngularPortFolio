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
      description: 'Vertex AI Coach : plateforme de coaching sportif propulsée par l\'IA, coach de musculation (programme, nutrition, compléments), coach de course à pied (journal d\'entraînement, plans adaptatifs) et compteur de pas GPS.',
      descriptionEn: 'Vertex AI Coach: an AI-powered fitness coaching platform, a gym coach (workout program, nutrition, supplements), a running coach (training log, adaptive training plans) and a GPS step counter.',
      details: [
        'Coach de musculation : programme hebdomadaire généré par IA (split d\'entraînement, nutrition, compléments) selon l\'objectif, le niveau et l\'équipement, avec une estimation du délai pour voir des résultats.',
        'Images des exercices (wger.de) avec visionneuse zoomable et lien vidéo YouTube par exercice ; remplacement d\'un exercice ou d\'un complément par une alternative suggérée par l\'IA.',
        'Sauvegarde des programmes sous un nom (3 emplacements par défaut, ajustables par un admin) et envoi d\'un programme à un autre utilisateur par e-mail, avec boîte de réception pour l\'accepter ou le refuser.',
        'Coach de course à pied : journal d\'entraînement (CRUD) avec calories et pas estimés, plans d\'entraînement adaptatifs générés par IA, tableau de bord du volume hebdomadaire et de l\'allure.',
        'Compteur de pas GPS : suivi en direct (démarrer, pause, reprendre, terminer) avec distance, pas et calories estimés, aperçu du parcours, historique des sessions et graphiques.',
        'Authentification JWT avec rôles utilisateur/admin, suspension de compte et édition du profil ; panneau d\'administration (gestion des utilisateurs, statistiques, vues par utilisateur).',
        'Interface français/anglais avec contenu généré par l\'IA traduit à la volée, responsive et mode sombre.',
        'Monorepo : API Flask déployée sur Render (Docker + gunicorn) et application React + TypeScript déployée sur Netlify, avec déploiement continu à chaque push GitHub.'
      ],
      detailsEn: [
        'Gym coach: AI-generated weekly program (workout split, nutrition, supplements) based on goal, level and equipment, with an estimate of the time needed to see results.',
        'Exercise images (wger.de) with a zoomable viewer and a YouTube video link per exercise; swap any exercise or supplement for an AI-suggested alternative.',
        'Save programs under a name (3 slots by default, adjustable by an admin) and send a program to another user by email, with an inbox to accept or decline it.',
        'Running coach: training log (CRUD) with derived calories and estimated steps, AI-generated adaptive training plans, and a dashboard with weekly volume and pace charts.',
        'GPS step counter: live tracking (start, pause, resume, finish) with distance, estimated steps and calories, a route preview, session history and charts.',
        'JWT authentication with user and admin roles, account suspension and profile editing; admin panel (user management, statistics, per-user views).',
        'French / English interface with AI-generated content translated on the fly, responsive layout and dark mode.',
        'Monorepo: Flask API deployed on Render (Docker + gunicorn) and React + TypeScript app deployed on Netlify, with continuous deployment on every GitHub push.'
      ],
      image: 'assets/images/python.webp',
      tech: ['Python (Flask)', 'React', 'TypeScript', 'Tailwind CSS', 'MongoDB Atlas', 'Groq API', 'JWT', 'Docker', 'Render', 'Netlify'],
      period: 'Projet personnel',
      periodEn: 'Personal project',
      link: 'https://vertex-coach.netlify.app',
      githubLink: 'https://github.com/ACHRAF-BADRI/Vertex-AI-Coach'
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
