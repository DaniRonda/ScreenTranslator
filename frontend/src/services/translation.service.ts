import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  constructor(private http: HttpClient) { }

  async translateTo(targetLanguage: string, content: string): Promise<string> {
    try {
      const translationRequest = { targetLanguage, content };

      const translationResponse = await this.http.post<any>(
        environment.baseUrl,
        translationRequest,
        {
          headers: {
            'Content-Type': 'application/json',
            'Ocp-Apim-Subscription-Key': environment.translatorKey
          }
        }
      ).toPromise();

      return translationResponse.translations[0].text;

    } catch (error) {
      console.error('Error translating content:', error);
      throw error;
    }
  }
}
