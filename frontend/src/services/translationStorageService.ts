import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TranslationStorageService {
  private translatedText: string = '';

  constructor() { }

  setTranslatedText(text: string) {
    this.translatedText = text;
    console.log('Translated text:', this.translatedText);
  }

  getTranslatedText(): string {
    return this.translatedText;
  }
}

