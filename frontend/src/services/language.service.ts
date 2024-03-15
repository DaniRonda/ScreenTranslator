
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  selectedLanguage: string = '';
  availableLanguages: { [key: string]: string } = {
    'English': 'en',
    'Danish': 'da',
    'German': 'de',
    'French': 'fr',
    'Spanish': 'es',
    'Italian': 'it',
    'Polish': 'pl'
  };

  constructor() { }

  setSelectedLanguage(language: string): void {
    this.selectedLanguage = this.availableLanguages[language] || '';
  }

  getSelectedLanguage(): string {
    return this.selectedLanguage;
  }

  getAvailableLanguages(): string[] {
    return Object.keys(this.availableLanguages);
  }
}
