import { Component, HostListener, OnInit } from '@angular/core';
import { Experience } from '../models/experience.model';

@Component({
  selector: 'app-projects',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss']
})
export class ExperienceComponent implements OnInit {
  projects: Experience[] = [
    { title: 'Société AMUNDI', description: 'Paris, France. Stage en tant que développeur d’ANGULAR.', date: 'Juillet 2024 - Present', image: 'assets/images/AmundiPic.png'},
    { title: 'Société ALSTOM', description: 'Fès, Maroc. Stage de fin d’étude en tant que développeur full Stack.', date: 'Juillet 2022 - Septembre 2022', image: 'assets/images/alstomPic.png'},
    { title: 'Société NEWDEV MAROC', description: 'Fès, Maroc. Stage de formation.', date: 'Juillet 2021- Août 2021', image: 'assets/images/NewDevPic.jpg'}
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
