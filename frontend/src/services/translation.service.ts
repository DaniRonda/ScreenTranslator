import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../environments/environment";
import {CaptureText, CaptureText2, TranslationRequest, TranslationResponse, Translation} from "../models/translation-request";
import {catchError, Observable, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  constructor(private http: HttpClient) {
  }

  translateText(text: CaptureText): Observable<TranslationResponse> {
    const request: TranslationRequest = {
      TargetLanguage: text.language || '',
      Content: text.imageBase || ''
    };


   return this.http.post<TranslationResponse>(`${environment.baseUrl}/Image/TranslateImage`, request).pipe(
      catchError((error: any) => {
        console.error('An error occurred:', error);
        return throwError('Something went wrong. Please try again later.');
      })
    );

  }
  translateText2(text: CaptureText2): Observable<TranslationResponse> {
    const request: TranslationRequest = {
      TargetLanguage: text.language || '',
      Content: text.content || ''
    };

    return this.http.post<TranslationResponse>(environment.baseUrl + 'Translation/Translate', request).pipe(
      catchError((error: any) => {
        console.error('An error occurred:', error);
        return throwError('Something went wrong. Please try again later.');
      })
    );
  }
  getTranslation(): Observable<Translation> {
    return this.http.get<Translation>(environment.baseUrl + 'Translation/Translate');
  }
}



