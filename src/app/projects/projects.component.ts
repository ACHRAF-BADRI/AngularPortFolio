import { Component, HostListener, OnInit } from '@angular/core';
import { Project } from '../models/project.model';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  projects: Project[] = [
    {
      title: 'Gestion intelligente de l\'éclairage',
      description: 'Application web full-stack pour la gestion des équipements, des utilisateurs et des configurations d\'éclairage : API sécurisées (Spring Security, JWT, 2FA, rate limiting), conteneurisation Docker et pipelines CI/CD de déploiement automatisé.',
      image: 'assets/images/Bouygues_img2.jpg',
      tech: ['Spring Boot', 'Angular 21', 'MongoDB', 'Docker', 'Spring Security'],
      period: 'Bouygues E&S — Novembre 2025 - Present'
    },
    {
      title: 'Supervision LoRaWAN & calendriers d\'éclairage',
      description: 'Microservices Spring Boot pour la gestion des trames Uplink/Downlink LoRa via un LNS avec Apache Kafka, bibliothèque Java d\'encodage/décodage LoRaWAN, persistance temps réel dans InfluxDB et supervision des calendriers d\'éclairage pour nœuds Zhaga.',
      image: 'assets/images/Bouygues_img2.jpg',
      tech: ['Spring Boot', 'Apache Kafka', 'InfluxDB', 'MongoDB', 'Java'],
      period: 'Bouygues E&S — Avril 2025 - Novembre 2025'
    },
    {
      title: 'Migration Atlas — AngularJS vers Angular 15',
      description: 'Migration du Front Office de l\'application Atlas d\'AngularJS 1.1 vers Angular 15 : architecture modulaire, design entièrement responsive, mode clair/sombre et internationalisation (i18n) FR/EN.',
      image: 'assets/images/amundi_imgg.jpg',
      tech: ['Angular 15', 'TypeScript', 'i18n'],
      period: 'Amundi — Août 2024 - Janvier 2025'
    },
    {
      title: 'Suivi d\'entraînement sportif assisté par IA',
      description: 'Projet personnel : application de suivi d\'entraînement sportif intégrant des recommandations générées par IA pour proposer des plans d\'entraînement adaptatifs.',
      image: 'assets/images/python.webp',
      tech: ['IA générative', 'API IA (OpenAI/Claude)'],
      period: 'Projet personnel'
    },
    { title: 'Projet (React)', description: 'réalisation d’une application web de gestion d’une bibliothèque.', image: 'assets/images/reactPic.png'},
    { title: 'Projet (Angular)', description: 'développement d’une application web de gestion des tâches.', image: 'assets/images/angularPic.png'},
    { title: 'Projet (Angular)', description: 'application web pour la gestion des demandes administratif pour les employés d\'ALSTOM.', image: 'assets/images/angularPic.png'},
    { title: 'Projet (.Net Core)', description: ' application web qui permet la gestion d’un établissement.', image: 'assets/images/CSharpLogo.png'},
    { title: 'Projet (ASP.Net MVC)', description: 'application web qui permet la gestion des films.', image: 'assets/images/CSharpLogo.png'},
    { title: 'Projet POO en (C#)', description: 'projet POO permettant de réaliser un système de gestion de base de données relationnelle (SGBD).', image: 'assets/images/CSharpLogo.png'},
    { title: 'Project (c++) et (c#)', description: 'projet Jeu d’échec avec (C++) et avec (C#/Unity).', image: 'assets/images/CSharpLogo.png'},
    { title: 'Projet (Flutter)', description: 'réalisation d’une application mobile e-commerce (Amazon App clone).', image: 'assets/images/flutterPic.png'},
    { title: 'Projet (Spring Boot)', description: 'application de la gestion d’établissment.', image: 'assets/images/springPic1.png'},
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
