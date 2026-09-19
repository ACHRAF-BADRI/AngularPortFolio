import { Injectable, signal } from '@angular/core';

export type Lang = 'fr' | 'en';

const DICTIONARY: Record<string, Record<Lang, string>> = {
  'nav.menuTitle': { fr: 'Navigation', en: 'Navigation' },
  'nav.home': { fr: 'Home', en: 'Home' },
  'nav.about': { fr: 'About', en: 'About' },
  'nav.projects': { fr: 'Projects', en: 'Projects' },
  'nav.experience': { fr: 'Experience', en: 'Experience' },
  'nav.contact': { fr: 'Contact', en: 'Contact' },

  'home.greeting': { fr: 'Bonjour, je suis ACHRAF EL BADRI', en: "Hello, I'm ACHRAF EL BADRI" },
  'home.role': { fr: 'Développeur Full Stack', en: 'Full Stack Developer' },
  'home.download': { fr: 'Télécharger le CV', en: 'Download Resume' },

  'about.eyebrow': { fr: 'À propos', en: 'About' },
  'about.title': { fr: 'À propos de moi', en: 'About Me' },
  'about.certificates': { fr: 'Certificats', en: 'Certificates' },
  'about.hoverHint': { fr: 'Survolez pour voir', en: 'Hover to see' },
  'about.role': { fr: 'Développeur Full Stack', en: 'Full Stack Developer' },
  'about.contactBtn': { fr: 'Contact', en: 'Contact' },
  'about.experienceBtn': { fr: 'Expérience', en: 'Experience' },
  'about.projectsBtn': { fr: 'Projets', en: 'Projects' },
  'about.cert1Date': { fr: 'Juillet 2023', en: 'July 2023' },
  'about.cert2Date': { fr: 'Juin 2023', en: 'June 2023' },
  'about.cert3Date': { fr: 'Novembre 2022', en: 'November 2022' },
  'about.cert4Date': { fr: 'Mars 2021', en: 'March 2021' },

  'projects.title': { fr: 'Projets académiques et personnels', en: 'Academic & Personal Projects' },
  'experience.title': { fr: 'Expérience', en: 'Experience' },

  'contact.title': { fr: 'Me Contacter', en: 'Contact Me' },

  'common.viewDetails': { fr: 'Voir détails', en: 'View details' },
  'common.top': { fr: 'Haut', en: 'Top' },
  'common.close': { fr: 'Fermer', en: 'Close' },
  'common.liveDemo': { fr: 'Voir la démo en ligne', en: 'View live demo' },
  'common.sourceCode': { fr: 'Code source (GitHub)', en: 'Source code (GitHub)' },
};

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  /** Always starts in French — the language choice is a per-session
      toggle only, never persisted, so every page load defaults to FR. */
  lang = signal<Lang>('fr');

  toggle(): void {
    this.lang.set(this.lang() === 'fr' ? 'en' : 'fr');
  }

  /** Look up a static UI string from the dictionary. */
  t(key: string): string {
    const entry = DICTIONARY[key];
    return entry ? entry[this.lang()] : key;
  }

  /** Pick between a French base string and its English variant (CV content),
      falling back to French if no translation is provided yet. */
  pick(fr: string, en?: string): string {
    return this.lang() === 'en' && en ? en : fr;
  }

  /** Same as pick(), for bullet-point lists. */
  pickList(fr: string[] | undefined, en?: string[]): string[] {
    if (!fr) return [];
    return this.lang() === 'en' && en && en.length ? en : fr;
  }
}
