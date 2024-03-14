import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../environments/environment";
import {CaptureText, TranslationRequest, TranslationResponse} from "../models/translation-request";
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

    return this.http.post<TranslationResponse>(environment.baseUrl, request).pipe(
      catchError((error: any) => {
        console.error('An error occurred:', error);
        return throwError('Something went wrong. Please try again later.');
      })
    );
  }
}



