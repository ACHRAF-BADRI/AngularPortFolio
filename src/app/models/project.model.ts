export interface Project {
  title: string;
  titleEn?: string;
  description: string;
  descriptionEn?: string;
  image: string;
  tech?: string[];
  techEn?: string[];
  period?: string;
  periodEn?: string;
  /** Use 'contain' for wide/rectangular logos that shouldn't be cropped. Defaults to 'cover'. */
  imageFit?: 'cover' | 'contain';
}
