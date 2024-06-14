import { Component, HostListener, OnInit } from '@angular/core';
import { Project } from '../models/project.model';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  projects: Project[] = [
    { title: 'Projet (React)', description: 'réalisation d’une application web de gestion d’une bibliothèque.', image: 'assets/images/reactPic.png'},
    { title: 'Projet (Angular)', description: 'développement d’une application web de gestion des tâches.', image: 'assets/images/angularPic.png'},
    { title: 'Projet (Angular)', description: 'application web pour la gestion des demandes administratif pour les employés d\'ALSTOM.', image: 'assets/images/angularPic.png'},
    { title: 'Projet (.Net Core)', description: ' application web qui permet la gestion d’un établissement.', image: 'assets/images/CSharpLogo.png'},
    { title: 'Projet (ASP.Net MVC)', description: 'application web qui permet la gestion des films.', image: 'assets/images/CSharpLogo.png'},
    { title: 'Projet POO en (C#)', description: 'permettant de réaliser un système de gestion de base de données relationnelle (SGBD).', image: 'assets/images/CSharpLogo.png'},
    { title: 'Project (c++) et (c#)', description: 'projet Jeu d’échec avec (C++) et avec (C#/Unity).', image: 'assets/images/CSharpLogo.png'},
    { title: 'Projet (Flutter)', description: 'réalisation d’une application mobile e-commerce.', image: 'assets/images/flutterPic.png'},
    { title: 'Projet (Spring Boot)', description: 'application de la gestion d’établissment.', image: 'assets/images/springPic1.png'},
  ];

  isScrollButtonVisible = false;
  isVisible: boolean = false;

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
}
