
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  selectedLanguage: string = '';
  availableLanguages: string[] = ['English', 'Danish', 'German', 'French', 'Spanish', 'Italian', 'Polish'];

  constructor() { }

  setSelectedLanguage(language: string): void {
    this.selectedLanguage = language;
  }

  getSelectedLanguage(): string {
    return this.selectedLanguage;
  }

  getAvailableLanguages(): string[] {
    return this.availableLanguages;
  }
}
