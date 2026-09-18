import { Component, inject } from '@angular/core';
import { TranslationService } from '../services/translation.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  translation = inject(TranslationService);

  contact = {
    name: '',
    email: '',
    message: ''
  };

  onSubmit() {
    // Handle form submission, e.g., send an email or save to a database
    console.log('Form submitted!', this.contact);
  }
}
