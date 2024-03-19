import { HttpClient } from "@angular/common/http";
import {Component, ElementRef, Input, OnInit, ViewChild} from "@angular/core";
import { environment } from "../../environments/environment";
import { TranslationService } from "../../services/translation.service";
import { Subscription } from "rxjs";
import { Translation } from "../../models/translation-request";
@Component({
  selector: 'translatedText',
  templateUrl: 'translatedText.html',
  styleUrls: ['translatedText.css']
})
export class TranslatedTextComponent implements OnInit {
  subscription: Subscription | undefined;
  translationData: Translation | undefined;
  constructor(
    public http: HttpClient,
    private translationService: TranslationService,
              ) {

  }

  public ngOnInit() {this.getFeedData();}

  async getFeedData() {
    this.subscription = this.translationService.getTranslation().subscribe(
      (data) => {
        this.translationData = data;
        // You can now access translationData in your component
      },
      (error) => {
        console.error('An error occurred:', error);
        // Handle error here
      }
    );
  }
}
