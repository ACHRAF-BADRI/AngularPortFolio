export interface Project {
  title: string;
  description: string;
  image: string;
  tech?: string[];
  period?: string;
  /** Use 'contain' for wide/rectangular logos that shouldn't be cropped. Defaults to 'cover'. */
  imageFit?: 'cover' | 'contain';
}
