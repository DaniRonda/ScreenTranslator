import { HttpClient } from "@angular/common/http";
import {Component, ElementRef, Input, OnInit, ViewChild} from "@angular/core";
import { environment } from "../../environments/environment";
import { TranslationService } from "../../services/translation.service";
import { Subscription, firstValueFrom } from "rxjs";
import { Translation } from "../../models/translation-request";
@Component({
  selector: 'translatedText',
  templateUrl: 'translatedText.html',
  styleUrls: ['translatedText.css']
})
export class TranslatedTextComponent implements OnInit {
  subscription: Subscription | undefined;
  translationData: Translation | any;
  translatedText: string | any;
  targetLanguage: string | any;
  constructor(
    public http: HttpClient,
    private translationService: TranslationService,
              ) {

  }

  public ngOnInit() {this.getTranslation();}

  getTranslation() {
      const call = this.http.get<Translation[]>(environment.baseUrl + 'Translation/Translate');
      this.state.orders = await firstValueFrom<Order[]>(call);
}
