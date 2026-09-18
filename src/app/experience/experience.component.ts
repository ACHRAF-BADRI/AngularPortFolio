import { Component, HostListener, OnInit } from '@angular/core';
import { Experience } from '../models/experience.model';

@Component({
  selector: 'app-projects',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss']
})
export class ExperienceComponent implements OnInit {
  projects: Experience[] = [
    {
      title: 'Bouygues Energies & Services',
      description: 'Paris, France. Développeur Full-Stack (CDD).',
      date: 'Novembre 2025 - Present',
      image: 'assets/images/equans_fr_logo.png',
      tech: ['Spring Boot', 'Angular 21', 'Python', 'Kafka', 'Docker', 'InfluxDB', 'MongoDB'],
      details: [
        'Conception et développement du Front-end et du Back-end d\'une application web dédiée à la gestion intelligente de l\'éclairage.',
        'Implémentation des API Back-end et de la logique métier pour la gestion des équipements, des utilisateurs et des configurations d\'éclairage.',
        'Administration et structuration de la base de données MongoDB (utilisateurs et données métier).',
        'Conteneurisation des services via Docker et configuration des environnements applicatifs.',
        'Mise en place de pipelines CI/CD pour automatiser la génération et le déploiement des images Docker (déploiement sur VM via Dokploy).',
        'Sécurisation des API REST avec Spring Security : authentification, gestion fine des rôles (Administrateur, Technicien, Utilisateur), hashage BCrypt.',
        'Mise en place de l\'expiration de session (Spring Session) et d\'un rate limiting par utilisateur/IP.',
        'Implémentation de l\'authentification à deux facteurs (2FA) et de la réinitialisation de mot de passe par token à usage unique envoyé par e-mail.',
        'Gestion de l\'envoi, la réception et le stockage de fichiers (import/export de configurations et de rapports).'
      ]
    },
    {
      title: 'Bouygues E&S — Stage de fin d\'études',
      description: 'Paris, France. Développeur Full-Stack (stage de fin d\'études).',
      date: 'Avril 2025 - Novembre 2025',
      image: 'assets/images/equans_fr_logo2.png',
      tech: ['Spring Boot', 'Python', 'Kafka', 'Docker', 'InfluxDB', 'MongoDB'],
      details: [
        'Conception et développement de microservices Spring Boot pour la gestion des trames Uplink/Downlink LoRa via un LNS avec Apache Kafka.',
        'Développement d\'une bibliothèque Java dédiée à l\'encodage et au décodage des trames LoRaWAN conforme au protocole métier.',
        'Implémentation de la persistance des données dans InfluxDB pour l\'analyse et la visualisation en temps réel.',
        'Développement d\'un microservice de supervision des calendriers d\'éclairage pour nœuds Zhaga, avec comparaison automatique des configurations et des données terrain.',
        'Conception d\'un mécanisme d\'orchestration des commandes Downlink via un thread/worker dédié par device, avec un délai de 10 secondes entre chaque envoi.',
        'Utilisation de MongoDB comme file d\'attente des commandes Downlink, avec suppression automatique une fois l\'envoi confirmé.'
      ]
    },
    {
      title: 'Société AMUNDI',
      description: 'Paris, France. Développeur Web.',
      date: 'Août 2024 - Janvier 2025',
      image: 'assets/images/AmundiPic.png',
      tech: ['Angular 15', 'AngularJS', 'TypeScript'],
      details: [
        'Participation active à la migration d\'une application AngularJS 1.1 vers Angular 15, dans un contexte de modernisation technologique.',
        'Contribution à la conception et au développement de la nouvelle version du Front Office de l\'application Atlas.',
        'Implémentation de composants Angular en respectant les bonnes pratiques (architecture modulaire, services, routing).',
        'Réalisation de phases de tests, d\'investigation et de correction d\'anomalies en coordination avec les équipes métiers et techniques.',
        'Rendu de l\'application entièrement responsive (desktop, tablette, mobile) et ajout d\'un mode clair/sombre piloté par les préférences utilisateur.',
        'Mise en place de l\'internationalisation (i18n) de l\'interface via un dictionnaire de traductions FR/EN partagé entre les modules Angular.'
      ]
    },
    {
      title: 'Société ALSTOM',
      description: 'Fès, Maroc. Stage de fin d’étude en tant que développeur full Stack.',
      date: 'Juillet 2022 - Septembre 2022',
      image: 'assets/images/alstomPic.png',
      tech: ['Spring Boot', 'Angular'],
      details: [
        'Conception et développement Back-end (Spring Boot) et Front-end (Angular) d\'une application de gestion des demandes administratives.',
        'Définition de l\'architecture applicative et implémentation des fonctionnalités métier.',
        'Gestion des rôles utilisateurs (Employé, Valideur, Administrateur) avec permissions différenciées.',
        'Développement d\'API REST pour la communication entre services.',
        'Gestion de l\'upload et du stockage de fichiers joints.'
      ]
    },
    { title: 'Société NEWDEV MAROC', description: 'Fès, Maroc. Stage de formation.', date: 'Juillet 2021- Août 2021', image: 'assets/images/NewDevPic.jpg'}
  ];

  isScrollButtonVisible = false;
  isVisible: boolean = false;

  isModalOpen = false;
  selectedExperience: Experience | null = null;

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

  openDetails(experience: Experience): void {
    this.selectedExperience = experience;
    this.isModalOpen = true;
  }

  closeDetails(): void {
    this.isModalOpen = false;
  }
}
