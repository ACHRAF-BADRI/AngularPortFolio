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
        'Monorepo : API Flask déployée sur Render (Docker + gunicorn) et application React + TypeScript déployée sur Cloudflare Pages, avec déploiement continu à chaque push GitHub.'
      ],
      detailsEn: [
        'Gym coach: AI-generated weekly program (workout split, nutrition, supplements) based on goal, level and equipment, with an estimate of the time needed to see results.',
        'Exercise images (wger.de) with a zoomable viewer and a YouTube video link per exercise; swap any exercise or supplement for an AI-suggested alternative.',
        'Save programs under a name (3 slots by default, adjustable by an admin) and send a program to another user by email, with an inbox to accept or decline it.',
        'Running coach: training log (CRUD) with derived calories and estimated steps, AI-generated adaptive training plans, and a dashboard with weekly volume and pace charts.',
        'GPS step counter: live tracking (start, pause, resume, finish) with distance, estimated steps and calories, a route preview, session history and charts.',
        'JWT authentication with user and admin roles, account suspension and profile editing; admin panel (user management, statistics, per-user views).',
        'French / English interface with AI-generated content translated on the fly, responsive layout and dark mode.',
        'Monorepo: Flask API deployed on Render (Docker + gunicorn) and React + TypeScript app deployed on Cloudflare Pages, with continuous deployment on every GitHub push.'
      ],
      image: 'assets/images/python.webp',
      tech: ['Python (Flask)', 'React', 'TypeScript', 'Tailwind CSS', 'MongoDB Atlas', 'Groq API', 'JWT', 'Docker', 'Render', 'Cloudflare Pages'],
      period: 'Projet personnel',
      periodEn: 'Personal project',
      link: 'https://vertex-coach.pages.dev',
      githubLink: 'https://github.com/ACHRAF-BADRI/Vertex-AI-Coach'
    },
    {
      title: 'ScrumFlow — gestion de projets Scrum',
      titleEn: 'ScrumFlow — Scrum Project Management',
      description: 'Espace de travail pour les équipes Scrum : planification des sprints, backlog, tableau Kanban en glisser-déposer, burndown et vélocité, discussions sur chaque tâche et collaboration en temps réel.',
      descriptionEn: 'A workspace for Scrum teams: sprint planning, backlog, drag-and-drop board, burndown and velocity charts, discussions on each task and real-time collaboration.',
      details: [
        'Projets et équipe : invitations par e-mail, rôles (propriétaire / admin / membre) vérifiés par l\'API.',
        'Vue tableau groupée par sprint et backlog avec édition directe, et tableau Kanban du sprint actif en glisser-déposer avec limites WIP par colonne.',
        'Cycle de vie des sprints (planifier, démarrer, terminer), historique avec points engagés / livrés, vélocité moyenne et rétrospectives.',
        'Tableau de bord : burndown, burnup, flux cumulé, vélocité et charge de l\'équipe ; exports CSV et rapport de sprint en PDF.',
        'Daily standup minuté, planning poker en temps réel, calendrier, epics, dépendances entre tâches et workflow de statuts personnalisable.',
        'Détail des tâches : description Markdown, checklist, pièces jointes (Cloudinary), commentaires avec @mentions et historique ; intégration GitHub / GitLab par webhook.',
        'Temps réel avec Socket.io (modifications, présence, notifications), suggestions IA optionnelles (Groq / Gemini) et application installable (PWA).',
        'Connexion avec Google, Microsoft, GitHub, GitLab ou Bitbucket et vérification en deux étapes (TOTP) ; interface français / anglais, thème clair / sombre, responsive.',
        'Architecture : React + Vite sur Cloudflare Pages, API Node.js / Express sur Render, MongoDB Atlas ; tests (node:test, Vitest) et CI GitHub Actions.'
      ],
      detailsEn: [
        'Projects and team: email invitations, roles (owner / admin / member) checked by the API.',
        'Table view grouped by sprint and backlog with inline editing, and a drag-and-drop board of the active sprint with per-column WIP limits.',
        'Sprint lifecycle (plan, start, complete), history with committed / delivered points, average velocity and retrospectives.',
        'Dashboard: burndown, burnup, cumulative flow, velocity and team workload; CSV exports and a printable sprint report.',
        'Timed daily standup, real-time planning poker, calendar, epics, task dependencies and a customizable status workflow.',
        'Task details: Markdown description, checklist, attachments (Cloudinary), comments with @mentions and history; GitHub / GitLab integration via webhooks.',
        'Real time with Socket.io (changes, presence, notifications), optional AI suggestions (Groq / Gemini) and an installable app (PWA).',
        'Sign in with Google, Microsoft, GitHub, GitLab or Bitbucket and two-step verification (TOTP); French / English interface, light / dark theme, responsive.',
        'Architecture: React + Vite on Cloudflare Pages, Node.js / Express API on Render, MongoDB Atlas; tests (node:test, Vitest) and GitHub Actions CI.'
      ],
      image: 'assets/images/reactPic.png',
      tech: ['React', 'Vite', 'Tailwind CSS', 'Node.js', 'Express', 'MongoDB Atlas', 'Socket.io', 'JWT', 'Render', 'Cloudflare Pages'],
      period: 'Projet personnel',
      periodEn: 'Personal project',
      link: 'https://scrumflow.pages.dev/',
      githubLink: 'https://github.com/ACHRAF-BADRI/ScrumFlow'
    },
    {
      title: 'Détection d\'accidents de la route par IA',
      titleEn: 'AI Car Accident Detection',
      description: 'AccidentAI : application Windows qui détecte les accidents de la route en temps réel sur une vidéo ou une webcam, avec alertes, captures, enregistrements et sauvegarde dans le cloud.',
      descriptionEn: 'AccidentAI: a Windows desktop application that detects road accidents in real time on a video or a webcam, with alerts, snapshots, recordings and cloud backup.',
      details: [
        'Détection en temps réel sur un fichier vidéo ou une webcam : YOLOv3 (OpenCV DNN) repère les véhicules et un réseau de neurones convolutif (TensorFlow / Keras) estime la probabilité d\'accident.',
        'Alertes au-dessus d\'un seuil réglable, journal des événements et capture automatique de chaque accident.',
        'Enregistrement de la webcam découpé en fichiers d\'une heure, avec lecteur intégré (de 0,5× à 16×).',
        'Comptes utilisateurs (inscription, connexion, profil, mot de passe) et sauvegarde automatique des images et vidéos dans le cloud, avec nouvelle tentative en cas de coupure.',
        'Espace administrateur : tableau de bord (utilisateurs, images, vidéos, stockage), création / suspension / suppression de comptes, gestion des rôles et accès aux médias de chaque utilisateur.',
        'Interface moderne (CustomTkinter) : thème clair / sombre / système, français / anglais, écran de chargement.',
        'Architecture : application de bureau ↔ API FastAPI (JWT) sur Render ↔ MongoDB Atlas (GridFS pour les images et vidéos) ; site de téléchargement sur Cloudflare Pages avec e-mail à chaque téléchargement ; installateur Windows (PyInstaller + Inno Setup).'
      ],
      detailsEn: [
        'Real-time detection on a video file or a webcam: YOLOv3 (OpenCV DNN) finds the vehicles and a convolutional neural network (TensorFlow / Keras) estimates the probability of an accident.',
        'Alerts above an adjustable threshold, an event log and an automatic snapshot of every accident.',
        'Webcam recording split into one-hour files, with a built-in player (0.5× to 16×).',
        'User accounts (sign up, sign in, profile, password) and automatic cloud backup of images and videos, retried if the connection drops.',
        'Admin area: dashboard (users, images, videos, storage), create / suspend / delete accounts, manage roles and access every user\'s media.',
        'Modern interface (CustomTkinter): light / dark / system theme, English / French, loading screen.',
        'Architecture: desktop app ↔ FastAPI API (JWT) on Render ↔ MongoDB Atlas (GridFS for images and videos); download website on Cloudflare Pages with an email on each download; Windows installer (PyInstaller + Inno Setup).'
      ],
      image: 'assets/images/python.webp',
      tech: ['Python', 'YOLOv3', 'TensorFlow / Keras', 'OpenCV', 'CustomTkinter', 'FastAPI', 'MongoDB Atlas', 'JWT', 'Render'],
      period: 'Projet personnel',
      periodEn: 'Personal project',
      link: 'https://accidentai.pages.dev/',
      githubLink: 'https://github.com/ACHRAF-BADRI/Car-Accident-detection-App'
    },
    {
      title: 'Application météo avec prédictions IA',
      titleEn: 'Weather App with AI Predictions',
      description: 'Tableau de bord météo moderne et responsive (FR/EN) : météo en direct, prévisions, carte interactive et prédiction par IA des jours suivants, avec une API Node/Express qui garde les clés secrètes.',
      descriptionEn: 'Modern, responsive weather dashboard (EN/FR): live weather, forecasts, an interactive map and an AI prediction of the coming days, backed by a Node/Express API that keeps the API keys secret.',
      details: [
        'Météo actuelle pour 5 villes par défaut, plus recherche avec autocomplétion pour ajouter ses propres villes (sauvegardées dans le navigateur).',
        'Page ville : conditions détaillées, carte interactive, prochaines 24 heures et prévisions sur 3 jours.',
        'Prédiction IA : un modèle de lissage exponentiel à tendance amortie (méthode de Holt) apprend des 7 derniers jours et des prévisions à 7 jours pour estimer les 4 jours suivants, avec tendance, marge d\'incertitude, risque de pluie et score de confiance.',
        'Résumé écrit et conseils pratiques générés par un modèle de langage (Groq) ou par des règles intégrées, mis en cache 1 heure par ville et par langue.',
        'Interface français/anglais détectée automatiquement, mode clair/sombre, design responsive, boîtes de confirmation et notifications.',
        'Formulaire de contact qui envoie chaque message par e-mail (Resend), avec protection anti-spam.',
        'Architecture : site statique Next.js sur Cloudflare Pages et API Express sur Render ; les clés API (WeatherAPI, Groq, Resend) restent uniquement sur le serveur.'
      ],
      detailsEn: [
        'Current weather for 5 default cities, plus search with autocomplete to add your own (saved in the browser).',
        'City page: detailed conditions, interactive map, next 24 hours and a 3-day forecast.',
        'AI prediction: a damped-trend exponential smoothing model (Holt\'s method) learns from the past 7 days and the 7-day forecast to estimate the 4 days after, with a trend, an uncertainty range, rain chance and a confidence score.',
        'Written summary and practical tips generated by a language model (Groq) or by built-in rules, cached for 1 hour per city and language.',
        'English / French interface auto-detected from the browser, light / dark mode, responsive design, confirmation dialogs and toast notifications.',
        'Contact form that emails each message (Resend), with anti-spam protection.',
        'Architecture: Next.js static site on Cloudflare Pages and Express API on Render; the API keys (WeatherAPI, Groq, Resend) live only on the server.'
      ],
      image: 'assets/images/nextJS_img.png',
      imageFit: 'contain',
      tech: ['Next.js', 'React', 'Tailwind CSS', 'Node.js', 'Express', 'Groq API', 'Resend', 'Render', 'Cloudflare Pages'],
      period: 'Projet personnel',
      periodEn: 'Personal project',
      link: 'https://achrafweather.pages.dev/',
      githubLink: 'https://github.com/ACHRAF-BADRI/Weather-Application-NextJS'
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
