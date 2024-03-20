import {HttpClient} from "@angular/common/http";
import {Component, ElementRef, Inject, Input, OnInit, ViewChild} from "@angular/core";
import {environment} from "../../environments/environment";
import {TranslationService} from "../../services/translation.service";
import {Subscription, firstValueFrom} from "rxjs";
import {Translation} from "../../models/translation-request";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { TranslationStorageService } from "../../services/translationStorageService";

@Component({
  selector: 'translatedText',
  templateUrl: 'translatedText.html',
  styleUrls: ['translatedText.css']
})
export class TranslatedTextComponent  {
  subscription: Subscription | undefined;
  translationData: Translation | any;

  targetLanguage: string | any;
  translatedText: string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private translationStorageService: TranslationStorageService


  ) { this.translatedText = this.translationStorageService.getTranslatedText();
    console.log('Obtained translated text:', this.translatedText);
  }

  ngOnInit(): void {

  }
}
