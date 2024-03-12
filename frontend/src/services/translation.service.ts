import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private apiUrl = 'URL of the Azure service API endpoint.';  //TODO..replace with URL of the Azure service API endpoint

  constructor(private http: HttpClient) {}

  getSupportedLanguages(): Observable<string[]> {
    const url = `${this.apiUrl}/languages`;
    return this.http.get<string[]>(url);
  }

  translateText(sourceLanguage: string, targetLanguage: string, sourceText: string): Observable<any> {
    const params = new HttpParams()
      .set('api-version', '3.0')
      .set('from', sourceLanguage)
      .set('to', targetLanguage);
    const headers = {
      'Content-Type': 'application/json',
      'Ocp-Apim-Subscription-Key': 'service-key' //TODO ...replace service-key
    };
    const body = [{ 'text': sourceText }];
    return this.http.post<any>(this.apiUrl, body, { params, headers });
  }
}
