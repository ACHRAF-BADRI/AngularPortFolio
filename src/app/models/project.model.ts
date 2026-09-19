export interface Project {
  title: string;
  titleEn?: string;
  description: string;
  descriptionEn?: string;
  image: string;
  details?: string[];
  detailsEn?: string[];
  tech?: string[];
  techEn?: string[];
  period?: string;
  periodEn?: string;
  /** Optional external link (e.g. live demo) shown in the details modal. */
  link?: string;
  /** Optional GitHub repository link shown in the details modal. */
  githubLink?: string;
  /** Use 'contain' for wide/rectangular logos that shouldn't be cropped. Defaults to 'cover'. */
  imageFit?: 'cover' | 'contain';
}
